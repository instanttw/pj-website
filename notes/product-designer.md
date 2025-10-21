# PJ Product Designer v25.0.0 - Development Documentation

## Plugin Metadata

```php
/**
 * Plugin Name: PJ Product Designer
 * Plugin URI: https://printjones.com/product-designer
 * Description: Next-generation product customization platform for WordPress and WooCommerce. AI-powered design tools, real-time collaboration, and professional-grade features for creating and selling customizable products.
 * Version: 25.0.0
 * Author: PrintJones
 * Author URI: https://printjones.com
 * Text Domain: pj-product-designer
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * WC requires at least: 7.0
 * WC tested up to: 8.5
 */
```

---

## Table of Contents

1. [Executive Overview](#executive-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Directory Structure](#directory-structure)
4. [Database Schema](#database-schema)
5. [Core Systems](#core-systems)
6. [Feature Specifications](#feature-specifications)
7. [API Documentation](#api-documentation)
8. [Frontend Architecture](#frontend-architecture)
9. [Admin Interface](#admin-interface)
10. [Integration Points](#integration-points)
11. [Security & Performance](#security--performance)
12. [Development Guidelines](#development-guidelines)
13. [Testing Requirements](#testing-requirements)
14. [Deployment & DevOps](#deployment--devops)
15. [Roadmap](#roadmap)

---

## Executive Overview

### Vision Statement
PJ Product Designer is the world's most advanced WordPress product customization platform, combining professional-grade design tools with AI-powered features, real-time collaboration, and enterprise-ready infrastructure.

### Core Differentiators
1. **Real-Time Collaboration** - First product designer with Google Docs-style multi-user editing
2. **AI-Native Design** - Built-in AI for image generation, background removal, design suggestions
3. **Professional Tools** - Vector editor, advanced typography, Photoshop-grade filters
4. **Cross-Platform** - Web (PWA), Native Mobile (iOS/Android), Desktop (Electron), Browser Extensions
5. **Enterprise Ready** - Multi-tenant, SSO, white-label, comprehensive APIs
6. **Performance Leader** - WebGL rendering, WebAssembly image processing, sub-second load times
7. **Open Ecosystem** - Plugin marketplace, template marketplace, comprehensive developer platform

### Target Markets
- **Print-on-Demand** - T-shirts, apparel, promotional products
- **Print Services** - Business cards, invitations, banners, signage
- **Custom Manufacturing** - Phone cases, mugs, promotional items
- **Design Agencies** - White-label solution for clients
- **E-commerce Stores** - Personalized products at scale
- **Enterprise** - Corporate merchandise, team ordering

---

## Architecture & Technology Stack

### Core Technologies

#### Backend Stack
```yaml
WordPress: ≥ 6.0
PHP: ≥ 8.0 (8.2 recommended)
MySQL: ≥ 8.0
Redis: ≥ 7.0 (for caching & sessions)
Elasticsearch: ≥ 8.0 (for search)
Node.js: ≥ 18 LTS (for real-time services)
```

#### Frontend Stack
```yaml
Framework: Vue 3.4+ with TypeScript
State Management: Pinia
Build Tool: Vite 5+
Canvas Rendering: Three.js (WebGL) + Fabric.js
Image Processing: WebAssembly modules
UI Components: Custom design system + Headless UI
Styling: TailwindCSS 4.0
Icons: Heroicons + Custom SVG set
```

#### Admin Dashboard
```yaml
Framework: React 18+ with TypeScript
State: Zustand + React Query
UI Library: Shadcn/ui + Radix UI
Charts: Recharts + D3.js
Tables: TanStack Table
Forms: React Hook Form + Zod
```

#### Mobile Apps
```yaml
Framework: React Native 0.73+
Navigation: React Navigation
State: Zustand
UI: React Native Paper + Custom
API: React Query
Storage: MMKV
```

#### Real-Time Services
```yaml
WebSocket Server: Socket.io
Message Queue: RabbitMQ
Worker Processes: BullMQ
Collaboration: Y.js (CRDT)
```

#### AI/ML Services
```yaml
Text Generation: OpenAI GPT-4
Image Generation: Stable Diffusion XL
Background Removal: Custom ML models
Upscaling: Real-ESRGAN
Vector Generation: Custom transformer models
```

#### Infrastructure
```yaml
CDN: Cloudflare
Object Storage: S3-compatible
Container Platform: Docker + Kubernetes
CI/CD: GitHub Actions
Monitoring: Datadog + Sentry
```

### Architectural Patterns

#### 1. Headless/API-First Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                           │
│              (REST + GraphQL + WebSocket)                    │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼─────┐      ┌─────▼──────┐     ┌─────▼──────┐
   │   Web    │      │   Mobile   │     │  Desktop   │
   │  Client  │      │    Apps    │     │    Apps    │
   └──────────┘      └────────────┘     └────────────┘
```

#### 2. Monorepo Structure
```
pj-product-designer/
├── packages/
│   ├── core-engine/          # Canvas & design engine
│   ├── frontend/             # WordPress plugin
│   ├── admin-dashboard/      # React admin
│   ├── mobile-app/           # React Native
│   ├── desktop-app/          # Electron
│   ├── api-server/           # Node.js API
│   ├── worker-services/      # Background jobs
│   ├── shared-types/         # TypeScript definitions
│   ├── ui-components/        # Shared components
│   └── utilities/            # Shared utilities
```

#### 3. Plugin System Architecture
```typescript
interface PJPlugin {
  id: string;
  name: string;
  version: string;
  initialize: (api: PJDesignerAPI) => void;
  tools?: DesignTool[];
  panels?: Panel[];
  filters?: Filter[];
  exporters?: Exporter[];
}
```

---

## Directory Structure

### Complete Plugin Structure

```
pj-product-designer/
├── .github/                           # GitHub workflows
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   └── release.yml
│   └── ISSUE_TEMPLATE/
│
├── admin/                             # Admin dashboard
│   ├── react-app/                     # React application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── api/
│   │   │   ├── utils/
│   │   │   └── types/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   │
│   ├── classes/                       # PHP admin classes
│   │   ├── class-admin.php
│   │   ├── class-admin-ajax.php
│   │   ├── class-admin-api.php
│   │   ├── class-admin-menus.php
│   │   ├── class-admin-assets.php
│   │   └── class-admin-notices.php
│   │
│   ├── resources/                     # Resource handlers
│   │   ├── class-products-resource.php
│   │   ├── class-designs-resource.php
│   │   ├── class-templates-resource.php
│   │   ├── class-orders-resource.php
│   │   ├── class-analytics-resource.php
│   │   ├── class-teams-resource.php
│   │   └── class-marketplace-resource.php
│   │
│   └── views/                         # PHP view templates
│       ├── dashboard.php
│       ├── onboarding.php
│       └── maintenance.php
│
├── assets/                            # Frontend assets
│   ├── designer/                      # Main designer app
│   │   ├── src/
│   │   │   ├── core/                  # Core engine
│   │   │   │   ├── canvas/            # Canvas renderer
│   │   │   │   │   ├── WebGLRenderer.ts
│   │   │   │   │   ├── CanvasManager.ts
│   │   │   │   │   └── ViewportController.ts
│   │   │   │   ├── elements/          # Element system
│   │   │   │   │   ├── BaseElement.ts
│   │   │   │   │   ├── TextElement.ts
│   │   │   │   │   ├── ImageElement.ts
│   │   │   │   │   ├── VectorElement.ts
│   │   │   │   │   └── GroupElement.ts
│   │   │   │   ├── state/             # State management
│   │   │   │   │   ├── DocumentState.ts
│   │   │   │   │   ├── HistoryManager.ts
│   │   │   │   │   └── CollaborationSync.ts
│   │   │   │   ├── tools/             # Design tools
│   │   │   │   │   ├── SelectTool.ts
│   │   │   │   │   ├── PenTool.ts
│   │   │   │   │   ├── TextTool.ts
│   │   │   │   │   └── ShapeTool.ts
│   │   │   │   └── plugins/           # Plugin system
│   │   │   │       └── PluginManager.ts
│   │   │   │
│   │   │   ├── components/            # Vue components
│   │   │   │   ├── Canvas/
│   │   │   │   ├── Toolbar/
│   │   │   │   ├── Panels/
│   │   │   │   ├── Modals/
│   │   │   │   └── UI/
│   │   │   │
│   │   │   ├── stores/                # Pinia stores
│   │   │   │   ├── document.ts
│   │   │   │   ├── ui.ts
│   │   │   │   ├── collaboration.ts
│   │   │   │   └── ai.ts
│   │   │   │
│   │   │   ├── composables/           # Vue composables
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   └── workers/               # Web Workers
│   │   │       ├── image-processor.worker.ts
│   │   │       └── export.worker.ts
│   │   │
│   │   ├── wasm/                      # WebAssembly modules
│   │   │   ├── image-filters.wasm
│   │   │   ├── background-removal.wasm
│   │   │   └── upscaler.wasm
│   │   │
│   │   ├── public/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   │
│   ├── styles/                        # Global styles
│   │   ├── tailwind.css
│   │   ├── variables.css
│   │   └── animations.css
│   │
│   └── dist/                          # Built assets
│
├── inc/                               # Core PHP includes
│   ├── api/                           # API classes
│   │   ├── class-rest-api.php
│   │   ├── class-graphql-api.php
│   │   ├── endpoints/
│   │   │   ├── class-products-endpoint.php
│   │   │   ├── class-designs-endpoint.php
│   │   │   ├── class-templates-endpoint.php
│   │   │   ├── class-ai-endpoint.php
│   │   │   └── class-collaboration-endpoint.php
│   │   └── middleware/
│   │       ├── class-auth-middleware.php
│   │       ├── class-rate-limit-middleware.php
│   │       └── class-validation-middleware.php
│   │
│   ├── core/                          # Core classes
│   │   ├── class-product.php
│   │   ├── class-design.php
│   │   ├── class-template.php
│   │   ├── class-view.php
│   │   ├── class-element.php
│   │   ├── class-layer.php
│   │   └── class-asset.php
│   │
│   ├── features/                      # Feature modules
│   │   ├── collaboration/
│   │   │   ├── class-collaboration-manager.php
│   │   │   ├── class-presence.php
│   │   │   └── class-comments.php
│   │   ├── ai/
│   │   │   ├── class-ai-manager.php
│   │   │   ├── class-text-generator.php
│   │   │   ├── class-image-generator.php
│   │   │   └── class-design-assistant.php
│   │   ├── export/
│   │   │   ├── class-export-manager.php
│   │   │   ├── class-pdf-exporter.php
│   │   │   ├── class-svg-exporter.php
│   │   │   └── class-print-ready-exporter.php
│   │   ├── pricing/
│   │   │   ├── class-pricing-engine.php
│   │   │   ├── class-pricing-rule.php
│   │   │   └── class-dynamic-pricing.php
│   │   ├── analytics/
│   │   │   ├── class-analytics-tracker.php
│   │   │   ├── class-design-analytics.php
│   │   │   └── class-conversion-tracker.php
│   │   └── marketplace/
│   │       ├── class-marketplace.php
│   │       ├── class-seller.php
│   │       └── class-transaction.php
│   │
│   ├── integrations/                  # Third-party integrations
│   │   ├── woocommerce/
│   │   │   ├── class-wc-integration.php
│   │   │   ├── class-wc-product.php
│   │   │   ├── class-wc-cart.php
│   │   │   ├── class-wc-order.php
│   │   │   └── class-wc-ajax.php
│   │   ├── shopify/
│   │   ├── printful/
│   │   ├── printify/
│   │   ├── stripe/
│   │   └── mailchimp/
│   │
│   ├── services/                      # Service classes
│   │   ├── class-cache-service.php
│   │   ├── class-storage-service.php
│   │   ├── class-cdn-service.php
│   │   ├── class-email-service.php
│   │   ├── class-notification-service.php
│   │   └── class-queue-service.php
│   │
│   ├── settings/                      # Settings system
│   │   ├── class-settings-manager.php
│   │   ├── class-general-settings.php
│   │   ├── class-design-settings.php
│   │   ├── class-performance-settings.php
│   │   ├── class-security-settings.php
│   │   └── class-integration-settings.php
│   │
│   ├── frontend/                      # Frontend handlers
│   │   ├── class-frontend.php
│   │   ├── class-shortcodes.php
│   │   ├── class-widgets.php
│   │   └── class-blocks.php
│   │
│   ├── utilities/                     # Utility classes
│   │   ├── class-helpers.php
│   │   ├── class-validator.php
│   │   ├── class-sanitizer.php
│   │   ├── class-image-processor.php
│   │   └── class-file-manager.php
│   │
│   ├── class-installer.php            # Installation handler
│   ├── class-updater.php              # Update handler
│   ├── class-activator.php            # Activation handler
│   ├── class-deactivator.php          # Deactivation handler
│   └── functions.php                  # Global functions
│
├── languages/                         # Translation files
│   ├── pj-product-designer.pot
│   └── [language-files].po/.mo
│
├── node-services/                     # Node.js microservices
│   ├── websocket-server/              # WebSocket server
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── collaboration.ts
│   │   │   ├── presence.ts
│   │   │   └── sync.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ai-service/                    # AI service wrapper
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── text-generation.ts
│   │   │   ├── image-generation.ts
│   │   │   └── background-removal.ts
│   │   └── package.json
│   │
│   ├── export-service/                # Export service
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── pdf-generator.ts
│   │   │   └── image-optimizer.ts
│   │   └── package.json
│   │
│   └── worker-service/                # Background workers
│       ├── src/
│       │   ├── workers/
│       │   │   ├── export-worker.ts
│       │   │   ├── analytics-worker.ts
│       │   │   └── cleanup-worker.ts
│       │   └── server.ts
│       └── package.json
│
├── templates/                         # PHP templates
│   ├── designer/
│   │   ├── designer.php
│   │   ├── canvas.php
│   │   └── toolbar.php
│   ├── product/
│   │   ├── product-page.php
│   │   └── customize-button.php
│   └── widgets/
│
├── tests/                             # Test suites
│   ├── php/                           # PHP tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── js/                            # JavaScript tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   └── fixtures/
│
├── vendor/                            # Composer dependencies
│
├── docs/                              # Documentation
│   ├── api/
│   ├── developer/
│   ├── user-guide/
│   └── deployment/
│
├── .env.example                       # Environment template
├── .gitignore
├── composer.json
├── composer.lock
├── package.json
├── pnpm-workspace.yaml
├── phpcs.xml
├── phpunit.xml
├── webpack.config.js
├── constants.php                      # Plugin constants
├── pj-product-designer.php           # Main plugin file
└── readme.txt                         # WordPress readme
```

---

## Database Schema

### Custom Tables

#### 1. `wp_pjpd_products`
Designer product definitions
```sql
CREATE TABLE `wp_pjpd_products` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `thumbnail` VARCHAR(512),
  `settings` LONGTEXT, -- JSON
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  `user_id` BIGINT(20) UNSIGNED,
  `team_id` BIGINT(20) UNSIGNED,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `version` INT(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `slug` (`slug`),
  KEY `user_id` (`user_id`),
  KEY `team_id` (`team_id`),
  KEY `status` (`status`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 2. `wp_pjpd_views`
Product views/sides
```sql
CREATE TABLE `wp_pjpd_views` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `product_id` BIGINT(20) UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `thumbnail` VARCHAR(512),
  `background_image` VARCHAR(512),
  `background_color` VARCHAR(7),
  `width` INT(11) NOT NULL,
  `height` INT(11) NOT NULL,
  `order` INT(11) DEFAULT 0,
  `settings` LONGTEXT, -- JSON
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `product_id` (`product_id`),
  KEY `order` (`order`),
  FOREIGN KEY (`product_id`) REFERENCES `wp_pjpd_products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3. `wp_pjpd_elements`
Design elements within views
```sql
CREATE TABLE `wp_pjpd_elements` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `view_id` BIGINT(20) UNSIGNED NOT NULL,
  `type` ENUM('text', 'image', 'vector', 'group', 'shape') NOT NULL,
  `title` VARCHAR(255),
  `layer_name` VARCHAR(255),
  `properties` LONGTEXT NOT NULL, -- JSON
  `order` INT(11) DEFAULT 0,
  `locked` TINYINT(1) DEFAULT 0,
  `visible` TINYINT(1) DEFAULT 1,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `view_id` (`view_id`),
  KEY `type` (`type`),
  KEY `order` (`order`),
  FOREIGN KEY (`view_id`) REFERENCES `wp_pjpd_views` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4. `wp_pjpd_designs`
User-saved designs
```sql
CREATE TABLE `wp_pjpd_designs` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `product_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_id` BIGINT(20) UNSIGNED,
  `session_id` VARCHAR(64),
  `title` VARCHAR(255),
  `thumbnail` VARCHAR(512),
  `preview_images` TEXT, -- JSON array
  `design_data` LONGTEXT NOT NULL, -- JSON
  `status` ENUM('draft', 'completed', 'ordered') DEFAULT 'draft',
  `visibility` ENUM('private', 'public', 'team') DEFAULT 'private',
  `metadata` LONGTEXT, -- JSON
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `expires_at` DATETIME,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  KEY `session_id` (`session_id`),
  KEY `status` (`status`),
  KEY `visibility` (`visibility`),
  KEY `created_at` (`created_at`),
  FULLTEXT KEY `search` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 5. `wp_pjpd_templates`
Design templates
```sql
CREATE TABLE `wp_pjpd_templates` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `product_id` BIGINT(20) UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `thumbnail` VARCHAR(512),
  `preview_images` TEXT, -- JSON array
  `template_data` LONGTEXT NOT NULL, -- JSON
  `category` VARCHAR(100),
  `tags` TEXT, -- JSON array
  `price` DECIMAL(10, 2) DEFAULT 0.00,
  `downloads` INT(11) DEFAULT 0,
  `rating` DECIMAL(3, 2) DEFAULT 0.00,
  `seller_id` BIGINT(20) UNSIGNED,
  `status` ENUM('draft', 'published', 'rejected') DEFAULT 'draft',
  `featured` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `product_id` (`product_id`),
  KEY `seller_id` (`seller_id`),
  KEY `category` (`category`),
  KEY `status` (`status`),
  KEY `featured` (`featured`),
  KEY `rating` (`rating`),
  FULLTEXT KEY `search` (`title`, `description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 6. `wp_pjpd_orders`
Design orders
```sql
CREATE TABLE `wp_pjpd_orders` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `order_type` ENUM('woocommerce', 'shortcode', 'quote') NOT NULL,
  `order_id` BIGINT(20) UNSIGNED, -- WC order ID
  `order_item_id` BIGINT(20) UNSIGNED, -- WC order item ID
  `design_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_id` BIGINT(20) UNSIGNED,
  `customer_email` VARCHAR(255),
  `order_data` LONGTEXT NOT NULL, -- JSON
  `export_files` TEXT, -- JSON array of file URLs
  `production_files` TEXT, -- JSON array of print-ready files
  `status` ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `order_id` (`order_id`),
  KEY `design_id` (`design_id`),
  KEY `user_id` (`user_id`),
  KEY `status` (`status`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 7. `wp_pjpd_assets`
Design assets library
```sql
CREATE TABLE `wp_pjpd_assets` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `type` ENUM('image', 'vector', 'font', 'pattern', '3d-model') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `file_url` VARCHAR(512) NOT NULL,
  `thumbnail_url` VARCHAR(512),
  `file_size` BIGINT(20),
  `mime_type` VARCHAR(100),
  `dimensions` VARCHAR(50), -- e.g., "1920x1080"
  `category` VARCHAR(100),
  `tags` TEXT, -- JSON array
  `license` VARCHAR(100),
  `user_id` BIGINT(20) UNSIGNED,
  `team_id` BIGINT(20) UNSIGNED,
  `visibility` ENUM('private', 'team', 'public') DEFAULT 'private',
  `metadata` LONGTEXT, -- JSON
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `type` (`type`),
  KEY `category` (`category`),
  KEY `user_id` (`user_id`),
  KEY `team_id` (`team_id`),
  KEY `visibility` (`visibility`),
  FULLTEXT KEY `search` (`title`, `tags`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 8. `wp_pjpd_teams`
Team management
```sql
CREATE TABLE `wp_pjpd_teams` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `logo` VARCHAR(512),
  `owner_id` BIGINT(20) UNSIGNED NOT NULL,
  `plan` ENUM('free', 'pro', 'business', 'enterprise') DEFAULT 'free',
  `settings` LONGTEXT, -- JSON
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `slug` (`slug`),
  KEY `owner_id` (`owner_id`),
  KEY `plan` (`plan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 9. `wp_pjpd_team_members`
Team membership
```sql
CREATE TABLE `wp_pjpd_team_members` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `team_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_id` BIGINT(20) UNSIGNED NOT NULL,
  `role` ENUM('owner', 'admin', 'editor', 'viewer') NOT NULL,
  `permissions` TEXT, -- JSON array
  `joined_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_user` (`team_id`, `user_id`),
  KEY `user_id` (`user_id`),
  FOREIGN KEY (`team_id`) REFERENCES `wp_pjpd_teams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 10. `wp_pjpd_collaboration_sessions`
Real-time collaboration sessions
```sql
CREATE TABLE `wp_pjpd_collaboration_sessions` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` CHAR(36) NOT NULL,
  `design_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_id` BIGINT(20) UNSIGNED,
  `socket_id` VARCHAR(64),
  `cursor_position` VARCHAR(50), -- JSON: {x, y}
  `active_element` CHAR(36),
  `last_activity` DATETIME NOT NULL,
  `joined_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_id` (`session_id`),
  KEY `design_id` (`design_id`),
  KEY `user_id` (`user_id`),
  KEY `last_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 11. `wp_pjpd_comments`
Design comments
```sql
CREATE TABLE `wp_pjpd_comments` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `design_id` BIGINT(20) UNSIGNED NOT NULL,
  `element_id` CHAR(36),
  `user_id` BIGINT(20) UNSIGNED NOT NULL,
  `parent_id` BIGINT(20) UNSIGNED, -- For replies
  `content` TEXT NOT NULL,
  `position` VARCHAR(50), -- JSON: {x, y}
  `resolved` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `design_id` (`design_id`),
  KEY `user_id` (`user_id`),
  KEY `parent_id` (`parent_id`),
  KEY `resolved` (`resolved`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 12. `wp_pjpd_pricing_rules`
Dynamic pricing rules
```sql
CREATE TABLE `wp_pjpd_pricing_rules` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `rule_type` ENUM('element_count', 'color_count', 'text_length', 'area', 'custom') NOT NULL,
  `conditions` LONGTEXT NOT NULL, -- JSON
  `formula` TEXT NOT NULL,
  `priority` INT(11) DEFAULT 0,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `applies_to` TEXT, -- JSON: product IDs or 'all'
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `status` (`status`),
  KEY `priority` (`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 13. `wp_pjpd_analytics_events`
Analytics tracking
```sql
CREATE TABLE `wp_pjpd_analytics_events` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_type` VARCHAR(100) NOT NULL,
  `event_name` VARCHAR(255) NOT NULL,
  `design_id` BIGINT(20) UNSIGNED,
  `product_id` BIGINT(20) UNSIGNED,
  `user_id` BIGINT(20) UNSIGNED,
  `session_id` VARCHAR(64),
  `properties` LONGTEXT, -- JSON
  `user_agent` VARCHAR(512),
  `ip_address` VARCHAR(45),
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_type` (`event_type`),
  KEY `design_id` (`design_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  KEY `session_id` (`session_id`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 14. `wp_pjpd_marketplace_transactions`
Marketplace purchases
```sql
CREATE TABLE `wp_pjpd_marketplace_transactions` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `transaction_type` ENUM('template_purchase', 'asset_purchase', 'subscription') NOT NULL,
  `item_id` BIGINT(20) UNSIGNED NOT NULL,
  `buyer_id` BIGINT(20) UNSIGNED NOT NULL,
  `seller_id` BIGINT(20) UNSIGNED NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `commission` DECIMAL(10, 2) NOT NULL,
  `seller_payout` DECIMAL(10, 2) NOT NULL,
  `currency` VARCHAR(3) DEFAULT 'USD',
  `payment_method` VARCHAR(50),
  `status` ENUM('pending', 'completed', 'refunded', 'failed') DEFAULT 'pending',
  `metadata` LONGTEXT, -- JSON
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `buyer_id` (`buyer_id`),
  KEY `seller_id` (`seller_id`),
  KEY `status` (`status`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 15. `wp_pjpd_ai_usage`
AI service usage tracking
```sql
CREATE TABLE `wp_pjpd_ai_usage` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) UNSIGNED NOT NULL,
  `team_id` BIGINT(20) UNSIGNED,
  `service_type` ENUM('text_generation', 'image_generation', 'background_removal', 'upscaling', 'vector_generation') NOT NULL,
  `credits_used` INT(11) NOT NULL,
  `request_data` LONGTEXT, -- JSON
  `response_data` LONGTEXT, -- JSON
  `execution_time` INT(11), -- milliseconds
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `team_id` (`team_id`),
  KEY `service_type` (`service_type`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Database Indexes Strategy

#### Performance Indexes
```sql
-- Composite indexes for common queries
CREATE INDEX idx_designs_user_status ON wp_pjpd_designs (user_id, status, created_at);
CREATE INDEX idx_products_team_status ON wp_pjpd_products (team_id, status, updated_at);
CREATE INDEX idx_templates_category_rating ON wp_pjpd_templates (category, rating DESC, downloads DESC);
CREATE INDEX idx_orders_status_date ON wp_pjpd_orders (status, created_at);
CREATE INDEX idx_analytics_user_date ON wp_pjpd_analytics_events (user_id, event_type, created_at);
```

#### Full-Text Search Indexes
```sql
-- For better search performance
ALTER TABLE wp_pjpd_designs ADD FULLTEXT INDEX ft_design_search (title);
ALTER TABLE wp_pjpd_templates ADD FULLTEXT INDEX ft_template_search (title, description, tags);
ALTER TABLE wp_pjpd_assets ADD FULLTEXT INDEX ft_asset_search (title, tags);
```

---

## Core Systems

### 1. Canvas Engine System

#### WebGL Renderer
```typescript
// packages/core-engine/src/canvas/WebGLRenderer.ts

export class WebGLRenderer {
  private gl: WebGL2RenderingContext;
  private scene: Scene;
  private camera: Camera;
  private viewport: Viewport;
  
  constructor(canvas: HTMLCanvasElement) {
    this.gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    
    this.initializeWebGL();
  }
  
  private initializeWebGL(): void {
    // Enable features
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.DEPTH_TEST);
    
    // Set clear color
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
  }
  
  public render(elements: Element[]): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Sort elements by z-index
    const sorted = this.sortByZIndex(elements);
    
    // Render each element
    for (const element of sorted) {
      this.renderElement(element);
    }
  }
  
  private renderElement(element: Element): void {
    switch (element.type) {
      case 'text':
        this.renderText(element as TextElement);
        break;
      case 'image':
        this.renderImage(element as ImageElement);
        break;
      case 'vector':
        this.renderVector(element as VectorElement);
        break;
      case 'group':
        this.renderGroup(element as GroupElement);
        break;
    }
  }
  
  public exportToBlob(format: 'png' | 'jpg', quality: number): Promise<Blob> {
    return new Promise((resolve) => {
      this.gl.canvas.toBlob((blob) => {
        resolve(blob);
      }, `image/${format}`, quality);
    });
  }
}
```

#### Element System
```typescript
// packages/core-engine/src/elements/BaseElement.ts

export abstract class BaseElement {
  public id: string;
  public type: ElementType;
  public name: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public rotation: number;
  public opacity: number;
  public visible: boolean;
  public locked: boolean;
  public zIndex: number;
  public blendMode: BlendMode;
  public filters: Filter[];
  public transformMatrix: Matrix;
  
  constructor(properties: ElementProperties) {
    this.id = properties.id || generateUUID();
    this.type = properties.type;
    // ... initialize properties
  }
  
  public abstract render(renderer: Renderer): void;
  public abstract getBounds(): BoundingBox;
  public abstract clone(): BaseElement;
  public abstract toJSON(): object;
  
  public transform(matrix: Matrix): void {
    this.transformMatrix = this.transformMatrix.multiply(matrix);
    this.updatePosition();
  }
  
  public applyFilter(filter: Filter): void {
    this.filters.push(filter);
  }
  
  public setProperty(key: string, value: any): void {
    (this as any)[key] = value;
    this.emit('propertyChange', { key, value });
  }
}
```

#### Text Element with Advanced Typography
```typescript
// packages/core-engine/src/elements/TextElement.ts

export class TextElement extends BaseElement {
  public text: string;
  public fontFamily: string;
  public fontSize: number;
  public fontWeight: number;
  public fontStyle: 'normal' | 'italic';
  public letterSpacing: number;
  public lineHeight: number;
  public textAlign: 'left' | 'center' | 'right' | 'justify';
  public textDecoration: string[];
  public textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  public fill: Fill;
  public stroke: Stroke;
  public shadow: Shadow;
  public effects: TextEffect[];
  public path?: Path; // For text on path
  public shape?: Shape; // For text in shape
  
  public render(renderer: Renderer): void {
    // Apply OpenType features
    this.applyOpenTypeFeatures();
    
    // Render based on mode
    if (this.path) {
      this.renderTextOnPath(renderer);
    } else if (this.shape) {
      this.renderTextInShape(renderer);
    } else {
      this.renderNormalText(renderer);
    }
    
    // Apply effects
    this.applyEffects(renderer);
  }
  
  private applyOpenTypeFeatures(): void {
    // Enable ligatures, stylistic sets, etc.
    const features = [];
    if (this.enableLigatures) features.push('liga');
    if (this.stylisticSet) features.push(`ss${this.stylisticSet.padStart(2, '0')}`);
    
    this.fontFeatureSettings = features.join(',');
  }
  
  private renderTextOnPath(renderer: Renderer): void {
    const points = this.path.getPoints();
    let distance = 0;
    
    for (const char of this.text) {
      const point = this.path.getPointAtLength(distance);
      const angle = this.path.getAngleAtLength(distance);
      
      renderer.save();
      renderer.translate(point.x, point.y);
      renderer.rotate(angle);
      renderer.fillText(char, 0, 0);
      renderer.restore();
      
      distance += this.getCharWidth(char);
    }
  }
}
```

### 2. State Management System

#### Document State with CRDT
```typescript
// packages/core-engine/src/state/DocumentState.ts

import * as Y from 'yjs';

export class DocumentState {
  private ydoc: Y.Doc;
  private elements: Y.Map<Element>;
  private history: Y.UndoManager;
  private observers: Map<string, Function>;
  
  constructor() {
    this.ydoc = new Y.Doc();
    this.elements = this.ydoc.getMap('elements');
    this.history = new Y.UndoManager(this.elements);
    this.observers = new Map();
    
    this.setupObservers();
  }
  
  private setupObservers(): void {
    this.elements.observe((event) => {
      event.changes.keys.forEach((change, key) => {
        if (change.action === 'add' || change.action === 'update') {
          this.emit('element:change', {
            id: key,
            element: this.elements.get(key)
          });
        } else if (change.action === 'delete') {
          this.emit('element:delete', { id: key });
        }
      });
    });
  }
  
  // Element operations
  public addElement(element: Element): void {
    this.elements.set(element.id, element.toJSON());
  }
  
  public updateElement(id: string, properties: Partial<Element>): void {
    const element = this.elements.get(id);
    if (element) {
      this.elements.set(id, { ...element, ...properties });
    }
  }
  
  public deleteElement(id: string): void {
    this.elements.delete(id);
  }
  
  public getElement(id: string): Element | undefined {
    return this.elements.get(id);
  }
  
  public getAllElements(): Element[] {
    return Array.from(this.elements.values());
  }
  
  // History operations
  public undo(): void {
    this.history.undo();
  }
  
  public redo(): void {
    this.history.redo();
  }
  
  public canUndo(): boolean {
    return this.history.canUndo();
  }
  
  public canRedo(): boolean {
    return this.history.canRedo();
  }
  
  // Collaboration sync
  public encodeStateAsUpdate(): Uint8Array {
    return Y.encodeStateAsUpdate(this.ydoc);
  }
  
  public applyUpdate(update: Uint8Array): void {
    Y.applyUpdate(this.ydoc, update);
  }
  
  // Serialization
  public toJSON(): object {
    return {
      elements: Array.from(this.elements.entries()).map(([id, element]) => ({
        id,
        ...element
      }))
    };
  }
  
  public fromJSON(data: any): void {
    data.elements.forEach((element: any) => {
      this.elements.set(element.id, element);
    });
  }
}
```

### 3. Real-Time Collaboration System

#### WebSocket Server
```typescript
// node-services/websocket-server/src/collaboration.ts

import { Server, Socket } from 'socket.io';
import { Redis } from 'ioredis';
import * as Y from 'yjs';

export class CollaborationServer {
  private io: Server;
  private redis: Redis;
  private documents: Map<string, Y.Doc>;
  private connections: Map<string, Set<Socket>>;
  
  constructor(io: Server, redis: Redis) {
    this.io = io;
    this.redis = redis;
    this.documents = new Map();
    this.connections = new Map();
    
    this.setupHandlers();
  }
  
  private setupHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);
      
      socket.on('join:design', (data) => this.handleJoinDesign(socket, data));
      socket.on('leave:design', (data) => this.handleLeaveDesign(socket, data));
      socket.on('sync:update', (data) => this.handleSyncUpdate(socket, data));
      socket.on('cursor:move', (data) => this.handleCursorMove(socket, data));
      socket.on('selection:change', (data) => this.handleSelectionChange(socket, data));
      socket.on('disconnect', () => this.handleDisconnect(socket));
    });
  }
  
  private async handleJoinDesign(socket: Socket, data: { designId: string, userId: string }): Promise<void> {
    const { designId, userId } = data;
    
    // Join room
    socket.join(`design:${designId}`);
    
    // Track connection
    if (!this.connections.has(designId)) {
      this.connections.set(designId, new Set());
    }
    this.connections.get(designId)!.add(socket);
    
    // Get or create document
    let ydoc = this.documents.get(designId);
    if (!ydoc) {
      ydoc = new Y.Doc();
      this.documents.set(designId, ydoc);
      
      // Load from database
      const savedState = await this.loadDesignState(designId);
      if (savedState) {
        Y.applyUpdate(ydoc, savedState);
      }
    }
    
    // Send current state to new client
    const state = Y.encodeStateAsUpdate(ydoc);
    socket.emit('sync:state', { state });
    
    // Get active users
    const activeUsers = await this.getActiveUsers(designId);
    
    // Notify others
    socket.to(`design:${designId}`).emit('user:joined', {
      userId,
      socketId: socket.id,
      activeUsers: activeUsers.length + 1
    });
    
    // Send active users to new client
    socket.emit('users:active', { users: activeUsers });
  }
  
  private handleSyncUpdate(socket: Socket, data: { designId: string, update: Uint8Array }): void {
    const { designId, update } = data;
    
    // Get document
    const ydoc = this.documents.get(designId);
    if (!ydoc) return;
    
    // Apply update
    Y.applyUpdate(ydoc, new Uint8Array(update));
    
    // Broadcast to others
    socket.to(`design:${designId}`).emit('sync:update', { update });
    
    // Save to Redis (debounced)
    this.saveDesignState(designId, Y.encodeStateAsUpdate(ydoc));
  }
  
  private handleCursorMove(socket: Socket, data: { designId: string, position: { x: number, y: number } }): void {
    const { designId, position } = data;
    
    // Broadcast cursor position
    socket.to(`design:${designId}`).emit('cursor:move', {
      socketId: socket.id,
      position
    });
  }
  
  private handleSelectionChange(socket: Socket, data: { designId: string, elementIds: string[] }): void {
    const { designId, elementIds } = data;
    
    // Broadcast selection
    socket.to(`design:${designId}`).emit('selection:change', {
      socketId: socket.id,
      elementIds
    });
  }
  
  private handleLeaveDesign(socket: Socket, data: { designId: string, userId: string }): void {
    const { designId, userId } = data;
    
    socket.leave(`design:${designId}`);
    
    // Remove from connections
    const connections = this.connections.get(designId);
    if (connections) {
      connections.delete(socket);
      if (connections.size === 0) {
        this.connections.delete(designId);
        // Clean up document after some time
        setTimeout(() => this.cleanupDocument(designId), 5 * 60 * 1000);
      }
    }
    
    // Notify others
    socket.to(`design:${designId}`).emit('user:left', {
      userId,
      socketId: socket.id
    });
  }
  
  private async saveDesignState(designId: string, state: Uint8Array): Promise<void> {
    await this.redis.setex(
      `design:state:${designId}`,
      3600, // 1 hour TTL
      Buffer.from(state).toString('base64')
    );
  }
  
  private async loadDesignState(designId: string): Promise<Uint8Array | null> {
    const state = await this.redis.get(`design:state:${designId}`);
    return state ? Buffer.from(state, 'base64') : null;
  }
}
```

### 4. AI Integration System

#### AI Service Manager
```typescript
// packages/core-engine/src/ai/AIServiceManager.ts

export class AIServiceManager {
  private openai: OpenAI;
  private stability: StabilityAI;
  private replicate: Replicate;
  private customModels: Map<string, CustomModel>;
  
  constructor(config: AIConfig) {
    this.openai = new OpenAI(config.openai);
    this.stability = new StabilityAI(config.stability);
    this.replicate = new Replicate(config.replicate);
    this.customModels = new Map();
  }
  
  // Text generation
  public async generateText(prompt: string, options: TextGenerationOptions): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: options.systemPrompt || 'You are a creative design assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 500
    });
    
    return response.choices[0].message.content;
  }
  
  // Image generation
  public async generateImage(prompt: string, options: ImageGenerationOptions): Promise<string> {
    const response = await this.stability.generateImage({
      prompt,
      negative_prompt: options.negativePrompt,
      width: options.width || 1024,
      height: options.height || 1024,
      steps: options.steps || 30,
      cfg_scale: options.cfgScale || 7,
      style_preset: options.style
    });
    
    return response.imageUrl;
  }
  
  // Background removal
  public async removeBackground(imageUrl: string): Promise<Blob> {
    const response = await fetch('/api/ai/remove-background', {
      method: 'POST',
      body: JSON.stringify({ imageUrl }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    return await response.blob();
  }
  
  // Image upscaling
  public async upscaleImage(imageUrl: string, scale: number): Promise<string> {
    const output = await this.replicate.run(
      'nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b',
      {
        input: {
          image: imageUrl,
          scale: scale
        }
      }
    );
    
    return output;
  }
  
  // Design suggestions
  public async suggestDesignImprovements(designData: DesignData): Promise<Suggestion[]> {
    const analysisPrompt = this.buildDesignAnalysisPrompt(designData);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert design critic. Analyze designs and provide actionable improvements.' },
        { role: 'user', content: analysisPrompt }
      ],
      temperature: 0.5
    });
    
    return this.parseSuggestions(response.choices[0].message.content);
  }
  
  // Color palette generation
  public async generateColorPalette(imageUrl: string): Promise<ColorPalette> {
    const response = await fetch('/api/ai/extract-colors', {
      method: 'POST',
      body: JSON.stringify({ imageUrl }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const colors = await response.json();
    
    // Generate harmonious palette
    return this.buildHarmoniousPalette(colors);
  }
  
  // Font pairing suggestions
  public async suggestFontPairings(context: string): Promise<FontPairing[]> {
    const prompt = `Suggest 5 professional font pairings for: ${context}`;
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a typography expert. Suggest font pairings with rationale.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    });
    
    return this.parseFontPairings(response.choices[0].message.content);
  }
  
  // Layout suggestions
  public async suggestLayouts(elements: Element[], dimensions: Dimensions): Promise<Layout[]> {
    const layoutPrompt = this.buildLayoutPrompt(elements, dimensions);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a layout design expert. Suggest optimal element arrangements.' },
        { role: 'user', content: layoutPrompt }
      ],
      temperature: 0.6
    });
    
    return this.parseLayoutSuggestions(response.choices[0].message.content);
  }
}
```

### 5. Export System

#### Multi-Format Exporter
```typescript
// packages/core-engine/src/export/ExportManager.ts

export class ExportManager {
  private pdfGenerator: PDFGenerator;
  private svgGenerator: SVGGenerator;
  private imageOptimizer: ImageOptimizer;
  
  constructor() {
    this.pdfGenerator = new PDFGenerator();
    this.svgGenerator = new SVGGenerator();
    this.imageOptimizer = new ImageOptimizer();
  }
  
  // Export to PNG/JPG
  public async exportImage(
    document: Document,
    options: ImageExportOptions
  ): Promise<Blob> {
    const canvas = await this.renderToCanvas(document, options);
    
    // Apply optimization
    const blob = await canvas.toBlob(
      options.format === 'jpg' ? 'image/jpeg' : 'image/png',
      options.quality || 0.92
    );
    
    if (options.optimize) {
      return await this.imageOptimizer.optimize(blob, options);
    }
    
    return blob;
  }
  
  // Export to PDF (print-ready)
  public async exportPDF(
    document: Document,
    options: PDFExportOptions
  ): Promise<Blob> {
    const pdf = this.pdfGenerator.create({
      size: [document.width, document.height],
      unit: options.unit || 'mm',
      compress: options.compress !== false
    });
    
    // Add metadata
    pdf.setProperties({
      title: document.title,
      author: 'PJ Product Designer',
      creator: 'PJ Product Designer v25.0.0'
    });
    
    // Render elements
    for (const view of document.views) {
      pdf.addPage();
      
      for (const element of view.elements) {
        await this.renderElementToPDF(pdf, element, options);
      }
    }
    
    // Add bleed if requested
    if (options.addBleed) {
      pdf.addBleed(options.bleedSize || 3);
    }
    
    // Add crop marks if requested
    if (options.addCropMarks) {
      pdf.addCropMarks();
    }
    
    // Convert to CMYK if requested
    if (options.colorMode === 'cmyk') {
      pdf.convertToCMYK();
    }
    
    return pdf.toBlob();
  }
  
  // Export to SVG
  public async exportSVG(
    document: Document,
    options: SVGExportOptions
  ): Promise<string> {
    const svg = this.svgGenerator.create({
      width: document.width,
      height: document.height,
      viewBox: `0 0 ${document.width} ${document.height}`
    });
    
    // Render elements
    for (const element of document.elements) {
      const svgElement = await this.convertElementToSVG(element, options);
      svg.appendChild(svgElement);
    }
    
    // Optimize if requested
    if (options.optimize) {
      return this.svgGenerator.optimize(svg.toString());
    }
    
    return svg.toString();
  }
  
  // Export print-ready files (multi-format)
  public async exportPrintReady(
    document: Document,
    options: PrintReadyExportOptions
  ): Promise<PrintReadyPackage> {
    const files: Map<string, Blob> = new Map();
    
    // Generate PDF
    if (options.includePDF) {
      const pdf = await this.exportPDF(document, {
        colorMode: 'cmyk',
        addBleed: true,
        addCropMarks: true,
        ...options.pdfOptions
      });
      files.set('print-ready.pdf', pdf);
    }
    
    // Generate high-res images
    if (options.includeImages) {
      for (const view of document.views) {
        const image = await this.exportImage(view, {
          format: 'png',
          scale: options.imageScale || 3,
          dpi: 300
        });
        files.set(`view-${view.id}.png`, image);
      }
    }
    
    // Generate SVG
    if (options.includeSVG) {
      const svg = await this.exportSVG(document, {
        optimize: true
      });
      files.set('design.svg', new Blob([svg], { type: 'image/svg+xml' }));
    }
    
    // Generate JSON
    if (options.includeJSON) {
      const json = JSON.stringify(document.toJSON(), null, 2);
      files.set('design.json', new Blob([json], { type: 'application/json' }));
    }
    
    // Create ZIP
    const zip = new JSZip();
    files.forEach((blob, filename) => {
      zip.file(filename, blob);
    });
    
    // Add README
    zip.file('README.txt', this.generateReadme(document, options));
    
    return {
      zip: await zip.generateAsync({ type: 'blob' }),
      files: Array.from(files.keys())
    };
  }
}
```

---

## Feature Specifications

### 1. Advanced Design Tools

#### Vector Editor Features
```typescript
// Tool specifications

interface VectorTool {
  // Pen Tool
  penTool: {
    modes: ['draw', 'edit', 'convert'];
    features: [
      'bezier-curves',
      'smooth-corners',
      'sharp-corners',
      'auto-close-path',
      'path-joining',
      'node-editing'
    ];
  };
  
  // Shape Builder
  shapeBuilder: {
    operations: ['unite', 'subtract', 'intersect', 'exclude'];
    smartGuides: true;
    snapToGrid: true;
    snapToPoints: true;
  };
  
  // Pathfinder
  pathfinder: {
    operations: [
      'unite',
      'minus-front',
      'intersect',
      'exclude',
      'divide',
      'trim',
      'merge',
      'crop',
      'outline',
      'minus-back'
    ];
  };
}
```

#### Typography System
```typescript
interface TypographyFeatures {
  // Variable Fonts
  variableFonts: {
    axes: ['weight', 'width', 'slant', 'optical-size'];
    customAxes: true;
    livePreview: true;
  };
  
  // OpenType Features
  openType: {
    features: [
      'ligatures',
      'stylistic-sets',
      'swashes',
      'alternates',
      'small-caps',
      'old-style-figures',
      'tabular-figures'
    ];
    autoActivation: true;
  };
  
  // Text Effects
  effects: {
    '3d-extrusion': {
      depth: number;
      perspective: number;
      lighting: LightingOptions;
    };
    'gradient-fill': {
      type: 'linear' | 'radial' | 'angular' | 'diamond';
      stops: ColorStop[];
    };
    'pattern-fill': {
      pattern: Pattern;
      scale: number;
      rotation: number;
    };
    'neon-effect': {
      glowColor: string;
      glowIntensity: number;
      strokeWidth: number;
    };
  };
  
  // Advanced Layout
  layout: {
    textOnPath: {
      path: Path;
      alignment: 'left' | 'center' | 'right';
      baseline: 'top' | 'center' | 'bottom';
      spacing: number;
    };
    textInShape: {
      shape: Shape;
      columns: number;
      padding: number;
      verticalAlign: 'top' | 'middle' | 'bottom';
    };
    multiColumn: {
      columns: number;
      gap: number;
      balanceColumns: boolean;
    };
  };
}
```

#### Layer System
```typescript
interface LayerSystemFeatures {
  // Layer Types
  layerTypes: [
    'normal',
    'adjustment',
    'smart-object',
    'group'
  ];
  
  // Blend Modes
  blendModes: [
    'normal', 'dissolve',
    'darken', 'multiply', 'color-burn', 'linear-burn', 'darker-color',
    'lighten', 'screen', 'color-dodge', 'linear-dodge', 'lighter-color',
    'overlay', 'soft-light', 'hard-light', 'vivid-light', 'linear-light', 'pin-light', 'hard-mix',
    'difference', 'exclusion', 'subtract', 'divide',
    'hue', 'saturation', 'color', 'luminosity'
  ];
  
  // Layer Styles
  styles: {
    dropShadow: {
      color: string;
      offsetX: number;
      offsetY: number;
      blur: number;
      spread: number;
      opacity: number;
      multiple: true;
    };
    innerShadow: DropShadowOptions;
    outerGlow: GlowOptions;
    innerGlow: GlowOptions;
    bevelEmboss: {
      style: 'outer-bevel' | 'inner-bevel' | 'emboss' | 'pillow-emboss';
      depth: number;
      size: number;
      soften: number;
      angle: number;
      altitude: number;
      highlightColor: string;
      shadowColor: string;
    };
    satin: SatinOptions;
    colorOverlay: ColorOverlayOptions;
    gradientOverlay: GradientOverlayOptions;
    patternOverlay: PatternOverlayOptions;
    stroke: StrokeOptions;
  };
  
  // Masks
  masks: {
    layerMask: {
      type: 'bitmap' | 'vector';
      invert: boolean;
      feather: number;
      density: number;
    };
    clippingMask: {
      base: Layer;
      mode: 'clip' | 'mask';
    };
    vectorMask: {
      path: Path;
      invert: boolean;
    };
  };
}
```

### 2. AI-Powered Features

#### Comprehensive AI Integration
```typescript
interface AIFeatures {
  // Text Generation
  textGeneration: {
    sloganGenerator: {
      context: string;
      style: 'professional' | 'casual' | 'funny' | 'elegant';
      length: 'short' | 'medium' | 'long';
      count: number;
    };
    productDescriptions: {
      product: string;
      features: string[];
      tone: 'marketing' | 'technical' | 'storytelling';
      length: number;
    };
    headlines: {
      topic: string;
      style: string;
      variations: number;
    };
  };
  
  // Image Generation
  imageGeneration: {
    textToImage: {
      prompt: string;
      negativePrompt: string;
      style: StylePreset;
      dimensions: { width: number; height: number };
      count: number;
    };
    imageVariations: {
      baseImage: string;
      variations: number;
      similarity: number; // 0-1
    };
    inpainting: {
      image: string;
      mask: string;
      prompt: string;
    };
    outpainting: {
      image: string;
      direction: 'left' | 'right' | 'top' | 'bottom' | 'all';
      prompt: string;
    };
  };
  
  // Image Enhancement
  imageEnhancement: {
    backgroundRemoval: {
      image: string;
      returnMask: boolean;
      refinement: 'none' | 'basic' | 'advanced';
    };
    upscaling: {
      image: string;
      scale: 2 | 4 | 8;
      method: 'real-esrgan' | 'esrgan-anime' | 'gfpgan';
    };
    colorCorrection: {
      image: string;
      auto: boolean;
      adjustments: ColorAdjustments;
    };
    objectRemoval: {
      image: string;
      mask: string;
      method: 'content-aware' | 'clone-stamp';
    };
  };
  
  // Design Assistant
  designAssistant: {
    layoutSuggestions: {
      elements: Element[];
      constraints: LayoutConstraints;
      count: number;
    };
    colorHarmony: {
      baseColors: string[];
      scheme: 'complementary' | 'analogous' | 'triadic' | 'tetradic';
      count: number;
    };
    fontPairings: {
      context: string;
      mood: string[];
      count: number;
    };
    designCritique: {
      design: DesignData;
      aspects: ('composition' | 'color' | 'typography' | 'balance' | 'hierarchy')[];
      detailed: boolean;
    };
    accessibilityCheck: {
      design: DesignData;
      standard: 'WCAG-A' | 'WCAG-AA' | 'WCAG-AAA';
    };
  };
  
  // Smart Tools
  smartTools: {
    autoAlign: {
      elements: Element[];
      method: 'grid' | 'golden-ratio' | 'rule-of-thirds';
    };
    autoDistribute: {
      elements: Element[];
      spacing: 'even' | 'optical' | 'custom';
    };
    smartResize: {
      design: DesignData;
      newDimensions: Dimensions;
      preserveHierarchy: boolean;
    };
    contentAwareScale: {
      element: Element;
      newSize: Size;
    };
  };
}
```

### 3. Real-Time Collaboration

#### Collaboration Features
```typescript
interface CollaborationFeatures {
  // Multi-User Editing
  multiUser: {
    maxUsers: number;
    cursorSharing: {
      enabled: boolean;
      showName: boolean;
      color: string;
      timeout: number;
    };
    selectionSharing: {
      enabled: boolean;
      lockOnEdit: boolean;
      showOutline: boolean;
    };
    presence: {
      indicators: boolean;
      avatars: boolean;
      statusMessages: boolean;
    };
  };
  
  // Commenting System
  comments: {
    types: ['general', 'element-specific', 'area-specific'];
    features: [
      'threading',
      'mentions',
      'reactions',
      'attachments',
      'resolve-workflow'
    ];
    notifications: {
      email: boolean;
      inApp: boolean;
      push: boolean;
    };
  };
  
  // Version Control
  versioning: {
    autoSave: {
      interval: number;
      maxVersions: number;
    };
    manualSnapshots: {
      enabled: boolean;
      withDescription: boolean;
    };
    branching: {
      enabled: boolean;
      maxBranches: number;
    };
    merging: {
      conflictResolution: 'manual' | 'auto-accept-latest' | 'auto-accept-current';
      diffView: boolean;
    };
  };
  
  // Permissions
  permissions: {
    roles: {
      owner: ['all'];
      admin: ['edit', 'comment', 'share', 'export'];
      editor: ['edit', 'comment', 'export'];
      commenter: ['comment', 'view'];
      viewer: ['view'];
    };
    elementLevel: {
      enabled: boolean;
      lockable: boolean;
      restrictEdit: boolean;
    };
    timeBasedAccess: {
      enabled: boolean;
      expiry: Date;
      autoRevoke: boolean;
    };
  };
  
  // Activity Feed
  activityFeed: {
    events: [
      'element-added',
      'element-modified',
      'element-deleted',
      'comment-added',
      'user-joined',
      'user-left',
      'version-created',
      'export-completed'
    ];
    filters: {
      byUser: boolean;
      byType: boolean;
      byDate: boolean;
    };
    notifications: boolean;
  };
}
```

### 4. E-commerce Integration

#### Advanced E-commerce Features
```typescript
interface EcommerceFeatures {
  // Product Configuration
  productConfig: {
    multiStep: {
      wizard: {
        steps: ConfigStep[];
        progress: 'linear' | 'non-linear';
        validation: 'per-step' | 'end';
      };
      conditionalLogic: {
        showIf: Condition[];
        hideIf: Condition[];
        requireIf: Condition[];
      };
    };
    dynamicPricing: {
      basePrice: number;
      rules: PricingRule[];
      realTimeUpdate: boolean;
      showBreakdown: boolean;
    };
    inventory: {
      trackMaterials: boolean;
      stockLevels: MaterialStock[];
      backorderOptions: BackorderSettings;
    };
  };
  
  // Cart Integration
  cart: {
    customization: {
      editInCart: boolean;
      duplicateDesign: boolean;
      saveForLater: boolean;
    };
    visualization: {
      thumbnail: 'preview' | '3d-view' | 'mockup';
      quickView: boolean;
      zoom: boolean;
    };
    bulkActions: {
      addMultiple: boolean;
      teamOrdering: boolean;
      variationMatrix: boolean;
    };
  };
  
  // Order Management
  orderManagement: {
    productionQueue: {
      statuses: ['pending', 'in-design-review', 'approved', 'in-production', 'completed'];
      automation: {
        autoApprove: ConditionalApproval[];
        notifications: NotificationSettings;
      };
      prioritization: {
        rules: PriorityRule[];
        manualOverride: boolean;
      };
    };
    fileDelivery: {
      formats: ['pdf', 'png', 'svg', 'ai', 'psd'];
      deliveryMethods: ['email', 'download-link', 'cloud-storage'];
      expiry: number;
    };
  };
  
  // Quote System
  quotes: {
    requestQuote: {
      form: QuoteFormFields[];
      attachDesign: boolean;
      multipleVariants: boolean;
    };
    quoteManagement: {
      approval: {
        workflow: ApprovalStep[];
        notifications: boolean;
      };
      negotiation: {
        enabled: boolean;
        counterOffers: boolean;
        maxIterations: number;
      };
      conversion: {
        toOrder: boolean;
        preserveDesign: boolean;
        autoInvoice: boolean;
      };
    };
  };
  
  // Platform Integrations
  platforms: {
    wooCommerce: WooCommerceIntegration;
    shopify: ShopifyIntegration;
    bigCommerce: BigCommerceIntegration;
    magento: MagentoIntegration;
    custom: CustomPlatformIntegration;
  };
}
```

### 5. Analytics & Insights

#### Comprehensive Analytics
```typescript
interface AnalyticsFeatures {
  // Design Analytics
  designAnalytics: {
    metrics: {
      views: number;
      starts: number;
      completions: number;
      abandonments: number;
      averageTime: number;
      conversionRate: number;
    };
    heatmaps: {
      interactions: InteractionHeatmap;
      elementUsage: ElementHeatmap;
      clicks: ClickHeatmap;
    };
    elementPopularity: {
      mostUsed: Element[];
      leastUsed: Element[];
      trends: TrendData[];
    };
    colorAnalytics: {
      popularColors: ColorUsage[];
      combinations: ColorCombination[];
      trends: ColorTrend[];
    };
  };
  
  // User Behavior
  userBehavior: {
    sessionRecording: {
      enabled: boolean;
      sampleRate: number;
      privacyMask: boolean;
    };
    funnelAnalysis: {
      steps: FunnelStep[];
      dropoffPoints: DropoffAnalysis[];
      optimization: OptimizationSuggestion[];
    };
    cohortAnalysis: {
      cohorts: Cohort[];
      retention: RetentionData[];
      behavior: BehaviorData[];
    };
  };
  
  // Business Intelligence
  businessIntelligence: {
    revenue: {
      total: number;
      byProduct: ProductRevenue[];
      byDesign: DesignRevenue[];
      trends: RevenueTrend[];
      forecasts: RevenueForecas[];
    };
    performance: {
      topProducts: Product[];
      topDesigns: Design[];
      topCustomers: Customer[];
      slowMoving: Product[];
    };
    segmentation: {
      customers: CustomerSegment[];
      products: ProductSegment[];
      designs: DesignSegment[];
    };
  };
  
  // A/B Testing
  abTesting: {
    experiments: {
      create: {
        variants: Variant[];
        allocation: number[];
        duration: number;
        goals: Goal[];
      };
      monitor: {
        realTime: boolean;
        statisticalSignificance: boolean;
        earlyStop: boolean;
      };
      analyze: {
        winner: Variant;
        confidence: number;
        impact: ImpactAnalysis;
      };
    };
  };
  
  // Custom Reports
  customReports: {
    builder: {
      metrics: Metric[];
      dimensions: Dimension[];
      filters: Filter[];
      visualization: 'table' | 'chart' | 'graph';
    };
    scheduling: {
      frequency: 'daily' | 'weekly' | 'monthly';
      recipients: string[];
      format: 'pdf' | 'csv' | 'excel';
    };
    sharing: {
      public: boolean;
      teamAccess: boolean;
      embedCode: boolean;
    };
  };
}
```

---

## API Documentation

### REST API Endpoints

#### Base URL
```
Production: https://printjones.com/wp-json/pjpd/v1/
Development: http://localhost/wp-json/pjpd/v1/
```

#### Authentication
```typescript
// JWT Authentication
POST /auth/login
Body: { username: string, password: string }
Response: { token: string, user: User }

// API Key Authentication
Header: X-API-Key: {api_key}
```

#### Products Endpoints
```typescript
// List products
GET /products
Query: { page: number, per_page: number, search: string, status: string }
Response: { products: Product[], total: number, pages: number }

// Get product
GET /products/:id
Response: { product: Product }

// Create product
POST /products
Body: { title: string, views: View[], settings: ProductSettings }
Response: { product: Product }

// Update product
PUT /products/:id
Body: Partial<Product>
Response: { product: Product }

// Delete product
DELETE /products/:id
Response: { success: boolean }

// Duplicate product
POST /products/:id/duplicate
Response: { product: Product }
```

#### Designs Endpoints
```typescript
// List designs
GET /designs
Query: { user_id: number, product_id: number, status: string }
Response: { designs: Design[], total: number }

// Get design
GET /designs/:id
Response: { design: Design }

// Create design
POST /designs
Body: { product_id: number, design_data: DesignData }
Response: { design: Design }

// Update design
PUT /designs/:id
Body: { design_data: DesignData }
Response: { design: Design }

// Auto-save design
POST /designs/:id/autosave
Body: { design_data: DesignData }
Response: { success: boolean, version: number }

// Export design
POST /designs/:id/export
Body: { format: string, options: ExportOptions }
Response: { file_url: string, expires_at: number }
```

#### Collaboration Endpoints
```typescript
// Join collaboration session
POST /collaboration/join
Body: { design_id: number, user_id: number }
Response: { session_id: string, active_users: User[] }

// Leave collaboration session
POST /collaboration/leave
Body: { session_id: string }
Response: { success: boolean }

// Get active collaborators
GET /collaboration/:design_id/users
Response: { users: CollaboratorInfo[] }

// Add comment
POST /collaboration/:design_id/comments
Body: { content: string, element_id?: string, position?: Position }
Response: { comment: Comment }

// Get comments
GET /collaboration/:design_id/comments
Response: { comments: Comment[] }
```

#### AI Endpoints
```typescript
// Generate text
POST /ai/generate-text
Body: { prompt: string, type: string, options: TextOptions }
Response: { text: string, alternatives: string[] }

// Generate image
POST /ai/generate-image
Body: { prompt: string, options: ImageOptions }
Response: { image_url: string, seed: number }

// Remove background
POST /ai/remove-background
Body: { image_url: string, options: RemovalOptions }
Response: { image_url: string, mask_url: string }

// Upscale image
POST /ai/upscale-image
Body: { image_url: string, scale: number }
Response: { image_url: string }

// Design suggestions
POST /ai/suggest-improvements
Body: { design_data: DesignData }
Response: { suggestions: Suggestion[] }

// Get AI usage
GET /ai/usage
Query: { user_id: number, start_date: string, end_date: string }
Response: { usage: AIUsage, remaining: number }
```

### GraphQL API

#### Schema Definition
```graphql
type Query {
  # Products
  products(
    page: Int = 1
    perPage: Int = 20
    search: String
    status: ProductStatus
  ): ProductConnection!
  
  product(id: ID!): Product
  
  # Designs
  designs(
    userId: ID
    productId: ID
    status: DesignStatus
  ): [Design!]!
  
  design(id: ID!): Design
  
  # Templates
  templates(
    category: String
    featured: Boolean
    search: String
  ): [Template!]!
  
  template(id: ID!): Template
  
  # Analytics
  analytics(
    dateRange: DateRange!
    metrics: [Metric!]!
  ): AnalyticsData!
  
  # Teams
  teams: [Team!]!
  team(id: ID!): Team
}

type Mutation {
  # Products
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
  
  # Designs
  createDesign(input: CreateDesignInput!): Design!
  updateDesign(id: ID!, input: UpdateDesignInput!): Design!
  deleteDesign(id: ID!): Boolean!
  
  # Collaboration
  addComment(
    designId: ID!
    content: String!
    elementId: ID
  ): Comment!
  
  resolveComment(id: ID!): Comment!
  
  # AI
  generateText(prompt: String!, type: TextType!): AITextResult!
  generateImage(prompt: String!, options: ImageOptions): AIImageResult!
  removeBackground(imageUrl: String!): AIImageResult!
}

type Subscription {
  # Real-time collaboration
  designUpdated(designId: ID!): DesignUpdate!
  userJoined(designId: ID!): User!
  userLeft(designId: ID!): User!
  commentAdded(designId: ID!): Comment!
  cursorMoved(designId: ID!): CursorPosition!
}

# Types
type Product {
  id: ID!
  uuid: String!
  title: String!
  slug: String!
  description: String
  thumbnail: String
  views: [View!]!
  settings: ProductSettings!
  status: ProductStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Design {
  id: ID!
  uuid: String!
  product: Product!
  user: User
  title: String
  thumbnail: String
  previewImages: [String!]!
  designData: JSON!
  status: DesignStatus!
  visibility: DesignVisibility!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type View {
  id: ID!
  uuid: String!
  title: String!
  thumbnail: String
  backgroundImage: String
  backgroundColor: String
  width: Int!
  height: Int!
  elements: [Element!]!
  settings: ViewSettings!
}

type Element {
  id: ID!
  uuid: String!
  type: ElementType!
  title: String
  properties: JSON!
  locked: Boolean!
  visible: Boolean!
  order: Int!
}

enum ProductStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum DesignStatus {
  DRAFT
  COMPLETED
  ORDERED
}

enum ElementType {
  TEXT
  IMAGE
  VECTOR
  GROUP
  SHAPE
}
```

### WebSocket Events

#### Client → Server Events
```typescript
// Collaboration
socket.emit('join:design', { designId: string, userId: string });
socket.emit('leave:design', { designId: string });
socket.emit('sync:update', { designId: string, update: Uint8Array });
socket.emit('cursor:move', { designId: string, position: { x: number, y: number } });
socket.emit('selection:change', { designId: string, elementIds: string[] });
socket.emit('element:lock', { designId: string, elementId: string });
socket.emit('element:unlock', { designId: string, elementId: string });
```

#### Server → Client Events
```typescript
// Collaboration
socket.on('sync:state', ({ state: Uint8Array }) => {});
socket.on('sync:update', ({ update: Uint8Array }) => {});
socket.on('user:joined', ({ userId: string, socketId: string, activeUsers: number }) => {});
socket.on('user:left', ({ userId: string, socketId: string }) => {});
socket.on('users:active', ({ users: User[] }) => {});
socket.on('cursor:move', ({ socketId: string, position: { x: number, y: number } }) => {});
socket.on('selection:change', ({ socketId: string, elementIds: string[] }) => {});
socket.on('element:locked', ({ elementId: string, userId: string }) => {});
socket.on('element:unlocked', ({ elementId: string }) => {});
```

---

## Security & Performance

### Security Measures

#### 1. Authentication & Authorization
```php
// JWT Authentication
class PJ_JWT_Auth {
    private const SECRET_KEY = 'PJPD_JWT_SECRET';
    private const ALGORITHM = 'HS256';
    
    public static function generate_token($user_id) {
        $payload = [
            'iss' => get_site_url(),
            'iat' => time(),
            'exp' => time() + (7 * DAY_IN_SECONDS),
            'user_id' => $user_id
        ];
        
        return JWT::encode($payload, self::SECRET_KEY, self::ALGORITHM);
    }
    
    public static function verify_token($token) {
        try {
            $decoded = JWT::decode($token, self::SECRET_KEY, [self::ALGORITHM]);
            return $decoded->user_id;
        } catch (Exception $e) {
            return false;
        }
    }
}

// Capability checks
class PJ_Capabilities {
    const VIEW_DESIGNS = 'pjpd_view_designs';
    const EDIT_DESIGNS = 'pjpd_edit_designs';
    const DELETE_DESIGNS = 'pjpd_delete_designs';
    const MANAGE_PRODUCTS = 'pjpd_manage_products';
    const MANAGE_SETTINGS = 'pjpd_manage_settings';
    const USE_AI_FEATURES = 'pjpd_use_ai';
    const ACCESS_ANALYTICS = 'pjpd_access_analytics';
    
    public static function init() {
        add_action('init', [__CLASS__, 'add_capabilities']);
    }
    
    public static function add_capabilities() {
        $admin = get_role('administrator');
        $admin->add_cap(self::MANAGE_PRODUCTS);
        $admin->add_cap(self::MANAGE_SETTINGS);
        $admin->add_cap(self::USE_AI_FEATURES);
        $admin->add_cap(self::ACCESS_ANALYTICS);
    }
}
```

#### 2. Data Validation & Sanitization
```php
class PJ_Validator {
    public static function validate_design_data($data) {
        $rules = [
            'product_id' => 'required|integer',
            'design_data' => 'required|json',
            'title' => 'string|max:255',
            'visibility' => 'in:private,public,team'
        ];
        
        return self::validate($data, $rules);
    }
    
    public static function sanitize_design_data($data) {
        return [
            'product_id' => absint($data['product_id']),
            'design_data' => wp_kses_post($data['design_data']),
            'title' => sanitize_text_field($data['title']),
            'visibility' => sanitize_key($data['visibility'])
        ];
    }
}
```

#### 3. Rate Limiting
```php
class PJ_Rate_Limiter {
    private $redis;
    
    public function check_limit($user_id, $action, $limit = 100, $window = 3600) {
        $key = "rate_limit:{$user_id}:{$action}";
        $current = $this->redis->get($key) ?: 0;
        
        if ($current >= $limit) {
            return false;
        }
        
        $this->redis->incr($key);
        $this->redis->expire($key, $window);
        
        return true;
    }
}
```

### Performance Optimization

#### 1. Caching Strategy
```php
class PJ_Cache_Manager {
    private $redis;
    private const TTL_SHORT = 300;      // 5 minutes
    private const TTL_MEDIUM = 3600;    // 1 hour
    private const TTL_LONG = 86400;     // 24 hours
    
    public function get_product($product_id) {
        $key = "product:{$product_id}";
        
        // Try cache first
        $cached = $this->redis->get($key);
        if ($cached) {
            return json_decode($cached, true);
        }
        
        // Get from database
        $product = PJ_Product::get($product_id);
        
        // Cache it
        $this->redis->setex($key, self::TTL_MEDIUM, json_encode($product));
        
        return $product;
    }
    
    public function invalidate_product($product_id) {
        $keys = [
            "product:{$product_id}",
            "product_list:*",
            "user_products:*"
        ];
        
        foreach ($keys as $pattern) {
            if (strpos($pattern, '*') !== false) {
                $this->delete_pattern($pattern);
            } else {
                $this->redis->del($pattern);
            }
        }
    }
}
```

#### 2. Database Optimization
```sql
-- Query optimization examples

-- Efficient design retrieval with pagination
EXPLAIN SELECT d.*, p.title as product_title, u.display_name as user_name
FROM wp_pjpd_designs d
LEFT JOIN wp_pjpd_products p ON d.product_id = p.id
LEFT JOIN wp_users u ON d.user_id = u.ID
WHERE d.status = 'completed'
AND d.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY d.created_at DESC
LIMIT 20 OFFSET 0;

-- Add covering indexes
CREATE INDEX idx_designs_status_created 
ON wp_pjpd_designs (status, created_at DESC) 
INCLUDE (product_id, user_id, title, thumbnail);

-- Partition large tables
ALTER TABLE wp_pjpd_analytics_events
PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

#### 3. Asset Optimization
```typescript
// Image optimization pipeline
class ImageOptimizer {
  async optimize(image: Blob, options: OptimizationOptions): Promise<Blob> {
    // Resize if needed
    if (options.maxWidth || options.maxHeight) {
      image = await this.resize(image, options);
    }
    
    // Compress
    image = await this.compress(image, {
      quality: options.quality || 0.85,
      method: 'mozjpeg' // or 'pngquant' for PNG
    });
    
    // Convert format if beneficial
    if (options.autoFormat) {
      image = await this.convertToOptimalFormat(image);
    }
    
    // Strip metadata
    if (options.stripMetadata) {
      image = await this.stripEXIF(image);
    }
    
    return image;
  }
  
  async generateResponsiveSet(image: Blob): Promise<ResponsiveImageSet> {
    const sizes = [320, 640, 768, 1024, 1366, 1920, 2560];
    const formats = ['webp', 'avif', 'jpg'];
    
    const images = [];
    for (const width of sizes) {
      for (const format of formats) {
        const optimized = await this.optimize(image, {
          maxWidth: width,
          format,
          quality: 0.85
        });
        
        images.push({
          url: await this.upload(optimized),
          width,
          format
        });
      }
    }
    
    return { images };
  }
}
```

---

## Development Guidelines

### Coding Standards

#### PHP (PSR-12)
```php
<?php
/**
 * Product class
 *
 * @package PJ_Product_Designer
 * @since 25.0.0
 */

namespace PJProductDesigner\Core;

use PJProductDesigner\Interfaces\ProductInterface;

class Product implements ProductInterface {
    /**
     * Product ID
     *
     * @var int
     */
    private int $id;
    
    /**
     * Constructor
     *
     * @param int $id Product ID
     */
    public function __construct(int $id) {
        $this->id = $id;
    }
    
    /**
     * Get product data
     *
     * @return array Product data
     */
    public function get_data(): array {
        return $this->load_from_database();
    }
}
```

#### TypeScript
```typescript
/**
 * Design element base class
 * 
 * @packageDocumentation
 */

/**
 * Element configuration interface
 */
export interface ElementConfig {
  /** Element unique identifier */
  id: string;
  /** Element type */
  type: ElementType;
  /** Element position */
  position: Position;
  /** Element dimensions */
  size: Size;
}

/**
 * Base class for all design elements
 * 
 * @example
 * ```typescript
 * class TextElement extends BaseElement {
 *   constructor(config: TextElementConfig) {
 *     super(config);
 *   }
 * }
 * ```
 */
export abstract class BaseElement {
  /** Element ID */
  protected id: string;
  
  /**
   * Creates an element
   * @param config - Element configuration
   */
  constructor(config: ElementConfig) {
    this.id = config.id;
  }
  
  /**
   * Renders the element
   * @returns Rendered element
   */
  abstract render(): HTMLElement;
}
```

### Git Workflow

```bash
# Branch naming convention
feature/PJ-123-add-vector-tools
bugfix/PJ-456-fix-export-crash
hotfix/PJ-789-security-patch
refactor/improve-rendering-performance

# Commit message format
feat(designer): add pen tool for vector drawing

- Implement bezier curve drawing
- Add node editing functionality
- Support smooth and sharp corners

Closes #123

# Types: feat, fix, docs, style, refactor, perf, test, chore
```

### Testing Requirements

#### Unit Tests (PHPUnit)
```php
class ProductTest extends WP_UnitTestCase {
    public function test_create_product() {
        $product = PJ_Product::create([
            'title' => 'Test Product',
            'views' => [
                ['title' => 'Front', 'width' => 500, 'height' => 500]
            ]
        ]);
        
        $this->assertInstanceOf(PJ_Product::class, $product);
        $this->assertEquals('Test Product', $product->get_title());
        $this->assertCount(1, $product->get_views());
    }
}
```

#### Integration Tests (Jest)
```typescript
describe('Canvas Renderer', () => {
  let renderer: WebGLRenderer;
  let canvas: HTMLCanvasElement;
  
  beforeEach(() => {
    canvas = document.createElement('canvas');
    renderer = new WebGLRenderer(canvas);
  });
  
  it('should render text elements', () => {
    const textElement = new TextElement({
      text: 'Hello World',
      fontSize: 24,
      fontFamily: 'Arial'
    });
    
    renderer.render([textElement]);
    
    expect(renderer.getContext()).toBeDefined();
  });
});
```

#### E2E Tests (Playwright)
```typescript
test('User can create and save a design', async ({ page }) => {
  await page.goto('/wp-admin/admin.php?page=pjpd_designer');
  
  // Select product
  await page.click('[data-testid="product-selector"]');
  await page.click('text=T-Shirt');
  
  // Add text
  await page.click('[data-testid="add-text"]');
  await page.fill('[data-testid="text-input"]', 'My Design');
  
  // Save
  await page.click('[data-testid="save-button"]');
  
  // Verify
  await expect(page.locator('text=Design saved')).toBeVisible();
});
```

---

## Deployment & DevOps

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: wordpress_test
      redis:
        image: redis:7
        
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          extensions: mbstring, mysql, redis
          coverage: xdebug
          
      - name: Install Composer dependencies
        run: composer install --no-interaction
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install npm dependencies
        run: pnpm install
        
      - name: Run PHP tests
        run: vendor/bin/phpunit --coverage-clover coverage.xml
        
      - name: Run JS tests
        run: pnpm test --coverage
        
      - name: Build assets
        run: pnpm build
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build plugin package
        run: |
          pnpm install
          pnpm build
          composer install --no-dev --optimize-autoloader
          
      - name: Create release package
        run: |
          mkdir -p releases
          zip -r releases/pj-product-designer-v25.0.0.zip . \
            -x "*.git*" "node_modules/*" "tests/*" "*.md"
            
      - name: Deploy to WordPress.org
        run: |
          ./bin/deploy-wporg.sh
        env:
          SVN_USERNAME: ${{ secrets.SVN_USERNAME }}
          SVN_PASSWORD: ${{ secrets.SVN_PASSWORD }}
```

### Docker Setup

```dockerfile
# Dockerfile
FROM php:8.2-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Enable Apache modules
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy plugin files
COPY . /var/www/html/wp-content/plugins/pj-product-designer/

# Set permissions
RUN chown -R www-data:www-data /var/www/html
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  wordpress:
    build: .
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - ./:/var/www/html/wp-content/plugins/pj-product-designer
      - wordpress_data:/var/www/html
    depends_on:
      - db
      - redis
      - elasticsearch
      
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - db_data:/var/lib/mysql
      
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
      
  elasticsearch:
    image: elasticsearch:8.9.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
      
  websocket:
    build: ./node-services/websocket-server
    ports:
      - "3000:3000"
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      - redis

volumes:
  wordpress_data:
  db_data:
```

---

## Roadmap

### Phase 1: Foundation (Q1 2025)
**Goal**: Establish core infrastructure and basic features

- ✅ Plugin architecture setup
- ✅ Database schema implementation
- ✅ REST API & GraphQL endpoints
- ✅ Basic canvas engine (WebGL)
- ✅ Element system (Text, Image, Shape)
- ✅ Product builder interface
- ✅ WooCommerce integration
- ✅ Admin dashboard (React)

### Phase 2: Advanced Features (Q2 2025)
**Goal**: Implement professional-grade tools

- 🔄 Vector editor (Pen tool, Pathfinder)
- 🔄 Advanced typography (Variable fonts, Text on path)
- 🔄 Layer system with blend modes
- 🔄 Professional filters
- 🔄 Real-time collaboration
- 🔄 WebSocket server
- 🔄 Version control system
- 🔄 AI image generation integration

### Phase 3: AI & Collaboration (Q3 2025)
**Goal**: Lead with AI-powered features

- ⏳ AI Design Assistant
- ⏳ Text generation (GPT-4)
- ⏳ Background removal
- ⏳ Image upscaling
- ⏳ Design suggestions
- ⏳ Multi-user editing
- ⏳ Comments system
- ⏳ Activity feed

### Phase 4: Mobile & Cross-Platform (Q4 2025)
**Goal**: Expand to all platforms

- ⏳ React Native mobile apps
- ⏳ Electron desktop apps
- ⏳ Browser extensions
- ⏳ PWA features
- ⏳ Offline mode
- ⏳ Mobile-optimized UI
- ⏳ Apple Pencil support
- ⏳ Samsung S-Pen support

### Phase 5: Enterprise & Marketplace (Q1 2026)
**Goal**: Enterprise features and ecosystem

- ⏳ SSO (SAML, OAuth, LDAP)
- ⏳ Multi-tenant architecture
- ⏳ White-label solutions
- ⏳ Template marketplace
- ⏳ Plugin marketplace
- ⏳ Design services
- ⏳ Team management
- ⏳ Advanced analytics

### Phase 6: Innovation (Q2 2026+)
**Goal**: Next-gen features

- ⏳ AR/VR support (WebXR)
- ⏳ 3D design tools
- ⏳ Animation timeline
- ⏳ Video integration
- ⏳ NFT minting
- ⏳ Metaverse integration
- ⏳ Blockchain features
- ⏳ Advanced AI models

---

## Success Metrics

### Technical KPIs
- **Performance**: Load time < 1s, 60 FPS rendering
- **Reliability**: 99.9% uptime
- **Security**: Zero critical vulnerabilities
- **Coverage**: > 80% test coverage
- **Accessibility**: WCAG AAA compliance

### Business KPIs
- **Conversion**: > 25% customization rate
- **Engagement**: > 10 min average session
- **Satisfaction**: > 4.5/5 customer rating
- **Retention**: > 80% 30-day retention
- **Growth**: 30% MoM user growth
- **Revenue**: $1M ARR by end of Year 1

### User KPIs
- **Time to First Design**: < 2 minutes
- **Design Completion Rate**: > 60%
- **Feature Adoption**: > 50% using advanced tools
- **Support Tickets**: < 2% of active users
- **Net Promoter Score**: > 50

---

## Conclusion

PJ Product Designer v25.0.0 represents a quantum leap in WordPress product customization technology. By combining modern web technologies, AI-powered features, real-time collaboration, and professional-grade design tools, we're creating the most powerful and user-friendly product designer on the market.

This documentation serves as the comprehensive blueprint for building a plugin that not only matches but significantly exceeds Fancy Product Designer in every aspect—from performance and features to user experience and scalability.

---

**Document Version**: 1.0  
**Last Updated**: October 20, 2025  
**Status**: Development Blueprint  
**Next Review**: November 20, 2025  

**Contributors**:
- Architecture: PrintJones Development Team
- Features: Based on competitive analysis & market research
- Documentation: PrintJones Technical Writing Team

**Contact**:
- Website: https://printjones.com
- Email: dev@printjones.com
- Support: https://printjones.com/support
- GitHub: https://github.com/printjones/pj-product-designer
