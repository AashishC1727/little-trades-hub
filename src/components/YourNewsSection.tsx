import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { TopicsIdebar } from './TopicsIdebar';
import { NewsDecks } from './NewsDecks';

export const YourNewsSection = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Monetary Policy', 'Crypto', 'AI']);

  return (
    <section className="w-full bg-background border-t border-border">
        {/* Main News Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Your News</h2>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
          
          <NewsDecks />
        </div>
    </section>
  );
};