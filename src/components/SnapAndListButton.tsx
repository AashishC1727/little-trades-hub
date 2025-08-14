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
  const [capturedFile, setCapturedFile] = useState<File | null>(null); // NEW: Store actual file
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW: Track submission state
  const [stream, setStream] = useState<MediaStream | null>(null);
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

  // NEW: Generate random user ID (UUID v4 format)
  const generateRandomUserId = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // NEW: Convert data URL to File object
  const dataURLToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

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
      setCapturedFile(file); // NEW: Store the actual file
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
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please use file upload instead.",
        variant: "destructive"
      });
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
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
      
      // NEW: Convert captured image to File object
      const file = dataURLToFile(imageData, `captured-${Date.now()}.jpg`);
      setCapturedFile(file);
      
      stopCamera();
      analyzeImage(imageData);
    }
  };

  // MODIFIED: Updated handleSubmit to integrate with Supabase Edge Function
  const handleSubmit = async () => {
    if (!capturedFile) {
      toast({
        title: "Error",
        description: "No image file available. Please capture or upload an image.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for the Edge Function
      const formData = new FormData();
      
      // Generate random user ID and timestamp
      const userId = generateRandomUserId();
      const timestamp = new Date().toISOString();
      
      // Append all required fields
      formData.append('user_id', userId);
      formData.append('offering_asset', listing.offeredAsset);
      formData.append('wanted_asset', listing.wantedAsset);
      formData.append('image', capturedFile);
      
      // Append optional fields only if they have values
      if (listing.category) {
        formData.append('category', listing.category);
      }
      if (listing.description) {
        formData.append('description', listing.description);
      }
      if (listing.location) {
        formData.append('location', listing.location);
      }
      if (listing.offeredValue) {
        formData.append('offered_value', listing.offeredValue);
      }
      if (listing.wantedValue) {
        formData.append('wanted_value', listing.wantedValue);
      }

      // Call the Supabase Edge Function
      const response = await fetch('https://iwbdeakpqfljskpxjejm.supabase.co/functions/v1/create-listing', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3YmRlYWtwcWZsanNrcHhqZWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODAxMzMsImV4cCI6MjA2ODk1NjEzM30.mvShgsITnhM9XXm77PxiC0lxsbT73v_5xv3qNKONZBo'
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create listing');
      }

      // Success toast
      toast({
        title: "Listing Created!",
        description: `Your P2P listing has been posted successfully! Image URL: ${result.file_url}`,
      });

      // Reset form and close dialog
      setIsOpen(false);
      setStep('capture');
      setCapturedImage(null);
      setCapturedFile(null);
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

    } catch (error) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create listing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('capture');
    setCapturedImage(null);
    setCapturedFile(null); // NEW: Reset captured file
    stopCamera();
  };
  
  const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
          handleClose();
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                      muted
                      className="w-full rounded-lg mb-4"
                      style={{ display: stream ? 'block' : 'none' }}
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    
                    <div className="space-y-4">
                      {!stream && (
                        <Button onClick={startCamera} className="w-full">
                          <Camera className="h-4 w-4 mr-2" />
                          Open Camera
                        </Button>
                      )}
                      
                      {stream && (
                        <Button onClick={capturePhoto} variant="outline" className="w-full">
                          📸 Capture Photo
                        </Button>
                      )}
                      
                      {!stream && (
                        <>
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
                        </>
                      )}
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
                        onClick={() => {
                            setCapturedImage(null);
                            setCapturedFile(null); // NEW: Reset captured file
                            setStep('capture');
                        }}
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
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <Label htmlFor="wanted">Want *</Label>
                    <Input
                        id="wanted"
                        value={listing.wantedAsset}
                        onChange={(e) => setListing(prev => ({ ...prev, wantedAsset: e.target.value }))}
                        placeholder="What you want"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={listing.category} 
                  onValueChange={(value) => setListing(prev => ({ ...prev, category: value }))}
                  disabled={isSubmitting}
                >
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
                    disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        value={listing.location}
                        onChange={(e) => setListing(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <Button 
                onClick={handleSubmit} 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                disabled={!listing.offeredAsset || !listing.wantedAsset || isSubmitting}
            >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Listing...
                  </>
                ) : (
                  <>🚀 List My Item</>
                )}
            </Button>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
};