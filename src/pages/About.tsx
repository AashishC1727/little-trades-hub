import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Globe, Shield, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About LITTLE little
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're democratizing access to financial markets by making trading and investing 
            accessible to everyone, regardless of their background or experience level.
          </p>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At LITTLE little, we believe that everyone deserves access to financial 
                opportunities. Traditional trading platforms often exclude people with 
                high minimum deposits, complex interfaces, and limited educational resources.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're changing that by building a platform where you can start with as 
                little as $1, learn as you go, and trade everything from stocks and crypto 
                to alternative assets like collectibles and commodities.
              </p>
              <Button size="lg">Join Our Mission</Button>
            </div>
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Accessible Trading</h3>
                    <p className="text-sm text-muted-foreground">Start with just $1</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community Driven</h3>
                    <p className="text-sm text-muted-foreground">Learn from experts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Global Markets</h3>
                    <p className="text-sm text-muted-foreground">Trade worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Problems We Solve */}
        <section className="py-16 bg-muted/30 rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Problems We're Solving</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional financial services leave millions of people behind. 
              We're building bridges to close these gaps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-semibold mb-2">High Barriers to Entry</h3>
                <p className="text-sm text-muted-foreground">
                  Most platforms require thousands to start. We start at $1.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2">Complex Interfaces</h3>
                <p className="text-sm text-muted-foreground">
                  Trading shouldn't require a finance degree. Our platform is intuitive.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Limited Education</h3>
                <p className="text-sm text-muted-foreground">
                  We provide education, tools, and community support for every user.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-muted-foreground">
                  No hidden fees, no confusing terms. Everything is clear and upfront.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Financial markets should be open to everyone, regardless of wealth or experience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-muted-foreground">
                  We believe in empowering users with knowledge and tools to make informed decisions.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly pushing boundaries to create better trading experiences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="text-muted-foreground">
                  Your assets and data are protected with bank-level security measures.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We're building more than a platform – we're fostering a community of traders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why We Exist</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The financial world has been dominated by institutions for too long. 
              Technology has democratized information, communication, and commerce – 
              now it's time to democratize finance.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We exist because we believe that a single mother saving $10 a month 
              deserves the same investment opportunities as a hedge fund manager. 
              We exist because a student with $50 should be able to learn about 
              markets just as easily as someone with $50,000.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              LITTLE little isn't just about trading – it's about creating opportunities, 
              building wealth, and empowering the next generation of investors.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Journey
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;