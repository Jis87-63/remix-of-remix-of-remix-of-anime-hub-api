import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type WatchlistStatus = 'want_to_watch' | 'watching' | 'completed' | 'dropped';

export interface WatchlistItem {
  id: string;
  user_id: string;
  anime_id: number;
  anime_title: string;
  anime_cover_image: string | null;
  status: WatchlistStatus;
  created_at: string;
  updated_at: string;
}

export function useWatchlist() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['watchlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WatchlistItem[];
    },
    enabled: !!user,
  });
}

export function useWatchlistItem(animeId: number) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['watchlist', user?.id, animeId],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id)
        .eq('anime_id', animeId)
        .maybeSingle();

      if (error) throw error;
      return data as WatchlistItem | null;
    },
    enabled: !!user && animeId > 0,
  });
}

export function useAddToWatchlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      animeId,
      animeTitle,
      animeCoverImage,
      status = 'want_to_watch',
    }: {
      animeId: number;
      animeTitle: string;
      animeCoverImage?: string;
      status?: WatchlistStatus;
    }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('watchlist')
        .insert({
          user_id: user.id,
          anime_id: animeId,
          anime_title: animeTitle,
          anime_cover_image: animeCoverImage,
          status,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id, variables.animeId] });
    },
  });
}

export function useUpdateWatchlistStatus() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      animeId,
      status,
    }: {
      animeId: number;
      status: WatchlistStatus;
    }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('watchlist')
        .update({ status })
        .eq('user_id', user.id)
        .eq('anime_id', animeId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id, variables.animeId] });
    },
  });
}

export function useRemoveFromWatchlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (animeId: number) => {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('anime_id', animeId);

      if (error) throw error;
    },
    onSuccess: (_, animeId) => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id, animeId] });
    },
  });
}
