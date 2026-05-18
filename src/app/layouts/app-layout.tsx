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
          <div className="w-full px-3 py-6 sm:px-4 lg:px-5">
            <div className="grid min-h-full gap-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
