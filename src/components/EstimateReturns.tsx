import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, BarChart3 } from 'lucide-react';

interface FormData {
  assetType: string;
  initialInvestment: number;
  duration: number;
  expectedReturn: number;
  monthlyContribution: number;
  exitCost: number;
}

interface Result {
  projectedValue: number;
  totalReturn: number;
  returnPercentage: number;
  chartData: Array<{ year: number; value: number }>;
}

const assetReturns = {
  'Crypto': 13.9,
  'Stocks': 7.5,
  'Real Estate': 5.2,
  'Whisky': 10.1,
  'Art': 6.7,
  'NFTs': 0.5,
  'Startups': 15.0,
  'Commodities': 3.5,
  'Sneakers': 4.2
};

export const EstimateReturns = () => {
  const [formData, setFormData] = useState<FormData>({
    assetType: '',
    initialInvestment: 0,
    duration: 0,
    expectedReturn: 0,
    monthlyContribution: 0,
    exitCost: 0
  });
  const [result, setResult] = useState<Result | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAssetTypeChange = (value: string) => {
    const expectedReturn = assetReturns[value as keyof typeof assetReturns] || 0;
    setFormData(prev => ({
      ...prev,
      assetType: value,
      expectedReturn
    }));
  };

  const calculateReturns = () => {
    const { initialInvestment, duration, expectedReturn, monthlyContribution, exitCost } = formData;
    
    if (!initialInvestment || !duration || !expectedReturn) return;

    const monthlyRate = expectedReturn / 100 / 12;
    const months = duration * 12;
    
    // Calculate compound growth with monthly contributions
    let projectedValue = initialInvestment;
    const chartData = [];
    
    for (let year = 0; year <= duration; year++) {
      if (year === 0) {
        chartData.push({ year, value: initialInvestment });
      } else {
        const yearlyGrowth = projectedValue * (1 + expectedReturn / 100);
        const monthlyAdditions = monthlyContribution * 12 * (1 + expectedReturn / 100 / 2); // Average growth on contributions
        projectedValue = yearlyGrowth + monthlyAdditions;
        chartData.push({ year, value: Math.round(projectedValue) });
      }
    }

    // Apply exit costs
    const finalValue = projectedValue * (1 - exitCost / 100);
    const totalContributed = initialInvestment + (monthlyContribution * months);
    const totalReturn = finalValue - totalContributed;
    const returnPercentage = (totalReturn / totalContributed) * 100;

    setResult({
      projectedValue: finalValue,
      totalReturn,
      returnPercentage,
      chartData
    });
    setShowResults(true);
  };

  const resetForm = () => {
    setFormData({
      assetType: '',
      initialInvestment: 0,
      duration: 0,
      expectedReturn: 0,
      monthlyContribution: 0,
      exitCost: 0
    });
    setResult(null);
    setShowResults(false);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Estimate Your Returns
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check if your investments will stay LITTLE or grow a little BIG?
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Investment Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assetType">Asset Type</Label>
                      <Select value={formData.assetType} onValueChange={handleAssetTypeChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(assetReturns).map((asset) => (
                            <SelectItem key={asset} value={asset}>
                              {asset}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="initialInvestment">Initial Investment (£)</Label>
                      <Input
                        id="initialInvestment"
                        type="number"
                        value={formData.initialInvestment || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          initialInvestment: Number(e.target.value)
                        }))}
                        placeholder="10000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Investment Duration (Years)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="50"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          duration: Number(e.target.value)
                        }))}
                        placeholder="5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                      <Input
                        id="expectedReturn"
                        type="number"
                        step="0.1"
                        value={formData.expectedReturn || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          expectedReturn: Number(e.target.value)
                        }))}
                        placeholder="7.5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution">Monthly Contribution (£) <span className="text-muted-foreground text-sm">(Optional)</span></Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        value={formData.monthlyContribution || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          monthlyContribution: Number(e.target.value)
                        }))}
                        placeholder="500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exitCost">One-Time Exit Cost / Fees (%) <span className="text-muted-foreground text-sm">(Optional)</span></Label>
                      <Input
                        id="exitCost"
                        type="number"
                        step="0.1"
                        value={formData.exitCost || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          exitCost: Number(e.target.value)
                        }))}
                        placeholder="2.5"
                      />
                    </div>
                  </div>

                  <Button onClick={calculateReturns} className="w-full" size="lg">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Estimate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className={`transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-50'}`}
            >
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Projected Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {result ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold">£{result.projectedValue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Portfolio Value</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            £{result.totalReturn.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Return ({result.returnPercentage.toFixed(1)}%)
                          </div>
                        </div>
                      </div>

                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={result.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: number) => [`£${value.toLocaleString()}`, 'Portfolio Value']}
                              labelFormatter={(label) => `Year ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              dot={{ fill: "hsl(var(--primary))" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {formData.assetType && (
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Based on historical trends, {formData.assetType} averaged {formData.expectedReturn}% over the last 5 years.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              Want to learn more?
                            </Button>
                            <Button variant="outline" size="sm">
                              Compare to holding cash?
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <Button onClick={resetForm} variant="outline">
                          Try Another Asset
                        </Button>
                        <Button variant="outline">
                          Add to Watchlist
                        </Button>
                        <Button>
                          Sign up to track this
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Fill out the form to see your estimated returns
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};