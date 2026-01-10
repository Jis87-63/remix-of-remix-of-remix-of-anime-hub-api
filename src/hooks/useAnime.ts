import { useQuery } from '@tanstack/react-query';
import {
  getTrendingAnime,
  getPopularAnime,
  getSeasonAnime,
  searchAnime,
  getAnimeByGenre,
  getAnimeById,
} from '@/lib/anilist';

export function useTrendingAnime(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'trending', page, perPage],
    queryFn: () => getTrendingAnime(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePopularAnime(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'popular', page, perPage],
    queryFn: () => getPopularAnime(page, perPage),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSeasonAnime(season: string, year: number, page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'season', season, year, page, perPage],
    queryFn: () => getSeasonAnime(season, year, page, perPage),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchAnime(search: string, page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'search', search, page, perPage],
    queryFn: () => searchAnime(search, page, perPage),
    enabled: search.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAnimeByGenre(genre: string, page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'genre', genre, page, perPage],
    queryFn: () => getAnimeByGenre(genre, page, perPage),
    enabled: genre.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAnimeById(id: number) {
  return useQuery({
    queryKey: ['anime', 'detail', id],
    queryFn: () => getAnimeById(id),
    enabled: id > 0,
    staleTime: 10 * 60 * 1000,
  });
}

export function getCurrentSeason(): { season: string; year: number } {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  if (month >= 0 && month <= 2) return { season: 'WINTER', year };
  if (month >= 3 && month <= 5) return { season: 'SPRING', year };
  if (month >= 6 && month <= 8) return { season: 'SUMMER', year };
  return { season: 'FALL', year };
}
