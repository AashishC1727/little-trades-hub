import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Compass, 
  GraduationCap, 
  Info,
  Menu,
  X
} from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Markets', href: '/markets', icon: TrendingUp },
    { label: 'Trade', href: '/trade', icon: BarChart3 },
    { label: 'Portfolio', href: '/portfolio', icon: BarChart3 },
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'Learn', href: '/learn', icon: GraduationCap },
    { label: 'About', href: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold">LITTLE little</h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => window.location.href = item.href}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assets... (Tesla, BTC, Whisky)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/auth'}
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => window.location.href = '/auth'}
              >
                Sign up
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = '/trade'}
              >
                Start Trading
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <div className="py-4 space-y-2">
              {/* Mobile Search */}
              <div className="px-2 pb-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      window.location.href = item.href;
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}

              {/* Mobile Auth */}
              <div className="border-t pt-2 mt-2 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.href = '/auth';
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    window.location.href = '/auth';
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign up
                </Button>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    window.location.href = '/trade';
                    setMobileMenuOpen(false);
                  }}
                >
                  Start Trading
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;