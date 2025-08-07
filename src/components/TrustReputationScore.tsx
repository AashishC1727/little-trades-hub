import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Shield, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  User,
  Award,
  Target
} from 'lucide-react';

interface TrustMetrics {
  rating: number;
  totalReviews: number;
  verified: boolean;
  responseTime: number; // in hours
  successfulTrades: number;
  trustScore: number; // 0-100
}

interface TrustReputationScoreProps {
  userName: string;
  avatarUrl?: string;
  metrics: TrustMetrics;
  size?: 'small' | 'medium' | 'large';
}

export const TrustReputationScore: React.FC<TrustReputationScoreProps> = ({
  userName,
  avatarUrl,
  metrics,
  size = 'medium'
}) => {
  const getTrustColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrustBadge = (score: number) => {
    if (score >= 85) return { label: 'Elite Trader', color: 'bg-green-500' };
    if (score >= 70) return { label: 'Trusted', color: 'bg-blue-500' };
    if (score >= 50) return { label: 'Verified', color: 'bg-yellow-500' };
    return { label: 'New Trader', color: 'bg-gray-500' };
  };

  const getResponseTimeColor = (hours: number) => {
    if (hours <= 2) return 'text-green-600';
    if (hours <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatResponseTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${Math.round(hours)}h`;
    return `${Math.round(hours / 24)}d`;
  };

  const trustBadge = getTrustBadge(metrics.trustScore);

  if (size === 'small') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {metrics.verified && <CheckCircle className="h-3 w-3 text-green-600" />}
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium">{metrics.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({metrics.totalReviews})</span>
        </div>
        <Badge 
          variant="outline" 
          className={`text-xs ${getTrustColor(metrics.trustScore)}`}
        >
          {metrics.trustScore}%
        </Badge>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt={userName} className="w-8 h-8 rounded-full" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <div className="font-medium text-sm flex items-center gap-1">
                {userName}
                {metrics.verified && <CheckCircle className="h-3 w-3 text-green-600" />}
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${trustBadge.color} text-white border-none`}
              >
                <Award className="h-3 w-3 mr-1" />
                {trustBadge.label}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${getTrustColor(metrics.trustScore)}`}>
              {metrics.trustScore}%
            </div>
            <div className="text-xs text-muted-foreground">Trust Score</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">{metrics.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({metrics.totalReviews} reviews)</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= metrics.rating 
                      ? 'text-yellow-500 fill-current' 
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Clock className={`h-3 w-3 ${getResponseTimeColor(metrics.responseTime)}`} />
              <span className="text-muted-foreground">Response:</span>
              <span className={`font-medium ${getResponseTimeColor(metrics.responseTime)}`}>
                {formatResponseTime(metrics.responseTime)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3 text-green-600" />
              <span className="text-muted-foreground">Trades:</span>
              <span className="font-medium text-green-600">{metrics.successfulTrades}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Trust Level</span>
              <span className="text-xs font-medium">{trustBadge.label}</span>
            </div>
            <div className="relative">
              <Progress value={metrics.trustScore} className="h-2" />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${trustBadge.color}`}
                style={{ width: `${metrics.trustScore}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {metrics.verified && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                ID Verified
              </Badge>
            )}
            {metrics.successfulTrades >= 10 && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                10+ Trades
              </Badge>
            )}
            {metrics.responseTime <= 2 && (
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                <Clock className="h-3 w-3 mr-1" />
                Fast Reply
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};