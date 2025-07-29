import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, Filter, ExternalLink, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  symbol: string;
  name: string;
  type: 'crypto' | 'stock';
  price: number;
  change24h: number;
  image?: string;
  market_cap_rank?: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
}

const AssetDiscoveryPreview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const trendingAssets = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$42,150', change: '+2.4%', trend: 'up' },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,580', change: '+1.8%', trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla', price: '$248.50', change: '-0.9%', trend: 'down' },
    { symbol: 'AAPL', name: 'Apple', price: '$185.20', change: '+0.3%', trend: 'up' },
    { symbol: 'NVDA', name: 'NVIDIA', price: '$720.45', change: '+3.2%', trend: 'up' },
    { symbol: 'AMZN', name: 'Amazon', price: '$142.80', change: '-1.2%', trend: 'down' }
  ];

  const categories = ['Crypto', 'Stocks', 'Commodities', 'FX', 'NFTs', 'Real Estate'];

  const searchAssets = async (query: string, category?: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchError(null);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);

    console.log('Search initiated with query:', query, 'category:', category);

    // Check if the selected category is unsupported
    const unsupportedCategories = ['commodities', 'fx', 'nfts', 'real estate'];
    if (category && category.trim() && unsupportedCategories.includes(category.toLowerCase())) {
      setSearchError(`${category} search is not currently supported. Please try searching for Crypto or Stocks instead.`);
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      const searchBody: any = { query };

      // Only add type filter if category is selected and maps to a valid backend type
      if (category && category.trim() && category.toLowerCase() !== 'all') {
        const typeMap: { [key: string]: string } = {
          'crypto': 'crypto',
          'stocks': 'stock'
        };

        const searchType = typeMap[category.toLowerCase()];
        if (searchType) {
          searchBody.type = searchType;
        }
      }
      // If no category is selected, don't add type to searchBody - let backend search all

      const { data, error } = await supabase.functions.invoke('asset-search', {
        body: searchBody
      });

      console.log('Backend response:', data, 'error:', error);

      if (error) {
        setSearchError('Failed to search assets. Please try again.');
        setSearchResults([]);
        return;
      }

      if (data?.success) {
        // Use all results from backend - don't apply additional frontend filtering
        // The backend already handles type filtering correctly
        console.log('Search results received:', data.data);
        setSearchResults(data.data || []);
        if ((data.data || []).length === 0 && data.message) {
          setSearchError(data.message);
        }
      } else {
        console.log('Search failed with response:', data);
        setSearchError(data?.error || 'Search failed');
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchError('Failed to search assets. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    // Pass selectedCategory only if it's not empty, otherwise pass undefined
    const categoryFilter = selectedCategory && selectedCategory.trim() ? selectedCategory : undefined;
    searchAssets(searchQuery, categoryFilter);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (searchQuery.trim()) {
      searchAssets(searchQuery, category);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
    setHasSearched(false);
    setSelectedCategory('');
  };

  const formatPrice = (price: number, type: string) => {
    if (!price || isNaN(price)) return 'N/A';
    if (type === 'crypto') {
      return price < 1 ? `$${price.toFixed(6)}` : `$${price.toLocaleString()}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'stock': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                  />
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {/* Quick Categories */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {hasSearched && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Search className="w-5 h-5 mr-2 text-primary" />
                    Search Results
                    {searchQuery && ` for "${searchQuery}"`}
                    {searchResults.length > 0 && ` (${searchResults.length})`}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearSearch}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                </div>

                {isSearching ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-1/4"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : searchError ? (
                  <div className="text-center py-8">
                    <div className="space-y-4">
                      <div className="text-4xl">🔍</div>
                      <h4 className="text-lg font-semibold">No Results Found</h4>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {searchError}
                      </p>
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map((result) => (
                      <Card key={result.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {result.image && (
                                <img
                                  src={result.image}
                                  alt={result.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              )}
                              <div>
                                <CardTitle className="text-lg">{result.symbol || 'Unknown'}</CardTitle>
                                <p className="text-sm text-muted-foreground truncate">
                                  {result.name || 'Unknown Asset'}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className={getTypeColor(result.type)}>
                              {(result.type || 'unknown').toUpperCase()}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold">
                                {result.price ? formatPrice(result.price, result.type) : 'N/A'}
                              </div>
                              <div className={cn(
                                "flex items-center space-x-1 text-sm font-medium",
                                (result.change24h || 0) >= 0 ? "text-green-600" : "text-red-600"
                              )}>
                                {(result.change24h || 0) >= 0 ? (
                                  <TrendingUp className="w-3 h-3" />
                                ) : (
                                  <TrendingDown className="w-3 h-3" />
                                )}
                                <span>
                                  {(result.change24h || 0) >= 0 ? '+' : ''}{(result.change24h || 0).toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {result.type === 'stock' && (result.high || result.low) && (
                            <div className="text-xs text-muted-foreground space-y-1">
                              {result.high && <div>High: ${result.high.toFixed(2)}</div>}
                              {result.low && <div>Low: ${result.low.toFixed(2)}</div>}
                              {result.previousClose && (
                                <div>Prev Close: ${result.previousClose.toFixed(2)}</div>
                              )}
                            </div>
                          )}

                          {result.market_cap_rank && (
                            <div className="text-xs text-muted-foreground">
                              Market Cap Rank: #{result.market_cap_rank}
                            </div>
                          )}

                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="space-y-4">
                      <div className="text-4xl">📈</div>
                      <h4 className="text-lg font-semibold">No assets found</h4>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Try searching for different keywords or check your spelling.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
                      <p className={`text-sm font-medium ${asset.trend === 'up' ? 'text-success' : 'text-destructive'
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