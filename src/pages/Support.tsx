import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Search,
  Book,
  Video,
  Users,
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-centre mb-12">
            <h1 className="text-4xl font-bold mb-4">Support Centre</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're here to help. Get support, find answers, and learn how to make the most of LITTLE little.
            </p>
          </div>

          {/* Quick Help Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-centre justify-centre mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant help from our support team
                </p>
                <Button size="sm">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-centre justify-centre mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us a detailed message and we'll get back to you
                </p>
                <Button size="sm" variant="outline">Send Email</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-centre justify-centre mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak directly with our UK-based support team
                </p>
                <Button size="sm" variant="outline">Call Us</Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your issue or question in detail..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Topics */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Popular Help Topics</h2>
              <div className="space-y-4">
                <div className="flex items-centre space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Getting Started</h4>
                    <p className="text-sm text-muted-foreground">How to create your account and make your first trade</p>
                  </div>
                </div>
                <div className="flex items-centre space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Account Verification</h4>
                    <p className="text-sm text-muted-foreground">How to verify your identity and increase your limits</p>
                  </div>
                </div>
                <div className="flex items-centre space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Security & Safety</h4>
                    <p className="text-sm text-muted-foreground">Keeping your account secure and safe</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Support Hours</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-centre space-x-3 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">UK Support Hours</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 8:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 5:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>10:00 AM - 4:00 PM GMT</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      For urgent trading issues outside these hours, our automated systems 
                      provide 24/7 monitoring and emergency support.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="text-centre">
            <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-centre space-x-2 h-auto p-4">
                <Book className="w-5 h-5" />
                <span>User Guide</span>
              </Button>
              <Button variant="outline" className="flex items-centre space-x-2 h-auto p-4">
                <Video className="w-5 h-5" />
                <span>Video Tutorials</span>
              </Button>
              <Button variant="outline" className="flex items-centre space-x-2 h-auto p-4">
                <Users className="w-5 h-5" />
                <span>Community Forum</span>
              </Button>
              <Button variant="outline" className="flex items-centre space-x-2 h-auto p-4">
                <Search className="w-5 h-5" />
                <span>FAQ</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;