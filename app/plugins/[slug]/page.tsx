import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Download, Calendar, Package as PackageIcon, ExternalLink, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';

async function getPlugin(slug: string) {
  try {
    const { data: plugin, error } = await supabase
      .from('plugins')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

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

async function getPluginPricing(pluginId: string) {
  try {
    const { data: pricing, error } = await supabase
      .from('plugin_pricing')
      .select('*')
      .eq('plugin_id', pluginId)
      .order('sort_order');

    if (error) {
      console.error('Error fetching plugin pricing:', error);
      return [];
    }

    return (pricing || []) as any[];
  } catch (error) {
    console.error('Error connecting to database:', error);
    return [];
  }
}

async function getPluginReviews(pluginId: string) {
  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('plugin_id', pluginId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching plugin reviews:', error);
      return [];
    }

    return (reviews || []) as any[];
  } catch (error) {
    console.error('Error connecting to database:', error);
    return [];
  }
}

export default async function PluginDetailPage({ params }: { params: { slug: string } }) {
  const plugin = await getPlugin(params.slug);

  if (!plugin) {
    notFound();
  }

  const [pricing, reviews] = await Promise.all([
    getPluginPricing(plugin.id),
    getPluginReviews(plugin.id)
  ]);

  const features = Array.isArray(plugin.features) ? plugin.features : [];
  const changelog = Array.isArray(plugin.changelog) ? plugin.changelog : [];
  const faq = Array.isArray(plugin.faq) ? plugin.faq : [];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-black">Home</Link>
        {' / '}
        <Link href="/plugins" className="hover:text-black">Plugins</Link>
        {' / '}
        <span className="text-black">{plugin.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-6 mb-6">
            <div className="h-20 w-20 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <PackageIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-black mb-2">{plugin.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{plugin.tagline}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(plugin.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-black">{plugin.rating.toFixed(1)}</span>
                  <span className="text-gray-600">({plugin.review_count} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Download className="h-5 w-5" />
                  <span>{plugin.active_installations.toLocaleString()}+ active installations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 pb-6 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {new Date(plugin.last_updated).toLocaleDateString()}</span>
            </div>
            <div>
              <Badge variant="outline">v{plugin.version}</Badge>
            </div>
            <div>
              <Badge variant="secondary">WordPress {plugin.wordpress_compatibility}</Badge>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>
                {pricing.length > 0 ? 'Starting at' : plugin.price === 0 ? 'Free Plugin' : 'Pricing'}
              </CardTitle>
              <div className="text-4xl font-bold text-black">
                {plugin.price === 0 ? 'Free' : `$${plugin.price}`}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Buy Now
              </Button>
              {plugin.demo_url && (
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <Link href={plugin.demo_url} target="_blank">
                    View Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {plugin.documentation_url && (
                <Button size="lg" variant="ghost" className="w-full" asChild>
                  <Link href={plugin.documentation_url}>
                    <FileText className="mr-2 h-4 w-4" />
                    Documentation
                  </Link>
                </Button>
              )}
              <div className="pt-4 border-t text-sm text-gray-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span>30-day money back</span>
                  <Badge variant="secondary" className="text-xs">Guaranteed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Support included</span>
                  <Badge variant="secondary" className="text-xs">Premium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Regular updates</span>
                  <Badge variant="secondary" className="text-xs">Lifetime</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({plugin.review_count})</TabsTrigger>
          <TabsTrigger value="changelog">Changelog</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{plugin.description}</p>
            </div>
          </div>

          {features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{feature.title || feature}</CardTitle>
                      {feature.description && (
                        <CardDescription>{feature.description}</CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {pricing.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Pricing Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricing.map((plan) => {
                  const planFeatures = Array.isArray(plan.features) ? plan.features : [];
                  return (
                    <Card key={plan.id} className={plan.is_popular ? 'border-blue-600 border-2' : ''}>
                      <CardHeader>
                        {plan.is_popular && (
                          <Badge className="mb-2 w-fit bg-blue-600">Most Popular</Badge>
                        )}
                        <CardTitle>{plan.name}</CardTitle>
                        <div className="text-3xl font-bold text-black">
                          ${plan.price}
                          <span className="text-sm font-normal text-gray-600">
                            /{plan.billing_period}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>✓ {plan.site_limit} {plan.site_limit === 1 ? 'site' : 'sites'}</li>
                          {planFeatures.map((feature: any, idx: number) => (
                            <li key={idx}>✓ {feature.title || feature}</li>
                          ))}
                        </ul>
                        <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-black mb-2">Customer Reviews</h2>
              <p className="text-gray-600">{plugin.review_count} reviews</p>
            </div>
            <Button>Write a Review</Button>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {review.title && (
                          <CardTitle className="text-lg">{review.title}</CardTitle>
                        )}
                      </div>
                      {review.is_verified_purchase && (
                        <Badge variant="secondary">Verified Purchase</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{review.content}</p>
                    {review.helpful_count > 0 && (
                      <p className="text-sm text-gray-500 mt-4">
                        {review.helpful_count} {review.helpful_count === 1 ? 'person' : 'people'} found this helpful
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-4">Be the first to review this plugin</p>
              <Button>Write a Review</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="changelog" className="space-y-6">
          <h2 className="text-2xl font-bold text-black mb-6">Version History</h2>
          {changelog.length > 0 ? (
            <div className="space-y-6">
              {changelog.map((version: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Version {version.version}</CardTitle>
                      <Badge variant="outline">{new Date(version.date).toLocaleDateString()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      {version.changes && Array.isArray(version.changes) ? (
                        version.changes.map((change: string, idx: number) => (
                          <li key={idx}>• {change}</li>
                        ))
                      ) : (
                        <li>• {version.changes || 'Various improvements and bug fixes'}</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No changelog available</p>
          )}
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <h2 className="text-2xl font-bold text-black mb-6">Frequently Asked Questions</h2>
          {faq.length > 0 ? (
            <div className="space-y-4">
              {faq.map((item: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No FAQ available yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
