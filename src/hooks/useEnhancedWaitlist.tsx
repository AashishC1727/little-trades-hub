import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useEnhancedWaitlist = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const joinWaitlist = async (data: {
    email: string;
    interest?: string;
    referral_code?: string;
  }) => {
    setLoading(true);
    setSuccess(false);

    try {
      const { data: response, error } = await supabase.functions.invoke('enhanced-waitlist', {
        body: data
      });

      if (error) throw error;
      if (!response.success) throw new Error(response.error);

      setSuccess(true);
      toast({
        title: "Welcome to the Waitlist!",
        description: response.message,
      });

      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Waitlist error:', error);
      
      let errorMessage = error.message || 'Failed to join waitlist';
      if (error.message?.includes('already registered')) {
        errorMessage = 'This email is already on our waitlist!';
      }
      
      toast({
        title: "Couldn't Join Waitlist",
        description: errorMessage,
        variant: "destructive"
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getWaitlistStats = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('enhanced-waitlist', {
        method: 'GET'
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching waitlist stats:', error);
      return null;
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setLoading(false);
  };

  return {
    loading,
    success,
    joinWaitlist,
    getWaitlistStats,
    resetForm
  };
};