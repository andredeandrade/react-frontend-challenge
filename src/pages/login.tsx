import { LoginForm } from '@/features/auth/ui/login-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function LoginPage() {
  return (
    <Card className="mx-auto w-full max-w-sm border border-border/70 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-4xl font-semibold tracking-tight">
          CineDash
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-6 pt-0 sm:px-6">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
