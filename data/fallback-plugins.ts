export type FallbackPlugin = {
  id: number
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  rating: number
  review_count: number
  download_count: number
  is_featured: boolean
  is_active: boolean
  category_id: number
  version: string
  wordpress_version?: string
  demo_url?: string
  download_url?: string | null
  categories?: { name: string; slug: string } | null
  // optional stringified features JSON (to match DB shape)
  features?: string
}

export const fallbackPlugins: FallbackPlugin[] = [
  {
    id: 1,
    slug: 'aioa-elementor',
    name: 'All-in-One Addons for Elementor',
    tagline: 'Supercharge Your Elementor Website with 100+ Premium Widgets',
    description:
      'The most comprehensive collection of Elementor widgets and extensions. Build stunning websites faster with our premium addons designed for speed and flexibility.',
    price: 49,
    rating: 4.9,
    review_count: 1250,
    download_count: 50000,
    is_featured: true,
    is_active: true,
    category_id: 1,
    version: '1.0.0',
    wordpress_version: '6.4+',
    demo_url: 'https://printjones.com/demos/aioa-elementor',
    download_url: null,
    categories: { name: 'Page Builders', slug: 'page-builders' },
  },
  {
    id: 2,
    slug: 'eaf-wpbakery',
    name: 'Essential Addons for WPBakery Page Builder',
    tagline: 'Essential Elements & Extensions for WPBakery',
    description:
      'Extend WPBakery Page Builder with powerful elements and addons. Create professional websites with ease using our premium extensions.',
    price: 49,
    rating: 4.7,
    review_count: 980,
    download_count: 35000,
    is_featured: true,
    is_active: true,
    category_id: 1,
    version: '1.0.0',
    wordpress_version: '6.4+',
    demo_url: 'https://printjones.com/demos/eaf-wpbakery',
    download_url: null,
    categories: { name: 'Page Builders', slug: 'page-builders' },
  },
  {
    id: 3,
    slug: 'pj-product-filter',
    name: 'PJ Product Filter',
    tagline: 'Intelligent Filters. Maximum Conversions. Zero Compromise.',
    description:
      'The most intelligent and comprehensive filtering solution for WordPress and WooCommerce. Features AI-powered recommendations, advanced analytics, visual search, and SEO optimization.',
    price: 79,
    rating: 4.9,
    review_count: 2847,
    download_count: 127000,
    is_featured: true,
    is_active: true,
    category_id: 2,
    version: '25.0.0',
    wordpress_version: '6.0+',
    demo_url: 'https://printjones.com/demos/pj-product-filter',
    download_url: null,
    categories: { name: 'E-commerce', slug: 'ecommerce' },
  },
  {
    id: 4,
    slug: 'pj-media-library',
    name: 'PJ Media Library',
    tagline: "The World's Most Intelligent Media & Document Management System",
    description:
      'Revolutionize media and document management with AI-powered organization, smart auto-tagging, visual search, real-time collaboration, and enterprise-ready infrastructure.',
    price: 79,
    rating: 4.9,
    review_count: 1567,
    download_count: 89000,
    is_featured: true,
    is_active: true,
    category_id: 4,
    version: '25.0.0',
    wordpress_version: '6.0+',
    demo_url: 'https://printjones.com/demos/pj-media-library',
    download_url: null,
    categories: { name: 'Media', slug: 'media' },
  },
  {
    id: 5,
    slug: 'pj-accessibility',
    name: 'PJ Accessibility',
    tagline: "The World's Most Powerful WordPress Accessibility Solution",
    description:
      'Make your WordPress site accessible to everyone with AI-powered features, multiple accessibility profiles, advanced text-to-speech, voice navigation, and WCAG 2.2 AAA compliance.',
    price: 69,
    rating: 4.9,
    review_count: 2145,
    download_count: 156000,
    is_featured: true,
    is_active: true,
    category_id: 3,
    version: '25.0.0',
    wordpress_version: '6.0+',
    demo_url: 'https://printjones.com/demos/pj-accessibility',
    download_url: null,
    categories: { name: 'Accessibility', slug: 'accessibility' },
  },
  {
    id: 6,
    slug: 'pj-store-finder',
    name: 'PJ Ajax Store Locator',
    tagline: "The World's Most Intelligent Store Locator Solution",
    description:
      'Create a powerful store/dealer locator with AI-powered search, multiple map providers, advanced filtering, real-time directions, and enterprise analytics.',
    price: 69,
    rating: 4.8,
    review_count: 1892,
    download_count: 78000,
    is_featured: true,
    is_active: true,
    category_id: 5,
    version: '25.0.0',
    wordpress_version: '6.0+',
    demo_url: 'https://printjones.com/demos/pj-store-finder',
    download_url: null,
    categories: { name: 'Utilities', slug: 'utilities' },
  },
  {
    id: 7,
    slug: 'pj-multicurrency',
    name: 'PJ Multicurrency',
    tagline: 'Next-Gen Multi-Currency Platform for WooCommerce',
    description:
      'Enterprise-grade multi-currency solution with advanced pricing rules, AI-powered recommendations, real-time exchange rates, and seamless checkout integration.',
    price: 89,
    rating: 4.8,
    review_count: 1654,
    download_count: 92000,
    is_featured: true,
    is_active: true,
    category_id: 2,
    version: '25.0.0',
    wordpress_version: '6.0+',
    demo_url: 'https://printjones.com/demos/pj-multicurrency',
    download_url: null,
    categories: { name: 'E-commerce', slug: 'ecommerce' },
  },
  {
    id: 8,
    slug: 'pj-product-designer',
    name: 'PJ Product Designer',
    tagline: 'Next-Generation Product Customization Platform',
    description:
      'Revolutionary product customization with AI-powered design tools, real-time collaboration, professional-grade features, and WebGL rendering for creating custom products.',
    price: 99,
    rating: 4.9,
    review_count: 1423,
    download_count: 67000,
    is_featured: true,
    is_active: true,
    category_id: 2,
    version: '25.0.0',
    wordpress_version: '6.0+',
    demo_url: 'https://printjones.com/demos/pj-product-designer',
    download_url: null,
    categories: { name: 'E-commerce', slug: 'ecommerce' },
  },
]

export function getFallbackFeaturedPlugins() {
  return fallbackPlugins.filter((p) => p.is_featured && p.is_active).slice(0, 8)
}

export function getFallbackPluginBySlug(slug: string) {
  return fallbackPlugins.find((p) => p.slug === slug) || null
}

export function getFallbackRelated(categoryId: number, currentId: number, limit = 3) {
  return fallbackPlugins
    .filter((p) => p.category_id === categoryId && p.id !== currentId)
    .slice(0, limit)
}
