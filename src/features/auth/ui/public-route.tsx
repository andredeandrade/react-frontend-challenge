import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore, useIsAuthenticated } from '@/features/auth/model';

export function PublicRoute() {
  const isAuthenticated = useIsAuthenticated();
  const [isHydrated, setIsHydrated] = useState(
    useAuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubscribeHydrate = useAuthStore.persist.onHydrate(() => {
      setIsHydrated(false);
    });

    const unsubscribeFinishHydration = useAuthStore.persist.onFinishHydration(
      () => {
        setIsHydrated(true);
      },
    );

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubscribeHydrate();
      unsubscribeFinishHydration();
    };
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Validando sessao...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/descobrir" replace />;
  }

  return <Outlet />;
}
