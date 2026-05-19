import { tmdbClient } from '@/shared/lib/tmdb';

import type {
  Genre,
  Movie,
  MovieCredits,
  MovieDetails,
  MovieVideos,
  TimeWindow,
  TmdbPaginatedResponse,
} from '../model/movie.types';
import type { MovieFilters } from '../model/movie-filters';

const LANGUAGE = 'pt-BR';

interface MovieGenresResponse {
  genres: Genre[];
}

function appendFilters(
  params: Record<string, string>,
  filters?: MovieFilters,
): Record<string, string> {
  if (!filters) return params;

  const nextParams = { ...params };

  if (filters.genreId) {
    nextParams.with_genres = String(filters.genreId);
  }

  if (filters.year) {
    nextParams.primary_release_year = String(filters.year);
  }

  if (filters.minRating) {
    nextParams['vote_average.gte'] = String(filters.minRating);
  }

  return nextParams;
}

export async function getPopularMovies(
  page = 1,
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get('/movie/popular', {
    page: String(page),
    language: LANGUAGE,
  });
}

export async function getTrendingMovies(
  timeWindow: TimeWindow = 'week',
  page = 1,
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get(`/trending/movie/${timeWindow}`, {
    language: LANGUAGE,
    page: String(page),
  });
}

export async function getDiscoveredMovies(
  page = 1,
  filters?: MovieFilters,
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get(
    '/discover/movie',
    appendFilters(
      {
        page: String(page),
        language: LANGUAGE,
        sort_by: 'popularity.desc',
        include_adult: 'false',
      },
      filters,
    ),
  );
}

export async function getMovieGenres(): Promise<MovieGenresResponse> {
  return tmdbClient.get('/genre/movie/list', {
    language: LANGUAGE,
  });
}

export async function getTopRatedMovies(
  page = 1,
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get('/movie/top_rated', {
    page: String(page),
    language: LANGUAGE,
  });
}

export async function getUpcomingMovies(
  page = 1,
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get('/movie/upcoming', {
    page: String(page),
    language: LANGUAGE,
  });
}

export async function searchMovies(
  query: string,
  page = 1,
  filters?: MovieFilters,
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get(
    '/search/movie',
    appendFilters(
      {
        query,
        page: String(page),
        language: LANGUAGE,
      },
      filters,
    ),
  );
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbClient.get(`/movie/${id}`, { language: LANGUAGE });
}

export async function getMovieCredits(id: number): Promise<MovieCredits> {
  return tmdbClient.get(`/movie/${id}/credits`, { language: LANGUAGE });
}

export async function getMovieVideos(id: number): Promise<MovieVideos> {
  return tmdbClient.get(`/movie/${id}/videos`, { language: LANGUAGE });
}
