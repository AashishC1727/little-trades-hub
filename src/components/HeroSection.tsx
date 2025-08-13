const logoLl = '/lovable-uploads/76188045-2892-4c59-a02d-6fa36fbe8f96.png';

interface HeroSectionProps {
  image?: string;
}

const HeroSection = ({ image }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/60 px-4">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/25 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-500/25 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Background Image with overlay */}
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

      {/* Geometric patterns */}
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
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src={logoLl} 
            alt="Little Little logo" 
            className="w-full max-w-[140px] md:max-w-[220px] h-auto mx-auto"
          />
        </div>

        {/* Main Text Block */}
        <div className="mb-8">
          <h1 className="text-[48px] md:text-[72px] font-extrabold tracking-[-1px] leading-none mb-2" style={{ color: '#222B45' }}>
            LITTLE
          </h1>
          <h2 className="text-[32px] md:text-[48px] font-normal leading-none" style={{ color: '#5B6470' }}>
            little
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-[16px] md:text-[20px] font-bold tracking-[0.5px]" style={{ color: '#174AE3' }}>
          Trade anything. From little to LITTLE.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;