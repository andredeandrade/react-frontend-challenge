export const tmdbConfig = {
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3',
  imageBaseUrl:
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p',
  token: import.meta.env.VITE_TMDB_TOKEN,
} as const;

export type TmdbImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';

export function buildImageUrl(
  path: string | null,
  size: TmdbImageSize = 'w500',
): string | null {
  if (!path) return null;
  return `${tmdbConfig.imageBaseUrl}/${size}${path}`;
}
