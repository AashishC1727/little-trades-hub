import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const AssetDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const categories = [
    { id: 'all', label: 'All Assets' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'forex', label: 'Forex' },
    { id: 'commodities', label: 'Commodities' },
  ];

  const mockAssets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43256.78,
      change: 2.45,
      volume: '28.5B',
      category: 'crypto',
      trending: true,
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 185.92,
      change: -1.23,
      volume: '45.2M',
      category: 'stocks',
      trending: true,
    },
    {
      symbol: 'EUR/USD',
      name: 'Euro to US Dollar',
      price: 1.0847,
      change: 0.12,
      volume: '156.8B',
      category: 'forex',
      trending: false,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2634.45,
      change: 3.78,
      volume: '12.1B',
      category: 'crypto',
      trending: true,
    },
  ];

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Asset Discovery</span>
          </CardTitle>
          <CardDescription>
            Search and discover tradeable assets across all markets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search assets (e.g. Bitcoin, AAPL, EUR/USD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button
              variant={sortBy === 'trending' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy('trending')}
            >
              Trending
            </Button>
            <Button
              variant={sortBy === 'gainers' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy('gainers')}
            >
              Top Gainers
            </Button>
            <Button
              variant={sortBy === 'volume' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy('volume')}
            >
              Volume
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Asset List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <Card key={asset.symbol} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{asset.symbol}</span>
                    {asset.trending && (
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">{asset.name}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="p-1">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    ${asset.price.toLocaleString()}
                  </span>
                  <span className={cn(
                    "text-sm font-medium flex items-center space-x-1",
                    asset.change >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {asset.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{asset.change >= 0 ? '+' : ''}{asset.change}%</span>
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Volume: {asset.volume}
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Buy
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Sell
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssetDiscovery;