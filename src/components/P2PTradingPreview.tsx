import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftRight, Clock } from 'lucide-react';

// Import the new components to be showcased in the preview
import { TrustReputationScore } from './TrustReputationScore';
import { AssetAuthenticity } from './AssetAuthenticity';
import { TradeHealthMeter } from './TradeHealthMeter';

const P2PTradingPreview = () => {
  // Updated mock data with more details to feed the new components
  const mockListings = [
    {
      id: 1,
      user: "Ashish",
      wants: "1 ETH",
      offers: "1 bottle of Yamazaki 12-Year Whisky + £200 top-up",
      timeLeft: "2 days",
      status: "active",
      category: "collectible",
      offered_value: 1800,
      wanted_value: 2000,
      authenticityScore: 85,
      trustMetrics: {
        rating: 4.9,
        totalReviews: 142,
        verified: true,
        responseTime: 1.5,
        successfulTrades: 88,
        trustScore: 92
      }
    },
    {
      id: 2,
      user: "Sarah",
      wants: "0.5 BTC",
      offers: "Rolex Submariner (2023) + $2,000",
      timeLeft: "5 hours",
      status: "hot",
      category: "crypto",
      offered_value: 32000,
      wanted_value: 33500,
      authenticityScore: 95,
      trustMetrics: {
        rating: 5.0,
        totalReviews: 78,
        verified: true,
        responseTime: 0.5,
        successfulTrades: 45,
        trustScore: 98
      }
    },
    {
      id: 3,
      user: "Mike",
      wants: "£5,000 cash",
      offers: "10 shares AAPL + MacBook Pro M3",
      timeLeft: "1 day",
      status: "active",
      category: "stock",
      offered_value: 5800,
      wanted_value: 6200,
      authenticityScore: 72,
      trustMetrics: {
        rating: 4.7,
        totalReviews: 34,
        verified: false,
        responseTime: 4,
        successfulTrades: 21,
        trustScore: 78
      }
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Peer-to-Peer Trading
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trade anything with anyone. From crypto to collectibles, whisky to watches.
            The future of barter trading is here.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-premium transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 flex flex-col">
                <CardHeader className="pb-4">
                  {/* Replaced static user info with the dynamic TrustReputationScore component */}
                  <TrustReputationScore
                    userName={listing.user}
                    metrics={listing.trustMetrics}
                    size="small"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant={listing.status === 'hot' ? 'destructive' : 'secondary'}>
                      {listing.status === 'hot' ? '🔥 HOT' : 'Barter Listing'}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{listing.timeLeft}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 flex flex-col flex-1">
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Wants:</p>
                      <p className="font-semibold">{listing.wants}</p>
                    </div>
                    <ArrowLeftRight className="w-5 h-5 mx-auto text-muted-foreground" />
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Offers:</p>
                      <p className="font-semibold text-sm">{listing.offers}</p>
                    </div>
                  </div>

                  {/* Added new components to the card body to display more trade details */}
                  <div className="space-y-3">
                    <TradeHealthMeter
                      offeredAsset={listing.offers}
                      wantedAsset={listing.wants}
                      offeredValue={listing.offered_value}
                      wantedValue={listing.wanted_value}
                      category={listing.category}
                    />
                    <AssetAuthenticity
                      listingId={String(listing.id)}
                      isOwner={false}
                      authenticityScore={listing.authenticityScore}
                    />
                  </div>

                  <div className="flex-1" /> {/* Spacer to push button to the bottom */}
                  
                  <Button className="w-full group mt-4">
                    Make Counter Offer
                    <ArrowLeftRight className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              View All P2P Listings
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default P2PTradingPreview;
