import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Download, ExternalLink, Users } from 'lucide-react';

const Resources = () => {
  const guides = [
    {
      title: "Getting Started with Trading",
      description: "Complete beginner's guide to trading on LITTLE little",
      category: "Beginner",
      icon: <BookOpen className="w-5 h-5" />,
      type: "Guide"
    },
    {
      title: "Risk Management Strategies",
      description: "Learn how to protect your investments and manage risk",
      category: "Intermediate",
      icon: <FileText className="w-5 h-5" />,
      type: "Article"
    },
    {
      title: "Platform Tutorial Videos",
      description: "Video walkthroughs of key platform features",
      category: "All Levels",
      icon: <Video className="w-5 h-5" />,
      type: "Video"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Trading Resources</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to succeed in trading. From beginner guides to advanced strategies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {guide.icon}
                    <Badge variant="outline">{guide.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{guide.description}</p>
                  <Badge variant="secondary">{guide.category}</Badge>
                  <Button className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;