'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { LicenseRow, LicenseStatus } from './license-table';
import { useMemo, useState } from 'react';
import { Copy } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  license: LicenseRow | null;
}

export function LicenseDetailsDialog({ open, onOpenChange, license }: Props) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const versions = useMemo(() => {
    if (!license) return [];
    // Generate 3 versions based on a semantic-like string if available
    const base = '1.0.0';
    const list = [base, '0.9.0', '0.8.5'];
    return list;
  }, [license]);

  if (!license) return null;

  const usedPct = Math.min(100, Math.round((license.used / Math.max(1, license.total)) * 100));

  function badgeFor(status: LicenseStatus) {
    if (status === 'active') return <Badge>Active</Badge>;
    if (status === 'expiring') return <Badge variant="secondary">Expiring Soon</Badge>;
    return <Badge variant="destructive">Expired</Badge>;
  }

  const expiry = new Date(license.expiry).toLocaleDateString();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{license.pluginName} — License Details</span>
            {badgeFor(license.status)}
          </DialogTitle>
          <DialogDescription>View license info, activations, downloads, and renewal options.</DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* 1. License Information */}
          <section>
            <h3 className="text-lg font-semibold mb-3">License Information</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-500">License Key</div>
                <div className="font-mono flex items-center gap-2">
                  {license.licenseKey}
                  <Button variant="ghost" size="sm" onClick={async () => { await navigator.clipboard.writeText(license.licenseKey); toast.success('Copied'); }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-gray-500">License Type</div>
                <div className="font-medium">{license.type}</div>
              </div>
              <div>
                <div className="text-gray-500">Expiry Date</div>
                <div className="font-medium">{expiry}</div>
              </div>
              <div>
                <div className="text-gray-500">Status</div>
                <div className="font-medium">{badgeFor(license.status)}</div>
              </div>
            </div>
          </section>

          {/* 2. Active Installations */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Active Installations</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site URL</TableHead>
                    <TableHead>Site Name</TableHead>
                    <TableHead>Activated</TableHead>
                    <TableHead>Plugin Version</TableHead>
                    <TableHead className="w-[120px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[{ url: 'https://example.com', name: 'Example', date: '2025-08-01', version: '1.0.0' }].map((s, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <a href={s.url} target="_blank" className="text-blue-600 hover:underline" rel="noreferrer">
                          {s.url}
                        </a>
                      </TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{new Date(s.date).toLocaleDateString()}</TableCell>
                      <TableCell>{s.version}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => toast.info('Deactivate site')}>Deactivate</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 3. Usage Limits */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Usage Limits</h3>
            <div className="text-sm text-gray-600 mb-2">{license.used} of {license.total} sites used</div>
            <Progress value={usedPct} />
          </section>

          {/* 4. Download Options */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Download Options</h3>
            <div className="flex items-center gap-2">
              <Select value={selectedVersion ?? undefined} onValueChange={(v) => setSelectedVersion(v)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => toast.info(`Downloading ${selectedVersion || versions[0]}`)}>Download</Button>
            </div>
          </section>

          {/* 5. Renewal Options */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Renewal Options</h3>
            <div className="flex gap-2">
              <Button onClick={() => toast.info('Renew license')}>Renew License</Button>
              <Button variant="outline" onClick={() => toast.info('Upgrade plan')}>Upgrade</Button>
              <Button variant="outline" onClick={() => toast.info('Toggle auto-renew')}>Auto-Renew</Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
