import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Key, 
  Shield, 
  Zap, 
  FileText,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-centre mb-12">
            <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build powerful trading applications with LITTLE little's REST API. 
              Access real-time market data, execute trades, and manage portfolios programmatically.
            </p>
          </div>

          {/* Quick Start Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Get API Keys</h3>
                <p className="text-sm text-muted-foreground">
                  Generate your authentication credentials
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Quick Start</h3>
                <p className="text-sm text-muted-foreground">
                  Get up and running in minutes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Reference</h3>
                <p className="text-sm text-muted-foreground">
                  Complete endpoint documentation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Examples</h3>
                <p className="text-sm text-muted-foreground">
                  Code samples and tutorials
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="websockets">WebSockets</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The LITTLE little API provides programmatic access to our trading platform, 
                    allowing you to build custom applications, automated trading strategies, 
                    and integrate our services into your existing systems.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Real-time market data</li>
                        <li>• Order management</li>
                        <li>• Portfolio tracking</li>
                        <li>• Account information</li>
                        <li>• Transaction history</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Rate Limits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 1000 requests/minute</li>
                        <li>• 10,000 requests/hour</li>
                        <li>• Burst limit: 100 requests/second</li>
                        <li>• WebSocket: 10 connections max</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-centre space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="font-medium">Base URL</span>
                    </div>
                    <code className="text-sm">https://api.littlelittle.com/v1</code>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">API Key Authentication</h4>
                    <p className="text-muted-foreground mb-4">
                      All API requests must include your API key in the Authorization header:
                    </p>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="flex items-centre justify-between">
                        <span>Authorization: Bearer YOUR_API_KEY</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Generating API Keys</h4>
                    <ol className="text-muted-foreground space-y-2">
                      <li>1. Log into your LITTLE little account</li>
                      <li>2. Navigate to Settings → API Management</li>
                      <li>3. Click "Generate New API Key"</li>
                      <li>4. Set permissions and expiry date</li>
                      <li>5. Save your key securely (it won't be shown again)</li>
                    </ol>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <div className="flex items-centre space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-orange-900">Security Best Practices</span>
                    </div>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Never expose API keys in client-side code</li>
                      <li>• Use environment variables for key storage</li>
                      <li>• Rotate keys regularly (every 90 days)</li>
                      <li>• Set minimum required permissions</li>
                      <li>• Monitor API usage for suspicious activity</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-centre space-x-2">
                      <span>Market Data</span>
                      <Badge variant="secondary">GET</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">GET /market/quotes</code>
                          <p className="text-xs text-muted-foreground mt-1">Get real-time quotes for multiple assets</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">GET /market/history</code>
                          <p className="text-xs text-muted-foreground mt-1">Historical price data and charts</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">GET /market/search</code>
                          <p className="text-xs text-muted-foreground mt-1">Search for tradeable assets</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-centre space-x-2">
                      <span>Trading</span>
                      <Badge variant="secondary">POST</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">POST /orders</code>
                          <p className="text-xs text-muted-foreground mt-1">Place a new trading order</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">GET /orders</code>
                          <p className="text-xs text-muted-foreground mt-1">List all orders for your account</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">DELETE /orders/:id</code>
                          <p className="text-xs text-muted-foreground mt-1">Cancel an existing order</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-centre space-x-2">
                      <span>Account</span>
                      <Badge variant="secondary">GET</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">GET /account</code>
                          <p className="text-xs text-muted-foreground mt-1">Get account information and balances</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">GET /portfolio</code>
                          <p className="text-xs text-muted-foreground mt-1">Current portfolio positions</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                      <div className="flex items-centre justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <code className="text-sm">GET /transactions</code>
                          <p className="text-xs text-muted-foreground mt-1">Transaction history and statements</p>
                        </div>
                        <Button variant="outline" size="sm">Try it</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="websockets" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>WebSocket Streams</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    For real-time data, use our WebSocket API to receive live market updates, 
                    order fills, and account changes.
                  </p>

                  <div>
                    <h4 className="font-semibold mb-3">Connection</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      wss://ws.littlelittle.com/v1/stream
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Available Streams</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded">
                        <code className="text-sm font-medium">market.quotes</code>
                        <p className="text-xs text-muted-foreground mt-1">Real-time price updates</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded">
                        <code className="text-sm font-medium">account.orders</code>
                        <p className="text-xs text-muted-foreground mt-1">Order status changes</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded">
                        <code className="text-sm font-medium">account.portfolio</code>
                        <p className="text-xs text-muted-foreground mt-1">Portfolio value updates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Get Market Quote (JavaScript)</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`const response = await fetch('https://api.littlelittle.com/v1/market/quotes?symbols=AAPL,BTC', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Place Order (Python)</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`import requests

url = "https://api.littlelittle.com/v1/orders"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "symbol": "AAPL",
    "side": "buy",
    "quantity": 10,
    "type": "market"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-centre space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">SDKs Available</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      We provide official SDKs for JavaScript, Python, Java, and C#. 
                      Visit our GitHub repository for installation instructions and examples.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Support Section */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-centre">
                  <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive guides and references
                  </p>
                  <Button variant="outline" size="sm">
                    View Docs <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="text-centre">
                  <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">GitHub</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    SDKs, examples, and community support
                  </p>
                  <Button variant="outline" size="sm">
                    Visit GitHub <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="text-centre">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get help from our developer support team
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiDocs;