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

  try {
    if (req.method === 'POST') {
      const body = await req.json()
      const { email, interest, referral_code } = body
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email || !emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Valid email address is required' 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      // Get client IP for analytics
      const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      
      // Check if email already exists
      const { data: existing } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', email.toLowerCase())
        .single()
      
      if (existing) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Email already registered on waitlist' 
          }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      // Insert new waitlist entry
      const { data, error } = await supabase
        .from('waitlist')
        .insert({
          email: email.toLowerCase(),
          interest: interest || null,
          referral_code: referral_code || null,
          ip_address: clientIP
        })
        .select()
        .single()
      
      if (error) {
        console.error('Waitlist insertion error:', error)
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Failed to join waitlist' 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      // Log successful registration
      console.log(`New waitlist registration: ${email}, interest: ${interest || 'none'}, referral: ${referral_code || 'none'}`)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Successfully joined the waitlist!',
          data: {
            id: data.id,
            email: data.email,
            joined_at: data.created_at
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // GET request to check waitlist stats (optional)
    if (req.method === 'GET') {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          total_members: count 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Enhanced waitlist error:', error)
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