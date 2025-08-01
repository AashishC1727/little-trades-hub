import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRightLeft, 
  Calendar, 
  MapPin, 
  User,
  BarChart3,
  History,
  Trophy
} from 'lucide-react';

interface TradeHistoryItem {
  id: string;
  date: string;
  offeredAsset: string;
  receivedAsset: string;
  counterparty: string;
  location: string;
  gain: number;
  status: 'completed' | 'disputed' | 'cancelled';
  category: string;
}

const mockTradeHistory: TradeHistoryItem[] = [
  {
    id: '1',
    date: '2025-01-15',
    offeredAsset: 'iPhone 14 Pro',
    receivedAsset: '1.2 ETH',
    counterparty: 'Alex Chen',
    location: 'London, UK',
    gain: 150,
    status: 'completed',
    category: 'crypto'
  },
  {
    id: '2',
    date: '2025-01-10',
    offeredAsset: '0.8 ETH',
    receivedAsset: 'Gaming Laptop',
    counterparty: 'Sarah Wilson',
    location: 'New York, US',
    gain: -50,
    status: 'completed',
    category: 'collectible'
  },
  {
    id: '3',
    date: '2025-01-05',
    offeredAsset: 'Vintage Watch',
    receivedAsset: '500 USDC',
    counterparty: 'Mike Johnson',
    location: 'Berlin, DE',
    gain: 75,
    status: 'completed',
    category: 'currency'
  },
  {
    id: '4',
    date: '2024-12-28',
    offeredAsset: 'Rare Pokemon Card',
    receivedAsset: '200 USDT',
    counterparty: 'Lisa Park',
    location: 'Tokyo, JP',
    gain: 25,
    status: 'disputed',
    category: 'collectible'
  }
];

export const P2PTradeHistory: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'timeline' | 'map' | 'stats'>('timeline');
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);

  const totalGains = mockTradeHistory.reduce((sum, trade) => sum + trade.gain, 0);
  const completedTrades = mockTradeHistory.filter(trade => trade.status === 'completed').length;
  const successRate = (completedTrades / mockTradeHistory.length) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'disputed': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crypto': return '₿';
      case 'stock': return '📈';
      case 'collectible': return '🎯';
      case 'currency': return '💵';
      default: return '📦';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-background to-muted/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Trade History & Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Trade Map
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">${totalGains}</div>
                  <div className="text-sm text-green-600/80">Total Gains</div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedTrades}</div>
                  <div className="text-sm text-blue-600/80">Completed Trades</div>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(successRate)}%</div>
                  <div className="text-sm text-purple-600/80">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {mockTradeHistory.map((trade, index) => (
                  <motion.div
                    key={trade.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedTrade === trade.id ? 'bg-primary/10 border-primary' : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedTrade(selectedTrade === trade.id ? null : trade.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(trade.status)}`} />
                        <div className="text-2xl">{getCategoryIcon(trade.category)}</div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {trade.offeredAsset}
                            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                            {trade.receivedAsset}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <User className="h-3 w-3" />
                            {trade.counterparty}
                            <MapPin className="h-3 w-3" />
                            {trade.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold flex items-center gap-1 ${
                          trade.gain >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {trade.gain >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          ${Math.abs(trade.gain)}
                        </div>
                        <div className="text-sm text-muted-foreground">{trade.date}</div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedTrade === trade.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-border/50"
                        >
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Status:</span>
                              <Badge variant="outline" className="ml-2 capitalize">
                                {trade.status}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Category:</span>
                              <span className="ml-2 capitalize">{trade.category}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Global Trade Map</h3>
              <p className="text-muted-foreground mb-4">
                Interactive world map showing your trade locations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from(new Set(mockTradeHistory.map(t => t.location))).map(location => (
                  <div key={location} className="text-center">
                    <div className="text-lg font-semibold">📍</div>
                    <div className="text-sm">{location}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Volume</span>
                    <span className="font-semibold">$3,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Trade Value</span>
                    <span className="font-semibold">$800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Best Trade</span>
                    <span className="font-semibold text-green-600">+$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Worst Trade</span>
                    <span className="font-semibold text-red-600">-$50</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(
                    mockTradeHistory.reduce((acc, trade) => {
                      acc[trade.category] = (acc[trade.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(category)}</span>
                        <span className="capitalize text-sm">{category}</span>
                      </div>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};