import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  QrCode, 
  DollarSign,
  Bitcoin,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const WalletInterface = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const walletBalances = [
    {
      currency: 'USD',
      symbol: '$',
      balance: 12543.67,
      available: 12543.67,
      pending: 0,
      icon: DollarSign,
    },
    {
      currency: 'BTC',
      symbol: '₿',
      balance: 0.285,
      available: 0.285,
      pending: 0,
      icon: Bitcoin,
    },
    {
      currency: 'ETH',
      symbol: 'Ξ',
      balance: 4.523,
      available: 4.523,
      pending: 0,
      icon: Bitcoin,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'deposit',
      currency: 'USD',
      amount: 1000,
      status: 'completed',
      timestamp: '2024-01-24 14:30',
      txHash: '0x1234...5678',
    },
    {
      id: 2,
      type: 'withdrawal',
      currency: 'BTC',
      amount: 0.05,
      status: 'pending',
      timestamp: '2024-01-24 12:15',
      txHash: '0xabcd...efgh',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <CardTitle>Wallet Overview</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <CardDescription>
            Manage your balances and transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {walletBalances.map((wallet) => {
              const Icon = wallet.icon;
              return (
                <Card key={wallet.currency} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{wallet.currency}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Available
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold">
                        {showBalances ? (
                          `${wallet.symbol}${wallet.balance.toLocaleString()}`
                        ) : (
                          '****'
                        )}
                      </div>
                      {wallet.pending > 0 && (
                        <div className="text-sm text-muted-foreground">
                          Pending: {wallet.symbol}{wallet.pending}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Deposit/Withdraw Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowDownLeft className="w-5 h-5 text-success" />
              <span>Deposit</span>
            </CardTitle>
            <CardDescription>
              Add funds to your wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="fiat" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fiat">Fiat (USD)</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fiat" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (USD)</label>
                  <Input placeholder="0.00" type="number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Bank Transfer</Button>
                    <Button variant="outline" size="sm">Credit Card</Button>
                  </div>
                </div>
                <Button className="w-full">
                  Deposit Funds
                </Button>
              </TabsContent>
              
              <TabsContent value="crypto" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cryptocurrency</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">BTC</Button>
                    <Button variant="outline" size="sm">ETH</Button>
                    <Button variant="outline" size="sm">USDT</Button>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Deposit Address</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <code className="text-xs bg-background p-2 rounded block">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                  </code>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowUpRight className="w-5 h-5 text-destructive" />
              <span>Withdraw</span>
            </CardTitle>
            <CardDescription>
              Send funds from your wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">USD</Button>
                  <Button variant="outline" size="sm">BTC</Button>
                  <Button variant="outline" size="sm">ETH</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input placeholder="0.00" type="number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Input placeholder="Address or bank account" />
              </div>
              <div className="p-3 bg-muted rounded-lg text-sm">
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between">
                  <span>You'll receive:</span>
                  <span>$97.50</span>
                </div>
              </div>
              <Button className="w-full" variant="destructive">
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest deposits and withdrawals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    tx.type === 'deposit' ? "bg-success/10" : "bg-destructive/10"
                  )}>
                    {tx.type === 'deposit' ? (
                      <ArrowDownLeft className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium capitalize">
                      {tx.type} {tx.currency}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tx.timestamp}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {tx.type === 'deposit' ? '+' : '-'}{tx.amount} {tx.currency}
                  </div>
                  <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletInterface;