# User Dashboard - Complete Specification

## Overview

This document specifies the complete User Dashboard (Account Portal) for PrintJones customers. The dashboard follows the same sidebar navigation pattern as the documentation pages, providing a consistent and familiar user experience.

**Access:** `/account` or `/dashboard`  
**Authentication:** Required (redirect to login if not authenticated)  
**Layout:** Left sidebar navigation (fixed, similar to docs pages) + main content area  
**Responsive:** Collapsible sidebar on mobile (hamburger menu)

---

## Dashboard Architecture

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Header (Global Navigation)                             │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│  Sidebar    │  Main Content Area                        │
│  (Fixed)    │  (Scrollable)                             │
│             │                                           │
│  - Dashboard│  Page-specific content                    │
│  - Licenses │  Cards, tables, forms, etc.               │
│  - Downloads│                                           │
│  - Orders   │                                           │
│  - Support  │                                           │
│  - Settings │                                           │
│  ...        │                                           │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
│  Footer (Global)                                        │
└─────────────────────────────────────────────────────────┘
```

### Technical Implementation

- **Route:** `/app/account/layout.tsx` (shared layout with sidebar)
- **Sub-routes:** `/app/account/[page]/page.tsx` (individual pages)
- **Sidebar Component:** `<AccountSidebar />` in `/components/account/sidebar.tsx`
- **Authentication:** Use Supabase Auth or NextAuth.js
- **State Management:** React Context or Zustand for user data

---

## Sidebar Navigation Menu

### Menu Structure

The sidebar should mirror the documentation pages' structure with icons and clear labels:

```tsx
// Menu items structure
const menuItems = [
  {
    section: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/account', badge: null },
      { icon: Key, label: 'Licenses', href: '/account/licenses', badge: '3 Active' },
      { icon: Download, label: 'Downloads', href: '/account/downloads', badge: null },
      { icon: ShoppingBag, label: 'Orders', href: '/account/orders', badge: null },
      { icon: Receipt, label: 'Invoices', href: '/account/invoices', badge: null },
    ]
  },
  {
    section: 'Support',
    items: [
      { icon: HeadphonesIcon, label: 'Support Tickets', href: '/account/support', badge: '1 Open' },
      { icon: MessageSquare, label: 'Community', href: '/account/community', badge: null },
      { icon: BookOpen, label: 'Documentation', href: '/docs', badge: null, external: true },
    ]
  },
  {
    section: 'Account',
    items: [
      { icon: User, label: 'Profile', href: '/account/profile', badge: null },
      { icon: CreditCard, label: 'Billing', href: '/account/billing', badge: null },
      { icon: Users, label: 'Team Members', href: '/account/team', badge: 'Pro' },
      { icon: Bell, label: 'Notifications', href: '/account/notifications', badge: '2 New' },
      { icon: Settings, label: 'Settings', href: '/account/settings', badge: null },
    ]
  },
  {
    section: 'Resources',
    items: [
      { icon: Gift, label: 'Referrals', href: '/account/referrals', badge: '$25' },
      { icon: TrendingUp, label: 'Analytics', href: '/account/analytics', badge: 'Beta' },
      { icon: Code, label: 'API Keys', href: '/account/api', badge: null },
      { icon: History, label: 'Activity Log', href: '/account/activity', badge: null },
    ]
  },
  {
    section: null,
    items: [
      { icon: LogOut, label: 'Logout', href: '/logout', badge: null, variant: 'danger' },
    ]
  }
];
```

### Sidebar Features
- **Active State:** Highlight current page
- **Badge Indicators:** Show counts, status, or labels (e.g., "3 Active", "Pro", "Beta")
- **Collapse on Mobile:** Hamburger menu for mobile/tablet
- **Sticky Position:** Fixed position during scroll
- **Icons:** Lucide React icons for consistency
- **Sections:** Group related items with section headers

---

## Dashboard Pages (Detailed Specifications)

---

## 1. Dashboard (Overview)

**Route:** `/account`  
**Purpose:** Central hub showing key metrics, recent activity, and quick actions

### Layout Sections

#### A. Welcome Header
```tsx
<div className="mb-8">
  <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
  <p className="text-gray-600">Here's what's happening with your account</p>
</div>
```

#### B. Quick Stats Cards (Grid: 4 columns on desktop, 2 on tablet, 1 on mobile)
```tsx
const stats = [
  { label: 'Active Licenses', value: '3', icon: Key, color: 'blue', action: 'View All' },
  { label: 'Active Sites', value: '5', icon: Globe, color: 'green', action: 'Manage' },
  { label: 'Open Tickets', value: '1', icon: HeadphonesIcon, color: 'orange', action: 'View' },
  { label: 'Downloads', value: '12', icon: Download, color: 'purple', action: 'See All' },
];
```

**Features:**
- Click-through to relevant pages
- Real-time data
- Color-coded indicators
- Hover effects

#### C. Licenses Overview
- **Card Component:** Table showing active licenses
- **Columns:** Plugin Name | License Key | Sites Used | Expiry Date | Status | Actions
- **Actions:** View Details, Manage Sites, Renew
- **Status Badges:** Active (green), Expiring Soon (yellow), Expired (red)
- **Quick Actions:** "Add New Site" button per license

#### D. Recent Downloads
- List of 5 most recent downloads
- **Info:** Plugin name, version, download date, download button
- **Link:** "View all downloads →" to Downloads page

#### E. Recent Activity Timeline
- Last 10 activities (purchases, license activations, support tickets, downloads)
- **Format:** Icon + Description + Timestamp
- **Example:** "🔑 Activated license for PJ Filter on mysite.com - 2 hours ago"

#### F. Quick Actions (Button Grid)
- "Download Latest Plugins"
- "Open Support Ticket"
- "Renew Expiring Licenses"
- "Refer a Friend"

#### G. Notifications / Announcements
- Important notices (new releases, maintenance, expiring licenses)
- Dismissible cards
- Color-coded by importance

---

## 2. Licenses

**Route:** `/account/licenses`  
**Purpose:** Manage all plugin licenses, activations, and renewals

### Features

#### A. Licenses Table
**Columns:**
- Plugin Name (with icon)
- License Key (masked, show on click)
- License Type (Personal, Business, Enterprise)
- Sites Used / Total (e.g., "3 / 5")
- Expiry Date
- Status (Active, Expiring Soon, Expired)
- Actions (Dropdown menu)

**Actions Dropdown:**
- View Details
- Manage Activations
- Renew License
- Upgrade License
- Transfer License
- Download Plugin
- Copy License Key

#### B. License Details Modal/Page
**Route:** `/account/licenses/[licenseId]`

**Sections:**
1. **License Information**
   - Plugin name and version
   - License key (copy button)
   - Purchase date
   - Expiry date
   - License type
   - Renewal status

2. **Active Installations**
   - Table: Site URL | Site Name | Activated Date | Plugin Version | Actions
   - Actions: Deactivate, View Site Details
   - Button: "Add New Site"

3. **Usage Limits**
   - Progress bar: "3 of 5 sites used"
   - Upgrade prompt if near limit

4. **Download Options**
   - Current version download
   - Previous versions (dropdown)
   - Beta versions (if enrolled)

5. **Renewal Options**
   - Current plan details
   - Renewal price
   - Auto-renewal toggle
   - Upgrade options

#### C. Filters & Search
- Search by plugin name or license key
- Filter by: Status (Active, Expired), Type (Personal, Business), Expiry (< 30 days)
- Sort by: Expiry date, Purchase date, Plugin name

#### D. Bulk Actions
- Select multiple licenses
- Bulk renew
- Bulk download
- Bulk email license keys

#### E. License Transfer Tool
- Form to transfer license to another email/account
- Deactivates from current account
- Sends notification to recipient

---

## 3. Downloads

**Route:** `/account/downloads`  
**Purpose:** Access all purchased plugins and their versions

### Features

#### A. Plugin Cards Grid
**Card Design:**
- Plugin icon/logo
- Plugin name
- Current version
- Last updated date
- Download button (primary)
- "View Changelog" link
- "View Documentation" link

#### B. Version Selector
- Dropdown for each plugin showing all available versions
- Changelog preview on hover
- Download specific version

#### C. Bulk Download
- Checkbox selection
- "Download Selected" button (generates ZIP)
- "Download All Latest Versions" button

#### D. Filters
- Filter by: Category, Purchase Date, Update Availability
- Search by plugin name

#### E. Update Notifications
- Badge showing "Update Available" on outdated plugins
- One-click update download

#### F. Download History
- Table showing all past downloads
- Columns: Plugin, Version, Download Date, IP Address
- Export as CSV

---

## 4. Orders

**Route:** `/account/orders`  
**Purpose:** View purchase history and order details

### Features

#### A. Orders Table
**Columns:**
- Order ID
- Date
- Products (comma-separated or "2 items")
- Total Amount
- Payment Method
- Status (Completed, Pending, Refunded)
- Actions (View Details, Download Invoice)

#### B. Order Details Page
**Route:** `/account/orders/[orderId]`

**Sections:**
1. **Order Summary**
   - Order number
   - Order date
   - Order status
   - Payment method
   - Total amount (with tax breakdown)

2. **Items Purchased**
   - Table: Product Name | License Type | Price | License Key
   - Download buttons for each product

3. **Billing Information**
   - Billing name
   - Email
   - Company (if provided)
   - Address
   - VAT/Tax ID (if provided)

4. **Payment Information**
   - Payment method
   - Transaction ID
   - Payment date
   - Card last 4 digits (if credit card)

5. **Actions**
   - Download Invoice (PDF)
   - Request Refund (if within 30 days)
   - Contact Support

#### C. Filters & Search
- Search by order ID or product name
- Filter by: Date range, Status, Payment method
- Sort by: Date, Amount

#### D. Quick Stats
- Total spent
- Total orders
- Average order value
- Last purchase date

---

## 5. Invoices

**Route:** `/account/invoices`  
**Purpose:** Access and manage invoices

### Features

#### A. Invoices Table
**Columns:**
- Invoice Number
- Order ID (linked)
- Issue Date
- Due Date (for subscriptions)
- Amount
- Status (Paid, Pending, Overdue)
- Actions (Download PDF, Email Invoice)

#### B. Invoice PDF Generator
- Professional PDF format
- Company letterhead
- Itemized breakdown
- Tax calculations
- Payment information
- Terms and conditions

#### C. Invoice Settings
- Default billing information (saved)
- VAT/Tax ID for automatic inclusion
- Email preferences (receive invoices automatically)
- Invoice language preference

#### D. Filters
- Filter by: Status, Date range, Amount range
- Search by invoice or order number

---

## 6. Support Tickets

**Route:** `/account/support`  
**Purpose:** Manage support requests and communication

### Features

#### A. Tickets Overview
**Metrics Cards:**
- Open Tickets
- Resolved Tickets
- Average Response Time
- Satisfaction Rating

#### B. Tickets Table
**Columns:**
- Ticket ID
- Subject
- Plugin/Product
- Priority (Low, Medium, High, Urgent)
- Status (Open, In Progress, Waiting on Customer, Resolved, Closed)
- Last Updated
- Actions (View, Reply, Close)

**Color Coding:**
- Priority badges (red for urgent, yellow for high, etc.)
- Status indicators

#### C. Create New Ticket
**Route:** `/account/support/new`

**Form Fields:**
1. Related Product (dropdown)
2. Subject (text input)
3. Priority (dropdown)
4. Description (rich text editor)
5. Attachments (file upload - screenshots, logs)
6. System Information (auto-detected: WP version, PHP version, plugin version)
7. Consent checkboxes (allow access to site if needed)

**Auto-Suggestions:**
- As user types subject, suggest relevant documentation
- "Did you know..." tips based on issue description

#### D. Ticket Details Page
**Route:** `/account/support/[ticketId]`

**Layout:**
1. **Ticket Header**
   - Ticket ID and subject
   - Status badge
   - Priority badge
   - Creation date
   - Last activity
   - Assigned agent (if visible)

2. **Conversation Thread**
   - Threaded messages (customer + support)
   - Avatar, name, role, timestamp for each message
   - "Support team is typing..." indicator (if live)

3. **Reply Form**
   - Rich text editor
   - File attachments
   - "Reply" and "Reply & Close" buttons
   - Option to mark as resolved

4. **Ticket Sidebar**
   - Product information
   - License details
   - Related documentation links
   - Satisfaction survey (after resolution)

#### E. Filters & Search
- Filter by: Status, Priority, Product, Date
- Search by: Ticket ID, Subject, Content
- Saved views (My Open Tickets, Waiting on Me, Recently Resolved)

---

## 7. Community

**Route:** `/account/community`  
**Purpose:** Engage with the PrintJones user community

### Features

#### A. Community Dashboard
**Sections:**
- Your Forum Posts (recent activity)
- Your Reputation Score
- Badges Earned
- Recent Discussions You're Following

#### B. Integration with Community Forum
- Single sign-on (SSO) to forum
- Link to main community forum
- Embedded feed of recent discussions
- Notifications for @mentions and replies

#### C. User Profile (Public)
- Display name and avatar
- Reputation score
- Badges and achievements
- Recent posts and helpful answers
- Link to edit profile

#### D. Notifications
- New replies to your posts
- Mentions
- Badges earned
- Digest emails (configurable)

---

## 8. Profile

**Route:** `/account/profile`  
**Purpose:** Manage personal information and preferences

### Features

#### A. Personal Information
**Fields:**
- Profile Photo (upload/change)
- First Name
- Last Name
- Display Name (for community)
- Email Address (verified badge)
- Phone Number (optional)
- Time Zone (dropdown)
- Language Preference

**Actions:**
- Save Changes
- Verify Email (if not verified)

#### B. Company Information (Optional)
- Company Name
- VAT/Tax ID
- Company Address
- Website URL

#### C. Security
- Change Password (current + new + confirm)
- Two-Factor Authentication (Enable/Disable)
  - QR code for authenticator app
  - Backup codes download
- Active Sessions
  - Table: Device, Browser, Location, Last Active
  - "Revoke" button for each session
- Login Activity Log
  - Recent login attempts (successful and failed)
  - IP addresses and timestamps

#### D. Communication Preferences
- **Email Notifications:**
  - Product updates
  - Marketing emails
  - Support replies
  - Security alerts
  - Newsletter subscription
  - Community notifications

- **Frequency:** Instant, Daily Digest, Weekly Summary

#### E. Account Actions
- Export Account Data (GDPR compliance)
- Delete Account (confirmation required)
- Pause Email Notifications (temporary, 1 week/1 month)

---

## 9. Billing

**Route:** `/account/billing`  
**Purpose:** Manage payment methods and subscriptions

### Features

#### A. Payment Methods
**Card Display:**
- Saved credit/debit cards
  - Card brand logo (Visa, Mastercard, etc.)
  - Last 4 digits
  - Expiry date
  - Default badge
  - Actions: Set as Default, Edit, Remove

**Actions:**
- Add New Payment Method (Stripe form)
- Update billing address

#### B. Active Subscriptions
**Table:**
- Product Name
- Plan (Annual, Monthly)
- Next Billing Date
- Amount
- Status (Active, Canceled, Expired)
- Actions (Manage, Cancel, Renew)

**Manage Subscription:**
- Change payment method
- Update billing frequency (Monthly ↔ Annual)
- Cancel subscription (with retention offer)
- Download past invoices

#### C. Billing History
- List of all charges
- Date, Description, Amount, Status, Invoice link
- Filter by date range
- Export as CSV

#### D. Billing Address
- Form to update billing address
- Save multiple addresses (default + alternates)

#### E. Tax Information
- VAT/Tax ID input
- Automatic tax calculations
- Tax exemption certificate upload (if applicable)

---

## 10. Team Members

**Route:** `/account/team`  
**Purpose:** Manage team access to account (Pro/Enterprise plans)  
**Access:** Available only for Business/Enterprise licenses

### Features

#### A. Team Members Table
**Columns:**
- Name
- Email
- Role (Owner, Admin, Member, Developer)
- Permissions
- Status (Active, Pending Invite)
- Last Active
- Actions (Edit, Remove)

#### B. Invite Team Member
**Form:**
- Email address
- Role selection (dropdown)
- Permissions checkboxes:
  - View licenses
  - Manage activations
  - Download plugins
  - Create support tickets
  - View billing
  - Manage team members
- Custom message (optional)

**Invite Process:**
- Send email invitation
- Recipient creates account or links existing
- Access granted upon acceptance

#### C. Role Definitions
**Owner:**
- Full access, cannot be removed
- Billing and subscription management
- Team management

**Admin:**
- All permissions except billing changes
- Can invite/remove team members

**Member:**
- View licenses and downloads
- Create support tickets
- No billing or team access

**Developer:**
- Download plugins
- Access API keys
- View documentation
- No license management

#### D. Activity Log
- Team member actions (who did what, when)
- Audit trail for compliance

---

## 11. Notifications

**Route:** `/account/notifications`  
**Purpose:** View and manage all notifications

### Features

#### A. Notifications List
**Types:**
- License expiring soon
- New plugin update available
- Support ticket reply
- Payment processed
- New team member added
- Security alerts (new login, password change)

**Format:**
- Icon (type-specific)
- Title
- Description
- Timestamp (relative: "2 hours ago")
- Read/Unread status
- Action button (e.g., "Renew Now", "View Ticket")

#### B. Filters
- All, Unread, Read
- Filter by type (Licenses, Support, Billing, Security)

#### C. Actions
- Mark as read/unread
- Mark all as read
- Delete notification

#### D. Settings
- Configure which notifications to receive
- Delivery method (Email, In-App, Both)
- Frequency (Instant, Daily, Weekly)

---

## 12. Referrals

**Route:** `/account/referrals`  
**Purpose:** Refer friends and earn rewards

### Features

#### A. Referral Overview
**Metrics:**
- Total Referrals (people who signed up)
- Successful Conversions (people who purchased)
- Total Earned (credits or cash)
- Available Balance
- Lifetime Earnings

#### B. Your Referral Link
- Unique referral code: `https://printjones.com/?ref=YOURCODE`
- Copy button
- QR code for easy sharing
- Social share buttons (Twitter, LinkedIn, Email)

#### C. Referral Tiers/Rewards
**Program Details:**
- You get: 20% commission on first purchase
- Your friend gets: 10% discount on first purchase
- Cookie duration: 30 days
- Payout threshold: $50

#### D. Referrals Table
**Columns:**
- Referral Name/Email (anonymized if not converted)
- Signup Date
- Status (Signed Up, Purchased, Credited)
- Order Value
- Your Earnings
- Date Credited

#### E. Payout Options
- Account credit (for future purchases)
- PayPal payout
- Bank transfer (for higher amounts)

**Payout Form:**
- Request payout when balance ≥ $50
- Select payout method
- Enter payment details
- Processing time: 5-7 business days

#### F. Referral Assets
- Pre-written email templates
- Social media graphics
- Banner images (different sizes)
- Affiliate link customization

---

## 13. Analytics

**Route:** `/account/analytics`  
**Purpose:** View usage statistics and insights (Beta feature)  
**Access:** Premium users only

### Features

#### A. Dashboard Overview
**Metrics:**
- Total Sites Using Plugins
- Monthly Active Sites
- Plugin Activation Rate
- Performance Impact Score

#### B. Plugin Usage Charts
**Charts:**
1. **Usage Over Time:** Line chart showing active installations per month
2. **Plugin Popularity:** Bar chart of which plugins are used most
3. **Version Distribution:** Pie chart of plugin versions in use
4. **Geographic Distribution:** Map showing where your sites are located

#### C. Site Health Monitoring (Future Feature)
- Uptime monitoring per site
- Plugin conflict detection
- Performance metrics (page load times)
- Security alerts

#### D. Insights & Recommendations
- AI-powered suggestions (e.g., "Your sites are using Plugin X 3 versions behind")
- Update reminders
- Optimization tips

#### E. Export Options
- Download reports as PDF
- Export data as CSV
- Schedule automated reports (email weekly/monthly)

---

## 14. API Keys

**Route:** `/account/api`  
**Purpose:** Generate and manage API keys for integrations  
**Access:** Advanced users and developers

### Features

#### A. API Keys Table
**Columns:**
- Key Name (user-defined)
- Key (masked, show on hover)
- Permissions (Read-only, Read/Write)
- Created Date
- Last Used
- Status (Active, Revoked)
- Actions (Regenerate, Revoke, Edit)

#### B. Create New API Key
**Form:**
- Key Name (e.g., "Production Server", "CI/CD Pipeline")
- Permissions:
  - Read license information
  - Download plugins
  - Activate/deactivate licenses
  - View orders
  - Read-only (all above but no write access)
- Expiration (Never, 1 month, 6 months, 1 year, Custom date)

**Security:**
- Key shown only once upon creation
- Copy and save securely prompt
- Option to download key as .txt

#### C. API Documentation
- Link to API docs (opens in new tab)
- Quick examples:
  ```bash
  # Download plugin
  curl -H "Authorization: Bearer YOUR_API_KEY" \
       https://api.printjones.com/v1/plugins/pj-filter/download
  
  # Check license status
  curl -H "Authorization: Bearer YOUR_API_KEY" \
       https://api.printjones.com/v1/licenses/LICENSE_KEY/status
  ```

#### D. Usage Monitoring
- API request count per key
- Rate limits display (e.g., "1000 requests/day")
- Historical usage graph
- Alert when approaching rate limit

---

## 15. Activity Log

**Route:** `/account/activity`  
**Purpose:** View complete account activity history

### Features

#### A. Activity Timeline
**Events Logged:**
- Account logins (device, location, IP)
- License activations/deactivations
- Plugin downloads
- Support tickets created/closed
- Password changes
- Payment method changes
- Team member additions/removals
- API key creations
- Setting changes

**Display:**
- Chronological list (most recent first)
- Icon per event type
- Description (e.g., "Activated license for PJ Filter on example.com")
- Timestamp
- IP address (for security events)
- User agent (for logins)

#### B. Filters
- Filter by: Event Type, Date Range, User (for team accounts)
- Search by description or IP address
- Export as CSV

#### C. Security Insights
- Highlight suspicious activity (logins from new locations)
- Failed login attempts
- "Was this you?" prompts for unusual activity

---

## 16. Settings

**Route:** `/account/settings`  
**Purpose:** Configure account-wide preferences

### Features

#### A. General Settings
- Account Name
- Primary Email
- Time Zone
- Language
- Date Format (MM/DD/YYYY or DD/MM/YYYY)
- Currency Preference

#### B. Privacy Settings
- Profile Visibility (Public, Private, Community Only)
- Show email to other users (Yes/No)
- Activity visibility (who can see your activity)

#### C. Notification Settings
- Detailed toggles for each notification type
- Delivery method per type (Email, SMS, In-App)
- Do Not Disturb hours
- Digest preferences

#### D. Security Settings
- Two-Factor Authentication (Enable/Disable)
- Login Alerts (notify on new device login)
- Auto-logout after inactivity (15 min, 30 min, 1 hour, Never)
- Trusted Devices Management

#### E. Integration Settings
- Connect external services (Zapier, Slack, etc.)
- Webhook URLs for events
- OAuth app connections

#### F. Developer Settings
- Enable Beta Features
- Participate in Beta Program
- Debug Mode (for support troubleshooting)

---

## Common UI Components & Patterns

### 1. Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### 2. Data Tables
- Use `<Table>` component from ui/table.tsx
- Sortable columns (click header to sort)
- Pagination (10, 25, 50, 100 items per page)
- Row selection (checkboxes)
- Row actions (dropdown menu)
- Empty state with illustration and message

### 3. Stats Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat) => (
    <Card key={stat.label}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
          <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

### 4. Status Badges
```tsx
<Badge variant={status === 'active' ? 'default' : 'destructive'}>
  {status}
</Badge>
```

**Variants:**
- `default` (blue) - Active, Completed
- `secondary` (gray) - Pending, Inactive
- `destructive` (red) - Expired, Failed, Error
- `outline` - Neutral information

### 5. Empty States
```tsx
<div className="flex flex-col items-center justify-center py-12">
  <IconComponent className="h-16 w-16 text-gray-300 mb-4" />
  <h3 className="text-xl font-semibold mb-2">No items found</h3>
  <p className="text-gray-600 mb-6">Get started by creating your first item</p>
  <Button>Create Item</Button>
</div>
```

### 6. Loading States
- Skeleton loaders for tables and cards
- Spinner for buttons during actions
- Progress bars for file uploads

### 7. Modals/Dialogs
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 8. Toast Notifications
```tsx
import { toast } from 'sonner';

// Success
toast.success('License activated successfully');

// Error
toast.error('Failed to download plugin');

// Info
toast.info('New update available');

// Warning
toast.warning('License expiring in 7 days');
```

---

## Responsive Design Guidelines

### Breakpoints
- **Mobile:** < 768px (1 column layouts)
- **Tablet:** 768px - 1024px (2 column layouts, collapsible sidebar)
- **Desktop:** > 1024px (full sidebar, 3-4 column grids)

### Mobile Optimizations
1. **Sidebar:** Hamburger menu (Sheet component)
2. **Tables:** Horizontal scroll or card view on mobile
3. **Forms:** Full-width inputs, stack form fields
4. **Stats:** Single column grid
5. **Navigation:** Bottom navigation bar (optional)

### Touch Targets
- Minimum 44x44px for buttons and clickable elements
- Adequate spacing between interactive elements
- Swipe gestures for card actions

---

## Authentication & Authorization

### Authentication Flow
1. **Login Page:** `/login`
   - Email + Password
   - "Remember Me" checkbox
   - "Forgot Password?" link
   - Social login options (Google, GitHub)
   - "Don't have an account? Sign up" link

2. **Sign Up Page:** `/signup`
   - Email, Password, Confirm Password
   - Terms acceptance checkbox
   - CAPTCHA (to prevent bots)
   - Email verification required

3. **Password Reset:** `/reset-password`
   - Email input → sends reset link
   - Reset link page → new password + confirm

4. **Email Verification:** `/verify-email?token=...`
   - Automatic verification on click
   - Redirect to dashboard after verification

### Authorization Levels
- **Free Users:** Limited to community and documentation
- **Single License Holders:** Access to own licenses, downloads, support
- **Multiple License Holders:** All features
- **Business/Enterprise:** Team management, API access, priority support
- **Admin/Team Members:** Role-based access (as defined by owner)

### Session Management
- Session duration: 30 days (remember me) or 7 days (default)
- Auto-logout after 30 minutes of inactivity
- Concurrent session limit: 3 devices
- Revoke sessions remotely

---

## Security Considerations

### Data Protection
- HTTPS everywhere (already implemented)
- License keys masked by default (click to reveal)
- Payment data handled by Stripe (PCI compliant)
- No storage of credit card numbers
- API keys shown only once upon creation

### Input Validation
- Server-side validation for all forms
- Sanitize user inputs (prevent XSS)
- Rate limiting on sensitive endpoints (login, password reset)
- CSRF protection on all POST requests

### Access Control
- Row-level security (users can only access their own data)
- Team members see only authorized data
- API keys scoped to specific permissions
- Audit logs for sensitive actions

---

## Performance Optimizations

### Frontend
- Code splitting by route (Next.js automatic)
- Lazy loading for heavy components
- Image optimization (next/image)
- Prefetch links for instant navigation
- Debounce search inputs
- Virtualized lists for long tables (react-virtual)

### Backend
- Database indexing on frequently queried fields
- Caching of static data (licenses, products)
- Rate limiting to prevent abuse
- Paginated API responses
- Background jobs for heavy tasks (email sending, report generation)

---

## Accessibility (WCAG 2.1 AA)

### Requirements
- Keyboard navigation support (Tab, Enter, Esc)
- Focus indicators on all interactive elements
- Screen reader friendly (ARIA labels)
- Color contrast ratio ≥ 4.5:1
- Alt text for all images
- Skip to main content link
- Form labels and error messages
- Accessible data tables (headers, captions)

---

## Analytics & Tracking

### User Behavior Analytics
- Page views (which dashboard pages are most visited)
- Feature usage (which features are used most)
- Conversion funnels (sign up → purchase → activation)
- Time spent on each page
- Click tracking on CTAs

**Tools:** Google Analytics, Mixpanel, or PostHog

### Business Metrics
- Monthly Active Users (MAU)
- Daily Active Users (DAU)
- Retention rate (% users returning after 7/30 days)
- Churn rate
- Support ticket resolution time
- API usage per key

### Dashboards for Admin
- Internal admin dashboard showing:
  - Total users, active licenses, revenue
  - Support ticket metrics
  - Most popular plugins
  - Expiring licenses (for renewal campaigns)

---

## Testing Strategy

### Unit Tests
- Test utility functions (license validation, date formatting)
- Test API endpoint handlers

### Integration Tests
- Test authentication flows
- Test license activation/deactivation
- Test payment processing (Stripe test mode)

### End-to-End Tests (E2E)
- Playwright or Cypress
- Critical user journeys:
  1. Sign up → purchase → download → activate
  2. Login → open support ticket → receive reply
  3. Renew license → payment → updated expiry

### Accessibility Tests
- Automated: Axe, Pa11y
- Manual: Keyboard navigation, screen reader testing

---

## Deployment & DevOps

### CI/CD Pipeline
1. **Development:** Local development with hot reload
2. **Staging:** Deployed to Vercel preview on PR creation
3. **Production:** Deployed to Vercel on merge to main

### Environment Variables
```env
# Authentication
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Email
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...

# API
API_BASE_URL=https://api.printjones.com
API_VERSION=v1

# Feature Flags
ENABLE_BETA_FEATURES=false
ENABLE_ANALYTICS_DASHBOARD=true
```

### Monitoring
- **Uptime:** Uptime Robot, Pingdom
- **Errors:** Sentry for error tracking
- **Performance:** Vercel Analytics, Web Vitals
- **Logs:** Centralized logging (Logtail, Datadog)

---

## Future Enhancements (Phase 2+)

### Advanced Features
1. **Mobile App:** React Native app for iOS/Android
2. **Desktop App:** Electron app for managing licenses offline
3. **Browser Extension:** Quick access to licenses and downloads
4. **CLI Tool:** Command-line interface for developers
5. **Plugin Manager:** WordPress plugin to manage licenses from WP admin
6. **White Label Dashboard:** For agencies to offer to clients
7. **Multi-Currency:** Dynamic pricing based on location
8. **Localization:** Translate dashboard to 10+ languages
9. **Advanced Analytics:** Cohort analysis, revenue forecasting
10. **AI Assistant:** Chatbot for instant support

### Integrations
- **Zapier:** Automate workflows (e.g., new license → Slack notification)
- **Webhooks:** Real-time notifications to external systems
- **Slack:** Support ticket notifications in Slack
- **GitHub:** Link licenses to GitHub repos
- **Jira:** Integrate support tickets with Jira
- **Google Analytics:** Enhanced ecommerce tracking

---

## Documentation for Development Team

### File Structure
```
app/
├── account/
│   ├── layout.tsx              # Shared layout with sidebar
│   ├── page.tsx                # Dashboard (overview)
│   ├── licenses/
│   │   ├── page.tsx            # Licenses list
│   │   └── [id]/page.tsx       # License details
│   ├── downloads/page.tsx
│   ├── orders/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── invoices/page.tsx
│   ├── support/
│   │   ├── page.tsx
│   │   ├── new/page.tsx        # Create ticket
│   │   └── [id]/page.tsx       # Ticket details
│   ├── community/page.tsx
│   ├── profile/page.tsx
│   ├── billing/page.tsx
│   ├── team/page.tsx
│   ├── notifications/page.tsx
│   ├── referrals/page.tsx
│   ├── analytics/page.tsx
│   ├── api/page.tsx
│   ├── activity/page.tsx
│   └── settings/page.tsx

components/
├── account/
│   ├── sidebar.tsx             # Sidebar navigation
│   ├── stats-card.tsx          # Reusable stat card
│   ├── license-table.tsx       # License data table
│   ├── order-card.tsx          # Order summary card
│   └── ...

lib/
├── api/
│   ├── licenses.ts             # License API calls
│   ├── orders.ts
│   ├── support.ts
│   └── ...
├── auth.ts                     # Authentication helpers
├── database.types.ts           # TypeScript types for DB
└── utils.ts                    # Utility functions
```

### API Routes (Next.js)
```
app/api/
├── auth/
│   ├── login/route.ts
│   ├── logout/route.ts
│   ├── signup/route.ts
│   └── reset-password/route.ts
├── licenses/
│   ├── route.ts                # GET /api/licenses (list)
│   ├── [id]/route.ts           # GET /api/licenses/[id] (details)
│   └── [id]/activate/route.ts  # POST activate
├── downloads/
│   └── [slug]/route.ts         # GET download plugin
├── support/
│   ├── route.ts                # GET tickets, POST new
│   └── [id]/route.ts           # GET/PATCH ticket
└── webhooks/
    └── stripe/route.ts          # POST Stripe webhooks
```

---

## Summary

The User Dashboard provides a comprehensive, intuitive, and powerful interface for PrintJones customers to manage their licenses, downloads, orders, support, and account settings. The sidebar navigation pattern ensures consistency with the documentation pages and provides easy access to all features.

**Key Features:**
✅ 16 dashboard pages covering all user needs  
✅ Sidebar navigation with icons and badges  
✅ Responsive design (mobile, tablet, desktop)  
✅ Real-time data and notifications  
✅ Secure authentication and role-based access  
✅ Premium UX with polished UI components  
✅ Accessibility and performance optimized  
✅ Comprehensive analytics and insights  
✅ Team collaboration features  
✅ API access for developers  

**Next Steps:**
1. Review and approve this specification
2. Break down into development tasks
3. Prioritize features (MVP vs Phase 2)
4. Design mockups (Figma)
5. Develop and test iteratively
6. Launch beta to select users
7. Gather feedback and iterate
8. Launch to all users

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-13  
**Author:** Droid - Factory AI  
**Status:** Ready for Review and Implementation
