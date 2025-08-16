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
  WifiOff
} from 'lucide-react';
import { useRealtimeMarketData, MarketData } from '@/hooks/useRealtimeMarketData';
import { MarketDetailPanel } from '@/components/MarketDetailPanel';

// Default assets to load (using currently supported universe)
const DEFAULT_ASSETS = ['AAPL', 'MSFT', 'ethereum', 'GOOGL', 'AMZN', 'TSLA', 'bitcoin'];

// KPI definitions with alias matching to provider ids
const KPI_DEFS = [
  { label: 'S&P 500', ids: ['SPX', '^GSPC', 'SPY'] },
  { label: 'BTC', ids: ['BTC', 'bitcoin'] },
  { label: 'REIT Index', ids: ['REIT', 'VNQ'] },
  { label: 'Gold', ids: ['XAUUSD', 'GOLD', 'GLD'] },
] as const;

interface Filters {
  assetClass: string;
  region: string;
  exchange: string;
  currency: string;
  session: string;
  search: string;
}

const RealtimeMarketData = () => {
  const [selectedAsset, setSelectedAsset] = useState<MarketData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    assetClass: 'all',
    region: 'all',
    exchange: 'all',
    currency: 'all',
    session: 'all',
    search: ''
  });

  // Fetch market data for default assets
  const allAssets = DEFAULT_ASSETS;
  const { data, loading, error, connected, refetch, reconnect } = useRealtimeMarketData({
    ids: allAssets,
    autoRefresh: true
  });

  // Format number utilities
  const formatPrice = (price: number, assetClass: string) => {
    if (assetClass === 'FX') return price.toFixed(5);
    if (assetClass === 'Bond') return price.toFixed(3);
    if (assetClass === 'Crypto') return price.toFixed(4);
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Symbol formatting (normalize vendor ids to canonical symbols)
  const formatSymbol = (id: string, name: string, assetClass: string) => {
    const map: Record<string, string> = {
      bitcoin: 'BTC',
      ethereum: 'ETH',
      solana: 'SOL',
      cardano: 'ADA',
    };
    const lower = id.toLowerCase();
    if (map[lower]) return map[lower];
    // For indices/funds, prefer ID if already uppercase, else derive from name initials
    if (/^[A-Z0-9.^-]+$/.test(id)) return id;
    return (name?.match(/[A-Z]/g) || []).join('').slice(0, 6) || id.toUpperCase();
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

  // Get KPI data using alias matching
  const kpiData = useMemo(() => {
    return KPI_DEFS.map(def => {
      const aliases = def.ids.map(s => s.toLowerCase());
      const match = data.find(item => aliases.includes(item.id.toLowerCase()));
      if (!match) return null;
      return { ...match, name: def.label } as MarketData;
    }).filter(Boolean) as MarketData[];
  }, [data]);

  // Filter data for main table
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (filters.assetClass !== 'all' && item.assetClass !== filters.assetClass) return false;
      if (filters.exchange !== 'all' && item.exchange !== filters.exchange) return false;
      if (filters.currency !== 'all' && item.currency !== filters.currency) return false;
      if (filters.session !== 'all' && item.session !== filters.session) return false;
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.id.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [data, filters]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
                {connected ? (
                  <>
                    <Wifi className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Live</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-600">Disconnected</span>
                  </>
                )}
              </div>
              <Button onClick={connected ? refetch : reconnect} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {connected ? 'Refresh' : 'Reconnect'}
              </Button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Card className="border-destructive/50 bg-destructive/5 mb-6">
              <CardContent className="p-4">
                <p className="text-destructive">{error}</p>
                <Button onClick={reconnect} variant="outline" size="sm" className="mt-2">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" role="region" aria-live="polite" aria-label="Key Performance Indicators">
            {kpiData.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedAsset(item)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{item.name}</p>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">${formatPrice(item.last, item.assetClass)}</p>
                      <p className={`text-sm ${getChangeColor(item.changeAbs)}`}>
                        {formatChange(item.changeAbs, item.changePct)}
                      </p>
                    </div>
                    <div className="w-16 h-8 bg-muted rounded">
                      {/* Sparkline placeholder */}
                      <div className="w-full h-full flex items-end gap-0.5 px-1">
                        {item.sparkline.slice(-8).map((_, i) => (
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
                          <Badge variant="outline">{formatSymbol(item.id, item.name, item.assetClass)}</Badge>
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

        {/* Detail Panel */}
        {selectedAsset && (
          <div className="lg:w-96 flex-shrink-0">
            <MarketDetailPanel 
              asset={selectedAsset} 
              onClose={() => setSelectedAsset(null)} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtimeMarketData;