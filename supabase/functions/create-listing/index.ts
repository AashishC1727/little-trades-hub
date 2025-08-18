import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Method not allowed',
        message: 'Only POST requests are accepted'
      }), {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Parse multipart form data
    const formData = await req.formData();
    // Extract and validate image file
    const imageFile = formData.get('image');
    if (!imageFile) {
      return new Response(JSON.stringify({
        error: 'Missing image file',
        message: 'Image file is required'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];
    if (!allowedTypes.includes(imageFile.type)) {
      return new Response(JSON.stringify({
        error: 'Invalid file type',
        message: 'Only JPEG, PNG, and WebP images are allowed'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Validate file size (max 10MB)
    const maxSize = 1 * 1024 * 1024 // 10MB in bytes
    ;
    if (imageFile.size > maxSize) {
      return new Response(JSON.stringify({
        error: 'File too large',
        message: 'Image must be smaller than 10MB'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Extract and validate form fields
    const listingData = {
      user_id: formData.get('user_id'),
      offering_asset: formData.get('offering_asset'),
      wanted_asset: formData.get('wanted_asset'),
      category: formData.get('category') || null,
      description: formData.get('description') || null,
      location: formData.get('location') || null,
      offered_value: formData.get('offered_value') ? parseFloat(formData.get('offered_value')) : null,
      wanted_value: formData.get('wanted_value') ? parseFloat(formData.get('wanted_value')) : null
    };
    // Validate required fields
    if (!listingData.user_id || !listingData.offering_asset || !listingData.wanted_asset) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        message: 'user_id, offering_asset, and wanted_asset are required'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Validate UUID format for user_id
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(listingData.user_id)) {
      return new Response(JSON.stringify({
        error: 'Invalid user ID',
        message: 'user_id must be a valid UUID'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Verify user exists using the admin API (Correct Method)
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(listingData.user_id);
    if (userError || !user) {
      console.error('User verification error:', userError); // Optional: for better debugging
      return new Response(JSON.stringify({
        error: 'User not found',
        message: 'The specified user_id does not exist'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Generate UUID for filename
    const fileExtension = imageFile.name.split('.').pop() || 'jpg';
    const uuid = crypto.randomUUID();
    const fileName = `${uuid}.${fileExtension}`;
    // Convert File to ArrayBuffer for upload
    const fileBuffer = await imageFile.arrayBuffer();
    const fileUint8Array = new Uint8Array(fileBuffer);
    // Upload image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from('listing-images').upload(fileName, fileUint8Array, {
      contentType: imageFile.type,
      upsert: false
    });
    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(JSON.stringify({
        error: 'Image upload failed',
        message: uploadError.message
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Get public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage.from('listing-images').getPublicUrl(fileName);
    if (!publicUrlData.publicUrl) {
      return new Response(JSON.stringify({
        error: 'Failed to get public URL',
        message: 'Could not retrieve public URL for uploaded image'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Insert listing data into database
    const { data: insertData, error: insertError } = await supabase.from('listings').insert({
      user_id: listingData.user_id,
      offering_asset: listingData.offering_asset,
      wanted_asset: listingData.wanted_asset,
      category: listingData.category,
      description: listingData.description,
      location: listingData.location,
      offered_value: listingData.offered_value,
      wanted_value: listingData.wanted_value,
      image_url: publicUrlData.publicUrl
    }).select().single();
    if (insertError) {
      console.error('Database insert error:', insertError);
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('listing-images').remove([
        fileName
      ]).catch((cleanupError)=>console.error('Cleanup error:', cleanupError));
      return new Response(JSON.stringify({
        error: 'Database insert failed',
        message: insertError.message
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Listing created successfully',
      data: {
        id: insertData.id,
        image_url: publicUrlData.publicUrl,
        created_at: insertData.created_at
      },
      file_url: publicUrlData.publicUrl
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
