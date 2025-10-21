export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: March 15, 2024</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Name and email address when you create an account</li>
              <li>Payment information when you make a purchase</li>
              <li>Support communications and feedback</li>
              <li>License activation and usage data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Process your purchases and manage your licenses</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send you product updates and important notices</li>
              <li>Improve our products and services</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Data Storage and Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal
              information. Your data is stored securely using industry-standard encryption and security
              practices. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use trusted third-party services to help operate our business:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Payment processing (Stripe)</li>
              <li>Email communications</li>
              <li>Analytics and performance monitoring</li>
              <li>Customer support tools</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              These services have access to your information only to perform tasks on our behalf and
              are obligated to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to improve your experience on our
              website, analyze usage patterns, and deliver personalized content. You can control
              cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. GDPR Compliance</h2>
            <p className="text-gray-600 leading-relaxed">
              We are committed to compliance with the General Data Protection Regulation (GDPR) for
              users in the European Union. We process personal data lawfully, fairly, and transparently,
              and only for specified, explicit, and legitimate purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are not directed to individuals under 18 years of age. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">9. Changes to Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">10. Contact for Privacy Concerns</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions or concerns about our privacy practices, please contact us at:
              <br />
              Email: privacy@pluginhub.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
