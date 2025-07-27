import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const path = url.pathname

  try {
    // GET /p2p-listings - Get all active listings with filters
    if (req.method === 'GET' && path === '/p2p-listings') {
      const category = url.searchParams.get('category')
      const sortBy = url.searchParams.get('sort') || 'newest'
      const location = url.searchParams.get('location')
      
      let query = supabase
        .from('p2p_listings')
        .select(`
          *,
          profiles!p2p_listings_user_id_fkey(display_name, avatar_url)
        `)
        .eq('status', 'active')
        .gt('expiry', new Date().toISOString())
      
      if (category && category !== 'all') {
        query = query.eq('category', category)
      }
      
      if (location) {
        query = query.ilike('location', `%${location}%`)
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'ending_soon':
          query = query.order('expiry', { ascending: true })
          break
        case 'high_value':
          query = query.order('offered_value', { ascending: false, nullsLast: true })
          break
        case 'most_viewed':
          query = query.order('view_count', { ascending: false })
          break
        default: // newest
          query = query.order('created_at', { ascending: false })
      }
      
      const { data, error } = await query.limit(50)
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ success: true, listings: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // POST /p2p-listings/create - Create new listing
    if (req.method === 'POST' && path === '/p2p-listings/create') {
      const authHeader = req.headers.get('authorization')
      if (!authHeader) {
        return new Response(
          JSON.stringify({ success: false, error: 'Authorization required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
      if (authError || !user) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid authorization' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const body = await req.json()
      const {
        offered_asset,
        wanted_asset,
        category,
        description,
        asset_image_url,
        location,
        offered_value,
        wanted_value,
        expiry_days = 7
      } = body
      
      if (!offered_asset || !wanted_asset || !category) {
        return new Response(
          JSON.stringify({ success: false, error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + expiry_days)
      
      const { data, error } = await supabase
        .from('p2p_listings')
        .insert({
          user_id: user.id,
          offered_asset,
          wanted_asset,
          category,
          description,
          asset_image_url,
          location,
          offered_value,
          wanted_value,
          expiry: expiryDate.toISOString(),
          status: 'active'
        })
        .select()
        .single()
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ success: true, listing: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // GET /p2p-listings/my - Get user's listings
    if (req.method === 'GET' && path === '/p2p-listings/my') {
      const authHeader = req.headers.get('authorization')
      if (!authHeader) {
        return new Response(
          JSON.stringify({ success: false, error: 'Authorization required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
      if (authError || !user) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid authorization' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data, error } = await supabase
        .from('p2p_listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ success: true, listings: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // PATCH /p2p-listings/{id} - Update listing
    if (req.method === 'PATCH' && path.startsWith('/p2p-listings/')) {
      const listingId = path.split('/').pop()
      const authHeader = req.headers.get('authorization')
      
      if (!authHeader) {
        return new Response(
          JSON.stringify({ success: false, error: 'Authorization required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
      if (authError || !user) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid authorization' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const body = await req.json()
      
      const { data, error } = await supabase
        .from('p2p_listings')
        .update(body)
        .eq('id', listingId)
        .eq('user_id', user.id)
        .select()
        .single()
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ success: true, listing: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // DELETE /p2p-listings/{id} - Delete listing
    if (req.method === 'DELETE' && path.startsWith('/p2p-listings/')) {
      const listingId = path.split('/').pop()
      const authHeader = req.headers.get('authorization')
      
      if (!authHeader) {
        return new Response(
          JSON.stringify({ success: false, error: 'Authorization required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
      if (authError || !user) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid authorization' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { error } = await supabase
        .from('p2p_listings')
        .delete()
        .eq('id', listingId)
        .eq('user_id', user.id)
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // POST /p2p-listings/{id}/view - Increment view count
    if (req.method === 'POST' && path.includes('/view')) {
      const listingId = path.split('/')[2]
      
      const { error } = await supabase.rpc('increment_listing_views', { listing_id: listingId })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify({ success: false, error: 'Route not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('P2P listings error:', error)
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