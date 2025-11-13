import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Missing email or password' }, { status: 400 });
    }

    // Create user with email auto-confirmed, saving name in user_metadata
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: name ? { name } : undefined,
    });

    if (error) {
      // If user already exists, surface 409 to let client attempt login next
      const status = (error as any)?.status ?? 500;
      return NextResponse.json({ ok: false, error: error.message }, { status: status === 422 ? 409 : status });
    }

    return NextResponse.json({ ok: true, user: data.user });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Signup failed' }, { status: 500 });
  }
}
