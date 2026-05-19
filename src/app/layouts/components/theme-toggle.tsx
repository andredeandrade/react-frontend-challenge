import { useAppStore } from '@/shared/store';
import { MoonIcon, SunIcon } from 'lucide-react';

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Alternar tema"
      className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer outline-none"
    >
      <SunIcon className="size-5 text-foreground dark:hidden" />
      <MoonIcon className="hidden size-5 text-foreground dark:block" />
    </button>
  );
}
