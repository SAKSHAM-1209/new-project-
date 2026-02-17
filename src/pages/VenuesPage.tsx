import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Users, Phone, Heart, GitCompare, Star, Send, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { useLocation } from "react-router-dom";



// ===== VENUE 1 =====
import venue1 from "@/assets/venue1_1.jpg";
import venue1_2 from "@/assets/venue1_2.jpg";
import venue1_3 from "@/assets/venue1_3.jpg";
import venue1_4 from "@/assets/venue1_4.jpg";
import venue1_5 from "@/assets/venue1_5.jpg";

// ===== VENUE 2 =====
import venue2 from "@/assets/venue2.jpg";
import venue2_2 from "@/assets/venue2_2.jpg";
import venue2_3 from "@/assets/venue2_3.jpg";
import venue2_4 from "@/assets/venue2_4.jpg";

// ===== VENUE 3 =====
import venue3 from "@/assets/venue3.jpg";

// ===== VENUE 4 =====
import venue4 from "@/assets/venue4.jpg";
import venue4_2 from "@/assets/venue4_2.jpg";


// ===== VENUE 5 =====
import venue5 from "@/assets/venue5.jpg";
import venue5_2 from "@/assets/venue5_2.jpg";


// ===== VENUE 6 =====
import venue6 from "@/assets/venue6.jpg";
import venue6_2 from "@/assets/venue6_2.jpg";


// ===== VENUE 7 =====
import venue7_1 from "@/assets/venue7_1.jpg";
import venue7_2 from "@/assets/venue7_2.jpg";
import venue7_3 from "@/assets/venue7_3.jpg";
import venue7_4 from "@/assets/venue7_4.jpg";

// ===== VENUE 8 =====
import venue8 from "@/assets/venue8.jpg";
import venue8_2 from "@/assets/venue8_2.jpg";


// ===== VENUE 9 =====
import venue9 from "@/assets/venue9.jpg";
import venue9_2 from "@/assets/venue9_2.jpg";


// ===== VENUE 10 =====
import venue10 from "@/assets/venue10.jpg";
import venue10_2 from "@/assets/venue10_2.jpg";
import venue10_3 from "@/assets/venue10_3.jpg";
import venue10_4 from "@/assets/venue10_4.jpg";

// ===== VENUE 11 =====
import venue11 from "@/assets/venue11.jpg";
import venue11_2 from "@/assets/venue11_2.jpg";
import venue11_3 from "@/assets/venue11_3.jpg";


// ===== VENUE 12 =====
import venue12 from "@/assets/venue12.jpg";

// ===== VENUE 13 =====
import venue13 from "@/assets/venue13.jpg";
import venue13_2 from "@/assets/venue13_2.jpg";

// ===== VENUE 14 =====
import venue14_1 from "@/assets/venue14_1.jpg";
import venue14_2 from "@/assets/venue14_2.jpg";
import venue14_3 from "@/assets/venue14_3.jpg";
import venue14_4 from "@/assets/venue14_4.jpg";

// ===== VENUE 15 =====
import venue15_1 from "@/assets/venue15_1.jpg";
import venue15_2 from "@/assets/venue15_2.jpg";
import venue15_3 from "@/assets/venue15_3.jpg";
// import venue15_4 from "@/assets/venue15_4.jpg";
// import venue15_5 from "@/assets/venue15_5.jpg";
// import venue15_6 from "@/assets/venue15_6.jpg";
// import venue15_7 from "@/assets/venue15_7.jpg";
// import venue15_8 from "@/assets/venue15_8.jpg";

// ===== VENUE 16 =====
import venue16_1 from "@/assets/venue16_1.jpg";
import venue16_2 from "@/assets/venue16_2.jpg";
// import venue16_3 from "@/assets/venue16_3.jpg";
// import venue16_4 from "@/assets/venue16_4.jpg";
// import venue16_5 from "@/assets/venue16_5.jpg";
// import venue16_6 from "@/assets/venue16_6.jpg";
// import venue16_7 from "@/assets/venue16_7.jpg";
// import venue16_8 from "@/assets/venue16_8.jpg";

// ===== VENUE 17 =====
import venue17_1 from "@/assets/venue17_1.jpg";
import venue17_2 from "@/assets/venue17_2.jpg";
// import venue17_3 from "@/assets/venue17_3.jpg";
// import venue17_4 from "@/assets/venue17_4.jpg";
// import venue17_5 from "@/assets/venue17_5.jpg";
// import venue17_6 from "@/assets/venue17_6.jpg";
// import venue17_7 from "@/assets/venue17_7.jpg";
// import venue17_8 from "@/assets/venue17_8.jpg";

// ===== VENUE 18 =====
import venue18_1 from "@/assets/venue18_1.jpg";
import venue18_2 from "@/assets/venue18_2.jpg";
import venue18_3 from "@/assets/venue18_3.jpg";
import venue18_4 from "@/assets/venue18_4.jpg";
import venue18_5 from "@/assets/venue18_5.jpg";
import venue18_6 from "@/assets/venue18_6.jpg";
// import venue18_7 from "@/assets/venue18_7.jpg";
// import venue18_8 from "@/assets/venue18_8.jpg";

// ===== VENUE 19 =====
import venue19_1 from "@/assets/venue19_1.jpg";
import venue19_2 from "@/assets/venue19_2.jpg";
import venue19_3 from "@/assets/venue19_3.jpg";
import venue19_4 from "@/assets/venue19_4.jpg";
// import venue19_5 from "@/assets/venue19_5.jpg";
// import venue19_6 from "@/assets/venue19_6.jpg";
// import venue19_7 from "@/assets/venue19_7.jpg";
// import venue19_8 from "@/assets/venue19_8.jpg";

// ===== VENUE 20 =====
import venue20_1 from "@/assets/venue20_1.jpg";
import venue20_2 from "@/assets/venue20_2.jpg";
import venue20_3 from "@/assets/venue20_3.jpg";
import venue20_4 from "@/assets/venue20_4.jpg";
import venue20_5 from "@/assets/venue20_5.jpg";
// import venue20_6 from "@/assets/venue20_6.jpg";
// import venue20_7 from "@/assets/venue20_7.jpg";
// import venue20_8 from "@/assets/venue20_8.jpg";

// ===== VENUE 21 =====
import venue21_1 from "@/assets/venue21_1.jpg";
import venue21_2 from "@/assets/venue21_2.jpg";
import venue21_3 from "@/assets/venue21_3.jpg";
import venue21_4 from "@/assets/venue21_4.jpg";
// import venue21_5 from "@/assets/venue21_5.jpg";
// import venue21_6 from "@/assets/venue21_6.jpg";
// import venue21_7 from "@/assets/venue21_7.jpg";
// import venue21_8 from "@/assets/venue21_8.jpg";

// ===== VENUE 22 =====
import venue22_1 from "@/assets/venue22_1.jpg";
import venue22_2 from "@/assets/venue22_2.jpg";
import venue22_3 from "@/assets/venue22_3.jpg";
import venue22_4 from "@/assets/venue22_4.jpg";
// import venue22_5 from "@/assets/venue22_5.jpg";
// import venue22_6 from "@/assets/venue22_6.jpg";
// import venue22_7 from "@/assets/venue22_7.jpg";
// import venue22_8 from "@/assets/venue22_8.jpg";

// ===== VENUE 23 =====
import venue23_1 from "@/assets/venue23_1.jpg";
import venue23_2 from "@/assets/venue23_2.jpg";
import venue23_3 from "@/assets/venue23_3.jpg";
import venue23_4 from "@/assets/venue23_4.jpg";
// import venue23_5 from "@/assets/venue23_5.jpg";
// import venue23_6 from "@/assets/venue23_6.jpg";
// import venue23_7 from "@/assets/venue23_7.jpg";
// import venue23_8 from "@/assets/venue23_8.jpg";

// ===== VENUE 24 =====
import venue24_1 from "@/assets/venue24_1.jpg";
import venue24_2 from "@/assets/venue24_2.jpg";
import venue24_3 from "@/assets/venue24_3.jpg";
// import venue24_4 from "@/assets/venue24_4.jpg";
// import venue24_5 from "@/assets/venue24_5.jpg";
// import venue24_6 from "@/assets/venue24_6.jpg";
// import venue24_7 from "@/assets/venue24_7.jpg";
// import venue24_8 from "@/assets/venue24_8.jpg";

// ===== VENUE 25 =====
import venue25_1 from "@/assets/venue25_1.jpg";
import venue25_2 from "@/assets/venue25_2.jpg";
import venue25_3 from "@/assets/venue25_3.jpg";
import venue25_4 from "@/assets/venue25_4.jpg";
import venue25_5 from "@/assets/venue25_5.jpg";
import venue25_6 from "@/assets/venue25_6.jpg";
// import venue25_7 from "@/assets/venue25_7.jpg";
// import venue25_8 from "@/assets/venue25_8.jpg";

// ===== VENUE 26 =====
import venue26_1 from "@/assets/venue26_1.jpg";
import venue26_2 from "@/assets/venue26_2.jpg";
import venue26_3 from "@/assets/venue26_3.jpg";
// import venue26_4 from "@/assets/venue26_4.jpg";
// import venue26_5 from "@/assets/venue26_5.jpg";
// import venue26_6 from "@/assets/venue26_6.jpg";
// import venue26_7 from "@/assets/venue26_7.jpg";
// import venue26_8 from "@/assets/venue26_8.jpg";

// ===== VENUE 27 =====
import venue27_1 from "@/assets/venue27_1.jpg";
import venue27_2 from "@/assets/venue27_2.jpg";
import venue27_3 from "@/assets/venue27_3.jpg";
import venue27_4 from "@/assets/venue27_4.jpg";
// import venue27_5 from "@/assets/venue27_5.jpg";
// import venue27_6 from "@/assets/venue27_6.jpg";
// import venue27_7 from "@/assets/venue27_7.jpg";
// import venue27_8 from "@/assets/venue27_8.jpg";

// ===== VENUE 28 =====
import venue28_1 from "@/assets/venue28_1.jpg";
import venue28_2 from "@/assets/venue28_2.jpg";
import venue28_3 from "@/assets/venue28_3.jpg";
// import venue28_4 from "@/assets/venue28_4.jpg";
// import venue28_5 from "@/assets/venue28_5.jpg";
// import venue28_6 from "@/assets/venue28_6.jpg";
// import venue28_7 from "@/assets/venue28_7.jpg";
// import venue28_8 from "@/assets/venue28_8.jpg";

// ===== VENUE 29 =====
import venue29_1 from "@/assets/venue29_1.jpg";
import venue29_2 from "@/assets/venue29_2.jpg";
import venue29_3 from "@/assets/venue29_3.jpg";
import venue29_4 from "@/assets/venue29_4.jpg";
import venue29_5 from "@/assets/venue29_5.jpg";
import venue29_6 from "@/assets/venue29_6.jpg";
import venue29_7 from "@/assets/venue29_7.jpg";
// import venue29_8 from "@/assets/venue29_8.jpg";

// ===== VENUE 30 =====
import venue30_1 from "@/assets/venue30_1.jpg";
import venue30_2 from "@/assets/venue30_2.jpg";
import venue30_3 from "@/assets/venue30_3.jpg";
// import venue30_4 from "@/assets/venue30_4.jpg";
// import venue30_5 from "@/assets/venue30_5.jpg";
// import venue30_6 from "@/assets/venue30_6.jpg";
// import venue30_7 from "@/assets/venue30_7.jpg";
// import venue30_8 from "@/assets/venue30_8.jpg";

// ===== VENUE 31 =====
import venue31_1 from "@/assets/venue31_1.jpg";
import venue31_2 from "@/assets/venue31_2.jpg";
import venue31_3 from "@/assets/venue31_3.jpg";
import venue31_4 from "@/assets/venue31_4.jpg";
import venue31_5 from "@/assets/venue31_5.jpg";
// import venue31_6 from "@/assets/venue31_6.jpg";
// import venue31_7 from "@/assets/venue31_7.jpg";
// import venue31_8 from "@/assets/venue31_8.jpg";

// ===== VENUE 32 =====
import venue32_1 from "@/assets/venue32_1.jpg";
import venue32_2 from "@/assets/venue32_2.jpg";
import venue32_3 from "@/assets/venue32_3.jpg";
import venue32_4 from "@/assets/venue32_4.jpg";
import venue32_5 from "@/assets/venue32_5.jpg";
// import venue32_6 from "@/assets/venue32_6.jpg";
// import venue32_7 from "@/assets/venue32_7.jpg";
// import venue32_8 from "@/assets/venue32_8.jpg";

// ===== VENUE 33 =====
import venue33_1 from "@/assets/venue33_1.jpg";
import venue33_2 from "@/assets/venue33_2.jpg";
import venue33_3 from "@/assets/venue33_3.jpg";
// import venue33_4 from "@/assets/venue33_4.jpg";
// import venue33_5 from "@/assets/venue33_5.jpg";
// import venue33_6 from "@/assets/venue33_6.jpg";
// import venue33_7 from "@/assets/venue33_7.jpg";
// import venue33_8 from "@/assets/venue33_8.jpg";

// ===== VENUE 34 =====
import venue34_1 from "@/assets/venue34_1.jpg";
import venue34_2 from "@/assets/venue34_2.jpg";
// import venue34_3 from "@/assets/venue34_3.jpg";
// import venue34_4 from "@/assets/venue34_4.jpg";
// import venue34_5 from "@/assets/venue34_5.jpg";
// import venue34_6 from "@/assets/venue34_6.jpg";
// import venue34_7 from "@/assets/venue34_7.jpg";
// import venue34_8 from "@/assets/venue34_8.jpg";

// ===== VENUE 35 =====
import venue35_1 from "@/assets/venue35_1.jpg";
import venue35_2 from "@/assets/venue35_2.jpg";
import venue35_3 from "@/assets/venue35_3.jpg";
// import venue35_4 from "@/assets/venue35_4.jpg";
// import venue35_5 from "@/assets/venue35_5.jpg";
// import venue35_6 from "@/assets/venue35_6.jpg";
// import venue35_7 from "@/assets/venue35_7.jpg";
// import venue35_8 from "@/assets/venue35_8.jpg";

// ===== VENUE 36 =====
import venue36_1 from "@/assets/venue36_1.jpg";
import venue36_2 from "@/assets/venue36_2.jpg";
import venue36_3 from "@/assets/venue36_3.jpg";
import venue36_4 from "@/assets/venue36_4.jpg";
// import venue36_5 from "@/assets/venue36_5.jpg";
// import venue36_6 from "@/assets/venue36_6.jpg";
// import venue36_7 from "@/assets/venue36_7.jpg";
// import venue36_8 from "@/assets/venue36_8.jpg";

// ===== VENUE 37 =====
import venue37_1 from "@/assets/venue37_1.jpg";
import venue37_2 from "@/assets/venue37_2.jpg";
import venue37_3 from "@/assets/venue37_3.jpg";
import venue37_4 from "@/assets/venue37_4.jpg";
import venue37_5 from "@/assets/venue37_5.jpg";
import venue37_6 from "@/assets/venue37_6.jpg";
// import venue37_7 from "@/assets/venue37_7.jpg";
// import venue37_8 from "@/assets/venue37_8.jpg";

// ===== VENUE 38 =====
import venue38_1 from "@/assets/venue38_1.jpg";
import venue38_2 from "@/assets/venue38_2.jpg";
import venue38_3 from "@/assets/venue38_3.jpg";
import venue38_4 from "@/assets/venue38_4.jpg";
import venue38_5 from "@/assets/venue38_5.jpg";
import venue38_6 from "@/assets/venue38_6.jpg";
// import venue38_7 from "@/assets/venue38_7.jpg";
// import venue38_8 from "@/assets/venue38_8.jpg";

// ===== VENUE 39 =====
import venue39_1 from "@/assets/venue39_1.jpg";
import venue39_2 from "@/assets/venue39_2.jpg";
import venue39_3 from "@/assets/venue39_3.jpg";
import venue39_4 from "@/assets/venue39_4.jpg";
import venue39_5 from "@/assets/venue39_5.jpg";
import venue39_6 from "@/assets/venue39_6.jpg";
import venue39_7 from "@/assets/venue39_7.jpg";
// import venue39_8 from "@/assets/venue39_8.jpg";

// ===== VENUE 40 =====
import venue40_1 from "@/assets/venue40_1.jpg";
import venue40_2 from "@/assets/venue40_2.jpg";
import venue40_3 from "@/assets/venue40_3.jpg";
import venue40_4 from "@/assets/venue40_4.jpg";
import venue40_5 from "@/assets/venue40_5.jpg";
import venue40_6 from "@/assets/venue40_6.jpg";
import venue40_7 from "@/assets/venue40_7.jpg";
import venue40_8 from "@/assets/venue40_8.jpg";

// // ===== VENUE 41 =====
// import venue41_1 from "@/assets/venue41_1.jpg";
// import venue41_2 from "@/assets/venue41_2.jpg";
// import venue41_3 from "@/assets/venue41_3.jpg";
// import venue41_4 from "@/assets/venue41_4.jpg";
// import venue41_5 from "@/assets/venue41_5.jpg";
// import venue41_6 from "@/assets/venue40_6.jpg";
// import venue40_7 from "@/assets/venue40_7.jpg";
// import venue40_8 from "@/assets/venue40_8.jpg";

// // ===== VENUE 42 =====
// import venue42_1 from "@/assets/venue42_1.jpg";
// import venue42_2 from "@/assets/venue42_2.jpg";
// import venue42_3 from "@/assets/venue42_3.jpg";
// import venue42_4 from "@/assets/venue42_4.jpg";
// import venue42_5 from "@/assets/venue42_5.jpg";
// import venue40_6 from "@/assets/venue40_6.jpg";
// import venue40_7 from "@/assets/venue40_7.jpg";
// import venue40_8 from "@/assets/venue40_8.jpg";


// ===== VENUE 43 =====
// import venue43_1 from "@/assets/venue43_1.jpg";
// import venue43_2 from "@/assets/venue43_2.jpg";
// import venue43_3 from "@/assets/venue43_3.jpg";
// import venue43_4 from "@/assets/venue43_4.jpg";
// import venue40_5 from "@/assets/venue40_5.jpg";
// import venue40_6 from "@/assets/venue40_6.jpg";
// import venue40_7 from "@/assets/venue40_7.jpg";
// import venue40_8 from "@/assets/venue40_8.jpg";

// ===== DEFAULT =====
const defaultVenue = venue1;

/* VENUE TYPE DEFINITION */
interface Venue {
  id: number;
  images: string[];
  name: string;
  location: string;
  address: string;
  capacity: string;

  vegPrice: number | null;
  nonVegPrice?: number | null;   // ✅ ADD THIS
  perPlate: number | null;

  foodType: "veg" | "nonveg" | "both";
  rating: number;
  reviews?: number;
  budget?: string;
  manager?: string;
  contact?: string;
  mapLink?: string;

  perPlateNote?: string;
  menuBasedPricing?: boolean;
  ownCateringAllowed?: boolean;
}


export const allVenues: Venue[] = [
  {
    id: 1,
    images: [venue1, venue1_2, venue1_3, venue1_4, venue1_5],
    name: "Hotel Moscot Inn",
    location: "Unnao",
    address: "Gadan Khera, Chauraha, Highway Bypass, Nirala Nagar, Unnao, UP 209801",
    capacity: "120",
    vegPrice: 750,
    foodType: "veg",
    manager: "Siddharth",
    contact: "+91 8726126607",
    rating: 3.5,
    reviews: 58,
    mapLink: "https://maps.app.goo.gl/47R3QLcRf1FbsSmA6?g_st=ic",
    budget: "₹1 Lakh – ₹3 Lakh",
    perPlate: 750
  },
  {
    id: 2,
    images: [venue2],
    name: "Blessed Banquet",
    location: "Kanpur",
    address: "  26, near Nav Durga Mandir, Chanakyapuri, Shyam Nagar, Kanpur, Uttar Pradesh 208015",
    capacity: "400-500",
    vegPrice: 1100,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.4,
    reviews: 72,
    mapLink: "https://maps.app.goo.gl/XvdAKqb92WrdZWuE8",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1100
  },
  {
    id: 3,
    images: [venue3],
   name: "Uttam Garden",
  location: "Kanpur",
  address: "98W4+PJW, Arra Rd, near Chitra Degree College, Galla Mandi, Naubasta, Kanpur, Uttar Pradesh 208021",
  capacity: "500-600",
  foodType: "both",
  vegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,      // ✅ Catering by own
  menuBasedPricing: false,
  perPlateNote: "Customer can arrange catering on their own.",

  manager: "",
  contact: "+91 8726126607",
  rating: 3.7,
  reviews: null,
  mapLink: "https://maps.app.goo.gl/P8H2YkA9vEwhnRSD8",
  budget: "₹5 Lakh – ₹8 Lakh"
},
{
    id: 4,
    images: [venue4, venue4_2],
    name: "Annad Manglam AC Banquet",
    location: "Kanpur",
    address: " 419, Karrahi Rd, Karrhi, Hardev Nagar, Kidwai Nagar, Kanpur, Uttar Pradesh 208027",
    capacity: "600-700",
    vegPrice: 950,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.4,
    reviews: 63,
    mapLink: "https://maps.app.goo.gl/FdDUqzk6BePQnXyM7",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 950
  },
  {
    id: 5,
    images: [venue5, venue5_2],
    name: "Hotel Manoj International",
    location: "Kanpur",
    address: " 9C, GT Rd, Krishna Puram, Kanpur, Uttar Pradesh 20800",
    capacity: "100-400",
    vegPrice: 1250,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.6,
    reviews: 89,
    mapLink: "https://maps.app.goo.gl/xTJKmkVW1dGcHYNv9",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1250
  },
  {
    id: 6,
    images: [venue6, venue6_2],
    name: "Elements Banquet",
    location: "Kanpur",
    address: "opposite of Swaraj India School, L Block, Navin Nagar, Kakadeo, Kanpur, Uttar Pradesh 208025",
    capacity: "300",
    vegPrice: 1000,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.7,
    reviews: 46,
    mapLink: "https://maps.app.goo.gl/tW1t2cqt8xDH79Qm8",
    budget: "₹1 Lakh – ₹3 Lakh",
    perPlate: 1000
  },
  {
    id: 7,
    images: [venue7_1],
    name: "SR Banquet Hall",
    location: "Kanpur",
    address: "Brahmdev chauraha, Keshavpuram, Maswanpur, Kanpur, Uttar Pradesh 208019",
    capacity: "350",
    vegPrice: 0,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.4,
    reviews: 29,
    mapLink: "https://maps.app.goo.gl/v6DAk582mBYh5epm8",
    budget: "₹1 Lakh – ₹3 Lakh",
    perPlate: 800
  },
  {
    id: 8,
    images: [venue8, venue8_2],
    name: "SG Garden",
    location: "Kanpur",
    address: " 43,44, LPR, Ashok vatika Rd, near HP Petrol Pump, Awas Vikas Keshav Puram, Choraha, Kalyanpur, Kanpur, Uttar Pradesh 208019",
    capacity: "400",
    vegPrice: 1100,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.4,
    reviews: 57,
    mapLink: "https://maps.app.goo.gl/Hs3JcP2ngoWgWVXy8",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1100
  },
  {
    id: 9,
    images: [venue9, venue9_2],
    name: "Aakriti Green",
    location: "Kanpur",
    address: "Kalyanpur - Vijay Nagar Rd, Double Pulia, Kakadeo, Kanpur, Uttar Pradesh 208019",
    capacity: "400-500",
    vegPrice: 1500,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.7,
    reviews: 94,
    mapLink: "https://maps.app.goo.gl/igFz1qT9M1Wft8759",
    budget: "₹5 Lakh – ₹8 Lakh",
    perPlate: 1500
  },
  {
    id: 10,
    images: [venue10, venue10_2, venue10_3, venue10_4],
    name: "Nakshatram Banquet",
    location: "Kanpur",
    address: "R.K. Puram, Kalyanpur, Kanpur, Uttar Pradesh 208017",
    capacity: "100-500",
    vegPrice: 1050,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.0,
    reviews: 61,
    mapLink: "https://www.google.com/maps/place/Nakshatram/@26.4946183,80.2246555,15z/data=!3m1!4b1!4m6!3m5!1s0x399c374f36b69b69:0xeb9ac0b1cc3c1898!8m2!3d26.4946195!4d80.2431096!16s%2Fg%2F11slyzd16n?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1050
  },
  {
    id: 11,
    images: [venue11, venue11_2, venue11_3],
     name: "Vibha Raj Palace",
  location: "Kanpur",
  address: "15 A, near Custom, Central Excise Colony, Gujaini, Kanpur, Uttar Pradesh 208022",
  capacity: "600-700",
  foodType: "both",
  vegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,      // ✅ Catering by own
  menuBasedPricing: false,
  perPlateNote: "Customer can arrange catering on their own.",

  manager: "",
  contact: "+91 8052003999",
  rating: 4.3,
  reviews: null,
  mapLink: "https://maps.app.goo.gl/RPE8mRj3wurpDVe46",
  budget: "₹8 Lakh – ₹12 Lakh"
},
  {
    id: 12,
    images: [venue12],
    name: "King's Royal Banquet",
    location: "Kanpur",
    address: "Makri Kheora, Khyora, Kanpur, Uttar Pradesh 208017",
    capacity: "750",
    vegPrice: 1000,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 5.0,
    reviews: 66,
    mapLink: "https://maps.app.goo.gl/TiYVMMy6EUTCRAEv6",
    budget: "₹5 Lakh – ₹8 Lakh",
    perPlate: 1000
  },
  {
    id: 13,
    images: [venue13, venue13_2],
    name: "Rajendra Palace",
    location: "Kanpur",
    address: "  F68H+548, panki Ganga Ganj Tiraha, Panki Mandir, Near, Panki, Kanpur, Uttar Pradesh 208020",
    capacity: "250-300",
    vegPrice: 700,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.9,
    reviews: 39,
    mapLink: "https://maps.app.goo.gl/kYSsWSPiTVF9iG4y5",
    budget: "Under ₹1 Lakh",
    perPlate: 700
  },
  {
    id: 14,
    images: [venue14_1, venue14_2, venue14_3, venue14_4],
    name: "Madhuban Lawn",
    location: "Kanpur",
    address: "Sabji Mandi, 228, P Block, Yashoda Nagar, Kanpur, Uttar Pradesh 208021",
    capacity: "600-700",

    // 🍽️ Catering
    foodType: "veg",
    vegPrice: null,
    perPlate: null,
    ownCateringAllowed: true,        // ✅ catering by own
    menuBasedPricing: false,
    perPlateNote: "",

    // 📊 Details
    manager: "",
    contact: "+91 8726126607",
    rating: 3.7,
    reviews: 51,
    mapLink: "https://share.google/xkoNc0leqktjh0ITM",
    budget: "₹5 Lakh – ₹8 Lakh"
  }
  ,
  {
    id: 15,
    images: [venue15_1, venue15_2, venue15_3],
    name: "Muskan Palace",
    location: "Kanpur",
    address: "In front of Kashiram Colony Road, Chandmari, Unnao, Kanpur, Uttar Pradesh 208021",
    capacity: "1500-2000",
    foodType: "veg",
    vegPrice: null,
    perPlate: null,
    menuBasedPricing: true,          // ✅ depends on menu
    ownCateringAllowed: false,
    perPlateNote: "",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.5,
    reviews: 105,
    mapLink: "https://maps.app.goo.gl/W7XReDsPR58jPXMdA",
    budget: "₹12 Lakh+"
  }
  ,
  {
    id: 16,
    images: [venue16_1, venue16_2],
    name: "Hans Garden",
    location: "Kanpur",
    address: "Near Vivekanand Public School, LIG Vaidehi Vihar, Jarauli 2, Kanpur, Uttar Pradesh 208027",
    capacity: "800",
    foodType: "veg",
    vegPrice: null,
    perPlate: null,
    ownCateringAllowed: true,      // ✅ Catering by own
    menuBasedPricing: false,
    perPlateNote: "",

    manager: "",
    contact: "+91 8726126607",
    rating: 4.0,
    reviews: 47,
    mapLink: "https://maps.app.goo.gl/rRpxZKVVw2znLncY7",
    budget: "₹8 Lakh – ₹12 Lakh"
  }
  ,
  {
    id: 17,
    images: [venue17_1, venue17_2],
    name: "Parinay Guest House",
    location: "Kanpur",
    address: "104A/167, Rambagh, Ram Bagh, Kanpur, Uttar Pradesh 208012",
    capacity: "600",
    vegPrice: 1100,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.7,
    reviews: 59,
    mapLink: "https://maps.app.goo.gl/U63HsDPqMJn3osFz8",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1100
  },
  {
    id: 18,
    images: [venue18_1, venue18_2, venue18_3, venue18_4, venue18_5, venue18_6],
    name: "Garden Court Guest House",
    location: "Kanpur",
    address: "C9HQ+GH9, KDA Colony Rd, KDA Colony, Lal Bangla, J K Puri, Kanpur, Uttar Pradesh 208007",
    capacity: "2000",
    foodType: "veg",
    vegPrice: 800,                // base reference price
    perPlate: 800,                // filter compatibility
    menuBasedPricing: true,       // ✅ depends on people
    ownCateringAllowed: false,
    perPlateNote: "₹800/plate for 500 people (Veg). Price varies with gathering.",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.5,
    reviews: 120,
    mapLink: "https://maps.app.goo.gl/a815chNraLwb6aZo9",
    budget: "₹12 Lakh+"
  },
  {
    id: 19,
    images: [venue19_1, venue19_2, venue19_3, venue19_4],
    name: "Avantika Lawn",
    location: "Kanpur",
    address: "Kalyanpur - Vijay Nagar Rd, Keshavpuram, Rawatpur Gaon, Kanpur, Uttar Pradesh 208019",
    capacity: "500-1000",
    foodType: "veg",
    vegPrice: 800,                 // base starting price
    perPlate: 800,                 // used for filters
    ownCateringAllowed: true,      // ✅ catering by own also allowed
    perPlateNote: "₹800–₹1200/plate • Catering by own also allowed",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.6,
    reviews: 83,
    mapLink: "https://maps.app.goo.gl/tHbQvMfHhnmSXJLv6",
    budget: "₹8 Lakh – ₹12 Lakh"
  },
  {
    id: 20,
    images: [venue20_1, venue20_2, venue20_3, venue20_4, venue20_5],
    name: "Humsafar The Party Lawn",
    location: "Kanpur",
    address: "C8W9+FRG, Juhi, Govind Nagar, Kanpur, Uttar Pradesh 208014",
    capacity: "500",
    foodType: "veg",
    vegPrice: null,              // not applicable
    perPlate: null,              // not applicable
    ownCateringAllowed: true,    // ✅ key change
    perPlateNote: "",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.5,
    reviews: 44,
    mapLink: "https://maps.app.goo.gl/xAz6FZPkVex4aFgdA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 21,
    images: [venue21_1, venue21_2, venue21_3, venue21_4],
    name: "Sarita Palace",
    location: "Kanpur",
    address: "Sarita palace, Panki - Kalyanpur Rd, Awas Vikas Ambedkar Puram, Kalyanpur, Kanpur, Uttar Pradesh 208017",
    capacity: "600-700",
    vegPrice: 750,
    nonVegPrice: 1050,
    foodType: "both",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.9,
    reviews: 61,
    mapLink: "https://maps.app.goo.gl/ia4TQ2u754nHPzK39",
    budget: "₹5 Lakh – ₹8 Lakh",
    perPlate: 750
  },
  {
    id: 22,
    images: [venue22_1, venue22_2, venue22_3, venue22_4],
    name: "RR Grand Hotel",
    location: "Kanpur",
    address: " HIG 34, Ratanlal Nagar Main Rd, High Income Grade, Neemeshwar MahaMandir Society, Ratan Lal Nagar, Kanpur, Uttar Pradesh 208022",
    capacity: "100-400",
    vegPrice: 1200,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.3,
    reviews: 77,
    mapLink: "https://maps.app.goo.gl/Yko4j9GuXYaaZH6L7",
    budget: "₹1 Lakh – ₹3 Lakh",
    perPlate: 1200
  },
  {
    id: 23,
    images: [venue23_1, venue23_2, venue23_3, venue23_4],
    name: "Meeranjay Mention",
    location: "Kanpur",
    address: "R.K. Puram, Kalyanpur, Kanpur, Uttar Pradesh 208017",
    capacity: "1000",
    vegPrice: 1500,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.0,
    reviews: 91,
    mapLink: "https://maps.app.goo.gl/nck6RZqEw1pTiBux9",
    budget: "₹8 Lakh – ₹12 Lakh",
    perPlate: 1500
  },
  {
    id: 24,
    images: [venue24_1, venue24_2, venue24_3],
    name: "Hotel Swagat",
    location: "Kanpur",
    address: " Chauraha, 80 Feet Rd, Brahm Nagar, Harsh Nagar, Kanpur, Uttar Pradesh 208012",
    capacity: "250-300",
    vegPrice: 850,
    nonVegPrice: 1200,
    foodType: "both",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.7,
    reviews: 56,
    mapLink: "https://maps.app.goo.gl/jE9aqB8bggwks1JYA",
    budget: "₹1 Lakh – ₹3 Lakh",
    perPlate: 850
  },
  {
    id: 25,
    images: [venue25_1, venue25_2, venue25_3, venue25_4, venue25_5, venue25_6],
    name: "New Rahul Casel Banquet Lawn",
    location: "Kanpur",
    address: "Plot No. 892 893, MIG Rd, B Block, Panki, Kanpur, Uttar Pradesh 208020",
    capacity: "1000",
    vegPrice: 1100,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.5,
    reviews: 68,
    mapLink: "https://share.google/hjpWPv57ikv8xD5hW",
    budget: "₹8 Lakh – ₹12 Lakh",
    perPlate: 1100
  },
  {
    id: 26,
    images: [venue26_1, venue26_2, venue26_3],
    name: "Grand New Rahul Banquet",
    location: "Kanpur",
    address: "315, C Block, Swaraj Nagar, Kanpur, Uttar Pradesh 208020",
    capacity: "400",
    vegPrice: 850,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.5,
    reviews: 59,
    mapLink: "https://maps.app.goo.gl/Jn1vPHF4QvExd2qWA",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 850
  },
  {
    id: 27,
    images: [venue27_1, venue27_2, venue27_3, venue27_4],
    name: "New Rahul Imperial Banquet And Rooms",
    location: "Kanpur",
    address: "Plot 218, 341, C Block, Swaraj Nagar, Kanpur, Uttar Pradesh 208020",
    capacity: "200",
    vegPrice: 850,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.3,
    reviews: 42,
    mapLink: "https://maps.app.goo.gl/Sj3CWcPXrFwHup7k7",
    budget: "₹800 – ₹1200",
    perPlate: 850
  },
  {
    id: 28,
    images: [venue28_1, venue28_2, venue28_3],
    name: "Imperial Party Hall",
    location: "Kanpur",
    address: "AW-1, 127/785, Juhi Kalan, Saket Nagar, Kanpur, Uttar Pradesh 208011",
    capacity: "200",
    vegPrice: 750,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.8,
    reviews: 35,
    mapLink: "https://maps.app.goo.gl/edoiuL8ETBqBoXtUA",
    budget: "Under ₹800",
    perPlate: 750
  },
  {
    id: 29,
    images: [venue29_1, venue29_2, venue29_3, venue29_4, venue29_5, venue29_6, venue29_7],
    name: "Ishwar Kripa Lawn",
    location: "Kanpur",
    address: "G75R+XMW, Mainawati Marg, Azad Nagar, Kanpur, Uttar Pradesh 208017",
    capacity: "1500",
    foodType: "veg",
    vegPrice: 850,
    perPlate: 850,

    // 📝 Pricing detail
    perPlateNote: "₹850/plate for 300 guests             Menu & gathering based",
    menuBasedPricing: false,
    ownCateringAllowed: false,

    manager: "",
    contact: "+91 8726126607",
    rating: 4.1,
    reviews: 88,
    mapLink: "https://maps.app.goo.gl/7SqTs117B1BMoure8?g_st=ic",
    budget: "₹12 Lakh+"
  },
  {
    id: 30,
    images: [venue30_1, venue30_2, venue30_3],
    name: "Hotel Chandradeep",
    location: "Kanpur",
    address: "5, Rail Bazar, Harris Ganj, Mirpur Cantonment, Mirpur, Kanpur, Uttar Pradesh 208004",
    capacity: "100+",
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.2,
    reviews: 49,
    mapLink: "https://maps.app.goo.gl/rBTJtp4hA6ZJySsv5?g_st=ic",
    budget: "Under ₹1 Lakh",

    // 🍽️ Pricing (menu based)
    vegPrice: null,                 // not fixed
    perPlate: null,                 // not fixed
    perPlateNote: "Menu Based Pricing",
    menuBasedPricing: true,
    ownCateringAllowed: false
  }
  ,
  {
    id: 31,
    images: [venue31_1, venue31_2, venue31_3, venue31_4, venue31_5],
    name: "Ashish Garden",
    location: "Kanpur",
    address: "117/498 120Ft. Road, Hitkari Nagar, Kakadeo, Kanpur, Uttar Pradesh 208025",
    capacity: "1000",
    vegPrice: 800,
    foodType: "veg",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.7,
    reviews: 72,
    mapLink: "https://maps.app.goo.gl/fZXL3U9DLBKFGUz28?g_st=ic",
    budget: "₹8 Lakh – ₹12 Lakh",
    perPlate: 800
  },
  {
    id: 32,
    images: [venue32_1, venue32_2, venue32_3, venue32_4, venue32_5],
    name: "Kashmir Palace",
    location: "Kanpur",
    address: "13-F, 26/4-A, Govind Nagar Rd, Kanpur, Uttar Pradesh 208006",
    capacity: "350",
    vegPrice: 600,
    nonVegPrice: 800,
    foodType: "both",
    manager: "",
    contact: "+91 8726126607",
    rating: 3.5,
    reviews: 46,
    mapLink: "https://maps.app.goo.gl/NzjMLgCQs7Dk4BeK9?g_st=ic",
    budget: "Under ₹1 Lakh",
    perPlate: 600
  },
  {
    id: 33,
    images: [venue33_1, venue33_2, venue33_3],
    name: "Hotel Liyan Inn",
    location: "Kanpur",
    address: "125/35, near Hanuman Temple, Lal Quarter, Govind Nagar, Kanpur, Uttar Pradesh 208006",
    capacity: "120",
    vegPrice: 800,
    nonVegPrice: 1100,
    foodType: "both",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.9,
    reviews: 54,
    mapLink: "https://maps.app.goo.gl/KZjBmGE4J8dVXnA3A",
    budget: "Under ₹1 Lakh",
    perPlate: 800
  },
  {
    id: 34,
    images: [venue34_1, venue34_2],
    name: "Hotel Regenta Central Crystal",
    location: "Kanpur",
    address: " Regenta central the crystal hotel, 111/7 A, Harsh Nagar, Kanpur, Uttar Pradesh 208002",
    capacity: "500",
    vegPrice: 2000,
    nonVegPrice: 2300,
    foodType: "both",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.7,
    reviews: 102,
    mapLink: "https://maps.app.goo.gl/oDgUefHp4w4H4wK1A?g_st=ic",
    budget: "₹8 Lakh – ₹12 Lakh",
    perPlate: 2000
  },
  {
    id: 35,
    images: [venue35_1, venue35_2, venue35_3],
    name: "Orient Resort",
    location: "Kanpur",
    address: "N.H - 2, Kalpi Road, Sachendi, Kanpur, Uttar Pradesh 209304",
    capacity: "2000",
    vegPrice: 1800,
    nonVegPrice: 2000,
    foodType: "both",
    manager: "",
    contact: "+91 8726126607",
    rating: 4.2,
    reviews: 121,
    mapLink: "https://maps.app.goo.gl/JAJXDDtvrViAeQUZ9?g_st=ic",
    budget: "₹12 Lakh+",
    perPlate: 1800
  },
  {
    id: 36,
    images: [venue36_1, venue36_2, venue36_3, venue36_4],
    name: "Chauhan Hotel & Resort",
    location: "Kanpur",
    address: "F52W+JRR, Ishwari Ganj - Palara Rd, Bhauti, Kanpur, Bhautipratappur, Uttar Pradesh 209305",
    capacity: "200-300",
    vegPrice: 600,
    nonVegPrice: 800,
    foodType: "both",
    manager: "Abhay Chauhan",
    contact: "+91 8726126607",
    rating: 4.0,
    reviews: 97,
    mapLink: "https://maps.app.goo.gl/hsyLjjPtCACpGTcX6?g_st=ic",
    budget: "Under ₹1 Lakh",
    perPlate: 600
  },
  {
    id: 37,
    images: [venue37_1, venue37_2, venue37_3, venue37_4, venue37_5, venue37_6],
    name: "Shivam Hotel & Banquet",
    location: "Kanpur",
    address: "Keshavpuram, Kalyanpur, Kanpur, Uttar Pradesh 208019",
    capacity: "400-500",
    vegPrice: 1000,
    foodType: "veg",
    manager: "Jitendra Gupta",
    contact: "+91 8726126607",
    rating: 3.9,
    reviews: 81,
    mapLink: "https://www.google.com/maps/place/Shivam+Palace/@26.4835037,80.2703537,17z/data=!3m1!4b1!4m6!3m5!1s0x399c37f393d4b903:0x35c1d49ecf795d98!8m2!3d26.4835037!4d80.2703537!16s%2Fg%2F11bwy_x9dd!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1000
  },
  {
    id: 38,
    images: [venue38_1, venue38_2, venue38_3, venue38_4, venue38_5, venue38_6],
    name: "Divyanshi Garden",
    location: "Kanpur",
    address: "C8H4+2W7, Barra Bypass Rd, Juhi Kalan, Barra, Kanpur, Uttar Pradesh 208027",
    capacity: "1000",
    foodType: "veg",
    manager: "Vinod Prajapati",
    contact: "+91 8726126607",
    rating: 3.9,
    reviews: 95,
    mapLink: "https://maps.app.goo.gl/7EULCriQQuaFS9VcA?g_st=ic",
    budget: "₹8 Lakh – ₹12 Lakh",

    vegPrice: null,               // not applicable
    perPlate: null,               // not applicable
    ownCateringAllowed: true      // ✅ correct
  },
  {
    id: 39,
    images: [venue39_1, venue39_2, venue39_3, venue39_4, venue39_5, venue39_6, venue39_7],
    name: "The Shivlinn's (Corporate Guest House )",
    location: "Kanpur",
    address: "127/337, Patrachar Rd, opposite Kishori Vatika Gate, near PPM Hospital, W-1, Juhi Kalan, Saket Nagar, Kanpur, Uttar Pradesh 208014",
    capacity: "100-200",
    vegPrice: 750,
    foodType: "veg",
    manager: "Anushka",
    contact: "+91 8726126607",
    rating: 4.5,
    reviews: 109,
    mapLink: "",
    budget: "₹3 Lakh – ₹5 Lakh",
    perPlate: 1100
  },
  {
    id: 40,
    images: [venue40_1, venue40_2, venue40_3, venue40_4, venue40_5, venue40_6, venue40_7, venue40_8],
    name: "Ayodhya Lawn",
    location: "Kanpur",
    address: "McRobertganj, Gwai, Khalasi Line, Kanpur, Uttar Pradesh 208002",
    capacity: "800",
    foodType: "veg",
    manager: "Sharbpreet",
    contact: "+91 8726126607",
    rating: 4.2,
    reviews: 86,
    mapLink: "https://maps.app.goo.gl/GHatZn61pD1MVReq9?g_st=ic",
    budget: "₹5 Lakh – ₹8 Lakh",

    vegPrice: null,              // ❗ not applicable
    perPlate: null,              // ❗ not applicable
    ownCateringAllowed: true,     // ✅ key flag

  }
];


/* FILTER DATA */
const cities = [
  "Kanpur", "Lucknow", "Meerut", "Ghaziabad", "Noida", "Agra", "Aligarh",
  "Mathura", "Vrindavan", "Banaras", "Ayodhya", "Prayagraj",
  "Bareilly", "Bulandshahr", "Faizabad"
];

const capacities = ["100-200", "200-400", "400-600", "600-800", "800-1000", "1000+"];

const budgets = [
  "Under ₹1 Lakh",
  "₹1 Lakh – ₹3 Lakh",
  "₹3 Lakh – ₹5 Lakh",
  "₹5 Lakh – ₹8 Lakh",
  "₹8 Lakh – ₹12 Lakh",
  "₹12 Lakh+"
];

const perPlateRanges = ["Under ₹800", "₹800 – ₹1200", "₹1200 – ₹1800", "₹1800 – ₹2500", "₹2500+"];

const VenuesPage = () => {
  const [currentImage, setCurrentImage] = useState<Record<number, number>>({});
  const [showReviewBox, setShowReviewBox] = useState<number | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { compareList, addToCompare, removeFromCompare } = useCompare();

  const [filters, setFilters] = useState({
    city: "",
    capacity: "",
    budget: "",
    perPlate: "",
    foodType: "",
    rating: "",
  });

  /* ✅ Active filters count */
  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).filter(([_, value]) => value !== "").length;
  }, [filters]);

  /* ✅ Filtered Venues (WORKING FILTER LOGIC) */
  const filteredVenues = useMemo(() => {
    return allVenues.filter((venue) => {
      // CITY FILTER
      if (filters.city && venue.location !== filters.city) return false;

      // FOOD TYPE FILTER
      if (filters.foodType && venue.foodType !== filters.foodType) return false;

      // CAPACITY FILTER
      if (filters.capacity) {
        const venueCap = venue.capacity || "";
        if (!venueCap.includes(filters.capacity.split("-")[0])) return false;
      }

      // BUDGET FILTER
      if (filters.budget && venue.budget !== filters.budget) return false;

      // PER PLATE FILTER
      if (filters.perPlate) {
        const price = venue.perPlate || venue.vegPrice || 0;

        if (filters.perPlate === "Under ₹800" && price >= 800) return false;
        if (filters.perPlate === "₹800 – ₹1200" && (price < 800 || price > 1200)) return false;
        if (filters.perPlate === "₹1200 – ₹1800" && (price < 1200 || price > 1800)) return false;
        if (filters.perPlate === "₹1800 – ₹2500" && (price < 1800 || price > 2500)) return false;
        if (filters.perPlate === "₹2500+" && price < 2500) return false;
      }

      // RATING FILTER
      if (filters.rating && venue.rating < Number(filters.rating)) return false;

      return true;
    });
  }, [filters]);


  /* IMAGE SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const updated = { ...prev };
        allVenues.forEach((v) => {
          updated[v.id] = ((updated[v.id] || 0) + 1) % v.images.length;
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

 /* Toggle Favorite (PERMANENT FIX) */
const toggleFavorite = (venue: Venue) => {
  const isFav = favorites.some((f) => f.id === venue.id);

  if (isFav) {
    removeFromFavorites(venue.id);
  } else {
    addToFavorites({
      id: venue.id,
      name: venue.name,
      image: venue.images?.[0] || "/placeholder.jpg",

      location: venue.location,

      // ✅ FULL ADDRESS FIX (IMPORTANT)
      fullAddress: venue.address
        ? venue.address
        : `${venue.location}, UP`,

      capacity: venue.capacity,

      priceRange: venue.menuBasedPricing
        ? "Menu Based"
        : venue.ownCateringAllowed
        ? "Catering By Own"
        : venue.foodType === "both"
        ? `Veg ₹${venue.vegPrice ?? "N/A"} | NonVeg ₹${venue.nonVegPrice ?? "N/A"}`
        : venue.foodType === "nonveg"
        ? `₹${venue.nonVegPrice ?? venue.perPlate ?? "N/A"}/plate`
        : `₹${venue.perPlate ?? venue.vegPrice ?? "N/A"}/plate`,

      // ✅ Optional Contact (future)
      phone: venue.contact || "+918726126607",
      whatsapp: venue.contact || "917428617371",
    });
  }
};


  const toggleCompare = (venue: Venue) => {
  const isComp = compareList.some((v) => v.id === venue.id);

  if (isComp) {
    removeFromCompare(venue.id);
  } else {
    addToCompare({
      id: venue.id,
      name: venue.name,
      location: venue.location,
      address: venue.address || `${venue.location}, UP`,
      capacity: venue.capacity,

      // ✅ IMPORTANT FOR COMPARE PAGE
      vegPrice: venue.vegPrice ?? null,
      nonVegPrice: venue.nonVegPrice ?? null,
      perPlate: venue.perPlate ?? null,
      budget: venue.budget ?? "—",

      foodType: venue.foodType,
      rating: venue.rating ?? 0,
      reviews: venue.reviews ?? 0,

      // ✅ IMAGE
      image: venue.images?.[0] || "/placeholder.jpg",

      // ✅ EXTRA OPTIONAL
      manager: venue.manager || "",
      contact: venue.contact || "",
      mapLink: venue.mapLink || "",

      menuBasedPricing: venue.menuBasedPricing || false,
      ownCateringAllowed: venue.ownCateringAllowed || false,
      perPlateNote: venue.perPlateNote || "",
    });
  }
};

  /* Submit Review */

  const submitReview = () => {
    if (!userRating || !userReview) {
      alert("Please add rating and review");
      return;
    }
    alert("Thanks for your review!");
    setUserRating(0);
    setUserReview("");
    setShowReviewBox(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-14 container-premium">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#0B1220]">
            Browse Premium{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#1e40af] bg-clip-text text-transparent">
              Venues
            </span>
          </h1>

          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            Discover hand-picked wedding venues with transparent pricing, real
            reviews, and smart comparison tools — all in one place.
          </p>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:block bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl px-6 py-6 mb-12">
          <div className="grid grid-cols-5 gap-5">
            <select
              value={filters.city}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            >
              <option value="">📍 Location</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={filters.capacity}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, capacity: e.target.value }))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            >
              <option value="">👥 Guests</option>
              {capacities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={filters.budget}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, budget: e.target.value }))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            >
              <option value="">💰 Budget</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={filters.perPlate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, perPlate: e.target.value }))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            >
              <option value="">🍽 Per Plate</option>
              {perPlateRanges.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              value={filters.foodType}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, foodType: e.target.value }))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            >
              <option value="">🥗 Food Type</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
              <option value="both">Veg & Non-Veg</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredVenues.map((venue) => {
            const isFavorite = favorites.some((f) => f.id === venue.id);
            const isCompared = compareList.some((v) => v.id === venue.id);

            return (
              <motion.div
                key={venue.id}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-3xl shadow-md overflow-hidden border-2 transition-all duration-300
                ${isCompared
                    ? "border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.35)]"
                    : "border-gray-100 hover:border-blue-200 hover:shadow-lg"
                  }
              `}
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage[venue.id] || 0}
                      src={venue.images[currentImage[venue.id] || 0]}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0.5, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.5, scale: 0.98 }}
                      transition={{ duration: 0.6 }}
                    />
                  </AnimatePresence>

                  {/* ❤️ Favorite */}
                  <button
                    onClick={() => toggleFavorite(venue)}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow group transition"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300
                      ${isFavorite
                          ? "fill-red-500 text-red-500 scale-110"
                          : "text-gray-500 group-hover:fill-red-500 group-hover:text-red-500 group-hover:scale-110"
                        }`}
                    />
                  </button>

                  {/* 🔁 Compare */}
                  <button
                    onClick={() => toggleCompare(venue)}
                    className={`absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-300 border group
                    ${isCompared
                        ? "bg-blue-700 border-blue-400 ring-2 ring-white shadow-[0_0_18px_rgba(255,255,255,0.55)] scale-110"
                        : "bg-white/90 border-transparent hover:bg-blue-600 hover:border-blue-400 hover:ring-2 hover:ring-blue-400/60 hover:scale-110"
                      }
                  `}
                  >
                    <GitCompare
                      className={`w-5 h-5 transition-all duration-300
                      ${isCompared
                          ? "text-white"
                          : "text-gray-600 group-hover:text-white"
                        }
                    `}
                    />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-[#0B1220] truncate">
                    {venue.name}
                  </h3>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="line-clamp-2">
                      {venue.address || `${venue.location}, UP`}
                    </span>
                  </div>

                  {/* Capacity + Price */}
                  <div className="flex justify-between text-sm font-medium items-start">
                    <span className="flex items-center gap-1 text-gray-700">
                      <Users className="w-4 h-4 text-blue-600" /> {venue.capacity}
                    </span>

                    {/* PRICE DISPLAY */}
                    <div className="text-right font-semibold leading-tight">
                      {venue.menuBasedPricing ? (
                        <div className="text-yellow-700 text-sm font-bold">
                          Menu Based
                        </div>
                      ) : venue.ownCateringAllowed ? (
                        <div className="text-green-700 text-sm font-bold">
                          Catering By Own
                        </div>
                      ) : venue.foodType === "both" ? (
                        <div className="space-y-1">
                          <div className="text-blue-700 text-sm font-bold">
                            Veg: ₹{venue.vegPrice ?? "N/A"}/plate
                          </div>
                          <div className="text-red-600 text-sm font-bold">
                            Non-Veg: ₹{venue.nonVegPrice ?? "N/A"}/plate
                          </div>
                        </div>
                      ) : venue.foodType === "nonveg" ? (
                        <div className="text-red-600 text-sm font-bold">
                          ₹{venue.nonVegPrice ?? venue.perPlate ?? "N/A"}/plate
                        </div>
                      ) : (
                        <div className="text-blue-700 text-sm font-bold">
                          {venue.perPlate
                            ? `₹${venue.perPlate}/plate`
                            : venue.vegPrice
                              ? `₹${venue.vegPrice}/plate`
                              : venue.perPlateNote || "N/A"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Food + Rating */}
                  <div className="flex justify-between text-sm items-center">
                    <span className="capitalize px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                      {venue.foodType === "both"
                        ? "Veg & Non-Veg"
                        : venue.foodType}
                    </span>

                    <span className="text-yellow-500 flex items-center gap-1 font-semibold">
                      ⭐ {venue.rating}
                    </span>
                  </div>
                  {/* Map + Call */}
                  <div className="flex justify-between items-center gap-3 pt-4">
                    <a
                      href={
                        venue.mapLink ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          venue.name + " " + venue.location
                        )}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl
                      bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-200
                      hover:bg-blue-700 hover:text-white transition"
                    >
                      <MapPin className="w-4 h-4" />
                      View Map
                    </a>

                    {venue.contact && (
                      <a
                        href={`tel:${venue.contact}`}
                        className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl
                        bg-green-50 text-green-700 font-semibold text-sm border border-green-200
                        hover:bg-green-700 hover:text-white transition"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                    )}
                  </div>

                  {/* REVIEW BUTTON */}
                  <button
                    onClick={() =>
                      setShowReviewBox(
                        showReviewBox === venue.id ? null : venue.id
                      )
                    }
                    className="w-full mt-4 py-2.5 rounded-2xl text-sm font-semibold
                    bg-blue-700 text-white hover:bg-white hover:text-blue-700 border border-blue-700 transition"
                  >
                    Write a Review
                  </button>

                  {/* REVIEW BOX */}
                  <AnimatePresence>
                    {showReviewBox === venue.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 border border-gray-200 p-4 rounded-2xl space-y-3 mt-4"
                      >
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              onClick={() => setUserRating(star)}
                              className={`w-5 h-5 cursor-pointer ${star <= userRating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                                }`}
                            />
                          ))}
                        </div>

                        <textarea
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                          placeholder="Share your experience..."
                          className="w-full px-3 py-2 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                          rows={3}
                        />

                        <button
                          onClick={submitReview}
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition"
                        >
                          <Send className="w-4 h-4" /> Submit Review
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE FILTER BUTTON */}
        <div className="fixed bottom-6 right-6 z-[80] md:hidden">
          <button
            onClick={() => setShowMobileFilter(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-700 text-white font-semibold shadow-xl hover:scale-105 transition relative"
          >
            <Filter className="w-5 h-5" />
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
            <motion.div
              key="drawer-wrapper"
              className="fixed inset-0 z-[90] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowMobileFilter(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />

              {/* Drawer */}
              <motion.div
                className="absolute top-0 right-0 h-full w-[85%] bg-white shadow-2xl flex flex-col"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-blue-700">Filters</h2>

                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    ✕
                  </button>
                </div>
{/* Filters */}
<div className="flex-1 px-6 py-5 space-y-4 overflow-y-auto">

  {/* CITY */}
  <select
    value={filters.city}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, city: e.target.value }))
    }
    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700"
  >
    <option value="">📍 Location</option>
    {cities.map((c) => (
      <option key={c} value={c}>
        {c}
      </option>
    ))}
  </select>

  {/* CAPACITY */}
  <select
    value={filters.capacity}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, capacity: e.target.value }))
    }
    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700"
  >
    <option value="">👥 Guests</option>
    {capacities.map((c) => (
      <option key={c} value={c}>
        {c}
      </option>
    ))}
  </select>

  {/* BUDGET */}
  <select
    value={filters.budget}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, budget: e.target.value }))
    }
    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700"
  >
    <option value="">💰 Budget</option>
    {budgets.map((b) => (
      <option key={b} value={b}>
        {b}
      </option>
    ))}
  </select>

  {/* PER PLATE */}
  <select
    value={filters.perPlate}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, perPlate: e.target.value }))
    }
    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700"
  >
    <option value="">🍽 Per Plate</option>
    {perPlateRanges.map((p) => (
      <option key={p} value={p}>
        {p}
      </option>
    ))}
  </select>

  {/* FOOD TYPE */}
  <select
    value={filters.foodType}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, foodType: e.target.value }))
    }
    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700"
  >
    <option value="">🥗 Food Type</option>
    <option value="veg">Veg</option>
    <option value="nonveg">Non-Veg</option>
    <option value="both">Veg & Non-Veg</option>
  </select>



</div>

                {/* Bottom Buttons */}
                <div className="border-t border-gray-200 p-4 flex gap-3">
                  <button
                    onClick={() =>
                      setFilters({
                        city: "",
                        capacity: "",
                        budget: "",
                        perPlate: "",
                        foodType: "",
                        rating: "",
                      })
                    }
                    className="w-1/2 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                  >
                    Clear
                  </button>

                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="w-1/2 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
};

export default VenuesPage;
