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
    <>
      <style>{`
        .ticker-container {
          background: linear-gradient(135deg, 
            rgba(248, 250, 252, 0.95) 0%, 
            rgba(241, 245, 249, 0.9) 50%, 
            rgba(248, 250, 252, 0.95) 100%);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(203, 213, 225, 0.3);
          border-bottom: 1px solid rgba(203, 213, 225, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .ticker-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            transparent 20%, 
            transparent 80%, 
            rgba(147, 51, 234, 0.05) 100%);
          pointer-events: none;
        }
        
        .ticker-item {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.7) 0%, 
            rgba(255, 255, 255, 0.5) 100%);
          border: 1px solid rgba(203, 213, 225, 0.3);
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .ticker-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.4) 50%, 
            transparent 100%);
          transition: left 0.5s;
        }
        
        .ticker-item:hover::before {
          left: 100%;
        }
        
        .ticker-item:hover {
          transform: translateY(-1px);
          border-color: rgba(203, 213, 225, 0.5);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .category-badge {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(248, 250, 252, 0.6) 100%);
          border: 1px solid rgba(203, 213, 225, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .crypto-glow {
          box-shadow: 0 0 10px rgba(251, 146, 60, 0.2);
        }
        
        .stocks-glow {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
        }
        
        .collectibles-glow {
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.2);
        }
        
        .price-display {
          background: linear-gradient(135deg, 
            rgba(71, 85, 105, 0.1) 0%, 
            rgba(100, 116, 139, 0.05) 100%);
          border: 1px solid rgba(203, 213, 225, 0.3);
        }
        
        .change-positive {
          background: linear-gradient(135deg, 
            rgba(34, 197, 94, 0.1) 0%, 
            rgba(34, 197, 94, 0.03) 100%);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        
        .change-negative {
          background: linear-gradient(135deg, 
            rgba(239, 68, 68, 0.1) 0%, 
            rgba(239, 68, 68, 0.03) 100%);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        
        .fade-edges {
          position: relative;
        }
        
        .fade-edges::before,
        .fade-edges::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50px;
          z-index: 2;
          pointer-events: none;
        }
        
        .fade-edges::before {
          left: 0;
          background: linear-gradient(to right, 
            rgba(248, 250, 252, 0.9) 0%, 
            rgba(248, 250, 252, 0.5) 50%, 
            transparent 100%);
        }
        
        .fade-edges::after {
          right: 0;
          background: linear-gradient(to left, 
            rgba(248, 250, 252, 0.9) 0%, 
            rgba(248, 250, 252, 0.5) 50%, 
            transparent 100%);
        }
      `}</style>
      
      <section className="ticker-container bg-muted/30 border-y border-border py-4 overflow-hidden">
        <div className="container mx-auto px-4 mb-2">
          <h3 className="text-lg font-semibold text-center bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent">
            Live Market Data
          </h3>
        </div>
        
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap space-x-8">
            {/* Duplicate the array to create seamless loop */}
            {[...allMarketData, ...allMarketData].map((item, index) => (
              <div key={index} className="ticker-item flex items-center space-x-3 text-sm font-medium px-4 py-2 rounded-lg min-w-max">
                <span className={cn(
                  "category-badge px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm",
                  getCategoryColor(item.category),
                  item.category === 'Crypto' && 'crypto-glow',
                  item.category === 'Stocks' && 'stocks-glow',
                  item.category === 'Collectibles' && 'collectibles-glow'
                )}>
                  {item.category}
                </span>
                {item.icon}
                <span className="font-semibold text-slate-800">{item.name}</span>
                <span className="price-display font-mono px-2 py-1 rounded backdrop-blur-sm text-slate-700 font-semibold">
                  {item.price}
                </span>
                <div className={cn(
                  "flex items-center space-x-1 px-2 py-1 rounded backdrop-blur-sm",
                  item.change >= 0 ? "change-positive text-green-600" : "change-negative text-red-600"
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
      </section>
    </>
  );
};

export default LiveMarketTicker;