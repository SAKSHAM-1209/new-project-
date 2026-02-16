import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, LogIn, LogOut } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites, openDrawer } = useFavorites();
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "BANQUETS", path: "/venues" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
         <Link to="/" className="flex items-center gap-3 group">
  <img
    src={logo}
    alt="Find My Banquet Logo"
    className="w-20 h-20 md:w-28 md:h-28 object-contain transition-transform duration-300 group-hover:scale-105
               invert sepia saturate-[6000%] hue-rotate-[190deg] brightness-[0.9] contrast-[1.3]"
  />
</Link>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-semibold text-sm uppercase tracking-wide transition-colors duration-300 group ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Favorites */}
            <button
              onClick={openDrawer}
              className="relative p-2.5 rounded-xl transition-colors group"
            >
              <Heart className="w-5 h-5 text-muted-foreground group-hover:text-red-600 group-hover:fill-red-600 transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <div className="w-px h-8 bg-border" />

            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold 
                           bg-blue-600 text-white border border-blue-600
                           hover:bg-white hover:text-blue-600 
                           transition-all shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* List My Venue */}
            <Link
              to="/list-venue"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold 
                         text-blue-700 bg-blue-50 border border-blue-200 
                         hover:bg-blue-600 hover:text-white transition"
            >
              List My Banquet
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Favorites */}
            <button
              onClick={openDrawer}
              className="relative p-2 hover:bg-red-50 rounded-lg transition-colors group"
            >
              <Heart className="w-5 h-5 text-muted-foreground group-hover:text-red-600 group-hover:fill-red-600 transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-white text-black shadow-md hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container-premium py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 rounded-xl font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-border my-4" />

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full py-3 border border-border rounded-xl font-medium hover:bg-muted"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-center bg-blue-600 text-white rounded-xl font-medium hover:bg-white hover:text-blue-600 border border-blue-600 transition"
                >
                  Login / Sign Up
                </Link>
              )}

              <Link
                to="/list-venue"
                onClick={() => setIsMenuOpen(false)}
                className="text-center w-full py-3 mt-2 rounded-xl font-semibold 
                           bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white 
                           border border-blue-200 transition"
              >
                List My Banquet
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
