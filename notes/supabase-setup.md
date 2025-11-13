# Supabase setup for the User Dashboard

Follow these steps once per project to make the dashboard pages work with real data.

1. Authentication
- In Authentication → Providers → Email, disable "Confirm email" (Option B) to allow instant signup.

2. Environment variables (Vercel)
- NEXT_PUBLIC_SUPABASE_URL = https://<project-ref>.supabase.co (no trailing slash)
- NEXT_PUBLIC_SUPABASE_ANON_KEY = <anon key from Supabase Settings → API>
- SUPABASE_SERVICE_ROLE_KEY = <service role key> (used only by server webhooks)
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET (webhook sync)
- PAYPAL_WEBHOOK_TOKEN (shared token to secure PayPal sync endpoint)
- Redeploy after setting these.

3. Database tables & policies
- Open Supabase SQL Editor.
- Paste and run notes/supabase-setup.sql from this repo.
  - This creates public catalog (categories, plugins, plugin_pricing), account-owned (licenses, support_tickets), and orders/invoices/billing tables with RLS.

4. Stripe/PayPal → Supabase sync (Option B)
- Stripe: include metadata in Checkout Session:
  - supabase_user_id (UUID)
  - plugin_id, pricing_id (map your products/prices to plugins/pricing)
- Configure your Stripe webhook to POST to /api/webhooks/stripe with STRIPE_WEBHOOK_SECRET.
- PayPal: POST a compact payload to /api/webhooks/paypal from your existing server with header x-webhook-token = PAYPAL_WEBHOOK_TOKEN.
  - Body shape { user_id, total_amount, items: [{ plugin_id, pricing_id, price }], invoice_number?, status? }

5. Test
- Sign up via the modal (no email confirm required) → should create and sign in immediately.
- Insert or purchase a license; Licenses/Downloads should reflect real data.
- Create a ticket from /account/support/new.

6. Troubleshooting
- net::ERR_NAME_NOT_RESOLVED or 404 to /rest/v1/* means NEXT_PUBLIC_SUPABASE_URL is wrong.
- 422 on signup means the email exists; log in instead.
- Empty pages: no data or RLS blocking; verify policies and user_id.
- Stripe webhook 400: verify signature env and raw body handling; ensure metadata fields exist.
- PayPal sync 401: verify x-webhook-token matches PAYPAL_WEBHOOK_TOKEN.
