import { NextRequest, NextResponse } from 'next/server'
import { getPayPalAccessToken, getPayPalApiBase } from '@/lib/paypal/client'

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text()
    const webhookEvent = JSON.parse(bodyText)

    const transmissionId = req.headers.get('paypal-transmission-id') || ''
    const transmissionTime = req.headers.get('paypal-transmission-time') || ''
    const certUrl = req.headers.get('paypal-cert-url') || ''
    const authAlgo = req.headers.get('paypal-auth-algo') || ''
    const transmissionSig = req.headers.get('paypal-transmission-sig') || ''
    const webhookId = process.env.PAYPAL_WEBHOOK_ID || ''

    if (!webhookId) {
      return NextResponse.json({ error: 'Missing PAYPAL_WEBHOOK_ID' }, { status: 500 })
    }

    // Verify webhook signature with PayPal
    const token = await getPayPalAccessToken()
    const base = getPayPalApiBase()
    const verifyRes = await fetch(`${base}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        transmission_id: transmissionId,
        transmission_time: transmissionTime,
        cert_url: certUrl,
        auth_algo: authAlgo,
        transmission_sig: transmissionSig,
        webhook_id: webhookId,
        webhook_event: webhookEvent,
      }),
    })

    const verifyJson = await verifyRes.json()
    if (!verifyRes.ok || verifyJson.verification_status !== 'SUCCESS') {
      return NextResponse.json({ error: 'Invalid PayPal signature', details: verifyJson }, { status: 400 })
    }

    // TODO: handle events, e.g., CHECKOUT.ORDER.APPROVED and PAYMENT.CAPTURE.COMPLETED
    // console.log('PayPal event:', webhookEvent.event_type)

    return NextResponse.json({ received: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Webhook error' }, { status: 500 })
  }
}
