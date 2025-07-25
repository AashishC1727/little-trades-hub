import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
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
                <CardTitle>Our Commitment to Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  LITTLE little is committed to ensuring that our trading platform is 
                  accessible to all users, including those with disabilities. We believe 
                  that everyone should have equal access to financial markets and trading 
                  opportunities, regardless of their abilities or the assistive technologies 
                  they use.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 
                  Level AA standards. These guidelines help ensure that web content is 
                  accessible to a wide range of people with disabilities.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Standards We Follow:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                    <li>EN 301 549 - European Standard for Digital Accessibility</li>
                    <li>Section 508 of the Rehabilitation Act (US)</li>
                    <li>UK Equality Act 2010</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Keyboard Navigation</h4>
                  <p className="text-muted-foreground">
                    Our platform is fully navigable using only a keyboard. All interactive 
                    elements can be accessed using Tab, Enter, and arrow keys. Skip links 
                    are provided to jump to main content areas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Screen Reader Compatibility</h4>
                  <p className="text-muted-foreground">
                    We ensure compatibility with popular screen readers including JAWS, 
                    NVDA, and VoiceOver. All images have appropriate alt text, and complex 
                    data tables include proper headers and descriptions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Visual Accessibility</h4>
                  <p className="text-muted-foreground">
                    High contrast color schemes, resizable text up to 200%, and clear focus 
                    indicators help users with visual impairments. Color is never the only 
                    way information is conveyed.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Motor Accessibility</h4>
                  <p className="text-muted-foreground">
                    Large click targets, drag-and-drop alternatives, and customizable 
                    interface layouts accommodate users with motor impairments. Time limits 
                    can be extended or disabled where possible.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assistive Technology Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Supported Technologies</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>Screen Readers:</strong> JAWS, NVDA, VoiceOver, TalkBack</li>
                    <li><strong>Voice Recognition:</strong> Dragon NaturallySpeaking, Windows Speech Recognition</li>
                    <li><strong>Switch Navigation:</strong> Switch access devices and software</li>
                    <li><strong>Magnification:</strong> ZoomText, Windows Magnifier, macOS Zoom</li>
                    <li><strong>Alternative Keyboards:</strong> On-screen keyboards, adaptive keyboards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Browser Compatibility</h4>
                  <p className="text-muted-foreground">
                    Our platform works with modern browsers including Chrome, Firefox, 
                    Safari, and Edge with accessibility features enabled. We recommend 
                    keeping browsers updated for the best experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading-Specific Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Chart and Graph Accessibility</h4>
                  <p className="text-muted-foreground">
                    Trading charts include text alternatives and data tables for screen 
                    readers. Audio cues and haptic feedback are available for price alerts 
                    and market movements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Management</h4>
                  <p className="text-muted-foreground">
                    Order forms are clearly labeled and include validation messages. 
                    Confirmation dialogs provide clear descriptions of trading actions 
                    before execution.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Portfolio Overview</h4>
                  <p className="text-muted-foreground">
                    Portfolio data is presented in accessible tables with sort functionality 
                    and clear headings. Performance indicators are described in text format 
                    alongside visual representations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Known Limitations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  While we strive for full accessibility, some areas may have limitations:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Complex real-time charts may require alternative data views for full accessibility</li>
                  <li>Some third-party content or embedded widgets may not meet our accessibility standards</li>
                  <li>Advanced trading tools may require additional keyboard shortcuts to access all features</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We are actively working to address these limitations in future updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ongoing Improvements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Regular Testing</h4>
                  <p className="text-muted-foreground">
                    We conduct regular accessibility audits using automated tools and 
                    manual testing with assistive technologies. User testing with disabled 
                    users helps us identify and address real-world accessibility barriers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Training and Awareness</h4>
                  <p className="text-muted-foreground">
                    Our development team receives regular training on accessibility best 
                    practices and inclusive design principles. Accessibility considerations 
                    are integrated into our design and development processes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Feature Development</h4>
                  <p className="text-muted-foreground">
                    New features are designed with accessibility in mind from the beginning. 
                    We prioritize accessibility fixes and improvements in our development roadmap.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback and Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Report Accessibility Issues</h4>
                  <p className="text-muted-foreground">
                    If you encounter accessibility barriers while using our platform, 
                    please contact us. We appreciate your feedback and will work to 
                    address issues promptly.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Alternative Access Methods</h4>
                  <p className="text-muted-foreground">
                    If you cannot access certain features due to accessibility barriers, 
                    our customer support team can provide alternative ways to complete 
                    tasks, such as phone-based trading or email support.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Time</h4>
                  <p className="text-muted-foreground">
                    We aim to respond to accessibility feedback within 2 business days 
                    and provide resolution timelines based on the severity of the issue.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For accessibility support or to report accessibility issues, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> accessibility@littlelittle.com</p>
                  <p><strong>Phone:</strong> +44 7766 081465</p>
                  <p><strong>Address:</strong> LITTLE little Ltd, London, United Kingdom</p>
                  <p><strong>Customer Support:</strong> Available 24/7 for accessibility assistance</p>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  When contacting us about accessibility, please include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                  <li>Description of the accessibility barrier</li>
                  <li>The assistive technology you're using</li>
                  <li>Your browser and operating system</li>
                  <li>The specific page or feature affected</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Accessibility;