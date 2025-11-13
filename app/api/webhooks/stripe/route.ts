import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeClient } from '@/lib/stripe/client'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

function genKey() {
  const s = () => Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${s()}-${s()}-${s()}-${s()}`
}

export async function POST(req: NextRequest) {
  const stripe = getStripeClient()
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let payload: string
  try {
    payload = await req.text()
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = (session.metadata?.supabase_user_id as string) || null
      const total = (session.amount_total ?? 0) / 100

      if (!userId) {
        // No user context; ignore
        return NextResponse.json({ ok: true })
      }

      // Insert order
      const orderPayload: Database['public']['Tables']['orders']['Insert'] = {
        user_id: userId,
        total_amount: total,
        status: 'completed',
        payment_method: 'card',
      }
      const { data: order, error: orderErr } = await (supabaseAdmin as any)
        .from('orders')
        .insert(orderPayload)
        .select('*')
        .single()
      if (orderErr) throw orderErr

      // Line items and licenses
      const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })
      for (const li of items.data) {
        const plugin_id = (session.metadata?.plugin_id as string | undefined) || (li.price?.metadata as any)?.plugin_id
        // Prefer internal UUID mapping from Price metadata; fall back to session metadata
        const pricing_id = (session.metadata?.pricing_id as string | undefined) || (li.price?.metadata as any)?.pricing_id
        const license_key = genKey()
        const priceEach = (li.amount_total ?? 0) / 100

        const itemPayload: Database['public']['Tables']['order_items']['Insert'] = {
          order_id: order.id,
          user_id: userId,
          plugin_id: plugin_id ?? null,
          pricing_id: pricing_id ?? null,
          price: priceEach,
          license_key,
        }
        await (supabaseAdmin as any).from('order_items').insert(itemPayload)

        if (plugin_id) {
          const licPayload: Database['public']['Tables']['licenses']['Insert'] = {
            user_id: userId,
            plugin_id,
            pricing_id: pricing_id ?? null,
            license_key,
            status: 'active',
          }
          await (supabaseAdmin as any).from('licenses').insert(licPayload)
        }
      }

      // Invoice stub
      const invPayload: Database['public']['Tables']['invoices']['Insert'] = {
        order_id: order.id,
        user_id: userId,
        invoice_number: `INV-${(session.id || '').slice(-8).toUpperCase()}`,
        amount: total,
        status: 'paid',
      }
      await (supabaseAdmin as any).from('invoices').insert(invPayload)
    }

    // TODO: handle refunds/cancellations -> mark orders/invoices and deactivate licenses

    return NextResponse.json({ received: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Processing error' }, { status: 500 })
  }
}
