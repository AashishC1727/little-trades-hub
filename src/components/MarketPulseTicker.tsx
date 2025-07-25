import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
  type: string;
}

const MarketPulseTicker = () => {
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch news headlines
  const fetchHeadlines = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('yahoo-finance-news');
      
      if (error) {
        console.error('Error fetching headlines:', error);
        return;
      }

      if (data?.success && data?.data) {
        setHeadlines(data.data);
      }
    } catch (error) {
      console.error('Error in fetchHeadlines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadlines();
    
    // Refresh headlines every 2 minutes
    const interval = setInterval(fetchHeadlines, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate headlines every 12 seconds
  useEffect(() => {
    if (headlines.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 12000);
    
    return () => clearInterval(interval);
  }, [headlines.length]);

  const isRecent = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    return diffHours < 2;
  };

  const getSourceBadge = (source: string) => {
    const shortNames: { [key: string]: string } = {
      'Yahoo Finance': 'YF',
      'Reuters': 'Reuters',
      'Bloomberg': 'Bloomberg',
      'Financial Times': 'FT',
      'Market Update': 'Market',
      'Crypto News': 'Crypto',
      'Economic News': 'Econ'
    };
    return shortNames[source] || source.substring(0, 6);
  };

  const nextHeadline = () => {
    setCurrentIndex((prev) => (prev + 1) % headlines.length);
  };

  const prevHeadline = () => {
    setCurrentIndex((prev) => (prev - 1 + headlines.length) % headlines.length);
  };

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center space-x-4">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-20 mb-2"></div>
            <div className="h-6 bg-muted rounded w-64"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (headlines.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center space-x-4 text-muted-foreground">
          <Clock className="w-5 h-5" />
          <span>📉 Live news temporarily unavailable – check back soon.</span>
        </div>
      </Card>
    );
  }

  const currentHeadline = headlines[currentIndex];

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <Badge variant="secondary" className="text-xs">
              {getSourceBadge(currentHeadline.source)}
            </Badge>
            {isRecent(currentHeadline.publishedAt) && (
              <Badge variant="default" className="text-xs bg-green-500 text-white">
                NEW
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1}/{headlines.length}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold leading-tight mb-1 animate-fade-in">
            {currentHeadline.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {currentHeadline.summary}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={prevHeadline}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Previous headline"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextHeadline}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Next headline"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / headlines.length) * 100}%` }}
        />
      </div>
    </Card>
  );
};

export default MarketPulseTicker;