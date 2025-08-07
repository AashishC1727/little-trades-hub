import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Zap, Shield, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  image?: string;
}

const HeroSection = ({ image }: HeroSectionProps) => {
  return (
    // CHANGE 1: pt-24 (top padding) has been removed to reduce the gap at the top.
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/60 pb-24">
      {/* Enhanced Background Effects with more complexity */}
      <div className="absolute inset-0">
        {/* Multiple animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/25 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-500/25 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-xl animate-bounce delay-200"></div>
        <div className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-gradient-to-r from-yellow-400/25 to-orange-500/20 rounded-full blur-lg animate-bounce delay-700"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 animate-ping`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Background Image with enhanced overlay */}
      {image && (
        <div className="absolute inset-0">
          <img 
            src={image} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-8"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/85" />
        </div>
      )}

      {/* Enhanced geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.03) 50%, transparent 51%)
          `,
          backgroundSize: '400px 400px, 300px 300px, 50px 50px'
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Super Enhanced Main Headline */}
        <div className="mb-16 animate-fade-in">
          <div className="relative mb-8">
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 relative">
              <span className="block relative">
                {/* CHANGE 2: Headline color is now slightly lighter (slate-700) */}
                <span className="text-slate-700 drop-shadow-lg">
                  LITTLE
                </span>
              </span>
              <span className="block text-gray-500 font-light tracking-wider relative">
                little
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full"></div>
              </span>
            </h1>
          </div>
          
          <div className="relative h-24 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/60 via-white/80 to-purple-100/60 rounded-2xl backdrop-blur-sm border border-white/50 shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            <p className="relative text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-800 bg-clip-text text-transparent animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-blue-500 py-6 flex items-center justify-center">
              Trade anything. From little to LITTLE.
            </p>
          </div>
        </div>


        {/* Super Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in mb-20">
          <Button 
            size="lg" 
            className="relative text-lg px-12 py-8 rounded-2xl group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-110 overflow-hidden transform-gpu"
            onClick={() => window.location.href = '/auth'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 delay-200"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
            <span className="relative z-10 font-bold">Start Trading Now</span>
            <ArrowRight className="relative z-10 ml-3 w-6 h-6 group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300 delay-150"></div>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="relative text-lg px-12 py-8 rounded-2xl border-2 border-slate-300 hover:border-blue-400 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 text-slate-700 hover:text-blue-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 group overflow-hidden transform-gpu"
            onClick={() => window.location.href = '/dashboard'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10 font-semibold">See Live Dashboard</span>
          </Button>
        </div>

        {/* Stats box is simplified and moved down */}
        <div className="relative mt-24">
          <div className="relative bg-white/60 backdrop-blur-md rounded-3xl shadow-xl pt-16 pb-12 px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div className="group cursor-pointer">
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-700 via-blue-600 to-slate-900 bg-clip-text text-transparent mb-3 group-hover:scale-125 transition-all duration-500 drop-shadow-sm">
                    $__
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-600 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Volume Traded</div>
              </div>
              <div className="group cursor-pointer">
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-3 group-hover:scale-125 transition-all duration-500 drop-shadow-sm">
                    __
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-600 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">Active Users</div>
              </div>
              <div className="group cursor-pointer">
                <div className="relative">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent mb-3 group-hover:scale-125 transition-all duration-500 drop-shadow-sm">
                    Launching soon
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-600 uppercase tracking-wider group-hover:text-green-600 transition-colors">Launch Date</div>
              </div>
              <div className="group cursor-pointer">
                <div className="relative">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-700 bg-clip-text text-transparent mb-3 group-hover:scale-125 transition-all duration-500 drop-shadow-sm">
                    In Dev
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-600 uppercase tracking-wider group-hover:text-purple-600 transition-colors">Current Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(60px) rotateX(20deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1.2s ease-out 0.4s both;
        }
        .animate-typewriter {
          animation: typewriter 3.5s steps(40) 0.8s both;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;