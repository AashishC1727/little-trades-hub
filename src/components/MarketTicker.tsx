import { useMarketData } from '@/hooks/useMarketData';
import { cn } from '@/lib/utils';

interface MarketTickerProps {
  symbols: string[];
  type: 'crypto' | 'stock' | 'forex';
  className?: string;
}

const MarketTicker = ({ symbols, type, className }: MarketTickerProps) => {
  const { data, loading, error } = useMarketData(symbols, type);

  if (loading) {
    return (
      <div className={cn("flex space-x-4 overflow-x-auto", className)}>
        {symbols.map((symbol) => (
          <div key={symbol} className="flex-shrink-0 bg-card rounded-lg p-3 animate-pulse">
            <div className="h-4 bg-muted rounded w-16 mb-1"></div>
            <div className="h-3 bg-muted rounded w-12"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-destructive text-sm", className)}>
        Error loading market data: {error}
      </div>
    );
  }

  return (
    <div className={cn("flex space-x-4 overflow-x-auto pb-2", className)}>
      {data.map((item: any) => (
        <div key={item.symbol} className="flex-shrink-0 bg-card rounded-lg p-3 border">
          <div className="flex items-center justify-between min-w-[120px]">
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm uppercase">
                  {item.symbol}
                </span>
                {item.cached && (
                  <span className={cn(
                    "text-xs px-1 rounded",
                    item.stale ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {item.stale ? "STALE" : "CACHED"}
                  </span>
                )}
              </div>
              <div className="text-lg font-bold">
                ${item.price?.toFixed(type === 'crypto' ? 4 : 2) || 'N/A'}
              </div>
            </div>
            <div className={cn(
              "text-sm font-medium",
              item.change24h >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {item.change24h >= 0 ? '+' : ''}{item.change24h?.toFixed(2) || '0.00'}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketTicker;