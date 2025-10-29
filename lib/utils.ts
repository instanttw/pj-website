import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPluginDisplayName(p: { slug?: string; name: string }) {
  if (p?.slug === 'aioa-elementor') return 'PJ Essential Addons for Elementor';
  return p?.name;
}
