import { getStripeClient, getCurrency, getSiteUrl } from './client'
import type Stripe from 'stripe'

export type CheckoutInput = {
  slug: string
  name: string
  description?: string
  image?: string
  amount: number // in USD dollars (e.g., 49)
  quantity?: number
  mode?: 'payment' | 'subscription'
  recurring?: { interval: 'month' | 'year'; interval_count?: number }
  metadata?: Record<string, string | number | boolean>
}

export async function createDynamicCheckout(input: CheckoutInput) {
  const stripe = getStripeClient()
  const currency = getCurrency()
  const site = getSiteUrl()

  const unitAmount = Math.round((input.amount || 0) * 100)
  if (!unitAmount || unitAmount < 0) throw new Error('Invalid amount')

  const line: Stripe.Checkout.SessionCreateParams.LineItem = {
    price_data: {
      currency,
      unit_amount: unitAmount,
      product_data: {
        name: input.name,
        description: input.description,
        images: input.image ? [input.image] : undefined,
        metadata: {
          slug: input.slug,
          ...normalizeMetadata(input.metadata),
        } as any,
      },
      ...(input.recurring ? { recurring: input.recurring } : {}),
    },
    quantity: input.quantity || 1,
  }

  const session = await stripe.checkout.sessions.create({
    mode: input.mode || 'payment',
    line_items: [line],
    automatic_tax: { enabled: true },
    metadata: {
      slug: input.slug,
      ...normalizeMetadata(input.metadata),
    } as any,
    success_url: `${site}${process.env.STRIPE_SUCCESS_PATH || '/checkout/success'}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}${process.env.STRIPE_CANCEL_PATH || '/checkout/cancel'}`,
  })

  return session
}

function normalizeMetadata(obj?: Record<string, any>) {
  const out: Record<string, string> = {}
  if (!obj) return out
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === 'string' ? v : JSON.stringify(v)
  }
  return out
}
