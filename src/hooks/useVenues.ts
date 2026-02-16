import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Venue {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  capacity: number;
  price_per_plate: number;
  food_type: "veg" | "non_veg" | "both" | null;
  manager_name: string | null;
  manager_phone: string | null;
  manager_email: string | null;
  amenities: string[] | null;
  images: string[] | null;
  owner_id: string | null;
  status: "pending" | "approved" | "live";
  is_verified: boolean | null;
  average_rating: number | null;
  review_count: number | null;
  created_at: string;
  updated_at: string;
}

export const useVenues = () => {
  return useQuery({
    queryKey: ["venues"],
    queryFn: async (): Promise<Venue[]> => {
      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .eq("status", "live")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useVenue = (id: string) => {
  return useQuery({
    queryKey: ["venue", id],
    queryFn: async (): Promise<Venue | null> => {
      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .eq("id", id)
        .eq("status", "live")
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }
      return data;
    },
    enabled: !!id,
  });
};
