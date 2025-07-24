import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useTrades = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const executeTrade = async (
    asset_symbol: string,
    asset_type: string,
    trade_type: 'buy' | 'sell',
    quantity: number,
    price: number
  ) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('execute-trade', {
        body: {
          asset_symbol,
          asset_type,
          trade_type,
          quantity: quantity.toString(),
          price: price.toString()
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      toast({
        title: "Trade Executed",
        description: data.message,
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Trade execution error:', error);
      toast({
        title: "Trade Failed",
        description: error.message || 'Failed to execute trade',
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { executeTrade, loading };
};