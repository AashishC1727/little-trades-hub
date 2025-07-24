import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Eye, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardPreview = () => {
  const mockPortfolio = [
    { symbol: 'BTC', name: 'Bitcoin', value: 45230.12, change: 5.2, amount: 0.523 },
    { symbol: 'ETH', name: 'Ethereum', value: 3120.45, change: -2.1, amount: 1.845 },
    { symbol: 'AAPL', name: 'Apple', value: 174.23, change: 1.8, amount: 50 },
  ];

  const mockTrades = [
    { type: 'BUY', symbol: 'BTC', amount: '0.1', price: '$45,230', time: '2m ago', status: 'filled' },
    { type: 'SELL', symbol: 'ETH', amount: '0.5', price: '$3,120', time: '5m ago', status: 'filled' },
    { type: 'BUY', symbol: 'TSLA', amount: '10', price: '$248.50', time: '12m ago', status: 'pending' },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trading Command Center
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to trade like a pro, designed to be beautiful and intuitive.
          </p>
          <Button className="rounded-full px-8" onClick={() => window.location.href = '/dashboard'}>
            <Eye className="w-4 h-4 mr-2" />
            View Live Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Mock Dashboard */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Portfolio Overview */}
            <div className="lg:col-span-2">
              <Card className="shadow-card hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Portfolio</span>
                    <span className="text-2xl font-bold text-success">$127,483.45</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPortfolio.map((asset, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm">
                            {asset.symbol}
                          </div>
                          <div>
                            <div className="font-semibold">{asset.name}</div>
                            <div className="text-sm text-muted-foreground">{asset.amount} {asset.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${asset.value.toLocaleString()}</div>
                          <div className={cn(
                            "text-sm font-medium flex items-center justify-end",
                            asset.change >= 0 ? "text-success" : "text-destructive"
                          )}>
                            {asset.change >= 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {asset.change >= 0 ? '+' : ''}{asset.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Trade Panel */}
            <Card className="shadow-card hover:shadow-premium transition-all duration-300">
              <CardHeader>
                <CardTitle>Quick Trade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-12">BUY</Button>
                  <Button variant="outline" className="h-12">SELL</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border">
                    <div className="text-xs text-muted-foreground mb-1">Asset</div>
                    <div className="font-semibold">Bitcoin (BTC)</div>
                  </div>
                  
                  <div className="p-3 rounded-lg border">
                    <div className="text-xs text-muted-foreground mb-1">Amount</div>
                    <div className="font-semibold">0.1 BTC</div>
                  </div>
                  
                  <div className="p-3 rounded-lg border">
                    <div className="text-xs text-muted-foreground mb-1">Est. Total</div>
                    <div className="font-semibold">$4,523.01</div>
                  </div>
                </div>
                
                <Button className="w-full h-12 rounded-lg">
                  Execute Trade
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Trades */}
          <Card className="shadow-card hover:shadow-premium transition-all duration-300">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTrades.map((trade, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "px-2 py-1 rounded-md text-xs font-bold",
                        trade.type === 'BUY' ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                      )}>
                        {trade.type}
                      </div>
                      <div>
                        <div className="font-semibold">{trade.symbol}</div>
                        <div className="text-sm text-muted-foreground">{trade.amount} @ {trade.price}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-xs px-2 py-1 rounded-md font-medium",
                        trade.status === 'filled' ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        {trade.status.toUpperCase()}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{trade.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;