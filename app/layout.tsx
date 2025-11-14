import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printjones.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Premium WordPress & WooCommerce Plugins | PrintJones',
    template: '%s | PrintJones',
  },
  description:
    'Premium WordPress and WooCommerce plugins focused on performance, SEO, and conversion. Built by developers, for teams that care about results.',
  openGraph: {
    title: 'Premium WordPress & WooCommerce Plugins | PrintJones',
    description:
      'Browse premium WordPress and WooCommerce plugins engineered for speed, SEO, and conversions. Trusted by thousands of sites worldwide.',
    url: '/',
    type: 'website',
    siteName: 'PrintJones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium WordPress & WooCommerce Plugins | PrintJones',
    description:
      'Premium WordPress and WooCommerce plugins engineered for performance, SEO, and conversions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
