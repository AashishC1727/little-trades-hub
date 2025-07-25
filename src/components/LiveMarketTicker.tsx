import { useState, useEffect } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, Bitcoin, Building2, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

const LiveMarketTicker = () => {
  const cryptoSymbols = ['bitcoin', 'ethereum', 'solana', 'cardano'];
  const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
  
  const { data: cryptoData } = useMarketData(cryptoSymbols, 'crypto');
  const { data: stockData } = useMarketData(stockSymbols, 'stock');

  // Mock collectibles data that changes randomly
  const [collectiblesData, setCollectiblesData] = useState([
    { name: 'Rare Jordan 1s', price: 2300, change24h: 5.1, category: 'Sneakers' },
    { name: 'Pokemon Charizard', price: 8500, change24h: -2.3, category: 'Cards' },
    { name: 'Rolex Submariner', price: 12500, change24h: 3.7, category: 'Watches' },
    { name: 'Art Basel Print', price: 4200, change24h: 1.8, category: 'Art' },
  ]);

  // Simulate live price changes for collectibles
  useEffect(() => {
    const interval = setInterval(() => {
      setCollectiblesData(prev => prev.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
        change24h: item.change24h + (Math.random() - 0.5) * 0.5 // slight change variation
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
    <section className="bg-muted/30 border-y border-border py-4 overflow-hidden">
      <div className="container mx-auto px-4 mb-2">
        <h3 className="text-lg font-semibold text-center">Live Market Data</h3>
      </div>
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
    </section>
  );
};

export default LiveMarketTicker;