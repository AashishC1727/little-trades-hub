-- Enable Row Level Security on all tables
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for portfolios table
CREATE POLICY "Users can view their own portfolio" 
ON public.portfolios 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own portfolio" 
ON public.portfolios 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio" 
ON public.portfolios 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio" 
ON public.portfolios 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for trades table
CREATE POLICY "Users can view their trades" 
ON public.trades 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert trades" 
ON public.trades 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their trades" 
ON public.trades 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their trades" 
ON public.trades 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for watchlist table
CREATE POLICY "Users can view their watchlist" 
ON public.watchlist 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their watchlist" 
ON public.watchlist 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their watchlist" 
ON public.watchlist 
FOR DELETE 
USING (auth.uid() = user_id);

-- Make user_id columns NOT NULL for security
ALTER TABLE public.portfolios ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.trades ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.watchlist ALTER COLUMN user_id SET NOT NULL;