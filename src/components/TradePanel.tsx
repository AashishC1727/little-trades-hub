import { useState } from 'react';
import { useTrades } from '@/hooks/useTrades';
import { useMarketData } from '@/hooks/useMarketData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const POPULAR_ASSETS = {
  crypto: ['bitcoin', 'ethereum', 'cardano', 'solana', 'dogecoin'],
  stock: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'],
  forex: ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD']
};

const TradePanel = () => {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [assetType, setAssetType] = useState<'crypto' | 'stock' | 'forex'>('crypto');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [useMarketPrice, setUseMarketPrice] = useState(true);

  const { executeTrade, loading } = useTrades();
  const { data: marketData } = useMarketData(
    selectedAsset ? [selectedAsset] : [], 
    assetType
  );

  const currentPrice = marketData[0]?.price || 0;
  const effectivePrice = useMarketPrice ? currentPrice : parseFloat(customPrice) || 0;

  const handleTrade = async () => {
    if (!selectedAsset || !quantity || effectivePrice <= 0) return;

    await executeTrade(
      selectedAsset,
      assetType,
      tradeType,
      parseFloat(quantity),
      effectivePrice
    );

    // Reset form
    setQuantity('');
    setCustomPrice('');
  };

  const totalValue = effectivePrice * parseFloat(quantity || '0');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Trade</CardTitle>
        <CardDescription>Execute trades with real-time market data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="asset-type">Asset Type</Label>
            <Select value={assetType} onValueChange={(value: any) => {
              setAssetType(value);
              setSelectedAsset('');
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="stock">Stocks</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="asset">Asset</Label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger>
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                {POPULAR_ASSETS[assetType].map((asset) => (
                  <SelectItem key={asset} value={asset}>
                    {asset.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedAsset && currentPrice > 0 && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium uppercase">{selectedAsset}</span>
              <span className="text-lg font-bold">${currentPrice.toFixed(assetType === 'crypto' ? 4 : 2)}</span>
            </div>
          </div>
        )}

        <Tabs value={tradeType} onValueChange={(value: any) => setTradeType(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                step="0.0001"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.0000"
              />
            </div>

            <div>
              <Label>Price</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="market-price"
                    checked={useMarketPrice}
                    onChange={() => setUseMarketPrice(true)}
                  />
                  <Label htmlFor="market-price">Market Price (${currentPrice.toFixed(assetType === 'crypto' ? 4 : 2)})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="custom-price"
                    checked={!useMarketPrice}
                    onChange={() => setUseMarketPrice(false)}
                  />
                  <Label htmlFor="custom-price">Custom Price</Label>
                </div>
                {!useMarketPrice && (
                  <Input
                    type="number"
                    step="0.0001"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="Enter price"
                  />
                )}
              </div>
            </div>

            {totalValue > 0 && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between">
                  <span>Total Value:</span>
                  <span className="font-bold">${totalValue.toFixed(2)}</span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleTrade}
              disabled={loading || !selectedAsset || !quantity || effectivePrice <= 0}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Processing...' : `Buy ${selectedAsset.toUpperCase()}`}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div>
              <Label htmlFor="sell-quantity">Quantity</Label>
              <Input
                id="sell-quantity"
                type="number"
                step="0.0001"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.0000"
              />
            </div>

            <div>
              <Label>Price</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sell-market-price"
                    checked={useMarketPrice}
                    onChange={() => setUseMarketPrice(true)}
                  />
                  <Label htmlFor="sell-market-price">Market Price (${currentPrice.toFixed(assetType === 'crypto' ? 4 : 2)})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sell-custom-price"
                    checked={!useMarketPrice}
                    onChange={() => setUseMarketPrice(false)}
                  />
                  <Label htmlFor="sell-custom-price">Custom Price</Label>
                </div>
                {!useMarketPrice && (
                  <Input
                    type="number"
                    step="0.0001"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="Enter price"
                  />
                )}
              </div>
            </div>

            {totalValue > 0 && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between">
                  <span>Total Value:</span>
                  <span className="font-bold">${totalValue.toFixed(2)}</span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleTrade}
              disabled={loading || !selectedAsset || !quantity || effectivePrice <= 0}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Processing...' : `Sell ${selectedAsset.toUpperCase()}`}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradePanel;