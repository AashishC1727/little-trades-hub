import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLiveMarketData } from '@/hooks/useLiveMarketData';
import { TrendingUp, TrendingDown, RefreshCw, Database, Zap, Activity } from 'lucide-react';

export const LiveDataDashboard = () => {
  const { marketData, cryptoData, loading, error, refetch, triggerSync } = useLiveMarketData();

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return price.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      });
    }
    return price.toFixed(6);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  const handleSync = async (type: 'stocks' | 'crypto' | 'news') => {
    try {
      await triggerSync(type);
    } catch (error) {
      console.error(`Failed to sync ${type}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Market Data</h2>
          <p className="text-muted-foreground">Real-time pricing from multiple sources</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSync('stocks')}
            disabled={loading}
          >
            <Database className="h-4 w-4 mr-2" />
            Sync Stocks
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSync('crypto')}
            disabled={loading}
          >
            <Zap className="h-4 w-4 mr-2" />
            Sync Crypto
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Stocks & Forex */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Stocks & Forex
          </CardTitle>
          <CardDescription>Live data from StockData.org</CardDescription>
        </CardHeader>
        <CardContent>
          {marketData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No stock data available. Click "Sync Stocks" to fetch latest data.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {marketData.slice(0, 12).map((item) => (
                <Card key={`${item.symbol}-${item.source}`} className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{item.symbol}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.asset_type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-lg font-bold">${formatPrice(item.price)}</p>
                    
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center text-sm ${
                        item.change_24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change_24h >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {formatChange(item.change_24h)}
                      </span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <p>Updated: {formatTimeAgo(item.last_updated)}</p>
                      <p>Source: {item.source}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cryptocurrency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Cryptocurrency
          </CardTitle>
          <CardDescription>Live data from CoinGecko & CoinCap (with fallback)</CardDescription>
        </CardHeader>
        <CardContent>
          {cryptoData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No crypto data available. Click "Sync Crypto" to fetch latest data.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cryptoData.map((item) => (
                <Card key={`${item.symbol}-${item.source}`} className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{item.symbol.toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge 
                        variant={item.source_priority === 1 ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {item.source}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-lg font-bold">${formatPrice(item.price)}</p>
                    
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center text-sm ${
                        item.change_24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change_24h >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {formatChange(item.change_24h)}
                      </span>
                    </div>
                    
                    {item.market_cap && (
                      <p className="text-xs text-muted-foreground">
                        Cap: ${(item.market_cap / 1e9).toFixed(1)}B
                      </p>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      <p>Updated: {formatTimeAgo(item.last_updated)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Sources Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">StockData.org</h4>
              <p className="text-muted-foreground">Stocks, ETFs, indices, forex</p>
              <Badge variant="outline">Live updates every 5-10s</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">CoinGecko (Primary)</h4>
              <p className="text-muted-foreground">Cryptocurrency pricing</p>
              <Badge variant="outline">High priority source</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">CoinCap (Fallback)</h4>
              <p className="text-muted-foreground">Backup crypto data</p>
              <Badge variant="secondary">Fallback when CoinGecko fails</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};