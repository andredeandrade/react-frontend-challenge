import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/app/layouts/app-layout';
import { AuthLayout } from '@/app/layouts/auth-layout';
import { RootLayout } from '@/app/layouts/root-layout';
import { ProtectedRoute } from '@/features/auth/ui/protected-route';
import { PublicRoute } from '@/features/auth/ui/public-route';
import { DiscoveryPage } from '@/pages/discovery';
import { LoginPage } from '@/pages/login';
import { MovieDetailsPage } from '@/pages/movie-details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                index: true,
                element: <LoginPage />,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: 'descobrir',
                element: <DiscoveryPage />,
              },
              {
                path: 'filmes/:movieId',
                element: <MovieDetailsPage />,
              },
            ],
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
