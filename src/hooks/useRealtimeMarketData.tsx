import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// The interface for a single market data item.
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

// Configuration options for the hook.
export interface UseRealtimeMarketDataOptions {
  ids: string[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * A React hook to fetch an initial market data snapshot and then subscribe
 * to a real-time stream for continuous updates.
 */
export const useRealtimeMarketData = ({ 
  ids, 
  autoRefresh = true, 
  refreshInterval = 30000 
}: UseRealtimeMarketDataOptions) => {
  const [data, setData] = useState<Map<string, MarketData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 5;
  const baseRetryDelay = 1000;

  // Stable reference to ids array to prevent infinite re-renders
  const stableIds = useRef(ids);
  const idsChanged = JSON.stringify(stableIds.current) !== JSON.stringify(ids);
  
  if (idsChanged) {
    stableIds.current = ids;
  }

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    // Clear fallback interval
    if (fallbackIntervalRef.current) {
      clearInterval(fallbackIntervalRef.current);
      fallbackIntervalRef.current = null;
    }
    
    // Abort fetch stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setConnected(false);
  }, []);

  // Fetches the initial data snapshot from the 'market-snapshot' Edge Function.
  const fetchSnapshot = useCallback(async () => {
    const currentIds = stableIds.current;
    
    if (!currentIds.length) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      setError(null);

      const { data: responseData, error: invokeError } = await supabase.functions.invoke('market-snapshot', {
        method: 'POST',
        body: { ids: currentIds }
      });

      if (invokeError) throw invokeError;
      if (!responseData.success) throw new Error(responseData.error);

      const newDataMap = new Map<string, MarketData>();
      responseData.data.forEach((item: MarketData) => {
        newDataMap.set(item.id, item);
      });

      setData(newDataMap);

    } catch (err: any) {
      console.error('Error fetching market snapshot:', err);
      setError(err.message || 'Failed to fetch initial market data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Parse SSE data
  const parseSSEData = (text: string) => {
    const lines = text.split('\n');
    let eventType = '';
    let data = '';
    
    for (const line of lines) {
      if (line.startsWith('event:')) {
        eventType = line.substring(6).trim();
      } else if (line.startsWith('data:')) {
        data = line.substring(5).trim();
      } else if (line === '' && eventType && data) {
        // Complete event found
        try {
          return { eventType, data: JSON.parse(data) };
        } catch (e) {
          console.error('Error parsing SSE data:', e);
        }
        eventType = '';
        data = '';
      }
    }
    return null;
  };

  // Establishes a connection to the real-time streaming using fetch
  const connectStream = useCallback(async () => {
    const currentIds = stableIds.current;
    
    if (!currentIds.length || !autoRefresh) {
      return;
    }
    
    // Clean up any existing connection first
    cleanup();
    
    try {
      const idsParam = currentIds.join(',');
      const projectUrl = supabase.rest.url.replace('/rest/v1', '');
      const streamUrl = `${projectUrl}/functions/v1/market-stream?ids=${encodeURIComponent(idsParam)}`;
      
      // Create new abort controller
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      
      console.log('Connecting to market stream:', streamUrl);
      
      const response = await fetch(streamUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream'
        },
        signal: abortController.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      console.log('Market data stream connected successfully.');
      setConnected(true);
      setError(null);
      retryCountRef.current = 0;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (!abortController.signal.aborted) {
          const { done, value } = await reader.read();
          
          if (done) {
            console.log('Stream ended');
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          
          // Process complete SSE messages
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || ''; // Keep incomplete message in buffer
          
          for (const chunk of lines) {
            if (chunk.trim()) {
              const parsed = parseSSEData(chunk);
              
              if (parsed) {
                if (parsed.eventType === 'tick') {
                  const tickData: MarketData = parsed.data;
                  setData(prevData => {
                    const newData = new Map(prevData);
                    newData.set(tickData.id, tickData);
                    return newData;
                  });
                } else if (parsed.eventType === 'heartbeat') {
                  console.log('Heartbeat received from stream.');
                }
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
      
    } catch (err: any) {
      console.error('Stream connection failed:', err);
      setConnected(false);
      
      if (abortControllerRef.current) {
        abortControllerRef.current = null;
      }
      
      // Only retry if not aborted and under retry limit
      if (!err.name?.includes('Abort') && retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        const delay = baseRetryDelay * Math.pow(2, retryCountRef.current - 1);
        
        console.log(`Connection attempt ${retryCountRef.current} failed. Retrying in ${delay}ms...`);
        
        retryTimeoutRef.current = setTimeout(() => {
          connectStream();
        }, delay);
      } else if (retryCountRef.current >= maxRetries) {
        setError('Could not establish a real-time connection. Maximum retries reached.');
      }
    }
  }, [autoRefresh, cleanup]);

  // Function to manually reconnect to the stream.
  const reconnect = useCallback(() => {
    cleanup();
    retryCountRef.current = 0;
    connectStream();
  }, [cleanup, connectStream]);

  // Effect to fetch the initial data when the component mounts or IDs change.
  useEffect(() => {
    if (idsChanged || data.size === 0) {
      fetchSnapshot();
    }
  }, [idsChanged, fetchSnapshot]);

  // Effect to manage the real-time connection lifecycle.
  useEffect(() => {
    if (autoRefresh) {
      connectStream();
    } else {
      cleanup();
    }

    // Cleanup on unmount or when dependencies change
    return cleanup;
  }, [autoRefresh, connectStream, cleanup, idsChanged]);

  // Effect for periodic fallback refresh when connection is lost.
  useEffect(() => {
    if (!autoRefresh) return;

    fallbackIntervalRef.current = setInterval(() => {
      if (!connected) {
        console.log("Fallback: Real-time connection is down. Refetching snapshot.");
        fetchSnapshot();
      }
    }, refreshInterval);

    return () => {
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
    };
  }, [autoRefresh, connected, fetchSnapshot, refreshInterval]);

  // Convert the Map to an Array for easier consumption by UI components.
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