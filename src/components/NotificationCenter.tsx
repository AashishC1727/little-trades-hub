import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Settings,
  Plus,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'price_alert',
      title: 'BTC Price Alert',
      message: 'Bitcoin has reached your target price of $43,500',
      timestamp: '2 minutes ago',
      read: false,
      icon: TrendingUp,
      severity: 'success',
    },
    {
      id: 2,
      type: 'trade_confirmation',
      title: 'Trade Executed',
      message: 'Your buy order for 0.1 ETH has been filled at $2,634.45',
      timestamp: '15 minutes ago',
      read: false,
      icon: CheckCircle,
      severity: 'info',
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM UTC',
      timestamp: '1 hour ago',
      read: true,
      icon: AlertTriangle,
      severity: 'warning',
    },
  ]);

  const [priceAlerts, setPriceAlerts] = useState([
    {
      id: 1,
      asset: 'BTC',
      condition: 'above',
      price: 45000,
      active: true,
    },
    {
      id: 2,
      asset: 'ETH',
      condition: 'below',
      price: 2500,
      active: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <CardTitle>Notifications & Alerts</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Manage your price alerts and system notifications
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Recent Notifications</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
            >
              Mark All Read
            </Button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card 
                  key={notification.id}
                  className={cn(
                    "cursor-pointer transition-colors",
                    !notification.read && "border-primary/50 bg-primary/5"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        notification.severity === 'success' && "bg-success/10",
                        notification.severity === 'info' && "bg-primary/10",
                        notification.severity === 'warning' && "bg-warning/10"
                      )}>
                        <Icon className={cn(
                          "w-4 h-4",
                          notification.severity === 'success' && "text-success",
                          notification.severity === 'info' && "text-primary",
                          notification.severity === 'warning' && "text-warning"
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Price Alerts</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              New Alert
            </Button>
          </div>

          {/* Create New Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Price Alert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Asset</label>
                  <Input placeholder="BTC" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Condition</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input placeholder="45000" type="number" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Create Alert</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <div className="space-y-3">
            {priceAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {alert.asset} {alert.condition} ${alert.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Alert when {alert.asset} goes {alert.condition} ${alert.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={alert.active} />
                      <Button variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Price Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Notifications when your price alerts trigger
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Trade Confirmations</div>
                    <div className="text-sm text-muted-foreground">
                      Notifications when your trades are executed
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">System Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Important system maintenance and updates
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing</div>
                    <div className="text-sm text-muted-foreground">
                      Product updates and promotional offers
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Delivery Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In-app notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS notifications</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push notifications</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;