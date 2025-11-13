'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import dynamicImport from 'next/dynamic';

const DownloadsGrid = dynamicImport(() => import('@/components/account/downloads-grid').then(m => m.DownloadsGrid), { ssr: false });
const DownloadHistory = dynamicImport(() => import('@/components/account/download-history').then(m => m.DownloadHistory), { ssr: false });

export default function DownloadsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Downloads</h1>
        <p className="text-gray-600">Access your purchased plugins and versions.</p>
      </div>
      <DownloadsGrid />
      <DownloadHistory />
    </div>
  );
}
