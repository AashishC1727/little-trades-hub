import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TopicGrid } from "@/components/TopicGrid";
import { ArticleList } from "@/components/ArticleList";
import { FeaturePanel } from "@/components/FeaturePanel";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Custom Hero Section for Learn */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Your financial journey
                <span className="block text-primary">starts here</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Master trading, investing, and financial markets with our comprehensive educational platform.
                From beginner basics to advanced strategies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Browse Library
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <TopicGrid />
        <ArticleList />
        <FeaturePanel />
      </main>
      <Footer />
    </div>
  );
};

export default Learn;