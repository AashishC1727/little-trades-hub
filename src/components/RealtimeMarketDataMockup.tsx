
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  RotateCcw,
  Activity,
  Globe,
  Wifi,
  X,
  BarChart3,
  Download,
  Calendar,
  Clock
} from 'lucide-react';

// Mock data for KPI cards
const kpiData = [
  { name: 'S&P 500', price: 4756.50, changeAbs: 23.45, changePct: 0.49, sparkline: [4730, 4742, 4738, 4745, 4751, 4756] },
  { name: 'BTC', price: 43250.00, changeAbs: -1205.30, changePct: -2.71, sparkline: [44455, 44200, 43800, 43500, 43100, 43250] },
  { name: 'REIT Index', price: 89.45, changeAbs: 0.85, changePct: 0.96, sparkline: [88.6, 88.9, 89.1, 89.3, 89.2, 89.45] },
  { name: 'Gold', price: 2045.60, changeAbs: 12.40, changePct: 0.61, sparkline: [2033, 2038, 2041, 2043, 2044, 2045.6] }
];

// Mock data for main grid
const mockMarketData = [
  { id: 'AAPL', name: 'Apple Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', last: 174.59, changeAbs: 3.08, changePct: 1.78, dayHigh: 176.75, dayLow: 171.40, volume: 86500000, sparkline: [171.5, 172.3, 174.1, 175.2, 174.8, 174.59] },
  { id: 'MSFT', name: 'Microsoft Corp', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', last: 378.85, changeAbs: -2.15, changePct: -0.56, dayHigh: 382.50, dayLow: 376.20, volume: 28400000, sparkline: [381, 380.5, 379.2, 378.1, 377.8, 378.85] },
  { id: 'ETH', name: 'Ethereum', assetClass: 'Crypto', exchange: 'Global', currency: 'USD', last: 2287.45, changeAbs: -45.30, changePct: -1.94, dayHigh: 2355.80, dayLow: 2275.10, volume: 12800000, sparkline: [2332.75, 2318.20, 2305.60, 2290.30, 2285.40, 2287.45] },
  { id: 'GOOGL', name: 'Alphabet Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', last: 141.80, changeAbs: 1.25, changePct: 0.89, dayHigh: 142.95, dayLow: 140.15, volume: 34200000, sparkline: [140.55, 141.2, 141.8, 142.1, 141.9, 141.80] },
  { id: 'AMZN', name: 'Amazon.com Inc', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', last: 155.24, changeAbs: 2.87, changePct: 1.88, dayHigh: 156.10, dayLow: 152.45, volume: 42100000, sparkline: [152.37, 153.45, 154.80, 155.60, 155.30, 155.24] },
  { id: 'TSLA', name: 'Tesla, Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', last: 238.45, changeAbs: -8.75, changePct: -3.54, dayHigh: 248.20, dayLow: 236.80, volume: 78900000, sparkline: [247.2, 245.1, 242.8, 240.2, 238.9, 238.45] },
  { id: 'REIT', name: 'REIT Index', assetClass: 'RealEstate', exchange: 'NYSE', currency: 'USD', last: 89.45, changeAbs: 0.85, changePct: 0.96, dayHigh: 90.12, dayLow: 88.75, volume: 5600000, sparkline: [88.6, 88.9, 89.1, 89.3, 89.2, 89.45] }
];

interface Filters {
  assetClass: string;
  region: string;
  exchange: string;
  currency: string;
  session: string;
  search: string;
}

const RealtimeMarketDataMockup = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [selectedRange, setSelectedRange] = useState('1D');
  const [filters, setFilters] = useState<Filters>({
    assetClass: 'all',
    region: 'all',
    exchange: 'all',
    currency: 'all',
    session: 'all',
    search: ''
  });

  const ranges = ['1D', '1W', '1M', '1Y', 'YTD', 'Max'];

  const formatPrice = (price: number, assetClass: string = 'Equity') => {
    if (assetClass === 'FX') return price.toFixed(5);
    if (assetClass === 'Bond') return price.toFixed(3);
    if (assetClass === 'Crypto') return price.toFixed(2);
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChange = (change: number, pct: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${pct.toFixed(2)}%)`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
  };

  const filteredData = useMemo(() => {
    return mockMarketData.filter(item => {
      if (filters.assetClass !== 'all' && item.assetClass !== filters.assetClass) return false;
      if (filters.exchange !== 'all' && item.exchange !== filters.exchange) return false;
      if (filters.currency !== 'all' && item.currency !== filters.currency) return false;
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.id.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      assetClass: 'all',
      region: 'all',
      exchange: 'all',
      currency: 'all',
      session: 'all',
      search: ''
    });
  };

  const exportChart = (format: 'png' | 'svg' | 'csv') => {
    console.log(`Exporting chart as ${format.toUpperCase()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">REAL-TIME MARKET DATA</h1>
              <p className="text-muted-foreground mt-1">Live market prices and updates</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Live</span>
              </div>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" role="region" aria-live="polite" aria-label="Key Performance Indicators">
            {kpiData.map((item) => (
              <Card key={item.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{item.name}</p>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">${formatPrice(item.price)}</p>
                      <p className={`text-sm ${getChangeColor(item.changeAbs)}`}>
                        {formatChange(item.changeAbs, item.changePct)}
                      </p>
                    </div>
                    <div className="w-16 h-8 bg-muted rounded">
                      <div className="w-full h-full flex items-end gap-0.5 px-1">
                        {item.sparkline.map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-sm ${item.changePct >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ height: `${Math.random() * 60 + 20}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search symbol, name..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filters.assetClass} onValueChange={(value) => handleFilterChange('assetClass', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Asset Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Equity">Equity</SelectItem>
                    <SelectItem value="Index">Index</SelectItem>
                    <SelectItem value="Crypto">Crypto</SelectItem>
                    <SelectItem value="FX">FX</SelectItem>
                    <SelectItem value="Commodity">Commodity</SelectItem>
                    <SelectItem value="RealEstate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.exchange} onValueChange={(value) => handleFilterChange('exchange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exchanges</SelectItem>
                    <SelectItem value="NASDAQ">NASDAQ</SelectItem>
                    <SelectItem value="NYSE">NYSE</SelectItem>
                    <SelectItem value="Global">Global</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.currency} onValueChange={(value) => handleFilterChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Currencies</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.session} onValueChange={(value) => handleFilterChange('session', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="REG">Regular</SelectItem>
                    <SelectItem value="PRE">Pre-Market</SelectItem>
                    <SelectItem value="POST">After-Hours</SelectItem>
                    <SelectItem value="24H">24 Hour</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Market Data ({filteredData.length} assets)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 top-0 z-10 bg-background">Asset Name</TableHead>
                      <TableHead className="sticky top-0 z-10 bg-background">Symbol</TableHead>
                      <TableHead className="sticky top-0 z-10 bg-background">Asset Class</TableHead>
                      <TableHead className="sticky top-0 z-10 bg-background text-right">Last Price</TableHead>
                      <TableHead className="sticky top-0 z-10 bg-background text-right">% Change</TableHead>
                      <TableHead className="sticky top-0 z-10 bg-background text-right">Daily High</TableHead>
                      <TableHead className="sticky top-0 z-10 bg-background text-right">Daily Low</TableHead>
                      <TableHead className="sticky top-0 z-10 bg-background text-right">Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow 
                        key={item.id} 
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedAsset(item)}
                      >
                        <TableCell className="sticky left-0 bg-background font-medium">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.id}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{item.assetClass}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${formatPrice(item.last, item.assetClass)}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${getChangeColor(item.changeAbs)}`}>
                          <div className="flex items-center justify-end gap-1">
                            {item.changePct >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {item.changePct.toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${formatPrice(item.dayHigh, item.assetClass)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${formatPrice(item.dayLow, item.assetClass)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {item.volume.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right-Rail Detail Panel */}
        {selectedAsset && (
          <div className="lg:w-96 flex-shrink-0">
            <Card className="h-fit">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{selectedAsset.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAsset(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{selectedAsset.id}</Badge>
                    <Badge variant="secondary">{selectedAsset.assetClass}</Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">${formatPrice(selectedAsset.last, selectedAsset.assetClass)}</p>
                    <div className={`flex items-center justify-center gap-1 ${getChangeColor(selectedAsset.changeAbs)}`}>
                      {selectedAsset.changePct >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {selectedAsset.changeAbs >= 0 ? '+' : ''}{selectedAsset.changeAbs.toFixed(2)} 
                        ({selectedAsset.changePct >= 0 ? '+' : ''}{selectedAsset.changePct.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Daily High</p>
                    <p className="font-mono">${formatPrice(selectedAsset.dayHigh, selectedAsset.assetClass)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Daily Low</p>
                    <p className="font-mono">${formatPrice(selectedAsset.dayLow, selectedAsset.assetClass)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Volume</p>
                    <p className="font-mono">{selectedAsset.volume.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Exchange</p>
                    <p className="font-mono">{selectedAsset.exchange}</p>
                  </div>
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

                {/* 1D Sparkline */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">1D Sparkline</p>
                  <div className="h-16 bg-muted rounded flex items-end gap-0.5 p-2">
                    {selectedAsset.sparkline.map((price: number, i: number) => {
                      const height = ((price - selectedAsset.dayLow) / (selectedAsset.dayHigh - selectedAsset.dayLow)) * 100;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${selectedAsset.changePct >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ height: `${Math.max(height, 5)}%` }}
                          title={`$${price.toFixed(2)}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Technical Indicators */}
                <div>
                  <p className="text-sm font-medium mb-2">Technical Indicators</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VWAP:</span>
                      <span className="font-mono">${(selectedAsset.last * 1.02).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">EMA:</span>
                      <span className="font-mono">${(selectedAsset.last * 0.98).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SMA:</span>
                      <span className="font-mono">${(selectedAsset.last * 1.01).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RSI:</span>
                      <span className="font-mono">{(Math.random() * 40 + 30).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MACD:</span>
                      <span className="font-mono">{((Math.random() - 0.5) * 2).toFixed(3)}</span>
                    </div>
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
                    <span>Local: {new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Exchange: {new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtimeMarketDataMockup;
