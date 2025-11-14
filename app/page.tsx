import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, Star, Users, Package, Zap, RefreshCw, HeadphonesIcon, Code, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getFallbackFeaturedPlugins } from '@/data/fallback-plugins';
import { getPluginDisplayName, getPluginDisplaySlug, getPluginDisplayPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Premium WordPress & WooCommerce Plugins for Modern Sites | PrintJones',
  description:
    'Discover premium WordPress and WooCommerce plugins built for performance, SEO, and conversions. Trusted by 500K+ active installations worldwide.',
};

async function getFeaturedPlugins() {
  try {
    const { data: plugins, error } = await supabase
      .from('plugins')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(8);

    if (error) {
      console.error('Error fetching featured plugins:', error);
      return [];
    }

    return (plugins || []) as any[];
  } catch (error) {
    console.error('Error connecting to database:', error);
    return [];
  }
}

export default async function Home() {
  let featuredPlugins = await getFeaturedPlugins();
  if (!featuredPlugins || featuredPlugins.length === 0) {
    featuredPlugins = getFallbackFeaturedPlugins() as any[];
  }

  // Hide selected plugins temporarily on homepage (not deleted)
  const hiddenSlugs = new Set([
    'pj-media-library',
    'pj-product-designer',
    'pj-menu-widget',
    'pj-store-locator',
    'pj-multicurrency',
    'pj-hide-my-admin',
    'pj-amazon-affiliate',
    'pj-extra-product-options',
    'pj-slider',
  ]);
  featuredPlugins = (featuredPlugins as any[]).filter((p: any) => !hiddenSlugs.has(p.slug));

  // Do not exclude media library anymore; include our curated featured set

  featuredPlugins = (featuredPlugins as any[]).map((p: any) => ({
    ...p,
    name: getPluginDisplayName(p),
    // Increase download counts for the original 3 featured plugins on homepage only
    download_count:
      p.slug === 'advanced-widgets-elementor' ? 1200500 :
      p.slug === 'eaf-wpbakery' ? 990340 :
      p.slug === 'pj-filter' ? 650780 : p.download_count,
  }));

  const stats = [
    { label: 'Active Installations', value: '500K+', icon: Users },
    { label: 'Total Downloads', value: '2M+', icon: Download },
    { label: 'Happy Customers', value: '50K+', icon: Star },
    { label: 'Plugins Available', value: '21', icon: Package },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with minimal footprint',
    },
    {
      icon: RefreshCw,
      title: 'Regular Updates',
      description: 'Frequent updates with new features and security patches',
    },
    {
      icon: HeadphonesIcon,
      title: 'Premium Support',
      description: '24-hour response time from expert developers',
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Well-documented, maintainable, and extensible code',
    },
    {
      icon: TrendingUp,
      title: 'SEO Optimized',
      description: 'Built with SEO best practices in mind',
    },
    {
      icon: Package,
      title: 'Developer Friendly',
      description: 'Extensive hooks, filters, and API documentation',
    },
  ];

  const reviews = [
    {
      author: 'Emma L.',
      role: 'Small business owner',
      title: 'Immediate impact on our site',
      content:
        'Setup was straightforward and the improvements were visible the same day. Our team didn\'t need to touch code and everything stayed fast.',
      rating: 5,
    },
    {
      author: 'David K.',
      role: 'WordPress developer',
      title: 'Clean, predictable, and well‑supported',
      content:
        'API is thoughtfully designed and the docs are solid. Support replies with practical answers, not copy‑paste. Great DX.',
      rating: 5,
    },
    {
      author: 'Sarah P.',
      role: 'Agency PM',
      title: 'Reliable tools for client work',
      content:
        'We use these plugins across multiple client sites. Stable updates and zero surprise regressions have saved us countless hours.',
      rating: 5,
    },
    {
      author: 'Jonas R.',
      role: 'E‑commerce lead',
      title: 'Better conversions with minimal effort',
      content:
        'Our store navigation and product discovery improved noticeably. The performance profile remains excellent under load.',
      rating: 5,
    },
    {
      author: 'Priya C.',
      role: 'Site owner',
      title: 'Worth every dollar',
      content:
        'Clear onboarding, sensible defaults, and features we actually use. It just works and keeps working.',
      rating: 5,
    },
    {
      author: 'Alex G.',
      role: 'Freelance integrator',
      title: 'Great balance of power and simplicity',
      content:
        'Non‑technical clients can manage settings while I keep advanced options for edge cases. Excellent balance.',
      rating: 5,
    },
  ];

  const orgAndSiteSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PrintJones',
      url: 'https://printjones.com',
      areaServed: ['US', 'CA', 'AU', 'NZ', 'EU'],
      description:
        'Premium WordPress and WooCommerce plugins for performance, SEO, and conversions.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PrintJones',
      url: 'https://printjones.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://printjones.com/plugins?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgAndSiteSchema) }}
      />
      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-sky-400 to-blue-600" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-indigo-500 to-purple-600" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-1 rounded-full">
              Trusted by 571,300+ websites
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black mb-6">
              Premium WordPress Plugins for Modern Websites
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Build faster with performance‑first, well‑documented plugins. Designed for professionals, loved by teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plugins">
                <Button size="lg" className="bg-primary text-white hover:bg-blue-700 text-base px-8 shadow-sm">
                  Browse Plugins
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="text-base px-8 border-2">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(16,24,40,.06),0_10px_20px_rgba(16,24,40,.04)] hover:shadow-[0_1px_2px_rgba(16,24,40,.10),0_12px_24px_rgba(16,24,40,.10)] transition-all"
                >
                  <Icon className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 text-center">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">Featured Plugins</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and powerful WordPress plugins
            </p>
          </div>

          {featuredPlugins.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredPlugins.map((plugin) => (
                <Card key={plugin.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      {getPluginDisplayPrice(plugin) === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        <Badge>${getPluginDisplayPrice(plugin)}</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{plugin.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{plugin.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{plugin.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{plugin.download_count.toLocaleString()}+</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {(() => {
                      const disabled = new Set([
                        'pj-media-library','pj-menu-widget','pj-store-locator','pj-multicurrency','pj-hide-my-admin','pj-amazon-affiliate','pj-extra-product-options','pj-slider','pj-bookings'
                      ]);
                      const href = disabled.has(plugin.slug) ? '#' : `/plugins/${getPluginDisplaySlug(plugin)}`;
                      return (
                        <Link href={href} className="w-full">
                          <Button variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </Link>
                      );
                    })()}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No featured plugins available yet</p>
            </div>
          )}

          {/* View All Plugins button hidden for now
          <div className="text-center mt-12">
            <Link href="/plugins">
              <Button variant="outline" size="lg">
                View All Plugins
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          */}
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">Why Choose Our Plugins</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern best practices and your success in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center p-6">
                  <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">Customer Reviews</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real feedback from site owners and developers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((r, i) => (
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
      </section>

      <section className="py-20 lg:py-24 bg-blue-600">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to enhance your WordPress site?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 50,000+ developers and website owners who trust our plugins
          </p>
          <Link href="/plugins">
            <Button size="lg" variant="secondary" className="bg-white hover:bg-gray-100 text-blue-600">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
