import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, BookOpen, Calculator, Shield } from "lucide-react";
import investingBasics from "@/assets/investing-basics.jpg";
import optionsGuide from "@/assets/options-guide.jpg";
import futuresExplained from "@/assets/futures-explained.jpg";

const topics = [
  {
    title: "Investing Basics",
    description: "Learn the fundamentals of investing and building wealth",
    icon: TrendingUp,
    image: investingBasics,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Options",
    description: "Master options strategies and risk management",
    icon: BarChart3,
    image: optionsGuide,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    title: "Futures",
    description: "Understand futures markets and trading techniques",
    icon: Target,
    image: futuresExplained,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Market Analysis",
    description: "Technical and fundamental analysis techniques",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Portfolio Management",
    description: "Diversification and risk management strategies",
    icon: Calculator,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    title: "Risk Management",
    description: "Protect your capital with proven strategies",
    icon: Shield,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
];

export const TopicGrid = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From beginner fundamentals to advanced trading strategies, we have courses for every level
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <Card 
                key={topic.title} 
                className="group hover:shadow-lg transition-all duration-300 hover-scale cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {topic.image && (
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={topic.image} 
                      alt={topic.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg ${topic.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${topic.color}`} />
                  </div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};