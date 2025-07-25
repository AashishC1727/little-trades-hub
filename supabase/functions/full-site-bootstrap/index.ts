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
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const db = createClient(supabaseUrl, supabaseServiceKey)

    // Parse incoming request
    const { symbol, email, password, action } = await req.json();
    console.log('Full-site-bootstrap request:', { symbol, email: email ? '***' : undefined, action });
    
    // Fetch asset price from multiple APIs with fallback
    async function fetchAsset(symbol: string) {
      console.log(`Fetching asset data for: ${symbol}`);
      
      try {
        // Check cache first
        const cached = await db.from('market_data_cache').select('*').eq('symbol', symbol).single();
        if (cached.data && Date.now() - new Date(cached.data.fetched_at).getTime() < 300000) {
          console.log(`Using cached data for ${symbol}`);
          return { ...cached.data.data, cached: true };
        }
      } catch (error) {
        console.log(`Cache miss for ${symbol}:`, error);
      }

      // Try CoinGecko API
      try {
        console.log(`Trying CoinGecko for ${symbol}`);
        const coingecko = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd&include_24hr_change=true`);
        if (coingecko.ok) {
          const json = await coingecko.json();
          const price = json[symbol.toLowerCase()]?.usd;
          const change24h = json[symbol.toLowerCase()]?.usd_24h_change;
          
          if (price) {
            const assetData = { 
              symbol, 
              price, 
              change24h: change24h || 0, 
              lastUpdated: Date.now(),
              type: 'crypto'
            };
            
            await db.from('market_data_cache').upsert({ 
              symbol, 
              data: assetData, 
              fetched_at: new Date().toISOString() 
            });
            
            console.log(`CoinGecko success for ${symbol}`);
            return assetData;
          }
        }
      } catch (error) {
        console.log(`CoinGecko failed for ${symbol}:`, error);
      }

      // Try Finnhub API
      try {
        console.log(`Trying Finnhub for ${symbol}`);
        const finnhubKey = Deno.env.get('FINNHUB_API_KEY');
        if (!finnhubKey) {
          throw new Error('Finnhub API key not configured');
        }

        const finnhub = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubKey}`);
        if (finnhub.ok) {
          const quote = await finnhub.json();
          if (quote.c) {
            const assetData = {
              symbol,
              price: quote.c,
              change24h: quote.dp || 0,
              high: quote.h,
              low: quote.l,
              open: quote.o,
              previousClose: quote.pc,
              lastUpdated: Date.now(),
              type: 'stock'
            };

            await db.from('market_data_cache').upsert({ 
              symbol, 
              data: assetData, 
              fetched_at: new Date().toISOString() 
            });
            
            console.log(`Finnhub success for ${symbol}`);
            return assetData;
          }
        }
      } catch (error) {
        console.log(`Finnhub failed for ${symbol}:`, error);
      }

      return { error: 'Asset not found or API limits hit' };
    }

    // Handle user signup/login/forgot password
    async function handleAuth() {
      console.log(`Handling auth action: ${action}`);
      
      if (action === 'signup') {
        const result = await db.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${req.headers.get('origin') || 'http://localhost:3000'}/`
          }
        });
        return result;
      }
      
      if (action === 'login') {
        const result = await db.auth.signInWithPassword({ email, password });
        return result;
      }
      
      if (action === 'forgot') {
        const result = await db.auth.resetPasswordForEmail(email, {
          redirectTo: `${req.headers.get('origin') || 'http://localhost:3000'}/auth`
        });
        return result;
      }
      
      return { error: 'Invalid action' };
    }

    // Handle trade mock
    async function executeMockTrade() {
      console.log(`Executing mock trade for ${symbol}`);
      return { 
        status: 'Trade simulated', 
        symbol, 
        quantity: 1,
        timestamp: new Date().toISOString()
      };
    }

    // Handle news feed
    async function fetchNews() {
      console.log('Fetching news feed');
      try {
        const res = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        if (!res.ok) {
          console.log('News API request failed:', res.status);
          return [];
        }
        
        const { Data } = await res.json();
        const news = Data.slice(0, 5).map((n: any) => ({ 
          title: n.title, 
          img: n.imageurl, 
          body: n.body,
          url: n.url,
          published: n.published_on
        }));
        
        console.log(`Fetched ${news.length} news articles`);
        return news;
      } catch (error) {
        console.log('News fetch error:', error);
        return [];
      }
    }

    // Decide response based on request
    let result;
    
    if (symbol) {
      result = await fetchAsset(symbol);
    } else if (action) {
      result = await handleAuth();
    } else if (req.url.includes('trade')) {
      result = await executeMockTrade();
    } else if (req.url.includes('news')) {
      result = await fetchNews();
    } else {
      result = { status: 'Website core logic is online.' };
    }

    console.log('Bootstrap response:', result);

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Bootstrap function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
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