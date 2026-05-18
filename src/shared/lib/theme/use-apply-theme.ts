import { useEffect } from 'react';

import { useAppStore } from '@/shared/store';

export function useApplyTheme() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);
}
