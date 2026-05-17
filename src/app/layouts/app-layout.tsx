import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-muted/30 text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase">
              CineDash
            </span>
            <span className="text-xs text-muted-foreground">
              Dashboard autenticado
            </span>
          </div>

          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Sessao ativa
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="grid min-h-full gap-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}