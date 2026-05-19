import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-muted/30 px-4 py-6 sm:py-8">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}