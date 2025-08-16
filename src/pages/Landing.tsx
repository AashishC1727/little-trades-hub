import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RealtimeMarketData from '@/components/RealtimeMarketData';
import { YourNewsSection } from '@/components/YourNewsSection';
import DashboardPreview from '@/components/DashboardPreview';
import { EstimateReturns } from '@/components/EstimateReturns';
import ProModePreview from '@/components/ProModePreview';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { P2PExchange } from '@/components/P2PExchange';
import ServiceAsInventory from '@/components/ServiceAsInventory';
import BSUEconomy from '@/components/BSUEconomy';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <RealtimeMarketData />
      <YourNewsSection />
      <DashboardPreview />
      {/* This component now contains the new features */}
      <P2PExchange />
      <ServiceAsInventory />
      <BSUEconomy />
      <EstimateReturns />
      <ProModePreview />
      <WaitlistSection />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Landing;
