export function getPayPalApiBase() {
  const env = (process.env.PAYPAL_ENV || 'sandbox').toLowerCase()
  const override = process.env.PAYPAL_API_BASE
  if (override) return override
  return env === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'
}

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !secret) throw new Error('Missing PayPal credentials')
  const base = getPayPalApiBase()
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${secret}`).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) throw new Error('Failed to get PayPal token')
  const json = (await res.json()) as any
  return json.access_token as string
}

export type PayPalOrderInput = {
  slug: string
  name: string
  amount: number // USD
  currency?: string
}

export async function createPayPalOrder(input: PayPalOrderInput) {
  const base = getPayPalApiBase()
  const token = await getPayPalAccessToken()
  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: input.slug,
          description: input.name,
          amount: {
            currency_code: (input.currency || 'USD').toUpperCase(),
            value: input.amount.toFixed(2),
          },
        },
      ],
    }),
  })
  const json = (await res.json()) as any
  if (!res.ok) throw new Error(json?.message || 'Failed to create PayPal order')
  return json
}
