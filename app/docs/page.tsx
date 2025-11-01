import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Package, Palette, ArrowRight } from 'lucide-react';

const plugins = [
  {
    name: 'PJ Essential Addons for Elementor',
    slug: 'pj-essential-addons-elementor',
    description: 'Supercharge Your Elementor Website with 100+ Premium Widgets',
    version: '25.0.0',
    category: 'Page Builder',
  },
  {
    name: 'Essential Addons for WPBakery Page Builder',
    slug: 'essential-addons-wpbakery',
    description: 'Essential Elements & Extensions for WPBakery',
    version: '25.0.0',
    category: 'Page Builder',
  },
  {
    name: 'PJ Filter',
    slug: 'pj-filter',
    description: 'Intelligent Filters. Maximum Conversions. Zero Compromise.',
    version: '3.2.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Media Library',
    slug: 'pj-media-library',
    description: 'Advanced media management and organization for WordPress',
    version: '25.0.0',
    category: 'Media',
  },
  {
    name: 'PJ Product Designer',
    slug: 'pj-product-designer',
    description: 'Custom product design tool for WooCommerce',
    version: '25.0.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Menu and Widget',
    slug: 'pj-menu-widget',
    description: 'Advanced menu and widget management for WordPress',
    version: '25.0.0',
    category: 'Utilities',
  },
  {
    name: 'PJ Store Locator',
    slug: 'pj-store-locator',
    description: 'AJAX-powered store locator for physical locations',
    version: '25.0.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Accessibility',
    slug: 'pj-accessibility',
    description: 'Complete accessibility toolkit for WCAG compliance',
    version: '25.1.0',
    category: 'Utilities',
  },
  {
    name: 'PJ Multicurrency',
    slug: 'pj-multicurrency',
    description: 'Multi-currency support for WooCommerce stores',
    version: '25.1.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Hide My Admin',
    slug: 'pj-hide-my-admin',
    description: 'Security plugin to hide WordPress admin area',
    version: '25.1.0',
    category: 'Security',
  },
  {
    name: 'PJ Amazon Affiliate',
    slug: 'pj-amazon-affiliate',
    description: 'Amazon affiliate product integration for WordPress',
    version: '25.1.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Woo Dropshipping',
    slug: 'pj-woo-dropshipping',
    description: 'Complete dropshipping solution for WooCommerce',
    version: '25.1.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Extra Product Options',
    slug: 'pj-extra-product-options',
    description: 'Add custom fields and options to WooCommerce products',
    version: '25.1.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Bookings',
    slug: 'pj-bookings',
    description: 'Complete booking and appointment management system',
    version: '25.1.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Membership',
    slug: 'pj-membership',
    description: 'Membership site builder with content restriction',
    version: '25.1.0',
    category: 'Membership',
  },
  {
    name: 'PJ Gift Card',
    slug: 'pj-gift-card',
    description: 'Digital gift card system for WooCommerce',
    version: '25.1.0',
    category: 'E-commerce',
  },
  {
    name: 'PJ Event Calendar',
    slug: 'pj-event-calendar',
    description: 'Event management and calendar system',
    version: '25.1.0',
    category: 'Events',
  },
  {
    name: 'PJ Forms',
    slug: 'pj-forms',
    description: 'Advanced form builder with conditional logic',
    version: '25.1.0',
    category: 'Forms',
  },
  {
    name: 'PJ Email Templates',
    slug: 'pj-email-templates',
    description: 'Beautiful email template designer for WordPress',
    version: '25.1.0',
    category: 'Marketing',
  },
  {
    name: 'PJ Popup Master',
    slug: 'pj-popup-master',
    description: 'Advanced popup builder with targeting options',
    version: '25.1.0',
    category: 'Marketing',
  },
  {
    name: 'PJ Slider',
    slug: 'pj-slider',
    description: 'Responsive slider and carousel builder',
    version: '25.1.0',
    category: 'Media',
  },
];

const themes = [
  {
    name: 'Axiom',
    slug: 'axiom',
    description: 'Premium multipurpose WordPress theme with unlimited possibilities',
    version: '25.0.0',
    category: 'Theme',
  },
];

export default function DocsPage() {
  return (
    <div className="px-4 lg:px-8 py-12">
      <div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive guides and documentation for all our products
          </p>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-black">Plugins</h2>
            <Badge variant="secondary">{plugins.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((plugin) => (
              <Link key={plugin.slug} href={`/docs/${plugin.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        v{plugin.version}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{plugin.name}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">
                      {plugin.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {plugin.category}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-black">Themes</h2>
            <Badge variant="secondary">{themes.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <Link key={theme.slug} href={`/docs/${theme.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Palette className="h-6 w-6 text-purple-600" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        v{theme.version}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{theme.name}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">
                      {theme.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        {theme.category}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Can&apos;t find what you&apos;re looking for?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support" className="flex-1">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-black mb-2">Contact Support</h3>
                    <p className="text-sm text-gray-600">Get help from our support team</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/contact" className="flex-1">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-black mb-2">General Inquiry</h3>
                    <p className="text-sm text-gray-600">Have a question? Contact us</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
