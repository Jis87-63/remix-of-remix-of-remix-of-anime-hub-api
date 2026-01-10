import { useQuery } from '@tanstack/react-query';
import { getRecentlyAired, getUpcomingEpisodes } from '@/lib/anilist-episodes';

export function useRecentlyAired(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['episodes', 'recent', page, perPage],
    queryFn: () => getRecentlyAired(page, perPage),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

export function useUpcomingEpisodes(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['episodes', 'upcoming', page, perPage],
    queryFn: () => getUpcomingEpisodes(page, perPage),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
