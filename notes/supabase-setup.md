# Supabase setup for the User Dashboard

Follow these steps once per project to make the dashboard pages work with real data.

1. Authentication
- In Authentication → Providers → Email, disable "Confirm email" (Option B) to allow instant signup.

2. Environment variables (Vercel)
- NEXT_PUBLIC_SUPABASE_URL = https://<project-ref>.supabase.co (no trailing slash)
- NEXT_PUBLIC_SUPABASE_ANON_KEY = <anon key from Supabase Settings → API>
- Redeploy after setting these.

3. Database tables & policies
- Open Supabase SQL Editor.
- Paste and run notes/supabase-setup.sql from this repo.
  - This creates:
    - public.licenses
    - public.support_tickets
  - Enables RLS and adds policies so users can only view/insert/update their own rows (user_id = auth.uid()).

4. Optional: plugins table
- If you want product data fetched from Supabase (outside the account pages), create a plugins table (schema is in lib/database.types.ts) and add a read-only policy for anon if you want public browsing.

5. Test
- Sign up via the modal (no email confirm required) → should create and sign in immediately.
- Licenses: empty until you insert rows with user_id = the user’s UUID.
- Downloads: derived from user’s licenses.
- Support: create tickets from /account/support/new; they appear in /account/support.

6. Troubleshooting
- net::ERR_NAME_NOT_RESOLVED or 404 to /rest/v1/* means NEXT_PUBLIC_SUPABASE_URL is wrong.
- 422 on signup means the email exists; log in instead.
- Empty pages mean no data found or RLS blocked the query; verify policies and user_id.
