'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Key,
  Download,
  ShoppingBag,
  Receipt,
  HeadphonesIcon,
  MessageSquare,
  BookOpen,
  User,
  CreditCard,
  Users,
  Bell,
  Settings as SettingsIcon,
  Gift,
  TrendingUp,
  Code,
  History,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  onNavigate?: () => void;
}

const sections = [
  {
    title: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/account' },
      { icon: Key, label: 'Licenses', href: '/account/licenses' },
      { icon: Download, label: 'Downloads', href: '/account/downloads' },
      { icon: ShoppingBag, label: 'Orders', href: '/account/orders' },
      { icon: Receipt, label: 'Invoices', href: '/account/invoices' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HeadphonesIcon, label: 'Support Tickets', href: '/account/support' },
      { icon: MessageSquare, label: 'Community', href: '/account/community' },
      { icon: BookOpen, label: 'Documentation', href: '/docs', external: true },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile', href: '/account/profile' },
      { icon: CreditCard, label: 'Billing', href: '/account/billing' },
      { icon: Users, label: 'Team Members', href: '/account/team' },
      { icon: Bell, label: 'Notifications', href: '/account/notifications' },
      { icon: SettingsIcon, label: 'Settings', href: '/account/settings' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { icon: Gift, label: 'Referrals', href: '/account/referrals' },
      { icon: TrendingUp, label: 'Analytics', href: '/account/analytics' },
      { icon: Code, label: 'API Keys', href: '/account/api' },
      { icon: History, label: 'Activity Log', href: '/account/activity' },
    ],
  },
];

export function AccountSidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 border-r bg-white sticky top-16">
      <div className="p-4 flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-y-auto">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </div>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/account' && pathname?.startsWith(item.href));
                  const Icon = item.icon as any;
                  const linkClasses = clsx(
                    'flex items-center justify-between rounded-md px-3 py-2 text-sm',
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  );
                  const content = (
                    <div className="flex items-center gap-3">
                      <Icon className={clsx('h-4 w-4', isActive ? 'text-blue-700' : 'text-gray-500')} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  );

                  if (item.external) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                        onClick={onNavigate}
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link key={item.href} href={item.href} className={linkClasses} onClick={onNavigate}>
                      {content}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        {/* Single Logout at bottom */}
        <button
          onClick={async () => {
            const { supabase } = await import('@/lib/supabase');
            await supabase.auth.signOut();
            if (typeof window !== 'undefined') window.location.href = '/';
          }}
          className="mt-2 w-full text-left flex items-center justify-between rounded-md px-3 py-2 text-sm text-red-700 hover:bg-red-50"
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-4 w-4" />
            <span className="font-medium">Logout</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
