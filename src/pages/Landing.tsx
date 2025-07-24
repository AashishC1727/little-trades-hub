import HeroSection from '@/components/HeroSection';
import AssetTicker from '@/components/AssetTicker';
import ProblemSection from '@/components/ProblemSection';
import DashboardPreview from '@/components/DashboardPreview';
import P2PTradingPreview from '@/components/P2PTradingPreview';
import AssetDiscoveryPreview from '@/components/AssetDiscoveryPreview';
import ProModePreview from '@/components/ProModePreview';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AssetTicker />
      <ProblemSection />
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