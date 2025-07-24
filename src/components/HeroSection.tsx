import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Zap, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.1),transparent)]" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Headline */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4">
            <span className="block">LITTLE</span>
            <span className="block text-muted-foreground">little</span>
          </h1>
          
          {/* Animated Tagline */}
          <div className="relative h-16 mb-8">
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-foreground">
              Trade anything. From LITTLE to little.
            </p>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-up">
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center p-6 rounded-2xl border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2">
              <TrendingUp className="w-8 h-8 mb-4 group-hover:animate-float" />
              <h3 className="text-lg font-semibold mb-2">Real-time Everything</h3>
              <p className="text-sm text-muted-foreground">Live prices, instant execution, zero delays</p>
            </div>
          </div>
          
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center p-6 rounded-2xl border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2">
              <Zap className="w-8 h-8 mb-4 group-hover:animate-float" />
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Millisecond execution, global markets</p>
            </div>
          </div>
          
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center p-6 rounded-2xl border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2">
              <Shield className="w-8 h-8 mb-4 group-hover:animate-float" />
              <h3 className="text-lg font-semibold mb-2">Bank-grade Security</h3>
              <p className="text-sm text-muted-foreground">Your assets, protected at all costs</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full group" onClick={() => window.location.href = '/auth'}>
            Start Trading Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full" onClick={() => window.location.href = '/dashboard'}>
            View Dashboard
          </Button>
        </div>

        {/* Live Stats */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold">$2.4B+</div>
              <div className="text-sm text-muted-foreground">Volume Traded</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">1.2M+</div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">&lt;1ms</div>
              <div className="text-sm text-muted-foreground">Execution Speed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;