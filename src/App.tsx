import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Accessibility from "./pages/Accessibility";
import Support from "./pages/Support";
import EnhancedSupport from "./pages/EnhancedSupport";
import Learn from "./pages/Learn";
import LearnLibrary from "./pages/LearnLibrary";
import WelcomeInvesting from "./pages/WelcomeInvesting";
import HelpCenter from "./pages/HelpCenter";
import ApiDocs from "./pages/ApiDocs";
import SystemStatus from "./pages/SystemStatus";
import Security from "./pages/Security";
import Retirement from "./pages/Articles/Retirement_Planning";
import RealtimeMarket from "./pages/RealtimeMarket";

// Import the P2PExchange component which will be used on the new page.
// Note: You might need to create a new page file like `src/pages/P2PExchangePage.tsx` to wrap this component.
import { P2PExchange } from "@/components/P2PExchange";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Landing />} />
            {/* This new route leads to the full P2P exchange page where other features like Snap & List, Dispute Resolution, and Trade History would live. */}
            <Route path="/p2p-exchange" element={
                <div className="min-h-screen bg-background">
                    {/* A full page would likely have a header and footer */}
                    <P2PExchange />
                </div>
            } />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/support" element={<EnhancedSupport />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn-library" element={<LearnLibrary />} />
            <Route path="/learn/welcome-investing-101" element={<WelcomeInvesting />} />
            <Route path="/learn/retirement" element={<Retirement />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/status" element={<SystemStatus />} />
            <Route path="/security" element={<Security />} />
            <Route path="/market" element={<RealtimeMarket />} />
            <Route path="/live-data" element={<RealtimeMarket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
