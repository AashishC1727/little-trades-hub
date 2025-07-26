import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github,
  Shield,
  CreditCard,
  Globe,
  ChevronDown
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">LITTLE little</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Trade anything. From little to LITTLE. If it's got a price, we trade it.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>work.ashish.choudhary@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+44 7766 081465</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>London, United Kingdom</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a href="https://twitter.com/VibeRaterrrr" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a href="https://snapchat.com/add/aaassseeesss" target="_blank" rel="noopener noreferrer">
                  <img src="/src/assets/snapchat-icon.png" alt="Snapchat" className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a href="https://www.linkedin.com/in/ashish-choudhary-2017uar1727/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a href="https://github.com/AashishC1727/little-little-backend" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a href="https://instagram.com/aaassseeesss" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              <a href="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="/resources" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Resources
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="/privacy-policy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms & Conditions
              </a>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Cookie Policy
              </button>
              <a href="/accessibility" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Accessibility
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a href="/help" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="/api-docs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                API Docs
              </a>
              <a href="/status" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                System Status
              </a>
              <a href="/security" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>

        {/* Trust Elements & Payment Methods */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Trust Badges */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>FCA Regulated</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <span>English (UK)</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col lg:flex-row items-center justify-between mt-6 pt-6 border-t">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <span className="text-sm text-muted-foreground">Secure payments:</span>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
                  <CreditCard className="w-3 h-3" />
                </div>
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                  <img src="/src/assets/visa-logo.png" alt="Visa" className="w-8 h-3 object-contain" />
                </div>
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                  <img src="/src/assets/mastercard-logo.png" alt="Mastercard" className="w-8 h-3 object-contain" />
                </div>
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                  <img src="/src/assets/paypal-logo.png" alt="PayPal" className="w-8 h-3 object-contain" />
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2025 Ashish Choudhary. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;