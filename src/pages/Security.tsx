import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Key,
  Smartphone,
  Database,
  Globe,
  Users
} from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-centre mb-12">
            <h1 className="text-4xl font-bold mb-4">Security & Trust</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your security is our priority. Learn about the comprehensive measures we've implemented 
              to protect your funds, data, and trading activities on LITTLE little.
            </p>
          </div>

          {/* Security Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Bank-Level Security</h3>
                <p className="text-sm text-muted-foreground">
                  256-bit SSL encryption and military-grade security protocols
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">FCA Regulated</h3>
                <p className="text-sm text-muted-foreground">
                  Fully authorised and regulated by the Financial Conduct Authority
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-centre">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Fund Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Client funds segregated and protected under FSCS scheme
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Data Protection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-centre space-x-2">
                <Lock className="w-6 h-6" />
                <span>Data Protection & Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Data Encryption</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>256-bit AES encryption for data at rest</span>
                    </li>
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>TLS 1.3 encryption for data in transit</span>
                    </li>
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>End-to-end encryption for sensitive communications</span>
                    </li>
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Regular security audits and penetration testing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Privacy Controls</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>GDPR compliant data processing</span>
                    </li>
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Right to access, modify, and delete your data</span>
                    </li>
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Data minimisation and purpose limitation</span>
                    </li>
                    <li className="flex items-centre space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Third-party data sharing controls</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-centre space-x-2">
                <Key className="w-6 h-6" />
                <span>Account Security Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-centre space-x-3 mb-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Two-Factor Authentication</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    SMS, email, and authenticator app 2FA options to secure your account
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-centre space-x-3 mb-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Login Monitoring</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real-time alerts for suspicious login attempts and device changes
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-centre space-x-3 mb-3">
                    <Lock className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Session Management</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatic session timeout and remote device logout capabilities
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-centre space-x-3 mb-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">IP Whitelisting</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Restrict account access to specific IP addresses for enhanced security
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-centre space-x-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Withdrawal Limits</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configurable daily/monthly withdrawal limits and cooling-off periods
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-centre space-x-3 mb-3">
                    <Users className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Device Recognition</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted device management and new device verification process
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-centre space-x-2">
                <Server className="w-6 h-6" />
                <span>Infrastructure & Operational Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Technical Safeguards</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Multi-region data centres with 99.9% uptime SLA</li>
                    <li>• Real-time system monitoring and threat detection</li>
                    <li>• Automated backup and disaster recovery procedures</li>
                    <li>• Network intrusion detection and prevention systems</li>
                    <li>• Regular security patching and updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Operational Security</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• 24/7 security operations centre monitoring</li>
                    <li>• Multi-signature cold storage for digital assets</li>
                    <li>• Background-checked and trained security personnel</li>
                    <li>• Incident response and forensic investigation capabilities</li>
                    <li>• Regular third-party security assessments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Certifications */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Compliance & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-centre p-4 bg-muted/30 rounded-lg">
                  <Badge variant="secondary" className="mb-2">FCA Authorised</Badge>
                  <h4 className="font-semibold mb-2">UK Regulation</h4>
                  <p className="text-sm text-muted-foreground">
                    Fully regulated by the Financial Conduct Authority
                  </p>
                </div>

                <div className="text-centre p-4 bg-muted/30 rounded-lg">
                  <Badge variant="secondary" className="mb-2">SOC 2 Type II</Badge>
                  <h4 className="font-semibold mb-2">Security Controls</h4>
                  <p className="text-sm text-muted-foreground">
                    Independently audited security and availability controls
                  </p>
                </div>

                <div className="text-centre p-4 bg-muted/30 rounded-lg">
                  <Badge variant="secondary" className="mb-2">ISO 27001</Badge>
                  <h4 className="font-semibold mb-2">Information Security</h4>
                  <p className="text-sm text-muted-foreground">
                    International standard for information security management
                  </p>
                </div>

                <div className="text-centre p-4 bg-muted/30 rounded-lg">
                  <Badge variant="secondary" className="mb-2">GDPR Compliant</Badge>
                  <h4 className="font-semibold mb-2">Data Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    Full compliance with EU data protection regulations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Best Practices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Security Best Practices for Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">✓ Do</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Use a strong, unique password for your account</li>
                    <li>• Enable two-factor authentication</li>
                    <li>• Keep your contact information up to date</li>
                    <li>• Log out completely when using shared devices</li>
                    <li>• Regularly review your account activity</li>
                    <li>• Report suspicious activity immediately</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-700">✗ Don't</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Share your login credentials with anyone</li>
                    <li>• Use public Wi-Fi for trading activities</li>
                    <li>• Click links in suspicious emails</li>
                    <li>• Save passwords in browsers on shared devices</li>
                    <li>• Ignore security alerts or notifications</li>
                    <li>• Use easily guessable security questions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Security Issues */}
          <Card>
            <CardHeader>
              <CardTitle>Report Security Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-orange-900 mb-2">Found a Security Vulnerability?</h4>
                    <p className="text-sm text-orange-800 mb-4">
                      We take security seriously and appreciate responsible disclosure. 
                      If you've discovered a security vulnerability, please report it through our secure channel.
                    </p>
                    <div className="space-y-2 text-sm text-orange-800">
                      <p><strong>Email:</strong> Ashish.choudhary@littlelittle.com</p>
                      <p><strong>PGP Key:</strong> Available upon request</p>
                      <p><strong>Response Time:</strong> Within 24 hours</p>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Report Vulnerability
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;