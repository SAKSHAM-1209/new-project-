import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Users,
  Star,
  Grid,
  List,
  Phone,
  MessageCircle,
  Trash2,
  Loader2,
  GitCompare,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoritesDB, useRemoveFavorite } from "@/hooks/useFavoritesDB";
import { useCompare } from "@/contexts/CompareContext";
import { toast } from "sonner";

const FavoritesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { data: favorites, isLoading } = useFavoritesDB();
  const removeFavorite = useRemoveFavorite();
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view your favorites");
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleRemove = async (venueId: string) => {
    try {
      await removeFavorite.mutateAsync(venueId);
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove from favorites");
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(0)}k+`;
    }
    return `₹${price}`;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-8">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
                My <span className="text-gold-gradient">Favorites</span>
              </h1>
              <p className="text-muted-foreground">
                {favorites?.length || 0} saved venues
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-premium">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
            </div>
          ) : favorites && favorites.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {favorites.map((fav, index) => {
                const venue = fav.venues;
                const inCompare = isInCompare(venue.id);
                const canAdd = compareList.length < 4;

                return viewMode === "grid" ? (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`card-premium group relative ${
                      inCompare ? "ring-2 ring-accent" : ""
                    }`}
                  >
                    {/* Compare Button */}
                    <button
                      onClick={() => {
                        if (inCompare) {
                          removeFromCompare(venue.id);
                        } else if (canAdd) {
                          addToCompare({
                            id: venue.id,
                            image: venue.images?.[0] || "/placeholder.svg",
                            name: venue.name,
                            location: `${venue.city}`,
                            capacity: `${venue.capacity}`,
                            priceRange: formatPrice(venue.price_per_plate),
                          });
                        }
                      }}
                      disabled={!inCompare && !canAdd}
                      className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shadow-sm ${
                        inCompare
                          ? "bg-accent text-primary"
                          : canAdd
                          ? "bg-white/95 backdrop-blur-sm text-muted-foreground hover:bg-accent hover:text-primary"
                          : "bg-white/60 text-muted-foreground/50 cursor-not-allowed"
                      }`}
                    >
                      {inCompare ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="text-sm font-semibold">Added</span>
                        </>
                      ) : (
                        <>
                          <GitCompare className="w-4 h-4" />
                          <span className="text-sm font-semibold">Compare</span>
                        </>
                      )}
                    </button>

                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                      <img
                        src={venue.images?.[0] || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <button
                        onClick={() => handleRemove(venue.id)}
                        disabled={removeFavorite.isPending}
                        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-destructive hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {venue.name}
                        </h3>
                        {venue.average_rating && venue.average_rating > 0 && (
                          <div className="flex items-center gap-1 text-accent">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-semibold">
                              {venue.average_rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{venue.city}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{venue.capacity}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-primary">
                          {formatPrice(venue.price_per_plate)}/plate
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href="tel:+919876543210"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                        <a
                          href="https://wa.me/919876543210"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </div>

                      <Link
                        to={`/venue/${venue.id}`}
                        className="block mt-3 text-center py-2.5 border-2 border-border rounded-xl text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl p-4 shadow-card border border-border flex gap-4"
                  >
                    <img
                      src={venue.images?.[0] || "/placeholder.svg"}
                      alt={venue.name}
                      className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-foreground">
                            {venue.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {venue.address}, {venue.city}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(venue.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-accent" />
                          {venue.capacity} guests
                        </span>
                        <span className="font-semibold text-primary">
                          {formatPrice(venue.price_per_plate)}/plate
                        </span>
                        {venue.average_rating && venue.average_rating > 0 && (
                          <span className="flex items-center gap-1 text-accent">
                            <Star className="w-4 h-4 fill-current" />
                            {venue.average_rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Link
                          to={`/venue/${venue.id}`}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => {
                            if (inCompare) {
                              removeFromCompare(venue.id);
                            } else if (canAdd) {
                              addToCompare({
                                id: venue.id,
                                image: venue.images?.[0] || "/placeholder.svg",
                                name: venue.name,
                                location: venue.city,
                                capacity: `${venue.capacity}`,
                                priceRange: formatPrice(venue.price_per_plate),
                              });
                            }
                          }}
                          disabled={!inCompare && !canAdd}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            inCompare
                              ? "bg-accent text-primary"
                              : "border-2 border-border text-foreground hover:border-accent"
                          }`}
                        >
                          {inCompare ? "Added" : "Compare"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                No favorites yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start exploring venues and save your favorites here
              </p>
              <Link to="/venues" className="btn-gold inline-block">
                Browse Venues
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
