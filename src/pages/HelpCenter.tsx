import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search,
  ArrowRight,
  Users,
  Shield,
  CreditCard,
  TrendingUp,
  BookOpen,
  Phone,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-centre mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Centre</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find answers, get help, and learn everything you need to know about trading with LITTLE little.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search for help articles, guides, or common questions..."
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-centre">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get help from our UK support team
                </p>
                <Button variant="outline" size="sm">Get Help</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-centre">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Community Forum</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other traders and share tips
                </p>
                <Button variant="outline" size="sm">Join Community</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-centre">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak to our support team directly
                </p>
                <Button variant="outline" size="sm">+44 7766 081465</Button>
              </CardContent>
            </Card>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-centre space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-centre justify-centre">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Getting Started</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    How to create your account
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Verifying your identity
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Making your first deposit
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Understanding the platform
                  </a>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 p-0">
                  View all articles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-centre space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-centre justify-centre">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Trading Basics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    How to place your first trade
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Understanding market orders
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Reading charts and data
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Managing risk and stops
                  </a>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 p-0">
                  View all articles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-centre space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-centre justify-centre">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Deposits & Withdrawals</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    How to deposit funds
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Withdrawal methods and times
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Payment processing delays
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Fees and charges
                  </a>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 p-0">
                  View all articles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-centre space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-centre justify-centre">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Security & Safety</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Two-factor authentication
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Account security best practices
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Suspicious activity reporting
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Password and login issues
                  </a>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 p-0">
                  View all articles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-centre space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-centre justify-centre">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Education Centre</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Trading strategies for beginners
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Market analysis fundamentals
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Understanding crypto markets
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Risk management techniques
                  </a>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 p-0">
                  View all articles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-centre space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-centre justify-centre">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Troubleshooting</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    App not loading properly
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Trade execution problems
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Data feed issues
                  </a>
                  <a href="#" className="block text-sm hover:text-primary transition-colours">
                    Browser compatibility
                  </a>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 p-0">
                  View all articles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Featured Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Help Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Most Popular This Week</h4>
                  <div className="space-y-3">
                    <a href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colours">
                      <h5 className="font-medium mb-1">How to verify your account quickly</h5>
                      <p className="text-sm text-muted-foreground">Step-by-step guide to identity verification</p>
                    </a>
                    <a href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colours">
                      <h5 className="font-medium mb-1">Understanding trading fees</h5>
                      <p className="text-sm text-muted-foreground">Complete breakdown of all charges</p>
                    </a>
                    <a href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colours">
                      <h5 className="font-medium mb-1">Making your first cryptocurrency trade</h5>
                      <p className="text-sm text-muted-foreground">Beginner's guide to crypto trading</p>
                    </a>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Recently Updated</h4>
                  <div className="space-y-3">
                    <a href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colours">
                      <h5 className="font-medium mb-1">New deposit methods available</h5>
                      <p className="text-sm text-muted-foreground">Updated payment options and processing times</p>
                    </a>
                    <a href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colours">
                      <h5 className="font-medium mb-1">Enhanced security features</h5>
                      <p className="text-sm text-muted-foreground">Latest security updates and recommendations</p>
                    </a>
                    <a href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colours">
                      <h5 className="font-medium mb-1">Platform maintenance schedule</h5>
                      <p className="text-sm text-muted-foreground">Upcoming maintenance windows and updates</p>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;