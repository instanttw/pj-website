import Stripe from 'stripe'

const apiVersion: Stripe.LatestApiVersion = '2023-10-16'

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY')
  return new Stripe(key, { apiVersion })
}

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || ''
  if (!url) throw new Error('Missing NEXT_PUBLIC_SITE_URL')
  return url.replace(/\/$/, '')
}

export function getCurrency() {
  return (process.env.STRIPE_CURRENCY || 'usd').toLowerCase()
}
