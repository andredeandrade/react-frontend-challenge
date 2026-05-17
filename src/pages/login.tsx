import { LoginForm } from '@/features/auth/ui/login-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function LoginPage() {
  return (
    <Card className="w-full border border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-center text-4xl font-semibold tracking-tight">
          CineDash
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
