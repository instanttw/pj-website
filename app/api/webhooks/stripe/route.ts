import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeClient } from '@/lib/stripe/client'

export async function POST(req: NextRequest) {
  const stripe = getStripeClient()
  let payload: string | Buffer
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

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

  // TODO: Persist order and grant access
  switch (event.type) {
    case 'checkout.session.completed': {
      // const session = event.data.object as Stripe.Checkout.Session
      // fulfill order, issue license, send email, etc.
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
