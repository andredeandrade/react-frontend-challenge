import { useParams } from 'react-router-dom';

import { MovieDetailsContent, MovieDetailsInvalidState } from '@/widgets/movie-details';

export function MovieDetailsPage() {
  const { movieId } = useParams();
  const parsedId = Number(movieId);
  const isValidId = Number.isFinite(parsedId) && parsedId > 0;

  if (!isValidId) {
    return <MovieDetailsInvalidState />;
  }

  return <MovieDetailsContent movieId={parsedId} />;
}
