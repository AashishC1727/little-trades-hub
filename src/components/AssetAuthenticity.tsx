import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  FileCheck, 
  Camera, 
  Link, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  Star,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthenticityProof {
  id: string;
  type: 'document' | 'photo' | 'blockchain';
  title: string;
  description: string;
  url?: string;
  verified: boolean;
  uploadDate: string;
}

interface AssetAuthenticityProps {
  listingId: string;
  isOwner?: boolean;
  authenticityScore?: number;
  proofs?: AuthenticityProof[];
}

export const AssetAuthenticity: React.FC<AssetAuthenticityProps> = ({ 
  listingId, 
  isOwner = false,
  authenticityScore = 75,
  proofs = []
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('docs');
  const [uploadedProofs, setUploadedProofs] = useState<AuthenticityProof[]>(proofs);
  const [newProof, setNewProof] = useState({
    type: 'document' as 'document' | 'photo' | 'blockchain',
    title: '',
    description: '',
    url: ''
  });

  const handleProofUpload = () => {
    const proof: AuthenticityProof = {
      id: Date.now().toString(),
      ...newProof,
      verified: false,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    setUploadedProofs([...uploadedProofs, proof]);
    setNewProof({ type: 'document', title: '', description: '', url: '' });
    
    toast({
      title: "Proof Uploaded",
      description: "Your authenticity proof has been submitted for verification.",
    });
  };

  const handleRating = (authentic: boolean) => {
    toast({
      title: "Rating Submitted",
      description: `Thank you for rating this item as ${authentic ? 'authentic' : 'not authentic'}.`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Shield className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  const getProofIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileCheck className="h-4 w-4" />;
      case 'photo': return <Camera className="h-4 w-4" />;
      case 'blockchain': return <Link className="h-4 w-4" />;
      default: return <FileCheck className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getScoreIcon(authenticityScore)}
            <span className="text-sm">Authenticity</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${getScoreColor(authenticityScore)}`}>
              {authenticityScore}%
            </span>
            {isOwner && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Upload className="h-3 w-3 mr-1" />
                    Add Proof
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Authenticity Proof</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="docs" className="text-xs">
                        <FileCheck className="h-3 w-3 mr-1" />
                        Docs
                      </TabsTrigger>
                      <TabsTrigger value="photos" className="text-xs">
                        <Camera className="h-3 w-3 mr-1" />
                        Photos
                      </TabsTrigger>
                      <TabsTrigger value="blockchain" className="text-xs">
                        <Link className="h-3 w-3 mr-1" />
                        Chain
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="docs" className="space-y-4">
                      <div>
                        <Label htmlFor="doc-title">Document Title</Label>
                        <Input
                          id="doc-title"
                          placeholder="e.g., Purchase Receipt, Certificate"
                          value={newProof.title}
                          onChange={(e) => setNewProof(prev => ({ ...prev, title: e.target.value, type: 'document' }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="doc-desc">Description</Label>
                        <Textarea
                          id="doc-desc"
                          placeholder="Describe the document..."
                          value={newProof.description}
                          onChange={(e) => setNewProof(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <Button onClick={handleProofUpload} className="w-full" disabled={!newProof.title}>
                        Upload Document
                      </Button>
                    </TabsContent>

                    <TabsContent value="photos" className="space-y-4">
                      <div>
                        <Label htmlFor="photo-title">Photo Title</Label>
                        <Input
                          id="photo-title"
                          placeholder="e.g., Serial Number, Item Condition"
                          value={newProof.title}
                          onChange={(e) => setNewProof(prev => ({ ...prev, title: e.target.value, type: 'photo' }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="photo-desc">Description</Label>
                        <Textarea
                          id="photo-desc"
                          placeholder="What does this photo show?"
                          value={newProof.description}
                          onChange={(e) => setNewProof(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <Button onClick={handleProofUpload} className="w-full" disabled={!newProof.title}>
                        Upload Photo
                      </Button>
                    </TabsContent>

                    <TabsContent value="blockchain" className="space-y-4">
                      <div>
                        <Label htmlFor="chain-title">Blockchain Proof</Label>
                        <Input
                          id="chain-title"
                          placeholder="e.g., NFT Contract, Transaction Hash"
                          value={newProof.title}
                          onChange={(e) => setNewProof(prev => ({ ...prev, title: e.target.value, type: 'blockchain' }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="chain-url">Contract/Transaction URL</Label>
                        <Input
                          id="chain-url"
                          placeholder="https://etherscan.io/..."
                          value={newProof.url}
                          onChange={(e) => setNewProof(prev => ({ ...prev, url: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="chain-desc">Description</Label>
                        <Textarea
                          id="chain-desc"
                          placeholder="Explain the blockchain proof..."
                          value={newProof.description}
                          onChange={(e) => setNewProof(prev => ({ ...prev, description: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <Button onClick={handleProofUpload} className="w-full" disabled={!newProof.title}>
                        Add Blockchain Proof
                      </Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {uploadedProofs.length > 0 ? (
          <div className="space-y-2">
            {uploadedProofs.slice(0, 3).map((proof) => (
              <div key={proof.id} className="flex items-center gap-2 text-xs">
                {getProofIcon(proof.type)}
                <span className="flex-1 truncate">{proof.title}</span>
                {proof.verified ? (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                )}
              </div>
            ))}
            {uploadedProofs.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{uploadedProofs.length - 3} more proofs
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground text-center py-2">
            No authenticity proofs uploaded yet
          </div>
        )}

        {!isOwner && (
          <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-800">
            <div className="text-xs text-muted-foreground mb-2">Was this item authentic?</div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 h-7 text-xs"
                onClick={() => handleRating(true)}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Yes
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 h-7 text-xs"
                onClick={() => handleRating(false)}
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                No
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};