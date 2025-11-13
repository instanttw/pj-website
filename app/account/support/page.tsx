'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser();
      const userId = user.user?.id;
      if (!userId) return;
      const { data } = await supabase.from('support_tickets').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      setTickets(data || []);
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <Link href="/account/support/new"><Button className="bg-blue-600 hover:bg-blue-700">New Ticket</Button></Link>
      </div>
      {tickets.length === 0 ? (
        <p className="text-gray-600">You have no tickets.</p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((t) => (
            <li key={t.id} className="border rounded-md p-3">
              <div className="font-medium">{t.subject}</div>
              <div className="text-sm text-gray-600">{t.status} • {new Date(t.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
