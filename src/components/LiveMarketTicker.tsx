import { useMarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, Bitcoin, Building2, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

const LiveMarketTicker = () => {
  const cryptoSymbols = ['bitcoin', 'ethereum', 'solana', 'cardano'];
  const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
  
  const { data: cryptoData } = useMarketData(cryptoSymbols, 'crypto');
  const { data: stockData } = useMarketData(stockSymbols, 'stock');

  // Mock collectibles data for now
  const collectiblesData = [
    { name: 'Rare Jordan 1s', price: 2300, change24h: 5.1, category: 'Sneakers' },
    { name: 'Pokemon Charizard', price: 8500, change24h: -2.3, category: 'Cards' },
    { name: 'Rolex Submariner', price: 12500, change24h: 3.7, category: 'Watches' },
    { name: 'Art Basel Print', price: 4200, change24h: 1.8, category: 'Art' },
  ];

  // Combine all market data
  const allMarketData = [
    ...cryptoData.map(item => ({
      category: 'Crypto',
      icon: <Bitcoin className="w-4 h-4" />,
      name: item.symbol.charAt(0).toUpperCase() + item.symbol.slice(1),
      price: `$${item.price.toLocaleString()}`,
      change: item.change24h,
      volume: null
    })),
    ...stockData.map(item => ({
      category: 'Stocks',
      icon: <Building2 className="w-4 h-4" />,
      name: item.symbol,
      price: `$${item.price.toFixed(2)}`,
      change: item.change24h,
      volume: null
    })),
    ...collectiblesData.map(item => ({
      category: 'Collectibles',
      icon: <Gem className="w-4 h-4" />,
      name: item.name,
      price: `$${item.price.toLocaleString()}`,
      change: item.change24h,
      volume: null
    }))
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Crypto': return 'text-orange-500';
      case 'Stocks': return 'text-blue-500';
      case 'Collectibles': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-muted/30 border-y border-border py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap space-x-8">
        {/* Duplicate the array to create seamless loop */}
        {[...allMarketData, ...allMarketData].map((item, index) => (
          <div key={index} className="flex items-center space-x-3 text-sm font-medium">
            <span className={cn("px-2 py-1 rounded text-xs font-semibold", getCategoryColor(item.category))}>
              {item.category}
            </span>
            {item.icon}
            <span className="font-semibold">{item.name}</span>
            <span className="font-mono">{item.price}</span>
            <div className={cn(
              "flex items-center space-x-1",
              item.change >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {item.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="font-mono">
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketTicker;