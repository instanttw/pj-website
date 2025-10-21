# Plugin Slugs and URLs Reference

This document contains the correct slugs and URLs for all PrintJones plugins.

## Plugin Slugs

When adding plugins to the Supabase database, use these exact slugs:

### Page Builder Addons
1. **All-in-One Addons for Elementor**
   - Slug: `aioa-elementor`
   - URL: https://printjones.com/aioa-elementor
   - Full Path: `/plugins/aioa-elementor`

2. **Essential Addons for WPBakery Page Builder**
   - Slug: `eaf-wpbakery`
   - URL: https://printjones.com/eaf-wpbakery
   - Full Path: `/plugins/eaf-wpbakery`

### PrintJones Core Plugins
3. **PJ Product Filter**
   - Slug: `pj-product-filter`
   - URL: https://printjones.com/pj-product-filter
   - Full Path: `/plugins/pj-product-filter`

4. **PJ Media Library**
   - Slug: `pj-media-library`
   - URL: https://printjones.com/pj-media-library
   - Full Path: `/plugins/pj-media-library`

5. **PJ Accessibility**
   - Slug: `pj-accessibility`
   - URL: https://printjones.com/pj-accessibility
   - Full Path: `/plugins/pj-accessibility`

6. **PJ Ajax Store Locator**
   - Slug: `pj-store-finder`
   - URL: https://printjones.com/pj-store-finder
   - Full Path: `/plugins/pj-store-finder`

7. **PJ Multicurrency**
   - Slug: `pj-multicurrency`
   - URL: https://printjones.com/pj-multicurrency
   - Full Path: `/plugins/pj-multicurrency`

8. **PJ Product Designer**
   - Slug: `pj-product-designer`
   - URL: https://printjones.com/pj-product-designer
   - Full Path: `/plugins/pj-product-designer`

## Database Setup

When inserting these plugins into Supabase, use the following structure:

```sql
INSERT INTO plugins (name, slug, tagline, description, price, rating, review_count, download_count, is_featured, is_active, category_id, version)
VALUES 
  ('All-in-One Addons for Elementor', 'aioa-elementor', 'Your tagline here', 'Description...', 49.00, 4.8, 1250, 50000, true, true, 1, '1.0.0'),
  ('Essential Addons for WPBakery Page Builder', 'eaf-wpbakery', 'Your tagline here', 'Description...', 49.00, 4.7, 980, 35000, true, true, 1, '1.0.0');
```

## Notes

- All slugs must be unique and URL-safe
- Slugs are used in the URL structure: `/plugins/{slug}`
- The slug cannot be changed after creation without breaking existing links
- Always use lowercase with hyphens for slugs
- Never use spaces or special characters in slugs

## Verification

After adding plugins to the database, verify the URLs work:
- https://printjones.com/plugins/aioa-elementor
- https://printjones.com/plugins/eaf-wpbakery
- https://printjones.com/plugins/pj-product-filter
- https://printjones.com/plugins/pj-media-library
- https://printjones.com/plugins/pj-accessibility
- https://printjones.com/plugins/pj-store-finder
- https://printjones.com/plugins/pj-multicurrency
- https://printjones.com/plugins/pj-product-designer
