import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';

interface NewsDecksProps {
  selectedTopics: string[];
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  tag?: string;
  image?: string;
  url: string;
}

// Mock data - replace with real API data
const mockNewsData: Record<string, NewsItem[]> = {
  'Monetary Policy': [
    {
      id: '1',
      title: 'Fed Signals Pause in Rate Hikes Amid Economic Uncertainty',
      summary: 'Federal Reserve officials indicate potential hold on interest rates following recent market volatility.',
      source: 'Bloomberg',
      tag: '🚨 Breaking',
      url: '#'
    },
    {
      id: '2',
      title: 'ECB Maintains Aggressive Stance on Inflation Fight',
      summary: 'European Central Bank commits to continued rate increases despite growth concerns.',
      source: 'WSJ',
      tag: '📈 Market Moves',
      url: '#'
    },
    {
      id: '3',
      title: 'Bank of Japan Intervention Sparks Currency Volatility',
      summary: 'Yen strengthens following surprise central bank action in forex markets.',
      source: 'Reuters',
      url: '#'
    }
  ],
  'Crypto': [
    {
      id: '4',
      title: 'Bitcoin Surges Past $45K on ETF Speculation',
      summary: 'Cryptocurrency markets rally as institutional adoption accelerates.',
      source: 'CoinDesk',
      tag: '💸 Earnings',
      url: '#'
    },
    {
      id: '5',
      title: 'Ethereum Upgrade Reduces Gas Fees by 60%',
      summary: 'Latest network improvement brings significant cost reductions for users.',
      source: 'The Block',
      tag: '📈 Market Moves',
      url: '#'
    }
  ],
  'AI': [
    {
      id: '6',
      title: 'OpenAI Valuation Hits $90B in Latest Funding Round',
      summary: 'Artificial intelligence leader secures massive investment from tech giants.',
      source: 'TechCrunch',
      tag: '🧠 Hot Take',
      url: '#'
    },
    {
      id: '7',
      title: 'Google AI Breakthrough in Quantum Computing',
      summary: 'New quantum processor achieves unprecedented computational speeds.',
      source: 'Wired',
      url: '#'
    }
  ]
};

const tagColors: Record<string, string> = {
  '🚨 Breaking': 'destructive',
  '📈 Market Moves': 'default',
  '💸 Earnings': 'secondary',
  '🧠 Hot Take': 'outline'
};

export const NewsDecks: React.FC<NewsDecksProps> = ({ selectedTopics }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const renderNewsDeck = (topic: string, index: number) => {
    const newsItems = mockNewsData[topic] || [];
    
    return (
      <motion.div
        key={topic}
        className="embla__slide min-w-[320px] mr-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{topic}</h3>
              <Button variant="outline" size="sm" className="text-xs h-7">
                Follow
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {newsItems.map((item) => (
              <motion.div
                key={item.id}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => window.open(item.url, '_blank')}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {item.source}
                    </Badge>
                    {item.tag && (
                      <Badge 
                        variant={tagColors[item.tag] as any} 
                        className="text-xs"
                      >
                        {item.tag}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const availableTopics = selectedTopics.filter(topic => mockNewsData[topic]);

  return (
    <div className="flex-1 relative">
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

      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full items-start pt-6 pl-6">
          {availableTopics.map((topic, index) => renderNewsDeck(topic, index))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {availableTopics.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  );
};