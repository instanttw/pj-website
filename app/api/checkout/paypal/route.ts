import { NextRequest, NextResponse } from 'next/server'
import { getFallbackPluginBySlug } from '@/data/fallback-plugins'
import { createPayPalOrder } from '@/lib/paypal/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug } = body || {}
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

    const plugin = getFallbackPluginBySlug(slug)
    if (!plugin) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const order = await createPayPalOrder({
      slug: plugin.slug,
      name: plugin.name,
      amount: plugin.price,
    })

    return NextResponse.json(order)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'PayPal error' }, { status: 500 })
  }
}
