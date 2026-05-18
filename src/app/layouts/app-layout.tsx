import { Outlet } from 'react-router-dom';

import { ApplicationHeader } from '@/app/layouts/components/application-header';
import { NavigationSidebar } from '@/app/layouts/components/navigation-sidebar';

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/20 text-foreground">
      <aside className="hidden h-full shrink-0 border-r border-sidebar-border lg:flex">
        <NavigationSidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <ApplicationHeader />

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
