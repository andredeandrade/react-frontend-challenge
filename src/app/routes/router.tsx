import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/root-layout';
import { LoginPage } from '@/pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
