import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: "The Future of Micro-Investing: Trading with $1",
      excerpt: "How fractional trading is revolutionizing access to financial markets...",
      author: "Sarah Chen",
      date: "January 15, 2025",
      category: "Market Insights",
      readTime: "5 min read"
    },
    {
      title: "Understanding Market Volatility in 2025",
      excerpt: "Key factors driving market movements and how to navigate uncertainty...",
      author: "Alex Thompson",
      date: "January 12, 2025", 
      category: "Education",
      readTime: "8 min read"
    },
    {
      title: "Cryptocurrency Adoption by Traditional Finance",
      excerpt: "Major financial institutions embracing digital assets...",
      author: "Maria Rodriguez",
      date: "January 10, 2025",
      category: "Crypto",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">LITTLE little Blog</h1>
            <p className="text-xl text-muted-foreground">
              Insights, analysis, and education from our trading experts
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors">
                      <span className="text-sm font-medium">Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
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

export default Blog;