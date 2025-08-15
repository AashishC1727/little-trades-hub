import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Download,
  Calendar,
  Clock
} from 'lucide-react';
import { MarketData } from '@/hooks/useRealtimeMarketData';

interface MarketDetailPanelProps {
  asset: MarketData;
  onClose: () => void;
}

export const MarketDetailPanel: React.FC<MarketDetailPanelProps> = ({ asset, onClose }) => {
  const [selectedRange, setSelectedRange] = useState('1D');
  const ranges = ['1D', '1W', '1M', '1Y', 'YTD', 'Max'];

  const formatPrice = (price: number) => {
    if (asset.assetClass === 'FX') return price.toFixed(5);
    if (asset.assetClass === 'Bond') return price.toFixed(3);
    if (asset.assetClass === 'Crypto') return price.toFixed(4);
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
  };

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts);
    return {
      local: date.toLocaleString(),
      exchange: new Date(ts).toLocaleString('en-US', { timeZone: asset.timezone })
    };
  };

  const timestamps = formatTimestamp(asset.ts);

  // Mock technical indicators
  const technicalIndicators = {
    VWAP: (asset.last * 1.02).toFixed(2),
    EMA: (asset.last * 0.98).toFixed(2),
    SMA: (asset.last * 1.01).toFixed(2),
    RSI: (Math.random() * 40 + 30).toFixed(1),
    MACD: ((Math.random() - 0.5) * 2).toFixed(3)
  };

  const exportChart = (format: 'png' | 'svg' | 'csv') => {
    // Mock export functionality
    console.log(`Exporting ${asset.id} chart as ${format.toUpperCase()}`);
    
    // Create mock data for CSV export
    if (format === 'csv') {
      const csvData = asset.sparkline.map((price, index) => ({
        timestamp: new Date(asset.ts - (asset.sparkline.length - index) * 3600000).toISOString(),
        price: price.toFixed(4)
      }));
      
      const csvContent = 'timestamp,price\n' + 
        csvData.map(row => `${row.timestamp},${row.price}`).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${asset.id}_data.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">{asset.name}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{asset.id}</Badge>
            <Badge variant="secondary">{asset.assetClass}</Badge>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">${formatPrice(asset.last)}</p>
            <div className={`flex items-center justify-center gap-1 ${getChangeColor(asset.changeAbs)}`}>
              {asset.changePct >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="font-medium">
                {asset.changeAbs >= 0 ? '+' : ''}{asset.changeAbs.toFixed(2)} 
                ({asset.changePct >= 0 ? '+' : ''}{asset.changePct.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Daily High</p>
            <p className="font-mono">${formatPrice(asset.dayHigh)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Daily Low</p>
            <p className="font-mono">${formatPrice(asset.dayLow)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Volume</p>
            <p className="font-mono">{asset.volume.toLocaleString()}</p>
          </div>
          {asset.marketCap && (
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-mono">${(asset.marketCap / 1e9).toFixed(1)}B</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Chart Range Toggles */}
        <div>
          <p className="text-sm font-medium mb-2">Chart Range</p>
          <div className="flex flex-wrap gap-1">
            {ranges.map((range) => (
              <Button
                key={range}
                variant={selectedRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRange(range)}
                className="h-7 px-2 text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Mock Chart Area */}
        <div className="space-y-2">
          <p className="text-sm font-medium">1D Sparkline</p>
          <div className="h-16 bg-muted rounded flex items-end gap-0.5 p-2">
            {asset.sparkline.slice(-24).map((price, i) => {
              const height = ((price - asset.dayLow) / (asset.dayHigh - asset.dayLow)) * 100;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${asset.changePct >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`$${price.toFixed(2)}`}
                />
              );
            })}
          </div>
        </div>

        {/* OHLC Data */}
        <div>
          <p className="text-sm font-medium mb-2">OHLC Data</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Open:</span>
              <span className="font-mono">${formatPrice(asset.ohlc.open)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">High:</span>
              <span className="font-mono">${formatPrice(asset.ohlc.high)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Low:</span>
              <span className="font-mono">${formatPrice(asset.ohlc.low)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Close:</span>
              <span className="font-mono">${formatPrice(asset.ohlc.close)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Technical Indicators */}
        <div>
          <p className="text-sm font-medium mb-2">Technical Indicators</p>
          <div className="space-y-1 text-sm">
            {Object.entries(technicalIndicators).map(([indicator, value]) => (
              <div key={indicator} className="flex justify-between">
                <span className="text-muted-foreground">{indicator}:</span>
                <span className="font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Export Options */}
        <div>
          <p className="text-sm font-medium mb-2">Export</p>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => exportChart('png')}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              PNG
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => exportChart('svg')}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              SVG
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => exportChart('csv')}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              CSV
            </Button>
          </div>
        </div>

        <Separator />

        {/* Timestamps */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Local: {timestamps.local}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Exchange ({asset.timezone}): {timestamps.exchange}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};