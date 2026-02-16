import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Phone, Heart, GitCompare, Star, Send } from "lucide-react";

import { useFavorites } from "@/contexts/FavoritesContext";

interface VenueCardProps {
  id: number;
  images: string[];
  name: string;
  location: string;
  address: string;
  capacity: string;

  perPlate?: number | null;
  vegPrice?: number | null;
  nonVegPrice?: number | null;

  foodType: "veg" | "nonveg" | "both";
  rating: number;

  contact?: string;
  mapLink?: string;

  menuBasedPricing?: boolean;
  ownCateringAllowed?: boolean;

  isCompared: boolean;
  onCompareToggle: (venue: any) => void;
}

const VenueCard = ({
  id,
  images,
  name,
  location,
  address,
  capacity,
  perPlate,
  vegPrice,
  nonVegPrice,
  foodType,
  rating,
  contact,
  mapLink,
  menuBasedPricing,
  ownCateringAllowed,
  isCompared,
  onCompareToggle,
}: VenueCardProps) => {
  const [current, setCurrent] = useState(0);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isFav = isFavorite(id);

  // ✅ Auto Image Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  // ✅ Price Range Text
  const priceRangeText = menuBasedPricing
    ? "Menu Based"
    : ownCateringAllowed
    ? "Catering By Own"
    : foodType === "both"
    ? `Veg ₹${vegPrice ?? "N/A"} | NonVeg ₹${nonVegPrice ?? "N/A"}`
    : foodType === "nonveg"
    ? `₹${nonVegPrice ?? perPlate ?? "N/A"}/plate`
    : `₹${perPlate ?? vegPrice ?? "N/A"}/plate`;

  // ✅ Toggle Favorite (FULL ADDRESS FIX)
  const toggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        name,
        image: images[0],
        location,          // ✅ short location
        fullAddress: address, // ✅ FULL ADDRESS SAVE (MAIN FIX)
        capacity,
        priceRange: priceRangeText,
        phone: contact || "+919305812043",
        whatsapp: "917428617371",
      });
    }
  };

  // ✅ Submit Review
  const submitReview = () => {
    if (!userRating || !userReview.trim()) {
      alert("Please add rating and review");
      return;
    }

    alert("Thanks for your review!");
    setUserRating(0);
    setUserReview("");
    setShowReviewBox(false);
  };

  // ✅ Google Map Link
  const googleMapLink =
    mapLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      name + " " + (address || location)
    )}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl
        ${isCompared ? "ring-2 ring-blue-600 shadow-blue-200/50" : ""}
      `}
    >
      {/* ✅ Image Slider Wrapper */}
      <div className="relative h-56 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            initial={{ opacity: 0.3, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-[1]" />

        {/* ✅ Compare Button */}
        <button
          onClick={() =>
            onCompareToggle({
              id,
              images,
              name,
              location,
              address,
              capacity,
              perPlate,
              vegPrice,
              nonVegPrice,
              foodType,
              rating,
              contact,
              mapLink,
              menuBasedPricing,
              ownCateringAllowed,
            })
          }
          className={`absolute top-3 left-3 z-20 p-2 rounded-full shadow-lg transition-all duration-300 border
            ${
              isCompared
                ? "bg-blue-700 border-blue-400 ring-2 ring-white scale-110 shadow-[0_0_18px_rgba(255,255,255,0.55)]"
                : "bg-white/90 border-transparent hover:bg-blue-600 hover:border-blue-400 hover:ring-2 hover:ring-blue-400/50 hover:scale-110"
            }
          `}
        >
          <GitCompare
            className={`w-5 h-5 transition-all duration-300
              ${isCompared ? "text-white" : "text-gray-600 hover:text-white"}
            `}
          />
        </button>

        {/* ✅ Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 group
          ${isFav ? "bg-red-500/95" : "bg-white/90"}
          `}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isFav
                ? "fill-white text-white scale-110"
                : "text-gray-500 group-hover:fill-red-500 group-hover:text-red-500 group-hover:scale-110"
            }`}
          />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.slice(0, 6).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-5 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-2xl font-serif font-bold text-gray-900">{name}</h3>

        {/* Location + Address */}
        <div className="flex gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mt-0.5" />
          <div className="leading-tight">
            <p className="font-semibold text-gray-700">{location}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{address}</p>
          </div>
        </div>

        {/* Capacity + Price */}
        <div className="flex justify-between text-sm font-medium items-start">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {capacity} Guests
          </span>

          <div className="text-right font-bold leading-tight">
            {menuBasedPricing ? (
              <span className="text-yellow-700 text-sm font-bold">
                Menu Based
              </span>
            ) : ownCateringAllowed ? (
              <span className="text-green-700 text-sm font-bold">
                Catering By Own
              </span>
            ) : foodType === "both" ? (
              <div className="space-y-1">
                <div className="text-blue-700 text-xs font-bold">
                  Veg: ₹{vegPrice ?? "N/A"}/plate
                </div>
                <div className="text-red-600 text-xs font-bold">
                  Non-Veg: ₹{nonVegPrice ?? "N/A"}/plate
                </div>
              </div>
            ) : foodType === "nonveg" ? (
              <span className="text-red-600 text-sm font-bold">
                ₹{nonVegPrice ?? perPlate ?? "N/A"}/plate
              </span>
            ) : (
              <span className="text-blue-700 text-sm font-bold">
                ₹{perPlate ?? vegPrice ?? "N/A"}/plate
              </span>
            )}
          </div>
        </div>

        {/* Food + Rating */}
        <div className="flex justify-between text-sm">
          <span className="capitalize px-2 py-1 rounded-full bg-muted text-xs font-semibold">
            {foodType === "both" ? "Veg & Non-Veg" : foodType}
          </span>

          <span className="text-yellow-500 flex items-center gap-1 font-semibold">
            <Star className="w-4 h-4 fill-yellow-400" /> {rating}
          </span>
        </div>

        {/* Map + Call Buttons */}
        <div className="flex justify-between items-center gap-3 pt-4 border-t">
          <a
            href={googleMapLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl
              bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-200
              hover:bg-blue-700 hover:text-white transition"
          >
            <MapPin className="w-4 h-4" />
            View Map
          </a>

          <a
            href={`tel:${contact || "+919305812043"}`}
            className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl
              bg-green-50 text-green-700 font-semibold text-sm border border-green-200
              hover:bg-green-700 hover:text-white transition"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
        </div>

        {/* Review Button */}
        <button
          onClick={() => setShowReviewBox(!showReviewBox)}
          className="w-full mt-3 py-3 border border-blue-700 rounded-xl text-sm font-medium
             bg-blue-700 text-white
             hover:bg-white hover:text-blue-700 hover:border-blue-700
             transition-all duration-300"
        >
          Write a Review
        </button>

        {/* Review Box */}
        <AnimatePresence>
          {showReviewBox && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-gray-100 p-4 rounded-xl space-y-4"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`w-6 h-6 cursor-pointer transition ${
                      star <= userRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400 hover:text-yellow-400"
                    }`}
                  />
                ))}
              </div>

              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Share your experience..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl resize-none border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={submitReview}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                           bg-[#1f2f55] text-white font-medium hover:bg-blue-700 transition-all duration-300"
              >
                <Send className="w-4 h-4" /> Submit Review
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VenueCard;
