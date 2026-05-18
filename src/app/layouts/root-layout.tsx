import { Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/shared/lib/react-query/query-client';
import { useApplyTheme } from '@/shared/lib/theme/use-apply-theme';

export function RootLayout() {
  useApplyTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {import.meta.env.DEV ? (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      ) : null}
    </QueryClientProvider>
  );
}
