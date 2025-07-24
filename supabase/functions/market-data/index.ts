import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    if (type === 'crypto') {
      // Fetch crypto data from CoinGecko (free API)
      const cryptoIds = symbols.join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`
      );
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const cryptoData = await response.json();
      console.log('CoinGecko response:', cryptoData);
      
      data = Object.entries(cryptoData).map(([id, info]: [string, any]) => ({
        symbol: id,
        price: info.usd,
        change24h: info.usd_24h_change || 0,
        lastUpdated: info.last_updated_at,
        type: 'crypto'
      }));
    } else {
      // Fetch stocks/forex data from Finnhub
      const finnhubKey = Deno.env.get('FINNHUB_API_KEY');
      if (!finnhubKey) {
        throw new Error('Finnhub API key not configured');
      }

      const promises = symbols.map(async (symbol: string) => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubKey}`
        );
        
        if (!response.ok) {
          throw new Error(`Finnhub API error for ${symbol}: ${response.status}`);
        }
        
        const quote = await response.json();
        console.log(`Finnhub response for ${symbol}:`, quote);
        
        return {
          symbol,
          price: quote.c, // current price
          change24h: quote.dp || 0, // percent change
          high: quote.h,
          low: quote.l,
          open: quote.o,
          previousClose: quote.pc,
          lastUpdated: Date.now(),
          type: type || 'stock'
        };
      });

      data = await Promise.all(promises);
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