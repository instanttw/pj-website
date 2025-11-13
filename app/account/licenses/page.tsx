'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import dynamicImport from 'next/dynamic';

const LicenseTable = dynamicImport(() => import('@/components/account/license-table').then(m => m.LicenseTable), { ssr: false });

export default function LicensesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Licenses</h1>
        <p className="text-gray-600">Manage your plugin licenses and activations.</p>
      </div>
      <LicenseTable />
    </div>
  );
}
