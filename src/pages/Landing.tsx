import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LiveMarketTicker from '@/components/LiveMarketTicker';
import { YourNewsSection } from '@/components/YourNewsSection';
import DashboardPreview from '@/components/DashboardPreview';
import P2PTradingPreview from '@/components/P2PTradingPreview';
import { EstimateReturns } from '@/components/EstimateReturns';
import ProModePreview from '@/components/ProModePreview';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { P2PExchange } from '@/components/P2PExchange';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <LiveMarketTicker />
      <YourNewsSection />
      <DashboardPreview />
      {/* This component now contains the new features */}
      <P2PExchange />
      <EstimateReturns />
      <ProModePreview />
      <WaitlistSection />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Landing;
