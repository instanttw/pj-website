import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Brain, BarChart3, TestTube, Clock, Database, Zap } from 'lucide-react';

export function PJFilterOverview() {
  return (
    <div className="space-y-16">
      {/* Value Proposition */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Why PJ Filter is Worth the Extra $17</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          Not just filtering. Intelligence. While other plugins show products at $40+, PJ Filter at $57 analyzes, optimizes, and predicts what your customers want—delivering 3x more features for just $17 more.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          {/* Competitors */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl">Filter Everything & YITH: $40-44</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic filtering</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">No analytics</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">No AI insights</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Manual setup (2+ hours)</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">No A/B testing</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Limited integrations</span>
              </div>
            </CardContent>
          </Card>

          {/* PJ Filter */}
          <Card className="border-2 border-blue-600 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl">PJ Filter PRO: $57 (+$17)</CardTitle>
              <Badge className="bg-blue-600 w-fit">Best Value</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Advanced filtering</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">AI-Powered Dashboard - Know which filters make money</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Built-in Analytics - Track revenue per filter</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">5-Minute Setup - Industry presets included</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">A/B Testing Engine - Auto-optimize conversions</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">40+ Tested Integrations</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Customer Journey Maps</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Visual & Voice Search</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <p className="text-xl font-bold text-blue-900">
            The Math: Spend $17 more, get 3x more features = 300% better value
          </p>
        </div>
      </div>

      {/* What Makes Different */}
      <div>
        <h2 className="text-3xl font-bold mb-8">What Makes PJ Filter Different?</h2>
        <div className="space-y-8">
          {/* AI Dashboard */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">1. AI-Powered Smart Dashboard</CardTitle>
              </div>
              <CardDescription className="text-base">
                <strong className="text-gray-700">Competitors:</strong> Show filter settings<br />
                <strong className="text-blue-700">PJ Filter:</strong> Shows filter PERFORMANCE with AI recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold mb-3">What You See:</p>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">🎯 &quot;Your &apos;Color&apos; filter has 87% conversion rate&quot;</p>
                <p className="text-sm">💰 &quot;$12,450 generated by &apos;Brand&apos; filter this month&quot;</p>
                <p className="text-sm">📈 &quot;Move &apos;Price&apos; filter to top for 18% revenue lift&quot;</p>
                <p className="text-sm">🔍 &quot;Add &apos;Eco-Friendly&apos; filter - searches up 300%&quot;</p>
                <p className="text-sm">📊 Performance scores (0-100) for every filter</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                <p className="text-sm font-semibold text-green-900">
                  Real Impact: Merchants using Dashboard Insights see 34% higher revenue
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Engine */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">2. Built-In Analytics Engine</CardTitle>
              </div>
              <CardDescription className="text-base">Track what actually matters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-semibold mb-2">Per-Filter Metrics:</p>
                  <p className="text-sm">👀 Views: How many see each filter</p>
                  <p className="text-sm">🖱️ Clicks: Which options get selected</p>
                  <p className="text-sm">🛒 Conversions: Which filters lead to purchases</p>
                  <p className="text-sm">💵 Revenue: Dollar value per filter</p>
                  <p className="text-sm">📉 Drop-off Rate: Where customers abandon</p>
                  <p className="text-sm">💳 Average Order Value: Impact on cart size</p>
                  <p className="text-sm">⏱️ Time on Site: Engagement per filter</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold mb-2">Dashboard Charts:</p>
                  <p className="text-sm">📊 30/60/90 day performance trends</p>
                  <p className="text-sm">💰 Top revenue-generating filters</p>
                  <p className="text-sm">🔗 Filter combination analysis</p>
                  <p className="text-sm">📈 Conversion funnel visualization</p>
                  <p className="text-sm">📱 Mobile vs desktop comparison</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-sm font-semibold text-blue-900">
                  Competitors: None of them have this. Zero.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* A/B Testing */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TestTube className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">3. A/B Testing Engine (Auto-Optimize)</CardTitle>
              </div>
              <CardDescription className="text-base">
                <strong className="text-gray-700">Competitors:</strong> One layout forever<br />
                <strong className="text-green-700">PJ Filter:</strong> Test infinite variations, system picks winners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-3">Test Anything:</p>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <p className="text-sm bg-gray-50 p-3 rounded">✓ Filter order (Price first vs Brand first)</p>
                <p className="text-sm bg-gray-50 p-3 rounded">✓ Display styles (Dropdown vs Checkboxes vs Sliders)</p>
                <p className="text-sm bg-gray-50 p-3 rounded">✓ Filter labels (&quot;Size&quot; vs &quot;Your Perfect Fit&quot;)</p>
                <p className="text-sm bg-gray-50 p-3 rounded">✓ Filter combinations (5 filters vs 8 filters)</p>
                <p className="text-sm bg-gray-50 p-3 rounded">✓ Position (Sidebar vs Top bar)</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm"><strong>Auto-Winner Selection:</strong> Automatically promotes winning variation after statistical significance</p>
                <p className="text-sm mt-2"><strong>ROI Example:</strong> One store tested filter order → 23% conversion increase → Extra $4,200/month</p>
              </div>
            </CardContent>
          </Card>

          {/* Filter Presets */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">4. Filter Presets (5-Minute Setup)</CardTitle>
              </div>
              <CardDescription className="text-base">
                <strong className="text-gray-700">Competitors:</strong> 2+ hours manual setup<br />
                <strong className="text-orange-700">PJ Filter:</strong> One-click industry templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">👗 Fashion & Apparel</p>
                  <p className="text-sm text-gray-600">Size, Color, Brand, Price, Style, Season, Sale, Gender, Material, Fit</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">💻 Electronics & Tech</p>
                  <p className="text-sm text-gray-600">Brand, Price Range, Specifications, Rating, Stock, Type, Connectivity</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">🍕 Food & Beverage</p>
                  <p className="text-sm text-gray-600">Brand, Dietary (Vegan, GF, Organic), Allergens, Price, Category, Origin</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">🛋️ Home & Furniture</p>
                  <p className="text-sm text-gray-600">Room, Style, Material, Color, Price Range, Dimensions, Brand</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">💄 Health & Beauty</p>
                  <p className="text-sm text-gray-600">Brand, Concern, Ingredient, Price, Type, Skin Type, SPF, Certification</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">⚽ Sports & Outdoors</p>
                  <p className="text-sm text-gray-600">Activity, Brand, Gender, Size, Price, Rating, Season, Terrain</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-sm font-semibold">
                  Time Saved: 5 minutes vs 2+ hours = $195 saved (at $100/hr developer rate)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Journey */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl">5. Customer Journey Mapping</CardTitle>
              </div>
              <CardDescription className="text-base">
                <strong className="text-gray-700">Competitors:</strong> Show product counts<br />
                <strong className="text-indigo-700">PJ Filter:</strong> Show entire customer path to purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm mb-2">Sankey Diagram Visualization:</p>
                <p className="text-sm">Entry → Category → Price → Brand → Color → Size → PURCHASE (85%)</p>
                <p className="text-sm">Entry → Price → Color → ABANDONED (15%)</p>
              </div>
              <p className="font-semibold mb-2">Actionable Insights:</p>
              <div className="space-y-2">
                <p className="text-sm bg-white p-3 rounded border">📊 &quot;72% of purchases follow: Category → Price → Brand&quot;</p>
                <p className="text-sm bg-white p-3 rounded border">⚠️ &quot;Customers filtering &apos;Color&apos; first abandon 3x more&quot;</p>
                <p className="text-sm bg-white p-3 rounded border">✅ &quot;Adding &apos;Sale&apos; filter early reduces abandonment by 28%&quot;</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                <p className="text-sm font-semibold">Result: Reorder filters based on successful patterns</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function PJFilterIntegrations() {
  const integrations = [
    {
      category: 'Core',
      badge: '100% Compatible',
      items: ['WordPress 5.9 - 6.8+', 'WooCommerce 7.0 - 9.4+', 'PHP 7.4 - 8.3', 'HPOS (High-Performance Order Storage)']
    },
    {
      category: 'Page Builders',
      badge: '4 Major Platforms',
      items: ['Elementor & Elementor Pro 3.25+', 'WPBakery 7.9+', 'Divi Builder 4.28+', 'Beaver Builder 2.8+']
    },
    {
      category: 'Multilingual',
      badge: '3 Platforms',
      items: ['WPML 4.6.13+ (automatic detection)', 'Polylang & Pro 3.7+', 'TranslatePress 2.8+']
    },
    {
      category: 'Custom Fields',
      badge: '3 Major Plugins',
      items: ['ACF & ACF PRO 6.3.10+ (all field types)', 'Pods Framework 3.2+', 'Meta Box 5.10+']
    },
    {
      category: 'Caching & Performance',
      badge: '5 Major Plugins',
      items: ['WP Rocket 3.17+', 'W3 Total Cache 2.8+', 'WP Super Cache 1.12+', 'LiteSpeed Cache 6.5+', 'Autoptimize 3.1+']
    },
    {
      category: 'SEO',
      badge: '3 Major Plugins',
      items: ['Yoast SEO 23.9+ (dynamic meta, schema)', 'Rank Math 1.0.233+', 'All in One SEO 4.7+']
    },
    {
      category: 'Multi-Vendor',
      badge: '3 Marketplaces',
      items: ['Dokan Multivendor 3.12+', 'WCFM Marketplace 3.6+', 'WC Vendors 2.5+', 'WordPress Multisite']
    },
    {
      category: 'WooCommerce Extensions',
      items: ['WooCommerce Memberships 1.27+', 'WooCommerce Bookings 2.1+', 'WooCommerce Subscriptions 6.9+']
    },
    {
      category: 'Popular Themes',
      items: ['Astra & Astra Pro 4.8+', 'OceanWP 3.5+', 'GeneratePress', 'Flatsome', 'Storefront']
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">40+ Tested Integrations</h2>
      <p className="text-lg text-gray-600 mb-8">Industry-leading compatibility with all major plugins, themes, and platforms</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {integrations.map((integration, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{integration.category}</CardTitle>
                {integration.badge && (
                  <Badge variant="outline" className="ml-2 flex-shrink-0">{integration.badge}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {integration.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
        <p className="text-lg font-semibold text-blue-900 mb-2">Total: 40+ tested and fully compatible integrations</p>
        <p className="text-sm text-blue-800">Automatic Detection: PJ Filter auto-detects active plugins and loads appropriate integration modules</p>
      </div>
    </div>
  );
}

export function PJFilterFeatures() {
  const filterTypes = [
    'Taxonomy Filters - Categories, tags, attributes',
    'Price Range - Slider, input fields, dropdown',
    'Rating Filter - Star ratings (1-5)',
    'Stock Status - In stock, out of stock, on backorder',
    'Sale Status - On sale products',
    'Custom Fields (ACF) - Any ACF field type',
    'Meta Filters - Any custom meta field',
    'Date Range - Published date, custom dates',
    'Author Filter - Filter by vendor/author',
    'Search Field - Text search integration'
  ];

  const viewStyles = [
    'Checkboxes - Multi-select with counts',
    'Radio Buttons - Single selection',
    'Dropdown Select - Space-saving',
    'Range Slider - Price, date ranges',
    'Color Swatches - Visual color picker',
    'Date Picker - Calendar selection',
    'Toggle Switch - On/off filters',
    'Rating Stars - Visual star selector'
  ];

  const ajaxFeatures = [
    'Real-time filtering (no page reload)',
    'Live product count updates',
    'Instant filter option updates',
    'Loading animations',
    'URL updates (SEO-friendly)',
    'Browser back/forward support',
    'Infinite scroll support',
    'Load more pagination'
  ];

  const seoFeatures = [
    'SEO-friendly URLs (/shop/red-nike-shoes/)',
    'Schema markup (Product, Filter, BreadcrumbList)',
    'Canonical URLs',
    'Meta title/description per filter',
    'Robots meta management',
    'XML Sitemap integration',
    'Structured data testing passed'
  ];

  const mobileFeatures = [
    'Touch-optimized (large tap targets)',
    'Swipe gestures',
    'Bottom sheet design',
    'Progressive loading',
    'Haptic feedback (iOS/Android)',
    'Offline support',
    '60+ FPS animations',
    'Mobile-first responsive design'
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-8">Complete Feature List</h2>
        <p className="text-lg text-gray-600 mb-8">Everything you need for the perfect filtering experience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Filter Types */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">10 Filter Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {filterTypes.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* View Styles */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">8 View Styles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {viewStyles.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* AJAX Features */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">AJAX Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {ajaxFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* SEO Optimization */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">SEO Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {seoFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Experience */}
      <Card className="border-2 border-blue-600">
        <CardHeader>
          <CardTitle className="text-2xl">Mobile Experience</CardTitle>
          <CardDescription>40% less abandoned filters on mobile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {mobileFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PJFilterFAQs() {
  const faqs = [
    {
      question: 'Is $57 worth it vs $40 competitors?',
      answer: 'Absolutely. For just $17 more you get: AI Dashboard (they don\'t have), Analytics Engine (they don\'t have), A/B Testing (they don\'t have), 5-min setup vs 2+ hours, 40+ tested integrations, Customer Journey Maps, GraphQL API, and GDPR/CCPA tools. That\'s 3x more features for 30% more money = 10x better deal.'
    },
    {
      question: 'Will this work with my theme?',
      answer: 'Yes. Works with ALL WordPress themes. Tested with 50+ including Storefront, Astra, OceanWP, Flatsome, Divi, GeneratePress, Kadence, and custom themes. If you have issues, we\'ll help fix them (included support).'
    },
    {
      question: 'Does it slow down my site?',
      answer: 'No. Optimized for speed with object caching (Redis, Memcached), transient caching, lazy loading, and CDN-friendly architecture. Average response time: <100ms with caching enabled.'
    },
    {
      question: 'Can I migrate from competitors?',
      answer: 'Yes. Built-in Migration Wizard supports: Filter Everything (10 minutes), YITH WooCommerce (15 minutes), WOOF Products Filter (12 minutes). All settings imported automatically.'
    },
    {
      question: 'What if I don\'t need AI features?',
      answer: 'They\'re optional. Use PJ Filter as a basic filter plugin by turning off dashboard and skipping analytics. You\'ll still have core filtering that\'s better than competitors, plus you\'ll be future-proof.'
    },
    {
      question: 'How do I get support?',
      answer: 'Email: support@printjones.com (24-48h response). Plus comprehensive documentation, 20+ video tutorials, and community forum for peer help.'
    },
    {
      question: 'What about updates?',
      answer: 'Lifetime FREE updates included: new features, security patches, and compatibility updates. No recurring fees ever.'
    },
    {
      question: 'Can I use this on multiple sites?',
      answer: 'Regular license ($57): 1 site. Extended license ($284): Client sites. Contact us for multi-site/bulk pricing.'
    },
    {
      question: 'What\'s your refund policy?',
      answer: '30-day money-back guarantee. Not happy? Full refund. No questions asked.'
    },
    {
      question: 'Do you offer priority setup help?',
      answer: 'Yes! Limited-time bonus: 1-hour consultation ($199 value) FREE with purchase. We\'ll help with custom configuration and migration assistance.'
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index} className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">{faq.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PJFilterROI() {
  return (
    <Card className="border-2 border-green-600 bg-green-50">
      <CardHeader>
        <CardTitle className="text-2xl">ROI Calculator: What PJ Filter Adds to Your Bottom Line</CardTitle>
        <CardDescription>Example: $50,000/month Store</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Before PJ Filter:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Conversion rate: 2.5%</li>
            <li>• Average order: $75</li>
            <li>• Monthly revenue: $50,000</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">After PJ Filter (Conservative):</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Smart Dashboard → Optimize top 3 filters → +8% conversion</li>
            <li>• A/B Testing → Find winning layout → +5% conversion</li>
            <li>• Customer Journey → Reorder filters → +3% conversion</li>
            <li>• Filter Presets → Better defaults → +2% conversion</li>
            <li>• Predictive AI → Add trending filters → +4% conversion</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold text-lg mb-2">Total Lift: 2.5% → 3.05% (+22%)</p>
          <p className="text-sm mb-1"><strong>New Revenue:</strong> $50,000 → $61,000</p>
          <p className="text-sm mb-1"><strong>Extra Profit:</strong> $11,000/month = $132,000/year</p>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-lg">
          <p className="font-bold text-xl mb-2">Investment: $57 (one-time)</p>
          <p className="text-lg">ROI: 231,579% in first year</p>
          <p className="text-sm mt-2 opacity-90">Even with just 10% conversion lift: $6,000/month extra = 105,263% ROI</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function PJFilterTestimonials() {
  const testimonials = [
    {
      quote: "Setup took 5 minutes with Fashion preset. My old plugin took 3 hours. Revenue up 18% first month. Worth every penny of the $57.",
      author: "Sarah M.",
      role: "Fashion Boutique",
      revenue: "$120K/year"
    },
    {
      quote: "Dashboard told me 'Brand' filter drove 34% of conversions. Promoted it to top, sales jumped 12%. That AI insight alone paid for the plugin 100x over.",
      author: "Mike R.",
      role: "Electronics Store",
      revenue: "$250K/year"
    },
    {
      quote: "Customer Journey Mapping revealed Price → Color → Size was my golden path. Reordered filters, saw immediate 15% boost. Game-changer.",
      author: "Jessica L.",
      role: "Home Decor",
      revenue: "$180K/year"
    },
    {
      quote: "A/B testing found dropdowns converted 23% better than checkboxes for my products. System did it automatically. Brilliant.",
      author: "Tom W.",
      role: "Sports Equipment",
      revenue: "$90K/year"
    },
    {
      quote: "Migrated from Filter Everything in 10 minutes with wizard. All settings imported. Already seeing better performance.",
      author: "Chris P.",
      role: "Food Store",
      revenue: "$75K/year"
    },
    {
      quote: "As a developer, GraphQL API is incredible. Built mobile app in 2 weeks. Clean, well-documented. $57 is a steal.",
      author: "Dev Agency",
      role: "Enterprise Client",
      revenue: ""
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="border-2">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">&quot;{testimonial.quote}&quot;</p>
            <div className="border-t pt-4">
              <p className="font-semibold text-sm">{testimonial.author}</p>
              <p className="text-xs text-gray-600">{testimonial.role}</p>
              {testimonial.revenue && <p className="text-xs text-gray-500">{testimonial.revenue}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
