import { useNavigate } from 'react-router-dom';

import { useAuthenticatedUser, useAuthStore } from '@/features/auth/model';
import { useAppStore } from '@/shared/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';
import { LogOutIcon, UserIcon, UserCircle2Icon } from 'lucide-react';

export function UserMenu() {
  const navigate = useNavigate();
  const user = useAuthenticatedUser();
  const logout = useAuthStore((state) => state.logout);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/', { replace: true });
  };

  const currentName = user?.name ?? 'Usuario';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Menu do usuario"
          className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer outline-none"
        >
          <UserCircle2Icon className="size-8 text-primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 min-w-44">
        <DropdownMenuLabel>{currentName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="size-4" />
          Minha conta
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOutIcon className="size-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
