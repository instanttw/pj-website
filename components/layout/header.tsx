'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { AuthModal } from '@/components/auth/auth-modal';
import { supabase } from '@/lib/supabase';

const navigation = [
  { name: 'Axiom', href: '#' },
  { name: 'Plugins', href: '/plugins' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Support', href: '/support' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setIsAuthed(!!data.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setIsAuthed(!!session?.user);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleAccountClick = () => {
    if (isAuthed) {
      router.push('/account');
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">PrintJones</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form
              className="relative w-full"
              onSubmit={(e) => {
                e.preventDefault();
                const query = q.trim();
                if (query) router.push(`/plugins?search=${encodeURIComponent(query)}`);
              }}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search plugins..."
                className="w-full pl-10"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/verify-license" className="hidden md:block">
              <Button variant="ghost" size="sm">
                Verify License
              </Button>
            </Link>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleAccountClick}>
              My Account
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/verify-license"
                    className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Verify License
                  </Link>
                  <button
                    className="text-left text-lg font-medium text-blue-600 hover:text-blue-700"
                    onClick={() => {
                      setMobileOpen(false);
                      handleAccountClick();
                    }}
                  >
                    My Account
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        onSuccess={() => {
          setAuthOpen(false);
          router.push('/account');
        }}
      />
    </header>
  );
}
