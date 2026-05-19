import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

type CastMember = {
  id: number;
  name: string;
  character: string;
};

type MovieDetailsCastSectionProps = {
  cast: CastMember[];
};

export function MovieDetailsCastSection({ cast }: MovieDetailsCastSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-border/70 px-3 py-2 text-left"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="movie-cast-content"
      >
        <h2 className="text-lg font-semibold">Elenco</h2>
        <ChevronDownIcon
          className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {isOpen ? (
        cast.length > 0 ? (
          <ul id="movie-cast-content" className="grid gap-2 text-sm sm:grid-cols-2">
            {cast.map((castMember) => (
              <li
                key={castMember.id}
                className="rounded-md border border-border/70 px-3 py-2"
              >
                <p className="font-medium">{castMember.name}</p>
                <p className="text-muted-foreground">{castMember.character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p id="movie-cast-content" className="text-sm text-muted-foreground">
            Elenco nao informado.
          </p>
        )
      ) : null}
    </div>
  );
}
