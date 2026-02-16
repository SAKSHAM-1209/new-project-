import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CompareProvider } from "./contexts/CompareContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./contexts/AuthContext";

import CompareBar from "./components/CompareBar";
import FavoritesDrawer from "./components/FavoritesDrawer";

import { GoogleOAuthProvider } from "@react-oauth/google";

/* -------------------- */
/* Lazy Loaded Pages */
/* -------------------- */
const Index = lazy(() => import("./pages/Index"));
const VenuesPage = lazy(() => import("./pages/VenuesPage"));
const VenueDetailPage = lazy(() => import("./pages/VenueDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ListVenuePage = lazy(() => import("./pages/ListVenuePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const NotFound = lazy(() => import("./pages/NotFound"));


/* -------------------- */
/* Query Client */
/* -------------------- */
const queryClient = new QueryClient();

const App = () => {
  return (
    <GoogleOAuthProvider clientId="916341318215-lc853us2pfbkf3n5k2tlc228e2u400oh.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <CompareProvider>
                <FavoritesProvider>
                  {/* Global UI */}
                  <Toaster />
                  <Sonner />

                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
                        Loading...
                      </div>
                    }
                  >
                    <Routes>
                      {/* Public */}
                      <Route path="/" element={<Index />} />
                      <Route path="/venues" element={<VenuesPage />} />
                      <Route path="/venue/:id" element={<VenueDetailPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />

                      {/* Compare */}
                      <Route path="/compare" element={<ComparePage />} />

                      {/* Auth */}
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/login" element={<AuthPage />} />
                      <Route path="/signin" element={<AuthPage />} />

                      {/* TEMP: No Protection */}
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="/list-venue" element={<ListVenuePage />} />

                      {/* 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>

                    {/* Persistent UI */}
                    <CompareBar />
                    <FavoritesDrawer />
                  </Suspense>
                </FavoritesProvider>
              </CompareProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
