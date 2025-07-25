import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>How LITTLE little Uses Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  LITTLE little uses cookies and similar technologies to enhance your 
                  experience on our platform, provide personalized content, analyze 
                  website traffic, and ensure security. This policy explains what 
                  cookies are, how we use them, and how you can manage your preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your device when you 
                  visit a website. They contain information that helps websites remember 
                  your preferences, login status, and other settings to improve your 
                  browsing experience.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Types of Cookies We Use:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                    <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period</li>
                    <li><strong>First-Party Cookies:</strong> Cookies set directly by LITTLE little</li>
                    <li><strong>Third-Party Cookies:</strong> Cookies set by external service providers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Your Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Cookie Preferences Center</h4>
                  <p className="text-muted-foreground">
                    You can manage your cookie preferences through our cookie banner 
                    that appears when you first visit our site, or by accessing your 
                    cookie settings in your account preferences.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Browser Settings</h4>
                  <p className="text-muted-foreground">
                    Most browsers allow you to control cookies through their settings. 
                    You can choose to accept, reject, or delete cookies. However, 
                    disabling certain cookies may affect the functionality of our platform.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Opt-Out Links</h4>
                  <p className="text-muted-foreground">
                    For third-party advertising cookies, you can opt out through 
                    industry opt-out pages or directly through the third-party provider's 
                    privacy settings.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strictly Necessary Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  These cookies are essential for the website to function and cannot be 
                  disabled. They enable core functionality such as security, network 
                  management, and accessibility.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Authentication Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your login status and keep your account secure
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Security Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Protect against unauthorized access and fraudulent activity
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Load Balancing Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure optimal performance and distribute server load
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Cookie Consent Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your cookie preferences and consent choices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  These cookies collect information about how you use our website to 
                  help us improve performance and user experience.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Track page views, user interactions, and website performance metrics
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Error Reporting Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us identify and fix technical issues and bugs
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">A/B Testing Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable testing of different features and user interface elements
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  We work with trusted third-party partners who may set cookies to 
                  provide services on our behalf.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Payment Processors</h4>
                    <p className="text-sm text-muted-foreground">
                      Secure payment processing and fraud prevention (Stripe, PayPal)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Analytics Providers</h4>
                    <p className="text-sm text-muted-foreground">
                      Website analytics and user behavior analysis (Google Analytics)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Customer Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Live chat and customer support functionality (Intercom, Zendesk)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Social Media Platforms</h4>
                    <p className="text-sm text-muted-foreground">
                      Social sharing and integration features (Twitter, LinkedIn)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Functional Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  These cookies enable enhanced functionality and personalization to 
                  improve your user experience.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Personalization Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your preferences for language, currency, and interface settings
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Trading Preferences</h4>
                    <p className="text-sm text-muted-foreground">
                      Save your trading dashboard layout and watchlist configurations
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Geographic Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide location-appropriate content and regulatory information
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Targeting Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  These cookies are used to deliver advertisements and marketing content 
                  that may be relevant to you and your interests.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Advertising Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Display relevant ads based on your interests and browsing behavior
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Retargeting Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Show you relevant ads when you visit other websites
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Social Media Advertising</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable targeted advertising on social media platforms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Updates to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes 
                  in our practices or for other operational, legal, or regulatory reasons. 
                  We will notify you of any material changes by posting the updated policy 
                  on our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, 
                  please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@littlelittle.com</p>
                  <p><strong>Address:</strong> LITTLE little Ltd, London, United Kingdom</p>
                  <p><strong>Phone:</strong> +44 7766 081465</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;