import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive'
};

// Asset definitions (same as snapshot endpoint)
const ASSETS = {
  'AAPL': { name: 'Apple Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD' },
  'MSFT': { name: 'Microsoft Corp', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD' },
  'GOOGL': { name: 'Alphabet Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD' },
  'AMZN': { name: 'Amazon.com Inc', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD' },
  'TSLA': { name: 'Tesla, Inc.', assetClass: 'Equity', exchange: 'NASDAQ', currency: 'USD' },
  'SPY': { name: 'S&P 500', assetClass: 'Index', exchange: 'NYSE', currency: 'USD' },
  'QQQ': { name: 'NASDAQ 100', assetClass: 'Index', exchange: 'NASDAQ', currency: 'USD' },
  'REIT': { name: 'REIT Index', assetClass: 'RealEstate', exchange: 'NYSE', currency: 'USD' },
  'BTC': { name: 'Bitcoin', assetClass: 'Crypto', exchange: 'Global', currency: 'USD' },
  'ETH': { name: 'Ethereum', assetClass: 'Crypto', exchange: 'Global', currency: 'USD' },
  'GLD': { name: 'Gold', assetClass: 'Commodity', exchange: 'NYSE', currency: 'USD' },
  'SLV': { name: 'Silver', assetClass: 'Commodity', exchange: 'NYSE', currency: 'USD' },
  'EURUSD': { name: 'EUR/USD', assetClass: 'FX', exchange: 'Global', currency: 'USD' },
  'GBPUSD': { name: 'GBP/USD', assetClass: 'FX', exchange: 'Global', currency: 'USD' }
};

function generateRealtimeTick(id: string, basePrice?: number) {
  const assetInfo = ASSETS[id];
  if (!assetInfo) return null;
  
  // Use previous price or generate a base price
  const price = basePrice || (Math.random() * 1000 + 50);
  
  // Small random price movement (-0.5% to +0.5%)
  const volatility = assetInfo.assetClass === 'Crypto' ? 0.02 : 0.005;
  const change = (Math.random() - 0.5) * volatility;
  const newPrice = price * (1 + change);
  
  const changeAbs = newPrice - price;
  const changePct = (changeAbs / price) * 100;
  
  return {
    id,
    name: assetInfo.name,
    assetClass: assetInfo.assetClass,
    exchange: assetInfo.exchange,
    currency: assetInfo.currency,
    last: Number(newPrice.toFixed(assetInfo.assetClass === 'Crypto' ? 4 : 2)),
    changeAbs: Number(changeAbs.toFixed(4)),
    changePct: Number(changePct.toFixed(2)),
    dayHigh: Number((newPrice * 1.05).toFixed(2)),
    dayLow: Number((newPrice * 0.95).toFixed(2)),
    volume: Math.floor((Math.random() * 50000000) + 1000000),
    marketCap: assetInfo.assetClass === 'Crypto' ? Math.floor((Math.random() * 1000000000000) + 100000000000) : undefined,
    session: assetInfo.assetClass === 'Crypto' ? '24H' : 'REG',
    sparkline: Array.from({ length: 24 }, () => Number((newPrice * (0.98 + Math.random() * 0.04)).toFixed(4))),
    ohlc: {
      open: Number((newPrice * 0.99).toFixed(2)),
      high: Number((newPrice * 1.02).toFixed(2)),
      low: Number((newPrice * 0.98).toFixed(2)),
      close: Number(newPrice.toFixed(2))
    },
    timezone: assetInfo.assetClass === 'Crypto' ? 'UTC' : 'America/New_York',
    ts: Date.now()
  };
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
        'Missing ids parameter',
        { status: 400, headers: corsHeaders }
      );
    }
    
    const ids = idsParam.split(',').map(id => id.trim()).filter(Boolean);
    
    if (ids.length === 0) {
      return new Response(
        'No valid ids provided',
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Set up Server-Sent Events
    const headers = {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    };
    
    const stream = new ReadableStream({
      start(controller) {
        // Keep track of current prices for realistic movements
        const currentPrices = new Map();
        
        // Initialize prices
        ids.forEach(id => {
          const basePrice = Math.random() * 1000 + 50;
          currentPrices.set(id, basePrice);
        });
        
        const sendTick = () => {
          try {
            // Send a random tick for one of the assets
            const randomId = ids[Math.floor(Math.random() * ids.length)];
            const currentPrice = currentPrices.get(randomId);
            const tickData = generateRealtimeTick(randomId, currentPrice);
            
            if (tickData) {
              currentPrices.set(randomId, tickData.last);
              
              const eventData = `event: tick\ndata: ${JSON.stringify(tickData)}\n\n`;
              controller.enqueue(new TextEncoder().encode(eventData));
            }
          } catch (error) {
            console.error('Error sending tick:', error);
          }
        };
        
        // Send initial data for all assets
        ids.forEach(id => {
          const initialData = generateRealtimeTick(id, currentPrices.get(id));
          if (initialData) {
            currentPrices.set(id, initialData.last);
            const eventData = `event: tick\ndata: ${JSON.stringify(initialData)}\n\n`;
            controller.enqueue(new TextEncoder().encode(eventData));
          }
        });
        
        // Send periodic updates (every 1-3 seconds randomly)
        const interval = setInterval(() => {
          sendTick();
        }, Math.random() * 2000 + 1000);
        
        // Keep-alive ping every 30 seconds
        const keepAlive = setInterval(() => {
          const heartbeat = `event: heartbeat\ndata: ${JSON.stringify({ ts: Date.now() })}\n\n`;
          controller.enqueue(new TextEncoder().encode(heartbeat));
        }, 30000);
        
        // Clean up on client disconnect
        req.signal?.addEventListener('abort', () => {
          clearInterval(interval);
          clearInterval(keepAlive);
          controller.close();
        });
      }
    });
    
    return new Response(stream, { headers });
    
  } catch (error) {
    console.error('Market stream error:', error);
    return new Response(
      `event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`,
      { 
        status: 500, 
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream'
        }
      }
    );
  }
});
