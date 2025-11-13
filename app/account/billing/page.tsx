'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function BillingPage() {
  const [methods, setMethods] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser();
      const userId = user.user?.id;
      if (!userId) return;
      const { data } = await supabase.from('payment_methods').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      setMethods(data || []);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Billing</h1>
      {methods.length === 0 ? (
        <p className="text-gray-600">No saved payment methods.</p>
      ) : (
        <ul className="space-y-2 mb-6">
          {methods.map((m) => (
            <li key={m.id} className="border rounded-md p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{m.brand || 'Card'} •••• {m.last4}</div>
                <div className="text-sm text-gray-600">Exp {m.exp_month}/{m.exp_year}</div>
              </div>
              {m.is_default && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Default</span>}
            </li>
          ))}
        </ul>
      )}
      <Button disabled className="bg-blue-600 hover:bg-blue-700">Add Payment Method (Stripe)</Button>
    </div>
  );
}
