import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TopicsSidebarProps {
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
}

const topicCategories = {
  topics: ['Monetary Policy', 'Crypto', 'AI', 'Inflation', 'Deals', 'Investment Banks', 'Private Equity', 'Hedge Funds', 'Trade', 'Startups', 'Taxes', 'Currencies'],
  regions: ['China', 'Canada', 'UK', 'Europe', 'Asia', 'Latin America', 'Africa', 'Middle East', 'India'],
  sectors: ['Automotive', 'Energy', 'Pharmaceuticals', 'Property', 'Entertainment', 'Aerospace']
};

export const TopicsIdebar: React.FC<TopicsSidebarProps> = ({ selectedTopics, onTopicsChange }) => {
  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      onTopicsChange(selectedTopics.filter(t => t !== topic));
    } else if (selectedTopics.length < 12) {
      onTopicsChange([...selectedTopics, topic]);
    }
  };

  const renderTopicGroup = (title: string, topics: string[]) => (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <motion.div
            key={topic}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant={selectedTopics.includes(topic) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedTopics.includes(topic) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-muted/20 border-r border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Follow Topics</h3>
        <p className="text-sm text-muted-foreground">
          Choose up to 12 topics to see the latest stories on your homepage.
        </p>
        <div className="mt-2 text-xs text-muted-foreground">
          Selected: {selectedTopics.length}/12
        </div>
      </div>

      <ScrollArea className="h-[450px]">
        {renderTopicGroup('Topics', topicCategories.topics)}
        {renderTopicGroup('Regions', topicCategories.regions)}
        {renderTopicGroup('Sectors', topicCategories.sectors)}
      </ScrollArea>
    </div>
  );
};