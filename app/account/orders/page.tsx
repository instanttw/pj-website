'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser();
      const userId = user.user?.id;
      if (!userId) return;
      const { data } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      setOrders(data || []);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="border rounded-md p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order #{o.id.slice(0, 8).toUpperCase()}</div>
                  <div className="text-sm text-gray-600">{new Date(o.created_at).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${o.total_amount}</div>
                  <div className="text-sm text-gray-600">{o.status}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
