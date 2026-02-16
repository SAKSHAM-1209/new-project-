import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Users,
  Phone,
  MessageCircle,
  BadgeCheck,
  Check,
  Minus,
} from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { Link } from "react-router-dom";

const CompareModal = () => {
  const { compareList, isModalOpen, closeModal, removeFromCompare } =
    useCompare();

  if (!isModalOpen) return null;

  const comparisonFields = [
    { key: "location", label: "Location", icon: MapPin },
    { key: "capacity", label: "Capacity", icon: Users },
    { key: "priceRange", label: "Price Range" },
    { key: "venueType", label: "Venue Type" },
    { key: "eventTypes", label: "Event Types" },
  ];

  const formatValue = (venue: any, key: string) => {
    const value = venue?.[key];

    if (key === "eventTypes" && Array.isArray(value)) {
      return value.map((e: string) => e.charAt(0).toUpperCase() + e.slice(1)).join(", ");
    }

    if (key === "venueType" && typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return value || "—";
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Compare Venues
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Side-by-side comparison of {compareList.length} selected venues
              </p>
            </div>

            <button
              onClick={closeModal}
              className="p-2 hover:bg-muted rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-6">
            <table className="w-full min-w-[600px]">
              {/* Headers */}
              <thead>
                <tr>
                  <th className="text-left p-4 w-40"></th>

                  {compareList.map((venue) => (
                    <th key={venue.id} className="p-4 min-w-[200px]">
                      <div className="relative group">
                        <button
                          onClick={() => removeFromCompare(Number(venue.id))}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                          <img
                            src={venue.image || "/placeholder.jpg"}
                            alt={venue.name || "Venue"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h3 className="font-serif text-lg font-bold text-foreground">
                          {venue.name || "Venue"}
                        </h3>

                        <div className="flex items-center justify-center gap-1.5 mt-2">
                          <BadgeCheck className="w-4 h-4 text-accent" />
                          <span className="text-sm text-accent font-medium">
                            Verified
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {comparisonFields.map((field, idx) => (
                  <tr
                    key={field.key}
                    className={idx % 2 === 0 ? "bg-muted/50" : ""}
                  >
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        {field.icon && (
                          <field.icon className="w-4 h-4 text-accent" />
                        )}
                        {field.label}
                      </div>
                    </td>

                    {compareList.map((venue) => (
                      <td
                        key={venue.id}
                        className="p-4 text-center text-muted-foreground"
                      >
                        {formatValue(venue, field.key)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Dummy Amenities */}
                <tr className="bg-muted/50">
                  <td className="p-4 font-medium text-foreground">Parking</td>
                  {compareList.map((venue) => (
                    <td key={venue.id} className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-medium text-foreground">Catering</td>
                  {compareList.map((venue) => (
                    <td key={venue.id} className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  ))}
                </tr>

                <tr className="bg-muted/50">
                  <td className="p-4 font-medium text-foreground">WiFi</td>
                  {compareList.map((venue, idx) => (
                    <td key={venue.id} className="p-4 text-center">
                      {idx % 2 === 0 ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-4"></td>
                  {compareList.map((venue) => (
                    <td key={venue.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <a
                            href="tel:+919876543210"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-navy-light transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>

                          <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>
                        </div>

                        <Link
                          to={`/venue/${venue.id}`}
                          onClick={closeModal}
                          className="block text-center py-2.5 border-2 border-border rounded-xl text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareModal;
