import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Compass, 
  GraduationCap, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const navItems = [
    { label: 'Markets', href: '/markets', icon: TrendingUp },
    { label: 'Trade', href: '/trade', icon: BarChart3 },
    { label: 'Portfolio', href: '/portfolio', icon: BarChart3 },
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'Learn', href: '/learn', icon: GraduationCap },
    { label: 'Support', href: '/support', icon: HelpCircle },
  ];

  const handleNavigation = (href: string, label: string) => {
    // Check for existing routes and handle navigation
    const existingRoutes = ['/dashboard', '/auth', '/learn', '/support', '/about'];
    
    if (existingRoutes.includes(href)) {
      navigate(href);
    } else if (href === '/portfolio') {
      if (!user) {
        navigate('/auth');
        toast({
          title: "Authentication Required",
          description: "Log in to view your portfolio"
        });
      } else {
        toast({
          title: "Coming Soon",
          description: "Portfolio view is being built"
        });
      }
    } else if (href === '/markets') {
      toast({
        title: "Coming Soon",
        description: "Global markets in one view"
      });
    } else if (href === '/trade') {
      toast({
        title: "Coming Soon",
        description: "Launching trading terminal soon"
      });
    } else if (href === '/discover') {
      toast({
        title: "Coming Soon",
        description: "Asset discovery coming soon"
      });
    } else {
      // For any other routes, try to navigate first
      navigate(href);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a search term"
      });
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleStartTrading = () => {
    if (user) {
      navigate('/trade');
    } else {
      navigate('/auth');
      toast({
        title: "Account Required",
        description: "Create an account to start trading"
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="flex items-center">
              <img 
                src="/lovable-uploads/76188045-2892-4c59-a02d-6fa36fbe8f96.png" 
                alt="Little Little logo" 
                className="max-h-8 md:max-h-10 w-auto object-contain"
              />
            </button>
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
                  onClick={() => handleNavigation(item.href, item.label)}
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
                onKeyPress={handleSearchKeyPress}
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
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Sign up
              </Button>
              {user && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
              )}
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleStartTrading}
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
                    onKeyPress={handleSearchKeyPress}
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
                      handleNavigation(item.href, item.label);
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
                    navigate('/auth');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    navigate('/auth');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign up
                </Button>
                {user && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate('/dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    handleStartTrading();
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