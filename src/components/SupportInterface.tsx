import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  Search,
  ChevronRight,
  CheckCircle,
  Activity,
  AlertCircle,
  Clock
} from 'lucide-react';

const SupportInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'Account & Security',
      questions: [
        'How do I enable 2FA?',
        'How to reset my password?',
        'Why is my account suspended?',
        'How to verify my identity?'
      ]
    },
    {
      title: 'Trading',
      questions: [
        'How to place a limit order?',
        'What are the trading fees?',
        'How to cancel an order?',
        'What is margin trading?'
      ]
    },
    {
      title: 'Deposits & Withdrawals',
      questions: [
        'How long do deposits take?',
        'What are the withdrawal limits?',
        'Why is my withdrawal pending?',
        'How to deposit crypto?'
      ]
    }
  ];

  const systemStatus = [
    {
      service: 'Trading Engine',
      status: 'operational',
      lastUpdate: '2 minutes ago'
    },
    {
      service: 'Market Data',
      status: 'operational',
      lastUpdate: '1 minute ago'
    },
    {
      service: 'Deposits/Withdrawals',
      status: 'maintenance',
      lastUpdate: '30 minutes ago'
    },
    {
      service: 'API Services',
      status: 'operational',
      lastUpdate: '5 minutes ago'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'maintenance':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'issues':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-success';
      case 'maintenance':
        return 'bg-warning';
      case 'issues':
        return 'bg-destructive';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <CardTitle>Support Center</CardTitle>
          </div>
          <CardDescription>
            Get help and support for your trading account
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* FAQ Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
                      <span className="text-sm">{question}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Can't find what you're looking for?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Live Chat</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Support</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Request Callback</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Send us a message and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option>Trading Issue</option>
                    <option>Account Problem</option>
                    <option>Deposit/Withdrawal</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Describe your issue in detail..."
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Available 24/7 for urgent issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>
                    Response within 4-6 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">General:</span> support@littlelittle.com
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Trading:</span> trading@littlelittle.com
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Security:</span> security@littlelittle.com
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>
                    Available Mon-Fri 9 AM - 6 PM UTC
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">US:</span> +1 (555) 123-4567
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">UK:</span> +44 20 1234 5678
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">International:</span> +1 (555) 987-6543
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current status of all LITTLE little services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <div className="font-medium">{service.service}</div>
                        <div className="text-sm text-muted-foreground">
                          Last updated: {service.lastUpdate}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`capitalize border-0 text-white ${getStatusColor(service.status)}`}
                    >
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Scheduled Maintenance</span>
                    <Badge variant="outline">Resolved</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Withdrawal processing was temporarily unavailable during scheduled maintenance.
                  </p>
                  <span className="text-xs text-muted-foreground">Jan 24, 2024 - 2:00 AM UTC</span>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">API Rate Limiting</span>
                    <Badge variant="outline">Resolved</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Some users experienced increased API response times.
                  </p>
                  <span className="text-xs text-muted-foreground">Jan 23, 2024 - 10:30 AM UTC</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Support Tickets</CardTitle>
                <Button size="sm">
                  New Ticket
                </Button>
              </div>
              <CardDescription>
                Track your support requests and responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">#12345 - Trading Issue</span>
                      <div className="text-sm text-muted-foreground">
                        My limit order is not executing
                      </div>
                    </div>
                    <Badge variant="outline">Open</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: Jan 24, 2024 - Last updated: 2 hours ago
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">#12344 - Account Verification</span>
                      <div className="text-sm text-muted-foreground">
                        Documents pending review
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-warning text-white border-0">
                      In Progress
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: Jan 23, 2024 - Last updated: 1 day ago
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">#12343 - Withdrawal Delay</span>
                      <div className="text-sm text-muted-foreground">
                        Bitcoin withdrawal taking too long
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success text-white border-0">
                      Resolved
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: Jan 22, 2024 - Resolved: Jan 23, 2024
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportInterface;