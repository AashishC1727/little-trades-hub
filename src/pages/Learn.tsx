import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import revenueIllustration from "@/assets/revenue-illustration.svg";
import dividendIllustration from "@/assets/dividend-illustration.png";
import balanceSheetIllustration from "@/assets/balance-sheet-illustration.svg";
import ipoIllustration from "@/assets/ipo-illustration.svg";
import stockIllustration from "@/assets/stock-illustration.svg";
import etfIllustration from "@/assets/etf-illustration.svg";

const Learn = () => {
  const welcomeArticle = {
    title: "Welcome: Investing 101",
    excerpt: "The goal of investing is to grow your money for the future. Whatever you dream of—buying a home, going on vacation, or retiring—investing is likely to play an important part in your journey.",
    link: "/learn/welcome-investing-101",
    date: "Updated Feb 17, 2025",
    category: "little little Learn"
  };

  const featuredArticles = [
    {
      image: revenueIllustration,
      title: "What is Revenue?",
      excerpt: "Revenue is like the pool into which companies pour all their gains. Unlike profit, revenue stays in the pool for accounting purposes even if a company spends it, and has no relationship with a business's expenses.",
      link: "/learn/revenue",
      date: "Updated Jul 15, 2025",
      category: "little little Learn"
    },
    {
      image: dividendIllustration,
      title: "What is Dividend Yield?",
      excerpt: "Dividend yield is like a stock's bang for your buck… It's a ratio comparing the income an investor gets from holding a stock (that pays dividends) to the price of that stock, shown as a percentage.",
      link: "/learn/dividend-yield",
      date: "Updated Jun 17, 2025", 
      category: "little little Learn"
    },
    {
      image: balanceSheetIllustration,
      title: "What is a Balance Sheet?",
      excerpt: "A balance sheet is like taking a financial portrait of a company with a polaroid camera... It's a snapshot, taken at one point in time, that helps capture a company's health by showing the value of its assets, liabilities, and shareholders' equity.",
      link: "/learn/balance-sheet",
      date: "Updated May 05, 2025",
      category: "little little Learn"
    },
    {
      image: ipoIllustration,
      title: "What is an Initial Public Offering (IPO)?",
      excerpt: "An IPO is like a company's debut on the stock market stage... It's the first time a private company offers shares to the public, transitioning from a privately-held company to a publicly-traded one.",
      link: "/learn/ipo",
      date: "Updated Apr 22, 2025",
      category: "little little Learn"
    },
    {
      image: stockIllustration,
      title: "What are Stocks?",
      excerpt: "A stock is a unit of ownership in a company. If you own a stock, that makes you a shareholder. As a shareholder, you may receive dividends, or periodic distributions of profit, if the company succeeds.",
      link: "/learn/stocks",
      date: "Updated Mar 15, 2025",
      category: "little little Learn"
    },
    {
      image: etfIllustration,
      title: "What are ETFs?",
      excerpt: "An exchange-traded fund is like an investment smoothie. Rather than picking individual ingredients, an investor might opt for one of these ready-made mixtures.",
      link: "/learn/etfs",
      date: "Updated Feb 28, 2025",
      category: "little little Learn"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section - Robinhood Style */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Library</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Explore the library
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12">
              Investing basics—in plain English.
            </p>
          </div>
        </section>

        {/* Featured Welcome Article */}
        <section className="pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Start Here</h2>
              <p className="text-muted-foreground">New to investing? Begin with the basics.</p>
            </div>
            
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 border border-border/50">
              <ArticleCard
                title={welcomeArticle.title}
                excerpt={welcomeArticle.excerpt}
                link={welcomeArticle.link}
                category={welcomeArticle.category}
                date={welcomeArticle.date}
              />
            </div>
          </div>
        </section>

        {/* Articles Grid - Robinhood Style */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Popular Articles</h2>
              <p className="text-muted-foreground">Learn the fundamentals of investing and trading.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  image={article.image}
                  title={article.title}
                  excerpt={article.excerpt}
                  link={article.link}
                  category={article.category}
                  date={article.date}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Learn;