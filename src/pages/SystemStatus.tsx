import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock,
  Server,
  Database,
  Globe,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';

const SystemStatus = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-centre mb-12">
            <h1 className="text-4xl font-bold mb-4">System Status</h1>
            <p className="text-xl text-muted-foreground">
              Real-time status of LITTLE little's trading platform and services
            </p>
          </div>

          {/* Overall Status */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-centre justify-between">
                <CardTitle>Overall System Status</CardTitle>
                <div className="flex items-centre space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    All Systems Operational
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All systems are running normally. No disruptions to trading or platform services detected.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleString('en-GB')} GMT
              </div>
            </CardContent>
          </Card>

          {/* Service Status */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold">Service Status</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-centre justify-between">
                    <div className="flex items-centre space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-centre justify-centre">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Trading Platform</h3>
                        <p className="text-sm text-muted-foreground">Core trading functionality</p>
                      </div>
                    </div>
                    <div className="flex items-centre space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-centre justify-between">
                    <div className="flex items-centre space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-centre justify-centre">
                        <Database className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Market Data</h3>
                        <p className="text-sm text-muted-foreground">Real-time price feeds and charts</p>
                      </div>
                    </div>
                    <div className="flex items-centre space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-centre justify-between">
                    <div className="flex items-centre space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-centre justify-centre">
                        <Server className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">API Services</h3>
                        <p className="text-sm text-muted-foreground">REST API and WebSocket connections</p>
                      </div>
                    </div>
                    <div className="flex items-centre space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-centre justify-between">
                    <div className="flex items-centre space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-centre justify-centre">
                        <Zap className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Payment Processing</h3>
                        <p className="text-sm text-muted-foreground">Deposits and withdrawals</p>
                      </div>
                    </div>
                    <div className="flex items-centre space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Minor Delays</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-centre justify-between">
                    <div className="flex items-centre space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-centre justify-centre">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Authentication</h3>
                        <p className="text-sm text-muted-foreground">Login and security services</p>
                      </div>
                    </div>
                    <div className="flex items-centre space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-centre justify-between">
                    <div className="flex items-centre space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-centre justify-centre">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Website & Mobile App</h3>
                        <p className="text-sm text-muted-foreground">Platform accessibility and performance</p>
                      </div>
                    </div>
                    <div className="flex items-centre space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Performance Metrics */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-centre">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Platform Uptime</div>
                  <div className="text-xs text-muted-foreground mt-1">(Last 30 days)</div>
                </div>
                <div className="text-centre">
                  <div className="text-3xl font-bold text-blue-600 mb-2">0.12s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  <div className="text-xs text-muted-foreground mt-1">(API endpoints)</div>
                </div>
                <div className="text-centre">
                  <div className="text-3xl font-bold text-purple-600 mb-2">0.05s</div>
                  <div className="text-sm text-muted-foreground">Order Execution</div>
                  <div className="text-xs text-muted-foreground mt-1">(Average latency)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-centre justify-between mb-2">
                      <h4 className="font-semibold">Payment Processing Delays</h4>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Investigating</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      We're experiencing minor delays in payment processing for bank transfers. 
                      Deposits may take an additional 1-2 hours to process.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Started: {new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString('en-GB')} GMT
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-centre justify-between mb-2">
                      <h4 className="font-semibold">Scheduled Maintenance Completed</h4>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Resolved</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Scheduled system maintenance completed successfully. All services restored to normal operation.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Resolved: {new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('en-GB')} GMT
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-centre justify-between mb-2">
                      <h4 className="font-semibold">API Rate Limiting Issue</h4>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Resolved</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Brief issue with API rate limiting affecting some automated trading systems. 
                      All systems now functioning normally.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Resolved: {new Date(Date.now() - 72 * 60 * 60 * 1000).toLocaleString('en-GB')} GMT
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">System Updates & Performance Improvements</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Scheduled maintenance to deploy performance improvements and security updates. 
                    Trading will remain available, but brief service interruptions may occur.
                  </p>
                  <div className="text-sm">
                    <strong>Date:</strong> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')} at 02:00 GMT
                  </div>
                  <div className="text-sm">
                    <strong>Duration:</strong> Approximately 30 minutes
                  </div>
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

export default SystemStatus;