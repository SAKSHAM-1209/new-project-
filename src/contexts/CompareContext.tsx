import { createContext, useContext, useState, ReactNode } from "react";

export type FoodType = "veg" | "nonveg" | "both";

export interface VenueForComparison {
  id: number;
  image: string;
  name: string;
  location: string;

  // ✅ FIX: address support (VenuesPage se pass hoga)
  address?: string;

  capacity?: string;

  budget?: number | string;
  perPlate?: number | string;

  vegPrice?: number | string | null;
  nonVegPrice?: number | string | null;

  rating?: number;
  reviews?: number; // ✅ ADDED

  foodType?: FoodType;

  // ✅ Menu / Catering flags
  menuBasedPricing?: boolean;
  ownCateringAllowed?: boolean;

  // optional extra fields
  priceRange?: string;
  venueType?: string;
  eventTypes?: string[];
  manager: string;
  contact: number | string;
  mapLink: string;
   perPlateNote: string;
}

interface CompareContextType {
  compareList: VenueForComparison[];
  addToCompare: (venue: VenueForComparison) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;

  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<VenueForComparison[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCompare = (venue: VenueForComparison) => {
    setCompareList((prev) => {
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      if (prev.some((v) => v.id === venue.id)) return prev;

      return [...prev, venue];
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareList((prev) => prev.filter((v) => v.id !== id));
  };

  const isInCompare = (id: number) => {
    return compareList.some((v) => v.id === id);
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }

  return context;
};
