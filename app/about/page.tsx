import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'We build plugins with meticulous attention to detail and performance',
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Your success is our success. We listen and adapt to your needs',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built by developers, for developers. We understand your challenges',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly pushing boundaries with cutting-edge solutions',
    },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6">About PluginHub</h1>

        <div className="prose prose-gray max-w-none space-y-6 mb-12">
          <p className="text-xl text-gray-600 leading-relaxed">
            We're a team of passionate developers dedicated to creating premium WordPress plugins
            that help businesses and developers build better websites.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, PluginHub started with a simple mission: to provide high-quality,
            well-coded WordPress plugins that solve real problems. Today, we're trusted by over
            50,000 websites worldwide and continue to innovate with new features and products.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Every plugin we create is built with modern best practices, optimized for performance,
            and backed by exceptional support. We believe in writing clean, maintainable code that
            developers love to work with and that end-users find intuitive.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or want to learn more? We'd love to hear from you.
          </p>
          <div className="space-y-2 text-gray-600">
            <p><strong>Email:</strong> support@pluginhub.com</p>
            <p><strong>Support:</strong> Available Monday-Friday, 9am-5pm EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
