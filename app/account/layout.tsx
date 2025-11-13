'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { AccountSidebar } from '@/components/account/sidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      const isAuthed = !!data.user;
      setAuthed(isAuthed);
      if (!isAuthed) {
        router.push('/');
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setAuthed(!!session?.user);
      if (!session?.user) router.push('/');
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  if (authed === null) {
    return (
      <div className="px-4 lg:px-8 py-12">Checking authentication...</div>
    );
  }

  if (!authed) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <AccountSidebar />
        </div>

        {/* Content */}
        <main className="flex-1">
          {/* Mobile sidebar trigger */}
          <div className="md:hidden sticky top-16 z-30 border-b bg-white">
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="font-semibold">Account</div>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px]">
                  <AccountSidebar onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="px-4 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
