import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { query } = await req.json();
    
    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchTerm = query.trim().toLowerCase();
    console.log('Searching for:', searchTerm);

    // Search in multiple sources
    const results = [];

    // 1. Search CoinGecko for crypto
    try {
      const cryptoResponse = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(searchTerm)}`
      );
      
      if (cryptoResponse.ok) {
        const cryptoData = await cryptoResponse.json();
        
        // Add crypto results
        if (cryptoData.coins && cryptoData.coins.length > 0) {
          for (const coin of cryptoData.coins.slice(0, 3)) {
            // Get current price
            const priceResponse = await fetch(
              `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&include_24hr_change=true`
            );
            
            if (priceResponse.ok) {
              const priceData = await priceResponse.json();
              const coinPrice = priceData[coin.id];
              
              if (coinPrice) {
                results.push({
                  id: coin.id,
                  symbol: coin.symbol.toUpperCase(),
                  name: coin.name,
                  type: 'crypto',
                  price: coinPrice.usd,
                  change24h: coinPrice.usd_24h_change || 0,
                  image: coin.large,
                  market_cap_rank: coin.market_cap_rank
                });
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error searching crypto:', error);
    }

    // 2. Search Finnhub for stocks
    try {
      const stockSearchResponse = await fetch(
        `https://finnhub.io/api/v1/search?q=${encodeURIComponent(searchTerm)}&token=${Deno.env.get('FINNHUB_API_KEY')}`
      );
      
      if (stockSearchResponse.ok) {
        const stockSearchData = await stockSearchResponse.json();
        
        if (stockSearchData.result && stockSearchData.result.length > 0) {
          // Get price for top results
          for (const stock of stockSearchData.result.slice(0, 3)) {
            try {
              const priceResponse = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${Deno.env.get('FINNHUB_API_KEY')}`
              );
              
              if (priceResponse.ok) {
                const priceData = await priceResponse.json();
                
                if (priceData.c > 0) { // Valid price data
                  const change24h = ((priceData.c - priceData.pc) / priceData.pc) * 100;
                  
                  results.push({
                    id: stock.symbol,
                    symbol: stock.symbol,
                    name: stock.description || stock.displaySymbol,
                    type: 'stock',
                    price: priceData.c,
                    change24h: change24h,
                    high: priceData.h,
                    low: priceData.l,
                    open: priceData.o,
                    previousClose: priceData.pc
                  });
                }
              }
            } catch (error) {
              console.error(`Error fetching price for ${stock.symbol}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error searching stocks:', error);
    }

    console.log('Search results:', results);

    if (results.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: [], 
          message: 'No data found for your search query. Please try a different term.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in asset search:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});