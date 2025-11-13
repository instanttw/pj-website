'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Row {
  plugin: string;
  slug: string;
  version: string;
  date: string; // ISO
  ip?: string;
}

function toCSV(rows: Row[]) {
  const headers = ['Plugin', 'Slug', 'Version', 'Download Date', 'IP Address'];
  const data = rows.map((r) => [r.plugin, r.slug, r.version, new Date(r.date).toISOString(), r.ip || '']);
  return [headers, ...data].map((line) => line.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n');
}

export function DownloadHistory() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('downloadHistory');
      const arr = raw ? JSON.parse(raw) : [];
      setRows(arr);
    } catch {
      setRows([]);
    }
  }, []);

  function refresh() {
    try {
      const raw = localStorage.getItem('downloadHistory');
      const arr = raw ? JSON.parse(raw) : [];
      setRows(arr);
    } catch {
      setRows([]);
    }
  }

  function clearAll() {
    localStorage.removeItem('downloadHistory');
    setRows([]);
  }

  function exportCSV() {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'download-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Download History</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh}>Refresh</Button>
          <Button variant="outline" onClick={exportCSV} disabled={rows.length === 0}>Export CSV</Button>
          <Button variant="destructive" onClick={clearAll} disabled={rows.length === 0}>Clear</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plugin</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Download Date</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">No downloads yet</TableCell>
              </TableRow>
            ) : (
              rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{r.plugin}</TableCell>
                  <TableCell>{r.version}</TableCell>
                  <TableCell>{new Date(r.date).toLocaleString()}</TableCell>
                  <TableCell>{r.ip || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
