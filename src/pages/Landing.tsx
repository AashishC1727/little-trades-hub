import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LiveMarketTicker from '@/components/LiveMarketTicker';
import { YourNewsSection } from '@/components/YourNewsSection';
import DashboardPreview from '@/components/DashboardPreview';
import P2PTradingPreview from '@/components/P2PTradingPreview';
import AssetDiscoveryPreview from '@/components/AssetDiscoveryPreview';
import ProModePreview from '@/components/ProModePreview';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <LiveMarketTicker />
      <YourNewsSection />
      <DashboardPreview />
      <P2PTradingPreview />
      <AssetDiscoveryPreview />
      <ProModePreview />
      <WaitlistSection />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Landing;