import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground overflow-hidden">
      {/* ===========================
          UNIQUE STAY IN TOUCH SECTION
      ============================ */}
      <div className="relative border-b border-white/10 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-black to-blue-900/40" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="relative container-premium py-14 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Side */}
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-blue-200 mb-6">
                <Sparkles className="w-4 h-4" />
                Find My Banquet Insider Club
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
                Stay in Touch with{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Luxury Celebrations
                </span>
              </h2>

              <p className="text-primary-foreground/70 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-6 mx-auto lg:mx-0">
                Get exclusive banquet deals, trending venues, wedding planning
                tips & early access to premium listings — straight to your inbox.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-primary-foreground/80 font-medium">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Latest Banquet Offers
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Verified Venue Updates
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Budget Planning Tips
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Wedding Checklist Guides
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              {/* Floating Badge */}
              <div className="absolute -top-4 right-6 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold shadow-lg">
                PREMIUM ALERTS
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Join our Wedding Newsletter 💌
              </h3>

              <p className="text-sm text-primary-foreground/60 mb-6">
                Be the first to know about trending venues & best price deals.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Welcome to Find My Banquet Insider Club!");
                }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />

                <button
                  type="submit"
                  className="w-full sm:w-auto group relative overflow-hidden px-8 py-4 rounded-xl 
                  bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 
                  text-white font-semibold tracking-wide shadow-lg 
                  flex items-center justify-center gap-2 
                  transition-all duration-300 ease-out
                  hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl
                  active:scale-95"
                >
                  {/* Shine Effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                  -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  ></span>

                  {/* Glow Border */}
                  <span className="absolute inset-0 rounded-xl ring-1 ring-white/20 group-hover:ring-yellow-400/60 transition-all"></span>

                  <span className="relative z-10 flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </button>
              </form>

              {/* Trust Line */}
              <p className="text-xs text-primary-foreground/50 mt-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                No spam. Only curated wedding deals & updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
          MAIN FOOTER CONTENT
      ============================ */}
      <div className="container-premium py-14 md:py-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start">
          <Link
  to="/"
  className="flex items-center justify-center w-full max-w-[400px] mx-auto group"
>
  <img
    src={logo}
    alt="Find My Banquet Logo"
    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain
               brightness-0 invert opacity-95 saturate-[200%]
               drop-shadow-[0_0_22px_rgba(37,99,235,0.95)]
               transition-all duration-300 ease-out
               group-hover:scale-110"
  />
</Link>


            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-xs mx-auto lg:mx-0 text-sm sm:text-base">
              India’s premium platform for discovering luxury wedding banquets,
              resorts and celebration venues. Your dream celebration starts
              here.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-semibold mb-6 text-accent">
              Quick Links
            </h4>

            <nav className="flex flex-col gap-3 items-center lg:items-start text-sm sm:text-base">
              <Link
                to="/"
                className="text-primary-foreground/70 hover:text-blue-400 transition-colors"
              >
                Home
              </Link>

              <Link
                to="/venues"
                className="text-primary-foreground/70 hover:text-blue-400 transition-colors"
              >
                Browse Banquets
              </Link>

              <Link
                to="/register-banquet"
                className="text-primary-foreground/70 hover:text-blue-400 transition-colors"
              >
                List Your Banquet
              </Link>

              <Link
                to="/contact"
                className="text-primary-foreground/70 hover:text-blue-400 transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-semibold mb-6 text-accent">
              Top Locations
            </h4>

            <nav className="flex flex-col gap-3 items-center lg:items-start text-sm sm:text-base">
              {[
                "Kanpur",
                "Lucknow",
                "Meerut",
                "Ghaziabad",
                "Noida",
                "Agra",
                "Mathura",
                "Varanasi",
              ].map((city) => (
                <Link
                  key={city}
                  to="/venues"
                  className="text-primary-foreground/70 hover:text-blue-400 transition-colors"
                >
                  Banquets in {city}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-semibold mb-6 text-accent">
              Get in Touch
            </h4>

            <div className="flex flex-col gap-4 items-center lg:items-start text-sm sm:text-base">
              <a
                href="tel:+919305812043"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-400" />
                +91 9305812043
              </a>

              <a
                href="mailto:Info@findmybanquet.com"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-400" />
                Info@findmybanquet.com
              </a>

              <Link
                to="/contact"
                className="w-full sm:w-auto mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-lg 
                transition-all duration-300 ease-out
                hover:from-yellow-400 hover:to-orange-500 hover:text-black 
                hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03]
                active:scale-95"
              >
                Send Inquiry
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 text-center text-xs sm:text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Find My Banquet. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
