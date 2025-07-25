import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LiveMarketTicker from '@/components/LiveMarketTicker';
import MarketPulseTicker from '@/components/MarketPulseTicker';
import DashboardPreview from '@/components/DashboardPreview';
import P2PTradingPreview from '@/components/P2PTradingPreview';
import AssetDiscoveryPreview from '@/components/AssetDiscoveryPreview';
import ProModePreview from '@/components/ProModePreview';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <LiveMarketTicker />
      <div className="container mx-auto px-4 py-8">
        <MarketPulseTicker />
      </div>
      <DashboardPreview />
      <P2PTradingPreview />
      <AssetDiscoveryPreview />
      <ProModePreview />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Landing;