'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';
import { getPluginDisplayName, getPluginDisplayPrice } from '@/lib/utils';
import { fallbackPlugins } from '@/data/fallback-plugins';

interface PluginItem {
  id: string | number;
  name: string;
  slug: string;
  version: string;
  updated_at?: string;
  download_url?: string | null;
  tagline?: string;
  categoryName?: string;
  categorySlug?: string;
}

function computeVersions(current: string | undefined) {
  const base = current && /^\d+\.\d+\.\d+$/.test(current) ? current : '1.0.0';
  const [maj, min, pat] = base.split('.').map((n) => parseInt(n, 10));
  const v1 = `${maj}.${min}.${pat}`;
  const v2 = `${maj}.${Math.max(0, min - 1)}.${pat}`;
  const v3 = `${maj}.${Math.max(0, min - 2)}.${pat}`;
  return [v1, v2, v3];
}

async function fetchDownloads(): Promise<PluginItem[]> {
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('plugins' as any)
      .select(`
        *,
        categories(name, slug)
      ` as any)
      .eq('is_active', true)
      .order('download_count', { ascending: false });
    if (error) throw error;
    if (data && data.length) {
      return (data as any[]).map((p) => ({
        id: p.id,
        name: getPluginDisplayName(p as any),
        slug: p.slug,
        version: p.version ?? '1.0.0',
        updated_at: p.updated_at ?? new Date().toISOString(),
        download_url: p.download_url ?? null,
        tagline: p.tagline,
        categoryName: p.categories?.name ?? undefined,
        categorySlug: p.categories?.slug ?? undefined,
      }));
    }
  } catch {}
  // Fallback curated list
  return (fallbackPlugins as any[]).map((p) => ({
    id: p.id,
    name: getPluginDisplayName(p as any),
    slug: p.slug,
    version: p.version ?? '1.0.0',
    updated_at: new Date().toISOString(),
    download_url: p.download_url ?? null,
    tagline: p.tagline,
    categoryName: (p as any).categories?.name,
    categorySlug: (p as any).categories?.slug,
  }));
}

export function DownloadsGrid() {
  const [plugins, setPlugins] = useState<PluginItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<Record<string | number, string>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    let mounted = true;
    fetchDownloads()
      .then((items) => {
        if (!mounted) return;
        setPlugins(items);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    plugins.forEach((p) => {
      if (p.categorySlug && p.categoryName) map.set(p.categorySlug, p.categoryName);
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [plugins]);

  const filtered = useMemo(() => {
    let data = [...plugins];
    const ql = q.trim().toLowerCase();
    if (ql) {
      data = data.filter((p) => [p.name, p.slug, p.tagline].filter(Boolean).some((s) => String(s).toLowerCase().includes(ql)));
    }
    if (category !== 'all') {
      data = data.filter((p) => p.categorySlug === category);
    }
    return data;
  }, [plugins, q, category]);

  function recordHistory(p: PluginItem, version: string) {
    try {
      const raw = localStorage.getItem('downloadHistory');
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift({ plugin: p.name, slug: p.slug, version, date: new Date().toISOString(), ip: '' });
      localStorage.setItem('downloadHistory', JSON.stringify(arr.slice(0, 200)));
    } catch {}
  }

  function onDownload(p: PluginItem) {
    const version = selectedVersion[p.id] || computeVersions(p.version)[0];
    if (!p.download_url) {
      toast.error('Download not available yet');
      return;
    }
    const url = `${p.download_url}${p.download_url.includes('?') ? '&' : '?'}v=${encodeURIComponent(version)}`;
    window.open(url, '_blank');
    recordHistory(p, version);
  }

  async function downloadSelected() {
    if (selectedIds.size === 0) return;
    toast.info(`Starting ${selectedIds.size} download(s)`);
    for (const id of Array.from(selectedIds)) {
      const p = plugins.find((x) => x.id === id);
      if (!p) continue;
      onDownload(p);
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  function downloadAllLatest() {
    toast.info('Starting downloads for all plugins');
    filtered.forEach((p, idx) => {
      setTimeout(() => onDownload(p), idx * 150);
    });
  }

  function toggleSelected(id: string | number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (plugins.length === 0) {
    return <div className="text-gray-500">No downloads yet.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search plugins..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-64"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={downloadAllLatest}>Download All Latest</Button>
          <Button onClick={downloadSelected} disabled={selectedIds.size === 0}>
            Download Selected
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => {
          const versions = computeVersions(p.version);
          const priceBadge = <Badge className="bg-blue-600">${getPluginDisplayPrice(p as any)}</Badge>;
          const isSelected = selectedIds.has(p.id);
          return (
            <Card key={p.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    PJ
                  </div>
                  {priceBadge}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl line-clamp-1">{p.name}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">{p.tagline}</CardDescription>
                  </div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelected(p.id)}
                      className="h-4 w-4"
                    />
                    Select
                  </label>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Badge variant="outline">Current {p.version}</Badge>
                  {p.categoryName ? (
                    <>
                      <span>•</span>
                      <Badge variant="outline">{p.categoryName}</Badge>
                    </>
                  ) : null}
                  <span>•</span>
                  <span>Updated {new Date(p.updated_at || '').toLocaleDateString()}</span>
                </div>
                <div className="mt-4">
                  <Select value={selectedVersion[p.id] || versions[0]} onValueChange={(v) => setSelectedVersion((s) => ({ ...s, [p.id]: v }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Version" />
                    </SelectTrigger>
                    <SelectContent>
                      {versions.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onDownload(p)}>
                Download
              </Button>
                <div className="flex items-center justify-between w-full text-sm">
                  <Link href="#" className="text-blue-600 hover:underline">View Changelog</Link>
                  <Link href="/docs" className="text-blue-600 hover:underline">View Documentation</Link>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
