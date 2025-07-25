import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import stockIllustration from "@/assets/stock-illustration.svg";
import etfIllustration from "@/assets/etf-illustration.svg";

export const WelcomeSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">Updated February 17, 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Welcome: Investing 101
          </h1>
          
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center">
                <span className="text-background font-bold text-sm">ll</span>
              </div>
              <span className="font-medium">little little Learn</span>
            </div>
            <p className="text-lg font-medium">Democratize Finance For All.</p>
          </div>

          <Card className="bg-muted/30 border-border/50 mb-12">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Takeaway</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Figuring out how much and where to invest is a personal decision.</li>
                <li>• At little little, you can start investing for as little as $1.</li>
              </ul>
            </CardContent>
          </Card>

          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            The goal of investing is to grow your money for the future. Whatever you dream of—buying a home, 
            going on vacation, or retiring—investing is likely to play an important part in your journey.
          </p>
        </div>

        {/* What can I invest in section */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold">What can I invest in?</h2>
          
          <p className="text-lg text-muted-foreground">
            On little little, you may invest in stocks, exchange-traded funds (ETFs) and more, all commission-free.
          </p>

          {/* Stocks Section */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <img 
                src={stockIllustration} 
                alt="Stock illustration" 
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A stock is a unit of ownership in a company. If you own a stock, that makes you a shareholder. 
                As a shareholder, you may receive dividends, or periodic distributions of profit, if the company succeeds. 
                You might also have a vote in some company decisions. Depending on the company's performance and other factors, 
                the value of your investment may change.
              </p>
            </div>
          </div>

          {/* ETFs Section */}
          <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <img 
                src={etfIllustration} 
                alt="ETF illustration" 
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                An exchange-traded fund is like an investment smoothie. Rather than picking individual ingredients, 
                an investor might opt for one of these ready-made mixtures. There are many flavors of ETFs, spanning 
                different types of companies and sectors. These investment products are typically packaged and managed 
                by financial professionals, so there's usually a fee associated with investing in an ETF.
              </p>
            </div>
          </div>

          {/* Why invest section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why invest?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The US stock market has been resilient and grown in value over the last 100 years. 
              This is demonstrated by the S&P 500, which is kind of like a scoreboard that tracks 
              500 of the largest, publicly-traded US companies.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center pt-12">
            <Button size="lg" className="group">
              Start Investing with little little
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};