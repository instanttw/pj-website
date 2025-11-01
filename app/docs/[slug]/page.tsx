import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CommunityForum } from '@/components/community-forum';
import {
  Package,
  Palette,
  Download,
  BookOpen,
  Settings,
  HelpCircle,
  AlertCircle,
  FileText,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Zap,
  TrendingUp,
  Gauge,
  Layers,
  Rocket,
  Edit,
  Upload,
  Server,
  Terminal,
  Key,
  Wand2,
  LayoutDashboard,
  ListChecks,
  Puzzle,
  BarChart3,
  SlidersHorizontal,
  Plug,
  PlayCircle,
  Clock,
  GraduationCap,
  Shield,
  Database,
  Activity,
  Network,
  Code2,
  Wrench,
  Users,
} from 'lucide-react';

interface DocPageProps {
  params: {
    slug: string;
  };
}

const products = {
  'pj-essential-addons-elementor': {
    name: 'PJ Essential Addons for Elementor',
    type: 'plugin',
    version: '25.0.0',
    category: 'Page Builder',
    description: 'Supercharge Your Elementor Website with 100+ Premium Widgets',
    // Link to matching plugin detail page slug
    pluginSlug: 'aioa-elementor',
    overview: `PJ Essential Addons for Elementor is the most comprehensive collection of premium widgets and extensions for Elementor. With over 100 powerful widgets, you can create stunning websites faster than ever before.

This plugin is designed with performance in mind, ensuring your website stays fast while adding incredible functionality. Each widget is carefully crafted to be flexible, customizable, and easy to use.`,
    features: [
      '100+ Premium Widgets',
      'Advanced Form Builder',
      'WooCommerce Integration',
      'Dynamic Content Support',
      'Template Library',
      'Cross-Domain Copy Paste',
      'Custom CSS & JavaScript',
      'RTL Support',
      'Translation Ready',
      'Regular Updates',
      'Premium Support',
      'Lifetime Updates',
    ],
    installation: {
      steps: [
        'Download the plugin zip file from your account',
        'Go to WordPress Admin > Plugins > Add New',
        'Click "Upload Plugin" and choose the zip file',
        'Click "Install Now" and then "Activate"',
        'Navigate to Elementor > PJ Essential Addons',
        'Enable the widgets you want to use',
        'Start building amazing pages!',
      ],
      requirements: [
        'WordPress 5.0 or higher',
        'Elementor 3.0.0 or higher',
        'PHP 7.4 or higher',
        'MySQL 5.6 or higher',
      ],
    },
    configuration: `After installation, navigate to Elementor > PJ Essential Addons in your WordPress admin panel. Here you can:

• Enable/Disable specific widgets to optimize performance
• Configure global settings
• Set up API keys for third-party integrations
• Customize widget defaults
• Manage license activation`,
    troubleshooting: [
      {
        question: 'Widgets not showing in Elementor editor?',
        answer: 'Make sure the widgets are enabled in the PJ Essential Addons settings panel. Go to Elementor > PJ Essential Addons and enable the widgets you need.',
      },
      {
        question: 'Styles not loading correctly?',
        answer: 'Clear your browser cache and WordPress cache. Also regenerate CSS from Elementor > Tools > Regenerate CSS.',
      },
      {
        question: 'Plugin conflicts with other Elementor addons?',
        answer: 'Try disabling other Elementor addons one by one to identify the conflicting plugin. Contact our support team for assistance.',
      },
    ],
    faq: [
      {
        question: 'Do I need Elementor Pro?',
        answer: 'No, PJ Essential Addons works with both free and Pro versions of Elementor. However, some advanced features may require Elementor Pro.',
      },
      {
        question: 'How many sites can I use this on?',
        answer: 'This depends on your license. Check your purchase confirmation or account dashboard for your specific license details.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 30-day money-back guarantee. If you&apos;re not satisfied, contact our support team for a full refund.',
      },
    ],
    changelog: [
      {
        version: '25.0.0',
        date: '2025-01-15',
        changes: [
          'Added 5 new widgets',
          'Improved performance and loading speed',
          'Fixed compatibility issues with Elementor 3.18',
          'Updated all dependencies',
          'Enhanced mobile responsiveness',
        ],
      },
      {
        version: '24.5.0',
        date: '2024-12-01',
        changes: [
          'Added advanced animation options',
          'New template library with 50+ templates',
          'Improved WooCommerce integration',
          'Bug fixes and performance improvements',
        ],
      },
    ],
  },
  'essential-addons-wpbakery': {
    name: 'Essential Addons for WPBakery Page Builder',
    type: 'plugin',
    version: '25.0.0',
    category: 'Page Builder',
    description: 'Supercharge WPBakery with 538+ Premium Elements, 15 Extensions & 60 Pro Templates',
    // Link to matching plugin detail page slug
    pluginSlug: 'eaf-wpbakery',
    overview: `Transform your WPBakery layouts into stunning, high-converting pages with Essential Addons for WPBakery Page Builder — the most comprehensive collection of professional elements, extensions, and templates for WPBakery across **17 categories**. **No coding required.**

**Build Faster. Design Smarter. Convert Better.**

With 538+ professionally designed elements, 15 powerful extensions, and 60 ready-to-use templates, you'll have everything you need to create professional websites that stand out. Whether you're building business websites, e-commerce stores, portfolios, or landing pages, Essential Addons gives you the tools to bring your vision to life.

**What Makes Essential Addons Different:**

• **Massive Element Library:** 538+ elements covering every design need — from basic text and buttons to advanced pricing tables, data tables, testimonials, countdowns, and more
• **WooCommerce Powerhouse:** 90+ specialized WooCommerce builder elements for creating custom product pages, shop layouts, and checkout flows
• **Marketing & Conversion Tools:** Built-in popup builder, exit intent triggers, countdown timers, sticky bars, and social proof alerts to boost engagement and sales
• **Dynamic Content Integration:** Display ACF, Toolset, JetEngine, Pods, and MetaBox custom fields beautifully with full layout and styling control
• **60 Ready-Made Templates:** Import complete page templates for business, e-commerce, portfolios, blogs, and more
• **Built-in Extensions:** Wrapper Link, Sticky Element, Reveal Effects, Parallax, Custom CSS (and more)
• **Performance Optimized:** Conditional asset loading ensures only used elements load, resulting in 40-60% faster page loads and perfect Google PageSpeed scores
• **Seamless Compatibility:** Works with WPBakery (Frontend + Backend editors), WooCommerce, Contact Form 7, Gravity Forms, WPForms, Ninja Forms, WPML, Polylang, and any WPBakery-compatible theme

Built with performance and flexibility in mind, each element is meticulously crafted to be fast, customizable, and easy to use. Simply drag, drop, and launch — no technical skills required.`,
    features: [
      '538+ Premium Elements - Complete design toolkit',
      '90+ WooCommerce Elements - Custom shop builders',
      '60 Pro Templates - Ready-to-use page designs',
      'Extensions - Wrapper Link, Sticky, Parallax, Reveals, Custom CSS',
      'Popup Builder - Advanced with exit intent',
      'Dynamic Content - ACF, JetEngine, Toolset, Pods, MetaBox',
      'Marketing Tools - Countdown, Sticky Bars, Social Proof',
      'Conditional Asset Loading - 40-60% faster loads',
      'Analytics & Insights - Usage stats, performance metrics',
      'Performance Monitor - Query Monitor integration',
      'Multisite Compatible - Network activation & per-site control',
      'Form Integration - CF7, Gravity, WPForms, Ninja',
      'Translation Ready (i18n) - WPML, Polylang, TranslatePress, Weglot',
      'Visual Dashboard - One-click element management',
      'Import/Export Settings - Migrate configuration easily',
      'Custom Capabilities - Role-based access and controls',
      'Template Import/Export - Share designs easily',
      'Custom CSS & Typography - Full design control',
      'Responsive Controls - Perfect on all devices',
      'Regular Updates - New features monthly',
    ],
    installation: {
      steps: [
        'Download the Essential Addons for WPBakery zip file from your purchase confirmation or account',
        'Log in to WordPress Admin Dashboard',
        'Navigate to Plugins > Add New',
        'Click "Upload Plugin" button at the top',
        'Choose the downloaded zip file and click "Install Now"',
        'Once installed, click "Activate Plugin"',
        'Go to WPBakery Addons from the admin menu to configure',
        'Enable the elements you want to use (all enabled by default)',
        'Open WPBakery page editor - all elements will appear in the "Add Element" panel',
        'Start building amazing pages!',
      ],
      requirements: [
        'WordPress 5.8 or higher (Tested up to 6.8)',
        'WPBakery Page Builder 6.x or higher (tested up to 7.9)',
        'PHP 7.4 or higher (8.0+ recommended)',
        'Modern web browser (Chrome, Firefox, Safari, Edge)',
      ],
    },
    installationMethods: [
      {
        name: 'Automatic: Search & Install from Dashboard',
        icon: 'download',
        steps: [
          'Go to Plugins > Add New and search “Essential Addons for WPBakery Page Builder”',
          'Click Install Now, then Activate',
          'Open EA WPBakery dashboard to configure',
        ],
      },
      {
        name: 'Method 1: Upload ZIP via WordPress Admin',
        icon: 'upload',
        steps: [
          'Go to Plugins > Add New > Upload Plugin',
          'Select the downloaded ZIP file and click Install Now',
          'Click Activate to enable the plugin',
        ],
      },
      {
        name: 'Method 2: Install via FTP/SFTP',
        icon: 'server',
        steps: [
          'Extract the ZIP locally to a folder',
          'Upload the folder to /wp-content/plugins/ via FTP/SFTP',
          'Activate from Plugins in WordPress Admin',
        ],
      },
      {
        name: 'Method 3: WP-CLI (Advanced)',
        icon: 'terminal',
        steps: [
          'SSH into your server',
          'Run: wp plugin install /path/to/essential-addons-wpbakery.zip --activate',
          'Verify: wp plugin status essential-addons-wpbakery',
        ],
      },
    ],
    license: {
      title: 'License Activation',
      steps: [
        'Go to WPBakery Addons > License in your WordPress Admin',
        'Paste your purchase code from CodeCanyon (or your PrintJones account)',
        'Click Activate License and wait for confirmation',
        'If migrating domains, first Deactivate on old site, then activate on new site',
      ],
    },
    setupWizard: {
      title: 'First-time Setup Wizard',
      steps: [
        'Welcome: Overview of features and recommended settings',
        'Elements: Enable/disable element groups to optimize performance',
        'Performance: Turn on conditional asset loading and optimization',
        'Integrations: Connect WooCommerce, CF7/Gravity Forms, ACF/JetEngine',
        'Finish: Helpful links to docs, templates, and support',
      ],
    },
    core: {
      dashboard: {
        title: 'Dashboard Overview',
        subtitle: 'Manage elements, view performance, and access key tools in one place',
        features: [
          {
            icon: 'dashboard',
            title: 'Visual Overview',
            description: 'See enabled elements, active extensions, and template counts at a glance.',
          },
          {
            icon: 'list-checks',
            title: 'Element Manager',
            description: 'Enable/disable any of the 538+ elements to optimize performance quickly.',
          },
          {
            icon: 'bar-chart-3',
            title: 'Performance & Analytics',
            description: 'Track most‑used elements and asset loading to keep pages fast.',
          },
          {
            icon: 'layers',
            title: 'Templates Library',
            description: 'Import 60+ ready‑made templates by category to jumpstart pages.',
          },
          {
            icon: 'puzzle',
            title: 'Extensions Control',
            description: 'Toggle 15 extensions like Wrapper Link, Sticky, Parallax, and Reveals.',
          },
          {
            icon: 'gauge',
            title: 'Performance Monitor',
            description: 'Real‑time monitoring and Query Monitor integration for debugging.',
          },
          {
            icon: 'layers',
            title: 'Background Tasks',
            description: 'Non‑blocking analytics and maintenance tasks for smooth admin.',
          },
        ],
      },
      editor: {
        title: 'WPBakery Editor Guide',
        steps: [
          {
            title: 'Add Element Panel',
            description: 'Open “Add Element” and browse AIOA categories. Drag elements into rows/columns.',
          },
          {
            title: 'Element Settings',
            description: 'Use tabs like Content, Style, Advanced. Supports color pickers, icon pickers, repeaters, and responsive controls.',
          },
          {
            title: 'Design Options (CSS Editor)',
            description: 'Adjust margin, padding, borders, and custom CSS; changes reflect immediately.',
          },
          {
            title: 'Responsive Controls',
            description: 'Device‑specific parameters for typography, spacing, and visibility (desktop/tablet/mobile).',
          },
          {
            title: 'Frontend & Backend Editors',
            description: 'Works in both editors with preview support and optimized asset loading.',
          },
        ],
      },
      templates: {
        title: 'Templates & Import/Export',
        bullets: [
          'Browse 60+ categorized templates (Business, E‑commerce, Portfolio, Blog).',
          'One‑click import; templates are fully editable in WPBakery.',
          'Export your layouts to reuse across sites.',
        ],
      },
      analytics: {
        title: 'Analytics & Performance',
        bullets: [
          'Element usage statistics (top elements, per‑page usage).',
          'Conditional asset loading status and reduction metrics.',
          'Insights to disable unused elements for faster load times.',
        ],
      },
    },
    settingsSections: [
      {
        key: 'global',
        icon: 'sliders',
        title: 'Global Settings',
        items: [
          'Brand colors and typography defaults',
          'Container widths, spacing, and breakpoints',
          'RTL, translation, and accessibility options',
          'Custom CSS and code snippets',
        ],
      },
      {
        key: 'elements',
        icon: 'list-checks',
        title: 'Elements Manager',
        items: [
          'Enable/disable individual elements or entire categories',
          'Search and filter by status, category, or keyword',
          'Restore defaults and export element states',
        ],
      },
      {
        key: 'extensions',
        icon: 'puzzle',
        title: 'Extensions',
        items: [
          'Wrapper Link, Sticky Element, Reveal Effects',
          'Parallax, Shape Dividers, Gradient Backgrounds',
          'Advanced Typography and Visibility Controls',
        ],
      },
      {
        key: 'performance',
        icon: 'gauge',
        title: 'Performance',
        items: [
          'Conditional asset loading (load only used assets)',
          'Inline critical CSS and defer non‑critical scripts',
          'Dequeue unused assets; monitor payload reductions',
        ],
      },
      {
        key: 'templates',
        icon: 'layers',
        title: 'Templates',
        items: [
          'Browse and import 60+ templates by category',
          'Export/import layouts to reuse across projects',
          'Favorites and recently used templates',
        ],
      },
      {
        key: 'integrations',
        icon: 'plug',
        title: 'Integrations',
        items: [
          'WooCommerce elements and builders',
          'CF7, Gravity Forms, WPForms, Ninja Forms stylers',
          'ACF, JetEngine, Toolset, Pods, MetaBox dynamic fields',
          'WPML, Polylang translation support',
        ],
      },
    ],
    elementsMeta: {
      total: 538,
      wooCommerce: 90,
      extensions: 15,
      templates: 60,
    },
    elementCategories: [
      {
        name: 'Content',
        count: 60,
        description: 'Headings, text, lists, buttons, tabs, accordions, pricing tables, testimonials, callouts.',
        examples: [
          { name: 'Advanced Heading', description: 'Highly customizable headings with highlights and styles.' },
          { name: 'Pricing Table', description: 'Feature comparison tables with CTAs and badges.' },
          { name: 'Accordion / Tabs', description: 'Organize content with collapsible sections and tabs.' },
        ],
      },
      {
        name: 'WooCommerce',
        count: 90,
        description: 'Product grids, carousels, single product builder, carts, checkout components.',
        examples: [
          { name: 'Product Grid', description: 'Responsive product listings with filters and quick view.' },
          { name: 'Product Carousel', description: 'Scrollable product showcase with ratings and prices.' },
          { name: 'Category Grid', description: 'Showcase product categories with counts and images.' },
        ],
      },
      {
        name: 'Marketing',
        count: 50,
        description: 'Popups, countdowns, sticky bars, CTA sections, social proof alerts.',
        examples: [
          { name: 'Popup Builder', description: 'Exit intent, time delay, and on‑click triggers with templates.' },
          { name: 'Countdown Timer', description: 'Multiple styles with real‑time updates and expiry states.' },
          { name: 'Sticky Bar', description: 'Persistent announcement and promo bars with CTA.' },
        ],
      },
      {
        name: 'Media',
        count: 45,
        description: 'Galleries, lightboxes, sliders, video embeds, image hotspots.',
        examples: [
          { name: 'Image Gallery', description: 'Filterable grid with lightbox and keyboard navigation.' },
          { name: 'Hero Slider', description: 'Fullscreen slides with animations and autoplay.' },
          { name: 'Video Popup', description: 'Open videos in a modal with overlay and controls.' },
        ],
      },
      {
        name: 'Dynamic',
        count: 40,
        description: 'ACF, Toolset, JetEngine, Pods, MetaBox field renderers with loops and templates.',
        examples: [
          { name: 'ACF Repeater Grid', description: 'Render repeater rows as cards with full styling.' },
          { name: 'Custom Field Badge', description: 'Show field values as labels, chips, or badges.' },
        ],
      },
      {
        name: 'Navigation',
        count: 28,
        description: 'Menus, breadcrumbs, pagination, table of contents, anchors.',
        examples: [
          { name: 'Breadcrumbs', description: 'SEO‑friendly navigation trail with schema support.' },
          { name: 'Table of Contents', description: 'Auto‑generated ToC with smooth scrolling anchors.' },
        ],
      },
      {
        name: 'Forms',
        count: 35,
        description: 'Contact Form 7, Gravity Forms, WPForms, Ninja Forms styling and integrations.',
        examples: [
          { name: 'CF7 Styler', description: 'Style Contact Form 7 forms to match your brand.' },
          { name: 'Gravity Forms Styler', description: 'Enhance Gravity Forms layouts and components.' },
        ],
      },
      {
        name: 'Post',
        count: 50,
        description: 'Blog/post grids, carousels, author boxes, related posts, featured posts, query loops.',
        examples: [
          { name: 'Post Grid', description: 'Display posts with categories, meta, and pagination.' },
          { name: 'Post Carousel', description: 'Scrollable featured posts with responsive cards.' },
        ],
      },
      {
        name: 'Data Display',
        count: 40,
        description: 'Tables, charts, counters, timelines, logo grids, maps.',
        examples: [
          { name: 'Data Table', description: 'Sortable, paginated tables with responsive design.' },
          { name: 'Charts', description: 'Bar, line, pie charts powered by Chart.js.' },
        ],
      },
      {
        name: 'Sliders',
        count: 20,
        description: 'Hero sliders, carousels, logo sliders, post sliders, 3D sliders.',
        examples: [
          { name: 'Hero Slider', description: 'Fullscreen hero with autoplay and progress.' },
          { name: 'Logo Slider', description: 'Showcase brand logos with smooth animations.' },
        ],
      },
      {
        name: 'Utility',
        count: 30,
        description: 'Code blocks, visibility controls, cookie notices, scroll progress, shortcodes.',
        examples: [
          { name: 'Code Highlight', description: 'Display code with syntax highlighting.' },
          { name: 'Conditional Display', description: 'Show/hide content based on conditions.' },
        ],
      },
      {
        name: 'Events',
        count: 20,
        description: 'Calendars, schedules, RSVPs, speakers, event locations.',
        examples: [
          { name: 'Event Calendar', description: 'Monthly/weekly calendars with events.' },
          { name: 'Schedule List', description: 'Agenda lists with times and speakers.' },
        ],
      },
      {
        name: 'Email',
        count: 12,
        description: 'Email template builder, workflows, automations, analytics.',
        examples: [
          { name: 'Email Template Builder', description: 'Design transactional emails visually.' },
          { name: 'Newsletter Signup', description: 'Collect subscribers with styled forms.' },
        ],
      },
      {
        name: 'Auth',
        count: 10,
        description: 'Login, registration, two-factor, email verification, social login.',
        examples: [
          { name: 'Advanced Login Form', description: 'Customizable login with extra fields.' },
          { name: 'Two‑Factor Auth', description: 'Add an extra security layer to logins.' },
        ],
      },
      {
        name: 'Payment',
        count: 12,
        description: 'Payment calculators, gateways, invoices, trust seals.',
        examples: [
          { name: 'Payment Method Icons', description: 'Display supported payment brands.' },
          { name: 'Tax Calculator', description: 'Inline calculators for checkout flows.' },
        ],
      },
      {
        name: 'Sales & Promotions',
        count: 20,
        description: 'Flash sales, badges, timers, deal banners, bundles.',
        examples: [
          { name: 'Flash Sale Grid', description: 'Highlight limited‑time offers with urgency.' },
          { name: 'Sale Badges', description: 'Dynamic badges with rules (low stock, new).'},
        ],
      },
      {
        name: 'Header & Footer',
        count: 12,
        description: 'Custom headers/footers, sticky header, menus, search, 404 builder.',
        examples: [
          { name: 'Header Builder', description: 'Compose header layouts with menus and search.' },
          { name: 'Footer Builder', description: 'Design footers with widgets and credits.' },
        ],
      },
    ],
    tutorials: {
      useCases: [
        {
          title: 'Business Landing Page',
          summary: 'Hero, features, social proof, pricing, and CTA for conversions.',
          elements: ['Hero Slider', 'Advanced Heading', 'Testimonials', 'Pricing Table', 'CTA'],
        },
        {
          title: 'E‑commerce Homepage',
          summary: 'Category highlights, product grids, promos, and newsletter capture.',
          elements: ['Category Grid', 'Product Grid', 'Countdown Timer', 'Popup Builder'],
        },
        {
          title: 'Portfolio Gallery',
          summary: 'Filterable image grid with lightbox and case study links.',
          elements: ['Image Gallery', 'Advanced Heading', 'Buttons'],
        },
        {
          title: 'SaaS Features Page',
          summary: 'Explain features, comparisons, and plans; prompt signups.',
          elements: ['Advanced Heading', 'Tabs', 'Pricing Table', 'CTA'],
        },
      ],
      guides: [
        {
          title: 'Create a Product Grid with Filters and Quick View',
          level: 'Beginner',
          duration: '15 min',
          steps: [
            'Edit your homepage with WPBakery and add a Row → Column.',
            'Open Add Element → search “Product Grid” and insert.',
            'In Query, choose Recent or filter by category; enable badges and ratings.',
            'Enable Filters (All/Featured/Sale) and Quick View modal.',
            'Save changes and preview — confirm filters and modal function.',
          ],
        },
        {
          title: 'Design a Hero Section with Animated Heading',
          level: 'Beginner',
          duration: '10 min',
          steps: [
            'Add “Hero Slider” or a full‑width Row with background image.',
            'Insert “Advanced Heading” and set eyebrow, title, and highlighted keyword.',
            'Configure alignment, gradient text, and reveal animation.',
            'Add two Buttons (Primary/Outline) and adjust spacing in Design Options.',
          ],
        },
        {
          title: 'Build a Newsletter Popup with Exit Intent',
          level: 'Intermediate',
          duration: '15 min',
          steps: [
            'Go to WPBakery Addons → Extensions and enable Popup Builder.',
            'Create a popup: select template (Newsletter) and set content and image.',
            'Set Trigger → Exit Intent (and optionally time delay).',
            'Publish and visit the page — move cursor out to trigger the popup.',
          ],
        },
        {
          title: 'Create an Image Gallery with Lightbox',
          level: 'Beginner',
          duration: '12 min',
          steps: [
            'Add Element → “Image Gallery” and select images.',
            'Enable categories (Nature/Architecture/People) for filtering.',
            'Turn on Lightbox with keyboard navigation and captions.',
            'Adjust columns per device and hover zoom style.',
          ],
        },
        {
          title: 'Build a Pricing Section with Billing Toggle',
          level: 'Intermediate',
          duration: '20 min',
          steps: [
            'Insert “Pricing Table” and add three plans (Basic/Pro/Enterprise).',
            'Mark Pro as Featured and add a savings badge.',
            'Enable Monthly/Yearly toggle with animated switch.',
            'Add feature lists, CTAs, and responsive spacing.',
          ],
        },
        {
          title: 'Add a Countdown Timer for a Flash Sale',
          level: 'Beginner',
          duration: '8 min',
          steps: [
            'Insert “Countdown Timer” and choose a style (Blocks/Circular/Flip).',
            'Set end date/time and expired behavior (message/CTA).',
            'Enable progress rings (Circular) and gradient numbers.',
          ],
        },
        {
          title: 'Compose a WooCommerce Homepage',
          level: 'Advanced',
          duration: '30 min',
          steps: [
            'Add hero with “Advanced Heading” and CTA buttons.',
            'Place “Category Grid” followed by “Product Grid” (new/featured).',
            'Add “Countdown Timer” for promotions and a “Popup Builder” capture.',
            'Finish with testimonials and a “Pricing Table”/shipping info section.',
          ],
        },
      ],
    },
    advanced: {
      performance: {
        title: 'Performance Optimization',
        bullets: [
          'Conditional asset loading ensures only used element assets are loaded.',
          'Disable unused elements in EA WPBakery > Elements to reduce payload.',
          'Inline critical CSS and defer non‑critical scripts where possible.',
          'Use caching and CDN; verify with Performance Monitor and PageSpeed.',
        ],
      },
      analytics: {
        title: 'Analytics Architecture',
        bullets: [
          'Custom analytics database table for scalable usage tracking (25.0.1+).',
          'Migration utility and data retention/cleanup routines.',
          'Metrics: element usage, per‑page usage; no personal data collected.',
          'Real‑time monitoring via Query Monitor integration (25.0.2).',
        ],
      },
      backgroundTasks: {
        title: 'Background Tasks',
        bullets: [
          'Non‑blocking tasks for analytics processing and maintenance.',
          'Pause/resume controls; safe to run on production.',
          'Task logging and error handling for reliability.',
        ],
      },
      multisite: {
        title: 'Multisite & Network Activation',
        bullets: [
          'Network activation support; per‑site vs network‑wide settings.',
          'Automatic activation on new sites (wpmu_new_blog hook).',
          'Clean uninstall with namespaced options and cache flush.',
        ],
      },
      developer: {
        title: 'Developer Hooks & Extensibility',
        bullets: [
          'WPBakery API: vc_map(), vc_add_params(), vc_map_get_attributes().',
          'Custom param types and autocomplete callbacks.',
          'Action hooks: vc_before_init (register elements/extensions).',
          'Filters: deactivation reasons, shortcode output modifiers.',
        ],
      },
      security: {
        title: 'Security & Standards',
        bullets: [
          'WordPress Coding Standards (PHPCS) compliance.',
          'Strict sanitization and escaping for all user input/output.',
          'No external tracking; local analytics stored in your DB only.',
        ],
      },
    },
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Guides, FAQs, and contact options.' },
        { title: 'Submit a Ticket', href: '/support/submit-ticket', description: 'Get help from our support team.' },
        { title: 'Contact', href: '/contact', description: 'General inquiries and pre‑sales questions.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/eaf-wpbakery', description: 'Features, pricing, and purchase options.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Check and validate your license status.' },
      ],
      learning: [
        { title: 'WPBakery Knowledge Base', href: 'https://kb.wpbakery.com/', description: 'Official builder docs and best practices.' },
        { title: 'WordPress Plugin Developer Handbook', href: 'https://developer.wordpress.org/plugins/', description: 'Standards, APIs, and tutorials.' },
      ],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'License types and usage terms.' },
        { title: 'Privacy Policy', href: '/privacy', description: 'How we handle your data.' },
        { title: 'Refund Policy', href: '/refund-policy', description: 'Money‑back guarantee terms.' },
        { title: 'Terms of Service', href: '/terms', description: 'Legal agreement and acceptable use.' },
      ],
    },
    developerDocs: {
      constants: [
        { name: 'AIOA_WPB_VERSION', description: 'Plugin version constant used for cache-busting assets.' },
        { name: 'AIOA_WPB_ASSETS_URL', description: 'Base URL for plugin CSS/JS/icons.' },
        { name: 'AIOA_WPB_ELEMENTS_PATH', description: 'Filesystem path to element definitions and templates.' },
      ],
      actions: [
        'vc_before_init — Register elements/extensions and custom params',
        'vc_frontend_editor_enqueue_scripts — Enqueue frontend editor assets',
        'wp_enqueue_scripts — Enqueue frontend assets for public pages',
        'admin_enqueue_scripts — Enqueue admin/assets for settings and builder',
        'wpmu_new_blog — Auto-activate on new sites (Multisite)',
        'aioa_wpb_cleanup_old_data — Scheduled cleanup (analytics, caches)'
      ],
      ajax: [
        'wp_ajax_aioa_wpb_toggle_element',
        'wp_ajax_aioa_wpb_bulk_toggle',
        'wp_ajax_aioa_wpb_export_settings',
        'wp_ajax_aioa_wpb_import_settings',
        'wp_ajax_aioa_wpb_clear_cache'
      ],
      storage: {
        options: [
          'aioa_wpb_options',
          'aioa_wpb_disabled_elements',
          'aioa_wpb_enabled_extensions',
          'aioa_wpb_integrations',
          'aioa_wpb_version',
          'aioa_wpb_element_usage (legacy)',
        ],
        transients: [
          'aioa_wpb_discovered_elements',
          'aioa_wpb_elements_cache',
        ],
        database: [
          'Table: wp_aioa_wpb_analytics (uses $wpdb->prefix; Multisite-aware)',
          'Version option: aioa_wpb_analytics_db_version',
          'Helper: AIOA_WPB_Analytics_Database::table_name()'
        ],
      },
      examples: [
        {
          title: 'Register an element (vc_map) and enqueue assets in shortcode class',
          code: `add_action( 'vc_before_init', function() {
    vc_map( array(
        'name'        => __( 'Advanced Heading', 'essential-addons-for-wpbakery' ),
        'base'        => 'aioa_advanced_heading',
        'category'    => __( 'AIOA Content', 'essential-addons-for-wpbakery' ),
        'icon'        => AIOA_WPB_ASSETS_URL . 'icons/advanced-heading.svg',
        'params'      => array( /* ... */ ),
    ) );
} );

class WPBakeryShortCode_AIOA_Advanced_Heading extends WPBakeryShortCode {
    protected static $assets_enqueued = false;
    protected function enqueue_assets() {
        if ( self::$assets_enqueued ) return;
        $suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
        wp_enqueue_style( 'aioa-advanced-heading', AIOA_WPB_ASSETS_URL . 'css/elements/advanced-heading' . $suffix . '.css', array(), AIOA_WPB_VERSION );
        wp_enqueue_script( 'aioa-advanced-heading', AIOA_WPB_ASSETS_URL . 'js/elements/advanced-heading' . $suffix . '.js', array( 'jquery' ), AIOA_WPB_VERSION, true );
        self::$assets_enqueued = true;
    }
    protected function content( $atts, $content = null ) {
        $this->enqueue_assets();
        // Render template...
    }
}`,
        },
        {
          title: 'Frontend editor assets',
          code: `add_action( 'vc_frontend_editor_enqueue_scripts', function () {
    wp_enqueue_style( 'aioa-all-elements', AIOA_WPB_ASSETS_URL . 'css/all-elements.css', array(), AIOA_WPB_VERSION );
    wp_enqueue_script( 'aioa-frontend-editor', AIOA_WPB_ASSETS_URL . 'js/frontend-editor.js', array( 'jquery' ), AIOA_WPB_VERSION, true );
} );`,
        },
        {
          title: 'Custom param type (icon picker)',
          code: `add_action( 'vc_before_init', function () {
    vc_add_shortcode_param( 'aioa_icon', 'aioa_wpb_icon_picker_field', AIOA_WPB_ASSETS_URL . 'js/params/icon-picker.js' );
} );`,
        },
        {
          title: 'Autocomplete param callbacks',
          code: `// In vc_map(): 'type' => 'autocomplete', 'param_name' => 'post_ids', 'settings' => array( 'multiple' => true )
add_filter( 'vc_autocomplete_aioa_advanced_heading_post_ids_callback', 'my_aioa_posts_suggest', 10, 1 );
add_filter( 'vc_autocomplete_aioa_advanced_heading_post_ids_render',   'my_aioa_posts_render', 10, 1 );

function my_aioa_posts_suggest( $query ) {
    $results = array();
    $posts = get_posts( array( 's' => $query, 'post_type' => 'post', 'posts_per_page' => 20 ) );
    foreach ( $posts as $p ) {
        $results[] = array( 'value' => $p->ID, 'label' => $p->post_title );
    }
    return $results;
}
function my_aioa_posts_render( $term ) {
    $p = get_post( (int) $term['value'] );
    return array( 'value' => $p->ID, 'label' => $p->post_title );
}`,
        },
        {
          title: 'Cleanup on uninstall (flush VC cache & plugin cleanup)',
          code: `if ( function_exists( 'vc_flush_template_cache' ) ) {
    vc_flush_template_cache();
}
if ( class_exists( 'AIOA_WPB_WPBakery_Integration' ) ) {
    AIOA_WPB_WPBakery_Integration::cleanup_on_uninstall();
}`,
        },
      ],
    },
    quickStart: {
      title: 'Quick Start Guide',
      subtitle: 'Get up and running in 5 minutes',
      steps: [
        {
          title: '1. Install & Activate',
          description: 'Install and activate the plugin (via search or ZIP upload) from WordPress Admin > Plugins.',
          icon: 'download',
        },
        {
          title: '2. Configure Elements',
          description: 'Go to EA WPBakery in the admin menu. Enable/disable elements as needed (all enabled by default).',
          icon: 'settings',
        },
        {
          title: '3. Open WPBakery Editor',
          description: 'Edit any page with WPBakery. Click "Add Element" to see all 538+ elements organized by category.',
          icon: 'edit',
        },
        {
          title: '4. Build Your Page',
          description: 'Drag elements to your page, customize with live preview, and publish. Import templates for faster start.',
          icon: 'rocket',
        },
      ],
    },
    keyBenefits: [
      {
        title: 'Build Faster',
        description: '60 ready-made templates and 538+ elements mean you can create professional pages in minutes, not hours.',
        icon: 'zap',
      },
      {
        title: 'Convert Better',
        description: 'Built-in popup builder, exit intent, countdown timers, and social proof tools boost conversions by up to 40%.',
        icon: 'trending-up',
      },
      {
        title: 'Load Faster',
        description: 'Conditional asset loading ensures only used elements load, resulting in 40-60% faster page loads and perfect PageSpeed scores.',
        icon: 'gauge',
      },
      {
        title: 'Design Anything',
        description: 'From simple landing pages to complex e-commerce sites, 538+ elements cover every design scenario.',
        icon: 'layers',
      },
    ],
    configuration: `After installation, configure Essential Addons from **WordPress Admin > WPBakery Addons**:

**Dashboard:** View plugin statistics, enabled elements count, active templates, and quick links to documentation.

**Elements:** Enable/disable any of the 538+ elements with a single click. Disable unused elements to optimize performance.

**Extensions:** Toggle 15 extensions including Wrapper Link, Sticky Element, Parallax, Reveal Effects, Shape Dividers, and more.

**Templates:** Browse and import 60+ professional templates organized by category (Business, E-commerce, Portfolio, Blog).

**Performance:** Monitor performance metrics, most-used elements, and asset loading statistics. Export data for analysis.

**Settings:** Configure global settings, API keys for third-party integrations, custom CSS, and advanced options.

**Analytics:** Track element usage, page load times, template imports, and user interactions to optimize your workflow.

All settings auto-save and apply instantly. Changes reflect immediately in the WPBakery editor.`,
    troubleshooting: [
      {
        question: 'Elements not visible in WPBakery editor?',
        answer: 'Ensure WPBakery Page Builder is installed, activated, and up to date (v6.0+). Go to WPBakery Addons > Elements and verify elements are enabled. Clear browser and WordPress cache, then refresh the page editor. If still not visible, check for JavaScript errors in browser console.',
      },
      {
        question: 'Elements appear but styles not loading?',
        answer: 'Go to WPBakery Addons > Performance and ensure conditional asset loading is working. Clear all caches (browser, WordPress, CDN). Regenerate CSS from WPBakery Tools > Regenerate CSS. Check file permissions in /wp-content/uploads/ directory.',
      },
      {
        question: 'Slow page load times?',
        answer: 'Disable unused elements in WPBakery Addons > Elements to reduce asset loading. Enable conditional loading in Performance settings. Minify and combine CSS/JS files. Use a caching plugin like WP Rocket or W3 Total Cache. Consider upgrading hosting for better PHP performance.',
      },
      {
        question: 'Template import fails?',
        answer: 'Increase PHP max_execution_time to 300 seconds and upload_max_filesize to 64MB in php.ini. Check WordPress memory limit (should be 256MB+). Disable conflicting plugins temporarily during import. Try importing smaller templates first to test.',
      },
      {
        question: 'Dynamic content not displaying?',
        answer: 'Ensure required plugins are installed: ACF Pro, JetEngine, Toolset, Pods, or MetaBox depending on your field source. Verify custom fields are configured correctly and have data. Check field type compatibility with the element. Clear object cache if using Redis/Memcached.',
      },
      {
        question: 'Conflicts with other plugins?',
        answer: 'Deactivate other plugins one by one to identify the conflict. Common conflicts occur with other WPBakery addon plugins, caching plugins with aggressive settings, and security plugins blocking AJAX. Contact support with error logs for specific conflict resolution.',
      },
      {
        question: 'Popup builder not working?',
        answer: 'Ensure popups are enabled in WPBakery Addons > Extensions. Check popup trigger settings (on load, on exit, on click). Clear JavaScript cache. Verify no JavaScript errors in browser console. Test with default WordPress theme to rule out theme conflicts.',
      },
      {
        question: 'WooCommerce elements not appearing?',
        answer: 'Ensure WooCommerce plugin is installed and activated (v4.0+). Go to WPBakery Addons > Elements and verify WooCommerce elements are enabled. WooCommerce elements only appear when editing WooCommerce-related pages (Shop, Product, Cart, Checkout).',
      },
      {
        question: 'Seeing notice: “Requires WPBakery Page Builder” or elements missing entirely?',
        answer: 'Activate and update WPBakery Page Builder. The plugin shows an admin notice when WPBakery is not detected (Vc_Manager). After activation, reload the editor and verify elements under EA WPBakery > Elements.',
      },
      {
        question: 'Minimum PHP version warning?',
        answer: 'Essential Addons requires PHP 7.4+. Upgrade PHP in your hosting control panel or contact your host. After upgrading, clear all caches and reload WP admin.',
      },
      {
        question: 'Elements not registering (vc_before_init not firing)?',
        answer: 'Update WPBakery to latest, temporarily disable other addon plugins, and check debug.log for fatal errors. Registration hooks run on vc_before_init; conflicts can prevent element maps from loading.',
      },
      {
        question: 'Frontend editor assets missing or 404s?',
        answer: 'Open DevTools Network tab and look for 404s. Disable optimization plugins combining/minifying VC assets. Clear CDN cache. The plugin enqueues frontend/editor assets via vc_frontend_editor_enqueue_scripts and admin enqueue hooks.',
      },
      {
        question: 'Wrapper Link not working on click?',
        answer: 'Enable “Wrapper Link” in element params and set a valid Link. Ensure no inner anchor overlays the wrapper, and verify JS console has no errors. Click area excludes direct anchor clicks by design.',
      },
      {
        question: 'Sticky Element not sticking?',
        answer: 'The Sticky extension uses CSS position: sticky. Ensure the parent container does not have overflow hidden and set a Top Offset. Sticky behavior is scoped to the nearest scroll container.',
      },
      {
        question: 'Analytics not recording / migration issues?',
        answer: 'Enable analytics in EA WPBakery settings and use the custom analytics table (25.0.1+). Run the migration utility if prompted, verify DB privileges, and check debug.log for SQL errors. Clear caches and retry.',
      },
      {
        question: 'Elements list looks incomplete after updates?',
        answer: 'Rebuild the discovery cache by deactivating/reactivating the plugin, or programmatically delete the transient aioa_wpb_discovered_elements. Then reload EA WPBakery > Elements.',
      },
      {
        question: 'Multisite: new sites missing activation?',
        answer: 'Network‑activate the plugin. The plugin hooks into wpmu_new_blog to auto‑activate per new site. If disabled, activate per‑site from Network Admin > Sites > Edit > Plugins.',
      },
    ],
    faq: [
      {
        question: 'Do I need WPBakery Pro to use this plugin?',
        answer: 'Yes, Essential Addons requires the premium version of WPBakery Page Builder (v6.0 or higher). It does not work with the free/bundled versions. WPBakery Pro can be purchased from CodeCanyon or comes bundled with many premium themes.',
      },
      {
        question: 'Will this slow down my website?',
        answer: 'No! Essential Addons uses conditional asset loading, meaning only the CSS and JavaScript for elements you actually use on a page will load. This results in 40-60% faster page loads compared to loading all assets. Many users see improved PageSpeed scores after installation.',
      },
      {
        question: 'Can I use this with Elementor?',
        answer: 'No, Essential Addons for WPBakery is specifically designed for WPBakery Page Builder. For Elementor, check out our PJ Essential Addons for Elementor plugin which offers similar functionality.',
      },
      {
        question: 'Does this work with any WordPress theme?',
        answer: 'Yes! Essential Addons works with any WordPress theme that is compatible with WPBakery Page Builder. Most modern premium themes include WPBakery compatibility.',
      },
      {
        question: 'Can I create custom templates and share them?',
        answer: 'Absolutely! Build your page, then export it from WPBakery Addons > Templates. Share the exported template file with others who can import it on their sites. Great for agencies managing multiple client sites.',
      },
      {
        question: 'Is this translation ready?',
        answer: 'Yes, Essential Addons is fully translation-ready with complete .pot file included. It works with WPML, Polylang, TranslatePress, and Weglot. All strings are properly internationalized for easy translation.',
      },
      {
        question: 'Do I get updates and support?',
        answer: 'Yes! Your purchase includes lifetime updates and 6 months of premium support (extendable to 12 months). Updates are released monthly with new features, elements, and bug fixes. Support is provided via email and support ticket system.',
      },
      {
        question: 'Can I use this on multiple sites?',
        answer: 'License terms depend on your purchase. Regular License allows use on 1 site. Extended License allows use on unlimited sites. Check your purchase confirmation or CodeCanyon account for specific license details.',
      },
      {
        question: 'How is this different from other WPBakery addons?',
        answer: 'Essential Addons offers 538+ elements (most competitors offer 80-150), includes 90+ WooCommerce elements (vs 20-30), comes with 60 templates (vs 10-15), has 15 extensions (vs 3-5), and uses conditional loading for better performance. It&apos;s the most comprehensive WPBakery addon available.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 30-day money-back guarantee. If Essential Addons doesn&apos;t meet your needs, contact our support team within 30 days of purchase for a full refund, no questions asked.',
      },
      {
        question: 'Does the plugin collect personal data?',
        answer: 'No. Analytics track element usage only and are stored locally in your WordPress database. No external tracking or third‑party data transfer.',
      },
      {
        question: 'Can I disable analytics or switch storage mode?',
        answer: 'Yes. Use EA WPBakery settings to disable analytics or enable the custom analytics table (25.0.1+). Migration utilities guide you through switching modes.',
      },
      {
        question: 'Can I keep data on uninstall?',
        answer: 'Use the “Keep Data on Uninstall” setting (when available) before uninstalling. Otherwise, uninstall removes namespaced options, caches, and analytics data.',
      },
      {
        question: 'Which WPBakery versions are supported?',
        answer: 'Tested with WPBakery 6.x and 7.9. Always keep WPBakery up to date for best compatibility.',
      },
      {
        question: 'How do I refresh the element discovery cache?',
        answer: 'Deactivate/activate the plugin or programmatically delete the transient aioa_wpb_discovered_elements, then revisit EA WPBakery > Elements.',
      },
      {
        question: 'Is Multisite supported?',
        answer: 'Yes. Network‑activate the plugin for all sites or activate per‑site. New blogs can auto‑activate via wpmu_new_blog hook.',
      },
    ],
    changelog: [
      {
        version: '25.0.0',
        date: '2025-10-29',
        changes: [
          'Major release with production-ready optimizations',
          'Fixed Analytics page Chart.js enqueue and variable naming issues',
          'Fixed Quick Export toggle state persistence',
          'Fixed Background Tasks pause/resume functionality',
          'Updated admin.js nonce handling for security',
          'Improved performance monitoring and metrics',
          'Enhanced error handling across all admin pages',
          'Optimized database queries with proper caching',
          'Added comprehensive security audit compliance',
          'Updated WordPress Coding Standards compliance',
          'Code quality improvements across all modules',
          'Enhanced AJAX handlers with proper validation',
        ],
      },
      {
        version: '24.5.0',
        date: '2024-12-15',
        changes: [
          'Added 25 new elements across various categories',
          'Introduced Popup Builder with exit intent triggers',
          'Added sticky element extension',
          'Performance improvements: 40-60% faster page loads',
          'New template library with 15 additional templates',
          'Enhanced WooCommerce integration with 10 new elements',
          'Improved dynamic content handling for ACF and JetEngine',
          'Added visual dashboard with analytics',
          'Bug fixes and stability improvements',
        ],
      },
    ],
  },
  'pj-filter': {
    name: 'PJ Filter',
    type: 'plugin',
    version: '3.2.0',
    category: 'E-commerce',
    description: 'Intelligent Filters. Maximum Conversions. Zero Compromise.',
    // Link to matching plugin detail page slug
    pluginSlug: 'pj-filter',
    overview: `Transform your WooCommerce store with PJ Filter — the most intelligent and comprehensive filtering solution that helps customers find exactly what they need, faster. **No coding required.**

**Not just filtering. Intelligence.**

With AI-powered recommendations, advanced analytics, and smart insights, PJ Filter is designed to boost your conversions and revenue. Whether you're running a fashion store, electronics shop, or any e-commerce business, PJ Filter adapts to your needs with industry-specific presets and customizable options.

**What Makes PJ Filter Different:**

• **AI-Powered Smart Dashboard** - Know which filters make money with real-time performance scores and actionable recommendations
• **Built-in Analytics Engine** - Track views, clicks, conversions, and revenue per filter with comprehensive metrics
• **5-Minute Setup** - Industry presets reduce configuration from 2+ hours to just 5 minutes
• **A/B Testing Engine** - Auto-optimize conversions by testing filter variations automatically
• **Customer Journey Mapping** - Understand buying patterns with Sankey diagram visualizations
• **10 Filter Types & 8 View Styles** - Complete flexibility from checkboxes to color swatches
• **AJAX Filtering** - Real-time product updates without page reload
• **SEO Optimized** - Clean URLs with schema markup for better search visibility
• **Mobile First** - Touch-optimized with 40% less abandoned filters on mobile
• **40+ Integrations** - Works with Elementor, ACF, WPML, WP Rocket, Yoast SEO, and more

Built with performance and conversions in mind, PJ Filter helps you create a filtering experience that actually drives sales. Simply install, choose a preset, and watch your metrics improve.`,
    features: [
      'AI-Powered Smart Dashboard - Performance scoring',
      '10 Filter Types - Taxonomy, attributes, price, rating, stock, sale, ACF, meta, date, search',
      '8 View Styles - Checkboxes, radio, dropdown, sliders, color swatches, date picker, toggle, stars',
      'AJAX Filtering - Instant results without page reload',
      'Filter Presets - 6 industry-specific templates',
      'Analytics Engine - Track views, clicks, conversions, revenue',
      'A/B Testing - Auto-optimize filter performance',
      'Customer Journey Maps - Sankey diagram visualizations',
      'Visual & Voice Search - AI-powered product discovery',
      'Smart Search - Select2 integration for 500+ items',
      'SEO Friendly URLs - Clean URLs with schema markup',
      'Mobile Optimized - Touch-friendly responsive design',
      'Performance Analytics - Per-filter metrics and insights',
      'Onboarding Wizard - 5-step guided setup',
      'Dynamic Content - ACF, JetEngine, Toolset, Pods, MetaBox',
      'Multi-Vendor Support - Dokan, WCFM, WC Vendors',
      'Multi-language - WPML, Polylang, TranslatePress',
      'GDPR/CCPA Compliant - Enterprise security',
      'REST API & GraphQL - Developer-friendly',
      'WP-CLI Commands - Automation support',
    ],
    installation: {
      steps: [
        'Download pj-product-filter.zip from your CodeCanyon account',
        'Go to WordPress Admin > Plugins > Add New',
        'Click "Upload Plugin" and choose the zip file',
        'Click "Install Now" and then "Activate"',
        'Follow the 5-step onboarding wizard that appears',
        'Choose your store type (Fashion, Electronics, etc.)',
        'Select a filter preset or create custom filters',
        'Filters automatically appear on your shop page',
      ],
      requirements: [
        'WordPress 5.8 or higher (tested up to 6.8)',
        'WooCommerce 6.0 or higher (tested up to 9.4)',
        'PHP 7.4 or higher (PHP 8.0+ recommended)',
        'MySQL 5.6 or higher',
      ],
    },
    installationMethods: [
      {
        name: 'Method 1: Upload via WordPress Admin (Recommended)',
        icon: 'upload',
        steps: [
          'Login to WordPress Admin Dashboard',
          'Navigate to Plugins > Add New',
          'Click "Upload Plugin" button at the top',
          'Choose the downloaded pj-product-filter.zip file',
          'Click "Install Now" and wait for completion',
          'Click "Activate Plugin"',
          'The onboarding wizard will start automatically',
        ],
      },
      {
        name: 'Method 2: Install via FTP/SFTP',
        icon: 'server',
        steps: [
          'Extract the ZIP file on your computer',
          'Connect to your server via FTP (FileZilla, Cyberduck, etc.)',
          'Navigate to /wp-content/plugins/ directory',
          'Upload the extracted pj-product-filter folder',
          'Go to WordPress Admin > Plugins',
          'Find "PJ Filter" and click "Activate"',
          'Complete the onboarding wizard',
        ],
      },
      {
        name: 'Method 3: WP-CLI (Advanced)',
        icon: 'terminal',
        steps: [
          'SSH into your server',
          'Run: wp plugin install /path/to/pj-product-filter.zip --activate',
          'Run: wp pj-filter config set ajax_enabled true',
          'Verify: wp pj-filter status',
        ],
      },
    ],
    setupWizard: {
      title: 'First-time Setup: Onboarding Wizard',
      steps: [
        'Step 1: Welcome - Introduction to PJ Filter features and overview',
        'Step 2: Store Type - Choose your store category (Fashion, Electronics, Food & Beverage, Home & Furniture, Health & Beauty, Sports & Outdoors)',
        'Step 3: Filter Preset - Review and apply pre-configured filters optimized for your industry',
        'Step 4: Customize - Enable/disable specific filters, reorder positions, configure settings',
        'Step 5: Complete - Review configuration and finish setup',
      ],
    },
    quickStart: {
      title: 'Quick Start Guide',
      subtitle: 'Get up and running in 5 minutes',
      steps: [
        {
          title: '1. Install & Activate',
          description: 'Install and activate the plugin from WordPress Admin > Plugins. The onboarding wizard appears automatically.',
          icon: 'download',
        },
        {
          title: '2. Choose Store Type',
          description: 'Select your store category to load appropriate filter presets (Fashion, Electronics, Food, etc.).',
          icon: 'settings',
        },
        {
          title: '3. Apply Preset',
          description: 'Review recommended filters and click "Apply This Preset" to configure filters in one click.',
          icon: 'wand2',
        },
        {
          title: '4. Customize & Publish',
          description: 'Adjust filters as needed and click "Finish Setup". Filters are now live on your shop page.',
          icon: 'rocket',
        },
      ],
    },
    core: {
      dashboard: {
        title: 'Smart Dashboard Overview',
        subtitle: 'AI-powered insights to optimize filter performance',
        features: [
          {
            icon: 'gauge',
            title: 'Performance Score (0-100)',
            description: 'Overall filter performance based on usage rate, conversion rate, and revenue impact. Color-coded for quick insights.',
          },
          {
            icon: 'zap',
            title: 'Quick Wins',
            description: 'AI-identified opportunities for immediate improvements, like repositioning high-performing filters or adding trending filters.',
          },
          {
            icon: 'bar-chart-3',
            title: 'Filter Performance Breakdown',
            description: 'Detailed metrics for each filter: views, clicks, usage rate, conversions, conversion rate, and revenue generated.',
          },
          {
            icon: 'trending-up',
            title: 'Actionable Recommendations',
            description: 'Smart suggestions like "Move Color filter to top - it\'s your most-used filter" or "Add Brand filter - 73% of similar stores use this".',
          },
        ],
      },
      filterTypes: {
        title: '10 Filter Types Available',
        types: [
          { name: 'Taxonomy Filter', description: 'Categories, tags, and custom taxonomies' },
          { name: 'Attribute Filter', description: 'WooCommerce product attributes (color, size, material, etc.)' },
          { name: 'Price Range', description: 'Min/max price slider with customizable ranges' },
          { name: 'Rating Filter', description: 'Product star ratings (1-5 stars)' },
          { name: 'Stock Status', description: 'In stock, out of stock, on backorder' },
          { name: 'Sale Status', description: 'On sale vs regular price products' },
          { name: 'ACF Fields', description: 'Advanced Custom Fields integration' },
          { name: 'Meta Fields', description: 'Custom post meta data fields' },
          { name: 'Date Filter', description: 'Product publish date or custom date fields' },
          { name: 'Search Filter', description: 'Keyword search with auto-complete' },
        ],
      },
      viewStyles: {
        title: '8 View Styles Available',
        styles: [
          { name: 'Checkboxes', description: 'Multiple selections with product counts' },
          { name: 'Radio Buttons', description: 'Single selection only' },
          { name: 'Dropdown Select', description: 'Space-saving select menu (single)' },
          { name: 'Multi-Select Dropdown', description: 'Select menu with multiple selections' },
          { name: 'Range Slider', description: 'For price and numeric ranges' },
          { name: 'Color Swatches', description: 'Visual color picker' },
          { name: 'Toggle Switch', description: 'On/off toggle buttons' },
          { name: 'Rating Stars', description: 'Visual star rating display' },
        ],
      },
    },
    filterPresets: [
      {
        name: 'Fashion Store Essentials',
        filters: ['Size', 'Color', 'Brand', 'Price Range', 'Category', 'Sale Status'],
        bestFor: 'Clothing, shoes, accessories stores',
      },
      {
        name: 'Electronics Standard',
        filters: ['Brand', 'Price Range', 'Features/Specs', 'Rating', 'Stock Status'],
        bestFor: 'Electronics, gadgets, tech stores',
      },
      {
        name: 'Food & Beverage',
        filters: ['Category', 'Brand', 'Dietary Info (Vegan, Gluten-free)', 'Price Range', 'Rating'],
        bestFor: 'Food delivery, grocery, beverage stores',
      },
      {
        name: 'Home & Furniture',
        filters: ['Category', 'Color', 'Material', 'Price Range', 'Room Type'],
        bestFor: 'Furniture, home decor, interior stores',
      },
      {
        name: 'Health & Beauty',
        filters: ['Brand', 'Product Type', 'Skin Type', 'Ingredients', 'Price Range'],
        bestFor: 'Beauty, skincare, cosmetics stores',
      },
      {
        name: 'Sports & Outdoors',
        filters: ['Category', 'Brand', 'Size', 'Activity Type', 'Price Range'],
        bestFor: 'Sports equipment, outdoor gear, fitness stores',
      },
    ],
    keyBenefits: [
      {
        title: '5-Minute Setup',
        description: '60 ready-made templates and 6 industry presets mean you can configure filters in 5 minutes instead of 2+ hours.',
        icon: 'clock',
      },
      {
        title: 'Know What Works',
        description: 'AI Dashboard tells you exactly which filters drive sales with performance scores and revenue metrics.',
        icon: 'bar-chart-3',
      },
      {
        title: 'Optimize Automatically',
        description: 'A/B Testing Engine finds winning filter configurations automatically, boosting conversions by up to 40%.',
        icon: 'trending-up',
      },
      {
        title: 'Perfect for Mobile',
        description: 'Touch-optimized design with 40% less abandoned filters on mobile devices compared to desktop.',
        icon: 'gauge',
      },
    ],
    settingsSections: [
      {
        key: 'general',
        icon: 'sliders',
        title: 'General Settings',
        items: [
          'Enable/disable AJAX filtering',
          'Update on change vs on button click',
          'Show result count and loading animation',
          'Enable SEO-friendly URL parameters',
          'Show "Clear All" button',
        ],
      },
      {
        key: 'display',
        icon: 'layout-dashboard',
        title: 'Display Settings',
        items: [
          'Filter position (sidebar, above products, custom)',
          'Filter layout (vertical, horizontal, grid)',
          'Mobile behavior (collapsible, drawer, modal)',
          'Show/hide elements and custom CSS',
        ],
      },
      {
        key: 'performance',
        icon: 'gauge',
        title: 'Performance Settings',
        items: [
          'Enable caching and set cache duration',
          'Query optimization and lazy loading',
          'Preload filter data for faster interactions',
        ],
      },
      {
        key: 'analytics',
        icon: 'bar-chart-3',
        title: 'Analytics Settings',
        items: [
          'Enable/disable analytics tracking',
          'Attribution model selection (last click, first click, linear)',
          'Data retention period configuration',
          'GDPR privacy settings and data export',
        ],
      },
    ],
    integrations: {
      total: 40,
      categories: [
        {
          name: 'Page Builders',
          count: 4,
          items: ['Elementor & Elementor Pro', 'WPBakery', 'Divi Builder', 'Beaver Builder'],
        },
        {
          name: 'Multilingual',
          count: 3,
          items: ['WPML', 'Polylang & Pro', 'TranslatePress'],
        },
        {
          name: 'Custom Fields',
          count: 3,
          items: ['ACF & ACF PRO', 'Pods Framework', 'Meta Box'],
        },
        {
          name: 'Caching & Performance',
          count: 5,
          items: ['WP Rocket', 'W3 Total Cache', 'WP Super Cache', 'LiteSpeed Cache', 'Autoptimize'],
        },
        {
          name: 'SEO',
          count: 3,
          items: ['Yoast SEO', 'Rank Math', 'All in One SEO'],
        },
        {
          name: 'Multi-Vendor',
          count: 3,
          items: ['Dokan Multivendor', 'WCFM Marketplace', 'WC Vendors'],
        },
        {
          name: 'Popular Themes',
          count: 5,
          items: ['Astra & Astra Pro', 'OceanWP', 'GeneratePress', 'Flatsome', 'Storefront'],
        },
      ],
    },
    advanced: {
      analytics: {
        title: 'Analytics & Performance Tracking',
        bullets: [
          'Track filter views, clicks, and conversions in real-time',
          'Per-filter revenue and average order value metrics',
          'Customer journey mapping with Sankey diagrams',
          'Export data to CSV for external analysis',
          'GDPR-compliant: no external tracking, all data stored locally',
        ],
      },
      backgroundTasks: {
        title: 'Background Processing',
        bullets: [
          'Non-blocking analytics processing',
          'Scheduled data cleanup and optimization',
          'Async filter cache generation',
          'Safe to run on production sites',
        ],
      },
      multisite: {
        title: 'Multisite Support',
        bullets: [
          'Network activation support',
          'Per-site filter configuration',
          'Shared filter templates across sites',
          'Network-wide analytics aggregation',
        ],
      },
      developer: {
        title: 'Developer Hooks & APIs',
        bullets: [
          'REST API: GET /wp-json/pj-filter/v1/filters',
          'GraphQL API for modern app development',
          'Webhooks for filter change events',
          'WP-CLI commands: wp pj-filter generate, analytics, cache',
          '200+ hooks and filters for customization',
        ],
      },
      performance: {
        title: 'Performance Optimization',
        bullets: [
          'Object caching (Redis, Memcached)',
          'Transient caching for filter queries',
          'Lazy loading and progressive enhancement',
          'CDN-friendly asset delivery',
          'Average response time: <100ms with caching',
        ],
      },
      security: {
        title: 'Security & Compliance',
        bullets: [
          'All inputs sanitized and validated',
          'SQL injection and XSS protection',
          'GDPR & CCPA compliant',
          'Two-factor authentication support',
          'Security audit passed',
        ],
      },
    },
    configuration: `After installation, configure PJ Filter from **WordPress Admin > PJ Filter**:

**Dashboard:** View AI-powered insights, performance scores, and quick wins. Track which filters drive the most revenue.

**Filters:** Create new filters, edit existing ones, or apply industry presets. Drag and drop to reorder filter positions.

**Analytics:** Access detailed reports on filter usage, conversions, and revenue. View customer journey maps and top performers.

**Settings:** Configure general behavior, display options, performance settings, and analytics tracking. Import/export configurations.

All settings auto-save and changes reflect immediately on your shop page. The Smart Dashboard provides real-time recommendations to optimize your filter performance.`,
    troubleshooting: [
      {
        question: 'Filters not showing on shop page?',
        answer: 'Check that WooCommerce is installed and active. Go to PJ Filter > Settings > Display and verify the correct position is selected. Ensure filters are published and assigned to a filter set. Try clearing cache and testing with a default theme.',
      },
      {
        question: 'AJAX filtering not working?',
        answer: 'Enable AJAX in PJ Filter > Settings > General. Check browser console for JavaScript errors. Clear all caches (WordPress, browser, CDN). Temporarily disable other plugins to check for conflicts. Ensure jQuery is loaded correctly.',
      },
      {
        question: 'No products showing after filtering?',
        answer: 'Verify that products have the attributes/categories you\'re filtering by. Check filter logic and conditions. Clear all caches. Test with WooCommerce default products. Check for theme conflicts by switching to Storefront.',
      },
      {
        question: 'Analytics not tracking data?',
        answer: 'Enable analytics in PJ Filter > Settings > Analytics. Wait 24-48 hours for initial data collection. Check that WordPress cron is working (use WP Crontrol plugin). Exclude tracking scripts from cache plugins. Verify database table was created during installation.',
      },
      {
        question: 'Slow performance / filtering takes too long?',
        answer: 'Enable caching in PJ Filter > Settings > Performance. Reduce number of filter options or enable search for long lists. Optimize database tables. Consider upgrading hosting if you have 1000+ products. Use object caching (Redis/Memcached) for best performance.',
      },
      {
        question: 'Filters not working with variable products?',
        answer: 'PJ Filter fully supports variable products. Ensure variations have attributes assigned in WooCommerce. Check that attribute taxonomy is created properly (Product > Attributes). Test with default WooCommerce variable products first.',
      },
      {
        question: 'Mobile filters not responsive?',
        answer: 'Check PJ Filter > Settings > Display > Mobile Behavior. Try different mobile layouts (collapsible, drawer, modal). Clear browser cache on mobile device. Test with mobile emulator in Chrome DevTools. Ensure theme is mobile-responsive.',
      },
      {
        question: 'Conflicts with other filter plugins?',
        answer: 'Deactivate other filter plugins (WOOF, YITH, Filter Everything). Clear all caches. If you need to migrate, use PJ Filter > Settings > Migration to import settings from other plugins. Only one filter plugin should be active at a time.',
      },
    ],
    faq: [
      {
        question: 'Is PJ Filter worth $57 vs $40 competitors?',
        answer: 'Absolutely. For just $17 more you get AI Dashboard (competitors don\'t have), Analytics Engine (they don\'t have), A/B Testing (they don\'t have), 5-minute setup vs 2+ hours, 40+ tested integrations, Customer Journey Maps, GraphQL API, and GDPR/CCPA tools. Value: 3x more features for 30% more money.',
      },
      {
        question: 'Will this work with my theme?',
        answer: 'Yes. PJ Filter works with ALL WordPress themes. Tested with 50+ popular themes including Storefront, Astra, OceanWP, Flatsome, Divi, GeneratePress, Kadence, and custom themes. If you have issues, our support team will help fix them (included support).',
      },
      {
        question: 'Does it slow down my site?',
        answer: 'No. PJ Filter is optimized for speed with object caching (Redis, Memcached), transient caching, lazy loading, and CDN-friendly assets. Average response time: <100ms with caching enabled. Many stores see improved performance due to AJAX reducing page loads.',
      },
      {
        question: 'Can I migrate from other filter plugins?',
        answer: 'Yes. Built-in Migration Wizard imports from Filter Everything (10 min), YITH WooCommerce (15 min), and WOOF Products Filter (12 min). All settings imported automatically. Go to PJ Filter > Settings > Migration to start.',
      },
      {
        question: 'Do I need coding skills?',
        answer: 'No. PJ Filter is designed for non-technical users. The 5-step onboarding wizard, industry presets, and visual filter builder make setup easy. No coding required for 99% of use cases. Developers have access to hooks, filters, and APIs for advanced customization.',
      },
      {
        question: 'Does it work with variable products?',
        answer: 'Yes. PJ Filter fully supports WooCommerce variable products and variations. You can filter by variation attributes (color, size, etc.) and the plugin handles stock status for each variation correctly.',
      },
      {
        question: 'How do I get support?',
        answer: 'Email: support@printjones.com (24-48h response). Documentation: Comprehensive guides and video tutorials. Community Forum: Connect with other users. Included: 6 months premium support with every purchase.',
      },
      {
        question: 'What about updates?',
        answer: 'Lifetime FREE updates included: new features, security patches, compatibility updates. No recurring fees. Updates are released monthly with new features and improvements.',
      },
      {
        question: 'Is it GDPR compliant?',
        answer: 'Yes. PJ Filter is fully GDPR and CCPA compliant. All analytics data is stored locally in your WordPress database. No external tracking or third-party data transfer. Built-in tools for data export, deletion, and user consent management.',
      },
      {
        question: 'Can I use it on multiple sites?',
        answer: 'Regular License: 1 site. Extended License: unlimited client sites. Multi-site: Contact for bulk pricing. Check your purchase confirmation for specific license details.',
      },
    ],
    changelog: [
      {
        version: '3.2.0',
        date: '2025-10-31',
        changes: [
          'NEW: Smart Filter Dashboard with AI-powered insights',
          'NEW: Filter Presets System with 6 industry-specific templates',
          'NEW: Onboarding Wizard for first-time users',
          'NEW: Filter Performance Report with detailed analytics',
          'NEW: Filter Search & Organization with Select2 integration',
          'IMPROVED: All features now use real WordPress data (no dummy content)',
          'IMPROVED: Enhanced mobile responsiveness and touch optimization',
          'IMPROVED: Better WordPress coding standards compliance (7,554 errors fixed)',
          'IMPROVED: Full internationalization support',
          'FIXED: Plugin header format for WordPress.org',
          'FIXED: Text domain configuration',
          'FIXED: Unordered placeholders in translations',
        ],
      },
      {
        version: '3.1.0',
        date: '2025-10-25',
        changes: [
          'NEW: Advanced analytics and tracking',
          'NEW: REST API, GraphQL, and Webhooks',
          'NEW: HPOS (High-Performance Order Storage) compatibility',
          'IMPROVED: Admin interface consolidation (34 → 12 pages)',
          'IMPROVED: Enhanced security with SQL injection prevention',
          'IMPROVED: Better multisite support',
          'IMPROVED: GDPR/CCPA compliance tools',
        ],
      },
      {
        version: '3.0.0',
        date: '2025-10-20',
        changes: [
          'MAJOR: Complete architecture overhaul',
          'NEW: AI/ML features for smart recommendations',
          'NEW: Visual search and voice search',
          'NEW: A/B testing engine',
          'NEW: Customer journey mapping',
          'NEW: Social proof and gamification features',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Guides, FAQs, and contact options.' },
        { title: 'Submit a Ticket', href: '/support/submit-ticket', description: 'Get help from our support team.' },
        { title: 'Contact', href: '/contact', description: 'General inquiries and pre‑sales questions.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-filter', description: 'Features, pricing, and purchase options.' },
        { title: 'Live Demo', href: 'https://filter.printjones.com', description: 'Try PJ Filter with 280+ sample products.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Check and validate your license status.' },
      ],
      learning: [
        { title: 'Video Tutorials', href: 'https://printjones.com/tutorials/pj-filter', description: '20+ step-by-step video guides.' },
        { title: 'Knowledge Base', href: 'https://printjones.com/kb/pj-filter', description: 'Articles and how-to guides.' },
      ],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'License types and usage terms.' },
        { title: 'Privacy Policy', href: '/privacy', description: 'How we handle your data.' },
        { title: 'Refund Policy', href: '/refund-policy', description: '30-day money-back guarantee terms.' },
      ],
    },
  },
  'pj-media-library': {
    name: 'PJ Media Library',
    type: 'plugin',
    version: '25.0.0',
    category: 'Media',
    description: 'Advanced media management and organization for WordPress',
    overview: `PJ Media Library transforms the default WordPress media library into a powerful media management system. Organize, search, and manage your media files with ease using folders, tags, and advanced filtering.`,
    features: [
      'Folder Organization',
      'Advanced Search & Filters',
      'Bulk Operations',
      'Media Tags',
      'Image Optimization',
      'CDN Integration',
      'File Type Restrictions',
      'User Permissions',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Media > PJ Media Library',
        'Start organizing your media',
      ],
      requirements: [
        'WordPress 5.0 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Settings > Media Library. Set up folders, tags, and permissions.`,
    troubleshooting: [
      {
        question: 'Media not showing in folders?',
        answer: 'Refresh the media library page and ensure JavaScript is enabled in your browser.',
      },
    ],
    faq: [
      {
        question: 'Can I move existing media into folders?',
        answer: 'Yes, use the bulk operations feature to organize existing media files.',
      },
    ],
    changelog: [
      {
        version: '1.0.0',
        date: '2025-01-01',
        changes: [
          'Initial release',
          'Folder management',
          'Advanced search',
        ],
      },
    ],
  },
  'pj-product-designer': {
    name: 'PJ Product Designer',
    type: 'plugin',
    version: '25.0.0',
    category: 'E-commerce',
    description: 'Custom product design tool for WooCommerce',
    pluginSlug: 'pj-product-designer',
    overview: `PJ Product Designer enables your customers to create custom products with an intuitive design interface. Perfect for print-on-demand, personalized gifts, and custom merchandise stores.`,
    features: [
      'Visual Design Editor',
      'Custom Text and Graphics',
      'Template Library',
      'Multi-Layer Support',
      'High-Resolution Export',
      'Mobile Responsive',
      'WooCommerce Integration',
      'Order Management',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to WooCommerce > Product Designer',
        'Configure design templates',
        'Add designer to products',
      ],
      requirements: [
        'WordPress 6.0 or higher',
        'WooCommerce 7.0 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from WooCommerce > Product Designer. Set up templates, pricing rules, and design options.`,
    troubleshooting: [
      {
        question: 'Designer not loading?',
        answer: 'Clear browser cache and ensure JavaScript is enabled. Check console for errors.',
      },
    ],
    faq: [
      {
        question: 'Can customers save their designs?',
        answer: 'Yes, customers can save designs and return to edit them later.',
      },
    ],
    changelog: [
      {
        version: '25.0.0',
        date: '2025-01-15',
        changes: [
          'Major release',
          'New visual editor',
          'Enhanced mobile support',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Guides and FAQs.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-product-designer', description: 'Features and pricing.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Check license status.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'License terms.' },
      ],
    },
  },
  'pj-store-kite': {
    name: 'PJ Store Kite',
    type: 'plugin',
    version: '1.0.0',
    category: 'E-commerce',
    description: 'Advanced WooCommerce store management and optimization',
    overview: `PJ Store Kite is the ultimate WooCommerce store management plugin. Optimize your store performance, manage inventory, analyze sales, and automate tasks to boost your e-commerce success.`,
    features: [
      'Sales Analytics Dashboard',
      'Inventory Management',
      'Order Automation',
      'Customer Insights',
      'Email Marketing',
      'Product Recommendations',
      'Performance Optimization',
      'Multi-currency Support',
    ],
    installation: {
      steps: [
        'Install the plugin',
        'Activate from Plugins page',
        'Go to WooCommerce > Store Kite',
        'Complete initial setup wizard',
      ],
      requirements: [
        'WordPress 6.0 or higher',
        'WooCommerce 7.0 or higher',
        'PHP 8.0 or higher',
      ],
    },
    configuration: `Configure from WooCommerce > Store Kite. Set up analytics, automation rules, and integrations.`,
    troubleshooting: [
      {
        question: 'Analytics not showing data?',
        answer: 'Ensure WooCommerce is recording sales data and wait 24 hours for initial data collection.',
      },
    ],
    faq: [
      {
        question: 'Does it work with WooCommerce subscriptions?',
        answer: 'Yes, PJ Store Kite fully supports WooCommerce Subscriptions and other popular extensions.',
      },
    ],
    changelog: [
      {
        version: '1.0.0',
        date: '2025-01-08',
        changes: [
          'Initial release',
          'Analytics dashboard',
          'Automation features',
        ],
      },
    ],
  },
  'pj-bookings': {
    name: 'PJ Bookings',
    type: 'plugin',
    version: '25.1.0',
    category: 'E-commerce',
    description: 'Complete booking and appointment management system',
    pluginSlug: 'pj-bookings',
    overview: `PJ Bookings provides a complete booking and appointment management system for WordPress. Perfect for service businesses, consultants, healthcare providers, and any business that needs scheduling capabilities.`,
    features: [
      'Appointment Scheduling',
      'Calendar Management',
      'Email Notifications',
      'Payment Integration',
      'Recurring Bookings',
      'Multiple Staff Support',
      'Time Zone Management',
      'Booking Forms',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Bookings > Settings',
        'Configure calendar and services',
        'Add booking form to pages',
      ],
      requirements: [
        'WordPress 5.8 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Bookings > Settings. Set up services, staff, and booking rules.`,
    troubleshooting: [
      {
        question: 'Bookings not showing in calendar?',
        answer: 'Ensure booking status is set to approved and calendar is refreshed.',
      },
    ],
    faq: [
      {
        question: 'Can I accept payments for bookings?',
        answer: 'Yes, integrates with PayPal, Stripe, and WooCommerce payments.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'Version update',
          'Enhanced calendar features',
          'New payment options',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Help docs.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-bookings', description: 'Features.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'License.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'Terms.' },
      ],
    },
  },
  'pj-membership': {
    name: 'PJ Membership',
    type: 'plugin',
    version: '25.1.0',
    category: 'Membership',
    description: 'Membership site builder with content restriction',
    pluginSlug: 'pj-membership',
    overview: `PJ Membership transforms your WordPress site into a powerful membership platform. Restrict content, create membership levels, manage subscriptions, and build a thriving community.`,
    features: [
      'Multiple Membership Levels',
      'Content Restriction',
      'Subscription Management',
      'Payment Gateway Integration',
      'Member Directory',
      'Private Messaging',
      'Drip Content',
      'Membership Reports',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Membership > Settings',
        'Create membership levels',
        'Set content restrictions',
      ],
      requirements: [
        'WordPress 6.0 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Membership > Settings. Create levels, set pricing, and restrict content.`,
    troubleshooting: [
      {
        question: 'Members cannot access content?',
        answer: 'Check membership level assignment and content restriction rules.',
      },
    ],
    faq: [
      {
        question: 'Does it support recurring payments?',
        answer: 'Yes, supports recurring subscriptions with Stripe and PayPal.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'New membership features',
          'Enhanced restriction rules',
          'Improved payment handling',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Support.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-membership', description: 'Details.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Verify.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'License.' },
      ],
    },
  },
  'pj-gift-card': {
    name: 'PJ Gift Card',
    type: 'plugin',
    version: '25.1.0',
    category: 'E-commerce',
    description: 'Digital gift card system for WooCommerce',
    pluginSlug: 'pj-gift-card',
    overview: `PJ Gift Card adds a complete digital gift card system to your WooCommerce store. Increase revenue and customer loyalty with customizable gift cards.`,
    features: [
      'Digital Gift Cards',
      'Custom Designs',
      'Email Delivery',
      'Balance Management',
      'Expiration Dates',
      'Partial Redemption',
      'Gift Card Reports',
      'Custom Amounts',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to WooCommerce > Gift Cards',
        'Create gift card products',
        'Configure email templates',
      ],
      requirements: [
        'WordPress 6.0 or higher',
        'WooCommerce 7.0 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from WooCommerce > Gift Cards. Set up designs and email templates.`,
    troubleshooting: [
      {
        question: 'Gift card emails not sending?',
        answer: 'Check email settings and ensure SMTP is configured properly.',
      },
    ],
    faq: [
      {
        question: 'Can customers check their balance?',
        answer: 'Yes, includes a balance checker shortcode for your website.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'New design templates',
          'Improved balance tracking',
          'Enhanced email delivery',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Help.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-gift-card', description: 'View.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Check.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'Terms.' },
      ],
    },
  },
  'pj-event-calendar': {
    name: 'PJ Event Calendar',
    type: 'plugin',
    version: '25.1.0',
    category: 'Events',
    description: 'Event management and calendar system',
    pluginSlug: 'pj-event-calendar',
    overview: `PJ Event Calendar provides a complete event management solution for WordPress. Create, manage, and display events with a beautiful calendar interface.`,
    features: [
      'Event Management',
      'Calendar Views',
      'Ticket Sales',
      'Recurring Events',
      'Event Categories',
      'Location Management',
      'Email Reminders',
      'iCal Export',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Events > Add New',
        'Create your first event',
        'Add calendar to page',
      ],
      requirements: [
        'WordPress 5.8 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Events > Settings. Set up calendar views and email templates.`,
    troubleshooting: [
      {
        question: 'Events not showing in calendar?',
        answer: 'Check event status and date range settings.',
      },
    ],
    faq: [
      {
        question: 'Can I sell tickets?',
        answer: 'Yes, includes ticket sales with WooCommerce integration.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'New calendar views',
          'Enhanced ticket system',
          'Improved recurring events',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Docs.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-event-calendar', description: 'Features.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'License.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'Info.' },
      ],
    },
  },
  'pj-forms': {
    name: 'PJ Forms',
    type: 'plugin',
    version: '25.1.0',
    category: 'Forms',
    description: 'Advanced form builder with conditional logic',
    pluginSlug: 'pj-forms',
    overview: `PJ Forms is a powerful form builder for WordPress. Create beautiful, functional forms with drag-and-drop ease. Features conditional logic, multi-page forms, and extensive integrations.`,
    features: [
      'Drag & Drop Builder',
      'Conditional Logic',
      'Multi-Page Forms',
      'File Uploads',
      'Payment Integration',
      'Email Notifications',
      'Form Analytics',
      'Spam Protection',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Forms > Add New',
        'Build your form',
        'Add form to page',
      ],
      requirements: [
        'WordPress 5.8 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Forms > Settings. Set up email notifications and integrations.`,
    troubleshooting: [
      {
        question: 'Form not submitting?',
        answer: 'Check email settings and spam protection configuration.',
      },
    ],
    faq: [
      {
        question: 'Can I accept payments?',
        answer: 'Yes, integrates with PayPal, Stripe, and other payment gateways.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'New field types',
          'Enhanced conditional logic',
          'Improved analytics',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Support.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-forms', description: 'Details.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Verify.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'Terms.' },
      ],
    },
  },
  'pj-email-templates': {
    name: 'PJ Email Templates',
    type: 'plugin',
    version: '25.1.0',
    category: 'Marketing',
    description: 'Beautiful email template designer for WordPress',
    pluginSlug: 'pj-email-templates',
    overview: `PJ Email Templates provides a visual email template designer for WordPress. Create professional, responsive email templates for WooCommerce, Contact Forms, and more.`,
    features: [
      'Visual Email Builder',
      'Pre-Built Templates',
      'Responsive Design',
      'WooCommerce Integration',
      'Merge Tags',
      'Email Testing',
      'Template Library',
      'Custom CSS',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Email Templates > Add New',
        'Design your template',
        'Assign to email type',
      ],
      requirements: [
        'WordPress 5.8 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Email Templates > Settings. Customize templates and assign to email types.`,
    troubleshooting: [
      {
        question: 'Templates not applying?',
        answer: 'Check template assignment and clear email cache.',
      },
    ],
    faq: [
      {
        question: 'Does it work with WooCommerce?',
        answer: 'Yes, fully compatible with all WooCommerce email types.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'New template designs',
          'Enhanced builder',
          'Improved compatibility',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Help.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-email-templates', description: 'Info.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'License.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'Terms.' },
      ],
    },
  },
  'pj-popup-master': {
    name: 'PJ Popup Master',
    type: 'plugin',
    version: '25.1.0',
    category: 'Marketing',
    description: 'Advanced popup builder with targeting options',
    pluginSlug: 'pj-popup-master',
    overview: `PJ Popup Master helps you create high-converting popups for WordPress. Features advanced targeting, exit intent, A/B testing, and extensive design options.`,
    features: [
      'Visual Popup Builder',
      'Exit Intent',
      'Advanced Targeting',
      'A/B Testing',
      'Animation Effects',
      'Mobile Responsive',
      'Analytics Integration',
      'Email Integration',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Popups > Add New',
        'Design your popup',
        'Set display rules',
      ],
      requirements: [
        'WordPress 5.8 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Popups > Settings. Create popups and set targeting rules.`,
    troubleshooting: [
      {
        question: 'Popup not displaying?',
        answer: 'Check display rules and ensure popup is published.',
      },
    ],
    faq: [
      {
        question: 'Can I test different designs?',
        answer: 'Yes, includes A/B testing to find the best performing popups.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'New targeting options',
          'Enhanced A/B testing',
          'Improved animations',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Support.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-popup-master', description: 'Features.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Check.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'License.' },
      ],
    },
  },
  'pj-slider': {
    name: 'PJ Slider',
    type: 'plugin',
    version: '25.1.0',
    category: 'Media',
    description: 'Responsive slider and carousel builder',
    pluginSlug: 'pj-slider',
    overview: `PJ Slider provides a powerful yet easy-to-use slider and carousel builder for WordPress. Create beautiful, responsive sliders with touch support and extensive customization options.`,
    features: [
      'Visual Slider Builder',
      'Multiple Layouts',
      'Touch & Swipe Support',
      'Responsive Design',
      'Animation Effects',
      'Video Support',
      'Lazy Loading',
      'SEO Optimized',
    ],
    installation: {
      steps: [
        'Download and install the plugin',
        'Activate from Plugins page',
        'Go to Sliders > Add New',
        'Add slides',
        'Add slider to page',
      ],
      requirements: [
        'WordPress 5.8 or higher',
        'PHP 7.4 or higher',
      ],
    },
    configuration: `Configure from Sliders > Settings. Customize appearance and behavior.`,
    troubleshooting: [
      {
        question: 'Slider not displaying?',
        answer: 'Check shortcode placement and ensure JavaScript is loaded.',
      },
    ],
    faq: [
      {
        question: 'Can I add videos to slides?',
        answer: 'Yes, supports YouTube, Vimeo, and self-hosted videos.',
      },
    ],
    changelog: [
      {
        version: '25.1.0',
        date: '2025-01-20',
        changes: [
          'New slider layouts',
          'Enhanced touch support',
          'Improved performance',
        ],
      },
    ],
    resources: {
      support: [
        { title: 'Support Center', href: '/support', description: 'Docs.' },
      ],
      product: [
        { title: 'Plugin Details', href: '/plugins/pj-slider', description: 'Details.' },
      ],
      tools: [
        { title: 'Verify License', href: '/verify-license', description: 'Verify.' },
      ],
      learning: [],
      policies: [
        { title: 'Licensing', href: '/licensing', description: 'Terms.' },
      ],
    },
  },
  'axiom': {
    name: 'Axiom',
    type: 'theme',
    version: '1.0.0',
    category: 'Theme',
    description: 'Premium multipurpose WordPress theme with unlimited possibilities',
    overview: `Axiom is a premium multipurpose WordPress theme that combines stunning design with powerful functionality. Built with modern web standards and optimized for performance, Axiom gives you unlimited possibilities to create any type of website.

Perfect for agencies, businesses, portfolios, blogs, and e-commerce stores.`,
    features: [
      'One-Click Demo Import',
      '50+ Pre-built Demos',
      'Drag & Drop Page Builder',
      'WooCommerce Ready',
      'Mega Menu',
      'Header & Footer Builder',
      'Custom Widgets',
      'Theme Options Panel',
      'SEO Optimized',
      'Speed Optimized',
      'Translation Ready',
      'Premium Support',
    ],
    installation: {
      steps: [
        'Download the theme zip file',
        'Go to Appearance > Themes > Add New',
        'Click "Upload Theme" and select the zip',
        'Click "Install Now" and "Activate"',
        'Install required plugins when prompted',
        'Import demo content (optional)',
        'Customize via Appearance > Customize',
      ],
      requirements: [
        'WordPress 6.0 or higher',
        'PHP 7.4 or higher',
        'MySQL 5.6 or higher',
        'Recommended: 512MB+ PHP memory',
      ],
    },
    configuration: `Customize your theme from Appearance > Customize. Access theme options, layout settings, typography, colors, and more. Use the Header & Footer builder to create custom layouts.`,
    troubleshooting: [
      {
        question: 'Demo content not importing?',
        answer: 'Ensure all required plugins are installed and activated. Check your PHP memory limit is at least 256MB.',
      },
      {
        question: 'Page builder not loading?',
        answer: 'Clear your browser cache and WordPress cache. Ensure JavaScript is enabled.',
      },
    ],
    faq: [
      {
        question: 'Can I use this with Elementor?',
        answer: 'Yes, Axiom is fully compatible with Elementor, WPBakery, and the WordPress block editor.',
      },
      {
        question: 'Is it compatible with WooCommerce?',
        answer: 'Absolutely! Axiom includes full WooCommerce integration with custom shop layouts.',
      },
      {
        question: 'Do you provide child theme?',
        answer: 'Yes, a child theme is included in the download package for safe customizations.',
      },
    ],
    changelog: [
      {
        version: '1.0.0',
        date: '2025-01-20',
        changes: [
          'Initial release',
          '50+ demo layouts',
          'Header & Footer builder',
          'WooCommerce integration',
          'Performance optimizations',
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const product = products[params.slug as keyof typeof products];

  if (!product) {
    return {
      title: 'Documentation Not Found',
    };
  }

  return {
    title: `${product.name} - Documentation | PrintJones`,
    description: product.description,
  };
}

export default function ProductDocPage({ params }: DocPageProps) {
  const product = products[params.slug as keyof typeof products];

  if (!product) {
    notFound();
  }

  const Icon = product.type === 'theme' ? Palette : Package;
  const iconColor = product.type === 'theme' ? 'text-purple-600' : 'text-blue-600';
  const iconBgColor = product.type === 'theme' ? 'bg-purple-100' : 'bg-blue-100';

  const pluginDetailSlug = (product && 'pluginSlug' in product && (product as any).pluginSlug)
    ? (product as any).pluginSlug
    : params.slug;

  // Apply sidebar layout to all documentation pages
  const isWpBakeryDoc = true; // Use sidebar navigation for all docs
  const triggerClass = isWpBakeryDoc
    ? 'justify-start w-full gap-3 rounded-none px-3 py-2 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 hover:bg-gray-100'
    : '';

  // Check if product has special tabs (Installation, Core, Elements) - only for certain products
  const hasInstallationTab = params.slug === 'essential-addons-for-wpbakery';
  const hasCoreTab = params.slug === 'essential-addons-for-wpbakery';
  const hasElementsTab = params.slug === 'essential-addons-for-wpbakery';

  const tabTriggers = (
    <>
      <TabsTrigger value="overview" className={triggerClass}>
        <BookOpen className="h-4 w-4 mr-2" />
        Overview
      </TabsTrigger>
      {hasInstallationTab && (
        <TabsTrigger value="installation" className={triggerClass}>
          <Download className="h-4 w-4 mr-2" />
          Installation
        </TabsTrigger>
      )}
      {hasCoreTab && (
        <TabsTrigger value="core" className={triggerClass}>
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Core
        </TabsTrigger>
      )}
      {hasElementsTab && (
        <TabsTrigger value="elements" className={triggerClass}>
          <Puzzle className="h-4 w-4 mr-2" />
          Elements
        </TabsTrigger>
      )}
      <TabsTrigger value="configuration" className={triggerClass}>
        <Settings className="h-4 w-4 mr-2" />
        Configuration
      </TabsTrigger>
      <TabsTrigger value="advanced" className={triggerClass}>
        <Wrench className="h-4 w-4 mr-2" />
        Advanced
      </TabsTrigger>
      <TabsTrigger value="troubleshooting" className={triggerClass}>
        <AlertCircle className="h-4 w-4 mr-2" />
        Troubleshooting
      </TabsTrigger>
      <TabsTrigger value="faq" className={triggerClass}>
        <HelpCircle className="h-4 w-4 mr-2" />
        FAQ
      </TabsTrigger>
      <TabsTrigger value="changelog" className={triggerClass}>
        <FileText className="h-4 w-4 mr-2" />
        Changelog
      </TabsTrigger>
      {(product as any).tutorials && (
        <TabsTrigger value="tutorials" className={triggerClass}>
          <PlayCircle className="h-4 w-4 mr-2" />
          Tutorials
        </TabsTrigger>
      )}
      {'developerDocs' in product && (product as any).developerDocs && (
        <TabsTrigger value="developer" className={triggerClass}>
          <Code2 className="h-4 w-4 mr-2" />
          Developer
        </TabsTrigger>
      )}
      {(product as any).resources && (
        <TabsTrigger value="resources" className={triggerClass}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Resources
        </TabsTrigger>
      )}
      {isWpBakeryDoc && (
        <TabsTrigger value="community" className={triggerClass}>
          <Users className="h-4 w-4 mr-2" />
          Community
        </TabsTrigger>
      )}
    </>
  );

  return (
    <div className="px-4 lg:px-8 py-12">
      <div className={isWpBakeryDoc ? 'w-full lg:pl-64' : 'w-full'}>
        <div className="mb-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Documentation
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
            <div className={`h-16 w-16 rounded-xl ${iconBgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-8 w-8 ${iconColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-black">{product.name}</h1>
                <Badge variant="outline">v{product.version}</Badge>
              </div>
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="secondary" className={product.type === 'theme' ? 'bg-purple-100 text-purple-700' : ''}>
                  {product.type === 'theme' ? 'WordPress Theme' : 'WordPress Plugin'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          {isWpBakeryDoc ? (
            <>
              <div className="lg:hidden mb-6">
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="px-4 py-3 cursor-pointer font-medium">Sections</summary>
                  <div className="px-2 pb-3">
                    <TabsList className="flex flex-col gap-1 bg-transparent p-0">{tabTriggers}</TabsList>
                  </div>
                </details>
              </div>
              <aside className="hidden lg:block">
                <div className="fixed left-0 top-16 z-30 w-64 h-[calc(100vh-4rem)] bg-gray-50 border-r overflow-y-auto overscroll-contain">
                  <div className="p-4 pt-6">
                    <TabsList className="flex flex-col gap-1 bg-transparent p-0">{tabTriggers}</TabsList>
                  </div>
                </div>
              </aside>
            </>
          ) : (
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-12 mb-8">{tabTriggers}</TabsList>
          )}

          <div className={isWpBakeryDoc ? "lg:ml-64" : ""}>
            <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.overview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {'quickStart' in product && product.quickStart && (
              <Card>
                <CardHeader>
                  <CardTitle>{product.quickStart.title}</CardTitle>
                  <CardDescription>{product.quickStart.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.quickStart.steps.map((step: any, index: number) => {
                      const iconMap: { [key: string]: any } = {
                        download: Download,
                        settings: Settings,
                        edit: Edit,
                        rocket: Rocket,
                      };
                      const IconComponent = iconMap[step.icon] || Download;
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {'keyBenefits' in product && product.keyBenefits && (
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose {product.name}?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.keyBenefits.map((benefit: any, index: number) => {
                      const iconMap: { [key: string]: any } = {
                        zap: Zap,
                        'trending-up': TrendingUp,
                        gauge: Gauge,
                        layers: Layers,
                      };
                      const IconComponent = iconMap[benefit.icon] || Zap;
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            {'resources' in product && (product as any).resources && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Support & Contact</CardTitle>
                    <CardDescription>Get help fast from our team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(product as any).resources.support.map((r: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <Link href={r.href} className="text-blue-700 hover:underline inline-flex items-center gap-1">
                              {r.title}
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                            <div className="text-sm text-gray-600">{r.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product & Tools</CardTitle>
                    <CardDescription>Useful links for your workflow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[(product as any).resources.product[0], ...(product as any).resources.tools].map((r: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <Package className="h-5 w-5 text-emerald-600 mt-0.5" />
                          <div>
                            <Link href={r.href} className="text-blue-700 hover:underline inline-flex items-center gap-1">
                              {r.title}
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                            <div className="text-sm text-gray-600">{r.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning</CardTitle>
                    <CardDescription>Guides for WPBakery and WordPress development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(product as any).resources.learning.map((r: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <BookOpen className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div>
                            <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline inline-flex items-center gap-1">
                              {r.title}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <div className="text-sm text-gray-600">{r.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Policies</CardTitle>
                    <CardDescription>Important terms and legal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(product as any).resources.policies.map((r: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-gray-800 mt-0.5" />
                          <div>
                            <Link href={r.href} className="text-blue-700 hover:underline inline-flex items-center gap-1">
                              {r.title}
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                            <div className="text-sm text-gray-600">{r.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            {'tutorials' in product && (product as any).tutorials?.useCases && (
              <Card>
                <CardHeader>
                  <CardTitle>Popular Use Cases</CardTitle>
                  <CardDescription>Battle‑tested patterns to build faster</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(product as any).tutorials.useCases.map((uc: any, idx: number) => (
                      <div key={idx} className="p-5 border rounded-lg bg-white">
                        <h3 className="font-semibold text-gray-900 mb-1">{uc.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{uc.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {uc.elements.map((el: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">{el}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {'tutorials' in product && (product as any).tutorials?.guides && (
              <Card>
                <CardHeader>
                  <CardTitle>Step‑by‑Step Tutorials</CardTitle>
                  <CardDescription>Learn by building real sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {(product as any).tutorials.guides.map((g: any, idx: number) => (
                      <div key={idx} className="p-5 border rounded-lg bg-white">
                        <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-600">
                          <h3 className="font-semibold text-gray-900 mr-2">{g.title}</h3>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            <span>{g.level}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{g.duration}</span>
                          </div>
                        </div>
                        <ol className="space-y-3">
                          {g.steps.map((s: string, i: number) => (
                            <li key={i} className="flex gap-4">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                {i + 1}
                              </div>
                              <p className="text-gray-700 pt-1">{s}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="installation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation Steps</CardTitle>
                <CardDescription>Follow these steps to install {product.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {product.installation.steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.installation.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {'installationMethods' in product && product.installationMethods && (
              <Card>
                <CardHeader>
                  <CardTitle>Installation Methods</CardTitle>
                  <CardDescription>Choose the method that fits your workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {product.installationMethods.map((method: any, index: number) => {
                      const iconMap: { [key: string]: any } = {
                        upload: Upload,
                        server: Server,
                        terminal: Terminal,
                      };
                      const IconComponent = iconMap[method.icon] || Upload;
                      return (
                        <div key={index} className="p-5 border rounded-lg bg-white">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          </div>
                          <ul className="space-y-2 list-disc list-inside text-gray-700">
                            {method.steps.map((s: string, i: number) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {'license' in product && product.license && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{product.license.title}</CardTitle>
                      <CardDescription>Activate your license to receive updates and support</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {product.license.steps.map((step: string, index: number) => (
                      <li key={index} className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {'setupWizard' in product && product.setupWizard && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Wand2 className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{product.setupWizard.title}</CardTitle>
                      <CardDescription>We’ll guide you through recommended configuration</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.setupWizard.steps.map((s: string, i: number) => (
                      <div key={i} className="flex gap-4 p-4 border rounded-lg bg-white">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
                          {i + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{s}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="core" className="space-y-6">
            {'core' in product && (product as any).core?.dashboard && (
              <Card>
                <CardHeader>
                  <CardTitle>{(product as any).core.dashboard.title}</CardTitle>
                  <CardDescription>{(product as any).core.dashboard.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(product as any).core.dashboard.features.map((feat: any, idx: number) => {
                      const iconMap: { [key: string]: any } = {
                        dashboard: LayoutDashboard,
                        'list-checks': ListChecks,
                        'bar-chart-3': BarChart3,
                        layers: Layers,
                        puzzle: Puzzle,
                      };
                      const IconComponent = iconMap[feat.icon] || LayoutDashboard;
                      return (
                        <div key={idx} className="p-5 border rounded-lg bg-white flex gap-4">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{feat.title}</h3>
                            <p className="text-sm text-gray-600">{feat.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {'core' in product && (product as any).core?.editor && (
              <Card>
                <CardHeader>
                  <CardTitle>{(product as any).core.editor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {(product as any).core.editor.steps.map((s: any, i: number) => (
                      <li key={i} className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{s.title}</h4>
                          <p className="text-sm text-gray-600">{s.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {'core' in product && (product as any).core?.templates && (
              <Card>
                <CardHeader>
                  <CardTitle>{(product as any).core.templates.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(product as any).core.templates.bullets.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {'core' in product && (product as any).core?.analytics && (
              <Card>
                <CardHeader>
                  <CardTitle>{(product as any).core.analytics.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(product as any).core.analytics.bullets.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="elements" className="space-y-6">
            {'elementsMeta' in product && (product as any).elementsMeta && (
              <Card>
                <CardHeader>
                  <CardTitle>Element Library Overview</CardTitle>
                  <CardDescription>Comprehensive collection of professionally designed elements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg bg-white text-center">
                      <div className="text-3xl font-bold text-black">{(product as any).elementsMeta.total}+</div>
                      <div className="text-gray-600">Total Elements</div>
                    </div>
                    <div className="p-4 border rounded-lg bg-white text-center">
                      <div className="text-3xl font-bold text-black">{(product as any).elementsMeta.wooCommerce}+</div>
                      <div className="text-gray-600">WooCommerce</div>
                    </div>
                    <div className="p-4 border rounded-lg bg-white text-center">
                      <div className="text-3xl font-bold text-black">{(product as any).elementsMeta.extensions}</div>
                      <div className="text-gray-600">Extensions</div>
                    </div>
                    <div className="p-4 border rounded-lg bg-white text-center">
                      <div className="text-3xl font-bold text-black">{(product as any).elementsMeta.templates}+</div>
                      <div className="text-gray-600">Templates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {'elementCategories' in product && (product as any).elementCategories && (
              <div className="space-y-6">
                {(product as any).elementCategories.map((cat: any, idx: number) => (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{cat.name}</CardTitle>
                          <CardDescription>{cat.description}</CardDescription>
                        </div>
                        {typeof cat.count === 'number' && (
                          <Badge variant="secondary">{cat.count}+ elements</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {cat.examples.map((ex: any, i: number) => (
                          <div key={i} className="p-4 border rounded-lg bg-white">
                            <h4 className="font-semibold text-gray-900 mb-1">{ex.name}</h4>
                            <p className="text-sm text-gray-600">{ex.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Guide</CardTitle>
                <CardDescription>How to configure {product.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.configuration}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">Need More Help?</h3>
                    <p className="text-gray-700 mb-3">
                      Check out our video tutorials and detailed guides for step-by-step configuration instructions.
                    </p>
                    <Link href="/support">
                      <Button variant="outline" size="sm">
                        Contact Support
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {'settingsSections' in product && (product as any).settingsSections && (
              <Card>
                <CardHeader>
                  <CardTitle>Settings Overview</CardTitle>
                  <CardDescription>Key areas you can configure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(product as any).settingsSections.map((sec: any, idx: number) => {
                      const iconMap: { [key: string]: any } = {
                        sliders: SlidersHorizontal,
                        'list-checks': ListChecks,
                        puzzle: Puzzle,
                        gauge: Gauge,
                        layers: Layers,
                        plug: Plug,
                      };
                      const IconComponent = iconMap[sec.icon] || SlidersHorizontal;
                      return (
                        <div key={idx} className="p-5 border rounded-lg bg-white">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <h3 className="font-semibold text-gray-900">{sec.title}</h3>
                          </div>
                          <ul className="space-y-2 list-disc list-inside text-gray-700">
                            {sec.items.map((it: string, i: number) => (
                              <li key={i}>{it}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            {'advanced' in product && (product as any).advanced && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Optimization</CardTitle>
                    <CardDescription>Keep pages fast with smart loading and tuning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(product as any).advanced.performance.bullets.map((b: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <Gauge className="h-5 w-5 text-blue-600 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Architecture</CardTitle>
                    <CardDescription>Scalable usage tracking — stored locally in your database</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(product as any).advanced.analytics.bullets.map((b: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <Database className="h-5 w-5 text-green-600 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Background Tasks</CardTitle>
                    <CardDescription>Non‑blocking processing for a smooth admin experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(product as any).advanced.backgroundTasks.bullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Activity className="h-5 w-5 text-purple-600 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Multisite & Network Activation</CardTitle>
                    <CardDescription>Works across networks with clean activation and uninstall</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(product as any).advanced.multisite.bullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Network className="h-5 w-5 text-amber-600 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Developer Hooks & Extensibility</CardTitle>
                    <CardDescription>Integrate with WPBakery API and extend elements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(product as any).advanced.developer.bullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Code2 className="h-5 w-5 text-gray-800 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security & Standards</CardTitle>
                    <CardDescription>Built to WordPress Coding Standards with privacy by design</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(product as any).advanced.security.bullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-emerald-600 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="developer" className="space-y-6">
            {'developerDocs' in product && (product as any).developerDocs && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Constants & Paths</CardTitle>
                    <CardDescription>Essential constants to use when extending the plugin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(product as any).developerDocs.constants.map((c: any, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Code2 className="h-5 w-5 text-gray-800 mt-0.5" />
                          <span className="text-gray-700"><span className="font-mono font-semibold">{c.name}</span> — {c.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions & AJAX</CardTitle>
                    <CardDescription>Hooks you can use to integrate and automate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Actions</h4>
                        <ul className="space-y-2">
                          {(product as any).developerDocs.actions.map((a: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                              <span className="text-gray-700">{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">AJAX</h4>
                        <ul className="space-y-2">
                          {(product as any).developerDocs.ajax.map((aj: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <Activity className="h-5 w-5 text-green-600 mt-0.5" />
                              <span className="text-gray-700">{aj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Options, Transients & Database</CardTitle>
                    <CardDescription>Storage schema for settings, caches, and analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Options</h4>
                        <ul className="space-y-2">
                          {(product as any).developerDocs.storage.options.map((o: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <Database className="h-5 w-5 text-emerald-600 mt-0.5" />
                              <span className="text-gray-700">{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Transients</h4>
                        <ul className="space-y-2">
                          {(product as any).developerDocs.storage.transients.map((t: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <Database className="h-5 w-5 text-amber-600 mt-0.5" />
                              <span className="text-gray-700">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Database</h4>
                        <ul className="space-y-2">
                          {(product as any).developerDocs.storage.database.map((d: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <Database className="h-5 w-5 text-purple-600 mt-0.5" />
                              <span className="text-gray-700">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Code Examples</CardTitle>
                    <CardDescription>Copy‑paste snippets for common integrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {(product as any).developerDocs.examples.map((ex: any, i: number) => (
                        <div key={i} className="p-4 border rounded-lg bg-white">
                          <h4 className="font-semibold text-gray-900 mb-2">{ex.title}</h4>
                          <pre className="overflow-auto text-xs bg-gray-50 p-3 rounded"><code>{ex.code}</code></pre>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues & Solutions</CardTitle>
                <CardDescription>Quick fixes for common problems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {product.troubleshooting.map((item, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-6" />}
                    <div>
                      <h3 className="font-semibold text-black mb-2 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        {item.question}
                      </h3>
                      <p className="text-gray-700 ml-7">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-2">Still Having Issues?</h3>
                    <p className="text-gray-700 mb-3">
                      If you&apos;re still experiencing problems, our support team is here to help. We typically respond within 24 hours.
                    </p>
                    <Link href="/support">
                      <Button size="sm">Get Support</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {product.faq.map((item, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-6" />}
                    <div>
                      <h3 className="font-semibold text-black mb-2 flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        {item.question}
                      </h3>
                      <p className="text-gray-700 ml-7">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changelog" className="space-y-6">
            {product.changelog.map((version, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Version {version.version}</CardTitle>
                    <Badge variant="outline">{version.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {version.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-gray-700">{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {isWpBakeryDoc && (
            <TabsContent value="community">
              <CommunityForum />
            </TabsContent>
          )}
          </div>
        </Tabs>

        <Card className="mt-8 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-black mb-3">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Download {product.name} and start building amazing websites today. Need help? Our support team is always ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/plugins/${pluginDetailSlug}`}>
                  <Button size="lg">
                    View Plugin Details
                  </Button>
                </Link>
                <Link href="/support">
                  <Button size="lg" variant="outline">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
