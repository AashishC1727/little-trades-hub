import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone,
  Clock,
  User,
  Shield,
  CreditCard,
  Settings
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Creating an account is simple. Click 'Sign Up' in the top navigation, provide your email and create a secure password. You'll receive a confirmation email to verify your account."
      },
      {
        question: "What documents do I need for verification?",
        answer: "For account verification, you'll need a government-issued ID (passport, driver's license) and proof of address (utility bill, bank statement) dated within the last 3 months."
      },
      {
        question: "How long does account verification take?",
        answer: "Account verification typically takes 1-3 business days. You'll receive email updates throughout the process."
      }
    ]
  },
  {
    category: "Account Issues",
    questions: [
      {
        question: "I forgot my password. How can I reset it?",
        answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions in the reset email we send you."
      },
      {
        question: "How do I update my personal information?",
        answer: "Log into your account, go to Settings > Profile, and update your information. Some changes may require re-verification."
      },
      {
        question: "Can I change my email address?",
        answer: "Yes, you can change your email in Settings > Security. You'll need to verify the new email address."
      }
    ]
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        question: "How is my data protected?",
        answer: "We use bank-grade encryption (256-bit SSL) and store your data in secure, SOC2-compliant data centers. Your personal information is never shared with third parties without consent."
      },
      {
        question: "Do you offer two-factor authentication?",
        answer: "Yes, we highly recommend enabling 2FA for additional security. You can set it up in Settings > Security using an authenticator app."
      },
      {
        question: "What should I do if I suspect unauthorized access?",
        answer: "Immediately change your password, enable 2FA if not already active, and contact our support team. We'll help secure your account and investigate any suspicious activity."
      }
    ]
  }
];

const quickActions = [
  {
    title: "Live Chat",
    description: "Get instant help",
    icon: MessageCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    status: "Available now"
  },
  {
    title: "Email Support",
    description: "Send detailed inquiry",
    icon: Mail,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    status: "Response within 4 hours"
  },
  {
    title: "Schedule Callback",
    description: "Phone consultation",
    icon: Phone,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    status: "Next available: Today 3 PM"
  }
];

export const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Card key={action.title} className="group hover:shadow-md transition-all duration-300 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {action.status}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredFaqs.map((category, categoryIndex) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Badge variant="secondary">{category.category}</Badge>
                <span>{category.questions.length} questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const itemId = `${categoryIndex}-${questionIndex}`;
                const isExpanded = expandedItems.includes(itemId);
                
                return (
                  <div key={questionIndex} className="border rounded-lg">
                    <button
                      onClick={() => toggleExpanded(itemId)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No FAQs found matching your search.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};