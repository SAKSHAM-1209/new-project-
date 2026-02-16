import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TrustStats from "@/components/TrustStats";
import MarqueeSection from "@/components/MarqueeSection";
import PopularVenues from "@/components/PopularVenues";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import OwnerCTA from "@/components/OwnerCTA";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const msg = localStorage.getItem("toast_message");

    if (msg) {
      setToastMessage(msg);

      // ✅ Remove after reading
      localStorage.removeItem("toast_message");

      // ✅ Auto close after 5 seconds
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 z-[9999] w-[92%] sm:w-[480px]"
          >
            <div
              className="flex items-start gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 
                         text-white px-5 py-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
            >
              <CheckCircle2 className="w-6 h-6 text-green-300 mt-0.5" />

              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold leading-snug">
                  {toastMessage}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Thank you for submitting your venue 💙
                </p>
              </div>

              <button
                onClick={() => setToastMessage(null)}
                className="p-2 rounded-xl hover:bg-white/10 transition"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <HeroSection />
        <TrustStats />
        <MarqueeSection />
        <WhyChooseUs />
        <PopularVenues />
        <HowItWorks />
        <OwnerCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
