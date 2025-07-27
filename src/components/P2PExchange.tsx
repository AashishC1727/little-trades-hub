import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useP2PListings } from '@/hooks/useP2PListings';
import { ArrowLeftRight, Calendar, Eye, Filter, MapPin, Plus, Search, TrendingUp } from 'lucide-react';

export const P2PExchange = () => {
  const { listings, loading, error, fetchListings, incrementViews } = useP2PListings();
  const [filters, setFilters] = useState({
    category: '',
    sort: 'newest',
    location: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchListings(newFilters);
  };

  const handleListingClick = (id: string) => {
    incrementViews(id);
  };

  const formatTimeLeft = (expiry: string) => {
    const now = new Date();
    const expiryDate = new Date(expiry);
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Ending today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      crypto: 'bg-orange-500',
      stock: 'bg-blue-500',
      collectible: 'bg-purple-500',
      currency: 'bg-green-500',
      other: 'bg-gray-500'
    };
    return colors[category] || colors.other;
  };

  const filteredListings = listings.filter(listing => {
    const searchLower = searchTerm.toLowerCase();
    return (
      listing.offered_asset.toLowerCase().includes(searchLower) ||
      listing.wanted_asset.toLowerCase().includes(searchLower) ||
      listing.description?.toLowerCase().includes(searchLower) ||
      listing.profiles?.display_name?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search listings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="stock">Stocks</SelectItem>
                    <SelectItem value="collectible">Collectibles</SelectItem>
                    <SelectItem value="currency">Currency</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort by</label>
                <Select value={filters.sort} onValueChange={(value) => handleFilterChange('sort', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="ending_soon">Ending soon</SelectItem>
                    <SelectItem value="most_viewed">Most viewed</SelectItem>
                    <SelectItem value="high_value">High value</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="City or region..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Listing
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">P2P Exchange</h1>
              <p className="text-muted-foreground">Trade any asset with other users</p>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-600">Error loading listings: {error}</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map((listing) => (
                <Card 
                  key={listing.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleListingClick(listing.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge 
                        variant="secondary" 
                        className={`${getCategoryColor(listing.category)} text-white`}
                      >
                        {listing.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {listing.view_count}
                      </div>
                    </div>

                    {listing.asset_image_url && (
                      <img 
                        src={listing.asset_image_url} 
                        alt={listing.offered_asset}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-center">
                        <div className="text-center flex-1">
                          <p className="text-sm text-muted-foreground">Offering</p>
                          <p className="font-semibold">{listing.offered_asset}</p>
                          {listing.offered_value && (
                            <p className="text-xs text-green-600">${listing.offered_value.toLocaleString()}</p>
                          )}
                        </div>
                        <ArrowLeftRight className="h-4 w-4 text-muted-foreground mx-2" />
                        <div className="text-center flex-1">
                          <p className="text-sm text-muted-foreground">Wants</p>
                          <p className="font-semibold">{listing.wanted_asset}</p>
                          {listing.wanted_value && (
                            <p className="text-xs text-blue-600">${listing.wanted_value.toLocaleString()}</p>
                          )}
                        </div>
                      </div>

                      {listing.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {listing.description}
                        </p>
                      )}

                      <Separator />

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={listing.profiles?.avatar_url} />
                            <AvatarFallback>{listing.profiles?.display_name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          {listing.profiles?.display_name || 'Anonymous'}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatTimeLeft(listing.expiry)}
                        </div>
                      </div>

                      {listing.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {listing.location}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && filteredListings.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filters.category ? 'Try adjusting your filters' : 'Be the first to create a listing!'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Listing
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};