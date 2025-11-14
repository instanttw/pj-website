import type { MetadataRoute } from 'next';
import { fallbackPlugins } from '@/data/fallback-plugins';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printjones.com';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/plugins',
    '/docs',
    '/support',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/licensing',
    '/verify-license',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  const pluginRoutes: MetadataRoute.Sitemap = fallbackPlugins.map((plugin) => ({
    url: `${baseUrl}/plugins/${plugin.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...pluginRoutes];
}
