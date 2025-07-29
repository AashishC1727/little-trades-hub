import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
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

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchAssets = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchBody: any = { query };
        if (type) {
          searchBody.type = type;
        }

        const { data, error } = await supabase.functions.invoke('asset-search', {
          body: searchBody
        });

        if (error) {
          setError('Failed to search assets. Please try again.');
          return;
        }

        if (data?.success) {
          setResults(data.data);
          if (data.data.length === 0 && data.message) {
            setError(data.message);
          }
        } else {
          setError(data?.error || 'Search failed');
        }
      } catch (err) {
        setError('Failed to search assets. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    searchAssets();
  }, [query, type]);

  const formatPrice = (price: number, type: string) => {
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          {query && (
            <p className="text-muted-foreground">
              Results for "{query}" {results.length > 0 && `(${results.length} found)`}
            </p>
          )}
        </div>

        {loading ? (
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
        ) : error ? (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-semibold">No Results Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {error}
              </p>
              <Button asChild>
                <Link to="/">Go Back Home</Link>
              </Button>
            </div>
          </Card>
        ) : results.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
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
                        <CardTitle className="text-lg">{result.symbol}</CardTitle>
                        <p className="text-sm text-muted-foreground truncate">
                          {result.name}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getTypeColor(result.type)}>
                      {result.type.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {formatPrice(result.price, result.type)}
                      </div>
                      <div className={cn(
                        "flex items-center space-x-1 text-sm font-medium",
                        result.change24h >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {result.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>
                          {result.change24h >= 0 ? '+' : ''}{result.change24h.toFixed(2)}%
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
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-semibold">Start Your Search</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Use the search bar above to find stocks, cryptocurrencies, and other assets.
              </p>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;