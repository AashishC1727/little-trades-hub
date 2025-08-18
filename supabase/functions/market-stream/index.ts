import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// CORS headers for Server-Sent Events (SSE)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control, accept',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};
// --- Asset Definitions ---
const ASSETS = {
  'AAPL': {
    name: 'Apple Inc.',
    assetClass: 'Equity',
    exchange: 'NASDAQ',
    currency: 'USD'
  },
  'MSFT': {
    name: 'Microsoft Corp',
    assetClass: 'Equity',
    exchange: 'NASDAQ',
    currency: 'USD'
  },
  'GOOGL': {
    name: 'Alphabet Inc.',
    assetClass: 'Equity',
    exchange: 'NASDAQ',
    currency: 'USD'
  },
  'AMZN': {
    name: 'Amazon.com Inc',
    assetClass: 'Equity',
    exchange: 'NASDAQ',
    currency: 'USD'
  },
  'TSLA': {
    name: 'Tesla, Inc.',
    assetClass: 'Equity',
    exchange: 'NASDAQ',
    currency: 'USD'
  },
  'SPY': {
    name: 'S&P 500',
    assetClass: 'Index',
    exchange: 'NYSE',
    currency: 'USD'
  },
  'QQQ': {
    name: 'NASDAQ 100',
    assetClass: 'Index',
    exchange: 'NASDAQ',
    currency: 'USD'
  },
  'REIT': {
    name: 'REIT Index',
    assetClass: 'RealEstate',
    exchange: 'NYSE',
    currency: 'USD'
  },
  'BTC': {
    name: 'Bitcoin',
    assetClass: 'Crypto',
    exchange: 'Global',
    currency: 'USD'
  },
  'ETH': {
    name: 'Ethereum',
    assetClass: 'Crypto',
    exchange: 'Global',
    currency: 'USD'
  },
  'GLD': {
    name: 'Gold',
    assetClass: 'Commodity',
    exchange: 'NYSE',
    currency: 'USD'
  },
  'SLV': {
    name: 'Silver',
    assetClass: 'Commodity',
    exchange: 'NYSE',
    currency: 'USD'
  },
  'EURUSD': {
    name: 'EUR/USD',
    assetClass: 'FX',
    exchange: 'Global',
    currency: 'USD'
  },
  'GBPUSD': {
    name: 'GBP/USD',
    assetClass: 'FX',
    exchange: 'Global',
    currency: 'USD'
  }
};
/**
 * Generates a simulated market data tick with realistic random price movement.
 */ function generateRealtimeTick(id, basePrice) {
  const assetInfo = ASSETS[id];
  if (!assetInfo) return null;
  // Simulate a small, random price movement
  const volatility = assetInfo.assetClass === 'Crypto' ? 0.015 : 0.003;
  const changeFactor = (Math.random() - 0.5) * volatility;
  const newPrice = basePrice * (1 + changeFactor);
  const changeAbs = newPrice - basePrice;
  const changePct = changeAbs / basePrice * 100;
  return {
    id,
    name: assetInfo.name,
    assetClass: assetInfo.assetClass,
    exchange: assetInfo.exchange,
    currency: assetInfo.currency,
    last: Number(newPrice.toFixed(assetInfo.assetClass === 'Crypto' ? 4 : 2)),
    changeAbs: Number(changeAbs.toFixed(4)),
    changePct: Number(changePct.toFixed(2)),
    dayHigh: Number((basePrice * 1.02).toFixed(2)),
    dayLow: Number((basePrice * 0.98).toFixed(2)),
    volume: Math.floor(Math.random() * 50000000 + 1000000),
    marketCap: assetInfo.assetClass === 'Crypto' ? Math.floor(Math.random() * 1e12 + 1e11) : undefined,
    session: assetInfo.assetClass === 'Crypto' ? '24H' : 'REG',
    sparkline: Array.from({
      length: 24
    }, ()=>Number((newPrice * (0.98 + Math.random() * 0.04)).toFixed(4))),
    ohlc: {
      open: Number((basePrice * 0.99).toFixed(2)),
      high: Number((basePrice * 1.02).toFixed(2)),
      low: Number((basePrice * 0.98).toFixed(2)),
      close: Number(newPrice.toFixed(2))
    },
    timezone: assetInfo.assetClass === 'Crypto' ? 'UTC' : 'America/New_York',
    ts: Date.now()
  };
}
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  // Only allow GET requests for SSE
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
  try {
    const url = new URL(req.url);
    const idsParam = url.searchParams.get('ids');
    if (!idsParam) {
      return new Response(JSON.stringify({
        error: 'Missing "ids" query parameter'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    const ids = idsParam.split(',').map((id)=>id.trim()).filter(Boolean);
    if (ids.length === 0) {
      return new Response(JSON.stringify({
        error: 'No valid "ids" provided'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Validate that all requested IDs exist in our ASSETS
    const invalidIds = ids.filter((id)=>!ASSETS[id]);
    if (invalidIds.length > 0) {
      return new Response(JSON.stringify({
        error: `Invalid asset IDs: ${invalidIds.join(', ')}`
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    console.log(`Starting market stream for assets: ${ids.join(', ')}`);
    // Set up the Server-Sent Events stream
    const stream = new ReadableStream({
      start (controller) {
        const currentPrices = new Map();
        // Initialize base prices for all requested assets
        ids.forEach((id)=>{
          const basePrice = Math.random() * 1000 + 50;
          currentPrices.set(id, basePrice);
        });
        // Send initial tick for all assets
        ids.forEach((id)=>{
          const price = currentPrices.get(id);
          const tickData = generateRealtimeTick(id, price);
          if (tickData) {
            const eventData = `event: tick\ndata: ${JSON.stringify(tickData)}\n\n`;
            controller.enqueue(new TextEncoder().encode(eventData));
          }
        });
        const sendTick = ()=>{
          try {
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
        // Send random tick updates
        const tickInterval = setInterval(sendTick, Math.random() * 1500 + 500);
        // Send heartbeat every 25 seconds
        const keepAliveInterval = setInterval(()=>{
          try {
            const heartbeat = `event: heartbeat\ndata: ${JSON.stringify({
              ts: Date.now()
            })}\n\n`;
            controller.enqueue(new TextEncoder().encode(heartbeat));
          } catch (error) {
            console.error('Error sending heartbeat:', error);
          }
        }, 25000);
        // Cleanup on disconnect
        req.signal.addEventListener('abort', ()=>{
          console.log('Client disconnected, cleaning up intervals');
          clearInterval(tickInterval);
          clearInterval(keepAliveInterval);
          try {
            controller.close();
          } catch (error) {
            // Controller might already be closed
            console.log('Controller already closed');
          }
        });
      }
    });
    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no' // Disable nginx buffering
      }
    });
  } catch (error) {
    console.error('Market stream function error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
