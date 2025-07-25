import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { ContactForm } from "@/components/ContactForm";
import { HelpTopicsGrid } from "@/components/HelpTopicsGrid";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { ResourcePanel } from "@/components/ResourcePanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  Headphones
} from "lucide-react";

const Support = () => {
  const [activeTab, setActiveTab] = useState("faq");

  const quickActions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "chat",
      available: true,
      responseTime: "< 2 min"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      action: "email",
      available: true,
      responseTime: "< 4 hours"
    },
    {
      title: "Phone Support",
      description: "Speak directly with an expert",
      icon: Phone,
      action: "phone",
      available: false,
      responseTime: "Mon-Fri 9-5"
    }
  ];

  const stats = [
    { label: "Response Time", value: "< 2 min", icon: Clock },
    { label: "Customer Rating", value: "4.9/5", icon: Star },
    { label: "Support Agents", value: "24/7", icon: Users },
    { label: "Issues Resolved", value: "99.9%", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Let Us Help
                <span className="block text-primary">Support at Little Little</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Get the support you need, when you need it. Our team is here to help you succeed 
                in your trading and investment journey.
              </p>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={stat.label} className="text-center">
                    <CardContent className="pt-6">
                      <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card key={action.title} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg ${action.available ? 'bg-primary/20' : 'bg-muted'} flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 ${action.available ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <Badge variant={action.available ? "default" : "secondary"}>
                          {action.available ? "Available" : "Coming Soon"}
                        </Badge>
                      </div>
                      <CardTitle className="text-left">{action.title}</CardTitle>
                      <CardDescription className="text-left">{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{action.responseTime}</span>
                        <Button 
                          variant={action.available ? "default" : "secondary"} 
                          size="sm"
                          disabled={!action.available}
                        >
                          {action.available ? "Start" : "Soon"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Support Content */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { id: "faq", label: "FAQ", icon: HelpCircle },
                { id: "contact", label: "Contact", icon: MessageCircle },
                { id: "topics", label: "Help Topics", icon: Users },
                { id: "resources", label: "Resources", icon: CheckCircle }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === "faq" && <FAQSection />}
              {activeTab === "contact" && <ContactForm />}
              {activeTab === "topics" && <HelpTopicsGrid />}
              {activeTab === "resources" && <ResourcePanel />}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LiveChatWidget />
    </div>
  );
};

export default Support;