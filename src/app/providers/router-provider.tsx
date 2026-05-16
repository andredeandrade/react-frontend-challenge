import { RouterProvider } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

import { router } from '@/app/routes';

export function RouterProviderWrapper({
  children: _children,
}: PropsWithChildren) {
  return <RouterProvider router={router} />;
}
