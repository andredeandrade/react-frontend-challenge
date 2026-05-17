import {
  Outlet,
  useNavigate,
} from 'react-router-dom';

import {
  useAuthenticatedUser,
  useAuthStore,
} from '@/features/auth/model';
import { NavigationSidebar } from '@/app/layouts/components/navigation-sidebar';
import { useAppStore } from '@/shared/store';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/shared/ui/sheet';
import {
  LogOutIcon,
  MenuIcon,
} from 'lucide-react';

export function AppLayout() {
  const navigate = useNavigate();
  const user = useAuthenticatedUser();
  const logout = useAuthStore((state) => state.logout);

  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/', { replace: true });
  };

  const currentName = user?.name ?? 'Usuario';

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20 text-foreground">
      <aside className="hidden h-full shrink-0 border-r border-sidebar-border lg:flex">
        <NavigationSidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-sm">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 lg:hidden">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button type="button" variant="outline" size="icon-sm">
                    <MenuIcon className="size-4" />
                    <span className="sr-only">Abrir navegacao</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 sm:max-w-none" showCloseButton>
                  <NavigationSidebar />
                </SheetContent>
              </Sheet>
              <span className="text-sm font-semibold tracking-wide">CineDash</span>
            </div>

            <div className="hidden text-sm text-muted-foreground lg:block">
              Navegacao principal
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {currentName}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOutIcon className="size-4" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid min-h-full gap-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}