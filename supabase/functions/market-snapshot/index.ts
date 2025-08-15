import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Asset definitions with providers
const ASSETS = {
  // Equities
  'AAPL': { name: 'Apple Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', provider: 'finnhub' },
  'MSFT': { name: 'Microsoft Corp', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', provider: 'finnhub' },
  'GOOGL': { name: 'Alphabet Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', provider: 'finnhub' },
  'AMZN': { name: 'Amazon.com Inc', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', provider: 'finnhub' },
  'TSLA': { name: 'Tesla, Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD', provider: 'finnhub' },
  
  // Indices
  'SPY': { name: 'S&P 500', assetClass: 'Index', exchange: 'NYSE', currency: 'USD', provider: 'finnhub' },
  'QQQ': { name: 'NASDAQ 100', assetClass: 'Index', exchange: 'NASDAQ', currency: 'USD', provider: 'finnhub' },
  'REIT': { name: 'REIT Index', assetClass: 'RealEstate', exchange: 'NYSE', currency: 'USD', provider: 'finnhub' },
  
  // Crypto
  'BTC': { name: 'Bitcoin', assetClass: 'Crypto', exchange: 'Global', currency: 'USD', provider: 'coingecko' },
  'ETH': { name: 'Ethereum', assetClass: 'Crypto', exchange: 'Global', currency: 'USD', provider: 'coingecko' },
  
  // Commodities
  'GLD': { name: 'Gold', assetClass: 'Commodity', exchange: 'NYSE', currency: 'USD', provider: 'finnhub' },
  'SLV': { name: 'Silver', assetClass: 'Commodity', exchange: 'NYSE', currency: 'USD', provider: 'finnhub' },
  
  // FX
  'EURUSD': { name: 'EUR/USD', assetClass: 'FX', exchange: 'Global', currency: 'USD', provider: 'finnhub' },
  'GBPUSD': { name: 'GBP/USD', assetClass: 'FX', exchange: 'Global', currency: 'USD', provider: 'finnhub' }
};

const finnhubApiKey = Deno.env.get('FINNHUB_API_KEY');

// Cache management
const cache = new Map();
const CACHE_TTL = 5000; // 5 seconds

interface MarketData {
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

function generateSparkline(price: number): number[] {
  // Generate realistic intraday sparkline data
  const points = 24; // 24 hours
  const sparkline: number[] = [];
  let currentPrice = price * (0.98 + Math.random() * 0.04); // Start within 2% of current
  
  for (let i = 0; i < points; i++) {
    const volatility = 0.02; // 2% max change per hour
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = currentPrice * (1 + change);
    sparkline.push(Number(currentPrice.toFixed(4)));
  }
  
  // Ensure last point approximates current price
  sparkline[points - 1] = price;
  return sparkline;
}

async function fetchFromFinnhub(symbol: string): Promise<any> {
  try {
    const quoteResponse = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    
    if (!quoteResponse.ok) {
      throw new Error(`Finnhub API error: ${quoteResponse.status}`);
    }
    
    return await quoteResponse.json();
  } catch (error) {
    console.error(`Error fetching from Finnhub for ${symbol}:`, error);
    return null;
  }
}

async function fetchFromCoingecko(symbol: string): Promise<any> {
  try {
    const coinId = symbol === 'BTC' ? 'bitcoin' : 'ethereum';
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data[coinId];
  } catch (error) {
    console.error(`Error fetching from CoinGecko for ${symbol}:`, error);
    return null;
  }
}

async function fetchMarketData(ids: string[]): Promise<MarketData[]> {
  const results: MarketData[] = [];
  
  for (const id of ids) {
    const cacheKey = id;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      results.push(cached.data);
      continue;
    }
    
    const assetInfo = ASSETS[id];
    if (!assetInfo) {
      console.warn(`Unknown asset: ${id}`);
      continue;
    }
    
    try {
      let rawData = null;
      
      if (assetInfo.provider === 'finnhub' && finnhubApiKey) {
        rawData = await fetchFromFinnhub(id);
      } else if (assetInfo.provider === 'coingecko') {
        rawData = await fetchFromCoingecko(id);
      }
      
      if (!rawData) {
        console.warn(`No data available for ${id}`);
        continue;
      }
      
      let marketData: MarketData;
      
      if (assetInfo.provider === 'finnhub') {
        const price = rawData.c || 0;
        const change = rawData.c - rawData.pc || 0;
        const changePct = rawData.pc ? (change / rawData.pc) * 100 : 0;
        
        marketData = {
          id,
          name: assetInfo.name,
          assetClass: assetInfo.assetClass,
          exchange: assetInfo.exchange,
          currency: assetInfo.currency,
          last: Number(price.toFixed(2)),
          changeAbs: Number(change.toFixed(2)),
          changePct: Number(changePct.toFixed(2)),
          dayHigh: Number((rawData.h || price).toFixed(2)),
          dayLow: Number((rawData.l || price).toFixed(2)),
          volume: Math.floor((Math.random() * 50000000) + 1000000), // Mock volume
          marketCap: Math.floor((Math.random() * 1000000000000) + 100000000000), // Mock market cap
          session: 'REG',
          sparkline: generateSparkline(price),
          ohlc: {
            open: Number((rawData.o || price).toFixed(2)),
            high: Number((rawData.h || price).toFixed(2)),
            low: Number((rawData.l || price).toFixed(2)),
            close: Number(price.toFixed(2))
          },
          timezone: 'America/New_York',
          ts: Date.now()
        };
      } else {
        // CoinGecko data
        const price = rawData.usd || 0;
        const changePct = rawData.usd_24h_change || 0;
        const change = (price * changePct) / 100;
        
        marketData = {
          id,
          name: assetInfo.name,
          assetClass: assetInfo.assetClass,
          exchange: assetInfo.exchange,
          currency: assetInfo.currency,
          last: Number(price.toFixed(4)),
          changeAbs: Number(change.toFixed(4)),
          changePct: Number(changePct.toFixed(2)),
          dayHigh: Number((price * 1.05).toFixed(4)), // Mock 5% range
          dayLow: Number((price * 0.95).toFixed(4)),
          volume: rawData.usd_24h_vol || Math.floor((Math.random() * 1000000000) + 100000000),
          marketCap: rawData.usd_market_cap,
          session: '24H',
          sparkline: generateSparkline(price),
          ohlc: {
            open: Number((price * 0.99).toFixed(4)),
            high: Number((price * 1.05).toFixed(4)),
            low: Number((price * 0.95).toFixed(4)),
            close: Number(price.toFixed(4))
          },
          timezone: 'UTC',
          ts: Date.now()
        };
      }
      
      cache.set(cacheKey, { data: marketData, timestamp: Date.now() });
      results.push(marketData);
      
    } catch (error) {
      console.error(`Error processing ${id}:`, error);
    }
  }
  
  return results;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const idsParam = url.searchParams.get('ids');
    
    if (!idsParam) {
      return new Response(
        JSON.stringify({ error: 'Missing ids parameter' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const ids = idsParam.split(',').map(id => id.trim()).filter(Boolean);
    
    if (ids.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid ids provided' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const marketData = await fetchMarketData(ids);
    
    return new Response(
      JSON.stringify({ success: true, data: marketData }),
      { headers: corsHeaders }
    );
    
  } catch (error) {
    console.error('Market snapshot error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});