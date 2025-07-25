import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WelcomeSection } from "@/components/WelcomeSection";

const WelcomeInvesting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <WelcomeSection />
      </main>
      <Footer />
    </div>
  );
};

export default WelcomeInvesting;