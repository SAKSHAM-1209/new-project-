import { motion } from "framer-motion";
import { ArrowRight, GitCompare, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import VenueCard from "./VenueCard";

import { useCompare } from "@/contexts/CompareContext";

/* IMAGES */
// ===== VENUE 25 =====
import venue25_1 from "@/assets/venue25_1.jpg";
import venue25_2 from "@/assets/venue25_2.jpg";
import venue25_3 from "@/assets/venue25_3.jpg";
import venue25_4 from "@/assets/venue25_4.jpg";
import venue25_5 from "@/assets/venue25_5.jpg";
import venue25_6 from "@/assets/venue25_6.jpg";

// ===== VENUE 4 =====
import venue4 from "@/assets/venue4.jpg";
import venue4_2 from "@/assets/venue4_2.jpg";

// ===== VENUE 34 =====
import venue34_1 from "@/assets/venue34_1.jpg";
import venue34_2 from "@/assets/venue34_2.jpg";

// ===== VENUE 9 =====
import venue9 from "@/assets/venue9.jpg";
import venue9_2 from "@/assets/venue9_2.jpg";

// ===== VENUE 17 =====
import venue17_1 from "@/assets/venue17_1.jpg";
import venue17_2 from "@/assets/venue17_2.jpg";

// ===== VENUE 5 =====
import venue5 from "@/assets/venue5.jpg";
import venue5_2 from "@/assets/venue5_2.jpg";

/* TYPE */
type FoodType = "veg" | "nonveg" | "both";

interface PopularVenue {
  id: number;
  images: string[];
  name: string;
  location: string;
  address: string;
  capacity: string;

  perPlate?: number | null;
  vegPrice?: number | null;
  nonVegPrice?: number | null;

  foodType: FoodType;
  rating: number;

  reviews?: number;
  budget?: string;

  contact?: string;
  mapLink?: string;

  menuBasedPricing?: boolean;
  ownCateringAllowed?: boolean;
}

/* POPULAR VENUES DATA */
const venues: PopularVenue[] = [
  {
    id: 25,
    images: [venue25_1, venue25_2, venue25_3, venue25_4, venue25_5, venue25_6],
    name: "New Rahul Casel Banquet Lawn",
    location: "Kanpur",
    address: "Barra Bypass Road, Barra, Kanpur, Uttar Pradesh 208027",
    capacity: "1000",
    vegPrice: 1100,
    foodType: "veg",
    rating: 4.5,
    reviews: 68,
    budget: "₹8 Lakh – ₹12 Lakh",
    perPlate: 1100,
    contact: "+91 8726126607",
  },
  {
    id: 4,
    images: [venue4, venue4_2],
    name: "Annad Manglam AC Banquet",
    location: "Kanpur",
    address: "Kidwai Nagar, Near Hanuman Mandir, Kanpur, Uttar Pradesh",
    capacity: "600-700",
    vegPrice: 950,
    foodType: "veg",
    rating: 4.4,
    reviews: 63,
    perPlate: 950,
    contact: "+91 8726126607",
  },
  {
    id: 34,
    images: [venue34_1, venue34_2],
    name: "Hotel Regenta Central Crystal",
    location: "Kanpur",
    address: "The Mall Road, Civil Lines, Kanpur, Uttar Pradesh 208001",
    capacity: "500",
    vegPrice: 2000,
    nonVegPrice: 2300,
    foodType: "both",
    rating: 4.7,
    reviews: 102,
    budget: "₹8 Lakh – ₹12 Lakh",
    perPlate: 2000,
    contact: "+91 8726126607",
  },
  {
    id: 9,
    images: [venue9, venue9_2],
    name: "Aakriti Green",
    location: "Kanpur",
    address: "Kalyanpur Road, IIT Gate Area, Kanpur, Uttar Pradesh",
    capacity: "400-500",
    vegPrice: 1500,
    foodType: "veg",
    rating: 4.7,
    reviews: 94,
    budget: "₹5 Lakh – ₹8 Lakh",
    perPlate: 1500,
    contact: "+91 8726126607",
  },
  {
    id: 17,
    images: [venue17_1, venue17_2],
    name: "Parinay Guest House",
    location: "Kanpur",
    address: "Govind Nagar, Near Main Market, Kanpur, Uttar Pradesh",
    capacity: "600",
    vegPrice: 1100,
    foodType: "veg",
    rating: 3.7,
    reviews: 59,
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1100,
    contact: "+91 8726126607",
    ownCateringAllowed: true,
  },
  {
    id: 5,
    images: [venue5, venue5_2],
    name: "Hotel Manoj International",
    location: "Kanpur",
    address: "GT Road, Near Railway Station, Kanpur, Uttar Pradesh",
    capacity: "100-400",
    vegPrice: 1250,
    foodType: "veg",
    rating: 3.6,
    reviews: 89,
    perPlate: 1250,
    contact: "+91 8726126607",
    menuBasedPricing: true,
  },
];

const PopularVenues = () => {
  const { compareList, addToCompare, removeFromCompare } = useCompare();

  const toggleCompare = (venue: PopularVenue) => {
    const isAlreadyCompared = compareList.some((v) => v.id === venue.id);

    if (isAlreadyCompared) {
      removeFromCompare(venue.id);
    } else {
      addToCompare({
        id: venue.id,
        image: venue.images?.[0] || "/placeholder.jpg",
        name: venue.name,

        // full address for compare
        location: venue.address,

        capacity: venue.capacity,
        budget: venue.budget || "—",
        perPlate: venue.perPlate ?? null,
        vegPrice: venue.vegPrice ?? null,
        nonVegPrice: venue.nonVegPrice ?? null,
        foodType: venue.foodType,
        rating: venue.rating,

        priceRange: venue.perPlate
          ? `₹${venue.perPlate}/plate`
          : "Menu Based Pricing",

        venueType:
          venue.foodType === "both"
            ? "Banquet (Veg & Non-Veg)"
            : "Banquet / Lawn",

        eventTypes: ["Wedding", "Reception", "Engagement"],
      });
    }
  };

  return (
    <section className="relative section-padding bg-background overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="container-premium">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-14"
        >
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[75%]">
            {/* Badge ONLY on mobile */}
            <div className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 text-xs font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Trending Venues
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Explore Popular{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Banquets
              </span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl">
              Handpicked venues loved by couples and event planners.
            </p>

            {/* Guide line: Desktop inline, Mobile stacked */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm w-fit">
                <GitCompare className="w-4 h-4 text-blue-700" />
                <span className="text-gray-700 font-medium">
                  Tap <b>Compare</b> to add venues side-by-side
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-sm w-fit">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-gray-700 font-medium">
                  Tap <b>Favorite</b> to save venue for later
                </span>
              </div>
            </div>
          </div>

          {/* BUTTON RIGHT SIDE ONLY DESKTOP */}
          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <Link
              to="/venues"
              className="group inline-flex items-center justify-center gap-2 
              px-7 py-3 rounded-full font-semibold text-white 
              bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl 
              transition-all duration-300 w-full sm:w-[260px] lg:w-auto"
            >
              View All Venues
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* VENUE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {venues.map((venue, index) => {
            const isCompared = compareList.some((v) => v.id === venue.id);

            return (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -10 }}
              >
                <VenueCard
                  id={venue.id}
                  images={venue.images}
                  name={venue.name}
                  location={venue.location}
                  address={venue.address}
                  capacity={venue.capacity}
                  perPlate={venue.perPlate}
                  vegPrice={venue.vegPrice}
                  nonVegPrice={venue.nonVegPrice}
                  foodType={venue.foodType}
                  rating={venue.rating}
                  contact={venue.contact}
                  mapLink={venue.mapLink}
                  menuBasedPricing={venue.menuBasedPricing}
                  ownCateringAllowed={venue.ownCateringAllowed}
                  isCompared={isCompared}
                  onCompareToggle={() => toggleCompare(venue)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularVenues;