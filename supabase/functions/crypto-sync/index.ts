import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const CRYPTO_SYMBOLS = [
  'bitcoin', 'ethereum', 'solana', 'cardano', 'dogecoin', 'polygon', 'chainlink', 'avalanche-2'
]

const COINCAP_MAP: Record<string, string> = {
  'bitcoin': 'bitcoin',
  'ethereum': 'ethereum',
  'solana': 'solana',
  'cardano': 'cardano',
  'dogecoin': 'dogecoin',
  'polygon': 'polygon-matic-network',
  'chainlink': 'chainlink',
  'avalanche-2': 'avalanche'
}

async function fetchFromCoinGecko() {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_SYMBOLS.join(',')}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true&include_last_updated_at=true`
    )
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data = await response.json()
    const results = []
    
    for (const [symbol, info] of Object.entries(data)) {
      if (info && typeof info === 'object' && 'usd' in info) {
        const cryptoData = {
          symbol,
          name: symbol.charAt(0).toUpperCase() + symbol.slice(1),
          price: info.usd,
          change_24h: info.usd_24h_change || 0,
          volume_24h: info.usd_24h_vol || null,
          market_cap: info.usd_market_cap || null,
          last_updated: new Date(info.last_updated_at * 1000).toISOString(),
          source: 'coingecko',
          source_priority: 1
        }
        
        const { error } = await supabase
          .from('crypto_live_data')
          .upsert(cryptoData, { onConflict: 'symbol,source' })
        
        if (error) {
          console.error(`Error saving ${symbol} from CoinGecko:`, error)
        } else {
          results.push(symbol)
        }
      }
    }
    
    return { success: true, results, source: 'coingecko' }
    
  } catch (error) {
    console.error('CoinGecko fetch error:', error)
    return { success: false, error: error.message }
  }
}

async function fetchFromCoinCap() {
  try {
    const results = []
    
    for (const symbol of CRYPTO_SYMBOLS) {
      const coincapId = COINCAP_MAP[symbol]
      if (!coincapId) continue
      
      const response = await fetch(`https://api.coincap.io/v2/assets/${coincapId}`)
      
      if (!response.ok) {
        console.error(`CoinCap API error for ${symbol}:`, response.status)
        continue
      }
      
      const { data } = await response.json()
      
      const cryptoData = {
        symbol,
        name: data.name,
        price: parseFloat(data.priceUsd),
        change_24h: parseFloat(data.changePercent24Hr) || 0,
        volume_24h: parseFloat(data.volumeUsd24Hr) || null,
        market_cap: parseFloat(data.marketCapUsd) || null,
        last_updated: new Date().toISOString(),
        source: 'coincap',
        source_priority: 2
      }
      
      const { error } = await supabase
        .from('crypto_live_data')
        .upsert(cryptoData, { onConflict: 'symbol,source' })
      
      if (error) {
        console.error(`Error saving ${symbol} from CoinCap:`, error)
      } else {
        results.push(symbol)
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return { success: true, results, source: 'coincap' }
    
  } catch (error) {
    console.error('CoinCap fetch error:', error)
    return { success: false, error: error.message }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting crypto sync...')
    
    // Try CoinGecko first
    const coinGeckoResult = await fetchFromCoinGecko()
    
    if (coinGeckoResult.success) {
      console.log(`CoinGecko sync completed. Updated ${coinGeckoResult.results.length} symbols`)
      
      return new Response(
        JSON.stringify({
          success: true,
          primary_source: 'coingecko',
          updated_symbols: coinGeckoResult.results,
          count: coinGeckoResult.results.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Fallback to CoinCap
    console.log('CoinGecko failed, trying CoinCap...')
    const coinCapResult = await fetchFromCoinCap()
    
    if (coinCapResult.success) {
      console.log(`CoinCap fallback sync completed. Updated ${coinCapResult.results.length} symbols`)
      
      return new Response(
        JSON.stringify({
          success: true,
          primary_source: 'coincap',
          fallback_used: true,
          updated_symbols: coinCapResult.results,
          count: coinCapResult.results.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    throw new Error('Both CoinGecko and CoinCap failed')
    
  } catch (error) {
    console.error('Crypto sync error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})