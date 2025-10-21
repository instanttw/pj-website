'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Calendar, Shield } from 'lucide-react';

export default function VerifyLicensePage() {
  const [licenseKey, setLicenseKey] = useState('');
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!licenseKey) {
      setError('Please enter a license key');
      return;
    }

    setResult({
      status: 'active',
      plugin: 'SEO Optimizer Pro',
      licenseType: 'Business',
      purchaseDate: '2024-01-15',
      expirationDate: '2025-01-15',
      activationsUsed: 2,
      activationsLimit: 5,
      activatedDomains: [
        { domain: 'example.com', activatedAt: '2024-01-15' },
        { domain: 'demo.com', activatedAt: '2024-02-01' },
      ],
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">Home</Link>
          {' / '}
          <span className="text-black">Verify License</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Verify Your License</h1>
          <p className="text-gray-600">
            Check your license status and manage activations
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter License Information</CardTitle>
            <CardDescription>
              Your license key can be found in your purchase email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="license-key">License Key *</Label>
                <Input
                  id="license-key"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Domain (Optional)</Label>
                <Input
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                />
                <p className="text-sm text-gray-500">
                  Enter a domain to check if it's activated for this license
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Verify License
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <Card className={result.status === 'active' ? 'border-green-500' : 'border-red-500'}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {result.status === 'active' ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <span>License Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-red-600" />
                        <span>License Inactive</span>
                      </>
                    )}
                  </CardTitle>
                  <Badge variant={result.status === 'active' ? 'default' : 'destructive'}>
                    {result.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Plugin</p>
                    <p className="font-semibold text-black">{result.plugin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">License Type</p>
                    <p className="font-semibold text-black">{result.licenseType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Purchase Date</p>
                    <p className="font-semibold text-black">
                      {new Date(result.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Expiration Date</p>
                    <p className="font-semibold text-black">
                      {result.expirationDate
                        ? new Date(result.expirationDate).toLocaleDateString()
                        : 'Lifetime'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Activations</p>
                    <Badge variant="secondary">
                      {result.activationsUsed} of {result.activationsLimit} sites
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(result.activationsUsed / result.activationsLimit) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.activatedDomains && result.activatedDomains.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Activated Domains</CardTitle>
                  <CardDescription>
                    Sites currently using this license
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.activatedDomains.map((activation: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-black">{activation.domain}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Activated: {new Date(activation.activatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Deactivate
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Download Latest Version
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">Version 2.5.0</p>
                    <p className="text-sm text-gray-600">Released on March 15, 2024</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Download</Button>
                </div>
                <Link href={`/plugins/${result.plugin.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="outline" className="w-full">
                    View Changelog
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link href="/account">
                <Button variant="ghost">View All Licenses →</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
