import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Clock, Star } from 'lucide-react';

const P2PTradingPreview = () => {
  const mockListings = [
    {
      id: 1,
      user: "Ashish",
      wants: "1 ETH",
      offers: "1 bottle of Yamazaki 12-Year Whisky + £200 top-up",
      rating: 4.9,
      timeLeft: "2 days",
      status: "active"
    },
    {
      id: 2,
      user: "Sarah",
      wants: "0.5 BTC",
      offers: "Rolex Submariner (2023) + $2,000",
      rating: 5.0,
      timeLeft: "5 hours",
      status: "hot"
    },
    {
      id: 3,
      user: "Mike",
      wants: "£5,000 cash",
      offers: "10 shares AAPL + MacBook Pro M3",
      rating: 4.7,
      timeLeft: "1 day",
      status: "active"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-premium transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{listing.user[0]}</span>
                      </div>
                      <span className="font-semibold">{listing.user}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{listing.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant={listing.status === 'hot' ? 'destructive' : 'secondary'}>
                      {listing.status === 'hot' ? '🔥 HOT' : 'Barter Listing'}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{listing.timeLeft}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
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

                  <Button className="w-full group">
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