import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftRight, Calendar, Eye, Filter, History, MapPin, Plus, Search, TrendingUp, List, Tag, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

import { supabase } from "@/integrations/supabase/client";

// --- Importing all the new feature components ---
import { TradeHealthMeter } from '@/components/TradeHealthMeter';
import { SnapAndListButton } from '@/components/SnapAndListButton';
import { AssetAuthenticity } from '@/components/AssetAuthenticity';
import { TrustReputationScore } from '@/components/TrustReputationScore';
import { P2PTradeHistory } from '@/components/P2PTradeHistory';

// Helper function to generate consistent random data based on a seed (listing ID)
const generateConsistentRandomData = (seed) => {
  // Simple seeded random function
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  const rand1 = seededRandom(seed);
  const rand2 = seededRandom(seed * 2);
  const rand3 = seededRandom(seed * 3);
  const rand4 = seededRandom(seed * 4);
  const rand5 = seededRandom(seed * 5);
  const rand6 = seededRandom(seed * 6);
  const rand7 = seededRandom(seed * 7);
  const rand8 = seededRandom(seed * 8);
  const rand9 = seededRandom(seed * 9);
  
  // Random names for users
  const names = [
    'Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Neha Patel', 'Vikram Shah',
    'Anita Gupta', 'Rohit Mehta', 'Kavya Reddy', 'Sanjay Agarwal', 'Pooja Jain',
    'Arjun Nair', 'Deepika Rao', 'Karan Malhotra', 'Shreya Das', 'Nikhil Bose'
  ];
  
  return {
    rating: parseFloat((4.2 + rand1 * 0.8).toFixed(1)),
    totalReviews: Math.floor(rand2 * 50) + 5,
    verified: rand3 > 0.3,
    responseTime: parseFloat((rand4 * 6).toFixed(2)),
    successfulTrades: Math.floor(rand5 * 25) + 3,
    trustScore: parseFloat((50 + rand6 * 40).toFixed(2)),
    authenticityScore: parseFloat((60 + rand1 * 35).toFixed(2)),
    views: Math.floor(rand7 * 300) + 10,
    expiry: new Date(Date.now() + (Math.floor(rand8 * 14) + 1) * 24 * 60 * 60 * 1000).toISOString(),
    status: rand9 > 0.8 ? 'expired' : 'active',
    profiles: {
      display_name: names[Math.floor(rand1 * names.length)],
      avatar_url: `https://i.pravatar.cc/150?u=${seed}`
    }
  };
};

// Custom hook for fetching listings from Supabase
export function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchListings = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      // Mock data since listings table doesn't exist yet
      const data = [
        {
          id: "1",
          offering_asset: "BTC",
          wanted_asset: "ETH",
          image_url: "/placeholder.svg",
          created_at: new Date().toISOString(),
          user_id: "user1"
        }
      ];
      const error = null;

      if (error) {
        throw error;
      }

      // Add consistent random data to each listing
      const listingsWithRandomData = data.map(listing => {
        const seed = parseInt(listing.id.replace(/\D/g, '')) || Math.floor(Math.random() * 1000);
        const randomData = generateConsistentRandomData(seed);
        return { 
          ...listing,
          // Map your actual column names
          offered_asset: listing.offering_asset,
          wanted_asset: listing.wanted_asset,
          asset_image_url: listing.image_url,
          // Add random generated data
          views: randomData.views,
          expiry: randomData.expiry,
          status: randomData.status,
          profiles: randomData.profiles,
          trustMetrics: {
            rating: randomData.rating,
            totalReviews: randomData.totalReviews,
            verified: randomData.verified,
            responseTime: randomData.responseTime,
            successfulTrades: randomData.successfulTrades,
            trustScore: randomData.trustScore
          },
          authenticityScore: randomData.authenticityScore
        };
      });

      setListings(listingsWithRandomData);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchListings();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel("listings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "listings" },
        () => {
          fetchListings(true); // Refresh without full loading state
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return { listings, loading, error, refreshing, refetch: () => fetchListings(true) };
}

const TradeHistorySummary = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <History className="h-5 w-5" />
                Performance
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-around text-center">
                <div>
                    <p className="text-2xl font-bold text-green-600">$200</p>
                    <p className="text-xs text-muted-foreground">Total Gains</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                </div>
            </div>
            <Button variant="outline" className="w-full">
                View Full History
            </Button>
        </CardContent>
    </Card>
);

const QuickActions = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2">
                <List className="h-4 w-4" /> My Listings
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
                <Tag className="h-4 w-4" /> My Offers
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
                <ShieldCheck className="h-4 w-4" /> Disputes
            </Button>
        </CardContent>
    </Card>
);

export const P2PExchange = () => {
  // Use the custom hook to fetch listings from Supabase
  const { listings, loading, error, refreshing, refetch } = useListings();
  
  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'newest',
    location: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Refs and state for horizontal scroll
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleListingClick = (id) => {
    console.log(`Clicked on listing ${id}.`);
  };

  const formatTimeLeft = (expiry) => {
    const now = new Date();
    const expiryDate = new Date(expiry);
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Ending today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      crypto: 'bg-orange-500 hover:bg-orange-600',
      stock: 'bg-blue-500 hover:bg-blue-600',
      collectible: 'bg-purple-500 hover:bg-purple-600',
      currency: 'bg-green-500 hover:bg-green-600',
      other: 'bg-gray-500 hover:bg-gray-600'
    };
    return colors[category] || colors.other;
  };

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    if (!listings || listings.length === 0) return [];
    
    let filtered = listings.filter(listing => {
      const searchLower = searchTerm.toLowerCase();
      const categoryFilter = filters.category === 'all' || listing.category === filters.category;
      
      const searchFilter = (
        listing.offered_asset?.toLowerCase().includes(searchLower) ||
        listing.wanted_asset?.toLowerCase().includes(searchLower) ||
        (listing.description && listing.description.toLowerCase().includes(searchLower)) ||
        (listing.profiles && listing.profiles.display_name && listing.profiles.display_name.toLowerCase().includes(searchLower))
      );

      const locationFilter = !filters.location || 
        (listing.location && listing.location.toLowerCase().includes(filters.location.toLowerCase()));

      return categoryFilter && searchFilter && locationFilter;
    });

    // Sort listings
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'ending_soon':
        filtered.sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());
        break;
      case 'most_viewed':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'high_value':
        filtered.sort((a, b) => (b.offered_value || 0) - (a.offered_value || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [listings, searchTerm, filters]);

  const refreshListings = () => {
    refetch(); // Use the refetch function from the hook
  };

  // --- Scroll Logic ---
  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollWidth, clientWidth, scrollLeft } = container;
      setShowLeftScroll(scrollLeft > 0);
      // Use a small tolerance for floating point inaccuracies
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability(); // Initial check
      container.addEventListener('scroll', checkScrollability);
      
      // Check on window resize as well
      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        resizeObserver.unobserve(container);
      };
    }
  }, [filteredListings]); // Rerun when listings change

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of visible width
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* --- Filters Sidebar --- */}
            <aside className="lg:w-72 flex-shrink-0 space-y-6">
                <SnapAndListButton onListingCreated={refreshListings} />
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="search-input">Search</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search-input"
                                    placeholder="Search listings..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <Label htmlFor="category-select">Category</Label>
                            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                                <SelectTrigger id="category-select">
                                    <SelectValue placeholder="All categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All categories</SelectItem>
                                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                    <SelectItem value="stock">Stocks</SelectItem>
                                    <SelectItem value="collectible">Collectibles</SelectItem>
                                    <SelectItem value="currency">Currency</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="sort-select">Sort by</Label>
                            <Select value={filters.sort} onValueChange={(value) => handleFilterChange('sort', value)}>
                                <SelectTrigger id="sort-select">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="ending_soon">Ending Soon</SelectItem>
                                    <SelectItem value="most_viewed">Most Viewed</SelectItem>
                                    <SelectItem value="high_value">High Value</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="location-input">Location</Label>
                            <Input
                                id="location-input"
                                placeholder="City or area..."
                                value={filters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
                <TradeHistorySummary />
                <QuickActions />
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow issues */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">P2P Exchange</h1>
                        <p className="text-muted-foreground mt-1">Trade any asset with other users</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {refreshing && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                                Refreshing...
                            </div>
                        )}
                        <Button 
                            onClick={refreshListings} 
                            variant="outline" 
                            size="sm"
                            disabled={refreshing}
                        >
                            {refreshing ? 'Refreshing...' : 'Refresh'}
                        </Button>
                    </div>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-4 space-y-4">
                                    <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {error && (
                    <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20 mb-6">
                        <CardContent className="p-6">
                            <p className="text-red-600 dark:text-red-400">Error loading listings: {error}</p>
                            <Button 
                                onClick={refreshListings} 
                                variant="outline" 
                                className="mt-4"
                                disabled={refreshing}
                            >
                                {refreshing ? 'Retrying...' : 'Try Again'}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {!loading && !error && filteredListings.length > 0 && (
                    <div className="relative">
                        {/* Left Scroll Button */}
                        {showLeftScroll && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-10 w-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-900"
                                    onClick={() => scroll('left')}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                            </div>
                        )}
                        
                        {/* Right Scroll Button */}
                        {showRightScroll && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-10 w-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-900"
                                    onClick={() => scroll('right')}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        )}
                        
                        <div ref={scrollContainerRef} className="overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <div className="flex gap-6 min-w-max">
                                {filteredListings.map((listing) => (
                                    <Card 
                                        key={listing.id} 
                                        className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all flex-shrink-0 w-80 flex flex-col"
                                        onClick={() => handleListingClick(listing.id)}
                                    >
                                        <CardHeader>
                                             <TrustReputationScore
                                                userName={listing.profiles?.display_name || 'Anonymous'}
                                                avatarUrl={listing.profiles?.avatar_url}
                                                metrics={listing.trustMetrics}
                                                size="medium"
                                             />
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0 space-y-3 flex-grow">
                                            {listing.asset_image_url && (
                                                <img 
                                                    src={listing.asset_image_url} 
                                                    alt={listing.offered_asset}
                                                    className="w-full h-40 object-cover rounded-md mb-3"
                                                />
                                            )}
                                            <div className="flex items-center justify-between">
                                                <Badge 
                                                    variant="secondary" 
                                                    className={`${getCategoryColor(listing.category)} text-white text-xs`}
                                                >
                                                    {listing.category}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Eye className="h-3 w-3" />
                                                    {listing.views || 0}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-center text-center">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-muted-foreground">Offering</p>
                                                    <p className="font-semibold text-sm truncate">{listing.offered_asset}</p>
                                                </div>
                                                <ArrowLeftRight className="h-4 w-4 text-muted-foreground mx-2 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-muted-foreground">Wants</p>
                                                    <p className="font-semibold text-sm truncate">{listing.wanted_asset}</p>
                                                </div>
                                            </div>
                                            
                                            <TradeHealthMeter
                                                offeredAsset={listing.offered_asset}
                                                wantedAsset={listing.wanted_asset}
                                                offeredValue={listing.offered_value}
                                                wantedValue={listing.wanted_value}
                                                category={listing.category}
                                                listingId={listing.id}
                                             // Good fairness score for now
                                            />
                                            
                                            <AssetAuthenticity
                                                listingId={listing.id}
                                                isOwner={false}
                                                authenticityScore={listing.authenticityScore}
                                            />
                                        </CardContent>
                                        <div className="p-4 pt-2 border-t mt-auto">
                                             <div className="flex items-center justify-between gap-1 text-xs text-muted-foreground">
                                                {listing.location && (
                                                    <div className="flex items-center gap-1 truncate">
                                                        <MapPin className="h-3 w-3" />
                                                        {listing.location}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1 ml-auto">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatTimeLeft(listing.expiry)}
                                                </div>
                                             </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && filteredListings.length === 0 && (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm || filters.category !== 'all' || filters.location ? 
                                    'Try adjusting your filters' : 
                                    'Be the first to create a listing!'
                                }
                            </p>
                            <Button onClick={() => { /* Logic to trigger SnapAndListButton will go here */ }}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create First Listing
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    </div>
  );
};
