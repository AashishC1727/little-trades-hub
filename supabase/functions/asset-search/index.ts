// Deno imports - these resolve at runtime in Deno environment
// @ts-ignore: Deno module resolution
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Type definitions for search results
interface CryptoResult {
  id: string;
  symbol: string;
  name: string;
  type: 'crypto';
  price: number;
  change24h: number;
  image: string;
  market_cap_rank: number;
}

interface StockResult {
  id: string;
  symbol: string;
  name: string;
  type: 'stock';
  price: number;
  change24h: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

type SearchResult = CryptoResult | StockResult;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();

    const { query, type } = requestBody;

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchTerm = query.trim().toLowerCase();
    const searchType = type?.toLowerCase();

    // Search in multiple sources
    const results: SearchResult[] = [];

    // Determine which sources to search based on type filter
    let shouldSearchCrypto = false;
    let shouldSearchStock = false;

    if (!searchType || searchType === '') {
      // No type filter, search both
      shouldSearchCrypto = true;
      shouldSearchStock = true;
    } else if (searchType === 'crypto') {
      // Only search crypto
      shouldSearchCrypto = true;
      shouldSearchStock = false;
    } else if (searchType === 'stock') {
      // Only search stocks
      shouldSearchCrypto = false;
      shouldSearchStock = true;
    } else {
      // Unknown type, search both as fallback
      shouldSearchCrypto = true;
      shouldSearchStock = true;
    }


    if (shouldSearchCrypto) {
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
      }
    }


    if (shouldSearchStock) {
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
              }
            }
          }
        }
      } catch (error) {
      }
    } else {
    }

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
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});