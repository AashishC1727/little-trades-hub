import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    performance: false,
    functional: false,
    targeting: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }

    // Listen for cookie settings open events
    const handleOpenSettings = () => {
      setShowSettings(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      performance: true,
      functional: true,
      targeting: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      performance: false,
      functional: false,
      targeting: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(savedPreferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleCookiePolicyClick = () => {
    navigate('/cookie-policy');
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t">
        <Card className="p-6 max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use our own and third-party cookies on our websites to enhance your experience, 
                analyze traffic, and for security and marketing. For more info, see our{' '}
                <button 
                  onClick={handleCookiePolicyClick}
                  className="underline hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </button>
                {' '}or go to Manage Settings.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="w-full sm:w-auto"
              >
                Reject All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="w-full sm:w-auto"
              >
                Manage Settings
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Cookie Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Choose which cookies you want to accept. You can change these settings at any time.
            </p>

            {/* Necessary Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="necessary" className="text-base font-medium">
                  Strictly Necessary Cookies
                </Label>
                <Switch
                  id="necessary"
                  checked={preferences.necessary}
                  disabled
                  className="opacity-50"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Essential for the website to function. Cannot be disabled.
              </p>
            </div>

            {/* Performance Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="performance" className="text-base font-medium">
                  Performance Cookies
                </Label>
                <Switch
                  id="performance"
                  checked={preferences.performance}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, performance: checked }))
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Help us understand how visitors interact with our website.
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="functional" className="text-base font-medium">
                  Functional Cookies
                </Label>
                <Switch
                  id="functional"
                  checked={preferences.functional}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, functional: checked }))
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable enhanced functionality and personalization.
              </p>
            </div>

            {/* Targeting Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="targeting" className="text-base font-medium">
                  Targeting Cookies
                </Label>
                <Switch
                  id="targeting"
                  checked={preferences.targeting}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, targeting: checked }))
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Used for advertising and marketing purposes.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;