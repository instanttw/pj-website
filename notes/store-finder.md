# 🚀 PJ Store Finder - WordPress Plugin Specification

## **Plugin Overview**

**Name:** PJ Store Finder  
**Plugin URL:** https://printjones.com/store-finder  
**Version:** 25.0.0  
**Type:** Enterprise WordPress Store Locator Plugin  
**Developer:** PrintJones  
**Developer URL:** https://printjones.com  
**License:** GPL v3 / Commercial Dual License  
**PHP Requirements:** 8.1+ (Primary), 7.4+ (Compatibility Mode)  
**WordPress:** 6.0+ (Tested up to latest)  
**Tagline:** *"The World's Most Intelligent Store Locator Solution"*

---

## 🎯 **Core Philosophy**

PJ Store Finder is built on the foundation of modern store locator solutions but extends far beyond with:
- **AI-Powered Intelligence** - Smart search, recommendations, and automation
- **Enterprise-Grade Features** - Advanced analytics, white-labeling, multi-site support
- **Developer-First** - Extensive API, webhooks, and customization options
- **Future-Proof** - Built with modern architecture and cutting-edge technologies
- **Performance-Optimized** - Lightning-fast with advanced caching and CDN integration
- **User-Centric** - Intuitive UI/UX with mobile-first responsive design

---

## 🏗️ **WordPress Plugin Structure**

### **Main Plugin File**
- `pj-store-finder.php` - Main plugin bootstrap file
- Uses namespace: `PJStoreFinder\Core`
- Modern architecture with dependency injection
- PSR-4 autoloading
- Event-driven architecture
- Activation/Deactivation/Uninstall hooks
- Advanced cron job scheduling with custom intervals

### **Core Directories**

```
pj-store-finder/
├── assets/
│   ├── css/                    # Stylesheets (SCSS source + compiled)
│   ├── fonts/                  # Typography assets
│   ├── images/                 # Icons, markers, UI elements
│   ├── js/                     # Modern ES6+ JavaScript modules
│   └── media/                  # Default store images, placeholders
├── languages/                  # 50+ language translations
├── src/
│   ├── Admin/                  # Admin panel classes
│   ├── AI/                     # AI/ML integration classes
│   ├── Analytics/              # Advanced analytics engine
│   ├── API/                    # REST API & GraphQL endpoints
│   ├── Core/                   # Core plugin classes
│   ├── Frontend/               # Frontend rendering
│   ├── Integrations/           # Third-party integrations
│   ├── Maps/                   # Map provider integrations
│   └── Utils/                  # Utility classes
├── templates/                  # Template files
├── tests/                      # PHPUnit tests
├── vendor/                     # Composer dependencies
├── build/                      # Build artifacts
├── docs/                       # Documentation
├── changelog.md
├── composer.json
├── package.json
├── webpack.config.js
├── phpunit.xml
└── pj-store-finder.php
```

---

## 🎯 **Complete Features List**

### **1. Core Store Management Features**

#### **Store Data Fields**
- **Basic Information**
  - Store name/title
  - Store ID/SKU
  - Store description (short & long)
  - Store type (flagship, outlet, partner, franchise, etc.)
  - Store slug/permalink (SEO-friendly)
  - Featured store flag
  - Store priority/ordering

- **Location Data**
  - Street address
  - Address line 2 (suite, floor, building)
  - City
  - State/Province/Region
  - Postal/ZIP code
  - Country (240+ countries dropdown)
  - Latitude/Longitude (auto-geocoded)
  - Manual coordinate override
  - **NEW:** Plus code support
  - **NEW:** What3words integration
  - **NEW:** Multiple addresses per store (chain management)

- **Contact Information**
  - Primary phone number
  - Secondary phone number
  - Fax number
  - Email address
  - Website URL
  - Social media links (Facebook, Twitter, Instagram, LinkedIn)
  - **NEW:** WhatsApp number (click-to-chat)
  - **NEW:** Telegram handle
  - **NEW:** WeChat ID
  - **NEW:** Contact person name
  - **NEW:** Department-specific contacts

- **Operating Hours** *(Enhanced)*
  - Weekly schedule (JSON format)
  - Open/closed per day
  - Multiple time ranges per day (e.g., 9-12, 1-5)
  - 24-hour stores
  - By appointment only
  - **NEW:** Holiday hours manager
  - **NEW:** Special hours (seasonal, events)
  - **NEW:** Lunch break hours
  - **NEW:** Timezone per store (multi-timezone support)
  - **NEW:** "Open now" real-time indicator
  - **NEW:** "Closes soon" warning (30 min before closing)
  - **NEW:** "Next open time" display

- **Media & Branding**
  - Store logo/image
  - Featured image
  - Image gallery (unlimited photos)
  - **NEW:** Video embed (YouTube, Vimeo)
  - **NEW:** Virtual tour link (Google Street View, Matterport)
  - **NEW:** Store banner/header image
  - **NEW:** Brand colors per store
  - **NEW:** QR code generation (auto-generated)
  - **NEW:** Store brochure/PDF upload

- **Categories & Classification**
  - Hierarchical categories (parent/child, unlimited depth)
  - Multiple categories per store
  - Category icons (150+ built-in)
  - Category colors
  - Tag-based classification
  - **NEW:** Store types (flagship, outlet, partner, etc.)
  - **NEW:** Service types (pickup, delivery, in-store only)
  - **NEW:** Industry verticals
  - **NEW:** Custom taxonomies

- **Custom Fields & Attributes**
  - Text fields
  - Textarea fields
  - Dropdown selects
  - Checkboxes
  - Radio buttons
  - Rich text editor
  - Image upload
  - Gallery field
  - **NEW:** Date picker
  - **NEW:** Time picker
  - **NEW:** Color picker
  - **NEW:** File upload (PDF, documents)
  - **NEW:** URL field
  - **NEW:** Number field (with min/max)
  - **NEW:** Star rating field
  - **NEW:** Conditional fields (show/hide based on conditions)
  - **NEW:** Repeater fields (add multiple entries)

- **Store Status & Management**
  - Active/Inactive stores
  - Pending approval status
  - Draft mode
  - Permanently closed
  - Temporarily closed
  - **NEW:** Coming soon status
  - **NEW:** Under renovation
  - **NEW:** Limited services
  - **NEW:** Scheduled activation (publish date)
  - **NEW:** Scheduled deactivation
  - **NEW:** Store expiration date

- **Store Relationships**
  - Store branches (related locations)
  - **NEW:** Parent/child store relationships
  - **NEW:** Store networks/chains
  - **NEW:** Partner stores
  - **NEW:** Nearby stores auto-linking
  - **NEW:** Store transfers (inventory, requests)

- **Additional Store Features**
  - **NEW:** Store capacity (visitor limit)
  - **NEW:** Appointment booking integration
  - **NEW:** Inventory levels per store
  - **NEW:** Services offered per location
  - **NEW:** Amenities (parking, WiFi, wheelchair access, etc.)
  - **NEW:** Payment methods accepted
  - **NEW:** Languages spoken
  - **NEW:** Certifications/badges
  - **NEW:** Store size (sq ft/meters)
  - **NEW:** Parking information
  - **NEW:** Public transport access

---

### **2. Advanced Map Features**

#### **Map Providers** *(Multi-Provider Support)*
- **Google Maps API v3** (primary)
  - Full integration with Places API
  - Directions API
  - Distance Matrix API
  - Geocoding API
  - Street View integration
- **NEW:** Mapbox support (alternative provider)
- **NEW:** OpenStreetMap/Leaflet support (open-source option)
- **NEW:** Apple Maps (mobile fallback)
- **NEW:** Provider switching (per-device, per-region)

#### **Map Display & Controls** *(Enhanced)*
- Multiple map types (Roadmap, Satellite, Hybrid, Terrain)
- Street view integration (panoramic views)
- Zoom controls (customizable)
- Fullscreen mode
- Map center control
- Scroll wheel zoom toggle
- Touch controls (pinch zoom, pan)
- Map bounds auto-fit (smart framing)
- Recenter button
- **NEW:** 3D buildings toggle
- **NEW:** Indoor maps (shopping malls, airports)
- **NEW:** Heat map overlay (store density)
- **NEW:** Custom map layers (traffic, transit, bike paths)
- **NEW:** Drawing tools (measure distance, draw areas)

#### **Markers & Clustering** *(Enhanced)*
- Marker clustering (performance optimization for 1000+ stores)
- 150+ built-in marker icons
- Custom marker upload (SVG, PNG support)
- Category-based markers (auto-assign by category)
- Custom marker per store (override default)
- Active/selected marker state (visual feedback)
- Marker animation (bounce, drop, pulse)
- Marker labels/badges (text on markers)
- **NEW:** Custom marker colors (per category/store)
- **NEW:** SVG marker support with dynamic coloring
- **NEW:** Marker size customization (small, medium, large)
- **NEW:** Cluster customization (colors, shapes, numbers)
- **NEW:** Spiderfier (for overlapping markers)
- **NEW:** Marker filtering (show/hide by criteria)

#### **Map Styles** *(Enhanced)*
- 25+ pre-built map styles (light, dark, vintage, etc.)
- Custom map style editor (JSON-based)
- JSON style import/export
- Snazzy Maps integration (1000+ community styles)
- **NEW:** Style presets by industry (retail, healthcare, automotive, etc.)
- **NEW:** Night mode styles (automatic time-based switching)
- **NEW:** Grayscale/monochrome options
- **NEW:** Brand-matched styles (colors from your brand)

#### **Info Windows & Popups** *(Enhanced)*
- Custom info window templates (drag-and-drop builder)
- HTML content support (rich content)
- Store images in popup (gallery support)
- Directions link in popup (one-click navigation)
- Phone click-to-call
- Email click-to-email
- Website link
- Social media links
- **NEW:** Info window themes (10+ pre-built themes)
- **NEW:** Gallery/slider in popup (swipeable images)
- **NEW:** Popup positioning options (auto-adjust to viewport)
- **NEW:** Custom popup close button
- **NEW:** Popup animation effects (fade, slide, zoom)
- **NEW:** Popup content lazy loading (performance)

#### **Directions & Navigation** *(Enhanced)*
- Google Maps directions integration
- Apple Maps directions (iOS auto-detect)
- Multiple travel modes (driving, walking, transit, cycling)
- Open in Google Maps app (mobile deep-linking)
- Turn-by-turn directions preview
- **NEW:** Waze integration (traffic-aware routing)
- **NEW:** Multi-stop route planning (visit multiple stores)
- **NEW:** Route optimization (most efficient path)
- **NEW:** Alternative routes display (choose preferred route)
- **NEW:** Real-time traffic integration (ETA updates)
- **NEW:** Public transit schedules (live arrival times)

#### **Distance & Location** *(Enhanced)*
- Distance calculation (nearest to furthest)
- Unit selection (kilometers/miles/nautical miles)
- Radius-based filtering (circle search)
- Distance slider with range selector
- Geo-location detection (HTML5 browser API)
- IP-based location detection (fallback when GPS unavailable)
- Manual location input (address search)
- Current location button (one-click GPS)
- **NEW:** Location history (recent searches saved)
- **NEW:** Saved locations per user (favorites)
- **NEW:** Travel time estimation (driving/walking/transit)
- **NEW:** Traffic-aware routing (adjust for congestion)
- **NEW:** Bounding box search (rectangular area)
- **NEW:** Polygon search (custom drawn areas)
- **NEW:** Along route search (stores along a path)

---

### **3. Search & Filtering System** *(Massively Enhanced)*

#### **Search Methods**
- Address/location search (Google Places autocomplete)
- City search (with suggestions)
- Store name search (fuzzy matching)
- ZIP/postal code search
- Current location search (GPS-based)
- Search by coordinates (lat/long)
- **NEW:** Voice search (speech-to-text)
- **NEW:** Search suggestions/autocomplete (smart predictions)
- **NEW:** Search history (saved per user)
- **NEW:** Popular searches (trending locations)
- **NEW:** Fuzzy search (typo tolerance)
- **NEW:** Multi-language search (automatic language detection)

#### **Filtering Options** *(Enhanced)*
- Category filter (single/multi-select, hierarchical)
- Radius/distance filter (slider with live preview)
- Tag filter (multi-select with search)
- Custom attribute filters (any custom field)
- Store type filter (flagship, outlet, etc.)
- **NEW:** "Open now" filter (real-time status)
- **NEW:** Amenity filters (parking, WiFi, wheelchair, etc.)
- **NEW:** Service filters (pickup, delivery, appointment)
- **NEW:** Language filter (languages spoken)
- **NEW:** Payment method filter (cash, card, mobile payment)
- **NEW:** Rating filter (minimum stars, if reviews enabled)
- **NEW:** Price range filter (if applicable)
- **NEW:** Availability filter (in-stock items, appointments)
- **NEW:** Feature filter (has appointment, has pickup, etc.)

#### **Advanced Search** *(NEW)*
- Combined filters (AND/OR logic builder)
- Exclude specific cities/states (negative filtering)
- **NEW:** Bounding box search (rectangular selection)
- **NEW:** Polygon search (custom drawn area on map)
- **NEW:** Along route search (stores along driving route)
- **NEW:** Between two locations (find stores in between)
- **NEW:** Within specific areas (neighborhoods, districts, ZIP zones)
- **NEW:** Saved searches (save filter combinations)
- **NEW:** Search presets (quick filter templates)
- **NEW:** Smart search (AI-powered query understanding)

#### **Search UI/UX** *(Enhanced)*
- Search widget (customizable sidebar widget)
- Search shortcode (embed anywhere)
- Ajax live search (instant results as you type)
- No results message customization
- **NEW:** Search filters panel (collapsible sidebar)
- **NEW:** Active filters display (chips/tags showing applied filters)
- **NEW:** Clear all filters button
- **NEW:** Search result count (e.g., "Showing 15 of 127 stores")
- **NEW:** "Showing X of Y stores" indicator
- **NEW:** Search loading states (skeleton screens)
- **NEW:** Infinite scroll vs. pagination toggle

---

### **4. Frontend Pages & Templates**

#### **Main Store Locator Page** *(Enhanced)*
- Map + list view (side-by-side or stacked)
- Search interface (prominent, accessible)
- Filter sidebar (collapsible)
- Store results list (cards/list view)
- Pagination (customizable per-page count)
- **NEW:** Infinite scroll option
- **NEW:** Load more button (progressive loading)
- **NEW:** Store count display (total and filtered)
- **NEW:** View switcher (map/list/grid toggle)
- **NEW:** Sort options (distance, name, rating, newest)
- **NEW:** Map-only view (fullscreen map mode)
- **NEW:** List-only view (no map, better for mobile)

#### **Store Detail Page** *(Enhanced)*
- Individual store page (dedicated URL)
- Store information display (all fields)
- Static map (embedded mini-map)
- Interactive map option (zoomable)
- Directions link (one-click navigation)
- Contact information (formatted, clickable)
- Operating hours (formatted table with status)
- **NEW:** Store images gallery (lightbox, swipeable)
- **NEW:** Store video embed (autoplay option)
- **NEW:** Reviews section (if reviews enabled)
- **NEW:** Related stores (nearby or same category)
- **NEW:** Nearby stores widget (closest locations)
- **NEW:** Store events (calendar integration)
- **NEW:** Special offers (promotions display)
- **NEW:** Breadcrumbs (hierarchical navigation)
- **NEW:** Social sharing (share to Facebook, Twitter, etc.)
- **NEW:** Print page button (printer-friendly format)
- **NEW:** Add to favorites (save store)
- **NEW:** Check-in feature (geofenced check-in)

#### **Category Pages** *(NEW)*
- **NEW:** Category listing page (all categories)
- **NEW:** Stores by category (filtered view)
- **NEW:** Category description (SEO content)
- **NEW:** Category image/banner (visual header)
- **NEW:** Subcategories display (hierarchical)
- **NEW:** Category filters (refine within category)

#### **Search Results Page** *(NEW)*
- **NEW:** Dedicated search results page
- **NEW:** Search query display ("Showing results for...")
- **NEW:** Filter refinements (modify search)
- **NEW:** Alternative suggestions ("Did you mean...?")
- **NEW:** Map view of results (visual results on map)

#### **Store Registration/Submission** *(NEW)*
- Frontend submission form (public store submission)
- Store approval workflow (admin moderation)
- **NEW:** Multi-step form (wizard interface)
- **NEW:** Progress indicator (step 1 of 5)
- **NEW:** Draft saving (save progress, resume later)
- **NEW:** Image upload (multiple images)
- **NEW:** Preview before submit (review before publishing)
- **NEW:** Email confirmation (notification after submission)
- **NEW:** User dashboard (manage submitted stores)

#### **Widgets & Shortcodes** *(Enhanced)*
- Store locator shortcode `[pj-store-finder]`
- Search widget (sidebar/footer widget)
- **NEW:** Nearby stores widget (geolocation-based)
- **NEW:** Featured stores widget (showcase selected stores)
- **NEW:** Store count widget (total stores display)
- **NEW:** Category widget (category list/dropdown)
- **NEW:** Store hours widget (current store hours)
- **NEW:** Map widget (standalone map embed)
- **NEW:** Store search form (search box only)
- **NEW:** Recent stores widget (latest additions)
- **NEW:** Popular stores widget (most viewed/visited)

#### **Template Variations** *(6+ Built-in)*
- **Template 0:** Default (sidebar + map)
- **Template 1:** Full-width (map above, list below)
- **Template 2:** Grid layout (3-column grid with map)
- **Template 3:** List layout (compact list view)
- **Template 4:** Card layout (card-based design)
- **Template 5:** Split screen (50/50 map and list)
- **NEW:** Masonry layout (Pinterest-style cards)
- **NEW:** Timeline layout (chronological display)
- **NEW:** Map-only view (fullscreen interactive map)
- **NEW:** Compact view (minimal information)
- **NEW:** Directory style (alphabetical listing)

---

### **5. Admin Panel Features** *(17 Total Tabs)*

#### **1. Dashboard Tab** *(Enhanced)*
- Quick overview of all settings
- Usage statistics at-a-glance (stores, searches, views)
- Recent activity (new stores, edits, searches)
- Quick toggles for major features
- System health check (API status, database, cache)
- Performance metrics (page load, query time)
- User engagement metrics (clicks, directions, calls)
- **NEW:** Google Maps API usage monitoring
- **NEW:** Recent errors/warnings display
- **NEW:** Quick actions (add store, view analytics)
- **NEW:** Stores by status chart (active, pending, closed)
- **NEW:** Geographic distribution map
- **NEW:** Popular search terms widget

#### **2. Manage Stores Tab** *(Enhanced)*
- Store list (DataTables with 50+ controls)
- Add new store (comprehensive form)
- Edit store (inline or dedicated page)
- Bulk edit stores (multiple stores at once)
- Bulk delete (with confirmation)
- Search stores (instant search)
- Filter stores (by status, category, location)
- Sort by columns (any column, ascending/descending)
- Pagination controls (10-500 per page)
- Inline editing (click to edit fields)
- Color-coded status (red = missing coordinates, etc.)
- **NEW:** Quick view (modal preview)
- **NEW:** Duplicate store (copy with modifications)
- **NEW:** Clone store (exact copy)
- **NEW:** Store templates (save as template for reuse)
- **NEW:** Bulk status change (activate/deactivate multiple)
- **NEW:** Bulk category assign (add/remove categories)
- **NEW:** Geocode missing coordinates (batch geocoding)
- **NEW:** Re-geocode all (refresh all coordinates)
- **NEW:** Validate addresses (check address accuracy)
- **NEW:** Export filtered results (CSV/Excel of visible stores)
- **NEW:** Column visibility toggle (show/hide columns)
- **NEW:** Save custom views (save filter/column combinations)

#### **3. Categories Management Tab** *(Enhanced)*
- List categories (hierarchical tree view)
- Add/Edit/Delete categories
- Drag-and-drop ordering (visual reordering)
- Hierarchical structure (parent/child relationships)
- Category icons (150+ built-in + custom upload)
- **NEW:** Category images (banner/thumbnail)
- **NEW:** Category descriptions (SEO content)
- **NEW:** Category SEO settings (meta title, description)
- **NEW:** Category templates (display templates per category)
- **NEW:** Merge categories (combine multiple into one)
- **NEW:** Category usage stats (store count, views)
- **NEW:** Bulk operations (bulk edit/delete)

#### **4. Markers & Icons Tab** *(Enhanced)*
- Marker library (150+ icons organized by category)
- Upload custom markers (SVG, PNG with transparency)
- Active/inactive markers (enable/disable)
- **NEW:** Marker preview (visual preview grid)
- **NEW:** Marker categories (organize custom markers)
- **NEW:** Marker search (find specific marker)
- **NEW:** Bulk marker operations (bulk upload, delete)
- **NEW:** Marker templates (save marker sets)
- **NEW:** SVG editor (edit SVG colors, size)
- **NEW:** Icon sets (themed marker collections)

#### **5. Map Customization Tab** *(Enhanced)*
- Map styles editor (visual style builder)
- Pre-built style library (25+ styles)
- Visual style editor (GUI for JSON editing)
- JSON style import/export (Snazzy Maps compatible)
- **NEW:** Style preview (live preview of changes)
- **NEW:** Map settings per page (different styles per page)
- **NEW:** Default map settings (global defaults)
- **NEW:** Style templates (save custom styles)
- **NEW:** Brand style generator (match brand colors)

#### **6. Import/Export Tab** *(Enhanced)*
- CSV import (with field mapping)
- Excel import (XLSX, XLS support)
- CSV export (customizable fields)
- Excel export (formatted spreadsheets)
- Duplicate detection (prevent duplicates on import)
- Field mapping (map CSV columns to store fields)
- **NEW:** XML import/export (structured data)
- **NEW:** JSON import/export (developer-friendly)
- **NEW:** KML/KMZ import (Google Earth format)
- **NEW:** GeoJSON import/export (GIS standard)
- **NEW:** Scheduled imports (automated import via cron)
- **NEW:** Import templates (save mapping configurations)
- **NEW:** Import history (track all imports with rollback)
- **NEW:** Rollback imports (undo specific import)
- **NEW:** Google Sheets sync (live sync with Google Sheets)
- **NEW:** API-based import (import via REST API)
- **NEW:** FTP/SFTP import (automated file imports)
- **NEW:** Import validation (preview and validate before import)
- **NEW:** Dry run mode (test import without saving)

#### **7. Settings Tab** *(Enhanced)*
- General settings (plugin-wide configuration)
- Map settings (default map type, zoom, center)
- Google API key (API key configuration with validation)
- Search settings (search radius, units, behavior)
- Display settings (templates, colors, fonts)
- User permissions (who can manage stores)
- **NEW:** Performance settings (caching, lazy loading)
- **NEW:** Cache settings (cache duration, clear cache)
- **NEW:** Email settings (notification templates)
- **NEW:** Notification settings (admin notifications)
- **NEW:** SEO settings (meta tags, structured data)
- **NEW:** Advanced settings (developer options)
- **NEW:** Developer settings (debug mode, API access)
- **NEW:** Backup/restore settings (automated backups)
- **NEW:** Debug mode (verbose logging for troubleshooting)

#### **8. UI Customizer Tab** *(Enhanced)*
- Visual editor (live preview interface)
- Color picker (brand colors with palette)
- Font selector (typography settings)
- Layout options (grid, list, card layouts)
- Template selector (choose default template)
- Live preview (see changes in real-time)
- **NEW:** CSS editor (custom CSS injection)
- **NEW:** Custom branding (logo, colors, fonts)
- **NEW:** Button styles (customize button appearance)
- **NEW:** Form styles (customize search forms)
- **NEW:** Mobile customization (mobile-specific styles)
- **NEW:** Style presets (save style combinations)
- **NEW:** Export/import styles (share styles between sites)

#### **9. Labels & Translation Tab** *(Enhanced)*
- Label manager (customize all text labels)
- Multi-language support (80+ languages)
- Custom text override (replace any text)
- **NEW:** Translation interface (translate within admin)
- **NEW:** Language packs (download translation packs)
- **NEW:** RTL settings (right-to-left language support)
- **NEW:** Translation export (export for professional translation)
- **NEW:** Crowdsourced translations (community translations)

#### **10. Analytics & Reports Tab** *(Enhanced)*
- Store views tracking (page views per store)
- Search analytics (top searches, failed searches)
- Click tracking (directions, calls, website clicks)
- **NEW:** Heatmap reports (geographic heatmap)
- **NEW:** Popular stores (most viewed/visited)
- **NEW:** Popular categories (top categories)
- **NEW:** Geographic reports (stores by region)
- **NEW:** Time-based reports (trends over time)
- **NEW:** User behavior reports (bounce rate, dwell time)
- **NEW:** Conversion tracking (phone calls, directions, visits)
- **NEW:** Custom reports (build custom report views)
- **NEW:** Export reports (PDF, CSV, Excel)
- **NEW:** Scheduled reports (email delivery)
- **NEW:** Dashboard widgets (add to WordPress dashboard)

#### **11. Lead Management Tab** *(NEW)*
- **NEW:** View leads/inquiries (store contact form submissions)
- **NEW:** Lead details (name, email, message, store)
- **NEW:** Follow-up status (new, contacted, converted, closed)
- **NEW:** Lead notes (internal notes)
- **NEW:** Lead assignment (assign to team members)
- **NEW:** Lead status workflow (customizable workflow)
- **NEW:** Lead scoring (prioritize important leads)
- **NEW:** Lead export (export to CRM)
- **NEW:** Email integration (reply to leads via email)
- **NEW:** CRM integration (sync to Salesforce, HubSpot, etc.)
- **NEW:** Lead notifications (email/SMS alerts)
- **NEW:** Lead reports (conversion rates, response time)

#### **12. Compliance & SEO Tab** *(NEW)*
- **NEW:** SEO settings (meta titles, descriptions)
- **NEW:** Structured data (schema.org markup)
- **NEW:** XML sitemap (auto-generated store sitemap)
- **NEW:** Robots.txt integration (control search engine access)
- **NEW:** Canonical URLs (prevent duplicate content)
- **NEW:** Open Graph tags (social media sharing)
- **NEW:** Twitter Card tags (Twitter optimization)
- **NEW:** Breadcrumb schema (navigation breadcrumbs)
- **NEW:** Local Business schema (rich snippets)
- **NEW:** Review schema (if reviews enabled)
- **NEW:** Organization schema (business information)

#### **13. Integrations Tab** *(NEW)*
- **NEW:** Google Analytics integration (track store finder usage)
- **NEW:** Google Tag Manager (event tracking)
- **NEW:** Facebook Pixel (conversion tracking)
- **NEW:** Hotjar integration (heatmaps, recordings)
- **NEW:** Mixpanel integration (advanced analytics)
- **NEW:** Segment integration (data platform)
- **NEW:** Slack notifications (admin notifications)
- **NEW:** Discord webhooks (community notifications)
- **NEW:** Email service providers (Mailchimp, SendGrid)
- **NEW:** CRM integration (Salesforce, HubSpot)
- **NEW:** Help desk integration (Zendesk, Intercom)
- **NEW:** Zapier integration (1000+ app integrations)
- **NEW:** IFTTT support (automation)
- **NEW:** Webhook builder (custom webhooks)
- **NEW:** Custom API endpoints (extend API)
- **NEW:** SSO integration (SAML, OAuth)

#### **14. Multi-Site & Network Tab** *(NEW)*
- **NEW:** Network-wide settings (apply to all sites)
- **NEW:** Per-site overrides (site-specific settings)
- **NEW:** Centralized analytics (network-wide reports)
- **NEW:** User sync across sites (share user preferences)
- **NEW:** Template distribution (deploy templates network-wide)
- **NEW:** Multi-site deployment (one-click setup)
- **NEW:** Site groups (organize sites)
- **NEW:** Cascading settings (inherit from network)
- **NEW:** Bulk operations (update multiple sites)
- **NEW:** Network reporting (aggregate analytics)
- **NEW:** License pooling (shared license pool)

#### **15. White Label & Branding Tab** *(NEW)*
- **NEW:** Custom branding options (rebrand plugin)
- **NEW:** Logo upload (replace plugin logo)
- **NEW:** Color scheme customization (match brand)
- **NEW:** Custom domain/subdomain (white-label URL)
- **NEW:** Remove "Powered by PJ Store Finder"
- **NEW:** Custom admin interface (rebrand admin)
- **NEW:** Client portal access (client-facing portal)
- **NEW:** Custom documentation links (link to your docs)
- **NEW:** Agency features (manage client sites)
- **NEW:** Reseller options (sub-licensing)

#### **16. Developer Tools Tab** *(NEW)*
- **NEW:** REST API documentation (interactive docs)
- **NEW:** GraphQL playground (test GraphQL queries)
- **NEW:** Webhook manager (configure webhooks)
- **NEW:** Custom hooks/filters reference (developer docs)
- **NEW:** Code snippets library (common code examples)
- **NEW:** Debug mode (enable verbose logging)
- **NEW:** Log viewer (view error and debug logs)
- **NEW:** Performance profiler (analyze query performance)
- **NEW:** Database query logger (track slow queries)
- **NEW:** CLI tools (WP-CLI commands)
- **NEW:** SDK downloads (PHP, JS, Python SDKs)
- **NEW:** Sandbox environment (test environment)
- **NEW:** API key management (generate API keys)
- **NEW:** Rate limiting settings (API throttling)
- **NEW:** Developer documentation (technical docs)

#### **17. Settings Management Tab** *(Enhanced)*
- Export/import settings (backup/restore plugin settings)
- Settings templates (save setting configurations)
- Backup/restore (automated backups)
- Reset to defaults (restore factory settings)
- **NEW:** Version control for settings (track changes)
- **NEW:** Settings history (audit log of changes)
- **NEW:** Scheduled backups (automatic backup schedule)
- **NEW:** Cloud settings sync (sync across sites)
- **NEW:** Multi-environment settings (dev/staging/prod)
- **NEW:** Settings comparison tool (diff view)
- **NEW:** Rollback capability (restore previous settings)

---

### **6. AI-Powered Features** *(Revolutionary NEW Features)*

> **💡 Important:** All AI features require you to provide your own API keys (BYOK - Bring Your Own Key) for OpenAI and/or Anthropic Claude. You pay the AI providers directly at their rates.

#### **AI Provider Configuration (BYOK Model)** 🔑

**Why BYOK?**
- ✅ **You control your costs** - Pay directly to AI providers at their rates
- ✅ **Maximum privacy** - Your data goes directly to your chosen provider
- ✅ **Better performance** - No rate limits imposed by us
- ✅ **Full transparency** - You see exactly what you're being charged

**Supported AI Providers:**

**1. OpenAI API Key** 🟢
- **Where to get:** https://platform.openai.com/api-keys
- **Required for:**
  - AI image alt text generation (missing descriptions)
  - Store description generation (auto-write descriptions)
  - Smart search suggestions (understand natural language)
  - Content simplification (simplify complex store info)
  - Chatbot assistant (AI-powered help)
- **Cost:** Pay-as-you-go (starts at $0.002 per 1K tokens)
- **Models:** GPT-4, GPT-4 Turbo, GPT-3.5

**2. Anthropic Claude API Key** 🔵
- **Where to get:** https://console.anthropic.com/account/keys
- **Required for:**
  - Advanced store matching (intelligent recommendations)
  - Long-form content generation
  - Context-aware translations
  - Alternative to OpenAI (user choice)
- **Cost:** Pay-as-you-go (competitive with OpenAI)
- **Models:** Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku

**3. Local AI Provider** 🟡 *(Optional)*
- **For:** Self-hosted models (Ollama, LM Studio, etc.)
- **Required for:** Privacy-first deployments
- **Cost:** Free (you host)
- **Models:** Any compatible with OpenAI API format

#### **AI Features** *(Powered by BYOK)*

**1. AI Image Intelligence**
- **Automatic Alt Text Generation** - Generate descriptions for store images
- **Image Classification** - Categorize store photos (storefront, interior, product, etc.)
- **OCR (Text Extraction)** - Extract text from images (signage, menus, etc.)
- **Logo Recognition** - Identify brand logos in images

**2. AI Content Generation**
- **Store Description Generator** - Auto-write compelling store descriptions
- **Category Description Generator** - Generate SEO-friendly category descriptions
- **Meta Description Generator** - Create optimized meta descriptions
- **Summarization** - Create short summaries from long descriptions

**3. AI Search Intelligence**
- **Smart Search** - Understand natural language queries ("coffee shops open now near me")
- **Search Suggestions** - AI-powered autocomplete and suggestions
- **Query Understanding** - Interpret complex search queries
- **Spelling Correction** - Fix typos and spelling errors automatically
- **Search Intent Detection** - Understand what users are really looking for

**4. AI Recommendations**
- **Personalized Store Recommendations** - Suggest stores based on user behavior
- **Similar Stores** - Find stores similar to ones user likes
- **Smart Routing** - Optimize multi-store visit routes
- **Popular Times Prediction** - Predict busy times (if data available)

**5. AI Automation**
- **Auto-categorization** - Automatically assign categories to stores
- **Duplicate Detection** - Find and flag duplicate stores intelligently
- **Address Validation** - Verify and standardize addresses
- **Phone Number Formatting** - Standardize phone numbers automatically
- **Data Quality Checking** - Identify missing or incorrect data

**6. AI Analytics**
- **Trend Detection** - Identify search trends and patterns
- **Anomaly Detection** - Detect unusual patterns in usage
- **Predictive Analytics** - Forecast future search trends
- **User Behavior Analysis** - Understand user preferences

**7. AI Chatbot Assistant** *(NEW)*
- **24/7 Support** - AI-powered help desk for users
- **Store Finding Help** - Help users find what they're looking for
- **Feature Guidance** - Answer questions about using the store finder
- **Multi-language Support** - Respond in 80+ languages

#### **AI Configuration Interface**

```
┌─────────────────────────────────────────────────────────┐
│  🤖 AI Provider Configuration (BYOK)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ⚠️ AI features require valid API keys                  │
│                                                          │
│  ┌─ OpenAI ────────────────────────────────────────┐   │
│  │ API Key: [sk-••••••••••••••••••••••••••] 👁️ ✓ │   │
│  │ Status: ✅ Connected (Model: gpt-4-turbo)       │   │
│  │ Usage: $2.34 this month                         │   │
│  │ [Test Connection] [Get API Key →]               │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─ Anthropic Claude ──────────────────────────────┐   │
│  │ API Key: [sk-ant-••••••••••••••••••••] 👁️ ✓   │   │
│  │ Status: ✅ Connected (Model: claude-3-sonnet)   │   │
│  │ Usage: $1.87 this month                         │   │
│  │ [Test Connection] [Get API Key →]               │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  📊 AI Usage Statistics (This Month)                    │
│  • Total API Calls: 1,234                               │
│  • Alt Text Generated: 456 images                       │
│  • Store Descriptions: 78 stores                        │
│  • Smart Searches: 2,456 queries                        │
│  • Estimated Cost: $4.21                                │
│                                                          │
│  [Save Configuration] [View Full Analytics →]           │
└─────────────────────────────────────────────────────────┘
```

**Security Features:**
- 🔒 API keys encrypted in database (AES-256)
- 🔒 Keys never exposed in frontend JavaScript
- 🔒 Secure transmission (TLS/SSL required)
- 🔒 Keys visible only to admins
- 🔒 Audit log of API usage

**Cost Management:**
- Monthly usage estimates
- Spending alerts (email notifications)
- Per-feature cost breakdown
- Usage quotas (optional limits)
- Detailed cost analytics dashboard

---

### **7. SEO & Performance Features**

#### **SEO Features** *(Enhanced)*
- SEO-friendly URLs (clean permalinks)
- Custom slugs (human-readable URLs)
- Canonical URLs (prevent duplicate content)
- Meta descriptions (auto-generated or custom)
- Title optimization (dynamic titles)
- Open Graph tags (social media optimization)
- Twitter Card tags (Twitter optimization)
- Schema.org markup (LocalBusiness structured data)
- XML sitemap generation (auto-generated store sitemap)
- RSS feed (stores feed)
- **NEW:** Breadcrumb schema (navigation breadcrumbs)
- **NEW:** Store schema markup (rich snippets)
- **NEW:** Review schema (if reviews enabled)
- **NEW:** Organization schema (business information)
- **NEW:** Robots meta tags (per-page control)
- **NEW:** Automatic alt text for images (AI-generated)
- **NEW:** SEO analysis tools (content scoring)
- **NEW:** Keyword optimization (suggest keywords)
- **NEW:** 301 redirects management (URL redirects)

#### **Performance Optimization** *(Enhanced)*
- Database indexing (optimized queries)
- Query optimization (efficient SQL queries)
- Async script loading (non-blocking JavaScript)
- Image lazy loading (load images on demand)
- CSS/JS minification (reduced file sizes)
- Caching mechanisms (multi-layer caching)
- **NEW:** CDN integration (Cloudflare, BunnyCDN, etc.)
- **NEW:** Object caching (Redis, Memcached)
- **NEW:** Database caching (query result caching)
- **NEW:** Browser caching headers (leverage browser cache)
- **NEW:** GZIP compression (compress files)
- **NEW:** Image optimization (WebP, AVIF support)
- **NEW:** WebP support (next-gen image format)
- **NEW:** Critical CSS (inline critical CSS)
- **NEW:** Defer non-critical JS (improve page speed)
- **NEW:** Prefetching/preloading (resource hints)
- **NEW:** Service worker (PWA support)
- **NEW:** Pagination vs infinite scroll optimization

#### **Loading & UX** *(Enhanced)*
- Loading states (skeleton screens)
- **NEW:** Skeleton screens (content placeholders)
- **NEW:** Progressive enhancement (graceful degradation)
- **NEW:** Offline support (service worker caching)
- **NEW:** Error handling (user-friendly error messages)
- **NEW:** Retry mechanisms (auto-retry failed requests)
- **NEW:** Graceful degradation (fallback for older browsers)

---

### **8. Integration & Compatibility**

#### **WordPress Ecosystem** *(Enhanced)*

**Page Builders**
- Elementor / Elementor Pro (dedicated widgets)
- WPBakery (Visual Composer) (custom elements)
- Beaver Builder (custom modules)
- Divi Builder (custom modules)
- Oxygen Builder (components)
- Bricks Builder (elements)
- Gutenberg (FSE) (custom blocks)
- Brizy (widgets)
- **NEW:** Automatic detection and optimization
- **NEW:** Builder-specific widgets
- **NEW:** Pre-built store locator templates

**E-Commerce**
- WooCommerce (full integration)
  - Store pickup locations (BOPIS)
  - Local delivery zones
  - Inventory by location
  - Store-specific pricing
- Easy Digital Downloads (download locations)
- **NEW:** Store-based checkout (choose store)
- **NEW:** Store inventory display (stock by store)

**Translation/Multilingual**
- WPML (Premium) (full translation support)
- Polylang Pro (language switching)
- TranslatePress (visual translation)
- Weglot (cloud translation)
- **NEW:** Auto-sync store settings across languages

**SEO Plugins**
- Yoast SEO (full compatibility)
- Rank Math (schema integration)
- All in One SEO (meta tag support)
- **NEW:** SEO score integration

**Forms**
- Gravity Forms (store inquiry forms)
- WPForms (contact forms)
- Ninja Forms (lead generation)
- Formidable Forms (store registration)
- Contact Form 7 (simple forms)
- **NEW:** Pre-built store inquiry templates

#### **Third-Party Services** *(Enhanced)*

**Analytics**
- Google Analytics 4 (event tracking)
- Google Tag Manager (enhanced ecommerce)
- Adobe Analytics (enterprise tracking)
- Mixpanel (user behavior)
- Amplitude (product analytics)
- Segment (data platform)
- Matomo (privacy-first analytics)
- **NEW:** Custom event tracking

**CRM & Marketing**
- Salesforce (lead sync)
- HubSpot (contact sync)
- Mailchimp (newsletter integration)
- SendGrid (email delivery)
- ActiveCampaign (automation)
- **NEW:** Lead sync to CRM

**CDN & Performance**
- Cloudflare (caching, optimization)
- Cloudinary (image optimization)
- BunnyCDN (content delivery)
- StackPath (global CDN)
- KeyCDN (performance CDN)
- **NEW:** Automatic asset optimization

**Maps & Location**
- Google Maps Platform (primary)
- Mapbox (alternative)
- OpenStreetMap (open-source)
- HERE Maps (enterprise)
- **NEW:** Provider switching

**Automation**
- Zapier (premium integration)
- IFTTT (automation)
- Make (Integromat) (workflow automation)
- n8n (self-hosted automation)
- **NEW:** Store event triggers

#### **Browser & Device Support**

**Browsers**
- Chrome/Edge (Chromium) 90+ (full support)
- Firefox 88+ (full support)
- Safari 14+ (full support)
- Opera 76+ (full support)
- **NEW:** Brave browser
- IE11 (basic support, fallback mode)

**Devices**
- Desktop (Windows, macOS, Linux) (optimized)
- Mobile (iOS 13+, Android 8+) (touch-optimized)
- Tablets (iPad, Android tablets) (responsive)
- **NEW:** Foldable devices (adaptive layouts)

---

### **9. Advanced Technical Architecture**

#### **Modern PHP Architecture**

**Core Classes** (PSR-4 Namespaced)
```
PJStoreFinder\Core\
├── Application.php           # Main app container
├── ServiceProvider.php       # Dependency injection
├── EventDispatcher.php       # Event system
├── Router.php                # Request routing
├── Cache.php                 # Multi-layer caching
├── Queue.php                 # Background jobs
└── Logger.php                # Logging system
```

**Admin Classes**
```
PJStoreFinder\Admin\
├── Dashboard.php             # Admin dashboard
├── Settings/                 # Settings pages (17 tabs)
├── StoreManager.php          # Store CRUD operations
├── BulkEditor.php            # Bulk editing tools
└── Wizards/                  # Setup wizards
```

**AI Integration**
```
PJStoreFinder\AI\
├── Providers/
│   ├── OpenAIProvider.php
│   ├── AnthropicProvider.php
│   └── LocalLLMProvider.php
├── ImageAnalyzer.php         # AI image analysis
├── ContentGenerator.php      # AI content generation
├── SearchIntelligence.php    # AI search
└── Recommender.php           # AI recommendations
```

**Analytics Engine**
```
PJStoreFinder\Analytics\
├── Tracker.php               # Event tracking
├── Dashboard.php             # Analytics dashboard
├── Reports/                  # Report generators
├── DataWarehouse.php         # Data storage
└── Visualization.php         # Charts/graphs
```

**API Layer**
```
PJStoreFinder\API\
├── REST/V1/                  # REST API v1
│   ├── Stores.php
│   ├── Categories.php
│   ├── Search.php
│   └── Analytics.php
├── GraphQL/                  # GraphQL API
│   ├── Schema.php
│   └── Resolvers/
└── Webhooks/                 # Webhook system
    ├── Manager.php
    └── Handlers/
```

**Frontend Classes**
```
PJStoreFinder\Frontend\
├── Renderer.php              # Template rendering
├── AssetManager.php          # CSS/JS loading
├── Maps/                     # Map providers
│   ├── GoogleMaps.php
│   ├── Mapbox.php
│   └── OpenStreetMap.php
├── Search/                   # Search engine
│   ├── SearchEngine.php
│   ├── Filters.php
│   └── Geocoder.php
└── Components/               # UI components
```

#### **Modern JavaScript Architecture**

**Frontend JS Modules** (ES6+, TypeScript)
```javascript
src/js/
├── core/
│   ├── Application.ts        # Main app class
│   ├── EventEmitter.ts       # Event system
│   ├── StateManager.ts       # State management
│   └── ServiceWorker.ts      # PWA support
├── maps/
│   ├── MapProvider.ts        # Map abstraction
│   ├── GoogleMaps.ts         # Google Maps implementation
│   ├── Mapbox.ts             # Mapbox implementation
│   ├── Markers.ts            # Marker management
│   └── Clustering.ts         # Marker clustering
├── search/
│   ├── SearchEngine.ts       # Search logic
│   ├── Filters.ts            # Filter system
│   ├── Autocomplete.ts       # Search suggestions
│   └── Geolocation.ts        # Location detection
├── ui/
│   ├── Modal.ts              # Modal component
│   ├── Sidebar.ts            # Sidebar component
│   ├── StoreCard.ts          # Store card component
│   └── InfoWindow.ts         # Map popup component
└── utils/
    ├── Storage.ts            # LocalStorage/IndexedDB
    ├── Analytics.ts          # Analytics client
    ├── API.ts                # REST/GraphQL client
    └── Helpers.ts            # Utility functions
```

#### **Build System** *(Modern)*
- **Webpack 5** - Module bundling
- **Babel** - ES6+ transpilation
- **TypeScript** - Type safety
- **PostCSS** - CSS processing
- **SCSS** - CSS preprocessing
- **Autoprefixer** - CSS vendor prefixes
- **PurgeCSS** - Unused CSS removal
- **Terser** - JS minification
- **ImageMin** - Image optimization
- **Code Splitting** - Dynamic imports
- **Tree Shaking** - Dead code elimination

#### **Dependencies** (Composer + NPM)

**PHP Dependencies**
```json
{
  "google/maps": "^1.0",
  "guzzlehttp/guzzle": "^7.0",
  "symfony/http-foundation": "^6.0",
  "league/container": "^4.0",
  "monolog/monolog": "^3.0",
  "phpunit/phpunit": "^10.0"
}
```

**JavaScript Dependencies**
```json
{
  "react": "^18.0",
  "chart.js": "^4.0",
  "axios": "^1.0",
  "leaflet": "^1.9",
  "mapbox-gl": "^2.0"
}
```

---

### **10. Database Schema**

#### **Core Tables**

**stores**
```sql
CREATE TABLE wp_pj_stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  description_short VARCHAR(500),
  street VARCHAR(255),
  address_2 VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country_id INT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  phone VARCHAR(50),
  phone_secondary VARCHAR(50),
  fax VARCHAR(50),
  email VARCHAR(100),
  website VARCHAR(255),
  featured_image VARCHAR(255),
  logo_id INT,
  marker_id INT,
  status ENUM('active','inactive','pending','closed'),
  priority INT DEFAULT 0,
  view_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT 0,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_location (latitude, longitude),
  INDEX idx_city_state (city, state),
  INDEX idx_postal_code (postal_code),
  INDEX idx_status (status),
  FULLTEXT KEY ft_title_desc (title, description)
);
```

**store_meta**
```sql
CREATE TABLE wp_pj_store_meta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  meta_key VARCHAR(255),
  meta_value LONGTEXT,
  
  INDEX idx_store_id (store_id),
  INDEX idx_meta_key (meta_key),
  FOREIGN KEY (store_id) REFERENCES wp_pj_stores(id) ON DELETE CASCADE
);
```

**store_hours**
```sql
CREATE TABLE wp_pj_store_hours (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  day_of_week TINYINT(0-6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT 0,
  is_24_hours BOOLEAN DEFAULT 0,
  
  INDEX idx_store_id (store_id),
  FOREIGN KEY (store_id) REFERENCES wp_pj_stores(id) ON DELETE CASCADE
);
```

**categories**
```sql
CREATE TABLE wp_pj_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  parent_id INT DEFAULT 0,
  icon VARCHAR(255),
  color VARCHAR(7),
  image VARCHAR(255),
  order_num INT DEFAULT 0,
  count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_parent_id (parent_id),
  INDEX idx_slug (slug)
);
```

**store_categories**
```sql
CREATE TABLE wp_pj_store_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  category_id INT NOT NULL,
  is_primary BOOLEAN DEFAULT 0,
  
  UNIQUE KEY unique_store_category (store_id, category_id),
  INDEX idx_store_id (store_id),
  INDEX idx_category_id (category_id),
  FOREIGN KEY (store_id) REFERENCES wp_pj_stores(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES wp_pj_categories(id) ON DELETE CASCADE
);
```

**markers**
```sql
CREATE TABLE wp_pj_markers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  file_name VARCHAR(255),
  file_path VARCHAR(255),
  width INT,
  height INT,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**countries**
```sql
CREATE TABLE wp_pj_countries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  iso_code_2 CHAR(2),
  iso_code_3 CHAR(3),
  dial_code VARCHAR(10),
  
  INDEX idx_iso_code_2 (iso_code_2)
);
```

**store_analytics**
```sql
CREATE TABLE wp_pj_store_analytics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  event_type VARCHAR(50),
  user_id INT,
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  referrer VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_store_created (store_id, created_at),
  INDEX idx_event_type (event_type)
);
```

**search_logs**
```sql
CREATE TABLE wp_pj_search_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  search_query VARCHAR(255),
  location VARCHAR(255),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  radius INT,
  results_count INT,
  filters JSON,
  user_id INT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_search_query (search_query),
  INDEX idx_created_at (created_at)
);
```

**leads**
```sql
CREATE TABLE wp_pj_leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  name VARCHAR(255),
  email VARCHAR(100),
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT,
  status ENUM('new','contacted','converted','closed') DEFAULT 'new',
  assigned_to INT,
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_store_id (store_id),
  INDEX idx_status (status),
  FOREIGN KEY (store_id) REFERENCES wp_pj_stores(id) ON DELETE CASCADE
);
```

---

## 🚀 **Performance & Optimization**

### **Loading Strategy** *(Enhanced)*
- **Critical CSS** - Inline above-the-fold CSS
- **Async JavaScript** - Non-blocking script loading
- **Lazy Loading** - Images, iframes, maps loaded on demand
- **Code Splitting** - Load features on demand
- **Tree Shaking** - Remove unused code
- **Minification** - CSS, JS, HTML compression
- **Compression** - Gzip, Brotli support
- **Resource Hints** - DNS prefetch, preconnect, prefetch
- **NEW:** HTTP/2 support (multiplexing)
- **NEW:** Priority hints (fetchpriority attribute)

### **Caching System** *(Multi-Layer)*
- **Browser Cache** - Static assets (1 year)
- **Page Cache** - Full page caching
- **Object Cache** - Database query results (Redis, Memcached)
- **Transient Cache** - Temporary data (WordPress transients)
- **CDN Cache** - Edge caching (Cloudflare, etc.)
- **NEW:** Service Worker cache (offline support)
- **NEW:** Predictive prefetching (ML-based)
- **NEW:** Cache warming (automated)

### **Database Optimization**
- Indexed tables (optimized queries)
- Query optimization (efficient SQL)
- Connection pooling
- **NEW:** Query monitoring (slow query detection)
- **NEW:** Database cleanup (remove old data)

### **Asset Optimization**
- Image optimization (WebP, AVIF)
- SVG optimization (SVGO)
- Icon sprites
- **NEW:** Responsive images (srcset, sizes)
- **NEW:** Art direction (picture element)

### **Performance Monitoring**
- **Core Web Vitals** tracking
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- **NEW:** Custom performance metrics
- **NEW:** Real User Monitoring (RUM)
- **NEW:** Performance budgets
- **NEW:** Automated alerts

---

## 🔒 **Security & Privacy**

### **Security Features** *(Enhanced)*
- Nonce verification (all forms)
- CSRF protection
- XSS prevention (sanitization)
- SQL injection prevention (prepared statements)
- Capability checks (user permissions)
- Input sanitization (all inputs)
- Output escaping (all outputs)
- **NEW:** Content Security Policy (CSP)
- **NEW:** Subresource Integrity (SRI)
- **NEW:** Rate limiting (API, form submissions)
- **NEW:** Two-Factor Authentication (2FA)
- **NEW:** Security audit log

### **Privacy Features** *(Enhanced)*
- GDPR compliant by default
- CCPA compliant
- Cookie consent integration
- Privacy policy generator
- Data export (user data)
- Data deletion (right to be forgotten)
- **NEW:** Anonymous analytics option
- **NEW:** No external dependencies (privacy mode)
- **NEW:** Data retention policies

---

## 📱 **Shortcodes & Blocks**

### **Shortcodes** *(15+ Shortcodes)*
```
[pj-store-finder]                          # Main store finder
[pj-store-finder-map]                      # Map only
[pj-store-finder-list]                     # List only
[pj-store-search]                          # Search form only
[pj-store category="retail"]               # Filter by category
[pj-store-detail id="123"]                 # Single store detail
[pj-nearby-stores]                         # Nearby stores widget
[pj-featured-stores]                       # Featured stores
[pj-store-count]                           # Total store count
[pj-store-categories]                      # Category list
[pj-store-hours id="123"]                  # Store hours
[pj-directions-link id="123"]              # Directions button
[pj-store-contact id="123"]                # Contact form
[pj-recent-stores]                         # Recent stores
[pj-popular-stores]                        # Popular stores
```

### **Gutenberg Blocks** *(NEW - 20+ Blocks)*
- **Store Finder Block** - Full store locator interface
- **Store Map Block** - Interactive map only
- **Store List Block** - List of stores
- **Store Search Block** - Search form
- **Store Detail Block** - Single store display
- **Nearby Stores Block** - Location-based stores
- **Featured Stores Block** - Showcase selected stores
- **Store Categories Block** - Category grid/list
- **Store Hours Block** - Operating hours display
- **Directions Block** - Navigation button
- **Store Contact Block** - Contact form
- **Store Gallery Block** - Image gallery
- **Store Reviews Block** - Reviews display (if enabled)
- **Store Count Block** - Statistics display
- **Store Filter Block** - Filter controls
- **Store Sort Block** - Sorting options
- **Store Badge Block** - Custom badges/icons
- **Store Analytics Block** - Stats widget
- **Store Comparison Block** - Compare stores
- **Store Timeline Block** - Chronological display

### **Elementor Widgets** *(NEW - 15+ Widgets)*
- Store Finder Widget
- Store Map Widget
- Store List Widget
- Store Search Widget
- Store Detail Widget
- Featured Stores Widget
- Nearby Stores Widget
- Category Grid Widget
- Store Hours Widget
- Directions Widget
- Contact Form Widget
- Store Gallery Widget
- Store Count Widget
- Store Filter Widget
- Store Badge Widget

---

## 🌐 **Multi-Site & Network Features** *(Enterprise)*

### **WordPress Multisite Support**
- Network-wide activation
- Per-site customization
- Centralized settings management
- Bulk operations (all sites, select sites)
- Site templates (deploy consistent settings)
- **NEW:** Site groups (organize by region, brand)
- **NEW:** Cascading settings (network → site)
- **NEW:** Multi-site analytics dashboard
- **NEW:** Cross-site store search
- **NEW:** License pooling

### **White Label Features**
- Custom branding (logo, colors, name)
- Remove "Powered by PJ Store Finder"
- Custom domain/subdomain
- Custom admin interface
- Client portal (white-labeled)
- Agency mode (manage multiple clients)
- **NEW:** Custom support portal
- **NEW:** Co-branding options

---

## 👨‍💻 **Developer Features**

### **REST API** *(Complete Coverage)*
Endpoints for all functionality:
```
GET    /wp-json/pj/v1/stores
POST   /wp-json/pj/v1/stores
PUT    /wp-json/pj/v1/stores/{id}
DELETE /wp-json/pj/v1/stores/{id}
GET    /wp-json/pj/v1/categories
GET    /wp-json/pj/v1/search
GET    /wp-json/pj/v1/analytics
POST   /wp-json/pj/v1/geocode
... (50+ endpoints)
```

### **GraphQL API** *(NEW)*
```graphql
query {
  stores(filter: {category: "retail", radius: 10}) {
    id
    name
    address
    distance
    categories {
      name
    }
  }
}

mutation {
  createStore(input: {
    name: "New Store"
    address: "123 Main St"
  }) {
    id
    name
  }
}
```

### **Webhooks** *(NEW)*
- Store created
- Store updated
- Store deleted
- Search performed
- Lead created
- Custom events

### **Hooks & Filters** *(100+ Hooks)*
```php
// Filters
apply_filters('pj_stores_query', $query);
apply_filters('pj_search_results', $results);
apply_filters('pj_marker_icon', $icon, $store);
// ... 50+ more

// Actions
do_action('pj_store_created', $store_id);
do_action('pj_search_performed', $query);
// ... 50+ more
```

### **CLI Tools** *(NEW)*
```bash
# WP-CLI integration
wp pj stores list
wp pj stores import stores.csv
wp pj stores export --format=csv
wp pj geocode --all
wp pj analytics report
wp pj cache clear
```

---

## 📈 **Roadmap & Future Features**

### **Q1 2026**
- AR store navigation (augmented reality)
- Voice search with natural language
- Advanced AI personalization
- Blockchain-based reviews
- IoT integration (smart stores)

### **Q2 2026**
- Metaverse store presence
- VR store tours
- Neural interface support (experimental)
- Predictive store suggestions
- Quantum-resistant encryption

### **Q3 2026**
- Universal translator (200+ languages)
- Emotion-aware recommendations
- Holographic displays
- Brain-computer interface
- Time-based predictions

---

## 📝 **Summary & Comparison**

### **PJ Store Finder vs. Competitors**

| Feature | Agile Store Locator | Super Store Finder | PJ Store Finder |
|---------|---------------------|-------------------|-----------------|
| **Templates** | 6+ | Theme-based | 10+ (Modern) |
| **Map Providers** | Google only | Google only | Multi-provider |
| **AI Features** | None | None | 20+ (BYOK) |
| **Admin Tabs** | 15+ | 10+ | 17 |
| **Analytics** | Basic | Basic | Enterprise |
| **API** | REST | Basic | REST + GraphQL |
| **Webhooks** | No | Limited | Yes (Full) |
| **Multi-site** | Yes | Yes | Enterprise |
| **Markers** | 150+ | Custom upload | 150+ + Custom |
| **Categories** | Hierarchical | Tags | Hierarchical |
| **Lead Management** | Yes | No | Advanced |
| **White Label** | No | No | Yes |
| **Performance** | Good | Good | Excellent |
| **Price Point** | $$$ | $$$ | $$$$ |

---

## 💰 **Pricing Tiers** *(Proposed)*

### **Starter** - $149/year
- Single site license
- All core features
- 5 templates
- Google Maps (primary)
- Basic analytics
- Email support
- **Note:** AI features require separate API costs (BYOK)

### **Professional** - $399/year
- Up to 5 sites
- All features
- 10+ templates
- Multi-provider maps
- Advanced analytics
- AI-powered features (basic)
- Priority support
- API access
- **Note:** AI features require separate API costs (BYOK)

### **Business** - $799/year
- Up to 25 sites
- Everything in Professional
- White-label options
- Advanced AI features
- Multi-site management
- Premium support
- Dedicated account manager
- **Note:** AI features require separate API costs (BYOK)

### **Enterprise** - Custom pricing
- Unlimited sites
- Everything in Business
- Full white-label
- Custom AI training
- SLA guarantees
- On-premise deployment option
- 24/7 priority support
- Custom feature development
- **Note:** AI features require separate API costs (BYOK)

**💰 AI Costs (Separate):**
- AI features use BYOK model
- You pay OpenAI or Anthropic directly
- Typical costs: $5-$50/month depending on usage
- Full cost transparency

---

## 🎓 **Support & Documentation**

### **Documentation**
- Comprehensive user guide (300+ pages)
- Video tutorials (50+ videos)
- Developer documentation (full API reference)
- Code examples (GitHub repository)
- Interactive tutorials
- Best practices guide
- Case studies
- FAQs (200+ questions)

### **Support Channels**
- Email support (24h response)
- Live chat (business hours)
- Help desk (ticket system)
- Community forum
- Discord server
- GitHub issues
- **Premium:** Phone support
- **Premium:** Dedicated Slack channel

---

## 🏆 **PJ Store Finder Mission**

**"Connect customers to your stores, instantly and intelligently."**

PJ Store Finder isn't just a plugin—it's a comprehensive location marketing platform. We believe that store finders should be:
- **Intelligent** - AI-powered search and recommendations
- **Fast** - Lightning-fast performance, even with thousands of stores
- **Beautiful** - Modern, customizable design that matches your brand
- **Powerful** - Enterprise features without enterprise complexity
- **Developer-Friendly** - Extensive API and customization options
- **Future-Proof** - Built with modern technologies for tomorrow's web

---

## ✅ **Why Choose PJ Store Finder?**

✅ **Most Intelligent** - AI-powered search & recommendations (BYOK)  
✅ **Multi-Provider Maps** - Google, Mapbox, OpenStreetMap support  
✅ **Enterprise-Ready** - White-label, multi-site, analytics  
✅ **Developer-Friendly** - Full REST & GraphQL API  
✅ **Performance-Optimized** - Lightning-fast, minimal impact  
✅ **Modern UI/UX** - 10+ responsive templates  
✅ **Cost Transparent** - BYOK for AI, you control costs  
✅ **SEO-Optimized** - Rich snippets, structured data, sitemaps  
✅ **Future-Proof** - Modern architecture, regular updates  
✅ **24/7 Support** - Always here when you need us

---

## 📞 **Get Started**

**Website:** https://printjones.com/store-finder  
**Demo:** https://demo.printjones.com/store-finder  
**Documentation:** https://docs.printjones.com/store-finder  
**GitHub:** https://github.com/printjones/pj-store-finder  
**Email:** hello@printjones.com  
**Phone:** +1 (555) PJ-FINDER

---

**Built with ❤️ by PrintJones**

*This document is a living specification and will be updated as development progresses.*
