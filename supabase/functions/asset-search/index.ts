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

    const unsupportedTypes = ['commodity', 'forex', 'fx', 'nft', 'realestate', 'real-estate'];
    if (searchType && unsupportedTypes.includes(searchType)) {
      return new Response(
        JSON.stringify({
          success: true,
          data: [],
          message: `${searchType.charAt(0).toUpperCase() + searchType.slice(1)} search is not currently supported. Please try searching for crypto or stock assets instead.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: SearchResult[] = [];

    let shouldSearchCrypto = false;
    let shouldSearchStock = false;

    if (!searchType || searchType === '') {
      shouldSearchCrypto = true;
      shouldSearchStock = true;
      console.log('Searching both crypto and stock (no type filter)');
    } else if (searchType === 'crypto') {
      // Only search crypto
      shouldSearchCrypto = true;
      shouldSearchStock = false;
      console.log('Searching crypto only');
    } else if (searchType === 'stock') {
      // Only search stocks
      shouldSearchCrypto = false;
      shouldSearchStock = true;
      console.log('Searching stock only');
    } else {
      // Unknown type, search both as fallback
      shouldSearchCrypto = true;
      shouldSearchStock = true;
      console.log('Searching both crypto and stock (fallback for unknown type:', searchType, ')');
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
        console.error('Crypto API error:', error);
      }
    }


    if (shouldSearchStock) {
      try {
        console.log('Searching stocks for term:', searchTerm);
        const apiKey = Deno.env.get('FINNHUB_API_KEY');
        if (!apiKey) {
          console.error('FINNHUB_API_KEY not found in environment variables');
          // Continue without stock search
        } else {
          const stockSearchResponse = await fetch(
            `https://finnhub.io/api/v1/search?q=${encodeURIComponent(searchTerm)}&token=${apiKey}`
          );

          console.log('Stock search response status:', stockSearchResponse.status);

          if (stockSearchResponse.ok) {
            const stockSearchData = await stockSearchResponse.json();
            console.log('Stock search response:', stockSearchData);

            if (stockSearchData.result && stockSearchData.result.length > 0) {
              console.log('Found', stockSearchData.result.length, 'stock results');
              // Get price for top results
              for (const stock of stockSearchData.result.slice(0, 3)) {
                try {
                  console.log('Getting price for stock:', stock.symbol);
                  const priceResponse = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apiKey}`
                  );

                  if (priceResponse.ok) {
                    const priceData = await priceResponse.json();
                    console.log('Price data for', stock.symbol, ':', priceData);

                    if (priceData.c > 0) { // Valid price data
                      const change24h = ((priceData.c - priceData.pc) / priceData.pc) * 100;

                      const stockResult = {
                        id: stock.symbol,
                        symbol: stock.symbol,
                        name: stock.description || stock.displaySymbol,
                        type: 'stock' as const,
                        price: priceData.c,
                        change24h: change24h,
                        high: priceData.h,
                        low: priceData.l,
                        open: priceData.o,
                        previousClose: priceData.pc
                      };
                      console.log('Adding stock result:', stockResult);
                      results.push(stockResult);
                    }
                  } else {
                    console.log('Price API response not OK for', stock.symbol, ':', priceResponse.status);
                  }
                } catch (error) {
                  console.error('Stock price API error for', stock.symbol, ':', error);
                }
              }
            } else {
              console.log('No stock results found in response');
            }
          } else {
            console.log('Stock search API response not OK:', stockSearchResponse.status);
            const errorText = await stockSearchResponse.text();
            console.log('Error response:', errorText);
          }
        }
      } catch (error) {
        console.error('Stock search API error:', error);
      }
    } else {
      console.log('Skipping stock search, shouldSearchStock:', shouldSearchStock);
    }

    console.log('Final results count:', results.length);
    console.log('Final results:', results);

    if (results.length === 0) {
      const message = shouldSearchStock && shouldSearchCrypto
        ? 'No data found for your search query. This could be due to API limitations or the asset not being found. Please try a different search term.'
        : shouldSearchStock
          ? 'No stock data found for your search query. Please try a different stock symbol or company name.'
          : 'No cryptocurrency data found for your search query. Please try a different crypto name or symbol.';

      return new Response(
        JSON.stringify({
          success: true,
          data: [],
          message: message
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