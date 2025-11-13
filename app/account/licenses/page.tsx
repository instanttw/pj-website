import { LicenseTable } from '@/components/account/license-table';

export default function LicensesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Licenses</h1>
        <p className="text-gray-600">Manage your plugin licenses and activations.</p>
      </div>
      <LicenseTable />
    </div>
  );
}
