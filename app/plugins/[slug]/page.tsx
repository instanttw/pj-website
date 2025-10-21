import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
      return null;
    }

    return plugin as any;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return null;
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
      return [];
    }

    return (plugins || []) as any[];
  } catch (error) {
    console.error('Error connecting to database:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PluginPageProps): Promise<Metadata> {
  const plugin = await getPluginBySlug(params.slug);

  if (!plugin) {
    return {
      title: 'Plugin Not Found',
    };
  }

  return {
    title: `${plugin.name} - ${plugin.tagline} | PrintJones`,
    description: plugin.description || plugin.tagline,
    openGraph: {
      title: plugin.name,
      description: plugin.tagline,
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: plugin.name,
      description: plugin.tagline,
    },
  };
}

export default async function PluginDetailPage({ params }: PluginPageProps) {
  const plugin = await getPluginBySlug(params.slug);

  if (!plugin) {
    notFound();
  }

  const relatedPlugins = await getRelatedPlugins(plugin.category_id, plugin.id);

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
          <div className="container mx-auto px-4 py-12 lg:py-16 max-w-7xl">
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
                    <div className="text-5xl font-bold text-black mb-2">${plugin.price}</div>
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
                        <span className="text-sm text-gray-700">Use on Unlimited Sites</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Documentation & Tutorials</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart - ${plugin.price}
                      </Button>
                      {plugin.demo_url && (
                        <Button size="lg" variant="outline" className="w-full border-2 border-gray-300">
                          <ExternalLink className="w-5 h-5 mr-2" />
                          View Live Demo
                        </Button>
                      )}
                      {plugin.download_url && (
                        <Button size="md" variant="ghost" className="w-full text-gray-600">
                          <Download className="w-4 h-4 mr-2" />
                          Try Free Version
                        </Button>
                      )}
                    </div>

                    {/* Trust Signals */}
                    <div className="text-center pt-4 border-t border-gray-200">
                      <div className="flex justify-center gap-4 text-gray-500 mb-2">
                        <Shield className="w-4 h-4" />
                        <CreditCard className="w-4 h-4" />
                        <RotateCcw className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-gray-500">Secure checkout via Stripe</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 max-w-7xl">
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
                  value="faqs"
                  className="px-6 py-4 text-base lg:text-lg font-medium data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
                >
                  FAQs
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <TabsContent value="overview" className="py-16">
                <div className="max-w-4xl mx-auto">
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
              </TabsContent>

              <TabsContent value="features" className="py-16">
                <div className="max-w-4xl mx-auto">
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
              </TabsContent>

              <TabsContent value="installation" className="py-16">
                <div className="max-w-4xl mx-auto">
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

              <TabsContent value="faqs" className="py-16">
                <div className="max-w-4xl mx-auto">
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
                        <CardTitle className="text-xl">What if I'm not satisfied?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          We offer a 30-day money-back guarantee. If you're not completely satisfied, contact us for a full refund.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Plugins */}
        {relatedPlugins.length > 0 && (
          <section className="py-16 bg-white border-t-2 border-gray-200">
            <div className="container mx-auto px-4 max-w-7xl">
              <h2 className="text-3xl font-bold mb-12 text-center">You Might Also Like</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPlugins.map((relatedPlugin) => (
                  <Card key={relatedPlugin.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <Badge className="bg-blue-600">${relatedPlugin.price}</Badge>
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
                      <Link href={`/plugins/${relatedPlugin.slug}`} className="w-full">
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
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Join {plugin.download_count.toLocaleString()}+ users and enhance your WordPress site today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now - ${plugin.price}
              </Button>
              {plugin.demo_url && (
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
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
