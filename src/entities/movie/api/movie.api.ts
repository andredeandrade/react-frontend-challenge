import { tmdbClient } from '@/shared/lib/tmdb';

import type {
  Movie,
  MovieDetails,
  TimeWindow,
  TmdbPaginatedResponse,
} from '../model/movie.types';

const LANGUAGE = 'pt-BR';

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
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get(`/trending/movie/${timeWindow}`, {
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
): Promise<TmdbPaginatedResponse<Movie>> {
  return tmdbClient.get('/search/movie', {
    query,
    page: String(page),
    language: LANGUAGE,
  });
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbClient.get(`/movie/${id}`, { language: LANGUAGE });
}
