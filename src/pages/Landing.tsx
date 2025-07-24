import HeroSection from '@/components/HeroSection';
import AssetTicker from '@/components/AssetTicker';
import ProblemSection from '@/components/ProblemSection';
import DashboardPreview from '@/components/DashboardPreview';
import WaitlistSection from '@/components/WaitlistSection';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AssetTicker />
      <ProblemSection />
      <DashboardPreview />
      <WaitlistSection />
    </div>
  );
};

export default Landing;