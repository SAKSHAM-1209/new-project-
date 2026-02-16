import { motion, AnimatePresence } from "framer-motion";
import { X, GitCompare } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { useNavigate, useLocation } from "react-router-dom";

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();

  if (compareList.length === 0) return null;

  const handleCompare = () => {
    if (compareList.length < 2) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      navigate("/compare");
    }, 200);
  };

  const handleClear = () => {
    clearCompare();

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      navigate("/venues");
    }, 200);
  };

  const handleRemove = (id: number) => {
    removeFromCompare(id);

    // ✅ if last venue removed -> go venues (only if currently on compare page)
    setTimeout(() => {
      if (compareList.length === 1 && location.pathname === "/compare") {
        navigate("/venues");
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)]"
      >
        <div className="container-premium py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Selected Venues */}
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Compare ({compareList.length}/4):
              </span>

              <div className="flex gap-2">
                {compareList.map((venue) => (
                  <motion.div
                    key={venue.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-blue-700 shadow-md">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <button
                      onClick={() => handleRemove(venue.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap max-w-16 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                      {venue.name}
                    </span>
                  </motion.div>
                ))}

                {/* Empty slots */}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-14 h-14 rounded-xl border-2 border-dashed border-blue-700/40 flex items-center justify-center"
                  >
                    <span className="text-xs text-blue-700 font-bold">+</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleClear}
                className="text-sm text-muted-foreground hover:text-blue-700 transition-colors font-medium"
              >
                Clear
              </button>

              <button
                onClick={handleCompare}
                disabled={compareList.length < 2}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white 
                           bg-blue-700 hover:bg-blue-800 transition-all duration-300 
                           shadow-lg hover:shadow-blue-700/30 hover:-translate-y-[2px]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <GitCompare className="w-4 h-4" />
                <span className="hidden sm:inline">Compare</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
