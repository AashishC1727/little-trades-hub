import { useMarketData } from '@/hooks/useMarketData';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

const AssetTicker = () => {
  const cryptoData = useMarketData(['bitcoin', 'ethereum', 'solana', 'cardano'], 'crypto');
  const stockData = useMarketData(['AAPL', 'MSFT', 'GOOGL', 'TSLA'], 'stock');

  const allAssets = [...(cryptoData.data || []), ...(stockData.data || [])];

  return (
    <section className="py-16 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Markets</h2>
          <p className="text-muted-foreground text-lg">Real-time data from global exchanges</p>
        </div>

        {/* Scrolling Ticker */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...allAssets, ...allAssets].map((asset, index) => (
              <div
                key={`${asset.symbol}-${index}`}
                className={cn(
                  "flex items-center space-x-3 px-6 py-4 mx-2 rounded-lg border bg-card/50 backdrop-blur-sm min-w-[200px]",
                  "hover:shadow-card transition-all duration-300 hover:scale-105"
                )}
              >
                <div className="flex items-center space-x-2">
                  <div className="font-bold text-sm uppercase">{asset.symbol}</div>
                  <div className={cn(
                    "flex items-center text-sm font-medium",
                    asset.change24h >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {asset.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </div>
                </div>
                <div className="font-bold text-right">
                  ${asset.price.toFixed(asset.symbol.length > 4 ? 4 : 2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Assets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
          {allAssets.slice(0, 6).map((asset) => (
            <div
              key={asset.symbol}
              className="group p-4 rounded-xl border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-sm uppercase">{asset.symbol}</div>
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse-slow",
                  asset.change24h >= 0 ? "bg-success" : "bg-destructive"
                )} />
              </div>
              
              <div className="font-bold text-lg mb-1">
                ${asset.price.toFixed(asset.symbol.length > 4 ? 4 : 2)}
              </div>
              
              <div className={cn(
                "text-sm font-medium flex items-center",
                asset.change24h >= 0 ? "text-success" : "text-destructive"
              )}>
                {asset.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AssetTicker;