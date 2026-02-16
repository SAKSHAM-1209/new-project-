import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  user_id: string;
  venue_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const useReviews = (venueId: string) => {
  return useQuery({
    queryKey: ["reviews", venueId],
    queryFn: async (): Promise<Review[]> => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq("venue_id", venueId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!venueId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      venueId,
      rating,
      comment,
    }: {
      venueId: string;
      rating: number;
      comment?: string;
    }) => {
      // First get the user's profile id
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;

      const { data, error } = await supabase
        .from("reviews")
        .insert({
          venue_id: venueId,
          user_id: profile.id,
          rating,
          comment,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.venueId] });
      queryClient.invalidateQueries({ queryKey: ["venue", variables.venueId] });
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, venueId }: { reviewId: string; venueId: string }) => {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.venueId] });
      queryClient.invalidateQueries({ queryKey: ["venue", variables.venueId] });
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
};
