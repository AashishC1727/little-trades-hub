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
      // Fetch stocks/forex data
      const { data: stocks, error: stockError } = await supabase
        .from('market_data_live')
        .select('*')
        .order('last_updated', { ascending: false });

      if (stockError) throw stockError;

      // Fetch crypto data (prioritize by source_priority)
      const { data: crypto, error: cryptoError } = await supabase
        .from('crypto_live_data')
        .select('*')
        .order('source_priority', { ascending: true })
        .order('last_updated', { ascending: false });

      if (cryptoError) throw cryptoError;

      // Remove duplicates from crypto data, keeping highest priority source
      const uniqueCrypto = crypto?.reduce((acc: CryptoLiveData[], current) => {
        const existing = acc.find(item => item.symbol === current.symbol);
        if (!existing || current.source_priority < existing.source_priority) {
          return [...acc.filter(item => item.symbol !== current.symbol), current];
        }
        return acc;
      }, []) || [];

      setMarketData(stocks || []);
      setCryptoData(uniqueCrypto);
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
    
    // Set up real-time subscriptions
    const stocksChannel = supabase
      .channel('market-data-live-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'market_data_live'
        },
        () => {
          fetchLiveData();
        }
      )
      .subscribe();

    const cryptoChannel = supabase
      .channel('crypto-live-data-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'crypto_live_data'
        },
        () => {
          fetchLiveData();
        }
      )
      .subscribe();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchLiveData, 10000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(stocksChannel);
      supabase.removeChannel(cryptoChannel);
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
