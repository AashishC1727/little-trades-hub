import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Supabase client for caching
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const CACHE_TTL_MINUTES = 5
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

// Sleep utility for retry delays
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Check if cached data is still valid
const isCacheValid = (fetchedAt: string): boolean => {
  const cacheTime = new Date(fetchedAt).getTime()
  const now = Date.now()
  const diffMinutes = (now - cacheTime) / (1000 * 60)
  return diffMinutes < CACHE_TTL_MINUTES
}

// Get cached data
const getCachedData = async (symbol: string) => {
  try {
    const { data, error } = await supabase
      .from('market_data_cache')
      .select('*')
      .eq('symbol', symbol)
      .single()
    
    if (error || !data) return null
    
    if (isCacheValid(data.fetched_at)) {
      console.log(`Using cached data for ${symbol}`)
      return data.data
    }
    
    return null
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

// Save data to cache
const saveCachedData = async (symbol: string, data: any) => {
  try {
    await supabase
      .from('market_data_cache')
      .upsert({
        symbol,
        data,
        fetched_at: new Date().toISOString()
      })
    console.log(`Cached data for ${symbol}`)
  } catch (error) {
    console.error('Cache write error:', error)
  }
}

// Retry wrapper for API calls
const withRetry = async (fn: () => Promise<any>, retries = MAX_RETRIES): Promise<any> => {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying API call, ${retries} attempts remaining`)
      await sleep(RETRY_DELAY)
      return withRetry(fn, retries - 1)
    }
    throw error
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols, type } = await req.json();
    console.log('Fetching market data for:', { symbols, type });

    let data = [];

    // Process each symbol individually for better caching
    for (const symbol of symbols) {
      const cacheKey = `${symbol}-${type}`;
      
      // Try to get cached data first
      let symbolData = await getCachedData(cacheKey);
      
      if (!symbolData) {
        console.log(`Cache miss for ${symbol}, fetching fresh data`);
        
        try {
          if (type === 'crypto') {
            // Fetch crypto data with retry
            symbolData = await withRetry(async () => {
              const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`
              );
              
              if (!response.ok) {
                throw new Error(`CoinGecko API error: ${response.status}`);
              }
              
              const cryptoData = await response.json();
              const info = cryptoData[symbol];
              
              if (!info) {
                throw new Error(`No data found for symbol: ${symbol}`);
              }
              
              return {
                symbol,
                price: info.usd,
                change24h: info.usd_24h_change || 0,
                lastUpdated: info.last_updated_at,
                type: 'crypto'
              };
            });
          } else {
            // Fetch stock data with retry
            const finnhubKey = Deno.env.get('FINNHUB_API_KEY');
            if (!finnhubKey) {
              throw new Error('Finnhub API key not configured');
            }

            symbolData = await withRetry(async () => {
              const response = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubKey}`
              );
              
              if (!response.ok) {
                throw new Error(`Finnhub API error for ${symbol}: ${response.status}`);
              }
              
              const quote = await response.json();
              
              return {
                symbol,
                price: quote.c,
                change24h: quote.dp || 0,
                high: quote.h,
                low: quote.l,
                open: quote.o,
                previousClose: quote.pc,
                lastUpdated: Date.now(),
                type: type || 'stock'
              };
            });
          }
          
          // Cache the fresh data
          await saveCachedData(cacheKey, symbolData);
          
        } catch (apiError) {
          console.error(`API error for ${symbol}:`, apiError);
          
          // Try to get stale cached data as fallback
          const staleData = await supabase
            .from('market_data_cache')
            .select('*')
            .eq('symbol', cacheKey)
            .single();
            
          if (staleData.data) {
            console.log(`Using stale cached data for ${symbol}`);
            symbolData = { ...staleData.data.data, cached: true, stale: true };
          } else {
            // No cache available, throw error
            throw new Error(`Failed to fetch data for ${symbol}: ${apiError.message}`);
          }
        }
      } else {
        symbolData = { ...symbolData, cached: true };
      }
      
      data.push(symbolData);
    }

    console.log('Final market data:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Market data error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
})