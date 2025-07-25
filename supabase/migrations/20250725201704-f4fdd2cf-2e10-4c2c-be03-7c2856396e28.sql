-- Create market data cache table
CREATE TABLE public.market_data_cache (
  symbol TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.market_data_cache ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (market data is public)
CREATE POLICY "Market data cache is readable by everyone" 
ON public.market_data_cache 
FOR SELECT 
USING (true);

-- Create policies for system updates (only functions can update)
CREATE POLICY "System can update market data cache" 
ON public.market_data_cache 
FOR ALL
USING (true);

-- Create index for faster fetched_at queries
CREATE INDEX idx_market_data_cache_fetched_at ON public.market_data_cache(fetched_at);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_market_data_cache_updated_at
BEFORE UPDATE ON public.market_data_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();