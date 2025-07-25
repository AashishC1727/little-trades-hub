import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, DollarSign, Bitcoin, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
  type: 'news' | 'market' | 'crypto' | 'general';
}

const LiveNewsfeed = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch news from Yahoo Finance
  const fetchNews = async () => {
    try {
      console.log('Fetching Yahoo Finance news...');
      const { data, error } = await supabase.functions.invoke('yahoo-finance-news');
      
      if (error) {
        console.error('Error fetching news:', error);
        return;
      }

      if (data?.success && data?.data) {
        setNewsItems(data.data);
        setLastUpdated(data.lastUpdated || new Date().toISOString());
        console.log(`Loaded ${data.data.length} news items`);
      }
    } catch (error) {
      console.error('Error in fetchNews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Update news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crypto':
        return <Bitcoin className="w-4 h-4" />;
      case 'market':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'crypto':
        return 'secondary';
      case 'market':
        return 'default';
      default:
        return 'outline';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center">
              <Globe className="w-8 h-8 mr-4 text-primary" />
              Live Market Pulse
            </h2>
            <p className="text-xl text-muted-foreground">Loading real-time market news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center">
            <Globe className="w-8 h-8 mr-4 text-primary" />
            Live Market Pulse
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with real-time headlines from global markets, crypto, and alternative assets.
          </p>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {formatTime(lastUpdated)}
            </p>
          )}
        </div>

        {/* Horizontal Ticker */}
        <div className="mb-12 overflow-hidden bg-muted/30 rounded-lg p-4">
          <div className="flex space-x-8 animate-marquee whitespace-nowrap">
            {[...newsItems.slice(0, 8), ...newsItems.slice(0, 8)].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
                <span>{item.title}</span>
                {getTypeIcon(item.type)}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.slice(0, 12).map((item, index) => (
            <Card key={index} className="hover:shadow-card hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={getTypeBadgeVariant(item.type)} className="flex items-center gap-1">
                    {getTypeIcon(item.type)}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(item.publishedAt)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-3 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.source}
                  </div>
                  {item.url !== '#' && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read more
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live updates every 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveNewsfeed;