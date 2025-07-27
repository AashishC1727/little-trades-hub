import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface P2PListing {
  id: string;
  user_id: string;
  offered_asset: string;
  wanted_asset: string;
  category: string;
  description?: string;
  asset_image_url?: string;
  location?: string;
  offered_value?: number;
  wanted_value?: number;
  status: string;
  expiry: string;
  view_count: number;
  created_at: string;
  profiles?: {
    display_name: string;
    avatar_url: string;
  };
}

export const useP2PListings = () => {
  const [listings, setListings] = useState<P2PListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchListings = async (filters?: {
    category?: string;
    sort?: string;
    location?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.sort) params.append('sort', filters.sort);
      if (filters?.location) params.append('location', filters.location);

      const { data, error } = await supabase.functions.invoke('p2p-listings', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      setListings(data.listings);
    } catch (err: any) {
      console.error('Error fetching P2P listings:', err);
      setError(err.message || 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (listingData: {
    offered_asset: string;
    wanted_asset: string;
    category: string;
    description?: string;
    asset_image_url?: string;
    location?: string;
    offered_value?: number;
    wanted_value?: number;
    expiry_days?: number;
  }) => {
    try {
      const { data, error } = await supabase.functions.invoke('p2p-listings/create', {
        body: listingData
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      toast({
        title: "Listing Created",
        description: "Your P2P listing has been created successfully!",
      });

      return { success: true, listing: data.listing };
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast({
        title: "Failed to Create Listing",
        description: error.message || 'Failed to create listing',
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const updateListing = async (id: string, updates: Partial<P2PListing>) => {
    try {
      const { data, error } = await supabase.functions.invoke(`p2p-listings/${id}`, {
        method: 'PATCH',
        body: updates
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      toast({
        title: "Listing Updated",
        description: "Your listing has been updated successfully!",
      });

      return { success: true, listing: data.listing };
    } catch (error: any) {
      console.error('Error updating listing:', error);
      toast({
        title: "Failed to Update Listing",
        description: error.message || 'Failed to update listing',
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const deleteListing = async (id: string) => {
    try {
      const { data, error } = await supabase.functions.invoke(`p2p-listings/${id}`, {
        method: 'DELETE'
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      toast({
        title: "Listing Deleted",
        description: "Your listing has been deleted successfully!",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Failed to Delete Listing",
        description: error.message || 'Failed to delete listing',
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const incrementViews = async (id: string) => {
    try {
      await supabase.functions.invoke(`p2p-listings/${id}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    error,
    fetchListings,
    createListing,
    updateListing,
    deleteListing,
    incrementViews,
    refetch: fetchListings
  };
};