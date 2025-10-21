# PJ MultiCurrency — Development Specification

Name: PJ MultiCurrency  
Version: 25.0.0  
Author: PrintJones  
Author URL: https://printjones.com  
Plugin URL: https://printjones.com/multicurrency  
License: GPL-2.0-or-later  
Requires: PHP 7.4+, WP 6.0+, WooCommerce 7.0+ (tested to latest)

---

## 1. Vision and Differentiators

PJ MultiCurrency is a next‑gen, enterprise‑grade multi‑currency platform for WooCommerce. It surpasses existing solutions by combining a modular architecture, advanced pricing rules, edge/cache awareness, consent‑first detection, and developer‑first extensibility.

Key differentiators:
- Rules + Segmentation + Experiments baked in.
- Edge-aware, cookie-less JSON hydration for cache/CDN compatibility.
- Consent-first geolocation; privacy by design.
- Enterprise observability: telemetry, logs, audit trails, rate provenance.
- Developer-first: DI, interfaces, REST + GraphQL, WP-CLI, hook registry.

---

## 2. Architecture and Code Layout

Root:
- src/Core: bootstrap, DI container, config, feature flags, scheduler, caching, storage, HTTP, logging, telemetry
- src/Domain: currency, rates, geo, pricing, checkout, SEO
- src/Integrations/Woo: WP/WC hooks, Blocks, Store API
- src/Integrations/ThirdParty: modular compat shims
- src/AdminApp: React + TS SPA for settings; REST controllers
- src/REST, src/GraphQL, src/CLI
- resources/templates, assets; tests/unit, integration, e2e

Key modules:
- Core\Container: service wiring
- Domain\Rates\RateService: provider fan‑out, quorum, fallback, smoothing (EMA), provenance
- Domain\Pricing\Calculator: pipeline (fixed -> rules -> rate -> rounding -> fees)
- Domain\Pricing\Rules: visual rule builder; conditions (segment, country, device, role, schedule) -> actions (currency, %+/- adjust, rounding)
- Domain\Geo\Detector + ConsentGuard
- Domain\Checkout\CheckoutPolicy (lock-in, gateway currency matrix)
- Domain\SEO\CurrencyRouting (subpath/subdomain/canonical/sitemaps)

---

## 3. Data Model and Persistence

Options (wp_options):
- pjmc_settings (serialized): currencies, rules, rounding, detection, checkout, display, performance, integrations, seo, telemetry, api keys
- pjmc_feature_flags
- pjmc_provider_health

Post meta:
- _pjmc_fixed_price_{CURRENCY}
- _pjmc_fixed_sale_{CURRENCY}

Order meta:
- _pjmc_order_currency
- _pjmc_order_base_currency
- _pjmc_order_rate (value, provider, timestamp, smoothing)
- _pjmc_pricing_trace (rules applied, rounding, fees)

Transients/object cache:
- pjmc_rates_{hash}
- pjmc_geo_{hash}
- pjmc_ui_hydrate_{hash}

---

## 4. Features (Superset of CURCY + New)

4.1 Currency & Rates
- Unlimited currencies; per-currency symbol, decimals, position, separators
- Per-currency fees (fixed/%), min/max price guards
- Multiple providers: OXR, CurrencyAPI, XE, Wise, ECB, Google/Yahoo (best‑effort), custom HTTP
- Fan‑out fetch with provider priority, quorum acceptance, automatic failover
- EMA smoothing, weekend/holiday hold, stale‑if‑error fallback
- Per-currency provider override and TTL
- Trading calendar (skip updates on holidays)

4.2 Pricing Rules & Rounding
- Visual Rule Builder (conditions: country, role, device, UTM, time window, category, tags, customer segment; actions: set currency, adjust price ±%, apply rounding strategy, enforce margins)
- Rounding strategies: banker’s, x.99, threshold rounding, custom callbacks
- Beauty Pricing v2: composable steps (ceil -> minus .01 -> enforce min margin)
- Category/product overrides with priorities

4.3 Detection & Consent
- Detection chain (URL -> user pref -> account -> country -> browser lang -> default)
- Providers: MaxMind, IP2Location, Cloudflare header, custom HTTP API
- Consent Guard: anonymize IP before consent; fallback to default
- Bot strategy (UA/header rules); admin‑defined
- Storage strategies: cookie, PHP session, Woo session, transients, Redis, usermeta

4.4 Checkout & Gateways
- Lock-in policies: on cart/checkout/payment-intent; change rules
- Gateway currency matrix + auto-switch on selection
- Gateway/currency surcharges (transparent display, line-item)
- Gift cards/store credit multi-currency rules
- Refund policy: use recorded snapshot rate vs current, with accounting note

4.5 Display & UI
- Switchers: Blocks/Widgets/Shortcodes with live preview and builder
- Floating bar designer; mini-cart quick switcher; inline product switcher
- Price Collate 2.0: compare top N currencies; optional analytics hook
- Localized currency names, narrow symbols, RTL aware
- Accessible by default (WCAG 2.1 AA), reduced motion support

4.6 SEO & Routing
- Currency subpath (/usd/), query (?cur=USD), or subdomain (usd.example.com)
- Currency‑aware canonicals; currency‑specific sitemaps (optional)
- Multi‑currency product schema with base anchor price

4.7 Performance & Edge
- Cookie‑less JSON hydration (signed payload + TTL) for prices to maximize cache hits
- ESI/hole punching guidance + server hints for active currency
- Action Scheduler background jobs; health checks and backoff strategies

4.8 Analytics, Reports, and Experiments
- Revenue by currency; normalized base revenue using recorded rates
- Switch funnel analytics; segment performance; A/B and multi‑arm bandit for pricing/UX
- KPI dashboard: rate freshness, provider health, cache hit rate, p95 switch latency

4.9 Logs, Audit, Observability
- Audit trail (who/what/before/after, diffs)
- Rate provenance (provider, signature/hash, quorum path)
- Error logs with remediation; optional PII-free telemetry

4.10 Developer Experience
- REST + GraphQL (if WPGraphQL installed) for currencies, rates, pricing preview
- Webhooks: currency_switched, rates_updated, rule_applied, checkout_locked
- Hook registry browser; live filter tester
- WP‑CLI: pjmc rates update|validate|import|export|health

4.11 Migration & Compatibility
- Importers for CURCY/WOOCS (currencies, fixed prices, separators, positions)
- Observer mode to verify parity before switching
- Toggleable vendor integrations to load only required shims

New practical enhancements over CURCY:
- Margin Guard: never allow conversion to drop below target margin
- Price Floor/Ceiling per currency/category/product
- Scheduled currency availability (e.g., enable JPY only during campaign)
- Customer profile currency preference synced across devices
- SLA monitors + Slack/email alerts on provider failures/threshold breaches
- One‑click Diagnostics: cache headers, vary policy, route mapping, geo health

---

## 5. Admin UI (Pages, Menus, Sections)

Top-level menu: PJ MultiCurrency
- Dashboard
- Currencies
- Rules & Rounding
- Detection & Consent
- Checkout & Gateways
- Display & UI
- SEO & Routing
- Performance & Caching
- Integrations
- Analytics & Reports
- Logs & Audit
- Tools
- Import/Export
- Advanced
- Developer
- Onboarding Wizard

Highlights per page:
- Dashboard: KPIs, heatmap, events, quick actions
- Currencies: table with inline edit; provider override; fees; floor/ceiling; TTL
- Rules & Rounding: visual builder, priorities, dry-run tester
- Detection & Consent: chain editor; provider health; consent modes
- Checkout & Gateways: matrix, lock policies, surcharges, refund mode
- Display & UI: live preview; switcher builder; collate settings
- SEO & Routing: mode selection; canonical; sitemap control; schema toggles
- Performance & Caching: edge strategy, hydration TTL, prewarm, backoff, health
- Integrations: toggles and diagnostics, priority ordering
- Analytics & Reports: revenue normalized, funnel, experiments
- Logs & Audit: searchable, exportable, diff viewer
- Tools: simulator (pipeline trace), validators, selective cache clear
- Import/Export: CSV/XLSX multi‑sheet, mapping, preview, rollback
- Developer: hook registry, REST/GraphQL explorer, webhooks
- Onboarding Wizard: 5‑step guided setup with validations

---

## 6. Public APIs

REST (wp-json/pjmc/v1):
- GET /currencies, POST /currencies
- GET /rates?base=USD&symbols=EUR,GBP
- POST /simulate-price { product_id, currency, segment, country }
- POST /switch { currency }
- GET /health, GET /provider-health

GraphQL (optional):
- type Currency, Rate, PricingTrace; queries for currencies, rates, simulatePrice

Webhooks:
- rates_updated, currency_switched, rule_applied, checkout_locked, provider_down

WP‑CLI:
- wp pjmc rates update|diff|import|export
- wp pjmc rules validate
- wp pjmc health check

---

## 7. Performance Targets
- Price hydration endpoint p95 < 120ms
- Cache hit rate > 90% on price fragments in cached pages
- Rate updates complete < 10s for 20 currencies (fan‑out)
- Minimal added queries on frontend (<= 3)

---

## 8. Security & Privacy
- Nonce + capability checks for all admin/REST
- Signed JSON payloads for hydration; short‑lived signatures
- Minimal IP handling; consent‑aware; anonymization before consent
- API keys stored with encryption (if available) and masked in UI

---

## 9. Testing Strategy
- Unit: pricing calculator, rounding, rules, rate smoothing
- Integration: provider adapters, detection chain, checkout lock
- E2E: currency switcher UX, cart/checkout flows, SEO routing
- Load tests: hydration endpoint, rates fan‑out under failure

---

## 10. Migration Plan
- Import from CURCY/WOOCS
- Observer mode: run side‑by‑side to validate parity (no price output changes)
- Switch-over with rollback point; compare analytics for 7 days

---

## 11. Roadmap (Release 25.x)
- 25.0.0: Core, currencies, providers, rules, rounding, detection, checkout, SPA admin, wizard
- 25.1.0: SEO routing, hydration edge helpers, analytics basics
- 25.2.0: Experiments, GraphQL, advanced reports, Slack alerts
- 25.3.0: Microservice optional rate proxy (CF Worker), enterprise SSO for admin

---

## 12. Implementation Notes
- Use Action Scheduler for rate updates; exponential backoff + jitter
- Provider adapters must implement RateProviderInterface; include health() and capabilities()
- Pricing pipeline must record a structured trace for audits
- Switchers should default to cookie‑less JSON hydration in cached environments
- Provide filters at each pipeline step; document in Developer page

---

## 13. Shortcodes, Blocks, Widgets

Shortcodes:
- [pjmc_switcher layout="compact|list|flags" position="header|footer|sidebar"]
- [pjmc_price_collate product_id=123 limit=3]
- [pjmc_convert amount=100 from=USD to=EUR]

Blocks:
- Switcher, Collate, Converter (server + client render; supports hydration)

Widgets:
- Header Switcher, Sidebar Switcher, Rates Ticker

---

## 14. Practical UX Enhancements
- Undo/redo in admin settings
- Draft/Publish for rule sets
- Inline warnings (e.g., gateway doesn’t support selected currency)
- One‑click “make prices pretty” suggestions per currency
- Contextual help and guided tours

---

## 15. Compatibility Targets
- Popular plugins: Subscriptions, Bookings, Bundles, Name Your Price, Deposits, Wholesale, Dokan, WCFM, Discount Rules, Dynamic Pricing, Product Add‑Ons, Elementor
- Blocks/HPOS/COT ready

---

Appendix: Glossary
- Hydration: Client replaces server placeholders with signed JSON prices
- Quorum: Minimum provider agreement to accept a rate
- EMA: Exponential Moving Average smoothing of rates
