import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';
import { useAppStore } from '@/shared/store';
import { Button } from '@/shared/ui/button';
import {
  BookmarkIcon,
  ClapperboardIcon,
  CompassIcon,
  SparklesIcon,
  StarIcon,
} from 'lucide-react';

const navigationItems = [
  {
    label: 'Descobrir',
    hash: '',
    icon: CompassIcon,
  },
  {
    label: 'Minha Lista',
    hash: '#minha-lista',
    icon: BookmarkIcon,
  },
  {
    label: 'Em Alta',
    hash: '#em-alta',
    icon: SparklesIcon,
  },
  {
    label: 'Mais Bem Avaliados',
    hash: '#mais-bem-avaliados',
    icon: StarIcon,
  },
  {
    label: 'Em Breve',
    hash: '#em-breve',
    icon: CompassIcon,
  },
];

export function NavigationSidebar() {
  const location = useLocation();
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const currentHash = location.hash;

  const handleNavigate = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <ClapperboardIcon className="size-5" />
          </div>
          <div className="min-w-0">
            <Link
              to="/descobrir"
              onClick={handleNavigate}
              className="block truncate text-lg font-extrabold tracking-tight transition-colors hover:text-primary"
            >
              CineDash
            </Link>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.hash
              ? currentHash === item.hash
              : currentHash.length === 0;

            return (
              <li key={item.label}>
                <Button
                  asChild
                  type="button"
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start rounded-lg px-3',
                    isActive && 'shadow-xs',
                  )}
                >
                  <Link
                    to={{ pathname: '/descobrir', hash: item.hash }}
                    onClick={handleNavigate}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
