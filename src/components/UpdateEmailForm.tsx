import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const UpdateEmailForm = () => {
  const [newEmail, setNewEmail] = useState('ashish.choudhary@littlelittle.uk');
  const [loading, setLoading] = useState(false);
  const { updateEmail, user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setLoading(true);
    try {
      const { error } = await updateEmail(newEmail);
      
      if (error) throw error;
      
      toast({
        title: "Email Update Requested",
        description: "Please check your new email for confirmation. Your email will be updated once you click the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update email",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <p>Please sign in to update your email address.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Update Email Address</CardTitle>
        <CardDescription>
          Current email: {user.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">New Email Address</Label>
            <Input
              id="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Email"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};