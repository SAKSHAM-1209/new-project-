import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface VenueForFavorites {
  id: number;
  image: string;
  name: string;
  location: string;
  fullAddress?: string;

  capacity: string;
  priceRange: string;

  phone?: string;
  whatsapp?: string;
}

interface FavoritesContextType {
  favorites: VenueForFavorites[];
  addToFavorites: (venue: VenueForFavorites) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;

  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = "findmybanquet_favorites";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<VenueForFavorites[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed: VenueForFavorites[] = JSON.parse(stored);

      return parsed.map((v) => ({
        ...v,
        id: Number(v.id),
        fullAddress: v.fullAddress ?? v.location,
      }));
    } catch (err) {
      console.error("Error loading favorites:", err);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (venue: VenueForFavorites) => {
    setFavorites((prev) => {
      const exists = prev.find((v) => v.id === venue.id);

      // Update if already exists
      if (exists) {
        return prev.map((v) =>
          v.id === venue.id
            ? {
                ...v,
                ...venue,
                fullAddress: venue.fullAddress ?? venue.location ?? v.location,
              }
            : v
        );
      }

      // Add new
      return [
        ...prev,
        {
          ...venue,
          fullAddress: venue.fullAddress ?? venue.location,
        },
      ];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((v) => v.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((v) => v.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
