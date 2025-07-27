import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEnhancedWaitlist } from '@/hooks/useEnhancedWaitlist';
import { Check, Loader2, Mail, Users, Gift } from 'lucide-react';

interface EnhancedWaitlistFormProps {
  onSuccess?: () => void;
  showTitle?: boolean;
  compact?: boolean;
}

export const EnhancedWaitlistForm: React.FC<EnhancedWaitlistFormProps> = ({
  onSuccess,
  showTitle = true,
  compact = false
}) => {
  const [formData, setFormData] = useState({
    email: '',
    interest: '',
    referral_code: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { loading, success, joinWaitlist, resetForm } = useEnhancedWaitlist();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const result = await joinWaitlist(formData);
    
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  const handleReset = () => {
    setFormData({ email: '', interest: '', referral_code: '' });
    setErrors({});
    resetForm();
  };

  if (success) {
    return (
      <Card className={compact ? 'border-green-200 bg-green-50' : ''}>
        <CardContent className={compact ? 'p-4' : 'p-6'}>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">You're on the list!</h3>
              <p className="text-sm text-green-700 mt-1">
                We'll notify you as soon as LITTLE little is ready.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Join Another Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showTitle && (
        <CardHeader className={compact ? 'pb-2' : ''}>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Join the Waitlist
          </CardTitle>
          <CardDescription>
            Get early access to LITTLE little and be among the first to experience the future of trading.
          </CardDescription>
        </CardHeader>
      )}
      
      <CardContent className={compact ? 'p-4' : ''}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">What interests you most?</Label>
            <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your interest (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trader">Trading & Investing</SelectItem>
                <SelectItem value="collector">Collectibles & NFTs</SelectItem>
                <SelectItem value="investor">Long-term Investing</SelectItem>
                <SelectItem value="p2p">Peer-to-Peer Trading</SelectItem>
                <SelectItem value="curious">Just Curious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="referral" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Referral Code
            </Label>
            <Input
              id="referral"
              placeholder="Enter referral code (optional)"
              value={formData.referral_code}
              onChange={(e) => setFormData({ ...formData, referral_code: e.target.value })}
            />
          </div>

          <Separator />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
            size={compact ? 'default' : 'lg'}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              'Join Waitlist'
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By joining, you agree to receive updates about LITTLE little. You can unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};