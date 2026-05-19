// Types
export type {
  CastMember,
  Movie,
  MovieCredits,
  MovieDetails,
  MovieVideo,
  MovieVideos,
  Genre,
  TmdbPaginatedResponse,
  TimeWindow,
} from './model/movie.types';
export type { MovieFilters } from './model/movie-filters';

// Query keys
export { movieQueryKeys } from './model/movie.query-keys';

// API functions
export {
  getDiscoveredMovies,
  getMovieGenres,
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  searchMovies,
} from './api/movie.api';

// Hooks
export { usePopularMovies } from './hooks/use-popular-movies';
export { useDiscoverMovies } from './hooks/use-discover-movies';
export { useMovieGenres } from './hooks/use-discover-movies';
export { useInfiniteDiscoverMovies } from './hooks/use-infinite-discover-movies';
export { useInfiniteMovieSearch } from './hooks/use-infinite-movie-search';
export { useInfinitePopularMovies } from './hooks/use-infinite-popular-movies';
export { useInfiniteTrendingMovies } from './hooks/use-infinite-trending-movies';
export { useTrendingMovies } from './hooks/use-trending-movies';
export { useTopRatedMovies } from './hooks/use-top-rated-movies';
export { useUpcomingMovies } from './hooks/use-upcoming-movies';
export { useMovieCredits } from './hooks/use-movie-details';
export { useMovieDetails } from './hooks/use-movie-details';
export { useMovieVideos } from './hooks/use-movie-details';
export { useMovieSearch } from './hooks/use-movie-search';

// UI
export { MovieCard } from './ui/movie-card';
export { FilterGenre } from './ui/filter-genre';
export { FilterYear } from './ui/filter-year';
export { FilterScore } from './ui/filter-score';
