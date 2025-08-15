import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MarketData {
  id: string;
  name: string;
  assetClass: string;
  exchange: string;
  currency: string;
  last: number;
  changeAbs: number;
  changePct: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap?: number;
  session: string;
  sparkline: number[];
  ohlc: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  timezone: string;
  ts: number;
}

export interface UseRealtimeMarketDataOptions {
  ids: string[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const useRealtimeMarketData = ({ 
  ids, 
  autoRefresh = true, 
  refreshInterval = 30000 
}: UseRealtimeMarketDataOptions) => {
  const [data, setData] = useState<Map<string, MarketData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 5;
  const baseRetryDelay = 1000;

  const fetchSnapshot = useCallback(async () => {
    if (!ids.length) return;
    
    try {
      setError(null);
      const idsParam = ids.join(',');
      
      const { data: response, error } = await supabase.functions.invoke('market-snapshot', {
        body: { ids: idsParam },
        method: 'GET'
      });
      
      if (error) throw error;
      if (!response.success) throw new Error(response.error);
      
      const newDataMap = new Map<string, MarketData>();
      response.data.forEach((item: MarketData) => {
        newDataMap.set(item.id, item);
      });
      
      setData(newDataMap);
      setLoading(false);
      
    } catch (err: any) {
      console.error('Error fetching market snapshot:', err);
      setError(err.message || 'Failed to fetch market data');
      setLoading(false);
    }
  }, [ids]);

  const connectEventSource = useCallback(() => {
    if (!ids.length || !autoRefresh) return;
    
    try {
      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      
      const idsParam = ids.join(',');
      const streamUrl = `https://iwbdeakpqfljskpxjejm.supabase.co/functions/v1/market-stream?ids=${encodeURIComponent(idsParam)}`;
      
      const eventSource = new EventSource(streamUrl, {
        withCredentials: false
      });
      
      eventSourceRef.current = eventSource;
      
      eventSource.onopen = () => {
        console.log('Market data stream connected');
        setConnected(true);
        setError(null);
        retryCountRef.current = 0;
      };
      
      eventSource.addEventListener('tick', (event) => {
        try {
          const tickData: MarketData = JSON.parse(event.data);
          
          setData(prevData => {
            const newData = new Map(prevData);
            newData.set(tickData.id, tickData);
            return newData;
          });
          
        } catch (err) {
          console.error('Error parsing tick data:', err);
        }
      });
      
      eventSource.addEventListener('heartbeat', (event) => {
        // Keep connection alive
        console.log('Heartbeat received');
      });
      
      eventSource.onerror = () => {
        console.error('EventSource error');
        setConnected(false);
        
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current++;
          const delay = baseRetryDelay * Math.pow(2, retryCountRef.current - 1);
          
          setTimeout(() => {
            console.log(`Retrying connection (attempt ${retryCountRef.current})`);
            connectEventSource();
          }, delay);
        } else {
          setError('Failed to maintain real-time connection. Retries exhausted.');
        }
      };
      
    } catch (err: any) {
      console.error('Error setting up EventSource:', err);
      setError(err.message || 'Failed to setup real-time connection');
    }
  }, [ids, autoRefresh]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setConnected(false);
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    retryCountRef.current = 0;
    connectEventSource();
  }, [disconnect, connectEventSource]);

  // Initial data fetch
  useEffect(() => {
    fetchSnapshot();
  }, [fetchSnapshot]);

  // Setup real-time connection
  useEffect(() => {
    if (autoRefresh) {
      connectEventSource();
    }

    return () => {
      disconnect();
    };
  }, [autoRefresh, connectEventSource, disconnect]);

  // Periodic fallback refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (!connected) {
        fetchSnapshot();
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, connected, fetchSnapshot, refreshInterval]);

  // Convert Map to Array for easier consumption
  const dataArray = Array.from(data.values());

  return {
    data: dataArray,
    dataMap: data,
    loading,
    error,
    connected,
    refetch: fetchSnapshot,
    reconnect
  };
};
