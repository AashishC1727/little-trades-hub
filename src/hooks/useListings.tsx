import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client'; // Make sure this path is correct

// Define a TypeScript interface for the structure of a single listing.
// This ensures that your data is consistent throughout the app.
export interface Listing {
  id: string;
  created_at: string;
  offering_asset: string;
  wanted_asset: string;
  image_url?: string;
  category: 'crypto' | 'stock' | 'collectible' | 'currency' | 'other';
  location?: string;
  description?: string;
  offered_value?: number;
  wanted_value?: number;
  // Add any other fields from your 'listings' table here
}

/**
 * Defines the shape of the object returned by the useListings hook.
 */
interface UseListingsReturn {
  listings: Listing[];
  loading: boolean;
  error: Error | null;
  refreshing: boolean;
  refetch: () => void;
}

/**
 * Custom hook for fetching and managing listings from Supabase in real-time.
 * @returns {UseListingsReturn} The state and functions for managing listings.
 */
export function useListings(): UseListingsReturn {
  // State to hold the listings data, typed as an array of Listing objects.
  const [listings, setListings] = useState<Listing[]>([]);
  // State to indicate initial data load.
  const [loading, setLoading] = useState<boolean>(true);
  // State to hold any potential errors during fetch, typed as the native Error object.
  const [error, setError] = useState<Error | null>(null);
  // State to indicate a refresh is in progress (for real-time updates).
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // useCallback ensures the function is not recreated on every render.
  const fetchListings = useCallback(async (isRefresh: boolean = false): Promise<void> => {
    try {
      // Set the appropriate loading state.
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      // Clear any previous errors.
      setError(null);
      
      // Fetch data from the 'listings' table in Supabase.
      // The data is cast to our Listing interface.
      const { data, error: fetchError } = await supabase
        .from("listings")
        .select("*")
        .order('created_at', { ascending: false });

      // If Supabase returns an error, throw it to be caught by the catch block.
      if (fetchError) {
        throw fetchError;
      }

      // If data is successfully fetched, update the state.
      if (data) {
        setListings(data as Listing[]);
      }

    } catch (err: any) {
      // Log the error and update the error state.
      console.error("Error fetching listings:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      // Reset loading states regardless of success or failure.
      setLoading(false);
      setRefreshing(false);
    }
  }, []); // Empty dependency array means this function is created only once.

  // useEffect to handle initial data fetch and real-time subscriptions.
  useEffect(() => {
    // Fetch the initial list of listings when the component mounts.
    fetchListings();

    // Set up a real-time subscription to the 'listings' table.
    const channel = supabase
      .channel('listings_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'listings' },
        (payload) => {
          console.log('Change received!', payload);
          // When a change is detected, refresh the listings.
          fetchListings(true);
        }
      )
      .subscribe();

    // Cleanup function: This runs when the component that uses the hook unmounts.
    return () => {
      // Unsubscribe from the channel to prevent memory leaks.
      supabase.removeChannel(channel);
    };
  }, [fetchListings]); // Depend on fetchListings.

  // Return the state and a function to manually trigger a refresh.
  return { listings, loading, error, refreshing, refetch: () => fetchListings(true) };
}
