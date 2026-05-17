import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/features/auth/ui/protected-route';
import { PublicRoute } from '@/features/auth/ui/public-route';
import { DashboardPage } from '@/pages/dashboard';
import { RootLayout } from '@/app/layouts/root-layout';
import { LoginPage } from '@/pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
