import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Code, Wrench, LifeBuoy } from 'lucide-react';

const quickLinks = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly',
    href: '/docs/getting-started',
  },
  {
    icon: Code,
    title: 'Installation Guide',
    description: 'Step-by-step installation instructions',
    href: '/docs/installation',
  },
  {
    icon: Wrench,
    title: 'Configuration',
    description: 'Configure your plugins for optimal performance',
    href: '/docs/configuration',
  },
  {
    icon: LifeBuoy,
    title: 'Troubleshooting',
    description: 'Common issues and how to resolve them',
    href: '/docs/troubleshooting',
  },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to know about our WordPress plugins
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
            <CardDescription>Most viewed documentation articles</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/installation" className="text-blue-600 hover:underline">
                  How to install a plugin
                </Link>
              </li>
              <li>
                <Link href="/docs/license" className="text-blue-600 hover:underline">
                  Activating your license key
                </Link>
              </li>
              <li>
                <Link href="/docs/updates" className="text-blue-600 hover:underline">
                  Getting plugin updates
                </Link>
              </li>
              <li>
                <Link href="/docs/support" className="text-blue-600 hover:underline">
                  How to get support
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <Link href="/support" className="text-blue-600 hover:underline font-medium">
            Contact our support team →
          </Link>
        </div>
      </div>
    </div>
  );
}
