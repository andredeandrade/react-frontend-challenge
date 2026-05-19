import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

type MovieDetailsTrailerSectionProps = {
  title: string;
  trailerUrl: string | null;
};

export function MovieDetailsTrailerSection({
  title,
  trailerUrl,
}: MovieDetailsTrailerSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-border/70 px-3 py-2 text-left"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="movie-trailer-content"
      >
        <h2 className="text-lg font-semibold">Trailer</h2>
        <ChevronDownIcon
          className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {isOpen ? (
        trailerUrl ? (
          <div
            id="movie-trailer-content"
            className="overflow-hidden rounded-lg border border-border/70"
          >
            <iframe
              title={`Trailer do filme ${title}`}
              src={trailerUrl}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <p id="movie-trailer-content" className="text-sm text-muted-foreground">
            Trailer nao disponivel.
          </p>
        )
      ) : null}
    </div>
  );
}
