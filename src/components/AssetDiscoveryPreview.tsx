import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, Filter } from 'lucide-react';

const AssetDiscoveryPreview = () => {
  const trendingAssets = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$42,150', change: '+2.4%', trend: 'up' },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,580', change: '+1.8%', trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla', price: '$248.50', change: '-0.9%', trend: 'down' },
    { symbol: 'AAPL', name: 'Apple', price: '$185.20', change: '+0.3%', trend: 'up' },
    { symbol: 'NVDA', name: 'NVIDIA', price: '$720.45', change: '+3.2%', trend: 'up' },
    { symbol: 'AMZN', name: 'Amazon', price: '$142.80', change: '-1.2%', trend: 'down' }
  ];

  const categories = ['Crypto', 'Stocks', 'Commodities', 'FX', 'NFTs', 'Real Estate'];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Assets
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find trending opportunities across all markets. From crypto to commodities, 
            stocks to collectibles.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search Bar */}
          <Card className="border-2 border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search assets, stocks, crypto..."
                    className="pl-12 h-12 text-lg border-0 bg-muted/50 focus:bg-background transition-colors"
                  />
                </div>
                <Button size="lg" variant="outline" className="h-12 px-6">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Quick Categories */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Assets */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-success" />
                Trending Now
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingAssets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="p-4 rounded-xl border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-lg">{asset.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{asset.name}</p>
                      </div>
                      {asset.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-success" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xl font-bold">{asset.price}</p>
                      <p className={`text-sm font-medium ${
                        asset.trend === 'up' ? 'text-success' : 'text-destructive'
                      }`}>
                        {asset.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" className="px-8">
              Explore All Markets
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssetDiscoveryPreview;