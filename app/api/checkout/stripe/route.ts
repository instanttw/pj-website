import { NextRequest, NextResponse } from 'next/server'
import { createDynamicCheckout } from '@/lib/stripe/checkout'
import { getFallbackPluginBySlug } from '@/data/fallback-plugins'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, quantity = 1, user_id, plugin_id, pricing_id } = body || {}
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

    // Lookup from DB or fallback
    const plugin = getFallbackPluginBySlug(slug)
    if (!plugin) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const session = await createDynamicCheckout({
      slug: plugin.slug,
      name: plugin.name,
      description: plugin.tagline,
      amount: plugin.price,
      quantity,
      metadata: {
        product_id: plugin.id,
        category_id: plugin.category_id,
        supabase_user_id: user_id,
        plugin_id,
        pricing_id,
      },
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Checkout error' }, { status: 500 })
  }
}
