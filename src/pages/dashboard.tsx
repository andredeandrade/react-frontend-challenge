import { useNavigate } from 'react-router-dom';

import {
  useAuthenticatedUser,
  useAuthStore,
} from '@/features/auth/model';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function DashboardPage() {
  const user = useAuthenticatedUser();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-lg border border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sessao autenticada com sucesso.
          </p>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Nome:</strong> {user?.name ?? '-'}
            </p>
            <p>
              <strong>E-mail:</strong> {user?.email ?? '-'}
            </p>
          </div>
          <Button type="button" variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}