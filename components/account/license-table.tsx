'use client';

import { useEffect, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { LicenseDetailsDialog } from '@/components/account/license-details-dialog';

export type LicenseStatus = 'active' | 'expiring' | 'expired';
export type LicenseType = 'Personal' | 'Business' | 'Enterprise';

export interface LicenseRow {
  id: string;
  pluginName: string;
  licenseKey: string;
  type: LicenseType;
  used: number;
  total: number;
  expiry: string; // ISO date
  status: LicenseStatus;
}

function maskKey(key: string, reveal: boolean) {
  if (reveal) return key;
  if (!key) return '';
  const visible = 4;
  const masked = key.slice(0, visible) + '•'.repeat(Math.max(0, key.length - visible - visible)) + key.slice(-visible);
  return masked;
}

function statusBadge(status: LicenseStatus) {
  switch (status) {
    case 'active':
      return <Badge variant="default">Active</Badge>;
    case 'expiring':
      return <Badge variant="secondary">Expiring Soon</Badge>;
    case 'expired':
      return <Badge variant="destructive">Expired</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}

async function fetchLicenses(userId: string | null): Promise<LicenseRow[]> {
  try {
    if (!userId) return [];
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('licenses' as any)
      .select('*' as any)
      .eq('user_id', userId);
    if (error) throw error;
    if (Array.isArray(data) && data.length) {
      return data.map((d: any) => ({
        id: String(d.id),
        pluginName: d.plugin_name ?? d.plugin ?? 'Unknown Plugin',
        licenseKey: d.license_key ?? '',
        type: (d.license_type ?? 'Personal') as LicenseType,
        used: Number(d.sites_used ?? 0),
        total: Number(d.sites_total ?? 0),
        expiry: d.expiry_date ?? new Date().toISOString(),
        status: (d.status ?? 'active') as LicenseStatus,
      }));
    }
  } catch (e) {
    // ignore; show empty
  }
  return [];
}

export function LicenseTable() {
  const [rows, setRows] = useState<LicenseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealIds, setRevealIds] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | LicenseStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | LicenseType>('all');
  const [sortBy, setSortBy] = useState<'expiry' | 'plugin' | 'type'>('expiry');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState<LicenseRow | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id ?? null;
      const dataRows = await fetchLicenses(userId);
      if (mounted) setRows(dataRows);
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    let data = [...rows];
    const ql = q.trim().toLowerCase();
    if (ql) {
      data = data.filter((r) =>
        [r.pluginName, r.licenseKey, r.type, r.status].some((s) => String(s).toLowerCase().includes(ql))
      );
    }
    if (statusFilter !== 'all') {
      data = data.filter((r) => r.status === statusFilter);
    }
    if (typeFilter !== 'all') {
      data = data.filter((r) => r.type === typeFilter);
    }
    data.sort((a, b) => {
      if (sortBy === 'expiry') {
        const da = new Date(a.expiry).getTime();
        const db = new Date(b.expiry).getTime();
        return sortDir === 'asc' ? da - db : db - da;
      }
      if (sortBy === 'plugin') {
        return sortDir === 'asc'
          ? a.pluginName.localeCompare(b.pluginName)
          : b.pluginName.localeCompare(a.pluginName);
      }
      // type
      return sortDir === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
    });
    return data;
  }, [rows, q, statusFilter, typeFilter, sortBy, sortDir]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setPage(1);
  }, [q, statusFilter, typeFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  const pageRows = filtered.slice(start, end);

  function toggleReveal(id: string) {
    setRevealIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function copyKey(key: string) {
    try {
      await navigator.clipboard.writeText(key);
      toast.success('License key copied');
    } catch (e) {
      toast.error('Failed to copy');
    }
  }

  function openDetails(row: LicenseRow) {
    setSelected(row);
    setDetailsOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by plugin or key..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-64"
          />
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
          <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="25">25 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
              <SelectItem value="100">100 / page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setSortBy('expiry'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}>
            Sort by Expiry ▼
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plugin Name</TableHead>
              <TableHead>License Key</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sites</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">Loading...</TableCell>
              </TableRow>
            ) : pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">No licenses found</TableCell>
              </TableRow>
            ) : (
              pageRows.map((r) => {
                const reveal = !!revealIds[r.id];
                const expiry = new Date(r.expiry).toLocaleDateString();
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">
                      <button className="text-left text-blue-600 hover:underline" onClick={() => openDetails(r)}>
                        {r.pluginName}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{maskKey(r.licenseKey, reveal)}</span>
                        <Button variant="ghost" size="sm" onClick={() => toggleReveal(r.id)}>
                          {reveal ? 'Hide' : 'Show'}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => copyKey(r.licenseKey)}>
                          Copy
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{r.used} / {r.total}</TableCell>
                    <TableCell>{expiry}</TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions ⋯
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetails(r)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDetails(r)}>Manage Activations</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Renew License')}>Renew License</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Upgrade License')}>Upgrade License</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Transfer License')}>Transfer License</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Download Plugin')}>Download Plugin</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyKey(r.licenseKey)}>Copy License Key</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {start + 1}-{Math.min(end, total)} of {total}</div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, current - 1)); }} />
            </PaginationItem>
            {Array.from({ length: totalPages }).slice(0, 7).map((_, idx) => {
              const p = idx + 1;
              return (
                <PaginationItem key={p}>
                  <PaginationLink href="#" isActive={p === current} onClick={(e) => { e.preventDefault(); setPage(p); }}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, current + 1)); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <LicenseDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} license={selected} />
    </div>
  );
}
