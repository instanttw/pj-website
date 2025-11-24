import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Star,
  Download,
  ShoppingCart,
  ExternalLink,
  Check,
  Shield,
  CreditCard,
  RotateCcw,
  ArrowRight,
  Package,
  Zap,
  RefreshCw,
  HeadphonesIcon,
  Code,
  Globe,
  Users,
  TrendingUp,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getPluginDisplayName, getPluginDisplaySlug, getPluginDisplayPrice } from '@/lib/utils';
import { getFallbackPluginBySlug, getFallbackRelated, fallbackPlugins } from '@/data/fallback-plugins';
import { PJFilterOverview, PJFilterIntegrations, PJFilterFeatures, PJFilterFAQs, PJFilterROI, PJFilterTestimonials } from '@/components/pj-filter-content';
import { CheckoutButtons } from '@/components/checkout-buttons';

interface PluginPageProps {
  params: {
    slug: string;
  };
}

async function getPluginBySlug(slug: string) {
  try {
    const { data: plugin, error } = await supabase
      .from('plugins')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching plugin:', error);
    }

    if (plugin) {
      return plugin as any;
    }

    // Fallback to curated data when DB has no record
    const fallback = getFallbackPluginBySlug(slug);
    return fallback as any;
  } catch (error) {
    console.error('Error connecting to database:', error);
    const fallback = getFallbackPluginBySlug(slug);
    return fallback as any;
  }
}

async function getRelatedPlugins(categoryId: number, currentPluginId: number) {
  try {
    const { data: plugins, error } = await supabase
      .from('plugins')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .neq('id', currentPluginId)
      .limit(3);

    if (error) {
      console.error('Error fetching related plugins:', error);
    }

    if (plugins && plugins.length > 0) {
      return plugins as any[];
    }

    // Fallback to curated related plugins
    return getFallbackRelated(categoryId, currentPluginId) as any[];
  } catch (error) {
    console.error('Error connecting to database:', error);
    return getFallbackRelated(categoryId, currentPluginId) as any[];
  }
}

export async function generateStaticParams() {
  // Pre-generate pages for the 8 curated plugins
  return fallbackPlugins.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PluginPageProps): Promise<Metadata> {
  const plugin = await getPluginBySlug(params.slug);

  if (!plugin) {
    return {
      title: 'Plugin Not Found',
    };
  }

  const pluginName = getPluginDisplayName(plugin as any);

  return {
    title: `${pluginName} - ${plugin.tagline} | PrintJones`,
    description: plugin.description || plugin.tagline,
    openGraph: {
      title: pluginName,
      description: plugin.tagline,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pluginName,
      description: plugin.tagline,
    },
  };
}

export default async function PluginDetailPage({ params }: PluginPageProps) {
  if (params.slug === 'aioa-elementor') {
    redirect('/plugins/advanced-widgets-elementor-pro');
  }
  let plugin = await getPluginBySlug(params.slug);

  if (!plugin) {
    notFound();
  }

  plugin = { ...plugin, name: getPluginDisplayName(plugin) } as any;
  const displayPrice = getPluginDisplayPrice(plugin as any);

  // Enforce specific Active Installations on detail pages for key plugins
  const downloadOverrides: Record<string, number> = {
    'pj-filter': 650780,
    'advanced-widgets-elementor': 450000,
    'advanced-widgets-elementor-pro': 1200500,
    'eaf-wpbakery': 990340,
  };
  if (downloadOverrides[plugin.slug]) {
    plugin = { ...plugin, download_count: downloadOverrides[plugin.slug] };
  }

  const bannedSlugs = new Set([
    'pj-media-library',
    'pj-accessibility',
    'pj-store-finder',
    'pj-multicurrency',
    'pj-product-designer',
  ]);
  if (bannedSlugs.has(plugin.slug)) {
    notFound();
  }

  let relatedPlugins = await getRelatedPlugins(plugin.category_id, plugin.id);
  relatedPlugins = relatedPlugins
    .filter((p: any) => !bannedSlugs.has(p.slug))
    .map((p: any) => ({ ...p, name: getPluginDisplayName(p) }));

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast Performance',
      description: 'Optimized code ensures zero impact on your site speed',
    },
    {
      icon: RefreshCw,
      title: 'Regular Updates',
      description: 'Monthly updates with new features and security patches',
    },
    {
      icon: HeadphonesIcon,
      title: 'Premium Support',
      description: '24/7 support from WordPress experts',
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Built to WordPress coding standards',
    },
    {
      icon: Globe,
      title: 'Translation Ready',
      description: 'Fully compatible with WPML and Polylang',
    },
    {
      icon: Users,
      title: 'Active Community',
      description: 'Join thousands of happy users worldwide',
    },
  ];

  const features = plugin.features ? JSON.parse(plugin.features) : [
    'Easy to install and configure',
    'Regular updates and improvements',
    'Premium customer support',
    'Extensive documentation',
    'Mobile responsive design',
    'SEO optimized',
    'Translation ready',
    'Developer friendly',
  ];

  const freeVersionSlugs = new Set([
    'advanced-widgets-elementor',
    'advanced-widgets-elementor-pro',
    'eaf-wpbakery',
    'pj-filter',
  ]);
  const hasFreeVersion = freeVersionSlugs.has(plugin.slug);

  // Check if this is the free version page
  const isFreeVersion = plugin.slug === 'advanced-widgets-elementor' && plugin.price === 0;

  // Prefer download link (Google Drive) over legacy demo links
  let downloadUrl = plugin.download_url || null;
  // Override core download link for Advanced Widgets for Elementor (free version)
  if (plugin.slug === 'advanced-widgets-elementor' && plugin.price === 0) {
    downloadUrl = 'https://tinyurl.com/advanced-widget-core';
  }
  // Override core download link for Essential Addons for WPBakery (Free core)
  if (plugin.slug === 'eaf-wpbakery') {
    downloadUrl = 'https://tinyurl.com/essential-addons-wpbalery-free';
  }
  // Override core download link for PJ Filter Free
  if (plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter') {
    downloadUrl = 'https://tinyurl.com/pj-filter-free-plugin';
  }

  const sampleReviews = [
    {
      author: 'Emily R.',
      role: 'Site owner',
      title: 'Easy setup, great results',
      content:
        `Installed in minutes and it just worked. The UI is clear and I didn’t need a developer to get value right away.`,
      rating: 5,
      date: '2025-09-20',
    },
    {
      author: 'Marco D.',
      role: 'WordPress developer',
      title: 'Solid architecture and support',
      content:
        `Hooks and filters cover real-world cases. Performance is excellent and support answers with code samples.`,
      rating: 5,
      date: '2025-08-12',
    },
    {
      author: 'Nora S.',
      role: 'Marketing lead',
      title: 'Meaningful business impact',
      content:
        `We saw faster navigation and better engagement after enabling this. Zero conflicts with our theme.`,
      rating: 5,
      date: '2025-07-03',
    },
    {
      author: 'Peter H.',
      role: 'Agency owner',
      title: 'Reliable across multiple client sites',
      content:
        `We’ve standardized on this plugin for client builds. Updates are stable and backward compatible.`,
      rating: 5,
      date: '2025-06-18',
    },
    {
      author: 'Lia T.',
      role: 'Store manager',
      title: 'Worth it',
      content:
        `Clear documentation, quick results, and no hit to Core Web Vitals. Highly recommend.`,
      rating: 5,
      date: '2025-05-09',
    },
  ];

  const screenshotItems = (() => {
    if (plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter') {
      return [
        {
          src: '/images/pj-filter-tools.png',
          alt: 'PJ Filter Tools & Utilities screen in WordPress admin',
          title: 'Tools & Utilities — maintenance shortcuts',
          description:
            'Clear filter cache, rebuild the product index, clear transients, and optimize the database from a single maintenance panel.',
        },
        {
          src: '/images/pj-filter-settings.png',
          alt: 'PJ Filter Settings screen showing basic configuration options',
          title: 'Settings — core filter behavior and UX',
          description:
            'Configure AJAX filtering, product counts, loading indicators, and other options that control how shoppers experience your filters.',
        },
        {
          src: '/images/pj-filter-dashboard.png',
          alt: 'PJ Filter analytics dashboard with key metrics and usage trend graph',
          title: 'Dashboard — filter performance overview',
          description:
            'Get a high-level overview of total filters, filter sessions, conversions, and conversion rate, plus usage trends and recent activity.',
        },
        {
          src: '/images/pj-filter-analytics.png',
          alt: 'PJ Filter Analytics dashboard with usage and conversion metrics',
          title: 'Analytics — detailed usage and conversion tracking',
          description:
            'Drill into page views, filter interactions, conversion rate, and revenue to see which filters actually drive results.',
        },
        {
          src: '/images/pj-filter-seo.png',
          alt: 'PJ Filter Enterprise SEO Management settings',
          title: 'SEO — enterprise SEO management for filtered pages',
          description:
            'Control indexing, meta tags, schema markup, and URL structure for filter result pages to keep SEO under control.',
        },
        {
          src: '/images/pj-filter-filter-sets.png',
          alt: 'PJ Filter Product Filters screen listing filter sets and presets',
          title: 'Product Filters — manage filter sets and layouts',
          description:
            'Create filter sets, use presets, and configure dependencies for product filters across your WooCommerce catalog.',
        },
      ];
    }

    if (plugin.slug === 'advanced-widgets-elementor' || plugin.slug === 'advanced-widgets-elementor-pro') {
      return [
        {
          src: '/images/advanced-widgets-dashboard.png',
          alt: 'Advanced Widgets dashboard with widget and performance metrics',
          title: 'Dashboard — widget usage and performance overview',
          description:
            'See how many widgets are active, how they are distributed by category, and core performance metrics for your site.',
        },
        {
          src: '/images/advanced-widgets-widgets.png',
          alt: 'Advanced Widgets screen listing individual widgets with enable toggles',
          title: 'Widgets — manage 538+ widgets',
          description:
            'Enable or disable individual widgets across many categories so you only load what each project actually needs.',
        },
        {
          src: '/images/advanced-widgets-templates.png',
          alt: 'Advanced Widgets integrations or library screen inside WordPress admin',
          title: 'Library & integrations — ready-made building blocks',
          description:
            'Access ready-made blocks, templates, or integrations directly from the editor to speed up site building.',
        },
        {
          src: '/images/advanced-widgets-extensions.png',
          alt: 'Advanced Widgets Extensions page with performance and visual effect toggles',
          title: 'Extensions — performance and visual controls',
          description:
            'Toggle global extensions like lazy loading, performance options, and visual effects per project.',
        },
      ];
    }

    if (plugin.slug === 'eaf-wpbakery') {
      return [
        {
          src: '/images/eaf-wpbakery-dashboard.png',
          alt: 'Essential Addons for WPBakery dashboard with element and performance metrics',
          title: 'Dashboard — overview of EA for WPBakery',
          description:
            'View how many elements are active, how they are distributed by category, and key performance details for your WPBakery site.',
        },
        {
          src: '/images/eaf-wpbakery-elements.png',
          alt: 'EA for WPBakery Elements screen listing individual elements with enable toggles',
          title: 'Elements — manage WPBakery elements',
          description:
            'Enable or disable individual EA elements so each page only loads the blocks it really needs.',
        },
        {
          src: '/images/eaf-wpbakery-integrations.png',
          alt: 'EA for WPBakery Integrations screen showing third-party services',
          title: 'Integrations — connect third-party services',
          description:
            'Connect Google Maps, Mailchimp, Stripe, social networks, and other services to unlock extra functionality.',
        },
        {
          src: '/images/eaf-wpbakery-extensions.png',
          alt: 'EA for WPBakery Extensions page with performance and visual feature toggles',
          title: 'Extensions — global WPBakery enhancements',
          description:
            'Control global extensions such as parallax, custom CSS, sticky elements, and reveal effects for your layouts.',
        },
      ];
    }

    return null;
  })();

  const screenshotCaption =
    plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter'
      ? 'All screenshots are from the PJ Filter interface inside the WordPress / WooCommerce admin dashboard.'
      : plugin.slug === 'advanced-widgets-elementor' || plugin.slug === 'advanced-widgets-elementor-pro'
      ? 'All screenshots are from the Advanced Widgets admin screens inside WordPress.'
      : plugin.slug === 'eaf-wpbakery'
      ? 'All screenshots are from the Essential Addons for WPBakery admin screens inside WordPress.'
      : null;

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: plugin.name,
            description: plugin.description || plugin.tagline,
            applicationCategory: 'Plugin',
            operatingSystem: 'WordPress',
            offers: {
              '@type': 'Offer',
              price: plugin.price,
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: plugin.rating,
              reviewCount: plugin.review_count,
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="px-4 lg:px-8 py-12 lg:py-16">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2">
                {/* Breadcrumb */}
                <nav className="flex text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-blue-600">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <Link href="/plugins" className="hover:text-blue-600">
                    Plugins
                  </Link>
                  {plugin.categories && (
                    <>
                      <span className="mx-2">/</span>
                      <Link href={`/plugins?category=${plugin.categories.slug}`} className="hover:text-blue-600">
                        {plugin.categories.name}
                      </Link>
                    </>
                  )}
                  <span className="mx-2">/</span>
                  <span className="text-black font-medium">{plugin.name}</span>
                </nav>

                {/* Plugin Name & Icon */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-24 w-24 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Package className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-bold text-black mb-3">{plugin.name}</h1>
                    <p className="text-xl lg:text-2xl text-gray-600 font-normal">{plugin.tagline}</p>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {!isFreeVersion && (
                    <>
                      {/* Star Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < Math.floor(plugin.rating)
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-medium text-black">{plugin.rating.toFixed(1)}</span>
                        <a href="#reviews" className="text-gray-600 hover:underline">
                          ({plugin.review_count.toLocaleString()} reviews)
                        </a>
                      </div>

                      {/* Download Count */}
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 text-base">
                        <Download className="h-4 w-4 mr-2" />
                        {plugin.download_count.toLocaleString()}+ Active Installations
                      </Badge>
                    </>
                  )}
                  {/* For free version, comment out but keep the code */}
                  {/* {isFreeVersion && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < Math.floor(plugin.rating)
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-medium text-black">{plugin.rating.toFixed(1)}</span>
                        <a href="#reviews" className="text-gray-600 hover:underline">
                          ({plugin.review_count.toLocaleString()} reviews)
                        </a>
                      </div>
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 text-base">
                        <Download className="h-4 w-4 mr-2" />
                        {plugin.download_count.toLocaleString()}+ Active Installations
                      </Badge>
                    </>
                  )} */}
                </div>

                {/* Additional Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <span>Version {plugin.version}</span>
                  <span>•</span>
                  <span>Updated 3 days ago</span>
                  <span>•</span>
                  <span>WordPress 5.8 - 6.4+</span>
                </div>

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-2 border-gray-200 bg-white px-4 py-2">
                    No Coding Required
                  </Badge>
                  <Badge variant="outline" className="border-2 border-gray-200 bg-white px-4 py-2">
                    Lightning Fast
                  </Badge>
                  <Badge variant="outline" className="border-2 border-gray-200 bg-white px-4 py-2">
                    SEO Optimized
                  </Badge>
                  <Badge variant="outline" className="border-2 border-gray-200 bg-white px-4 py-2">
                    24/7 Support
                  </Badge>
                </div>
              </div>

              {/* Right Column - Sticky Pricing Card */}
              <div className="lg:col-span-1">
                <Card className="border-2 border-gray-200 shadow-xl sticky top-24">
                  <CardHeader className="text-center">
                    <div className="text-5xl font-bold text-black mb-2">${displayPrice}</div>
                    <div className="text-lg text-gray-600">/lifetime</div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features List */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Lifetime Updates</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">1 Year Premium Support</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">30-Day Money Back Guarantee</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Used on one website</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Documentation & Tutorials</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <CheckoutButtons slug={plugin.slug} price={displayPrice} downloadUrl={downloadUrl} name={plugin.name} isFreeVersion={isFreeVersion} />

                    {/* Trust Signals */}
                    <div className="text-center pt-4 border-t border-gray-200">
                      <div className="flex justify-center gap-4 text-gray-500 mb-2">
                        <Shield className="w-4 h-4" />
                        <CreditCard className="w-4 h-4" />
                        <RotateCcw className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-gray-500">Secure checkout via Stripe or PayPal</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 lg:px-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto border-0 bg-transparent h-auto p-0">
                <TabsTrigger
                  value="overview"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="installation"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Installation
                </TabsTrigger>
                {!isFreeVersion && (
                  <TabsTrigger
                    value="reviews"
                    className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                  >
                    Reviews
                  </TabsTrigger>
                )}
                {/* {isFreeVersion && (
                  <TabsTrigger
                    value="reviews"
                    className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                  >
                    Reviews
                  </TabsTrigger>
                )} */}
                <TabsTrigger
                  value="comparison"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Comparison
                </TabsTrigger>
                <TabsTrigger
                  value="use-cases"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Use Cases
                </TabsTrigger>
                <TabsTrigger
                  value="faqs"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  FAQs
                </TabsTrigger>
                {!isFreeVersion && (
                  <TabsTrigger
                    value="screenshots"
                    className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                  >
                    Screenshots
                  </TabsTrigger>
                )}
                {/* {isFreeVersion && (
                  <TabsTrigger
                    value="screenshots"
                    className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                  >
                    Screenshots
                  </TabsTrigger>
                )} */}
                <TabsTrigger
                  value="free-vs-pro"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Free vs Pro
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <TabsContent value="overview" className="py-16">
                {isFreeVersion && (
                  <div className="mb-12 rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Want More? Upgrade to Advanced Widgets Pro
                        </h3>
                        <p className="text-lg text-gray-700 mb-4">
                          Get access to the full 538+ widget library, 72 WooCommerce widgets, AI-powered features, 100+ templates, and priority support.
                        </p>
                        <Link href="/plugins/advanced-widgets-elementor-pro">
                          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            <ArrowRight className="w-5 h-5 mr-2" />
                            View Pro Features
                          </Button>
                        </Link>
                      </div>
                      <div className="hidden lg:block">
                        <div className="text-6xl font-bold text-blue-600">538+</div>
                        <div className="text-sm text-gray-600 text-center">Widgets</div>
                      </div>
                    </div>
                  </div>
                )}
                {plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter' ? (
                  <div className="space-y-16">
                    <PJFilterOverview />
                    <PJFilterROI />
                    <div>
                      <h2 className="text-3xl font-bold mb-8 text-center">What Beta Testers Say</h2>
                      <PJFilterTestimonials />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="prose prose-lg max-w-none mb-16">
                      <h2 className="text-3xl font-bold mb-6">What is {plugin.name}?</h2>
                      <p className="text-lg leading-relaxed text-gray-700">
                        {plugin.description || plugin.tagline}
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <div className="mb-16">
                      <h2 className="text-3xl font-bold mb-12 text-center">Why Choose {plugin.name}?</h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                          const Icon = benefit.icon;
                          return (
                            <Card
                              key={index}
                              className="hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                              <CardHeader>
                                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                  <Icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">{benefit.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <CardDescription className="text-gray-600 leading-relaxed">
                                  {benefit.description}
                                </CardDescription>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="features" className="py-16">
                {plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter' ? (
                  <div className="space-y-16">
                    <PJFilterFeatures />
                    <PJFilterIntegrations />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-4xl font-bold mb-6 text-center">Complete Feature List</h2>
                    <p className="text-xl text-gray-600 mb-16 text-center">
                      Everything you need to enhance your WordPress site
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {features.map((feature: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-base text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {isFreeVersion && (
                      <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Need More Advanced Features?
                        </h3>
                        <p className="text-lg text-gray-700 mb-5 max-w-2xl mx-auto">
                          Advanced Widgets Pro includes 386 additional widgets, AI content generation, advanced WooCommerce tools, premium templates, and much more.
                        </p>
                        <Link href="/plugins/advanced-widgets-elementor-pro">
                          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Upgrade to Pro
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="installation" className="py-16">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-center">Installation Guide</h2>
                  <p className="text-xl text-gray-600 mb-16 text-center">
                    Get started in minutes with our simple installation process
                  </p>

                  <div className="space-y-8">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                            1
                          </div>
                          <CardTitle className="text-2xl">Download the Plugin</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          After purchasing, download the plugin ZIP file from your account dashboard.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                            2
                          </div>
                          <CardTitle className="text-2xl">Upload to WordPress</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          Go to Plugins → Add New → Upload Plugin and select the downloaded ZIP file.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                            3
                          </div>
                          <CardTitle className="text-2xl">Activate & Configure</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          Activate the plugin and follow the setup wizard to configure your settings.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="py-16" id="reviews">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-center">Customer Reviews</h2>
                  <p className="text-center text-gray-600 mb-12">What users say about {plugin.name}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sampleReviews.map((r, i) => (
                      <Card key={i} className="h-full">
                        <CardHeader>
                          <CardTitle className="text-lg">{r.title}</CardTitle>
                          <CardDescription className="text-sm">{r.author} • {r.role}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className={`h-4 w-4 ${idx < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{r.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="py-16">
                {plugin.slug === 'advanced-widgets-elementor-pro' ? (
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-bold mb-2">Where Advanced Widgets Pro Stands</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      The free version already gives you 152+ professional widgets. When you upgrade to Advanced Widgets Pro, you
                      unlock the full 538+ widget library and also leap ahead of other popular Elementor addons:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-3 text-left">Feature</th>
                            <th className="p-3 text-left">Advanced Widgets Pro</th>
                            <th className="p-3 text-left">Essential Addons</th>
                            <th className="p-3 text-left">ElementsKit</th>
                            <th className="p-3 text-left">Premium Addons</th>
                            <th className="p-3 text-left">Astra Sites*</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3">Total Widgets</td>
                            <td className="p-3 font-semibold">538 ✅</td>
                            <td className="p-3">110+</td>
                            <td className="p-3">90+</td>
                            <td className="p-3">90+</td>
                            <td className="p-3">N/A (Templates)</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">AI Content Generation</td>
                            <td className="p-3 font-semibold">✅ Industry‑First</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">✅ (Limited)</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">AI Image Alt Text</td>
                            <td className="p-3 font-semibold">✅</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">Performance Optimization</td>
                            <td className="p-3 font-semibold">48% Faster ✅</td>
                            <td className="p-3">Basic</td>
                            <td className="p-3">Minimal</td>
                            <td className="p-3">Basic</td>
                            <td className="p-3">N/A</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">WooCommerce Widgets</td>
                            <td className="p-3 font-semibold">72 ✅</td>
                            <td className="p-3">11</td>
                            <td className="p-3">4</td>
                            <td className="p-3">4</td>
                            <td className="p-3">N/A</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">REST API</td>
                            <td className="p-3 font-semibold">16 Endpoints ✅</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">WP‑CLI Tools</td>
                            <td className="p-3 font-semibold">30+ Commands ✅</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                            <td className="p-3">❌</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs mt-3 text-gray-500">*Astra Sites is primarily a template library, not a widget addon, so direct comparison is limited.</p>

                    <h3 className="text-2xl font-bold mt-10 mb-4">Key Differentiators</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Unmatched Widget Count:</strong> 538 widgets (vs 152+ in the free version and around 90–110 in
                        competing addons).
                      </li>
                      <li>
                        <strong>AI‑Powered Features:</strong> both free and Pro include AI content and image tools when you connect
                        your own API key; Pro adds deeper integration and presets designed for agencies and power users.
                      </li>
                      <li>
                        <strong>WooCommerce Dominance:</strong> 72 specialized widgets for product discovery, merchandising, and
                        checkout flows.
                      </li>
                      <li>
                        <strong>Developer Tools:</strong> 16 REST endpoints and 30+ WP‑CLI commands to automate and integrate your
                        Elementor builds.
                      </li>
                      <li>
                        <strong>Performance First:</strong> 48% faster average page loads thanks to conditional loading, critical CSS,
                        and granular controls that go beyond basic optimization in competing addons.
                      </li>
                    </ul>

                    <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50/60 px-6 py-5 not-prose">
                      <h4 className="text-lg font-semibold text-blue-900 mb-1">Already using the free version?</h4>
                      <p className="text-sm text-blue-900/80 mb-3">
                        Upgrade to Advanced Widgets Pro to unlock the full 538+ widget library, 72 WooCommerce widgets, and over 100
                        templates while keeping your existing layouts.
                      </p>
                      <p className="text-xs text-blue-900/70">
                        Install Pro alongside the free plugin and activate your license. Existing widgets continue to work, and you
                        gain more options everywhere you already build.
                      </p>
                    </div>
                  </div>
                ) : plugin.slug === 'eaf-wpbakery' ? (
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-bold mb-2">Where Essential Addons for WPBakery Pro Stands</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      The free version gives you 60+ core elements across 8 categories. Essential Addons Pro unlocks the full 538+ element
                      library across 17 categories and adds performance, analytics, and developer tooling beyond typical WPBakery addons.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-3 text-left">Area</th>
                            <th className="p-3 text-left">EA for WPBakery Pro</th>
                            <th className="p-3 text-left">Typical WPBakery addons*</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Element coverage</td>
                            <td className="p-3">538+ elements across 17 categories (content, post, media, marketing, dynamic, WooCommerce, forms, navigation, data, sliders, utility, events, email, auth, payment, sales, header/footer)</td>
                            <td className="p-3">Dozens of elements focused on core content, media, and WooCommerce layouts</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Marketing & sales</td>
                            <td className="p-3">Dedicated marketing, sales & promotion, and email categories with countdowns, CTAs, banners, coupons, and opt-in blocks</td>
                            <td className="p-3">Marketing elements spread across a few generic widgets</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Dynamic content</td>
                            <td className="p-3">Dynamic content category for pulling data from posts, taxonomies, custom fields, and external sources</td>
                            <td className="p-3">Limited dynamic content support tied to WPBakery core features</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Performance & analytics</td>
                            <td className="p-3">Conditional asset loading, minified CSS/JS, custom analytics DB, performance monitoring dashboard, Query Monitor integration</td>
                            <td className="p-3">Basic performance options; typically no built-in analytics or monitoring</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Developer experience</td>
                            <td className="p-3">50+ hooks & filters, custom param types, detailed analytics, white-label options, and PHPCS-compliant codebase</td>
                            <td className="p-3">Limited hooks and configuration; white-label and deep analytics are uncommon</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Templates & workflow</td>
                            <td className="p-3">Premium templates, import/export of settings, and tools to identify unused/slow elements</td>
                            <td className="p-3">Template libraries vary; most lack element-level performance insights</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mt-3 text-xs text-gray-500">
                        *Based on common feature sets in popular WPBakery addons (including Ultimate Addons); exact capabilities vary by
                        product.
                      </p>
                    </div>

                    <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50/60 px-6 py-5 not-prose">
                      <h4 className="text-lg font-semibold text-blue-900 mb-1">Already using the free version?</h4>
                      <p className="text-sm text-blue-900/80 mb-3">
                        Upgrade to Essential Addons Pro to unlock the full 538+ element library, advanced categories, performance
                        analytics, and white-label options  while keeping your existing WPBakery layouts.
                      </p>
                      <p className="text-xs text-blue-900/70">
                        Install Pro, activate your license, and continue editing in WPBakery as usual. Existing sections keep working,
                        and you gain more specialized elements wherever you already build.
                      </p>
                    </div>
                  </div>
                ) : plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter' ? (
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-bold mb-2">How PJ Filter Compares</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      PJ Filter is built for conversion and merchandising, not just navigation. Heres how it differs from typical
                      WooCommerce filter plugins and from the free evaluation version:
                    </p>

                    <div className="overflow-x-auto mb-10">
                      <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-3 text-left">Area</th>
                            <th className="p-3 text-left">PJ Filter Pro</th>
                            <th className="p-3 text-left">Most filter addons*</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Filtering scope</td>
                            <td className="p-3">Products, categories, taxonomies, attributes, price, rating, stock/sale status, ACF & meta fields, date</td>
                            <td className="p-3">Primarily products and basic taxonomies/attributes</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">View types</td>
                            <td className="p-3">8 view types including checkboxes, radios, dropdowns, sliders, color swatches, date pickers, toggles, rating stars</td>
                            <td className="p-3">Standard checkboxes, radios, and dropdowns</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Analytics & A/B testing</td>
                            <td className="p-3">Built-in analytics dashboard, conversion and revenue impact tracking, A/B tests for filter sets</td>
                            <td className="p-3">Usually no built-in analytics; relies on external tools like Google Analytics</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">AI & recommendations</td>
                            <td className="p-3">AI/ML recommendation engine, visual & voice search, smart suggestions</td>
                            <td className="p-3">Typically no AI or recommendation layer</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">SEO & URLs</td>
                            <td className="p-3">Clean filter URLs, dynamic meta tags, schema markup for filtered views</td>
                            <td className="p-3">Basic SEO-friendly URLs if configured; limited meta/schema control</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Onboarding & presets</td>
                            <td className="p-3">5-step wizard with industry presets (fashion, electronics, grocery, home, beauty, sports)</td>
                            <td className="p-3">Manual setup; presets are rare or limited</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Enterprise & dev tools</td>
                            <td className="p-3">Multi-site & multi-vendor ready, REST & GraphQL APIs, webhooks, WP-CLI commands</td>
                            <td className="p-3">Usually REST-only, no webhooks or WP-CLI tooling</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mt-3 text-xs text-gray-500">
                        *Based on common feature sets in popular WooCommerce filter plugins; exact capabilities vary by product.
                      </p>
                    </div>

                    <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/60 px-6 py-5 not-prose">
                      <h4 className="text-lg font-semibold text-blue-900 mb-1">Already tried PJ Filter Free?</h4>
                      <p className="text-sm text-blue-900/80 mb-3">
                        The free version is intentionally limited to 3 filters and 2 attribute filters with no AJAX or analytics. PJ Filter
                        Pro removes those limits and adds smart dashboards, AI search, and revenue-focused reporting.
                      </p>
                      <p className="text-xs text-blue-900/70">
                        Install PJ Filter Pro alongside the free plugin and activate your license. Your existing filters keep working, and
                        you unlock advanced controls instead of rebuilding from scratch.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-600">No comparison available for this plugin.</div>
                )}
              </TabsContent>


              <TabsContent value="use-cases" className="py-16">
                {plugin.slug === 'advanced-widgets-elementor' || plugin.slug === 'advanced-widgets-elementor-pro' ? (
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-bold mb-6">Use Cases</h2>
                    <h3 className="text-2xl font-semibold mb-2">The Overwhelmed Freelancer</h3>
                    <p>Build full client pages in minutes using AI‑generated copy and 538 widgets. Reduce project time from 40 hours to 18 hours and take on more clients.</p>
                    <h3 className="text-2xl font-semibold mt-6 mb-2">The Ambitious Agency Owner</h3>
                    <p>Standardize delivery with pre‑built templates, AI assistance, and 72 WooCommerce widgets. Increase throughput by ~40% without adding headcount.</p>
                    <h3 className="text-2xl font-semibold mt-6 mb-2">The E‑commerce Underdog</h3>
                    <p>Transform store UX with product carousels, quick view, and advanced checkout layouts. Lower cart abandonment and raise AOV with zero custom code.</p>
                  </div>
                ) : (
                  <div className="text-gray-600">No use cases available for this plugin.</div>
                )}
              </TabsContent>

              <TabsContent value="faqs" className="py-16">
                {plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter' ? (
                  <div>
                    <h2 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 mb-16 text-center">
                      Find answers to common questions about {plugin.name}
                    </p>
                    <PJFilterFAQs />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 mb-16 text-center">
                      Find answers to common questions about {plugin.name}
                    </p>

                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">Is this compatible with my theme?</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">
                            Yes, {plugin.name} is designed to work with any properly coded WordPress theme. It follows WordPress coding standards and best practices.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">Do I get updates and support?</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">
                            Yes! You get lifetime updates and 1 year of premium support. Extended support is available for purchase.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">Can I use this on multiple sites?</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">
                            Yes, our license allows you to use {plugin.name} on unlimited sites that you own or manage.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">What if I&apos;m not satisfied?</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">
                            We offer a 30-day money-back guarantee. If you&apos;re not completely satisfied, contact us for a full refund.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="screenshots" className="py-16">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-center">Screenshots</h2>
                  <p className="text-xl text-gray-600 mb-12 text-center">
                    Preview how {plugin.name} looks inside WordPress before you install it.
                  </p>

                  {screenshotItems ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {screenshotItems.map((shot) => (
                        <Card key={shot.title} className="overflow-hidden">
                          <div className="relative aspect-video bg-slate-100">
                            <Image
                              src={shot.src}
                              alt={shot.alt}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{shot.title}</CardTitle>
                            <CardDescription className="text-sm">{shot.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3].map((index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <span className="text-sm text-gray-500">Screenshot {index} placeholder</span>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              {index === 1 && `${plugin.name} dashboard`}
                              {index === 2 && 'Key settings panel'}
                              {index === 3 && 'Frontend result on your site'}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}

                  {screenshotCaption && (
                    <p className="text-sm text-gray-500 mt-4 text-center max-w-3xl mx-auto">
                      {screenshotCaption}
                    </p>
                  )}

                  {plugin.demo_url && (
                    <div className="text-center mt-10">
                      <a
                        href={plugin.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View full live demo
                      </a>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="free-vs-pro" className="py-16">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-center">Free vs Pro</h2>
                  <p className="text-xl text-gray-600 mb-12 text-center">
                    See exactly what you get in the free version versus the full {plugin.name} Pro.
                  </p>

                  {plugin.slug === 'advanced-widgets-elementor' || plugin.slug === 'advanced-widgets-elementor-pro' ? (
                    <div className="space-y-10">
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-3 text-left">Area</th>
                              <th className="p-3 text-left">Free</th>
                              <th className="p-3 text-left">Pro</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Total widgets</td>
                              <td className="p-3">152+ widgets across 11 categories</td>
                              <td className="p-3 font-semibold">538+ professional widgets across 17 categories</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">WooCommerce widgets</td>
                              <td className="p-3">20+ product, cart, and shop widgets</td>
                              <td className="p-3 font-semibold">72+ WooCommerce widgets for grids, carts, checkout, offers, and more</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Dynamic tags</td>
                              <td className="p-3">3 dynamic tags (Post Title, Site Title, Post Date)</td>
                              <td className="p-3 font-semibold">23+ dynamic tags for posts, users, WooCommerce, and custom fields</td>
                            </tr>
                            <tr className="border-t bg-slate-50">
                              <td className="p-3 font-medium">AI features</td>
                              <td className="p-3">
                                AI content, image alt text, and layout suggestions included when you connect your own API key
                              </td>
                              <td className="p-3 font-semibold">
                                Same AI engine plus advanced presets, better prompts, and tighter integration with Pro widgets
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Template library</td>
                              <td className="p-3">20+ pre-built section and page templates</td>
                              <td className="p-3 font-semibold">100+ professionally designed templates and starter sites</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Performance tools</td>
                              <td className="p-3">Lazy loading, critical CSS, conditional loading, asset minification, smart caching</td>
                              <td className="p-3 font-semibold">Everything in free plus more granular controls per widget, device, and breakpoint</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Developer tools</td>
                              <td className="p-3">REST API (16 endpoints) and 30+ WP-CLI commands</td>
                              <td className="p-3 font-semibold">Same APIs plus extended hooks, filters, and Pro-only helper functions</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Usage & licensing</td>
                              <td className="p-3">Free forever for personal and client sites</td>
                              <td className="p-3 font-semibold">Commercial license with priority support and usage on unlimited client projects</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Support</td>
                              <td className="p-3">Community and standard support</td>
                              <td className="p-3 font-semibold">Priority ticket support from the core team</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Updates</td>
                              <td className="p-3">Regular bug fixes and compatibility releases</td>
                              <td className="p-3 font-semibold">All free updates plus new widgets, extensions, and early access features</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-sm text-gray-700">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Who the Free version is for</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>New Elementor users exploring what advanced widgets can do</li>
                              <li>Smaller sites that only need a subset of widgets</li>
                              <li>Teams validating layout ideas before committing to Pro</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Who the Pro version is for</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Agencies and freelancers shipping many Elementor sites</li>
                              <li>Stores that rely on WooCommerce for serious revenue</li>
                              <li>Teams that want the full 538+ widget library and templates</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : plugin.slug === 'eaf-wpbakery' ? (
                    <div className="space-y-10">
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-3 text-left">Area</th>
                              <th className="p-3 text-left">EA for WPBakery Free</th>
                              <th className="p-3 text-left">EA for WPBakery Pro</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Elements & categories</td>
                              <td className="p-3">60+ core elements across 8 essential categories</td>
                              <td className="p-3 font-semibold">538+ elements across 17 categories, including marketing, sales, dynamic content, events, email, auth, payment, and header/footer</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Locked categories</td>
                              <td className="p-3">Marketing, sales & promotions, dynamic content, events, email, auth, payment, header/footer builder, and data display are not available</td>
                              <td className="p-3 font-semibold">All 17 categories unlocked with full access to advanced marketing, sales, and data elements</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Templates</td>
                              <td className="p-3">Starter section and page templates to get going</td>
                              <td className="p-3 font-semibold">Large library of premium templates and layouts optimized for conversions</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Extensions</td>
                              <td className="p-3">Core extensions only</td>
                              <td className="p-3 font-semibold">15+ extensions for marketing, dynamic content, sales, and workflow enhancements</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Performance & analytics</td>
                              <td className="p-3">Conditional asset loading and minified CSS/JS for solid baseline performance</td>
                              <td className="p-3 font-semibold">Everything in Free plus a dedicated analytics database, performance dashboard, Query Monitor integration, and slow-element detection</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Developer & branding</td>
                              <td className="p-3">Standard hooks and configuration options</td>
                              <td className="p-3 font-semibold">50+ hooks & filters, advanced analytics, white-label options, and custom branding controls</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Support & updates</td>
                              <td className="p-3">Community/standard support and regular compatibility updates</td>
                              <td className="p-3 font-semibold">Priority support, premium updates, and extended documentation</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-sm text-gray-700">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">When EA Free is enough</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Smaller WPBakery sites that need a solid set of core elements</li>
                              <li>Personal projects and MVPs validating layout ideas</li>
                              <li>Teams evaluating Essential Addons before rolling it out across clients</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">When to upgrade to Pro</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Agencies building many WPBakery sites with varied requirements</li>
                              <li>Stores and marketing teams needing advanced elements and analytics</li>
                              <li>Teams that care about performance insights, white-labeling, and developer tooling</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : plugin.slug === 'pj-filter' || plugin.slug === 'pj-product-filter' ? (
                    <div className="space-y-10">
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-3 text-left">Area</th>
                              <th className="p-3 text-left">PJ Filter Free</th>
                              <th className="p-3 text-left">PJ Filter Pro</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Purpose</td>
                              <td className="p-3">Basic WooCommerce product filtering for evaluation and small catalogs</td>
                              <td className="p-3 font-semibold">Full production filter suite for high-traffic, revenue-focused stores</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Number of filters</td>
                              <td className="p-3">Limited to 3 filters and 2 attribute filters</td>
                              <td className="p-3 font-semibold">Unlimited filters, groups, and attribute filters</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Filter types</td>
                              <td className="p-3">Core product taxonomies and attributes</td>
                              <td className="p-3 font-semibold">Taxonomies, attributes, price range, rating, stock/sale status, ACF & meta fields, date filters</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Filter views</td>
                              <td className="p-3">Standard checkbox and dropdown controls</td>
                              <td className="p-3 font-semibold">8 view types: checkboxes, radios, dropdowns, sliders, color swatches, date pickers, toggles, rating stars</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">AJAX & UX</td>
                              <td className="p-3">No AJAX; filters reload the page</td>
                              <td className="p-3 font-semibold">AJAX filtering with instant updates and smart loading states</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Analytics & A/B testing</td>
                              <td className="p-3">No built-in analytics or tests</td>
                              <td className="p-3 font-semibold">Smart dashboard, conversion & revenue tracking, A/B tests for filter sets</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">AI & search</td>
                              <td className="p-3">Standard filter logic only</td>
                              <td className="p-3 font-semibold">AI/ML recommendations, visual & voice search, natural language queries</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">SEO & URLs</td>
                              <td className="p-3">No SEO URLs or meta/schema controls</td>
                              <td className="p-3 font-semibold">Clean filter URLs, dynamic meta tags, schema markup for filtered views</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Onboarding & presets</td>
                              <td className="p-3">Manual setup of each filter</td>
                              <td className="p-3 font-semibold">5-step wizard with industry presets for common store types</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3 font-medium">Enterprise & dev tools</td>
                              <td className="p-3">Single-site usage; no dedicated APIs or CLI tools</td>
                              <td className="p-3 font-semibold">Multi-site and multi-vendor ready, REST & GraphQL APIs, webhooks, WP-CLI commands</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-sm text-gray-700">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">When PJ Filter Free is enough</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Small catalogs testing whether filters improve UX</li>
                              <li>Personal or side projects with simple requirements</li>
                              <li>Teams evaluating PJ Filter before rolling it out broadly</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">When to upgrade to Pro</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Stores where filtering impacts real revenue and KPIs</li>
                              <li>Catalogs with many attributes, taxonomies, or custom data</li>
                              <li>Teams that need analytics, AI search, and enterprise tooling</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : hasFreeVersion ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-3 text-left">Feature</th>
                            <th className="p-3 text-left">Free (WordPress.org)</th>
                            <th className="p-3 text-left">{plugin.name} Pro</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3">Core features</td>
                            <td className="p-3">Limited selection of core functionality</td>
                            <td className="p-3 font-semibold">All core features unlocked</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">Advanced options</td>
                            <td className="p-3">Basic customization</td>
                            <td className="p-3 font-semibold">Advanced controls, conditions & integrations</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">Sites allowed</td>
                            <td className="p-3">Unlimited</td>
                            <td className="p-3 font-semibold">Unlimited (with commercial usage)</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">Support</td>
                            <td className="p-3">Community / forum only</td>
                            <td className="p-3 font-semibold">Priority ticket support</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3">Updates</td>
                            <td className="p-3">Regular bug fixes</td>
                            <td className="p-3 font-semibold">Feature releases + early access</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="max-w-2xl mx-auto text-center text-gray-700">
                      <p className="mb-4">
                        {plugin.name} is offered as a single premium version with all features included.
                      </p>
                      <p>
                        There is no limited free edition to manage – you get the full experience, priority support, and ongoing
                        updates with every license.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Plugins */}
        {relatedPlugins.length > 0 && (
          <section className="py-16 bg-white border-t-2 border-gray-200">
            <div className="px-4 lg:px-8">
              <h2 className="text-3xl font-bold mb-12 text-center">You Might Also Like</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPlugins.map((relatedPlugin) => (
                  <Card key={relatedPlugin.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <Badge className="bg-blue-600">${getPluginDisplayPrice(relatedPlugin)}</Badge>
                      </div>
                      <CardTitle className="text-xl">{relatedPlugin.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{relatedPlugin.tagline}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{relatedPlugin.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{relatedPlugin.download_count.toLocaleString()}+</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/plugins/${getPluginDisplaySlug(relatedPlugin)}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="px-4 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Join {plugin.download_count.toLocaleString()}+ users and enhance your WordPress site today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isFreeVersion && (
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now - ${displayPrice}
                </Button>
              )}
              {isFreeVersion && (
                <Link href="/plugins/advanced-widgets-elementor-pro">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Upgrade to Pro - $49
                  </Button>
                </Link>
              )}
              {downloadUrl && (
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                    <Download className="w-5 h-5 mr-2" />
                    {isFreeVersion ? 'Download Free Version' : 'Download Core Plugin'}
                  </Button>
                </a>
              )}
            </div>
            {!isFreeVersion && (
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  30-Day Money Back Guarantee
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  {plugin.rating} Star Rating
                </div>
                <div className="flex items-center gap-2">
                  <HeadphonesIcon className="h-4 w-4" />
                  24/7 Support
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
