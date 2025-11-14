import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact PrintJones | Sales & Support',
  description:
    'Contact the PrintJones team for sales questions, partnership opportunities, or technical support about our WordPress and WooCommerce plugins.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
