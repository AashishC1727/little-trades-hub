import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MarketTicker from '@/components/MarketTicker';
import Portfolio from '@/components/Portfolio';
import TradePanel from '@/components/TradePanel';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">LITTLE little</h1>
            <p className="text-sm text-muted-foreground">where you can trade anything</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.email}</span>
            <Button onClick={signOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Market Ticker */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-lg font-semibold mb-3">Market Overview</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Crypto</h3>
              <MarketTicker 
                symbols={['bitcoin', 'ethereum', 'cardano', 'solana', 'dogecoin']} 
                type="crypto" 
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Stocks</h3>
              <MarketTicker 
                symbols={['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']} 
                type="stock" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Portfolio />
          </div>
          
          {/* Trading Panel - Takes up 1 column */}
          <div>
            <TradePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
