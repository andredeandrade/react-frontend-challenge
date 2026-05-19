import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/app/layouts/app-layout';
import { AuthLayout } from '@/app/layouts/auth-layout';
import { RootLayout } from '@/app/layouts/root-layout';
import { ProtectedRoute } from '@/features/auth/ui/protected-route';
import { PublicRoute } from '@/features/auth/ui/public-route';
import { DiscoveryPage } from '@/pages/discovery';
import { LoginPage } from '@/pages/login';
import { MovieDetailsPage } from '@/pages/movie-details';
import { PopularPage } from '@/pages/popular';
import { TopRatedPage } from '@/pages/top-rated';
import { TrendingPage } from '@/pages/trending';
import { UpcomingPage } from '@/pages/upcoming';
import { WatchlistPage } from '@/pages/watchlist';

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
                path: 'em-alta',
                element: <TrendingPage />,
              },
              {
                path: 'populares',
                element: <PopularPage />,
              },
              {
                path: 'mais-bem-avaliados',
                element: <TopRatedPage />,
              },
              {
                path: 'em-breve',
                element: <UpcomingPage />,
              },
              {
                path: 'filmes/:movieId',
                element: <MovieDetailsPage />,
              },
              {
                path: 'minha-lista',
                element: <WatchlistPage />,
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
