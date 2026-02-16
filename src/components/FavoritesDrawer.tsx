import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  MapPin,
  Users,
  Phone,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";

const FavoritesDrawer = () => {
  const {
    favorites,
    removeFromFavorites,
    clearFavorites,
    isDrawerOpen,
    closeDrawer,
  } = useFavorites();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Saved Venues
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {favorites.length}{" "}
                    {favorites.length === 1 ? "venue" : "venues"} saved
                  </p>
                </div>
              </div>

              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    No saved venues yet
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-xs">
                    Tap the heart icon on venues you love to save them for later
                  </p>
                  <Link
                    to="/venues"
                    onClick={closeDrawer}
                    className="btn-primary"
                  >
                    Browse Venues
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((venue) => {
                    const phoneNumber = venue.phone || "+919305812043";
                    const whatsappNumber = venue.whatsapp || "917428617371";

                    return (
                      <motion.div
                        key={venue.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-muted rounded-xl overflow-hidden"
                      >
                        <div className="flex gap-4 p-4">
                          <img
                            src={venue.image}
                            alt={venue.name}
                            className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif font-bold text-foreground truncate">
                                {venue.name}
                              </h4>

                              <button
                                onClick={() => removeFromFavorites(venue.id)}
                                className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group"
                              >
                                <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500" />
                              </button>
                            </div>

                            {/* FULL ADDRESS */}
                            <div className="flex items-start gap-1.5 text-sm text-muted-foreground mt-2">
                              <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span className="leading-snug break-words">
                                {venue.fullAddress || venue.location}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-accent" />
                                <span>{venue.capacity}</span>
                              </div>

                              <span className="font-semibold text-primary">
                                {venue.priceRange}
                              </span>
                            </div>

                           
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 px-4 pb-4">
                          <a
                            href={`tel:${phoneNumber}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-navy-light transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            Call
                          </a>

                          <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {favorites.length > 0 && (
              <div className="p-6 border-t border-border">
                <button
                  onClick={clearFavorites}
                  className="w-full py-3 text-center text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors"
                >
                  Clear All Saved Venues
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FavoritesDrawer;
