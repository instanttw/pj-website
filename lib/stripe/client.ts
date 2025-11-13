import Stripe from 'stripe'

const apiVersion: Stripe.LatestApiVersion = '2023-08-16'

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY')
  return new Stripe(key, { apiVersion })
}

export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const vercel = process.env.VERCEL_URL // e.g. printjones.com or *.vercel.app
  const url = (envUrl && envUrl.trim())
    || (vercel ? `https://${vercel}` : 'http://localhost:3000')
  return url.replace(/\/$/, '')
}

export function getCurrency() {
  return (process.env.STRIPE_CURRENCY || 'usd').toLowerCase()
}
