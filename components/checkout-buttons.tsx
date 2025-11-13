"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Download, CreditCard } from 'lucide-react';

async function postJson(url: string, body: any) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export function CheckoutButtons({
  slug,
  price,
  downloadUrl,
  name,
}: {
  slug: string;
  price: number;
  downloadUrl?: string | null;
  name?: string;
}) {
  const [loading, setLoading] = useState<'stripe' | 'paypal' | null>(null);

  const handleStripe = async () => {
    try {
      setLoading('stripe');
      const { url } = await postJson('/api/checkout/stripe', { slug, quantity: 1 });
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
      setLoading(null);
      alert('Unable to start Stripe checkout.');
    }
  };

  const handlePayPal = async () => {
    try {
      setLoading('paypal');
      const order = await postJson('/api/checkout/paypal', { slug });
      const approve = (order?.links || []).find((l: any) => l.rel === 'approve');
      if (approve?.href) window.location.href = approve.href;
      else throw new Error('No approval link');
    } catch (e) {
      console.error(e);
      setLoading(null);
      alert('Unable to start PayPal checkout.');
    }
  };

  return (
    <div className="space-y-3">
      <Button
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
        onClick={handleStripe}
        disabled={loading !== null}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        {loading === 'stripe' ? 'Processing…' : `Add to Cart - $${price}`}
      </Button>

      <Button
        size="lg"
        variant="outline"
        className="w-full border-2 border-gray-300"
        onClick={handlePayPal}
        disabled={loading !== null}
      >
        <CreditCard className="w-5 h-5 mr-2" />
        {loading === 'paypal' ? 'Opening PayPal…' : 'Pay with PayPal'}
      </Button>

      {downloadUrl ? (
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button size="lg" variant="outline" className="w-full border-2 border-gray-300">
            <Download className="w-5 h-5 mr-2" />
            Download Core Version
            <sup className="ml-1 text-xs text-gray-500 align-super">Free</sup>
          </Button>
        </a>
      ) : (
        <Button
          size="lg"
          variant="outline"
          disabled
          className="w-full border-2 border-gray-200 bg-white text-gray-700 opacity-100 disabled:opacity-100 cursor-not-allowed"
        >
          <Download className="w-5 h-5 mr-2 text-gray-600" />
          Download Core Version
          <sup className="ml-1 text-xs text-gray-600 align-super">Free</sup>
        </Button>
      )}
    </div>
  );
}
