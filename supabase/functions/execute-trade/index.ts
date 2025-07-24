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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization')!,
          },
        },
      }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('Unauthorized');
    }

    const { asset_symbol, asset_type, trade_type, quantity, price } = await req.json();
    
    console.log('Executing trade:', { asset_symbol, asset_type, trade_type, quantity, price, user_id: user.id });

    // For MVP, we'll simulate trade execution and update portfolio
    const trade_id = crypto.randomUUID();
    
    // Insert trade record
    const { error: tradeError } = await supabaseClient
      .from('trades')
      .insert({
        user_id: user.id,
        asset_symbol,
        asset_type,
        trade_type,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        executed_at: new Date().toISOString()
      });

    if (tradeError) {
      throw new Error(`Failed to record trade: ${tradeError.message}`);
    }

    // Update or create portfolio position
    const { data: existingPosition } = await supabaseClient
      .from('portfolios')
      .select('*')
      .eq('user_id', user.id)
      .eq('asset_symbol', asset_symbol)
      .single();

    if (existingPosition) {
      // Update existing position
      const currentQuantity = parseFloat(existingPosition.quantity);
      const currentAvgPrice = parseFloat(existingPosition.avg_price);
      const tradeQuantity = parseFloat(quantity);
      const tradePrice = parseFloat(price);

      let newQuantity, newAvgPrice;

      if (trade_type === 'buy') {
        newQuantity = currentQuantity + tradeQuantity;
        newAvgPrice = ((currentQuantity * currentAvgPrice) + (tradeQuantity * tradePrice)) / newQuantity;
      } else {
        newQuantity = currentQuantity - tradeQuantity;
        newAvgPrice = currentAvgPrice; // Keep same average price for sells
      }

      if (newQuantity <= 0) {
        // Remove position if quantity is 0 or negative
        const { error: deleteError } = await supabaseClient
          .from('portfolios')
          .delete()
          .eq('user_id', user.id)
          .eq('asset_symbol', asset_symbol);

        if (deleteError) {
          throw new Error(`Failed to remove position: ${deleteError.message}`);
        }
      } else {
        // Update position
        const { error: updateError } = await supabaseClient
          .from('portfolios')
          .update({
            quantity: newQuantity,
            avg_price: newAvgPrice
          })
          .eq('user_id', user.id)
          .eq('asset_symbol', asset_symbol);

        if (updateError) {
          throw new Error(`Failed to update position: ${updateError.message}`);
        }
      }
    } else if (trade_type === 'buy') {
      // Create new position for buy orders
      const { error: insertError } = await supabaseClient
        .from('portfolios')
        .insert({
          user_id: user.id,
          asset_symbol,
          asset_type,
          quantity: parseFloat(quantity),
          avg_price: parseFloat(price)
        });

      if (insertError) {
        throw new Error(`Failed to create position: ${insertError.message}`);
      }
    }

    console.log('Trade executed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        trade_id,
        message: `${trade_type.toUpperCase()} order executed: ${quantity} ${asset_symbol} at $${price}`
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Trade execution error:', error);
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