import { ArrowLeftIcon, CheckIcon, PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';

type MovieDetailsHeaderProps = {
  title: string;
  isInWatchlist: boolean;
  onToggleWatchlist: () => void;
};

export function MovieDetailsHeader({
  title,
  isInWatchlist,
  onToggleWatchlist,
}: MovieDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col gap-2 overflow-hidden sm:flex-row sm:items-start sm:justify-between sm:gap-3">
      <div className="flex min-w-0 w-full items-center gap-2 sm:flex-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label="Voltar para pagina anterior"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="size-5" />
        </Button>

        <h1 className="min-w-0 flex-1 line-clamp-2 text-xl font-semibold tracking-tight sm:line-clamp-1 sm:text-2xl md:text-3xl">
          {title}
        </h1>
      </div>

      <Button
        type="button"
        variant={isInWatchlist ? 'secondary' : 'outline'}
        size="sm"
        className="w-fit shrink-0"
        onClick={onToggleWatchlist}
      >
        {isInWatchlist ? (
          <>
            <CheckIcon className="size-4" />
            Remover da minha lista
          </>
        ) : (
          <>
            <PlusIcon className="size-4" />
            Adicionar a minha lista
          </>
        )}
      </Button>
    </header>
  );
}
