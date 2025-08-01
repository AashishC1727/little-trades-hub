import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TradeHealthMeterProps {
  offeredAsset: string;
  wantedAsset: string;
  offeredValue?: number;
  wantedValue?: number;
  category: string;
}

export const TradeHealthMeter: React.FC<TradeHealthMeterProps> = ({
  offeredAsset,
  wantedAsset,
  offeredValue,
  wantedValue,
  category
}) => {
  // Calculate fairness score (0-100)
  const calculateFairnessScore = () => {
    let score = 50; // Base score
    
    // Value comparison (if both values are provided)
    if (offeredValue && wantedValue) {
      const ratio = Math.min(offeredValue, wantedValue) / Math.max(offeredValue, wantedValue);
      score = ratio * 100;
    }
    
    // Category volatility adjustment
    const volatilityScores: Record<string, number> = {
      crypto: -20,
      stock: -10,
      currency: -5,
      collectible: 10,
      other: 0
    };
    
    score += volatilityScores[category] || 0;
    
    // Current demand simulation (random for demo)
    const demandBonus = Math.random() * 20 - 10;
    score += demandBonus;
    
    return Math.max(0, Math.min(100, score));
  };

  const fairnessScore = calculateFairnessScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const getProgressColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="bg-muted/20 border-border/40">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Fairness Score</span>
          <Badge variant="outline" className={`text-xs ${getScoreColor(fairnessScore)}`}>
            {getScoreLabel(fairnessScore)}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{Math.round(fairnessScore)}%</span>
            {fairnessScore >= 75 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : fairnessScore >= 50 ? (
              <Minus className="h-4 w-4 text-yellow-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
          
          <div className="relative">
            <Progress value={fairnessScore} className="h-2" />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(fairnessScore)}`}
              style={{ width: `${fairnessScore}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground">
            <div className="text-center">
              <div className="text-red-500">Poor</div>
              <div>0-49%</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-500">Fair</div>
              <div>50-74%</div>
            </div>
            <div className="text-center">
              <div className="text-green-500">Excellent</div>
              <div>75-100%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};