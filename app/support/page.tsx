import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, MessageSquare, Key, HelpCircle } from 'lucide-react';

const supportOptions = [
  {
    icon: BookOpen,
    title: 'Browse Documentation',
    description: 'Find answers in our comprehensive guides',
    cta: 'View Docs',
    href: '/docs',
    color: 'blue',
  },
  {
    icon: MessageSquare,
    title: 'Submit a Ticket',
    description: 'Get help from our support team',
    detail: 'Response within 24 hours',
    cta: 'Submit Ticket',
    href: '/support/submit-ticket',
    color: 'green',
  },
  {
    icon: Key,
    title: 'Verify License',
    description: 'Check your license status and activations',
    cta: 'Verify License',
    href: '/verify-license',
    color: 'orange',
  },
];

const faqs = [
  {
    question: 'How do I install a plugin?',
    answer: 'After purchasing, download the plugin ZIP file from your account page. In WordPress, go to Plugins > Add New > Upload Plugin, select the ZIP file, and click Install Now.',
  },
  {
    question: 'How do I activate my license?',
    answer: 'Go to your plugin settings in WordPress, find the License tab, enter your license key from your purchase email, and click Activate.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, contact us within 30 days for a full refund.',
  },
  {
    question: 'How many sites can I use my license on?',
    answer: 'This depends on the plan you purchased. Personal plans allow 1 site, Business allows 5 sites, and Agency allows unlimited sites.',
  },
  {
    question: 'Do you offer support?',
    answer: 'Yes! All purchases include premium support. Submit a ticket and we\'ll respond within 24 hours on business days.',
  },
];

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Search for answers or contact our support team
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for answers..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card key={option.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                  {option.detail && (
                    <p className="text-sm text-gray-500 mt-2">{option.detail}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <Link href={option.href}>
                    <Button variant="outline" className="w-full">
                      {option.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-black mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-4">Our support team is here to assist you</p>
          <Link href="/support/submit-ticket">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
