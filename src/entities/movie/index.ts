// Types
export type {
  Movie,
  MovieDetails,
  Genre,
  TmdbPaginatedResponse,
  TimeWindow,
} from './model/movie.types';

// Query keys
export { movieQueryKeys } from './model/movie.query-keys';

// API functions
export {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
  searchMovies,
} from './api/movie.api';

// Hooks
export { usePopularMovies } from './hooks/use-popular-movies';
export { useTrendingMovies } from './hooks/use-trending-movies';
export { useTopRatedMovies } from './hooks/use-top-rated-movies';
export { useUpcomingMovies } from './hooks/use-upcoming-movies';
export { useMovieDetails } from './hooks/use-movie-details';
export { useMovieSearch } from './hooks/use-movie-search';
