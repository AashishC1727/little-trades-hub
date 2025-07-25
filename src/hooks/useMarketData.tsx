import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MarketDataPoint {
  symbol: string;
  price: number;
  change24h: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
  lastUpdated: number;
  type: 'crypto' | 'stock' | 'forex';
}

export const useMarketData = (symbols: string[], type: 'crypto' | 'stock' | 'forex') => {
  const [data, setData] = useState<MarketDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    if (!symbols.length) return;
    
    setLoading(true);
    setError(null);

    try {
      const { data: response, error } = await supabase.functions.invoke('market-data', {
        body: { symbols, type }
      });

      if (error) throw error;
      if (!response.success) throw new Error(response.error);

      setData(response.data);
    } catch (err: any) {
      console.error('Market data fetch error:', err);
      setError(err.message || 'Failed to fetch market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Refresh every 2 seconds for live updates
    const interval = setInterval(fetchMarketData, 2000);
    return () => clearInterval(interval);
  }, [symbols.join(','), type]);

  return { data, loading, error, refetch: fetchMarketData };
};