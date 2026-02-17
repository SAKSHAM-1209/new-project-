import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Phone,
  MessageCircle,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Utensils,
  IndianRupee,
  Star,
  Heart,
  Navigation,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewSection from "@/components/ReviewSection";
import { useVenue } from "@/hooks/useVenues";
import { toast } from "sonner";

import { useFavorites } from "@/contexts/FavoritesContext";

import venue1 from "@/assets/venue1_1.jpg";
import venue2 from "@/assets/venue2.jpg";
import venue3 from "@/assets/venue3.jpg";
import venue4 from "@/assets/venue4.jpg";


const fallbackImages = [venue1, venue2, venue3, venue4];

const VenueDetailPage = () => {
  const { id } = useParams();
  const { data: venue, isLoading, error } = useVenue(id || "");

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
  });

  const isFav = isFavorite(Number(id));

  const images = venue?.images?.length ? venue.images : fallbackImages;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleFavoriteToggle = () => {
    if (!venue) return;

    const venueId = Number(id);

    if (isFav) {
      removeFromFavorites(venueId);
      toast.success("Removed from favorites");
    } else {
      addToFavorites({
        id: venueId,
        name: venue.name,
        image: images[0],
        location: venue.city || "Unknown Location",
        fullAddress: `${venue.address}, ${venue.city}${
          venue.state ? ", " + venue.state : ""
        }${venue.postal_code ? " - " + venue.postal_code : ""}`,
        capacity: String(venue.capacity),
        priceRange: `₹${venue.price_per_plate}/plate`,
        phone: venue.manager_phone || "+919305812043",
        whatsapp: venue.manager_phone || "917428617371",
      });

      toast.success("Added to favorites");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your enquiry! We will contact you shortly.");
  };

  const getFoodTypeLabel = (type: string | null) => {
    switch (type) {
      case "veg":
        return "Vegetarian Only";
      case "non_veg":
        return "Non-Vegetarian Only";
      case "both":
        return "Veg & Non-Veg";
      default:
        return "Veg & Non-Veg";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Venue Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The venue you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/venues" className="btn-gold">
            Browse Venues
          </Link>
        </div>
      </div>
    );
  }

  const fullAddress = `${venue.address}, ${venue.city}${
    venue.state ? ", " + venue.state : ""
  }${venue.postal_code ? " - " + venue.postal_code : ""}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Image Gallery */}
      <section className="pt-20">
        <div className="relative h-[50vh] md:h-[70vh]">
          <img
            src={images[currentImageIndex]}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-accent" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Verified Badge */}
          {venue.is_verified && (
            <div className="absolute top-24 left-4 md:left-6 bg-accent text-primary px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
              <BadgeCheck className="w-5 h-5" />
              <span className="font-semibold">Verified Venue</span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-24 right-4 md:right-6 p-3 rounded-full shadow-lg transition-all ${
              isFav
                ? "bg-destructive text-white"
                : "bg-white/90 text-muted-foreground hover:text-destructive"
            }`}
          >
            <Heart className={`w-6 h-6 ${isFav ? "fill-current" : ""}`} />
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {venue.average_rating && venue.average_rating > 0 && (
                    <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-lg">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold">
                        {venue.average_rating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({venue.review_count} reviews)
                      </span>
                    </div>
                  )}
                </div>

                <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
                  {venue.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm md:text-base">{fullAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{venue.capacity} guests</span>
                  </div>
                </div>
              </motion.div>

              {/* Key Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-muted rounded-2xl p-4 md:p-6 text-center">
                  <IndianRupee className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Per Plate
                  </p>
                  <p className="font-bold text-foreground text-sm md:text-lg">
                    {formatPrice(venue.price_per_plate)}
                  </p>
                </div>

                <div className="bg-muted rounded-2xl p-4 md:p-6 text-center">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Capacity
                  </p>
                  <p className="font-bold text-foreground text-sm md:text-lg">
                    {venue.capacity} guests
                  </p>
                </div>

                <div className="bg-muted rounded-2xl p-4 md:p-6 text-center">
                  <Utensils className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Food Type
                  </p>
                  <p className="font-bold text-foreground text-sm md:text-lg">
                    {getFoodTypeLabel(venue.food_type)}
                  </p>
                </div>

                <div className="bg-muted rounded-2xl p-4 md:p-6 text-center">
                  <Navigation className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Location
                  </p>
                  <p className="font-bold text-foreground text-sm md:text-lg">
                    {venue.city}
                  </p>
                </div>
              </motion.div>

              {/* Reviews */}
              <ReviewSection
                venueId={venue.id}
                averageRating={venue.average_rating}
                reviewCount={venue.review_count}
              />
            </div>

            {/* Contact Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-3xl p-6 md:p-8 shadow-card sticky top-28"
              >
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Get in Touch
                </h3>

                <div className="space-y-3 mb-8">
                  <a
                    href={`tel:${venue.manager_phone || "+919305812043"}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>

                  <a
                    href={`https://wa.me/91${
                      venue.manager_phone?.replace(/\D/g, "") || "9305812043"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Now
                  </a>
                </div>

                {/* Enquiry Form */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold text-foreground mb-4">
                    Send Enquiry
                  </h4>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="input-premium"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="input-premium"
                    />

                    <select
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({ ...formData, eventType: e.target.value })
                      }
                      required
                      className="input-premium appearance-none cursor-pointer"
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="reception">Reception</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                    </select>

                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData({ ...formData, eventDate: e.target.value })
                      }
                      required
                      className="input-premium"
                    />

                    <button type="submit" className="btn-gold w-full">
                      Submit Enquiry
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VenueDetailPage;
