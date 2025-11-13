import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, Download, HeadphonesIcon, Globe } from 'lucide-react';

export default function AccountDashboardPage() {
  const stats = [
    { label: 'Active Licenses', value: '3', icon: Key, color: 'blue', action: 'View All' },
    { label: 'Active Sites', value: '5', icon: Globe, color: 'green', action: 'Manage' },
    { label: 'Open Tickets', value: '1', icon: HeadphonesIcon, color: 'orange', action: 'View' },
    { label: 'Downloads', value: '12', icon: Download, color: 'purple', action: 'See All' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon as any;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Licenses Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">Table placeholder</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">List placeholder</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">Timeline placeholder</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default">Update Available</Badge>
              <Badge variant="secondary">2 New</Badge>
              <Badge variant="outline">Info</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
