import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Download, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { fallbackPlugins } from '@/data/fallback-plugins';

async function getPlugins() {
  try {
    const { data: plugins, error } = await supabase
      .from('plugins')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('is_active', true)
      .order('download_count', { ascending: false });

    if (error) {
      console.error('Error fetching plugins:', error);
      return [];
    }

    return (plugins || []) as any[];
  } catch (error) {
    console.error('Error connecting to database:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return (categories || []) as any[];
  } catch (error) {
    console.error('Error connecting to database:', error);
    return [];
  }
}

export default async function PluginsPage() {
  let [plugins, categories] = await Promise.all([
    getPlugins(),
    getCategories()
  ]);

  // Fallback to curated 8 plugins if DB is empty or unavailable
  if (!plugins || plugins.length === 0) {
    plugins = fallbackPlugins as any[];
  }

  // Derive categories from current plugin list if categories table is empty
  if (!categories || categories.length === 0) {
    const uniq = new Map<string, { id: string; name: string; slug: string }>();
    (plugins as any[]).forEach((p: any) => {
      if (p.categories && p.categories.slug) {
        uniq.set(p.categories.slug, {
          id: p.categories.slug,
          name: p.categories.name,
          slug: p.categories.slug,
        });
      }
    });
    categories = Array.from(uniq.values()) as any[];
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-4">All Plugins</h1>
        <p className="text-lg text-gray-600">
          Browse our complete collection of premium WordPress plugins
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-600 hover:text-white">
            All Categories
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              className="cursor-pointer hover:bg-blue-600 hover:text-white"
            >
              {category.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="mb-6 text-sm text-gray-600">
        Showing <span className="font-medium text-black">{plugins.length}</span> plugins
      </div>

      {plugins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plugins.map((plugin) => (
            <Card key={plugin.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  {plugin.price === 0 ? (
                    <Badge variant="secondary">Free</Badge>
                  ) : (
                    <Badge className="bg-blue-600">${plugin.price}</Badge>
                  )}
                </div>
                <CardTitle className="text-xl line-clamp-1">{plugin.name}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {plugin.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{plugin.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({plugin.review_count})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{plugin.download_count.toLocaleString()}+</span>
                  </div>
                </div>
                {plugin.categories && (
                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {plugin.categories.name}
                    </Badge>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/plugins/${plugin.slug}`} className="flex-1">
                  <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="h-20 w-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Plugins Found</h3>
          <p className="text-gray-500">Check back soon for new plugins</p>
        </div>
      )}
    </div>
  );
}
