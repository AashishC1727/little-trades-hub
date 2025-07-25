import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  CreditCard, 
  Settings, 
  Shield, 
  TrendingUp, 
  HelpCircle,
  ArrowRight,
  Book,
  Phone,
  Mail
} from "lucide-react";

const helpTopics = [
  {
    title: "Account Management",
    description: "Account setup, verification, profile updates",
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    articles: 12,
    popular: true
  },
  {
    title: "Trading & Investing",
    description: "Order types, portfolio management, market analysis",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
    articles: 18,
    popular: true
  },
  {
    title: "Payments & Billing",
    description: "Deposits, withdrawals, fees, payment methods",
    icon: CreditCard,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    articles: 8,
    popular: false
  },
  {
    title: "Security & Privacy",
    description: "2FA, data protection, account security",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-100",
    articles: 15,
    popular: true
  },
  {
    title: "Platform Features",
    description: "App navigation, tools, customization",
    icon: Settings,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    articles: 10,
    popular: false
  },
  {
    title: "Getting Started",
    description: "First steps, tutorials, basic concepts",
    icon: Book,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    articles: 6,
    popular: true
  }
];

const popularArticles = [
  "How to verify your account",
  "Understanding order types",
  "Setting up two-factor authentication",
  "How to deposit funds",
  "Reading market charts",
  "Withdrawal processing times"
];

export const HelpTopicsGrid = () => {
  return (
    <div className="space-y-8">
      {/* Popular Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Popular Articles</span>
          </CardTitle>
          <CardDescription>
            Most frequently accessed help articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {popularArticles.map((article, index) => (
              <Button
                key={article}
                variant="ghost"
                className="justify-between h-auto p-3 text-left"
                onClick={() => console.log(`Navigate to: ${article}`)}
              >
                <span className="flex-1">{article}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <Card 
              key={topic.title} 
              className="group hover:shadow-lg transition-all duration-300 hover-scale cursor-pointer"
              onClick={() => console.log(`Navigate to topic: ${topic.title}`)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${topic.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${topic.color}`} />
                  </div>
                  {topic.popular && (
                    <Badge variant="secondary" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {topic.title}
                </CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {topic.articles} articles
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Contact */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground">
              Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Support</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Request Callback</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};