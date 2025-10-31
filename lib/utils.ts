import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPluginDisplayName(p: { slug?: string; name: string }) {
  if (p?.slug === 'aioa-elementor') return 'PJ Essential Addons for Elementor';
  return p?.name;
}

export function getPluginDisplaySlug(p: { slug: string }) {
  if (!p?.slug) return p?.slug as any;
  if (p.slug === 'pj-product-filter') return 'pj-filter';
  return p.slug;
}
