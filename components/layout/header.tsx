'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Package, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const navigation = [
  { name: 'Plugins', href: '/plugins' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Support', href: '/support' },
  { name: 'About', href: '/about' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <Package className="h-5 w-5 text-white" />
              </div>
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
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search services..."
                className="w-full pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/verify-license" className="hidden md:block">
              <Button variant="ghost" size="sm">
                Verify License
              </Button>
            </Link>
            <Link href="/account">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                My Account
              </Button>
            </Link>

            <Sheet>
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
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/verify-license"
                    className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                  >
                    Verify License
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
