import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const stockdataApiKey = Deno.env.get('STOCKDATA_API_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface StockDataResponse {
  data: Array<{
    ticker: string
    name: string
    price: number
    day_change: number
    day_change_percent: number
    last_update_utc: string
  }>
}

const SYMBOLS = [
  'AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX',
  'SPY', 'QQQ', 'VTI', 'EURUSD', 'GBPUSD', 'USDJPY'
]

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting StockData.org sync...')
    
    const results = []
    
    // Fetch data in batches to respect rate limits
    for (let i = 0; i < SYMBOLS.length; i += 5) {
      const batch = SYMBOLS.slice(i, i + 5)
      const symbolsParam = batch.join(',')
      
      try {
        const response = await fetch(
          `https://api.stockdata.org/v1/data/quote?symbols=${symbolsParam}&api_token=${stockdataApiKey}`
        )
        
        if (!response.ok) {
          console.error(`StockData API error for batch ${symbolsParam}:`, response.status)
          continue
        }
        
        const data: StockDataResponse = await response.json()
        
        for (const item of data.data) {
          const marketData = {
            symbol: item.ticker,
            name: item.name,
            price: item.price,
            change_24h: item.day_change_percent,
            change_absolute: item.day_change,
            volume: null,
            market_cap: null,
            last_updated: new Date(item.last_update_utc).toISOString(),
            source: 'stockdata.org',
            asset_type: batch.includes('EURUSD') || batch.includes('GBPUSD') || batch.includes('USDJPY') ? 'forex' : 'stock'
          }
          
          const { error } = await supabase
            .from('market_data_live')
            .upsert(marketData, { onConflict: 'symbol,source' })
          
          if (error) {
            console.error(`Error saving ${item.ticker}:`, error)
          } else {
            results.push(item.ticker)
          }
        }
        
        // Rate limiting - wait 200ms between batches
        await new Promise(resolve => setTimeout(resolve, 200))
        
      } catch (error) {
        console.error(`Error processing batch ${symbolsParam}:`, error)
      }
    }
    
    console.log(`StockData sync completed. Updated ${results.length} symbols:`, results)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        updated_symbols: results,
        count: results.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
    
  } catch (error) {
    console.error('StockData sync error:', error)
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