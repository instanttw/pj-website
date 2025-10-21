import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, Star, Users, Package, Zap, RefreshCw, HeadphonesIcon, Code, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

async function getFeaturedPlugins() {
  const { data: plugins } = await supabase
    .from('plugins')
    .select(`
      *,
      categories(name, slug)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(6);

  return (plugins || []) as any[];
}

export default async function Home() {
  const featuredPlugins = await getFeaturedPlugins();

  const stats = [
    { label: 'Active Installations', value: '500K+', icon: Users },
    { label: 'Total Downloads', value: '2M+', icon: Download },
    { label: 'Happy Customers', value: '50K+', icon: Star },
    { label: 'Plugins Available', value: '24', icon: Package },
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

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              Trusted by 50,000+ websites
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl mb-6">
              Premium WordPress Plugins for Modern Websites
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Build faster, better WordPress sites with our collection of premium plugins.
              Professional tools designed by developers, for developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plugins">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base px-8">
                  Browse Plugins
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="text-base px-8">
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
                  className="flex flex-col items-center p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
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
        <div className="container mx-auto px-4 lg:px-8">
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
                      {plugin.price === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        <Badge>${plugin.price}</Badge>
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
                    <Link href={`/plugins/${plugin.slug}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </Link>
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

          <div className="text-center mt-12">
            <Link href="/plugins">
              <Button variant="outline" size="lg">
                View All Plugins
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
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
