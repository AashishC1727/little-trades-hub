import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Upload, 
  FileText, 
  Clock, 
  Shield, 
  CheckCircle,
  User,
  MessageSquare,
  Gavel
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DisputeStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp?: string;
}

interface DisputeResolutionProps {
  tradeId: string;
  showDispute?: boolean;
}

export const DisputeResolution: React.FC<DisputeResolutionProps> = ({ 
  tradeId, 
  showDispute = false 
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [disputeData, setDisputeData] = useState({
    reason: '',
    description: '',
    evidence: ''
  });
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const disputeSteps: DisputeStep[] = [
    {
      id: '1',
      title: 'Dispute Filed',
      description: 'Dispute has been submitted and is under review',
      status: disputeSubmitted ? 'completed' : 'pending',
      timestamp: disputeSubmitted ? new Date().toISOString() : undefined
    },
    {
      id: '2',
      title: 'Evidence Review',
      description: 'AI and human moderators review submitted evidence',
      status: disputeSubmitted ? 'in-progress' : 'pending'
    },
    {
      id: '3',
      title: 'Mediation',
      description: 'Attempting to resolve dispute through mediation',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Final Verdict',
      description: 'Resolution decision and any required actions',
      status: 'pending'
    }
  ];

  const handleDisputeSubmit = () => {
    if (!disputeData.reason || !disputeData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide a reason and description for the dispute.",
        variant: "destructive"
      });
      return;
    }

    setDisputeSubmitted(true);
    setCurrentStep(1);
    setIsDialogOpen(false);

    toast({
      title: "Dispute Filed Successfully",
      description: "Your dispute has been submitted. Expected resolution: 24 hours",
    });
  };

  const getStepIcon = (step: DisputeStep, index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (step.status === 'in-progress') {
      return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />;
    } else {
      return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />;
    }
  };

  const getProgressPercentage = () => {
    const completedSteps = disputeSteps.filter(step => step.status === 'completed').length;
    const inProgressSteps = disputeSteps.filter(step => step.status === 'in-progress').length;
    return ((completedSteps + inProgressSteps * 0.5) / disputeSteps.length) * 100;
  };

  if (!showDispute && !disputeSubmitted) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Dispute
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              File Dispute
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
              <div className="text-sm text-red-800 dark:text-red-200">
                <strong>SLA Promise:</strong> Disputes are resolved within 24 hours
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Dispute Reason *</Label>
              <select 
                id="reason"
                className="w-full mt-1 px-3 py-2 border border-input rounded-md text-sm"
                value={disputeData.reason}
                onChange={(e) => setDisputeData(prev => ({ ...prev, reason: e.target.value }))}
              >
                <option value="">Select a reason</option>
                <option value="item-not-as-described">Item not as described</option>
                <option value="item-not-received">Item not received</option>
                <option value="item-damaged">Item was damaged</option>
                <option value="fake-item">Item appears to be fake</option>
                <option value="seller-unresponsive">Seller is unresponsive</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue..."
                value={disputeData.description}
                onChange={(e) => setDisputeData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="evidence">Evidence (Optional)</Label>
              <Textarea
                id="evidence"
                placeholder="Links to photos, screenshots, or other evidence..."
                value={disputeData.evidence}
                onChange={(e) => setDisputeData(prev => ({ ...prev, evidence: e.target.value }))}
                rows={3}
              />
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDisputeSubmit}
              >
                File Dispute
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gavel className="h-5 w-5 text-red-600" />
          <span className="text-red-600">Dispute Resolution</span>
          <Badge variant="outline" className="text-red-600 border-red-200">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Resolution Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>

        <div className="space-y-3">
          {disputeSteps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3">
              {getStepIcon(step, index)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{step.title}</h4>
                  {step.timestamp && (
                    <Badge variant="outline" className="text-xs">
                      {new Date(step.timestamp).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            Expected resolution: <strong>within 24 hours</strong>
          </span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};