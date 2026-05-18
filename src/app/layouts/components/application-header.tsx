import { useAppStore } from '@/shared/store';
import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { MenuIcon } from 'lucide-react';

import { NavigationSidebar } from './navigation-sidebar';
import { UserMenu } from './user-menu';
import { ThemeToggle } from './theme-toggle';

export function ApplicationHeader() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  return (
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
            <SheetContent
              side="left"
              className="w-64 p-0 sm:max-w-none"
              showCloseButton
            >
              <NavigationSidebar />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold tracking-wide">CineDash</span>
        </div>

        <div className="hidden text-sm text-muted-foreground lg:block flex-1" />

        <div className="flex items-center gap-5">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
