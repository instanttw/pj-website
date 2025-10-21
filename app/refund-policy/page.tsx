export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-4">Refund Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: March 15, 2024</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">30-Day Money-Back Guarantee</h2>
            <p className="text-gray-600 leading-relaxed">
              We stand behind the quality of our products. If you're not completely satisfied with
              your purchase, we offer a 30-day money-back guarantee for all our WordPress plugins.
              No questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Eligible Purchases</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our refund policy applies to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>All plugin purchases made directly from PluginHub</li>
              <li>Annual and lifetime licenses</li>
              <li>Single and multi-site licenses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Time Limits</h2>
            <p className="text-gray-600 leading-relaxed">
              To be eligible for a refund, you must request it within 30 days of your original
              purchase date. Refund requests made after 30 days will not be honored, except in
              exceptional circumstances at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">How to Request a Refund</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To request a refund, please:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Contact our support team at support@pluginhub.com</li>
              <li>Include your order number or license key</li>
              <li>Briefly explain the reason for your refund request (optional but helpful)</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Processing Time</h2>
            <p className="text-gray-600 leading-relaxed">
              Once we receive your refund request, we will process it within 3-5 business days.
              The refund will be issued to your original payment method. Depending on your payment
              provider, it may take an additional 5-10 business days for the refund to appear in
              your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">What Happens After a Refund</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When a refund is processed:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Your license key will be deactivated</li>
              <li>You will no longer receive plugin updates</li>
              <li>Access to support will be revoked</li>
              <li>You must remove the plugin from all your sites</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Exclusions</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Refunds are not available for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Purchases made through third-party marketplaces</li>
              <li>Renewal payments (annual subscriptions that auto-renew)</li>
              <li>Licenses that show evidence of abuse or violations of our Terms of Service</li>
              <li>Purchases where the license has been shared or distributed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Fair Use Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to refuse refunds to customers who repeatedly purchase and refund
              products, or who show patterns of abuse. We trust our customers and want to maintain
              a sustainable business to continue providing quality products and support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about our refund policy, please contact us at:
              <br />
              Email: support@pluginhub.com
              <br />
              We're here to help and will do our best to ensure you're satisfied with your purchase.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
