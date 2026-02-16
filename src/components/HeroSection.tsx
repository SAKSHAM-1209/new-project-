import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Users,
  Calendar,
  IndianRupee,
  X,
  PartyPopper,
  Phone,
  User,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Crown,
  Gem,
  Star,
  UtensilsCrossed,
  BellRing,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Supabase Import
import { supabase } from "@/integrations/supabase/client";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

const heroSlides = [heroSlide1, heroSlide2, heroSlide3, heroSlide4];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔔 Home Notification
  const [homeToast, setHomeToast] = useState(false);

  // 🔍 Hero Search
  const [searchData, setSearchData] = useState({
    city: "",
    eventType: "",
    guestCount: "",
    budget: "",
    date: "",
  });

  // 🎉 Modal State
  const [showEventModal, setShowEventModal] = useState(false);
  const [step, setStep] = useState(1);
  const [successPopup, setSuccessPopup] = useState(false);

  // ⏳ Loading state for DB save
  const [saving, setSaving] = useState(false);

  // 💎 Package Selection
  const [selectedPackage, setSelectedPackage] = useState("Gold");

  // 📝 Booking Form Data
  const [eventBookingData, setEventBookingData] = useState({
    packageType: "Gold",
    name: "",
    phone: "",
    city: "",
    eventType: "",
    guestCount: "",
    budget: "",
    foodType: "",
    date: "",
    notes: "",
  });

  // 🎞 Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // 🚀 Auto Popup Only Once (Session)
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("eventPopupShown");

    if (!alreadyShown) {
      const popupTimer = setTimeout(() => {
        setShowEventModal(true);
        sessionStorage.setItem("eventPopupShown", "true");
      }, 1400);

      return () => clearTimeout(popupTimer);
    }
  }, []);

  // 🔒 Body Scroll Lock When Modal Open
  useEffect(() => {
    if (showEventModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showEventModal]);

  // ⌨ ESC Key Close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // 🔔 Show Toast After Redirect
  useEffect(() => {
    const showToast = localStorage.getItem("showBookingToast");

    if (showToast === "true") {
      setHomeToast(true);
      localStorage.removeItem("showBookingToast");

      setTimeout(() => {
        setHomeToast(false);
      }, 3000);
    }
  }, []);

  // 🔍 Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const budgetMap: Record<string, string> = {
      "Under 1 Lakh": "Under ₹1 Lakh",
      "1-3 Lakh": "₹1 Lakh – ₹3 Lakh",
      "3-5 Lakh": "₹3 Lakh – ₹5 Lakh",
      "5-8 Lakh": "₹5 Lakh – ₹8 Lakh",
      "8-12 Lakh": "₹8 Lakh – ₹12 Lakh",
      "12+ Lakh": "₹12 Lakh+",
    };

    const updatedSearchData = {
      ...searchData,
      budget: budgetMap[searchData.budget] || "",
    };

    navigate("/venues", { state: updatedSearchData });
  };

  // ❌ Close Modal
  const closeModal = () => {
    setShowEventModal(false);
    setStep(1);
  };

  // ✅ Step 1 Validation
  const canGoNext =
    eventBookingData.name.trim().length >= 3 &&
    eventBookingData.phone.trim().length === 10 &&
    eventBookingData.city.trim().length >= 2;

  // 🧹 Reset Form After Submit
  const resetForm = () => {
    setSelectedPackage("Gold");
    setEventBookingData({
      packageType: "Gold",
      name: "",
      phone: "",
      city: "",
      eventType: "",
      guestCount: "",
      budget: "",
      foodType: "",
      date: "",
      notes: "",
    });
  };

  // ✅ SAVE BOOKING TO SUPABASE DATABASE
 const saveBookingToDB = async () => {
  const { data, error } = await supabase
    .from("event_bookings")
    .insert([
      {
        package_type: selectedPackage,
        name: eventBookingData.name,
        phone: eventBookingData.phone,
        city: eventBookingData.city,
        event_type: eventBookingData.eventType,
        guest_count: Number(eventBookingData.guestCount),
        budget: eventBookingData.budget,
        food_type: eventBookingData.foodType,
        event_date: eventBookingData.date,
        notes: eventBookingData.notes,
      },
    ])
    .select();

  if (error) {
    console.log("Insert Error:", error);
    alert("Insert failed: " + error.message);
    return false;
  }

  console.log("Inserted Successfully:", data);
  return true;
};

  // ✅ Submit + Redirect Home + Toast
 const handleEventBookingSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (saving) return;

  setSaving(true);

  const success = await saveBookingToDB();

  if (!success) {
    setSaving(false);
    return;
  }

  setSuccessPopup(true);
  localStorage.setItem("showBookingToast", "true");

  setTimeout(() => {
    setSuccessPopup(false);
    closeModal();
    resetForm();

    setSaving(false);

    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1700);
};

  // 🎁 Packages
  const packageCards = [
    {
      name: "Silver",
      icon: <Star className="w-5 h-5" />,
      price: "Best for Small Events",
      features: ["Venue Assistance", "Catering Options", "Basic Decoration"],
      gradient: "from-slate-100 via-slate-50 to-white",
      border: "border-slate-200",
    },
    {
      name: "Gold",
      icon: <Crown className="w-5 h-5" />,
      price: "Most Popular Choice",
      features: [
        "Premium Venue Booking",
        "Full Catering Menu",
        "Theme Decoration",
        "DJ + Lighting Setup",
      ],
      gradient: "from-yellow-100 via-orange-100 to-white",
      border: "border-yellow-400",
    },
    {
      name: "Platinum",
      icon: <Gem className="w-5 h-5" />,
      price: "Luxury Wedding Package",
      features: [
        "Luxury Venue + Rooms",
        "Premium Catering",
        "Royal Decoration",
        "Photography + Cinematic Video",
        "VIP Guest Services",
      ],
      gradient: "from-blue-100 via-indigo-100 to-white",
      border: "border-blue-500",
    },
  ];

  return (
    <section className="relative flex items-center justify-center min-h-[100svh] sm:min-h-screen pt-24 sm:pt-28 px-4 sm:px-6 overflow-hidden">
      {/* 🔔 HOME TOAST */}
      <AnimatePresence>
        {homeToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[92%] sm:w-auto"
          >
            <div className="flex items-center gap-3 bg-white border border-blue-200 shadow-2xl px-5 py-4 rounded-2xl">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700">
                <BellRing className="w-5 h-5 text-yellow-300" />
              </div>

              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">
                  Booking Saved Successfully 🎉
                </h4>
                <p className="text-xs text-gray-600">
                  Our team will contact you soon.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={heroSlides[currentSlide]}
            alt="Luxury venue"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Royal Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041634]/90 via-[#071d40]/80 to-[#041634]/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl text-center py-8 sm:py-16 pb-24 sm:pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline */}
          <h1 className="font-serif font-bold text-white leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
              Search
            </span>
            <span className="mx-2 sm:mx-4 text-white/30">|</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
              Select
            </span>
            <span className="mx-2 sm:mx-4 text-white/30">|</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
              Celebrate
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-6 sm:mb-10 px-3">
            Discover premium banquet halls & wedding venues. Compare capacity,
            price and book your complete event instantly.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {/* CITY */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                <select
                  value={searchData.city}
                  onChange={(e) =>
                    setSearchData({ ...searchData, city: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 bg-muted rounded-lg text-sm"
                >
                  <option value="">Select City</option>
                  {[
                    "Kanpur",
                    "Lucknow",
                    "Noida",
                    "Ghaziabad",
                    "Meerut",
                    "Agra",
                    "Mathura",
                    "Vrindavan",
                    "Ayodhya",
                    "Banaras",
                    "Prayagraj",
                    "Bareilly",
                    "Aligarh",
                    "Bulandshahr",
                    "Faizabad",
                    "Gorakhpur",
                  ].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* EVENT TYPE */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                <select
                  value={searchData.eventType}
                  onChange={(e) =>
                    setSearchData({ ...searchData, eventType: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 bg-muted rounded-lg text-sm"
                >
                  <option value="">Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* GUESTS */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                <select
                  value={searchData.guestCount}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      guestCount: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-3 bg-muted rounded-lg text-sm"
                >
                  <option value="">Guests</option>
                  <option value="Under-100">Under - 100</option>
                  <option value="100-200">100 – 200</option>
                  <option value="200-400">200 – 400</option>
                  <option value="400-600">400 – 600</option>
                  <option value="600-800">600 – 800</option>
                  <option value="800-1000">800 – 1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>

              {/* BUDGET */}
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                <select
                  value={searchData.budget}
                  onChange={(e) =>
                    setSearchData({ ...searchData, budget: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 bg-muted rounded-lg text-sm"
                >
                  <option value="">Budget</option>
                  <option value="Under 1 Lakh">Under - ₹1 Lakh</option>
                  <option value="1-3 Lakh">₹1 – ₹3 Lakh</option>
                  <option value="3-5 Lakh">₹3 – ₹5 Lakh</option>
                  <option value="5-8 Lakh">₹5 – ₹8 Lakh</option>
                  <option value="8-12 Lakh">₹8 – ₹12 Lakh</option>
                  <option value="12+ Lakh">₹12 Lakh+</option>
                </select>
              </div>

              {/* DATE */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700 pointer-events-none z-10" />

                {!searchData.date && (
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                    Select Date
                  </span>
                )}

                <input
                  type="date"
                  value={searchData.date}
                  onChange={(e) =>
                    setSearchData({ ...searchData, date: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 bg-muted rounded-lg text-sm appearance-none"
                />
              </div>

              {/* SEARCH BUTTON */}
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-lg py-3 font-semibold text-sm flex items-center justify-center gap-1 hover:opacity-90 transition"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowEventModal(true)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white px-5 py-3 rounded-full shadow-2xl font-extrabold flex items-center gap-2 border border-white/20"
      >
        <PartyPopper className="w-5 h-5 text-yellow-300" />
        Book Whole Event
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-md px-2 sm:px-4 pb-4 sm:pb-0"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 140, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 140, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.35 }}
              className="relative w-full max-w-4xl sm:max-h-[92vh] overflow-hidden rounded-[1.6rem] sm:rounded-[2.2rem] shadow-[0_25px_120px_rgba(0,0,0,0.65)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/25 via-indigo-500/25 to-yellow-500/20 blur-2xl" />

              <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-[1.6rem] sm:rounded-[2.2rem] p-4 sm:p-6 max-h-[80vh] sm:max-h-[92vh] overflow-y-auto">
                <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden"></div>

                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition"
                >
                  <X className="w-5 h-5 text-black" />
                </button>

                <div className="text-center mb-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white font-extrabold text-xs shadow-lg mb-3">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    Royal Booking Experience
                  </div>

                  <h2 className="text-lg sm:text-3xl font-extrabold text-gray-900 leading-tight">
                    Book Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900">
                      Complete Event Package
                    </span>
                  </h2>

                  <p className="text-gray-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
                    Choose your package & get best venue, catering, decoration,
                    DJ and photography deals instantly.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Packages */}
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900 mb-3">
                      Choose Your Package 👑
                    </h3>

                    <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[520px] pb-10 pr-2 scroll-smooth">
                      {packageCards.map((pkg) => (
                        <motion.div
                          key={pkg.name}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedPackage(pkg.name);
                            setEventBookingData({
                              ...eventBookingData,
                              packageType: pkg.name,
                            });
                          }}
                          className={`min-w-[260px] lg:min-w-0 cursor-pointer p-4 rounded-2xl border-2 ${
                            selectedPackage === pkg.name
                              ? "border-blue-700 shadow-xl"
                              : pkg.border
                          } bg-gradient-to-br ${pkg.gradient} transition`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 font-extrabold text-gray-900 text-sm sm:text-base">
                              {pkg.icon}
                              {pkg.name} Package
                            </div>

                            {selectedPackage === pkg.name && (
                              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-900 text-white">
                                Selected
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-700 font-semibold mb-2">
                            {pkg.price}
                          </p>

                          <ul className="text-xs text-gray-700 space-y-1">
                            {pkg.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: step === 1 ? "50%" : "100%" }}
                        transition={{ duration: 0.5 }}
                        className="h-2 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-full"
                      />
                    </div>

                    <p className="text-xs text-gray-500 font-semibold mb-3">
                      Step {step} of 2
                    </p>

                    <form
                      onSubmit={handleEventBookingSubmit}
                      className="space-y-4"
                    >
                      <AnimatePresence mode="wait">
                        {/* Step 1 */}
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.35 }}
                            className="space-y-4"
                          >
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                              <input
                                type="text"
                                placeholder="Your Full Name"
                                value={eventBookingData.name}
                                onChange={(e) =>
                                  setEventBookingData({
                                    ...eventBookingData,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                required
                              />
                            </div>

                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                              <input
                                type="tel"
                                placeholder="Mobile Number (10 digits)"
                                value={eventBookingData.phone}
                                maxLength={10}
                                onChange={(e) => {
                                  const onlyDigits = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  setEventBookingData({
                                    ...eventBookingData,
                                    phone: onlyDigits,
                                  });
                                }}
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                required
                              />
                            </div>

                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                              <input
                                type="text"
                                placeholder="City (Ex: Kanpur, Lucknow...)"
                                value={eventBookingData.city}
                                onChange={(e) =>
                                  setEventBookingData({
                                    ...eventBookingData,
                                    city: e.target.value,
                                  })
                                }
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                required
                              />
                            </div>

                            <motion.button
                              whileHover={{ scale: canGoNext ? 1.02 : 1 }}
                              whileTap={{ scale: canGoNext ? 0.95 : 1 }}
                              type="button"
                              disabled={!canGoNext}
                              onClick={() => setStep(2)}
                              className={`w-full py-3 rounded-2xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                                canGoNext
                                  ? "bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white"
                                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              Continue
                              <ChevronRight className="w-5 h-5" />
                            </motion.button>

                            <button
                              type="button"
                              onClick={closeModal}
                              className="w-full text-sm font-semibold text-gray-500 hover:text-gray-800 transition"
                            >
                              Skip for now
                            </button>
                          </motion.div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.35 }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <select
                                value={eventBookingData.eventType}
                                onChange={(e) =>
                                  setEventBookingData({
                                    ...eventBookingData,
                                    eventType: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                required
                              >
                                <option value="">Function Type</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Reception">Reception</option>
                                <option value="Engagement">Engagement</option>
                                <option value="Birthday Party">
                                  Birthday Party
                                </option>
                                <option value="Corporate Event">
                                  Corporate Event
                                </option>
                                <option value="Baby Shower">Baby Shower</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Other">Other</option>
                              </select>

                              <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                                <input
                                  type="number"
                                  placeholder="Total Guests"
                                  value={eventBookingData.guestCount}
                                  onChange={(e) =>
                                    setEventBookingData({
                                      ...eventBookingData,
                                      guestCount: e.target.value,
                                    })
                                  }
                                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                  required
                                />
                              </div>

                              <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                                <select
                                  value={eventBookingData.budget}
                                  onChange={(e) =>
                                    setEventBookingData({
                                      ...eventBookingData,
                                      budget: e.target.value,
                                    })
                                  }
                                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                  required
                                >
                                  <option value="">Budget Range</option>
                                  <option value="Under ₹1 Lakh">
                                    Under ₹1 Lakh
                                  </option>
                                  <option value="₹1 – ₹3 Lakh">
                                    ₹1 – ₹3 Lakh
                                  </option>
                                  <option value="₹3 – ₹5 Lakh">
                                    ₹3 – ₹5 Lakh
                                  </option>
                                  <option value="₹5 – ₹8 Lakh">
                                    ₹5 – ₹8 Lakh
                                  </option>
                                  <option value="₹8 – ₹12 Lakh">
                                    ₹8 – ₹12 Lakh
                                  </option>
                                  <option value="₹12 Lakh+">₹12 Lakh+</option>
                                </select>
                              </div>

                              <div className="relative">
                                <UtensilsCrossed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700" />
                                <select
                                  value={eventBookingData.foodType}
                                  onChange={(e) =>
                                    setEventBookingData({
                                      ...eventBookingData,
                                      foodType: e.target.value,
                                    })
                                  }
                                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                  required
                                >
                                  <option value="">Food Type</option>
                                  <option value="Veg">Veg</option>
                                  <option value="Non-Veg">Non-Veg</option>
                                  <option value="Both">
                                    Both (Veg + Non-Veg)
                                  </option>
                                </select>
                              </div>

                              <div className="relative sm:col-span-2">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-700 z-10 pointer-events-none" />

                                {!eventBookingData.date && (
                                  <span className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                                    Select Event Date
                                  </span>
                                )}

                                <input
                                  type="date"
                                  value={eventBookingData.date}
                                  onChange={(e) =>
                                    setEventBookingData({
                                      ...eventBookingData,
                                      date: e.target.value,
                                    })
                                  }
                                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner"
                                  required
                                />
                              </div>
                            </div>

                            <textarea
                              placeholder="Special Requirements (Decoration, Catering Menu, DJ, Photography...)"
                              value={eventBookingData.notes}
                              onChange={(e) =>
                                setEventBookingData({
                                  ...eventBookingData,
                                  notes: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-700 shadow-inner min-h-[90px]"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full py-3 rounded-2xl font-bold text-sm bg-gray-200 text-gray-800 shadow-md flex items-center justify-center gap-2"
                              >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: saving ? 1 : 1.02 }}
                                whileTap={{ scale: saving ? 1 : 0.95 }}
                                type="submit"
                                disabled={saving}
                                className={`w-full py-3 rounded-2xl font-extrabold text-sm shadow-xl ${
                                  saving
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white"
                                }`}
                              >
                                {saving ? "Saving..." : "Confirm Booking 🚀"}
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>

                {/* Success Popup */}
                <AnimatePresence>
                  {successPopup && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center rounded-[1.6rem] sm:rounded-[2.2rem]"
                    >
                      <div className="bg-white rounded-3xl px-10 py-10 shadow-2xl text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-3" />
                        <h3 className="text-2xl font-extrabold text-gray-900">
                          Booking Saved Successfully!
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                          Redirecting to Home...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
