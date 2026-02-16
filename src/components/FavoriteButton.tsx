import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites, VenueForFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
  venue: VenueForFavorites;
  className?: string;
}

const FavoriteButton = ({ venue, className = "" }: FavoriteButtonProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const isActive = isFavorite(venue.id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isActive) {
      removeFromFavorites(venue.id);
    } else {
      addToFavorites(venue);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      className={`p-2.5 rounded-full backdrop-blur-sm transition-all ${
        isActive
          ? "bg-red-500 text-white shadow-lg"
          : "bg-white/90 text-muted-foreground hover:bg-white hover:text-red-500"
      } ${className}`}
      aria-label={isActive ? "Remove from favorites" : "Add to favorites"}
    >
      <motion.div
        initial={false}
        animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
      </motion.div>
    </motion.button>
  );
};

export default FavoriteButton;
