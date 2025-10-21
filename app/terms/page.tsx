export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: March 15, 2024</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using PluginHub's products and services, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree to these terms, please
              do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. License Grant</h2>
            <p className="text-gray-600 leading-relaxed">
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
              non-transferable license to use our WordPress plugins on the number of sites specified
              in your chosen plan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Restrictions</h2>
            <p className="text-gray-600 leading-relaxed mb-4">You may not:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Redistribute, resell, or lease our plugins</li>
              <li>Remove or alter any copyright notices</li>
              <li>Reverse engineer or decompile the software</li>
              <li>Use the plugins on more sites than your license allows</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Refund Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We offer a 30-day money-back guarantee for all purchases. If you're not satisfied with
              your purchase for any reason, contact us within 30 days of purchase for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All plugins, content, and materials provided by PluginHub are protected by copyright and
              other intellectual property laws. You acknowledge that we retain all rights, title, and
              interest in our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              PluginHub shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use or inability to use our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to terminate or suspend your license at any time if you violate
              these terms. Upon termination, you must cease all use of our plugins and destroy all copies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">8. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to our website. Your continued use of our services after changes
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">9. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: legal@pluginhub.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
