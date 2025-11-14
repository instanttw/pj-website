import type { Metadata } from 'next';
import VerifyLicensePageClient from './VerifyLicensePageClient';

export const metadata: Metadata = {
  title: 'Verify License | PrintJones',
  description:
    'Verify the status and activations of your PrintJones WordPress plugin licenses.',
};

export default function VerifyLicensePage() {
  return <VerifyLicensePageClient />;
}
