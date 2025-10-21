'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Clock } from 'lucide-react';

export default function SubmitTicketPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Ticket Submitted Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                Your ticket has been submitted. We'll respond within 24 hours.
              </p>
              <p className="text-sm text-gray-500">
                Ticket Number: <span className="font-mono font-semibold">#12345</span>
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link href="/support">
                  <Button variant="outline">Back to Support</Button>
                </Link>
                <Link href="/account/tickets">
                  <Button className="bg-blue-600 hover:bg-blue-700">View Tickets</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">Home</Link>
          {' / '}
          <Link href="/support" className="hover:text-black">Support</Link>
          {' / '}
          <span className="text-black">Submit Ticket</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-black mb-2">Submit a Support Ticket</h1>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you as soon as possible
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" required placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">License Key *</Label>
                <Input
                  id="license"
                  required
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="font-mono"
                />
                <p className="text-sm text-gray-500">
                  Your license key can be found in your purchase email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plugin">Plugin *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plugin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plugin1">SEO Optimizer Pro</SelectItem>
                    <SelectItem value="plugin2">Contact Form Builder</SelectItem>
                    <SelectItem value="plugin3">Analytics Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" required placeholder="Brief description of your issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  rows={8}
                  placeholder="Please provide as much detail as possible about your issue..."
                  className="resize-none"
                />
                <p className="text-sm text-gray-500">Minimum 50 characters</p>
              </div>

              <Alert>
                <AlertDescription>
                  Please include any relevant error messages, screenshots, or steps to reproduce the issue.
                </AlertDescription>
              </Alert>

              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Submit Ticket
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We typically respond to support tickets within 24 hours on business days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Before Submitting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Check if your question is already answered:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/docs" className="text-blue-600 hover:underline">
                      Search documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/support#faq" className="text-blue-600 hover:underline">
                      View common issues
                    </Link>
                  </li>
                  <li>
                    <Link href="/changelog" className="text-blue-600 hover:underline">
                      Check recent updates
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Monday - Friday<br />
                  9:00 AM - 5:00 PM EST
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
