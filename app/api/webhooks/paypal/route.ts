import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

function genKey() {
  const s = () => Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${s()}-${s()}-${s()}-${s()}`
}

// Minimal relay endpoint for syncing PayPal payments into Supabase.
// Secure with a shared token: set PAYPAL_WEBHOOK_TOKEN in your env and send it in header `x-webhook-token`.
export async function POST(req: NextRequest) {
  const token = req.headers.get('x-webhook-token')
  const expected = process.env.PAYPAL_WEBHOOK_TOKEN
  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Bad JSON' }, { status: 400 })

  try {
    const { user_id, total_amount, items = [], invoice_number, status = 'paid' } = body
    if (!user_id) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })

    const orderPayload: Database['public']['Tables']['orders']['Insert'] = {
      user_id,
      total_amount,
      status: status === 'paid' ? 'completed' : status,
      payment_method: 'paypal',
    }
    const { data: order, error: orderErr } = await (supabaseAdmin as any)
      .from('orders')
      .insert(orderPayload)
      .select('*')
      .single()
    if (orderErr) throw orderErr

    for (const it of items) {
      const license_key = it.license_key || genKey()
      const itemPayload: Database['public']['Tables']['order_items']['Insert'] = {
        order_id: order.id,
        user_id,
        plugin_id: it.plugin_id ?? null,
        pricing_id: it.pricing_id ?? null,
        price: it.price,
        license_key,
      }
      await (supabaseAdmin as any).from('order_items').insert(itemPayload)

      if (it.plugin_id) {
        const licPayload: Database['public']['Tables']['licenses']['Insert'] = {
          user_id,
          plugin_id: it.plugin_id,
          pricing_id: it.pricing_id ?? null,
          license_key,
          status: status === 'paid' ? 'active' : 'pending',
        }
        await (supabaseAdmin as any).from('licenses').insert(licPayload)
      }
    }

    const invPayload: Database['public']['Tables']['invoices']['Insert'] = {
      order_id: order.id,
      user_id,
      invoice_number: invoice_number || `INV-${order.id.slice(0, 8).toUpperCase()}`,
      amount: total_amount,
      status,
    }
    await (supabaseAdmin as any).from('invoices').insert(invPayload)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Processing error' }, { status: 500 })
  }
}
