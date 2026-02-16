import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface FavoriteVenue {
  id: string;
  venue_id: string;
  created_at: string;
  venues: {
    id: string;
    name: string;
    address: string;
    city: string;
    capacity: number;
    price_per_plate: number;
    images: string[] | null;
    average_rating: number | null;
  };
}

export const useFavoritesDB = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async (): Promise<FavoriteVenue[]> => {
      if (!user) return [];

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!profile) return [];

      const { data, error } = await supabase
        .from("favorites")
        .select(`
          id,
          venue_id,
          created_at,
          venues (
            id,
            name,
            address,
            city,
            capacity,
            price_per_plate,
            images,
            average_rating
          )
        `)
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (venueId: string) => {
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!profile) throw new Error("Profile not found");

      const { data, error } = await supabase
        .from("favorites")
        .insert({
          user_id: profile.id,
          venue_id: venueId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (venueId: string) => {
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!profile) throw new Error("Profile not found");

      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", profile.id)
        .eq("venue_id", venueId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useIsFavorite = (venueId: string) => {
  const { data: favorites } = useFavoritesDB();
  return favorites?.some((f) => f.venue_id === venueId) ?? false;
};
