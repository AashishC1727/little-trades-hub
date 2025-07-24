import { useState } from 'react';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import Portfolio from '@/components/Portfolio';
import TradePanel from '@/components/TradePanel';
import AssetDiscovery from '@/components/AssetDiscovery';
import WalletInterface from '@/components/WalletInterface';
import TradingCharts from '@/components/TradingCharts';
import NotificationCenter from '@/components/NotificationCenter';
import SupportInterface from '@/components/SupportInterface';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Market Overview */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Market Overview</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Crypto</h3>
                  <MarketTicker 
                    symbols={['bitcoin', 'ethereum', 'cardano', 'solana', 'dogecoin']} 
                    type="crypto" 
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Stocks</h3>
                  <MarketTicker 
                    symbols={['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']} 
                    type="stock" 
                  />
                </div>
              </div>
            </div>

            {/* Portfolio & Trading */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Portfolio />
              </div>
              <div>
                <TradePanel />
              </div>
            </div>
          </div>
        );
      case 'discover':
        return <AssetDiscovery />;
      case 'trade':
        return <TradingCharts />;
      case 'portfolio':
        return <Portfolio />;
      case 'wallet':
        return <WalletInterface />;
      case 'history':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
            <p className="text-muted-foreground">Coming soon - View all your trading activity</p>
          </div>
        );
      case 'notifications':
        return <NotificationCenter />;
      case 'support':
        return <SupportInterface />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Portfolio />
              </div>
              <div>
                <TradePanel />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
