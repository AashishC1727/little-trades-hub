import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Volume2, 
  Activity,
  Settings,
  Maximize2,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TradingCharts = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W', '1M'];
  const indicators = ['SMA(20)', 'EMA(12)', 'RSI', 'MACD', 'Bollinger Bands'];

  const mockPriceData = [
    { time: '09:00', price: 43250, volume: 1200 },
    { time: '10:00', price: 43180, volume: 1100 },
    { time: '11:00', price: 43420, volume: 1350 },
    { time: '12:00', price: 43380, volume: 980 },
    { time: '13:00', price: 43520, volume: 1450 },
    { time: '14:00', price: 43480, volume: 1200 },
    { time: '15:00', price: 43650, volume: 1600 },
  ];

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <CardTitle>Trading Charts</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            Advanced charting and technical analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Asset Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Asset:</span>
              <div className="flex space-x-1">
                {['BTC', 'ETH', 'AAPL', 'MSFT'].map((asset) => (
                  <Button
                    key={asset}
                    variant={selectedAsset === asset ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    {asset}
                  </Button>
                ))}
              </div>
            </div>

            {/* Timeframe Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Timeframe:</span>
              <div className="flex space-x-1">
                {timeframes.map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chart Type */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Type:</span>
              <div className="flex space-x-1">
                <Button
                  variant={chartType === 'candlestick' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType('candlestick')}
                >
                  Candlestick
                </Button>
                <Button
                  variant={chartType === 'line' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType('line')}
                >
                  Line
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold">{selectedAsset}/USD</span>
                  <Badge variant="outline">{timeframe}</Badge>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">$43,650.00</span>
                    <span className="text-success flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>+2.45%</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Indicator
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Placeholder Chart Area */}
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center border">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Interactive Chart</h3>
                  <p className="text-muted-foreground">
                    Real-time {chartType} chart for {selectedAsset}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Chart integration with TradingView, Chart.js, or custom solution
                  </p>
                </div>
              </div>

              {/* Volume Chart */}
              <div className="mt-4 h-24 bg-muted rounded-lg flex items-center justify-center border">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm">Volume Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Market Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Market Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">24h High</span>
                <span className="font-medium">$43,850</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">24h Low</span>
                <span className="font-medium">$42,980</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">24h Volume</span>
                <span className="font-medium">28.5B</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">$850.2B</span>
              </div>
            </CardContent>
          </Card>

          {/* Active Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Technical Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {indicators.slice(0, 3).map((indicator) => (
                  <div key={indicator} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{indicator}</span>
                    <Badge variant="outline" className="text-xs">
                      Active
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="w-3 h-3 mr-1" />
                  Add More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                Buy {selectedAsset}
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Sell {selectedAsset}
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Activity className="w-3 h-3 mr-1" />
                Set Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradingCharts;