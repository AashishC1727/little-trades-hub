import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Video, 
  Users, 
  MessageSquare, 
  Download, 
  ExternalLink,
  FileText,
  PlayCircle,
  ArrowRight
} from "lucide-react";

const resources = [
  {
    title: "User Guide",
    description: "Complete platform documentation",
    icon: Book,
    type: "Documentation",
    link: "/help/user-guide",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    external: false
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step visual guides",
    icon: Video,
    type: "Video",
    link: "/help/tutorials",
    color: "text-red-600",
    bgColor: "bg-red-100",
    external: false
  },
  {
    title: "Community Forum",
    description: "Connect with other traders",
    icon: Users,
    type: "Community",
    link: "https://community.littlelittle.com",
    color: "text-green-600",
    bgColor: "bg-green-100",
    external: true
  },
  {
    title: "API Documentation",
    description: "Developer resources and guides",
    icon: FileText,
    type: "Technical",
    link: "/api-docs",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    external: false
  }
];

const quickLinks = [
  {
    title: "Trading Basics PDF",
    description: "Essential trading concepts guide",
    icon: Download,
    size: "2.3 MB"
  },
  {
    title: "Platform Walkthrough",
    description: "5-minute intro video",
    icon: PlayCircle,
    size: "5 min"
  },
  {
    title: "Risk Management Guide",
    description: "Protect your investments",
    icon: FileText,
    size: "1.8 MB"
  },
  {
    title: "Market Analysis Tutorial",
    description: "Learn technical analysis",
    icon: PlayCircle,
    size: "12 min"
  }
];

const webinars = [
  {
    title: "Getting Started with Little Little",
    date: "Next: Friday 2 PM EST",
    duration: "45 min",
    spots: "23 spots left"
  },
  {
    title: "Advanced Trading Strategies",
    date: "Next: Monday 1 PM EST",
    duration: "60 min",
    spots: "12 spots left"
  },
  {
    title: "Portfolio Management Masterclass",
    date: "Next: Wednesday 3 PM EST",
    duration: "90 min",
    spots: "8 spots left"
  }
];

export const ResourcePanel = () => {
  return (
    <div className="space-y-8">
      {/* Main Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => {
          const IconComponent = resource.icon;
          return (
            <Card 
              key={resource.title} 
              className="group hover:shadow-lg transition-all duration-300 hover-scale cursor-pointer"
              onClick={() => window.open(resource.link, resource.external ? '_blank' : '_self')}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${resource.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${resource.color}`} />
                  </div>
                  {resource.external && (
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <Badge variant="secondary" className="w-fit text-xs">
                  {resource.type}
                </Badge>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {resource.title}
                </CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Access Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Downloads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Quick Downloads & Resources</span>
          </CardTitle>
          <CardDescription>
            Essential guides and tutorials to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Button
                  key={link.title}
                  variant="ghost"
                  className="h-auto p-4 justify-start space-x-3 hover:bg-muted"
                  onClick={() => console.log(`Download: ${link.title}`)}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{link.title}</div>
                    <div className="text-sm text-muted-foreground">{link.description}</div>
                    <div className="text-xs text-muted-foreground">{link.size}</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Webinars */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Upcoming Webinars</span>
          </CardTitle>
          <CardDescription>
            Join our live sessions to learn from experts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webinars.map((webinar, index) => (
              <div key={webinar.title} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="font-medium">{webinar.title}</div>
                  <div className="text-sm text-muted-foreground">{webinar.date}</div>
                  <div className="text-xs text-muted-foreground">
                    {webinar.duration} • {webinar.spots}
                  </div>
                </div>
                <Button size="sm">
                  Register
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <MessageSquare className="w-12 h-12 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">Still Need Help?</h3>
            <p className="text-muted-foreground">
              Our support team is available 24/7 to assist you with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>
                Contact Support
              </Button>
              <Button variant="outline">
                Schedule a Call
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};