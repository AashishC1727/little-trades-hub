import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
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
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By accessing and using LITTLE little's platform, you accept and agree to be 
                  bound by these Terms and Conditions. If you do not agree to these terms, 
                  you may not use our services. These terms constitute a legal agreement 
                  between you and LITTLE little Ltd.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Service Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Trading Platform</h4>
                  <p className="text-muted-foreground">
                    LITTLE little provides an online trading platform that allows users to 
                    trade stocks, cryptocurrencies, and other financial instruments. Our 
                    platform is designed for both novice and experienced traders.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Educational Resources</h4>
                  <p className="text-muted-foreground">
                    We provide educational content, market analysis, and trading tools to 
                    help users make informed investment decisions. This content is for 
                    informational purposes only and does not constitute financial advice.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Account Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <p className="text-muted-foreground">
                    You must be at least 18 years old and have the legal capacity to enter 
                    into contracts. You must provide accurate and complete information during 
                    account registration and keep your account information updated.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Verification</h4>
                  <p className="text-muted-foreground">
                    We may require identity verification and additional documentation to 
                    comply with regulatory requirements. Trading limits may apply until 
                    verification is complete.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Account Security</h4>
                  <p className="text-muted-foreground">
                    You are responsible for maintaining the security of your account 
                    credentials and for all activities that occur under your account.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Trading Rules and Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Investment Risks</h4>
                  <p className="text-muted-foreground">
                    Trading financial instruments involves significant risk of loss. You 
                    acknowledge that you may lose some or all of your invested capital. 
                    Past performance does not guarantee future results.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Execution</h4>
                  <p className="text-muted-foreground">
                    We will use reasonable efforts to execute your trading orders, but we 
                    cannot guarantee execution at specific prices due to market volatility 
                    and liquidity conditions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Market Hours</h4>
                  <p className="text-muted-foreground">
                    Trading is available during market hours for each respective instrument. 
                    Orders placed outside market hours may be queued for execution when 
                    markets reopen.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Fees and Charges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Trading Fees</h4>
                  <p className="text-muted-foreground">
                    We charge competitive trading fees as outlined in our fee schedule. 
                    Fees may vary by instrument type and trading volume. All fees will 
                    be clearly disclosed before order execution.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Additional Charges</h4>
                  <p className="text-muted-foreground">
                    Additional charges may apply for premium features, data feeds, 
                    currency conversion, and withdrawal transactions. We reserve the 
                    right to modify our fee structure with reasonable notice.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Prohibited Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Use our platform for any illegal or unauthorized purpose</li>
                  <li>Manipulate markets or engage in fraudulent trading activities</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated trading systems without prior approval</li>
                  <li>Share your account credentials with third parties</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Service Availability</h4>
                  <p className="text-muted-foreground">
                    We strive to maintain platform availability but cannot guarantee 
                    uninterrupted service. We are not liable for losses resulting from 
                    system downtime, maintenance, or technical issues beyond our control.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Market Data</h4>
                  <p className="text-muted-foreground">
                    Market data and prices are provided by third-party sources. We are 
                    not responsible for the accuracy or timeliness of such information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Maximum Liability</h4>
                  <p className="text-muted-foreground">
                    Our total liability to you for any claims arising from your use of 
                    our platform shall not exceed the amount of fees paid by you in the 
                    12 months preceding the claim.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Account Suspension and Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Suspension</h4>
                  <p className="text-muted-foreground">
                    We may suspend your account if we suspect violations of these terms, 
                    regulatory requirements, or for security reasons. We will notify you 
                    of suspensions and provide an opportunity to address concerns.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Termination</h4>
                  <p className="text-muted-foreground">
                    Either party may terminate this agreement with reasonable notice. 
                    Upon termination, you must close all open positions and withdraw 
                    any remaining funds, subject to applicable regulations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Complaints Process</h4>
                  <p className="text-muted-foreground">
                    If you have a complaint, please contact our customer service team. 
                    We will investigate and respond to complaints within reasonable timeframes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Governing Law</h4>
                  <p className="text-muted-foreground">
                    These terms are governed by the laws of England and Wales. Any disputes 
                    will be subject to the exclusive jurisdiction of English courts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may modify these terms from time to time. We will notify you of material 
                  changes via email or platform notification. Continued use of our platform 
                  after changes constitutes acceptance of the updated terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms & Conditions, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> legal@littlelittle.com</p>
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

export default Terms;