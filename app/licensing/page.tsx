import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function LicensingPage() {
  const licenseTypes = [
    {
      name: 'Personal',
      sites: 1,
      price: 49,
      features: [
        '1 website license',
        'Lifetime updates',
        '1 year of support',
        'All features included',
        'Commercial use allowed',
      ],
    },
    {
      name: 'Business',
      sites: 5,
      price: 149,
      popular: true,
      features: [
        '5 website licenses',
        'Lifetime updates',
        '1 year of support',
        'All features included',
        'Commercial use allowed',
        'Priority support',
      ],
    },
    {
      name: 'Agency',
      sites: 'Unlimited',
      price: 299,
      features: [
        'Unlimited websites',
        'Lifetime updates',
        '1 year of support',
        'All features included',
        'Commercial use allowed',
        'Priority support',
        'White-label options',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-4">Licensing Information</h1>
        <p className="text-gray-600 mb-12">
          Everything you need to know about our licensing terms and conditions
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-black mb-6">License Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {licenseTypes.map((license) => (
                <Card key={license.name} className={license.popular ? 'border-blue-600 border-2' : ''}>
                  <CardHeader>
                    {license.popular && (
                      <Badge className="mb-2 w-fit bg-blue-600">Most Popular</Badge>
                    )}
                    <CardTitle>{license.name}</CardTitle>
                    <CardDescription>
                      {typeof license.sites === 'number'
                        ? `${license.sites} ${license.sites === 1 ? 'site' : 'sites'}`
                        : license.sites}
                    </CardDescription>
                    <div className="text-3xl font-bold text-black pt-4">
                      ${license.price}
                      <span className="text-sm font-normal text-gray-600">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {license.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="prose prose-gray max-w-none space-y-6">
            <h2 className="text-2xl font-bold text-black mb-4">License Terms</h2>

            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-bold text-black mb-2">What's Included</h3>
                <p className="leading-relaxed">
                  All licenses include full access to the plugin with all features, lifetime updates,
                  and one year of premium support. You can renew support annually if desired.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Installation Limits</h3>
                <p className="leading-relaxed">
                  Your license allows you to install and activate the plugin on the number of websites
                  specified in your plan. Each activation is tied to a specific domain. You can
                  deactivate and move your license to different sites as needed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Updates</h3>
                <p className="leading-relaxed">
                  All purchases include lifetime access to plugin updates. You'll receive bug fixes,
                  new features, security patches, and compatibility updates for as long as the plugin
                  is maintained.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Support Duration</h3>
                <p className="leading-relaxed">
                  Premium support is included for one year from the date of purchase. After one year,
                  you can continue using the plugin and receiving updates, but premium support access
                  will expire. Support renewals are available at a discounted rate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Commercial Use</h3>
                <p className="leading-relaxed">
                  You are allowed to use our plugins on client websites and commercial projects. The
                  license is tied to the website domain, not to you or your client.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Redistribution</h3>
                <p className="leading-relaxed">
                  You may not redistribute, resell, or share your license key or plugin files. Each
                  installation requires its own valid license. Violations will result in license
                  termination without refund.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">GPL Compatibility</h3>
                <p className="leading-relaxed">
                  While our plugins are compatible with WordPress's GPL license, our licensing terms
                  govern the distribution and support of our products. The plugin code is GPL-licensed,
                  but support, updates, and documentation are proprietary services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">License Transfer</h3>
                <p className="leading-relaxed">
                  Licenses are non-transferable and cannot be resold or given to another party. If
                  you sell a website that uses our plugin, the new owner must purchase their own license.
                  You should deactivate your license before transferring the site.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Refunds</h3>
                <p className="leading-relaxed">
                  We offer a 30-day money-back guarantee on all purchases. If you're not satisfied,
                  contact us within 30 days for a full refund. See our Refund Policy for details.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Developer Licenses</h3>
                <p className="leading-relaxed">
                  Agency licenses with unlimited sites are perfect for developers and agencies who
                  build websites for clients. Install on as many client sites as needed while
                  maintaining active support.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-black mb-4">Questions About Licensing?</h3>
            <p className="text-gray-600 mb-4">
              If you have questions about which license is right for you or need clarification on
              our licensing terms, we're here to help.
            </p>
            <p className="text-gray-600">
              Contact us at: <a href="mailto:licensing@pluginhub.com" className="text-blue-600 hover:underline">licensing@pluginhub.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
