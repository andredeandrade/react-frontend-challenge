import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In to CineDash</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="mt-1"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
