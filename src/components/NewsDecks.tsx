import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, RefreshCw, AlertCircle, Clock } from 'lucide-react';

// Mock components for standalone functionality
const Button = ({ children, className, ...props }) => (
  <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props}>
    {children}
  </button>
);

const Badge = ({ children, className, variant }) => {
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    const variantClasses = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
    };
    return <div className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}>{children}</div>;
};


const Card = ({ children, className }) => <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardContent = ({ children, className }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

const Alert = ({ children, className, variant }) => {
    const variantClasses = {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    };
    return <div role="alert" className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${variantClasses[variant] || variantClasses.default} ${className}`}>{children}</div>;
};
const AlertDescription = ({ children, className }) => <div className={`text-sm [&_p]:leading-relaxed ${className}`}>{children}</div>;

// Embla Carousel Hook (basic mock)
const useEmblaCarousel = (options) => {
  const ref = useRef(null);
  const api = {
    scrollPrev: () => console.log('scroll prev'),
    scrollNext: () => console.log('scroll next'),
  };
  return [ref, api];
};


interface NewsDecksProps {
  selectedTopics: string[];
}

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  region?: string;
  sector?: string;
}

interface NewsResponse {
  success: boolean;
  data: NewsItem[];
  categorized: Record<string, NewsItem[]>;
  count: number;
  sources: string[];
  categories: string[];
  lastUpdated: string;
  processingTimeMs: number;
  cacheExpiry: string;
  error?: string;
}

// Configuration
const SUPABASE_FUNCTION_URL = 'https://iwbdeakpqfljskpxjejm.supabase.co/functions/v1/yahoo-finance-news';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3YmRlYWtwcWZsanNrcHhqZWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODAxMzMsImV4cCI6MjA2ODk1NjEzM30.mvShgsITnhM9XXm77PxiC0lxsbT73v_5xv3qNKONZBo';

// Auto-refresh interval (10 minutes)
const REFRESH_INTERVAL = 10 * 60 * 1000;

// Category mapping for display
const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  'Monetary Policy': 'Monetary Policy',
  'Crypto': 'Crypto',
  'AI': 'AI',
  'Inflation': 'Inflation',
  'Deals': 'Deals',
  'Investment Banks': 'Investment Banks',
  'Private Equity': 'Private Equity',
  'Hedge Funds': 'Hedge Funds',
  'Trade': 'Trade',
  'Startups': 'Startups',
  'Taxes': 'Taxes',
  'Currencies': 'Currencies',
  'Energy': 'Energy',
  'Pharmaceuticals': 'Pharmaceuticals',
  'Automotive': 'Automotive',
  'Aerospace': 'Aerospace',
  'Entertainment': 'Entertainment',
  'Property': 'Property',
  'General': 'Market News'
};

// Tag assignment based on category and timing
const getNewsTag = (item: NewsItem): { tag: string; color: string } => {
  const now = new Date();
  const publishTime = new Date(item.publishedAt);
  const hoursOld = (now.getTime() - publishTime.getTime()) / (1000 * 60 * 60);

  if (hoursOld < 1) {
    return { tag: '🚨 Breaking', color: 'destructive' };
  } else if (item.category === 'Crypto' || item.category === 'Deals') {
    return { tag: '📈 Market Moves', color: 'default' };
  } else if (item.category === 'AI' || item.category === 'Startups') {
    return { tag: '🧠 Hot Take', color: 'outline' };
  } else if (item.category === 'Deals' || item.category === 'Investment Banks') {
    return { tag: '💸 Earnings', color: 'secondary' };
  }
  
  return { tag: '', color: '' };
};

export const NewsDecks: React.FC<NewsDecksProps> = ({ selectedTopics }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [newsData, setNewsData] = useState<Record<string, NewsItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  // Fetch news data from Supabase function
  const fetchNewsData = useCallback(async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          categories: selectedTopics,
          limit: 50
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: NewsResponse = await response.json();
      
      if (result.success) {
        // Group news by category, prioritizing selected topics
        const categorizedData: Record<string, NewsItem[]> = {};
        
        // Initialize selected topics with empty arrays
        selectedTopics.forEach(topic => {
          const mappedTopic = CATEGORY_DISPLAY_MAP[topic] || topic;
          categorizedData[mappedTopic] = [];
        });

        // Fill with actual data
        if (result.categorized) {
          Object.entries(result.categorized).forEach(([category, items]) => {
            const displayCategory = CATEGORY_DISPLAY_MAP[category] || category;
            if (selectedTopics.includes(category) || selectedTopics.includes(displayCategory)) {
              categorizedData[displayCategory] = items.slice(0, 5); // Limit to 5 items per category
            }
          });
        }

        // If no categorized data, distribute all news items
        if (Object.keys(result.categorized || {}).length === 0 && result.data.length > 0) {
          selectedTopics.forEach((topic, index) => {
            const mappedTopic = CATEGORY_DISPLAY_MAP[topic] || topic;
            const startIndex = index * 3;
            categorizedData[mappedTopic] = result.data.slice(startIndex, startIndex + 3);
          });
        }

        setNewsData(categorizedData);
        setLastUpdated(result.lastUpdated);
        
        console.log(`Loaded ${result.count} news items from ${result.sources?.length || 0} sources`);
      } else {
        throw new Error(result.error || 'Failed to fetch news data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching news:', err);
      
      // Set fallback data on error
      const fallbackData: Record<string, NewsItem[]> = {};
      selectedTopics.forEach(topic => {
        const mappedTopic = CATEGORY_DISPLAY_MAP[topic] || topic;
        fallbackData[mappedTopic] = [{
          title: `${mappedTopic} Update`,
          summary: 'Latest news and updates will appear here once connection is restored.',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: 'System',
          category: topic
        }];
      });
      setNewsData(fallbackData);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedTopics]);

  // Setup auto-refresh
  useEffect(() => {
    fetchNewsData();
    
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    // Setup recurring refresh
    const setupRefresh = () => {
      refreshTimeoutRef.current = setTimeout(() => {
        fetchNewsData(true);
        setupRefresh(); // Schedule next refresh
      }, REFRESH_INTERVAL);
    };
    
    setupRefresh();
    
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [fetchNewsData]);

  // Manual refresh handler
  const handleRefresh = () => {
    fetchNewsData(true);
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const publishTime = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - publishTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const renderNewsDeck = (topic: string, index: number) => {
    const newsItems = newsData[topic] || [];
    
    return (
      <motion.div
        key={topic}
        // MODIFICATION: Added a fixed height to each card's container (the slide).
        className="embla__slide min-w-[320px] max-w-[320px] mr-6 h-[450px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {/* MODIFICATION: Made the card a flex column to control its children's layout. */}
        <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{topic}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {newsItems.length}
                </Badge>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Follow
                </Button>
              </div>
            </div>
          </CardHeader>
          {/* MODIFICATION: Made the content area flexible and scrollable on overflow. */}
          <CardContent className="flex-1 overflow-y-auto space-y-4">
            <AnimatePresence mode="popLayout">
              {newsItems.length > 0 ? (
                newsItems.map((item, itemIndex) => {
                  const { tag, color } = getNewsTag(item);
                  
                  return (
                    <motion.div
                      key={`${item.title}-${itemIndex}`}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: itemIndex * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => item.url !== '#' && window.open(item.url, '_blank')}
                    >
                      <div className="space-y-2 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          {item.url !== '#' && (
                            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.source}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(item.publishedAt)}
                            </div>
                          </div>
                          {tag && (
                            <Badge variant={color as any} className="text-xs">
                              {tag}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-sm">No news available</div>
                  <div className="text-xs mt-1">Check back in a few minutes</div>
                </div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const availableTopics = selectedTopics.filter(topic => {
    const mappedTopic = CATEGORY_DISPLAY_MAP[topic] || topic;
    return newsData[mappedTopic] && newsData[mappedTopic].length > 0;
  }).map(topic => CATEGORY_DISPLAY_MAP[topic] || topic);

  if (loading && !isRefreshing) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <div className="text-sm text-muted-foreground">Loading latest news...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative mt-8">
      {/* Error Alert */}
      {error && (
        <Alert className="mx-6 mb-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load news: {error}</span>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Refresh Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-background/80 backdrop-blur-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Updating...' : 'Refresh'}
        </Button>
      </div>

      {/* Last Updated Info */}
      {lastUpdated && (
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
            Updated: {formatTimeAgo(lastUpdated)}
          </Badge>
        </div>
      )}

      {/* Navigation Buttons */}
      {availableTopics.length > 1 && (
        <>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}

      {/* News Content */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        {/* MODIFICATION: Aligned cards to the center vertically. */}
        <div className="flex h-full items-center pt-16 pl-6 pb-12">
          {availableTopics.length > 0 ? (
            availableTopics.map((topic, index) => renderNewsDeck(topic, index))
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-medium text-muted-foreground mb-2">
                  No news available for selected topics
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Try selecting different topics or check back later
                </div>
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh News
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Dots */}
      {availableTopics.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {availableTopics.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted-foreground/30"
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Default export for a complete App structure
export default function App() {
    // You can customize the topics here
    const topics = ['Monetary Policy', 'Crypto', 'AI', 'Deals', 'Energy'];
    return (
        <div className="bg-background text-foreground min-h-screen">
             {/* This is a placeholder for the content that was overlapping */}
            <div className="text-center pt-12">
                <h1 className="text-4xl font-bold">Your Trading Command.Center</h1>
                <p className="text-muted-foreground mt-2">Everything you need to trade</p>
            </div>
            <div style={{height: '600px'}}>
                <NewsDecks selectedTopics={topics} />
            </div>
        </div>
    )
}
