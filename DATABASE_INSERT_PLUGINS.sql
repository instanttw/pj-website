-- SQL Script to Insert All 8 PrintJones Plugins
-- Run this in your Supabase SQL Editor

-- Note: Update category_id values based on your categories table
-- Example categories: 1=Page Builders, 2=E-commerce, 3=Accessibility, 4=Media, 5=Utility

-- 1. All-in-One Addons for Elementor
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'All-in-One Addons for Elementor',
  'aioa-elementor',
  'Supercharge Your Elementor Website with 100+ Premium Widgets',
  'The most comprehensive collection of Elementor widgets and extensions. Build stunning websites faster with our premium addons designed for speed and flexibility.',
  49.00,
  4.9,
  1250,
  50000,
  true,
  true,
  1, -- Update with your Page Builders category ID
  '1.0.0',
  '6.4+',
  NOW(),
  '["100+ Premium Widgets", "Responsive Design", "Regular Updates", "Premium Support", "Lightweight Code", "SEO Optimized", "Translation Ready", "Developer Friendly"]'::jsonb,
  'https://printjones.com/demos/aioa-elementor'
);

-- 2. Essential Addons for WPBakery Page Builder
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'Essential Addons for WPBakery Page Builder',
  'eaf-wpbakery',
  'Essential Elements & Extensions for WPBakery',
  'Extend WPBakery Page Builder with powerful elements and addons. Create professional websites with ease using our premium extensions.',
  49.00,
  4.7,
  980,
  35000,
  true,
  true,
  1, -- Update with your Page Builders category ID
  '1.0.0',
  '6.4+',
  NOW(),
  '["Premium Elements", "Drag & Drop Builder", "Responsive Design", "Custom Styling", "Fast Performance", "Regular Updates", "Documentation Included", "Priority Support"]'::jsonb,
  'https://printjones.com/demos/eaf-wpbakery'
);

-- 3. PJ Product Filter
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'PJ Product Filter',
  'pj-product-filter',
  'Intelligent Filters. Maximum Conversions. Zero Compromise.',
  'The most intelligent and comprehensive filtering solution for WordPress and WooCommerce. Features AI-powered recommendations, advanced analytics, visual search, and SEO optimization.',
  79.00,
  4.9,
  2847,
  127000,
  true,
  true,
  2, -- Update with your E-commerce category ID
  '25.0.0',
  '6.0+',
  NOW(),
  '["AI-Powered Filtering", "Advanced Analytics", "Visual Search", "Voice Search", "SEO Optimized", "AJAX Filtering", "Unlimited Filters", "Mobile Responsive", "Translation Ready", "Developer Friendly"]'::jsonb,
  'https://printjones.com/demos/pj-product-filter'
);

-- 4. PJ Media Library
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'PJ Media Library',
  'pj-media-library',
  'The World''s Most Intelligent Media & Document Management System',
  'Revolutionize media and document management with AI-powered organization, smart auto-tagging, visual search, real-time collaboration, and enterprise-ready infrastructure.',
  79.00,
  4.9,
  1567,
  89000,
  true,
  true,
  4, -- Update with your Media category ID
  '25.0.0',
  '6.0+',
  NOW(),
  '["AI-Powered Organization", "Unlimited Folders", "Cloud Integration", "Smart Collections", "Advanced Search", "Real-time Collaboration", "Version Control", "Image Optimization", "CDN Support", "API Access"]'::jsonb,
  'https://printjones.com/demos/pj-media-library'
);

-- 5. PJ Accessibility
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'PJ Accessibility',
  'pj-accessibility',
  'The World''s Most Powerful WordPress Accessibility Solution',
  'Make your WordPress site accessible to everyone with AI-powered features, multiple accessibility profiles, advanced text-to-speech, voice navigation, and WCAG 2.2 AAA compliance.',
  69.00,
  4.9,
  2145,
  156000,
  true,
  true,
  3, -- Update with your Accessibility category ID
  '25.0.0',
  '6.0+',
  NOW(),
  '["8 Accessibility Profiles", "AI-Powered Features", "Text-to-Speech (50+ Languages)", "Voice Navigation", "Screen Reader Optimization", "WCAG 2.2 AAA Compliant", "Keyboard Navigation", "Reading Tools", "Color Adjustments", "Analytics & Reports"]'::jsonb,
  'https://printjones.com/demos/pj-accessibility'
);

-- 6. PJ Ajax Store Locator
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'PJ Ajax Store Locator',
  'pj-store-finder',
  'The World''s Most Intelligent Store Locator Solution',
  'Create a powerful store/dealer locator with AI-powered search, multiple map providers, advanced filtering, real-time directions, and enterprise analytics.',
  69.00,
  4.8,
  1892,
  78000,
  true,
  true,
  5, -- Update with your Utility category ID
  '25.0.0',
  '6.0+',
  NOW(),
  '["Google Maps Integration", "AI-Powered Search", "Advanced Filtering", "Custom Markers (150+)", "Responsive Design", "Import/Export", "Analytics Dashboard", "Multi-language Support", "SEO Optimized", "Developer Friendly"]'::jsonb,
  'https://printjones.com/demos/pj-store-finder'
);

-- 7. PJ Multicurrency
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'PJ Multicurrency',
  'pj-multicurrency',
  'Next-Gen Multi-Currency Platform for WooCommerce',
  'Enterprise-grade multi-currency solution with advanced pricing rules, AI-powered recommendations, real-time exchange rates, and seamless checkout integration.',
  89.00,
  4.8,
  1654,
  92000,
  true,
  true,
  2, -- Update with your E-commerce category ID
  '25.0.0',
  '6.0+',
  NOW(),
  '["Unlimited Currencies", "Real-time Exchange Rates", "Advanced Pricing Rules", "Geo-targeting", "Currency Switcher", "Analytics & Reports", "Payment Gateway Support", "SEO Friendly", "WPML Compatible", "Developer API"]'::jsonb,
  'https://printjones.com/demos/pj-multicurrency'
);

-- 8. PJ Product Designer
INSERT INTO plugins (
  name, 
  slug, 
  tagline, 
  description, 
  price, 
  rating, 
  review_count, 
  download_count, 
  is_featured, 
  is_active, 
  category_id, 
  version,
  wordpress_version,
  last_updated,
  features,
  demo_url
) VALUES (
  'PJ Product Designer',
  'pj-product-designer',
  'Next-Generation Product Customization Platform',
  'Revolutionary product customization with AI-powered design tools, real-time collaboration, professional-grade features, and WebGL rendering for creating custom products.',
  99.00,
  4.9,
  1423,
  67000,
  true,
  true,
  2, -- Update with your E-commerce category ID
  '25.0.0',
  '6.0+',
  NOW(),
  '["Real-time Collaboration", "AI Design Tools", "Vector Editor", "Advanced Typography", "Multi-format Export", "Print-ready Files", "Mobile Responsive", "WooCommerce Integration", "Template Marketplace", "Cloud Storage"]'::jsonb,
  'https://printjones.com/demos/pj-product-designer'
);

-- Verify insertion
SELECT name, slug, price, rating, is_featured 
FROM plugins 
WHERE is_featured = true 
ORDER BY name;
