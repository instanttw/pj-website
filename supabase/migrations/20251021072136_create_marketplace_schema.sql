/*
  # WordPress Plugin Marketplace Database Schema

  ## Overview
  This migration creates the complete database structure for a WordPress plugin marketplace
  including plugins, categories, licenses, reviews, support tickets, and user management.

  ## New Tables

  ### 1. `categories`
  - `id` (uuid, primary key)
  - `name` (text, unique) - Category name
  - `slug` (text, unique) - URL-friendly slug
  - `description` (text) - Category description
  - `icon` (text) - Lucide icon name
  - `created_at` (timestamptz)

  ### 2. `plugins`
  - `id` (uuid, primary key)
  - `name` (text) - Plugin name
  - `slug` (text, unique) - URL-friendly slug
  - `tagline` (text) - Short one-line description
  - `description` (text) - Full description
  - `icon_url` (text) - Plugin icon/logo URL
  - `category_id` (uuid) - Foreign key to categories
  - `price` (decimal) - Base price (0 for free)
  - `version` (text) - Current version
  - `wordpress_compatibility` (text) - e.g., "5.8 - 6.4"
  - `download_count` (integer) - Total downloads
  - `active_installations` (integer) - Active installations
  - `rating` (decimal) - Average rating (0-5)
  - `review_count` (integer) - Total reviews
  - `last_updated` (timestamptz) - Last update date
  - `demo_url` (text) - Demo link
  - `documentation_url` (text) - Documentation link
  - `features` (jsonb) - Array of features
  - `screenshots` (jsonb) - Array of screenshot URLs
  - `changelog` (jsonb) - Version history
  - `faq` (jsonb) - FAQ items
  - `is_featured` (boolean) - Featured plugin
  - `is_active` (boolean) - Active/published status
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `plugin_pricing`
  - `id` (uuid, primary key)
  - `plugin_id` (uuid) - Foreign key to plugins
  - `name` (text) - Plan name (Personal, Business, Agency)
  - `price` (decimal) - Plan price
  - `billing_period` (text) - annual, lifetime, monthly
  - `features` (jsonb) - Array of included features
  - `site_limit` (integer) - Number of sites allowed
  - `is_popular` (boolean) - Highlight as most popular
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)

  ### 4. `reviews`
  - `id` (uuid, primary key)
  - `plugin_id` (uuid) - Foreign key to plugins
  - `user_id` (uuid) - Foreign key to auth.users
  - `rating` (integer) - 1-5 stars
  - `title` (text) - Review title
  - `content` (text) - Review content
  - `is_verified_purchase` (boolean)
  - `helpful_count` (integer) - Helpful votes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `licenses`
  - `id` (uuid, primary key)
  - `license_key` (text, unique) - Generated license key
  - `plugin_id` (uuid) - Foreign key to plugins
  - `pricing_id` (uuid) - Foreign key to plugin_pricing
  - `user_id` (uuid) - Foreign key to auth.users
  - `status` (text) - active, inactive, expired
  - `purchase_date` (timestamptz)
  - `expiration_date` (timestamptz) - NULL for lifetime
  - `activations_used` (integer) - Current activations
  - `activations_limit` (integer) - Max activations
  - `activated_domains` (jsonb) - Array of domain objects
  - `order_id` (text) - Payment order ID
  - `created_at` (timestamptz)

  ### 6. `support_tickets`
  - `id` (uuid, primary key)
  - `ticket_number` (text, unique) - Human-readable ticket number
  - `user_id` (uuid) - Foreign key to auth.users
  - `plugin_id` (uuid) - Foreign key to plugins (optional)
  - `license_id` (uuid) - Foreign key to licenses (optional)
  - `subject` (text) - Ticket subject
  - `category` (text) - installation, bug, feature, billing, other
  - `priority` (text) - low, normal, high
  - `status` (text) - open, in_progress, resolved, closed
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `ticket_messages`
  - `id` (uuid, primary key)
  - `ticket_id` (uuid) - Foreign key to support_tickets
  - `user_id` (uuid) - Foreign key to auth.users
  - `message` (text) - Message content
  - `attachments` (jsonb) - Array of attachment URLs
  - `is_staff_reply` (boolean) - Staff vs customer message
  - `created_at` (timestamptz)

  ### 8. `documentation`
  - `id` (uuid, primary key)
  - `plugin_id` (uuid) - Foreign key to plugins (NULL for general docs)
  - `title` (text) - Article title
  - `slug` (text) - URL slug
  - `content` (text) - Markdown content
  - `category` (text) - getting_started, installation, configuration, etc.
  - `sort_order` (integer) - Display order
  - `parent_id` (uuid) - For nested docs
  - `is_published` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Add policies for authenticated and public access
  - Restrict sensitive operations to authenticated users
  - Protect license keys and user data

  ## Notes
  - All monetary values stored as DECIMAL(10,2)
  - JSONB used for flexible arrays and objects
  - Timestamps use timestamptz for timezone support
  - Cascading deletes configured where appropriate
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text DEFAULT '',
  icon text DEFAULT 'package',
  created_at timestamptz DEFAULT now()
);

-- Create plugins table
CREATE TABLE IF NOT EXISTS plugins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  tagline text DEFAULT '',
  description text DEFAULT '',
  icon_url text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price decimal(10,2) DEFAULT 0,
  version text DEFAULT '1.0.0',
  wordpress_compatibility text DEFAULT '5.0+',
  download_count integer DEFAULT 0,
  active_installations integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  demo_url text DEFAULT '',
  documentation_url text DEFAULT '',
  features jsonb DEFAULT '[]'::jsonb,
  screenshots jsonb DEFAULT '[]'::jsonb,
  changelog jsonb DEFAULT '[]'::jsonb,
  faq jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create plugin_pricing table
CREATE TABLE IF NOT EXISTS plugin_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plugin_id uuid REFERENCES plugins(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  billing_period text DEFAULT 'annual',
  features jsonb DEFAULT '[]'::jsonb,
  site_limit integer DEFAULT 1,
  is_popular boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plugin_id uuid REFERENCES plugins(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text DEFAULT '',
  content text DEFAULT '',
  is_verified_purchase boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(plugin_id, user_id)
);

-- Create licenses table
CREATE TABLE IF NOT EXISTS licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key text NOT NULL UNIQUE,
  plugin_id uuid REFERENCES plugins(id) ON DELETE CASCADE NOT NULL,
  pricing_id uuid REFERENCES plugin_pricing(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'active',
  purchase_date timestamptz DEFAULT now(),
  expiration_date timestamptz,
  activations_used integer DEFAULT 0,
  activations_limit integer DEFAULT 1,
  activated_domains jsonb DEFAULT '[]'::jsonb,
  order_id text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plugin_id uuid REFERENCES plugins(id) ON DELETE SET NULL,
  license_id uuid REFERENCES licenses(id) ON DELETE SET NULL,
  subject text NOT NULL,
  category text DEFAULT 'other',
  priority text DEFAULT 'normal',
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ticket_messages table
CREATE TABLE IF NOT EXISTS ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  attachments jsonb DEFAULT '[]'::jsonb,
  is_staff_reply boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create documentation table
CREATE TABLE IF NOT EXISTS documentation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plugin_id uuid REFERENCES plugins(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text NOT NULL,
  content text DEFAULT '',
  category text DEFAULT 'general',
  sort_order integer DEFAULT 0,
  parent_id uuid REFERENCES documentation(id) ON DELETE CASCADE,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(plugin_id, slug)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_plugins_slug ON plugins(slug);
CREATE INDEX IF NOT EXISTS idx_plugins_category ON plugins(category_id);
CREATE INDEX IF NOT EXISTS idx_plugins_featured ON plugins(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_reviews_plugin ON reviews(plugin_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_user ON licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_docs_plugin ON documentation(plugin_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE plugin_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentation ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for plugins (public read active plugins)
CREATE POLICY "Anyone can view active plugins"
  ON plugins FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for plugin_pricing (public read)
CREATE POLICY "Anyone can view plugin pricing"
  ON plugin_pricing FOR SELECT
  TO public
  USING (true);

-- RLS Policies for reviews (public read, authenticated write own)
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for licenses (users can only see their own)
CREATE POLICY "Users can view own licenses"
  ON licenses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own licenses"
  ON licenses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for support_tickets (users can only see their own)
CREATE POLICY "Users can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tickets"
  ON support_tickets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for ticket_messages (users can see messages for their tickets)
CREATE POLICY "Users can view messages for own tickets"
  ON ticket_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = ticket_messages.ticket_id
      AND support_tickets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages for own tickets"
  ON ticket_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = ticket_messages.ticket_id
      AND support_tickets.user_id = auth.uid()
    )
  );

-- RLS Policies for documentation (public read)
CREATE POLICY "Anyone can view published documentation"
  ON documentation FOR SELECT
  TO public
  USING (is_published = true);