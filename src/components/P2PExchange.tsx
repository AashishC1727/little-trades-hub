import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftRight, Calendar, Eye, Filter, History, MapPin, Plus, Search, TrendingUp, List, Tag, ShieldCheck } from 'lucide-react';

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
  
  return {
    rating: parseFloat((4.2 + rand1 * 0.8).toFixed(1)),
    totalReviews: Math.floor(rand2 * 50) + 5,
    verified: rand3 > 0.3,
    responseTime: parseFloat((rand4 * 6).toFixed(2)),
    successfulTrades: Math.floor(rand5 * 25) + 3,
    trustScore: parseFloat((50 + rand6 * 40).toFixed(2)),
    authenticityScore: parseFloat((60 + rand1 * 35).toFixed(2))
  };
};

// Mock Data with English descriptions - now with consistent random data
const createMockListings = () => [
  {
    id: '1',
    created_at: '2025-08-02T12:00:00Z',
    offered_asset: 'Vintage Rolex Watch',
    wanted_asset: '1.5 ETH',
    category: 'collectible',
    description: 'A classic 1985 Rolex Submariner in excellent condition.',
    asset_image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80',
    location: 'Mumbai, India',
    offered_value: 4500,
    wanted_value: 4800,
    expiry: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    views: 120,
    profiles: {
      display_name: 'Rajesh Kumar',
      avatar_url: 'https://i.pravatar.cc/150?u=priya'
    }
  },
  {
    id: '2',
    created_at: '2025-08-01T18:30:00Z',
    offered_asset: '10 Shares of AAPL',
    wanted_asset: 'Gaming PC (RTX 4090)',
    category: 'stock',
    description: 'Trading 10 shares of Apple Inc. for a high-end gaming PC.',
    asset_image_url: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&q=80',
    location: 'Bangalore, India',
    offered_value: 2000,
    wanted_value: 2100,
    expiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    views: 250,
    profiles: {
      display_name: 'Priya Sharma',
      avatar_url: 'https://i.pravatar.cc/150?u=rajesh'
    }
  },
  {
    id: '3',
    created_at: '2025-08-02T09:00:00Z',
    offered_asset: '0.5 BTC',
    wanted_asset: '2024 Royal Enfield Bike',
    category: 'crypto',
    description: 'Half a Bitcoin for a new or slightly used Royal Enfield bike.',
    asset_image_url: 'https://images.unsplash.com/photo-1623227413711-25ee4388dae3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Delhi, India',
    offered_value: 35000,
    wanted_value: 34000,
    expiry: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    views: 88,
    profiles: {
      display_name: 'Amit Singh',
      avatar_url: 'https://i.pravatar.cc/150?u=amit'
    }
  }
];

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
  // Generate listings with consistent random data using useMemo
  const listings = useMemo(() => {
    const mockListings = createMockListings();
    
    // Generate consistent random data for each listing
    return mockListings.map(listing => {
      const seed = parseInt(listing.id); // Use listing ID as seed
      const randomData = generateConsistentRandomData(seed);
      
      return {
        ...listing,
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
  }, []); // Empty dependency array means this only runs once

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'newest',
    location: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredListings = (listings || []).filter(listing => {
    const searchLower = searchTerm.toLowerCase();
    const categoryFilter = filters.category === 'all' || listing.category === filters.category;
    
    const searchFilter = (
      listing.offered_asset.toLowerCase().includes(searchLower) ||
      listing.wanted_asset.toLowerCase().includes(searchLower) ||
      (listing.description && listing.description.toLowerCase().includes(searchLower)) ||
      (listing.profiles && listing.profiles.display_name && listing.profiles.display_name.toLowerCase().includes(searchLower))
    );

    return categoryFilter && searchFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* --- Filters Sidebar --- */}
            <aside className="lg:w-72 flex-shrink-0 space-y-6">
                <SnapAndListButton onListingCreated={() => console.log("New listing created!")} />
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
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">P2P Exchange</h1>
                        <p className="text-muted-foreground mt-1">Trade any asset with other users</p>
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
                    <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
                        <CardContent className="p-6">
                            <p className="text-red-600 dark:text-red-400">Error loading listings: {error}</p>
                        </CardContent>
                    </Card>
                )}

                {!loading && !error && listings && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredListings.map((listing) => (
                            <Card 
                                key={listing.id} 
                                className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
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
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">Offering</p>
                                            <p className="font-semibold text-sm truncate">{listing.offered_asset}</p>
                                        </div>
                                        <ArrowLeftRight className="h-4 w-4 text-muted-foreground mx-2 flex-shrink-0" />
                                        <div className="flex-1">
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
                )}

                {!loading && !error && listings && filteredListings.length === 0 && (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm || filters.category !== 'all' ? 'Try adjusting your filters' : 'Be the first to create a listing!'}
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