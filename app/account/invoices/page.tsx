'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser();
      const userId = user.user?.id;
      if (!userId) return;
      const { data } = await supabase.from('invoices').select('*').eq('user_id', userId).order('issue_date', { ascending: false });
      setInvoices(data || []);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      {invoices.length === 0 ? (
        <p className="text-gray-600">You have no invoices yet.</p>
      ) : (
        <ul className="space-y-2">
          {invoices.map((inv) => (
            <li key={inv.id} className="border rounded-md p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Invoice {inv.invoice_number}</div>
                  <div className="text-sm text-gray-600">{new Date(inv.issue_date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${inv.amount}</div>
                  <div className="text-sm text-gray-600">{inv.status}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
