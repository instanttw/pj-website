'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { DownloadsGrid } from '@/components/account/downloads-grid';
import { DownloadHistory } from '@/components/account/download-history';

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
