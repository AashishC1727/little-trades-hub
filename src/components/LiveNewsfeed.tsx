import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Clock, Globe } from 'lucide-react';

const LiveNewsfeed = () => {
  const newsItems = [
    {
      headline: "Tesla Q2 earnings beat estimates, stock up 3.5%",
      time: "2 minutes ago",
      trend: "up",
      category: "Stocks"
    },
    {
      headline: "Bitcoin hits $72K amid ETF inflows",
      time: "5 minutes ago", 
      trend: "up",
      category: "Crypto"
    },
    {
      headline: "Whisky barrel auction closes at £28,000",
      time: "12 minutes ago",
      trend: "neutral",
      category: "Alternative"
    },
    {
      headline: "US Fed holds rates, markets rally",
      time: "18 minutes ago",
      trend: "up",
      category: "Economic"
    },
    {
      headline: "Rare sneakers listed for $14,000 on LITTLE little",
      time: "23 minutes ago",
      trend: "neutral",
      category: "Collectibles"
    },
    {
      headline: "European markets open higher on tech gains",
      time: "35 minutes ago",
      trend: "up",
      category: "Global"
    }
  ];

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
        </div>

        {/* Horizontal Ticker */}
        <div className="mb-12 overflow-hidden bg-muted/30 rounded-lg p-4">
          <div className="flex space-x-8 animate-marquee whitespace-nowrap">
            {[...newsItems, ...newsItems].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                  {item.category}
                </span>
                <span>{item.headline}</span>
                {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Card key={index} className="hover:shadow-card hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {item.trend === 'neutral' && <Clock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-3 leading-tight">
                  {item.headline}
                </h3>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live updates every minute</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveNewsfeed;