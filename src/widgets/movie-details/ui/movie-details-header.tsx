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
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Voltar para pagina anterior"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="size-5" />
        </Button>

        <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
      </div>

      <Button
        type="button"
        variant={isInWatchlist ? 'secondary' : 'outline'}
        size="sm"
        className="w-fit"
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
