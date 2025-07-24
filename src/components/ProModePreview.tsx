import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { BarChart3, TrendingUp, Zap, Eye, Settings } from 'lucide-react';

const ProModePreview = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Simple vs Pro Mode
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start simple, scale complex. Switch between modes as your trading evolves.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Simple Mode */}
            <Card className="border-2 border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Simple Mode</CardTitle>
                  <Badge variant="secondary">Default</Badge>
                </div>
                <p className="text-muted-foreground">Clean, minimal interface for everyday trading</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">BTC/USD</span>
                      <span className="text-xl font-bold">$42,150</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="w-full">BUY</Button>
                      <Button variant="outline" className="w-full">SELL</Button>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      One-click trading • Price alerts • Portfolio view
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Perfect for beginners and quick trades
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Pro Mode */}
            <Card className="border-2 border-primary/50 shadow-premium">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Pro Mode</CardTitle>
                  <Badge className="bg-primary">Advanced</Badge>
                </div>
                <p className="text-muted-foreground">Full-featured trading terminal with advanced tools</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-xl">
                  {/* Mock Trading Chart */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">BTC/USD</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-xl font-bold">$42,150</span>
                        <span className="text-sm text-success">+2.4%</span>
                      </div>
                    </div>
                    
                    {/* Mock Chart */}
                    <div className="h-32 bg-background rounded-lg flex items-center justify-center border">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-sm">Advanced Charts & Indicators</span>
                      </div>
                    </div>
                    
                    {/* Order Book Preview */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-center font-medium text-success mb-2">BIDS</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>42,140</span>
                            <span>0.25</span>
                          </div>
                          <div className="flex justify-between">
                            <span>42,135</span>
                            <span>0.18</span>
                          </div>
                          <div className="flex justify-between">
                            <span>42,130</span>
                            <span>0.32</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-center font-medium text-destructive mb-2">ASKS</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>42,155</span>
                            <span>0.22</span>
                          </div>
                          <div className="flex justify-between">
                            <span>42,160</span>
                            <span>0.15</span>
                          </div>
                          <div className="flex justify-between">
                            <span>42,165</span>
                            <span>0.28</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Charts • Order book • Advanced orders • API access
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mode Toggle */}
          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold">Trading Mode</h3>
                    <p className="text-sm text-muted-foreground">Switch anytime</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">Simple</span>
                    <Switch />
                    <span className="text-sm">Pro</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProModePreview;