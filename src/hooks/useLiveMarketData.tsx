import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveMarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
  change_absolute?: number;
  volume_24h?: number;
  market_cap?: number;
  last_updated: string;
  source: string;
  asset_type: string;
}

export interface CryptoLiveData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
  volume_24h?: number;
  market_cap?: number;
  last_updated: string;
  source: string;
  source_priority: number;
}

export const useLiveMarketData = () => {
  const [marketData, setMarketData] = useState<LiveMarketData[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoLiveData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveData = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Enable once database migration is applied
      // Using mock data temporarily until tables are created
      setMarketData([]);
      setCryptoData([]);
    } catch (err: any) {
      console.error('Error fetching live market data:', err);
      setError(err.message || 'Failed to fetch live market data');
    } finally {
      setLoading(false);
    }
  };

  const triggerSync = async (type: 'stocks' | 'crypto' | 'news') => {
    try {
      let functionName = '';
      switch (type) {
        case 'stocks':
          functionName = 'stockdata-sync';
          break;
        case 'crypto':
          functionName = 'crypto-sync';
          break;
        case 'news':
          functionName = 'news-sync';
          break;
      }

      const { data, error } = await supabase.functions.invoke(functionName);
      
      if (error) throw error;
      
      console.log(`${type} sync completed:`, data);
      
      // Refresh data after sync
      if (type === 'stocks' || type === 'crypto') {
        await fetchLiveData();
      }
      
      return data;
    } catch (error) {
      console.error(`Error triggering ${type} sync:`, error);
      throw error;
    }
  };

  useEffect(() => {
    fetchLiveData();
    
    // TODO: Enable real-time subscriptions once tables are created
    // const stocksChannel = supabase.channel('market-data-live-changes');
    // const cryptoChannel = supabase.channel('crypto-live-data-changes');

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchLiveData, 10000);

    return () => {
      clearInterval(interval);
      // TODO: Re-enable when channels are set up
      // supabase.removeChannel(stocksChannel);
      // supabase.removeChannel(cryptoChannel);
    };
  }, []);

  return {
    marketData,
    cryptoData,
    loading,
    error,
    refetch: fetchLiveData,
    triggerSync
  };
};
