'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountDashboardPage() {
  const [counts, setCounts] = useState({ licenses: 0, tickets: 0, downloads: 0 });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data: user } = await supabase.auth.getUser();
      const userId = user.user?.id;
      if (!userId) return;
      const [{ count: licCount }, { count: tixCount }] = await Promise.all([
        supabase.from('licenses' as any).select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('support_tickets' as any).select('*', { count: 'exact', head: true }).eq('user_id', userId),
      ]);
      if (mounted) setCounts({ licenses: licCount || 0, tickets: tixCount || 0, downloads: licCount || 0 });
    })();
    return () => { mounted = false; };
  }, []);

  const stats = [
    { label: 'Active Licenses', value: counts.licenses },
    { label: 'Open Tickets', value: counts.tickets },
    { label: 'Downloads', value: counts.downloads },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
