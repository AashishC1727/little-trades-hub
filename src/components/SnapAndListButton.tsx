import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Image, Upload, Sparkles, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SnapAndListButtonProps {
  onListingCreated?: () => void;
}

export const SnapAndListButton: React.FC<SnapAndListButtonProps> = ({ onListingCreated }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'capture' | 'details'>('capture');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [listing, setListing] = useState({
    offeredAsset: '',
    wantedAsset: '',
    category: '',
    description: '',
    location: '',
    offeredValue: '',
    wantedValue: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock AI analysis function
  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results
    const mockResults = [
      { asset: 'iPhone 14 Pro', category: 'collectible', value: '800', description: 'Apple iPhone 14 Pro in excellent condition' },
      { asset: 'Gaming Laptop', category: 'collectible', value: '1200', description: 'High-performance gaming laptop with RTX graphics' },
      { asset: 'Vintage Watch', category: 'collectible', value: '500', description: 'Classic timepiece in working condition' },
      { asset: 'Collectible Card', category: 'collectible', value: '150', description: 'Rare trading card in mint condition' }
    ];
    
    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    setListing(prev => ({
      ...prev,
      offeredAsset: result.asset,
      category: result.category,
      offeredValue: result.value,
      description: result.description
    }));
    
    setIsAnalyzing(false);
    setStep('details');
    
    toast({
      title: "Image Analyzed!",
      description: "AI has auto-filled your listing details. Review and edit as needed.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please use file upload instead.",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      
      // Stop camera
      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      
      analyzeImage(imageData);
    }
  };

  const handleSubmit = () => {
    // Simulate listing creation
    toast({
      title: "Listing Created!",
      description: "Your P2P listing has been posted successfully.",
    });
    
    setIsOpen(false);
    setStep('capture');
    setCapturedImage(null);
    setListing({
      offeredAsset: '',
      wantedAsset: '',
      category: '',
      description: '',
      location: '',
      offeredValue: '',
      wantedValue: ''
    });
    
    onListingCreated?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('capture');
    setCapturedImage(null);
    
    // Stop camera if running
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          size="lg"
        >
          <Camera className="h-4 w-4 mr-2" />
          Snap & List your item →
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            {step === 'capture' ? 'Capture Your Item' : 'Review & List'}
          </DialogTitle>
        </DialogHeader>

        {step === 'capture' && (
          <div className="space-y-4">
            {!capturedImage && (
              <>
                <Card>
                  <CardContent className="p-4 text-center">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline
                      className="w-full rounded-lg mb-4"
                      style={{ display: videoRef.current?.srcObject ? 'block' : 'none' }}
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    
                    <div className="space-y-4">
                      <Button onClick={startCamera} className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Open Camera
                      </Button>
                      
                      {videoRef.current?.srcObject && (
                        <Button onClick={capturePhoto} variant="outline" className="w-full">
                          📸 Capture Photo
                        </Button>
                      )}
                      
                      <div className="text-sm text-muted-foreground">or</div>
                      
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline" 
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {isAnalyzing && (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">AI is analyzing your item...</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            {capturedImage && (
              <div className="relative">
                <img src={capturedImage} alt="Captured item" className="w-full h-32 object-cover rounded-lg" />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => setCapturedImage(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="offered">Offering *</Label>
                <Input
                  id="offered"
                  value={listing.offeredAsset}
                  onChange={(e) => setListing(prev => ({ ...prev, offeredAsset: e.target.value }))}
                  placeholder="Item name"
                />
              </div>
              <div>
                <Label htmlFor="wanted">Want *</Label>
                <Input
                  id="wanted"
                  value={listing.wantedAsset}
                  onChange={(e) => setListing(prev => ({ ...prev, wantedAsset: e.target.value }))}
                  placeholder="What you want"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={listing.category} onValueChange={(value) => setListing(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="stock">Stocks</SelectItem>
                  <SelectItem value="collectible">Collectibles</SelectItem>
                  <SelectItem value="currency">Currency</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={listing.description}
                onChange={(e) => setListing(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your item..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="offered-value">Value ($)</Label>
                <Input
                  id="offered-value"
                  type="number"
                  value={listing.offeredValue}
                  onChange={(e) => setListing(prev => ({ ...prev, offeredValue: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="wanted-value">Want ($)</Label>
                <Input
                  id="wanted-value"
                  type="number"
                  value={listing.wantedValue}
                  onChange={(e) => setListing(prev => ({ ...prev, wantedValue: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={listing.location}
                  onChange={(e) => setListing(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City"
                />
              </div>
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={!listing.offeredAsset || !listing.wantedAsset}
            >
              🚀 List My Item
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};