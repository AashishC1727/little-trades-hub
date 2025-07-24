import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2">LITTLE little</CardTitle>
          <CardDescription className="text-xl">where you can trade anything. Starting from LITTLE to little.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            Welcome back, {user?.email}!
          </p>
          <p className="text-foreground">
            Your trading platform is now secure with authentication and RLS policies enabled.
            All your portfolio, trades, and watchlist data is protected.
          </p>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
