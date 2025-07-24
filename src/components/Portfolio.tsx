import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useMarketData } from '@/hooks/useMarketData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PortfolioPosition {
  id: string;
  asset_symbol: string;
  asset_type: string;
  quantity: number;
  avg_price: number;
}

const Portfolio = () => {
  const { user } = useAuth();
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [loading, setLoading] = useState(true);

  // Get unique symbols for market data
  const cryptoSymbols = positions
    .filter(p => p.asset_type === 'crypto')
    .map(p => p.asset_symbol);
  const stockSymbols = positions
    .filter(p => p.asset_type === 'stock')
    .map(p => p.asset_symbol);

  const { data: cryptoData } = useMarketData(cryptoSymbols, 'crypto');
  const { data: stockData } = useMarketData(stockSymbols, 'stock');

  const allMarketData = [...cryptoData, ...stockData];

  useEffect(() => {
    const fetchPositions = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching portfolio:', error);
      } else {
        setPositions(data || []);
      }
      setLoading(false);
    };

    fetchPositions();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('portfolio-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'portfolios', filter: `user_id=eq.${user?.id}` },
        () => fetchPositions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const calculatePortfolioValue = () => {
    return positions.reduce((total, position) => {
      const marketData = allMarketData.find(d => d.symbol === position.asset_symbol);
      const currentPrice = marketData?.price || position.avg_price;
      return total + (position.quantity * currentPrice);
    }, 0);
  };

  const calculateTotalPnL = () => {
    return positions.reduce((total, position) => {
      const marketData = allMarketData.find(d => d.symbol === position.asset_symbol);
      const currentPrice = marketData?.price || position.avg_price;
      const currentValue = position.quantity * currentPrice;
      const costBasis = position.quantity * position.avg_price;
      return total + (currentValue - costBasis);
    }, 0);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalValue = calculatePortfolioValue();
  const totalPnL = calculateTotalPnL();
  const pnlPercentage = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
          <CardDescription>Your current holdings and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total P&L</div>
              <div className={cn(
                "text-2xl font-bold",
                totalPnL >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">P&L %</div>
              <div className={cn(
                "text-2xl font-bold",
                pnlPercentage >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Positions</CardTitle>
        </CardHeader>
        <CardContent>
          {positions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No positions yet. Start trading to build your portfolio!
            </div>
          ) : (
            <div className="space-y-3">
              {positions.map((position) => {
                const marketData = allMarketData.find(d => d.symbol === position.asset_symbol);
                const currentPrice = marketData?.price || position.avg_price;
                const currentValue = position.quantity * currentPrice;
                const costBasis = position.quantity * position.avg_price;
                const pnl = currentValue - costBasis;
                const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;

                return (
                  <div key={position.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-semibold flex items-center space-x-2">
                          <span className="uppercase">{position.asset_symbol}</span>
                          <Badge variant="secondary" className="text-xs">
                            {position.asset_type}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {position.quantity} shares @ ${position.avg_price.toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${currentValue.toFixed(2)}</div>
                      <div className={cn(
                        "text-sm",
                        pnl >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;