import { Card, CardContent } from '@/components/ui/card';
import { X, Check, Clock, DollarSign, Users, Zap } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Slow Execution",
      description: "Orders take seconds to fill, missing opportunities"
    },
    {
      icon: DollarSign,
      title: "Hidden Fees",
      description: "Complex fee structures eating into profits"
    },
    {
      icon: Users,
      title: "Poor UX",
      description: "Complicated interfaces designed for experts only"
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Sub-millisecond execution with global liquidity"
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "Clear, competitive fees with no surprises"
    },
    {
      icon: Users,
      title: "Beautiful Design",
      description: "Intuitive interface that scales from beginner to pro"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trading Shouldn't Be This Hard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional platforms are stuck in the past. We're building the future of trading.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problems */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <X className="w-6 h-6 text-destructive mr-3" />
                The Old Way
              </h3>
              
              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <Card key={index} className="border-destructive/20 hover:border-destructive/40 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <problem.icon className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{problem.title}</h4>
                          <p className="text-muted-foreground">{problem.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Check className="w-6 h-6 text-success mr-3" />
                The LITTLE little Way
              </h3>
              
              <div className="space-y-6">
                {solutions.map((solution, index) => (
                  <Card key={index} className="border-success/20 hover:border-success/40 transition-colors hover:shadow-card hover:-translate-y-1 duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                          <solution.icon className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{solution.title}</h4>
                          <p className="text-muted-foreground">{solution.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 p-8 rounded-2xl border bg-gradient-subtle">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">10x</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Faster Execution</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">90%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Lower Fees</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Transparent</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;