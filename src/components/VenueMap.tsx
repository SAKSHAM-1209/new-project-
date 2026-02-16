import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: string;
  priceRange: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

interface VenueMapProps {
  venues: Venue[];
  selectedVenue: string | null;
  onVenueSelect: (id: string | null) => void;
}

const VenueMap = ({ venues, selectedVenue, onVenueSelect }: VenueMapProps) => {
  // Simple map representation using CSS positioning
  // In production, this would integrate with Google Maps or Mapbox
  const mapBounds = {
    minLat: 8.0,
    maxLat: 32.0,
    minLng: 68.0,
    maxLng: 97.0,
  };

  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x: Math.min(Math.max(x, 5), 95), y: Math.min(Math.max(y, 5), 95) };
  };

  const selected = venues.find((v) => v.id === selectedVenue);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-primary/10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* India outline placeholder */}
      <div className="absolute inset-4 border-2 border-dashed border-primary/10 rounded-xl flex items-center justify-center">
        <span className="text-muted-foreground/30 text-sm font-medium">Map View - India</span>
      </div>

      {/* Venue Pins */}
      {venues.map((venue) => {
        const pos = getPosition(venue.coordinates.lat, venue.coordinates.lng);
        const isSelected = selectedVenue === venue.id;

        return (
          <motion.button
            key={venue.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onVenueSelect(isSelected ? null : venue.id)}
            className={`absolute z-10 transform -translate-x-1/2 -translate-y-full transition-all ${
              isSelected ? "z-20" : ""
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div
              className={`relative flex flex-col items-center ${
                isSelected ? "scale-125" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                  isSelected
                    ? "bg-accent text-primary"
                    : "bg-primary text-primary-foreground hover:bg-accent hover:text-primary"
                }`}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div
                className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent transition-colors ${
                  isSelected ? "border-t-accent" : "border-t-primary"
                }`}
              />
            </div>
          </motion.button>
        );
      })}

      {/* Selected Venue Card */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card rounded-2xl shadow-hover overflow-hidden"
        >
          <div className="flex gap-4 p-4">
            <img
              src={selected.image}
              alt={selected.name}
              className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-foreground truncate">
                {selected.name}
              </h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {selected.location}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {selected.capacity} guests • <span className="font-semibold text-primary">{selected.priceRange}</span>
              </p>
            </div>
            <button
              onClick={() => onVenueSelect(null)}
              className="absolute top-2 right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          <div className="flex gap-2 px-4 pb-4">
            <a
              href="tel:+919876543210"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <Link
              to={`/venue/${selected.id}`}
              className="flex items-center justify-center gap-1.5 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VenueMap;
