'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, ThumbsUp, Clock, User, Send, ArrowLeft } from 'lucide-react';

interface Reply {
  id: string;
  author: string;
  authorRole: 'user' | 'moderator' | 'support';
  content: string;
  timestamp: string;
  likes: number;
}

interface Topic {
  id: string;
  title: string;
  author: string;
  authorRole: 'user' | 'moderator' | 'support';
  content: string;
  category: string;
  timestamp: string;
  replies: Reply[];
  views: number;
  likes: number;
  resolved: boolean;
}

const mockTopics: Topic[] = [
  {
    id: '1',
    title: 'How to enable sticky elements on mobile devices?',
    author: 'Sarah Martinez',
    authorRole: 'user',
    content: "I've enabled the Sticky Element feature on my page but it doesn't seem to work on mobile browsers. Is there a specific setting I need to enable?",
    category: 'Elements',
    timestamp: '2 hours ago',
    replies: [
      {
        id: '1-1',
        author: 'PrintJones Support',
        authorRole: 'support',
        content: 'Hi Sarah! The Sticky Element works on mobile, but you need to check the "Enable Mobile Sticky" option in the element settings. Also, make sure your theme doesn\'t have conflicting CSS that sets `position: static` on mobile viewports.',
        timestamp: '1 hour ago',
        likes: 5,
      },
      {
        id: '1-2',
        author: 'Sarah Martinez',
        authorRole: 'user',
        content: 'That worked perfectly! I found the setting under Advanced > Responsive. Thank you!',
        timestamp: '45 minutes ago',
        likes: 2,
      },
    ],
    views: 127,
    likes: 8,
    resolved: true,
  },
  {
    id: '2',
    title: 'Analytics dashboard showing incorrect data',
    author: 'Mike Chen',
    authorRole: 'user',
    content: "The analytics dashboard is displaying view counts that don't match my Google Analytics data. Is there a caching issue or do I need to configure something?",
    category: 'Analytics',
    timestamp: '5 hours ago',
    replies: [
      {
        id: '2-1',
        author: 'Jennifer Cole',
        authorRole: 'moderator',
        content: 'The plugin tracks element interactions separately from page views. Make sure you\'ve enabled "Track All Events" in Settings > Analytics > Tracking Options. Also, clear your object cache if you\'re using one.',
        timestamp: '4 hours ago',
        likes: 3,
      },
    ],
    views: 89,
    likes: 4,
    resolved: false,
  },
  {
    id: '3',
    title: 'Best practices for WooCommerce product templates',
    author: 'David Thompson',
    authorRole: 'user',
    content: "I'm building custom product pages with the WooCommerce elements. What's the recommended approach for maintaining consistent designs across 100+ products?",
    category: 'WooCommerce',
    timestamp: '1 day ago',
    replies: [
      {
        id: '3-1',
        author: 'Alex Rivera',
        authorRole: 'user',
        content: 'I use the Template Manager to create a base product template, then apply it site-wide. You can override individual products when needed. Also check out the Dynamic Content elements for pulling product data automatically.',
        timestamp: '20 hours ago',
        likes: 12,
      },
      {
        id: '3-2',
        author: 'PrintJones Support',
        authorRole: 'support',
        content: 'Great advice Alex! Also consider using WPBakery\'s template system to save your layouts. You can find a tutorial in our docs under Tutorials > "Building WooCommerce Product Pages".',
        timestamp: '18 hours ago',
        likes: 7,
      },
    ],
    views: 234,
    likes: 15,
    resolved: false,
  },
  {
    id: '4',
    title: 'License activation failing on staging site',
    author: 'Emma Wilson',
    authorRole: 'user',
    content: 'I\'m trying to activate my license on a staging subdomain but getting an "invalid domain" error. Do I need a separate license for staging?',
    category: 'Licensing',
    timestamp: '2 days ago',
    replies: [
      {
        id: '4-1',
        author: 'PrintJones Support',
        authorRole: 'support',
        content: 'Your license includes 1 production site and unlimited staging/development sites. Make sure your staging URL contains "staging", "dev", "test", or uses a local domain like .local or .test. If you\'re still having issues, contact us via the Support Center.',
        timestamp: '2 days ago',
        likes: 9,
      },
      {
        id: '4-2',
        author: 'Emma Wilson',
        authorRole: 'user',
        content: 'Ah, my staging site is staging2.mydomain.com - does that work or does it need to be staging.mydomain.com?',
        timestamp: '1 day ago',
        likes: 1,
      },
      {
        id: '4-3',
        author: 'PrintJones Support',
        authorRole: 'support',
        content: 'staging2.mydomain.com should work fine! Try deactivating and reactivating the license. If it persists, clear your WordPress transients or contact support with your license key.',
        timestamp: '1 day ago',
        likes: 4,
      },
    ],
    views: 156,
    likes: 10,
    resolved: true,
  },
  {
    id: '5',
    title: 'Custom CSS not applying to specific elements',
    author: 'Carlos Rodriguez',
    authorRole: 'user',
    content: 'I added custom CSS to a Button element but the styles are being overridden. How can I increase specificity without using !important?',
    category: 'Customization',
    timestamp: '3 days ago',
    replies: [
      {
        id: '5-1',
        author: 'Jennifer Cole',
        authorRole: 'moderator',
        content: 'The plugin wraps elements in unique classes. Use the browser inspector to find the full selector chain. Typically something like `.vc_custom_XXXXX .eaw-button` will give you enough specificity.',
        timestamp: '3 days ago',
        likes: 6,
      },
    ],
    views: 98,
    likes: 5,
    resolved: false,
  },
];

const roleColors = {
  user: 'bg-gray-100 text-gray-700',
  moderator: 'bg-purple-100 text-purple-700',
  support: 'bg-blue-100 text-blue-700',
};

const roleLabels = {
  user: 'Member',
  moderator: 'Moderator',
  support: 'Support Team',
};

export function CommunityForum() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('General');
  const [replyContent, setReplyContent] = useState('');

  const handleNewTopic = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert('New topic submitted! (This is a demo - no data is actually saved)');
    setNewTopicTitle('');
    setNewTopicContent('');
    setNewTopicCategory('General');
    setShowNewTopicForm(false);
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert('Reply submitted! (This is a demo - no data is actually saved)');
    setReplyContent('');
  };

  if (showNewTopicForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNewTopicForm(false)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Topics
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>Get help from the community and support team</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewTopic} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., How do I configure the contact form element?"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={newTopicCategory}
                  onChange={(e) => setNewTopicCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="General">General</option>
                  <option value="Elements">Elements</option>
                  <option value="WooCommerce">WooCommerce</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Licensing">Licensing</option>
                  <option value="Customization">Customization</option>
                  <option value="Performance">Performance</option>
                </select>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Question Details
                </label>
                <textarea
                  id="content"
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                  placeholder="Describe your question in detail. Include any error messages, steps you've tried, and your environment (WordPress version, theme, etc.)"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Post Question
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewTopicForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedTopic) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTopic(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Topics
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{selectedTopic.category}</Badge>
                  {selectedTopic.resolved && (
                    <Badge className="bg-green-100 text-green-700">Resolved</Badge>
                  )}
                </div>
                <CardTitle className="text-2xl mb-2">{selectedTopic.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {selectedTopic.author}
                  </div>
                  <Badge className={roleColors[selectedTopic.authorRole]} variant="secondary">
                    {roleLabels[selectedTopic.authorRole]}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedTopic.timestamp}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {selectedTopic.likes}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{selectedTopic.content}</p>
          </CardContent>
        </Card>

        {selectedTopic.replies.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedTopic.replies.length} {selectedTopic.replies.length === 1 ? 'Reply' : 'Replies'}
            </h3>
            {selectedTopic.replies.map((reply) => (
              <Card key={reply.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{reply.author}</span>
                        <Badge className={roleColors[reply.authorRole]} variant="secondary">
                          {roleLabels[reply.authorRole]}
                        </Badge>
                        <span className="text-sm text-gray-500">{reply.timestamp}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {reply.likes}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Post a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReply} className="space-y-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Share your thoughts, solutions, or ask for clarification..."
                required
              />
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Post Reply
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Forum</h2>
          <p className="text-gray-600 mt-1">Ask questions, share tips, and connect with other users</p>
        </div>
        <Button onClick={() => setShowNewTopicForm(true)}>
          <Send className="h-4 w-4 mr-2" />
          Ask Question
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm">All Topics</Button>
        <Button variant="ghost" size="sm">Elements</Button>
        <Button variant="ghost" size="sm">WooCommerce</Button>
        <Button variant="ghost" size="sm">Analytics</Button>
        <Button variant="ghost" size="sm">Licensing</Button>
        <Button variant="ghost" size="sm">Customization</Button>
      </div>

      <div className="space-y-3">
        {mockTopics.map((topic) => (
          <Card
            key={topic.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedTopic(topic)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{topic.category}</Badge>
                    {topic.resolved && (
                      <Badge className="bg-green-100 text-green-700">Resolved</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-3">{topic.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {topic.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {topic.timestamp}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {topic.replies.length} {topic.replies.length === 1 ? 'reply' : 'replies'}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {topic.likes}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
