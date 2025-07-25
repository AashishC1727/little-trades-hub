import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <p className="text-muted-foreground">
                    We collect information you provide directly to us, including your name, 
                    email address, phone number, date of birth, address, and financial information 
                    necessary to provide our trading services.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage Information</h4>
                  <p className="text-muted-foreground">
                    We automatically collect information about your interactions with our platform, 
                    including trading activity, account transactions, login times, and device information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information</h4>
                  <p className="text-muted-foreground">
                    We collect IP addresses, browser types, operating systems, referring URLs, 
                    and other technical information to improve our services and ensure security.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Service Provision</h4>
                  <p className="text-muted-foreground">
                    We use your information to provide, maintain, and improve our trading platform, 
                    execute transactions, and provide customer support.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Legal Compliance</h4>
                  <p className="text-muted-foreground">
                    We process your information to comply with legal obligations, including 
                    anti-money laundering (AML) and know your customer (KYC) requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Communication</h4>
                  <p className="text-muted-foreground">
                    We may use your contact information to send important account notifications, 
                    security alerts, and service updates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Service Providers</h4>
                  <p className="text-muted-foreground">
                    We share information with trusted third-party service providers who assist 
                    in operating our platform, including payment processors, identity verification 
                    services, and cloud hosting providers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Legal Requirements</h4>
                  <p className="text-muted-foreground">
                    We may disclose information when required by law, court order, or to protect 
                    our rights, property, or safety, or that of our users or the public.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Business Transfers</h4>
                  <p className="text-muted-foreground">
                    In the event of a merger, acquisition, or sale of assets, your information 
                    may be transferred as part of the business transaction.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Storage</h4>
                  <p className="text-muted-foreground">
                    Your data is stored on secure servers located in the European Union and 
                    United Kingdom, with appropriate technical and organizational measures in place.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Measures</h4>
                  <p className="text-muted-foreground">
                    We employ industry-standard security measures including encryption, 
                    access controls, and regular security audits to protect your information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Retention</h4>
                  <p className="text-muted-foreground">
                    We retain your information for as long as necessary to provide our services 
                    and comply with legal obligations, typically for 5-7 years after account closure.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Access and Portability</h4>
                  <p className="text-muted-foreground">
                    You have the right to access your personal data and request a copy in a 
                    structured, machine-readable format.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Correction and Deletion</h4>
                  <p className="text-muted-foreground">
                    You can request correction of inaccurate data or deletion of your personal 
                    information, subject to legal and regulatory requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Opt-Out</h4>
                  <p className="text-muted-foreground">
                    You can opt out of marketing communications at any time by following 
                    unsubscribe instructions or contacting us directly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. International Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries outside 
                  the UK/EU. We ensure appropriate safeguards are in place, including 
                  adequacy decisions and standard contractual clauses approved by the 
                  European Commission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Updates to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of 
                  any material changes by posting the new policy on our website and, where 
                  appropriate, by email notification.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@littlelittle.com</p>
                  <p><strong>Address:</strong> LITTLE little Ltd, London, United Kingdom</p>
                  <p><strong>Data Protection Officer:</strong> dpo@littlelittle.com</p>
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

export default PrivacyPolicy;