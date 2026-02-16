import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, ChevronUp } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCompare } from "@/contexts/CompareContext";

const ComparePage = () => {
  const { compareList, clearCompare } = useCompare();
  const navigate = useNavigate();

  const venues = compareList || [];

  const [filters, setFilters] = useState({
    foodType: "",
    minRating: "",
    maxPerPlate: "",
  });

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter((v) => v !== "").length;
  }, [filters]);

  // ✅ Auto Scroll Top on Page Load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ FILTERED VENUES
  const filteredVenues = useMemo(() => {
    return venues.filter((v: any) => {
      if (filters.foodType && v.foodType !== filters.foodType) return false;

      if (filters.minRating && (v.rating || 0) < Number(filters.minRating))
        return false;

      if (filters.maxPerPlate) {
        const minPrice = Math.min(
          Number(v.vegPrice) || Infinity,
          Number(v.nonVegPrice) || Infinity,
          Number(v.perPlate) || Infinity
        );

        if (minPrice > Number(filters.maxPerPlate)) return false;
      }

      return true;
    });
  }, [venues, filters]);

  // ✅ Budget Convert Function (₹3 Lakh – ₹5 Lakh => 300000)
  const extractBudgetNumber = (budget: any) => {
    if (!budget) return Infinity;

    const str = budget.toString().replace(/,/g, "").toLowerCase();

    const match = str.match(/(\d+(\.\d+)?)/);
    if (!match) return Infinity;

    let num = Number(match[1]);

    if (str.includes("lakh")) num *= 100000;
    if (str.includes("crore")) num *= 10000000;

    return num;
  };

  // ✅ AI PICK VENUE (Best Budget + PerPlate + Rating)
  const aiSuggestedVenue = useMemo(() => {
    if (!filteredVenues.length) return null;

    return [...filteredVenues].sort((a: any, b: any) => {
      const perPlateA =
        Number(a.perPlate) ||
        Number(a.vegPrice) ||
        Number(a.nonVegPrice) ||
        Infinity;

      const perPlateB =
        Number(b.perPlate) ||
        Number(b.vegPrice) ||
        Number(b.nonVegPrice) ||
        Infinity;

      const budgetA = extractBudgetNumber(a.budget);
      const budgetB = extractBudgetNumber(b.budget);

      const ratingA = Number(a.rating) || 0;
      const ratingB = Number(b.rating) || 0;

      // ✅ AI score formula:
      // Low per plate + low budget + high rating
      const scoreA = perPlateA * 0.6 + budgetA * 0.00001 - ratingA * 50;
      const scoreB = perPlateB * 0.6 + budgetB * 0.00001 - ratingB * 50;

      return scoreA - scoreB; // lowest score = best
    })[0];
  }, [filteredVenues]);

  // ✅ Clear Filters + Clear Compare + Redirect /venues
  const handleClearAndRedirect = () => {
    setFilters({ foodType: "", minRating: "", maxPerPlate: "" });
    setShowMobileFilter(false);

    clearCompare();
    navigate("/venues");
    window.scrollTo(0, 0);
  };

  // ❌ NO VENUES
  if (!venues.length) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center flex-col px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">No Venues Selected</h2>
          <Link to="/venues" className="text-blue-600 underline font-semibold">
            Go Back to Venues
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050B2E] via-[#081548] to-[#020617] text-white">
      <Header />

      <section className="pt-32 pb-24 px-4 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl bg-white/5 backdrop-blur-xl rounded-3xl border border-blue-500/20 shadow-[0_0_70px_rgba(59,130,246,0.25)] p-6 sm:p-10 relative overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-blue-400">
                Compare Venues
              </h1>
              <p className="text-blue-200/70 text-sm">
                Royal feature-by-feature comparison
              </p>
            </div>

            <Link
              to="/venues"
              className="flex items-center gap-2 text-blue-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>

          {/* DESKTOP FILTER BAR */}
          <div className="hidden md:grid bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-500/20 grid-cols-4 gap-4 mb-12 shadow-inner">
            {[
              {
                label: "Food",
                key: "foodType",
                options: ["veg", "nonveg", "both"],
              },
              {
                label: "Rating",
                key: "minRating",
                options: ["2.5", "3", "4", "4.5"],
              },
              {
                label: "Max Per Plate",
                key: "maxPerPlate",
                options: ["500", "1000", "1500", "2000", "2500"],
              },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-blue-300 text-sm font-medium mb-1 block">
                  {f.label}
                </label>

                <select
                  value={(filters as any)[f.key]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [f.key]: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-blue-950 text-blue-200 border border-blue-500/30"
                >
                  <option value="">All</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              onClick={handleClearAndRedirect}
              className="h-[44px] mt-6 bg-blue-500/10 border border-blue-400/30 text-blue-300 font-semibold rounded-lg hover:bg-blue-500/25 hover:text-white transition"
            >
              Clear & Go Venues
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border-separate border-spacing-y-2 border-spacing-x-2">
              <thead>
                <tr>
                  <th className="text-blue-300 text-left pl-2 text-sm">
                    Feature
                  </th>

                  {filteredVenues.map((v: any) => {
                    const isAI = aiSuggestedVenue?.id === v.id;

                    return (
                      <th key={v.id} className="px-3 min-w-[180px]">
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          className={`relative rounded-xl p-3 bg-blue-950/60 border border-blue-500/20 ${
                            isAI
                              ? "shadow-[0_0_35px_rgba(255,215,0,0.8)] ring-2 ring-yellow-400/50"
                              : ""
                          }`}
                        >
                          {isAI && (
                            <div className="absolute -top-3 right-2 bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-full animate-pulse font-bold">
                              ⭐ AI Best
                            </div>
                          )}

                          <img
                            src={v.image}
                            className="w-24 h-16 object-cover rounded-lg mx-auto mb-2"
                            alt={v.name}
                          />

                          <p className="font-semibold text-blue-300 text-sm">
                            {v.name}
                          </p>

                          <p className="text-[11px] text-blue-200/70">
                            {v.location || "Unknown"}
                          </p>
                        </motion.div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {[
                  ["Capacity", "capacity"],
                  ["Budget", "budget"],
                  ["Per Plate", "perPlate"],
                  ["Veg Price", "vegPrice"],
                  ["Non-Veg Price", "nonVegPrice"],
                  ["Food Type", "foodType"],
                  ["Rating", "rating"],
                ].map(([label, key]) => (
                  <tr key={key}>
                    <td className="text-blue-300 font-medium text-left pl-2 text-sm">
                      {label}
                    </td>

                    {filteredVenues.map((v: any) => (
                      <motion.td
                        whileHover={{ scale: 1.05 }}
                        key={v.id + key}
                        className="bg-blue-900/30 rounded-xl py-3 px-3 text-sm shadow-sm"
                      >
                        {/* ⭐ Rating */}
                        {key === "rating" ? (
                          v.rating ? (
                            <span className="flex justify-center gap-1 text-yellow-400 font-semibold">
                              <Star className="w-4 h-4 fill-yellow-400" />
                              {v.rating}
                            </span>
                          ) : (
                            "—"
                          )

                        ) : key === "vegPrice" ? (
                          v.menuBasedPricing ? (
                            <span className="text-yellow-400 font-semibold">
                              Menu Based
                            </span>
                          ) : v.ownCateringAllowed ? (
                            <span className="text-green-400 font-semibold">
                              Catering By Own
                            </span>
                          ) : v.vegPrice ? (
                            `₹${v.vegPrice}`
                          ) : (
                            <span className="text-red-500 font-bold text-lg">
                              ✖
                            </span>
                          )

                        ) : key === "nonVegPrice" ? (
                          v.foodType === "veg" ? (
                            <span className="text-red-500 font-bold text-lg">
                              ✖
                            </span>
                          ) : v.menuBasedPricing ? (
                            <span className="text-yellow-400 font-semibold">
                              Menu Based
                            </span>
                          ) : v.ownCateringAllowed ? (
                            <span className="text-green-400 font-semibold">
                              Catering By Own
                            </span>
                          ) : v.nonVegPrice ? (
                            `₹${v.nonVegPrice}`
                          ) : (
                            <span className="text-red-500 font-bold text-lg">
                              ✖
                            </span>
                          )

                        ) : key === "perPlate" ? (
                          v.menuBasedPricing ? (
                            <span className="text-yellow-400 font-semibold">
                              Menu Based
                            </span>
                          ) : v.ownCateringAllowed ? (
                            <span className="text-green-400 font-semibold">
                              Catering By Own
                            </span>
                          ) : v.perPlate ? (
                            `₹${v.perPlate}`
                          ) : (
                            "—"
                          )

                        ) : key === "budget" ? (
                          (() => {
                            if (!v.budget || v.budget === "—") return "—";
                            return v.budget.toString().includes("₹")
                              ? v.budget
                              : `₹${v.budget}`;
                          })()

                        ) : key === "foodType" ? (
                          v.foodType
                            ? v.foodType === "both"
                              ? "Veg & Non-Veg"
                              : v.foodType
                            : "—"

                        ) : (
                          v[key] || "—"
                        )}
                      </motion.td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* MOBILE FILTER BUTTON */}
      <div className="sticky bottom-5 right-0 w-full flex justify-end px-5 z-30 md:hidden">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#E5B73B] text-black font-semibold shadow-xl relative"
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {showMobileFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilter(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-[85%] bg-[#020617] z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-blue-500/20">
                <h2 className="text-xl font-semibold text-blue-300">Filters</h2>
                <button onClick={() => setShowMobileFilter(false)}>✕</button>
              </div>

              <div className="flex-1 px-6 py-4 space-y-4">
                {[
                  {
                    label: "Food",
                    key: "foodType",
                    options: ["veg", "nonveg", "both"],
                  },
                  { label: "Rating", key: "minRating", options: ["3", "4", "4.5"] },
                  {
                    label: "Max ₹",
                    key: "maxPerPlate",
                    options: ["1000", "1500", "2000", "2500"],
                  },
                ].map((f) => (
                  <select
                    key={f.key}
                    value={(filters as any)[f.key]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [f.key]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-blue-950 text-blue-200 border border-blue-500/30"
                  >
                    <option value="">{f.label}</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ))}
              </div>

              <div className="border-t border-blue-500/20 p-4 flex gap-3">
                <button
                  onClick={handleClearAndRedirect}
                  className="w-1/2 py-3 bg-blue-900/40 text-blue-200 rounded-xl"
                >
                  Clear
                </button>

                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="w-1/2 py-3 bg-blue-600 text-white rounded-xl"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE BAR */}
      {filteredVenues.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-950 border-t border-blue-500/20 p-3 flex justify-between md:hidden z-40">
          <span className="text-blue-300 text-sm">
            Comparing {filteredVenues.length} venues
          </span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-blue-400 flex gap-1 items-center"
          >
            View <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ComparePage;
