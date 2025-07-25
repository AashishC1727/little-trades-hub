import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Send, Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('support_tickets')
        .insert([{
          user_id: user?.id || null,
          name: formData.name || null,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          priority: formData.priority,
          status: 'open'
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 4 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: user?.email || "",
        subject: "",
        message: "",
        priority: "medium"
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      info: "Available 24/7",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      info: "support@littlelittle.com",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Phone Support",
      description: "Speak directly with an expert",
      icon: Phone,
      info: "+1 (555) 123-4567",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Send us a Message</span>
          </CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="trading">Trading Support</SelectItem>
                    <SelectItem value="technical">Technical Issues</SelectItem>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="security">Security Concerns</SelectItem>
                    <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Please describe your issue or question in detail..."
                rows={4}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Methods & Info */}
      <div className="space-y-6">
        {/* Contact Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Other Ways to Reach Us</CardTitle>
            <CardDescription>
              Choose the method that works best for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={method.title} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg ${method.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{method.title}</div>
                    <div className="text-sm text-muted-foreground">{method.description}</div>
                    <div className="text-sm font-medium text-primary">{method.info}</div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Support Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Support Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Live Chat</span>
              <span className="font-medium">24/7</span>
            </div>
            <div className="flex justify-between">
              <span>Email Support</span>
              <span className="font-medium">24/7</span>
            </div>
            <div className="flex justify-between">
              <span>Phone Support</span>
              <span className="font-medium">Mon-Fri 9AM-5PM EST</span>
            </div>
          </CardContent>
        </Card>

        {/* Office Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Our Office</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">Little Little Trading HQ</p>
              <p className="text-muted-foreground">
                123 Financial District<br />
                New York, NY 10005<br />
                United States
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};