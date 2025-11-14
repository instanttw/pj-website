import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
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
    redirect('/plugins/advanced-widgets-elementor');
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
    'advanced-widgets-elementor': 1200500,
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
    'eaf-wpbakery',
    'pj-filter',
  ]);
  const hasFreeVersion = freeVersionSlugs.has(plugin.slug);

  // Prefer download link (Google Drive) over legacy demo links
  let downloadUrl = plugin.download_url || null;
  // Override core download link for Advanced Widgets for Elementor Pro
  if (plugin.slug === 'advanced-widgets-elementor') {
    downloadUrl = 'https://tinyurl.com/advanced-widget-core';
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
                    <CheckoutButtons slug={plugin.slug} price={displayPrice} downloadUrl={downloadUrl} name={plugin.name} />

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
                <TabsTrigger
                  value="reviews"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Reviews
                </TabsTrigger>
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
                <TabsTrigger
                  value="screenshots"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Screenshots
                </TabsTrigger>
                <TabsTrigger
                  value="free-vs-pro"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  Free vs Pro
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <TabsContent value="overview" className="py-16">
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
                {plugin.slug === 'advanced-widgets-elementor' ? (
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-bold mb-6">Why Advanced Widgets Crushes the Competition</h2>
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
                      <li><strong>Unmatched Widget Count:</strong> 538 widgets (≈5x more than nearest competitor)</li>
                      <li><strong>AI‑Powered Features:</strong> content generation, image alt text, layout suggestions</li>
                      <li><strong>WooCommerce Dominance:</strong> 72 specialized widgets</li>
                      <li><strong>Developer Tools:</strong> 16 REST endpoints + 30+ WP‑CLI commands</li>
                      <li><strong>Performance First:</strong> 48% faster average page loads</li>
                    </ul>
                  </div>
                ) : (
                  <div className="text-gray-600">No comparison available for this plugin.</div>
                )}
              </TabsContent>


              <TabsContent value="use-cases" className="py-16">
                {plugin.slug === 'advanced-widgets-elementor' ? (
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

                  {plugin.slug === 'advanced-widgets-elementor' ? (
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
                        There is no limited free edition to manage  you get the full experience, priority support, and ongoing
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
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now - ${displayPrice}
              </Button>
              {downloadUrl && (
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                    <Download className="w-5 h-5 mr-2" />
                    Download Core Plugin
                  </Button>
                </a>
              )}
            </div>
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
          </div>
        </section>
      </div>
    </>
  );
}
