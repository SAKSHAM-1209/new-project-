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
import venue41_1 from "@/assets/venue41_1.jpg";
import venue41_2 from "@/assets/venue41_2.jpg";
import venue41_3 from "@/assets/venue41_3.jpg";
import venue41_4 from "@/assets/venue41_4.jpg";
import venue41_5 from "@/assets/venue41_5.jpg";
import venue41_6 from "@/assets/venue40_6.jpg";
// // ===== VENUE 42 =====
import venue42_1 from "@/assets/venue42_1.jpg";
import venue42_2 from "@/assets/venue42_2.jpg";
import venue42_3 from "@/assets/venue42_3.jpg";
import venue42_4 from "@/assets/venue42_4.jpg";
import venue42_5 from "@/assets/venue42_5.jpg";

// ===== VENUE 43 =====
import venue43_1 from "@/assets/venue43_1.jpg";
import venue43_2 from "@/assets/venue43_2.jpg";
import venue43_3 from "@/assets/venue43_3.jpg";
import venue43_4 from "@/assets/venue43_4.jpg";


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
  },
  {
    id: 41,
    images: [venue41_1, venue41_2, venue41_3, venue41_4, venue41_5, venue41_6],
    name: "Luv Kush Vatika",
    location: "Kanpur",
    address: "H796+9WW, Resort Rd, New Kanpur City, Uttar Pradesh 209217",
    capacity: "100-1000",
    foodType: "both",
    vegPrice: 1200,
    nonVegPrice: 2500,
    perPlate: 1200,
    rating: 4.4,
    reviews: null,
    manager: "Kulmeet Singh Chabra",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/WykKfYEFPKPANrPL6",
    budget: "₹8 Lakh – ₹12 Lakh", // approx range (based on price)
  },
  {
    id: 42,
    images: [venue42_1, venue42_2, venue42_3, venue42_4, venue42_5],
    name: "Balaji Party Lawn",
    location: "Kanpur",
    address: "Sanidev Chauraha, Kanpur, Uttar Pradesh 209217",
    capacity: "700-800",
    foodType: "veg",
    vegPrice: 1000,
    perPlate: 1000,
    rating: 4.1,
    reviews: null,
    manager: "Abhishek",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/xn6SszeVQ3bwtHJMA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 43,
    images: [venue43_1, venue43_2, venue43_3, venue43_4],
    name: "K.D Resort",
    location: "Kanpur",
    address: "H796+9WW, Resort Rd, New Kanpur City, Uttar Pradesh 209217",
    capacity: "100-1000",
    foodType: "both",
    vegPrice: 1200,
    nonVegPrice: 2500,
    perPlate: 1200, // filter ke liye base
    rating: 4.3,
    reviews: null,
    manager: "Kulmeet Singh Chabra",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/eaHsqYCmDHjMgq978",
    budget: "₹8 Lakh – ₹12 Lakh"
  },
  {
  id: 44,
  images: ["/assets/placeholder.jpg"], // photos baad me add kar lena
  name: "Kailash Palace Lawn 2",
  location: "Unnao",
  address: "Bala Ji Hospital Trauma Center, Rajdhani Marg, Ganga Ghat, Shuklaganj, Unnao, Uttar Pradesh 209861",
  capacity: "1000",
  foodType: "veg",
  vegPrice: 800,
  perPlate: 800,
  perPlateNote: "₹800–₹1500/plate (Veg)",
  rating: 4.0,
  reviews: null,
  manager: "Shobhit Awasthi",
  contact: "+91 7355498622",
  mapLink: "https://share.google/PCqVaNIJgmeeoVQpi",
  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 45,
  images: ["/assets/placeholder.jpg"], // photos baad me add kar lena
  name: "Vibha Raj Palace",
  location: "Kanpur",
  address: "15 A, near Custom, Central Excise Colony, Gujaini, Kanpur, Uttar Pradesh 208022",
  capacity: "600-700",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,   // ✅ important
  menuBasedPricing: false,
  perPlateNote: "Customer can arrange catering on their own.",
  rating: 4.3,
  reviews: null,
  manager: "",
  contact: "+91 8052003999",
  mapLink: "https://maps.app.goo.gl/RPE8mRj3wurpDVe46",
  budget: "₹8 Lakh – ₹12 Lakh"
},
{
  id: 46,
  images: ["/assets/placeholder.jpg"], // photos baad me add kar lena
  name: "Krishna Lawn",
  location: "Unnao",
  address: "Lucknow Road, Opposite Power House, near Industrial Area Dahi Chowki, Unnao, Uttar Pradesh 209801",
  capacity: "50-200",
  foodType: "veg",
  vegPrice: null,
  perPlate: null,
  menuBasedPricing: true,   // ✅ best assumption
  ownCateringAllowed: false,
  perPlateNote: "Pricing depends on menu selection",
  rating: 4.0,
  reviews: null,
  manager: "Abhi Krishna Gupta",
  contact: "+91 9794449787",
  mapLink: "https://maps.app.goo.gl/17Cs68mzuUitJTCc6",
  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 47,
  images: ["/assets/placeholder.jpg"],
  name: "Omkareshwar Banquets",
  location: "Unnao",
  address: "Marhalla Chowraha Purana, DBS Ground, Near Shuklaganj Stadium, Rajdhani Marg, Shuklaganj, Uttar Pradesh 209862",

  capacity: "500-600",

  // 🍽 Catering by own
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: 500, // reference only

  ownCateringAllowed: true,
  menuBasedPricing: false,
  perPlateNote: "Estimated ₹500 • Catering by own",

  rating: 4.1,
  reviews: null,

  manager: "Pranjul",
  contact: "+91 7678230725",

  mapLink: "https://maps.app.goo.gl/ymbaJs6GKayTkMJ66",

  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 48,
  images: ["/assets/placeholder.jpg"],
  name: "Saubhagya Shree Palace & Lawn",
  location: "Unnao",
  address: "Marlaha Chauraha, Azad Marg, Shuklaganj, Gajiyakedha, Uttar Pradesh 209862",

  capacity: "1000",

  // 🍽 Menu based pricing
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  menuBasedPricing: true,
  ownCateringAllowed: false,
  perPlateNote: "Pricing depends on menu",

  rating: 4.8,
  reviews: null,

  manager: "Pranjul Pandey",
  contact: "+91 9278296305",

  mapLink: "https://maps.app.goo.gl/U95JhWMEW3i7XVia7",

  budget: "₹8 Lakh – ₹12 Lakh"
},
{
  id: 49,
  images: ["/assets/placeholder.jpg"],
  name: "Shailshree Palace (Chay-Shay)",
  location: "Unnao",
  address: "Shuklaganj, Uttar Pradesh", // address missing tha

  capacity: "50-800",

  // 🍽 Range pricing
  foodType: "veg",
  vegPrice: 800,
  perPlate: 800,
  perPlateNote: "₹800–₹1200/plate (depends on gathering)",

  menuBasedPricing: false,
  ownCateringAllowed: false,

  rating: 3.6,
  reviews: null,

  manager: "Shravan Kumar Shukla",
  contact: "+91 9889008949",

  mapLink: "https://maps.app.goo.gl/vrpnsaNRj96Rg1jK8",

  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 50,
  images: ["/assets/placeholder.jpg"],
  name: "Tasi Kitchen",
  location: "Unnao",
  address: "Lucknow Road, Opposite Power House, near Industrial Area Dahi Chowki, Unnao, Uttar Pradesh 209801",

  capacity: "50-100",

  // 🍽 Pricing
  foodType: "veg",
  vegPrice: 800,
  perPlate: 800,

  rating: 4.8,
  reviews: null,

  manager: "Abhi Krishna Gupta",
  contact: "+91 9794449787",

  mapLink: "https://share.google/0PDBCLtEnAfsqXzRY",

  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 51,
  images: ["/assets/placeholder.jpg"],
  name: "Hotel Bridge",
  location: "Unnao",
  address: "595, Lucknow Rd, Shiv Nagar, Unnao, Uttar Pradesh 209801",

  capacity: "400-450",

  // 🍽 Pricing range
  foodType: "veg",
  vegPrice: 800,
  perPlate: 800,
  perPlateNote: "₹800–₹1000/plate",

  rating: 4.8,
  reviews: null,

  manager: "Rahul Singh",
  contact: "+91 6307951300",

  mapLink: "https://share.google/0PDBCLtEnAfsqXzRY",

  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 52,
  images: ["/assets/placeholder.jpg"],
  name: "Shehnai Wedding Lawn",
  location: "Unnao",
  address: "Azad Nagar, Shuklaganj, Netua Grameen, Uttar Pradesh",

  capacity: "1000",

  // 🍽 Catering by own
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  ownCateringAllowed: true,
  menuBasedPricing: false,
  perPlateNote: "Customer can arrange catering on their own",

  rating: 4.4,
  reviews: null,

  manager: "Manoj Kumar Rawat",
  contact: "+91 8115920820",

  mapLink: "https://share.google/8RIf0RdWEPAQEKAFb",

  budget: "₹8 Lakh – ₹12 Lakh"
},
{
  id: 53,
  images: ["/assets/placeholder.jpg"],
  name: "Muskan Palace",
  location: "Unnao",
  address: "In front of Chandmari, Tahseel Road, Bichhiya, Uttar Pradesh 209801",

  capacity: "1000-1500",

  // 🍽 Menu based
  foodType: "veg",
  vegPrice: null,
  perPlate: null,

  menuBasedPricing: true,
  ownCateringAllowed: false,
  perPlateNote: "Pricing depends on menu",

  rating: 4.5,
  reviews: null,

  manager: "Harsh Deep Singh",
  contact: "+91 7905461339",

  mapLink: "https://share.google/6Gdh7c6ipnioFO7Bc",

  budget: "₹12 Lakh+"
},
{
  id: 54,
  images: ["/assets/placeholder.jpg"],
  name: "J.P Palace",
  location: "Unnao",
  address: "GFVH+VMC, Ring Rd, Narendra Nagar, Lok Nagar, Unnao, Uttar Pradesh 209801",

  capacity: "250-300",

  // 🍽 Menu based
  foodType: "veg",
  vegPrice: null,
  perPlate: null,

  menuBasedPricing: true,
  ownCateringAllowed: false,
  perPlateNote: "Pricing depends on menu",

  rating: 3.6,
  reviews: null,

  manager: "Shobhit Gupta",
  contact: "+91 9451411000",

  mapLink: "https://share.google/hy7rF8HP4wZeifURg",

  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 55,
  images: ["/assets/placeholder.jpg"],
  name: "Swarn Mahal",
  location: "Unnao",
  address: "Lucknow Road, Opposite Power House, near Industrial Area Dahi Chowki, Unnao, Uttar Pradesh 209801",

  capacity: "70-220",

  // 🍽 Pricing
  foodType: "veg",
  vegPrice: 950,
  perPlate: 950,

  rating: 4.8,
  reviews: null,

  manager: "Abhi Krishna Gupta",
  contact: "+91 9794449787",

  mapLink: "https://share.google/0PDBCLtEnAfsqXzRY",

  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 56,
  images: ["/assets/placeholder.jpg"],
  name: "Park View Palace",
  location: "Unnao",
  address: "Krishna Nagar, 116, Kanpur - Lucknow Rd, Moti Nagar, Chaudrana, Taki, Unnao, Uttar Pradesh 209801",

  capacity: "500-700",

  // 🍽 Catering by own
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  ownCateringAllowed: true,
  menuBasedPricing: false,
  perPlateNote: "Customer can arrange catering on their own",

  rating: 3.7,
  reviews: null,

  manager: "R.K Singh",
  contact: "+91 9838641275",

  mapLink: "https://share.google/ek8KdkDgIKM3qFCTx",

  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 57,
  images: ["/assets/placeholder.jpg"],
  name: "Celebration Banquet",
  location: "Unnao",
  address: "Kumedan Khera, Lucknow-Kanpur NH-25 Road, near Central School, Unnao, Uttar Pradesh 209801",

  capacity: "1500-2000",

  // 🍽 Catering by own (estimated reference price diya hai)
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: 1200,

  ownCateringAllowed: true,
  menuBasedPricing: false,
  perPlateNote: "Estimated ₹1200 • Catering by own",

  rating: 4.4,
  reviews: null,

  manager: "Vikram Jain",
  contact: "+91 9566134964",

  mapLink: "https://share.google/thozsV3WtYcau0VrQ",

  budget: "₹12 Lakh+"
},
{
  id: 58,
  images: ["/assets/placeholder.jpg"],
  name: "Platinum Banquet",
  location: "Unnao",
  address: "Lucknow Road, Opposite Power House, near Industrial Area Dahi Chowki, Unnao, Uttar Pradesh 209801",

  capacity: "150-500",

  // 🍽 Pricing
  foodType: "veg",
  vegPrice: 950,
  perPlate: 950,

  rating: 4.8,
  reviews: null,

  manager: "Abhi Krishna Gupta",
  contact: "+91 9794449787",

  mapLink: "https://share.google/0PDBCLtEnAfsqXzRY",

  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 59,
  images: ["/assets/placeholder.jpg"],
  name: "Hotel Gagan Plaza",
  location: "Kanpur",
  address: "63/06, The Mall, near Murray Company Bridge, Kanpur, Uttar Pradesh",

  capacity: "250-300",

  // 🍽 Pricing (veg only mentioned)
  foodType: "veg",
  vegPrice: 1050,
  perPlate: 1050,

  rating: 3.6,
  reviews: null,

  manager: "Sanjay Sharma",
  contact: "+91 8726039098",

  mapLink: "https://maps.app.goo.gl/gKcmaA4jJrXfqHEN8",

  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 60,
  images: ["/assets/placeholder.jpg"],
  name: "Hotel The Legend",
  location: "Kanpur",
  address: "Besides RSPL Building, Fazalganj, Kanpur, Uttar Pradesh",

  capacity: "300-400",

  // 🍽 Pricing (veg only available)
  foodType: "veg",
  vegPrice: 1100,
  perPlate: 1100,

  rating: 4.1,
  reviews: null,

  manager: "Sanjay Sharma",
  contact: "+91 7800005999",

  mapLink: "https://maps.app.goo.gl/rS65quCRdcNvuLpC6",

  budget: "₹3 Lakh – ₹5 Lakh"
},
  //LUCKNOW VENUES
  
{
  id: 61,
  images: ["/assets/placeholder.jpg"],
  name: "Hotel Emperio Grand & Banquet Hall",
  location: "Lucknow",
  address: "Plot No. 16, Kanpur Rd, Sector B, Bargawan, Alambagh, Lucknow, Uttar Pradesh 226012",

  capacity: "350-400",

  // 🍽 Pricing (range handled properly)
  foodType: "both",
  vegPrice: 750,
  nonVegPrice: 1100,
  perPlate: 750,
  perPlateNote: "Veg ₹750–₹1300 | Non-Veg ₹1100–₹1350",

  rating: 4.7,
  reviews: null,

  manager: "Anushka",
  contact: "+91 8574400640",

  mapLink: "https://share.google/pm94O0ZcLE0dkvY63",

  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 62,
  images: ["/assets/placeholder.jpg"],
  name: "The Blossom Banquet",
  location: "Lucknow",
  address: "Ratan Khand, Ruchi Khand 1, Sharda Nagar, Lucknow, Uttar Pradesh 226012",
  capacity: "300",
  foodType: "veg",
  vegPrice: 700,
  perPlate: 700,
  perPlateNote: "₹700–₹850/plate",
  rating: 4.2,
  manager: "M.P Singh",
  contact: "+91 9792385000",
  mapLink: "https://maps.app.goo.gl/ujtSafSSYhtmbiiB6",
  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 63,
  images: ["/assets/placeholder.jpg"],
  name: "Maple Paradise",
  location: "Lucknow",
  address: "Amar Shaheed Path, opp. Omaxe City, Lucknow, Uttar Pradesh 226025",
  capacity: "50-250",
  foodType: "both",
  vegPrice: 1100,
  nonVegPrice: 1300,
  perPlate: 1100,
  perPlateNote: "Veg ₹1100+ | Non-Veg ₹1300+",
  rating: 4.7,
  manager: "",
  contact: "+91 7081204445",
  mapLink: "https://maps.app.goo.gl/EDMkEvR6DC64VBon6",
  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 64,
  images: ["/assets/placeholder.jpg"],
  name: "Brijwasi Lawn",
  location: "Lucknow",
  address: "Sector B, LDA Colony, Lucknow, Uttar Pradesh 226012",
  capacity: "100-400",
  foodType: "veg",
  vegPrice: 600,
  perPlate: 600,
  rating: 4.7,
  manager: "Ajay Kumar Piplani",
  contact: "+91 9793924777",
  mapLink: "https://maps.app.goo.gl/ntsmeXY3K39bxg587",
  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 65,
  images: ["/assets/placeholder.jpg"],
  name: "Maharaja Restaurant & Banquet",
  location: "Lucknow",
  address: "Munshipulia, Indira Nagar, Lucknow, Uttar Pradesh 226016",
  capacity: "80",
  foodType: "veg",
  vegPrice: 499,
  perPlate: 499,
  perPlateNote: "₹499–₹649",
  rating: 4.5,
  manager: "",
  contact: "+91 9005614007",
  mapLink: "https://maps.app.goo.gl/LurQpr9WKmxiWUTQ7",
  budget: "Under ₹1 Lakh"
},
{
  id: 66,
  images: ["/assets/placeholder.jpg"],
  name: "Rohia Banquet Hall & Lawn",
  location: "Lucknow",
  address: "SH 25, Chowk, Lucknow, Uttar Pradesh 226003",
  capacity: "500",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,
  perPlateNote: "Catering by own",
  rating: 3.8,
  manager: "Chandra Prakash",
  contact: "+91 9415024908",
  mapLink: "https://maps.app.goo.gl/dcRHQZoN8dwrHXLSA",
  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 67,
  images: ["/assets/placeholder.jpg"],
  name: "MD Marriage Lawn & Banquet Hall",
  location: "Lucknow",
  address: "Saadatganj, Lucknow, Uttar Pradesh 226003",

  capacity: "1200-1300",

  // 🍽 IMPORTANT FIX
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  ownCateringAllowed: true,
  menuBasedPricing: false,
  perPlateNote: "Catering by own",

  rating: 3.9,
  reviews: null,

  manager: "Manish Gupta",
  contact: "+91 9839331831",

  mapLink: "https://maps.app.goo.gl/4AqFrvKqtMECpoTb6",

  budget: "₹8 Lakh – ₹12 Lakh"
},
{
  id: 68,
  images: ["/assets/placeholder.jpg"],
  name: "SAS One Farms",
  location: "Lucknow",
  address: "Nagram - Nilmatha Rd, Lucknow, Uttar Pradesh 226301",
  capacity: "1000-2000",
  foodType: "both",
  vegPrice: 1199,
  nonVegPrice: 1500,
  perPlate: 1199,
  rating: 4.6,
  manager: "Himanshu Kalra",
  contact: "+91 9919800008",
  mapLink: "https://maps.app.goo.gl/UNgVyaZaLUbZkvzU7",
  budget: "₹12 Lakh+"
},
{
  id: 69,
  images: ["/assets/placeholder.jpg"],
  name: "C.M Estate Lawn & Banquet Hall",
  location: "Lucknow",
  address: "Halwasiya House, Mahatma Gandhi Marg, Hazratganj, Lucknow, Uttar Pradesh 226001",

  capacity: "400",

  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  menuBasedPricing: true,
  ownCateringAllowed: false,
  perPlateNote: "Pricing depends on menu",

  rating: 4.4,
  reviews: null,

  manager: "Shivam Yadav",
  contact: "+91 9559552528",

  mapLink: "https://maps.app.goo.gl/gVKfQizDfu4MWs7Y6",
  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 70,
  images: ["/assets/placeholder.jpg"],
  name: "Sahu Palace Banquet",
  location: "Lucknow",
  address: "Picnic Spot Rd, Indira Nagar, Lucknow, Uttar Pradesh 226016",

  capacity: "500",

  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  ownCateringAllowed: true,
  menuBasedPricing: false,
  perPlateNote: "Catering by own",

  rating: 4.4,
  reviews: null,

  manager: "",
  contact: "+91 9452065021",

  mapLink: "https://maps.app.goo.gl/twGKeMe9zwwuMvkC7",
  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 71,
  images: ["/assets/placeholder.jpg"],
  name: "Dreamy Delicacies Restaurant & Banquet",
  location: "Lucknow",
  address: "Lucknow, Uttar Pradesh",

  capacity: "150",

  foodType: "both",
  vegPrice: 650,
  nonVegPrice: 850,
  perPlate: 650,

  rating: 4.1,
  reviews: null,

  manager: "",
  contact: "+91 7080903261",

  mapLink: "https://maps.app.goo.gl/H8sx4YwFRPFQCjJV7",
  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 72,
  images: ["/assets/placeholder.jpg"],
  name: "Maple Delite Banquet Hall",
  location: "Lucknow",
  address: "Amar Shaheed Path, Omaxe City, Lucknow, Uttar Pradesh 226025",

  capacity: "200-250",

  foodType: "both",
  vegPrice: 1000,
  nonVegPrice: 1300,
  perPlate: 1000,

  rating: 4.1,
  reviews: null,

  manager: "Sanjeev Sharma",
  contact: "+91 6392751072",

  mapLink: "https://maps.app.goo.gl/HCDWUgtViuzRNQzy6",
  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 73,
  images: ["/assets/placeholder.jpg"],
  name: "MJ Funcity Waterpark & Resort",
  location: "Lucknow",
  address: "Rasoolpur Sadat, Uttar Pradesh 225001",

  capacity: "2500-3000",

  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  menuBasedPricing: true,
  ownCateringAllowed: false,

  rating: 4.1,
  reviews: null,

  manager: "",
  contact: "+91 7510001424",

  mapLink: "https://maps.app.goo.gl/cm3o9my7cLEwq1rV7",
  budget: "₹12 Lakh+"
},
{
  id: 74,
  images: ["/assets/placeholder.jpg"],
  name: "White Palace Lawn & Banquet Hall",
  location: "Lucknow",
  address: "Chinhat, Lolai, Lucknow, Uttar Pradesh 226028",

  capacity: "500",

  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,

  ownCateringAllowed: true,
  menuBasedPricing: false,

  rating: 5.0,
  reviews: null,

  manager: "Sanjay",
  contact: "+91 9795745000",

  mapLink: "https://maps.app.goo.gl/hasJs5bdJgSfpvia9",
  budget: "₹8 Lakh – ₹12 Lakh"
},
{
  id: 75,
  images: ["/assets/placeholder.jpg"],
  name: "Shrim Restaurant & Banquet",
  location: "Lucknow",
  address: "Vastu Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",

  capacity: "120",

  foodType: "veg",
  vegPrice: 1200,
  perPlate: 1200,

  rating: 4.7,
  reviews: null,

  manager: "",
  contact: "+91 9214201818",

  mapLink: "https://maps.app.goo.gl/hYV5Kyg86W8brBAYA",
  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 76,
  images: ["/assets/placeholder.jpg"],
  name: "The Posh Pouf Banquet",
  location: "Lucknow",
  address: "LDA Colony, Alambagh, Lucknow, Uttar Pradesh 226012",

  capacity: "80-100",

  foodType: "both",
  vegPrice: 1000,
  nonVegPrice: 1250,
  perPlate: 1000,

  rating: 4.1,
  reviews: null,

  manager: "Somit Walia",
  contact: "+91 9839011890",

  mapLink: "https://maps.app.goo.gl/1tzygeaU55DrGXSb7",
  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 77,
  images: ["/assets/placeholder.jpg"],
  name: "GK Grand Banquet Hall",
  location: "Lucknow",
  address: "Krishna Nagar, Lucknow, Uttar Pradesh 226023",

  capacity: "250",

  foodType: "veg",
  vegPrice: 950,
  perPlate: 950,

  rating: 4.4,
  reviews: null,

  manager: "Rohit Mishra",
  contact: "+91 9873980978",

  mapLink: "https://maps.app.goo.gl/ESSTp7xrDtqm5oET8",
  budget: "₹3 Lakh – ₹5 Lakh"
},
{
  id: 78,
  images: ["/assets/placeholder.jpg"],
  name: "JC Guest House",
  location: "Lucknow",
  address: "498/KA/4, Narayan Prasad Marg, Bans Mandi, Nirala Nagar, Lucknow, Uttar Pradesh 226020",
  capacity: "500-600",
  foodType: "both",
  vegPrice: 1500,
  nonVegPrice: null,
  perPlate: 1500,
  rating: 4.0,
  reviews: null,
  manager: "",
  contact: "+91 8874399998",
  mapLink: "https://maps.app.goo.gl/4Zc4xG4TAnzbKQSZ7",
  budget: "₹5 Lakh – ₹8 Lakh"
},
// AGRA VENUES
{
  id: 79,
  images: ["/assets/placeholder.jpg"],
  name: "Manglam Banquet",
  location: "Agra",
  address: "Agra, Uttar Pradesh",
  capacity: "300",
  foodType: "veg",
  vegPrice: 575,
  perPlate: 575,
  rating: 4.5,
  reviews: null,
  manager: "",
  contact: "+91 9897845444",
  mapLink: "https://maps.app.goo.gl/kAQp1L84nhkYW6up8",
  budget: "₹1 Lakh – ₹3 Lakh"
},
{
  id: 80,
  images: ["/assets/placeholder.jpg"],
  name: "La Chef Banquet & Party Hall",
  location: "Agra",
  address: "Agra, Uttar Pradesh",
  capacity: "35-250",
  foodType: "both",
  vegPrice: 499,
  nonVegPrice: 699,
  perPlate: 499,
  rating: 4.5,
  manager: "Ashish",
  contact: "+91 9997012237",
  mapLink: "https://maps.app.goo.gl/pA9HyLeWWNZTxGvJ6",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 81,
  images: ["/assets/placeholder.jpg"],
  name: "Shiv Palace",
  location: "Agra",
  address: "Shastri Puram Rd, Agra, Uttar Pradesh",
  capacity: "1500-2000",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,
  rating: 4.1,
  contact: "+91 7500615275",
  mapLink: "https://maps.app.goo.gl/A3hqyEM62EZifgqh8",
  budget: "₹12 Lakh+"
},
{
  id: 82,
  images: ["/assets/placeholder.jpg"],
  name: "Hari Om Seva Sadan",
  location: "Agra",
  address: "100 Feet Rd, DayalBagh, Agra, Uttar Pradesh",
  capacity: "1000",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,
  perPlateNote: "Catering by own",
  rating: 3.6,
  reviews: null,
  manager: "Rupesh Sharma",
  contact: "+91 9307070102",
  mapLink: "https://maps.app.goo.gl/9yN2vAy2mLDPiu4h6",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 83,
  images: ["/assets/placeholder.jpg"],
  name: "Tara Palace",
  location: "Agra",
  address: "Nagla Padma, Rohta, Agra, Uttar Pradesh",
  capacity: "1200-1500",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  menuBasedPricing: true,
  perPlateNote: "Pricing as per menu",
  rating: 4.4,
  reviews: null,
  manager: "Pushpendra Singh",
  contact: "+91 9760727430",
  mapLink: "https://maps.app.goo.gl/j2PhFJiFTM4uDpr58",
  budget: "₹12 Lakh+"
},

{
  id: 84,
  images: ["/assets/placeholder.jpg"],
  name: "Raj Paradise",
  location: "Agra",
  address: "Gwalior Rd, Sewla Jat, Agra, Uttar Pradesh",
  capacity: "2000",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,
  rating: 4.2,
  reviews: null,
  manager: "Sushil Battra",
  contact: "+91 9897023203",
  mapLink: "https://maps.app.goo.gl/3ZgybQK8VJ3e1eCF7",
  budget: "₹12 Lakh+"
},

{
  id: 85,
  images: ["/assets/placeholder.jpg"],
  name: "MG Imperial Banquet Hall",
  location: "Agra",
  address: "Avas Vikas Colony, Agra, Uttar Pradesh",
  capacity: "150",
  foodType: "veg",
  vegPrice: 700,
  perPlate: 700,
  rating: 4.0,
  reviews: null,
  manager: "Ritik Garg",
  contact: "+91 9760721090",
  mapLink: "https://maps.app.goo.gl/ZdE3bAY6VSCcDsVs6",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 86,
  images: ["/assets/placeholder.jpg"],
  name: "Hotel Ten Square",
  location: "Agra",
  address: "Fatehabad Rd, Taj Nagari, Agra, Uttar Pradesh",
  capacity: "200",
  foodType: "both",
  vegPrice: 650,
  nonVegPrice: 1000,
  perPlate: 650,
  rating: 4.5,
  reviews: null,
  manager: "Ankit Bansal",
  contact: "+91 9310109521",
  mapLink: "https://maps.app.goo.gl/k6w6gZAHtkopXSxT8",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 87,
  images: ["/assets/placeholder.jpg"],
  name: "Hotel The Golden Taj",
  location: "Agra",
  address: "Fatehabad Rd, Tajganj, Agra, Uttar Pradesh",
  capacity: "150",
  foodType: "veg",
  vegPrice: 600,
  perPlate: 600,
  rating: 4.3,
  reviews: null,
  manager: "Jitendra Singh",
  contact: "+91 7060075605",
  mapLink: "https://maps.app.goo.gl/r37sFXpUprHccV5H9",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 88,
  images: ["/assets/placeholder.jpg"],
  name: "BS Farm House",
  location: "Agra",
  address: "Devri Rd, Agra, Uttar Pradesh",
  capacity: "2000",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  menuBasedPricing: true,
  rating: 4.0,
  reviews: null,
  manager: "Jitendra Chahar",
  contact: "+91 9557845070",
  mapLink: "https://maps.app.goo.gl/oY9p46nqDayz4ZU6A",
  budget: "₹12 Lakh+"
},

{
  id: 89,
  images: ["/assets/placeholder.jpg"],
  name: "Orchid Farm House",
  location: "Agra",
  address: "Tajganj, Agra, Uttar Pradesh",
  capacity: "700",
  foodType: "both",
  vegPrice: null,
  nonVegPrice: null,
  perPlate: null,
  ownCateringAllowed: true,
  rating: 3.8,
  reviews: null,
  manager: "Rahul",
  contact: "+91 9927056200",
  mapLink: "https://maps.app.goo.gl/qCtyYKcpxYmmHRBe6",
  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 90,
  images: ["/assets/placeholder.jpg"],
  name: "D Grand Marquis",
  location: "Agra",
  address: "Agra, Uttar Pradesh",
  capacity: "3000-4000",
  foodType: "veg",
  vegPrice: 1500,
  perPlate: 1500,
  rating: 4.4,
  reviews: null,
  manager: "Dilip Gupta",
  contact: "+91 9837135444",
  mapLink: "https://maps.app.goo.gl/39RvFetRwSfBMexM8",
  budget: "₹12 Lakh+"
},

{
  id: 91,
  images: [defaultVenue],
  name: "Hotel Ayodhya Heritage",
  location: "Ayodhya",
  address: "Tedhi Bazar Rd, Ayodhya, Uttar Pradesh",
  capacity: "200",
  vegPrice: null,
  perPlate: null,
  foodType: "veg",
  rating: 4.6,
  manager: "Ritik",
  contact: "9004659324",
  mapLink: "https://maps.app.goo.gl/ABBRdXXQiFqLV5GG6",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 92,
  images: [defaultVenue],
  name: "The Aura Restaurant",
  location: "Ayodhya",
  address: "Ram Path Rd, Ayodhya",
  capacity: "100",
  vegPrice: 800,
  perPlate: 800,
  foodType: "veg",
  rating: 4.3,
  manager: "Ravi Rana",
  contact: "6386903300",
  mapLink: "https://maps.app.goo.gl/mHYGDaPJwncVST3t7",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 93,
  images: [defaultVenue],
  name: "LD Guest House",
  location: "Ayodhya",
  address: "Ramlila Maidan, Ayodhya",
  capacity: "500",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  ownCateringAllowed: true,
  rating: 4.7,
  manager: "Kanhaiya Agarwal",
  contact: "9936242959",
  mapLink: "https://maps.app.goo.gl/p43iFaLVaEaTNzdV8",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 94,
  images: [defaultVenue],
  name: "Amber Palace",
  location: "Ayodhya",
  address: "Faizabad, Ayodhya",
  capacity: "600",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  ownCateringAllowed: true,
  rating: 4.3,
  manager: "Ronak Singh",
  contact: "9580233701",
  mapLink: "https://maps.app.goo.gl/i65D5GKhHDSnJvUY7",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 95,
  images: [defaultVenue],
  name: "Gulmohar Palace",
  location: "Ayodhya",
  address: "Darshan Nagar, Ayodhya",
  capacity: "1000",
  vegPrice: 550,
  perPlate: 550,
  foodType: "veg",
  rating: 4.3,
  manager: "Sanjay Singh",
  contact: "8318064575",
  mapLink: "https://maps.app.goo.gl/p6762yXWLacudXNV8",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 96,
  images: [defaultVenue],
  name: "Raghav Ji Sarkar",
  location: "Ayodhya",
  address: "Makha Pur, Ayodhya",
  capacity: "2000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 3.9,
  manager: "Abhishek",
  contact: "9648552000",
  mapLink: "https://maps.app.goo.gl/HsqPAemEKryrChTb8",
  budget: "₹12 Lakh+"
},

{
  id: 97,
  images: [defaultVenue],
  name: "Avadh Samrat Resort",
  location: "Ayodhya",
  address: "Ayodhya",
  capacity: "200-1000",
  vegPrice: 2000,
  perPlate: 2000,
  foodType: "veg",
  rating: 4.5,
  manager: "Sanjay Singh",
  contact: "9918597111",
  mapLink: "https://maps.app.goo.gl/pfRweptDmjLeoQHb8",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 98,
  images: [defaultVenue],
  name: "Hotel Rising Banquet",
  location: "Ayodhya",
  address: "NH 27, Ayodhya",
  capacity: "2000-5000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.8,
  manager: "Ramesh",
  contact: "9670920000",
  mapLink: "https://maps.app.goo.gl/CpR5aBrc6881K5zw8",
  budget: "₹12 Lakh+"
},

{
  id: 99,
  images: [defaultVenue],
  name: "Ambuj Restaurant & Banquet",
  location: "Ayodhya",
  address: "Near Cantt Station, Ayodhya",
  capacity: "100",
  vegPrice: 550,
  perPlate: 550,
  foodType: "veg",
  rating: 4.5,
  manager: "Sikandar",
  contact: "7376772231",
  mapLink: "https://maps.app.goo.gl/Eg1wHzDDA3VJHFRk9",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 100,
  images: [defaultVenue],
  name: "JP Barat Ghar",
  location: "Ayodhya",
  address: "Milkipur Rd, Ayodhya",
  capacity: "",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  ownCateringAllowed: true,
  rating: 4.6,
  manager: "Ankur Dutt",
  contact: "7619805557",
  mapLink: "https://maps.app.goo.gl/mSjCDHbwE7LrKhCq8",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 101,
  images: [defaultVenue],
  name: "Sgt Plaza Banquet",
  location: "Varanasi",
  address: "Sarnath, Varanasi",
  capacity: "80-300",
  vegPrice: 1300,
  perPlate: 1300,
  foodType: "both",
  rating: 4.0,
  manager: "Vinay Srivastava",
  contact: "7317002932",
  mapLink: "https://maps.app.goo.gl/c5YWMqySWrAwL4uG8",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 102,
  images: [defaultVenue],
  name: "Rhythm Banquet Hall",
  location: "Varanasi",
  address: "JHV Mall, Varanasi",
  capacity: "150-200",
  vegPrice: 800,
  perPlate: 800,
  foodType: "veg",
  rating: 4.9,
  manager: "Akshay Mishra",
  contact: "9307170303",
  mapLink: "https://maps.app.goo.gl/Cu8zaLAEV2MQZBQZ9",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 103,
  images: [defaultVenue],
  name: "Hotel Sarin Inn",
  location: "Varanasi",
  address: "Sigra, Varanasi",
  capacity: "400",
  vegPrice: 1200,
  nonVegPrice: 1500,
  perPlate: 1200,
  foodType: "both",
  rating: 3.8,
  manager: "Ritesh Kapoor",
  contact: "9336929765",
  mapLink: "https://maps.app.goo.gl/ov8qWzjYpfczSpVXA",
  budget: "₹5 Lakh – ₹8 Lakh"
},
{
  id: 104,
  images: [defaultVenue],
  name: "Shiv Kashi Palace",
  location: "Varanasi",
  address: "Bada Lalpur, Varanasi",
  capacity: "200",
  vegPrice: 1000,
  perPlate: 1000,
  foodType: "veg",
  rating: 4.7,
  manager: "Adarsh Singh",
  contact: "9236909511",
  mapLink: "https://maps.app.goo.gl/vq14iFMoTyL5ugCm7",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 105,
  images: [defaultVenue],
  name: "City Garden Lawn",
  location: "Varanasi",
  address: "GT Road, Varanasi",
  capacity: "1000",
  vegPrice: 950,
  perPlate: 950,
  foodType: "veg",
  rating: 4.8,
  manager: "Ayaz Ansari",
  contact: "9919696288",
  mapLink: "https://maps.app.goo.gl/XRKAfxYyAzSUo3Xw6",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 106,
  images: [defaultVenue],
  name: "Baba Banquet Hall",
  location: "Varanasi",
  address: "DLW Colony, Varanasi",
  capacity: "150",
  vegPrice: 700,
  nonVegPrice: 1000,
  perPlate: 700,
  foodType: "both",
  rating: 4.5,
  manager: "Prem Kumar",
  contact: "9919710257",
  mapLink: "https://maps.app.goo.gl/CrFESHAGg9K9rH2WA",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 107,
  images: [defaultVenue],
  name: "Shivaalik Hotel & Lawn",
  location: "Varanasi",
  address: "Kandwa, Varanasi",
  capacity: "300-600",
  vegPrice: 1500,
  perPlate: 1500,
  foodType: "veg",
  rating: 4.3,
  manager: "Rakesh Singh",
  contact: "8423039797",
  mapLink: "https://maps.app.goo.gl/339Pms1kf2GMCjNXA",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 108,
  images: [defaultVenue],
  name: "Saroja Palace",
  location: "Varanasi",
  address: "Sant Kabir Rd, Varanasi",
  capacity: "600-800",
  vegPrice: 1400,
  nonVegPrice: 1800,
  perPlate: 1400,
  foodType: "both",
  rating: 4.3,
  manager: "Ashwani Gupta",
  contact: "9140987224",
  mapLink: "https://maps.app.goo.gl/cwfZvXcvBbf1sEnUA",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 109,
  images: [defaultVenue],
  name: "Anupam Lawn & Banquet",
  location: "Varanasi",
  address: "Vyas Bagh, Varanasi",
  capacity: "",
  vegPrice: 1500,
  nonVegPrice: 2500,
  perPlate: 1500,
  foodType: "both",
  rating: 4.7,
  manager: "S.K Srivastava",
  contact: "9839063230",
  mapLink: "https://maps.app.goo.gl/RR6FjWQxPyChGFBSA",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 110,
  images: [defaultVenue],
  name: "Hotel Sahu Inn",
  location: "Varanasi",
  address: "Darshan Nagar Rd, Varanasi",
  capacity: "",
  vegPrice: 400,
  perPlate: 400,
  foodType: "veg",
  rating: 4.5,
  manager: "Gautam Sahu",
  contact: "7052935132",
  mapLink: "https://maps.app.goo.gl/FXMFWwjnSgU1qZF29",
  budget: "₹1 Lakh – ₹3 Lakh"
},


{
  id: 111,
  images: [defaultVenue],
  name: "Blue Sky Banquet",
  location: "Noida",
  address: "Sector 63, Noida",
  capacity: "80-120",
  vegPrice: 800,
  nonVegPrice: 1200,
  perPlate: 800,
  foodType: "both",
  rating: 4.8,
  manager: "Abhay Singh",
  contact: "9315929799",
  mapLink: "https://maps.app.goo.gl/2wZzu9ExdYxQdUYi7",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 112,
  images: [defaultVenue],
  name: "The Opera House",
  location: "Noida",
  address: "Sector 73, Noida",
  capacity: "1000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  menuBasedPricing: true,
  rating: 4.8,
  manager: "Santanu",
  contact: "9911620620",
  mapLink: "https://maps.app.goo.gl/Eyktxj78Fo7Z72mSA",
  budget: "₹12 Lakh+"
},

{
  id: 113,
  images: [defaultVenue],
  name: "The Olive Banquet",
  location: "Noida",
  address: "Sector 62, Noida",
  capacity: "150",
  vegPrice: 1200,
  nonVegPrice: 1400,
  perPlate: 1200,
  foodType: "both",
  rating: 4.8,
  manager: "Manoj Deshwal",
  contact: "8447755376",
  mapLink: "https://maps.app.goo.gl/i5XBnX9hBW96ks8m8",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 114,
  images: [defaultVenue],
  name: "RS Farm & Banquet",
  location: "Noida",
  address: "Sector 121, Noida",
  capacity: "50-1000",
  vegPrice: 800,
  nonVegPrice: 1000,
  perPlate: 800,
  foodType: "both",
  rating: 4.8,
  manager: "Chandan Sharma",
  contact: "9811346071",
  mapLink: "https://maps.app.goo.gl/m6Hn8rkDYQ3Et1PH6",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 115,
  images: [defaultVenue],
  name: "Ananda Bliss",
  location: "Noida",
  address: "Sector 132, Noida",
  capacity: "200-700",
  vegPrice: 1100,
  nonVegPrice: 1300,
  perPlate: 1100,
  foodType: "both",
  rating: 4.3,
  manager: "Samir Saxsena",
  contact: "9810110780",
  mapLink: "https://maps.app.goo.gl/GMs6v2vAGTvg5M8B8",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 116,
  images: [defaultVenue],
  name: "Divine Banquet",
  location: "Noida",
  address: "Sector 63, Noida",
  capacity: "120",
  vegPrice: 900,
  perPlate: 900,
  foodType: "veg",
  rating: 5.0,
  manager: "Rohit Rajput",
  contact: "9667320220",
  mapLink: "https://maps.app.goo.gl/yEPGvzNa6GpT19Ci7",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 117,
  images: [defaultVenue],
  name: "Marks Hotel Banquet",
  location: "Noida",
  address: "Sector 62, Noida",
  capacity: "200",
  vegPrice: 1000,
  nonVegPrice: 2500,
  perPlate: 1000,
  foodType: "both",
  rating: 4.5,
  manager: "Ravindra",
  contact: "9811843657",
  mapLink: "https://maps.app.goo.gl/pnaRYiNddtKxhtBY8",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 118,
  images: [defaultVenue],
  name: "Wedding Crown",
  location: "Noida",
  address: "Sector 74, Noida",
  capacity: "50-1500",
  vegPrice: 1600,
  perPlate: 1600,
  foodType: "veg",
  rating: 4.4,
  manager: "Rajiv Gautam",
  contact: "9211330070",
  mapLink: "https://maps.app.goo.gl/JidLBEUXzethp3ci9",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 119,
  images: [defaultVenue],
  name: "Wedding Villa",
  location: "Noida",
  address: "Sector 51, Noida",
  capacity: "1000",
  vegPrice: 3000,
  perPlate: 3000,
  foodType: "veg",
  rating: 4.5,
  manager: "Ashwani Sharma",
  contact: "8882201102",
  mapLink: "https://maps.app.goo.gl/3Xai6x1gmbKneNo79",
  budget: "₹12 Lakh+"
},

{
  id: 120,
  images: [defaultVenue],
  name: "Nagori Farms & Banquet",
  location: "Noida",
  address: "Sector 116, Noida",
  capacity: "100-1000",
  vegPrice: 800,
  nonVegPrice: 2000,
  perPlate: 800,
  foodType: "both",
  rating: 4.0,
  manager: "Chandan Sharma",
  contact: "9810252533",
  mapLink: "https://maps.app.goo.gl/XWhmU1C92TkkvNZSA",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 121,
  images: [defaultVenue],
  name: "The Roman Palace Banquet",
  location: "Noida",
  address: "Sector 121, Noida",
  capacity: "600",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.7,
  manager: "Gopal Dikshit",
  contact: "8800026092",
  mapLink: "https://maps.app.goo.gl/m3jb1AxYSZXyxMie6",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 122,
  images: [defaultVenue],
  name: "Divine Hotels & Banquets",
  location: "Noida",
  address: "Sector 70, Noida",
  capacity: "60-70",
  vegPrice: 800,
  nonVegPrice: 1600,
  perPlate: 800,
  foodType: "both",
  rating: 4.8,
  manager: "Sachin",
  contact: "9220373826",
  mapLink: "https://maps.app.goo.gl/9aRaDReykbDHQkiY9",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 123,
  images: [defaultVenue],
  name: "Le Season Park",
  location: "Noida",
  address: "Greater Noida",
  capacity: "250",
  vegPrice: 4000,
  perPlate: 4000,
  foodType: "veg",
  rating: 4.5,
  manager: "Laksh Bhardwaj",
  contact: "9311990265",
  mapLink: "https://maps.app.goo.gl/iZfJGEddwjfJFkLz7",
  budget: "₹12 Lakh+"
},

{
  id: 124,
  images: [defaultVenue],
  name: "RS Farmhouse Party Lawn",
  location: "Noida",
  address: "Noida Extension",
  capacity: "500",
  vegPrice: 1000,
  perPlate: 1000,
  foodType: "veg",
  rating: 4.2,
  manager: "",
  contact: "",
  mapLink: "",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 125,
  images: [defaultVenue],
  name: "The Golden Rose Banquet",
  location: "Noida",
  address: "Greater Noida West",
  capacity: "1500",
  vegPrice: 1200,
  perPlate: 1200,
  foodType: "veg",
  rating: 5.0,
  manager: "Manish",
  contact: "",
  mapLink: "https://maps.app.goo.gl/hKc1oJVuhks8WhDo9",
  budget: "₹8 Lakh – ₹12 Lakh"
},


{
  id: 126,
  images: [defaultVenue],
  name: "Rudrakshaa Banquet",
  location: "Ghaziabad",
  address: "Vaishali, Ghaziabad",
  capacity: "2000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.3,
  manager: "H.S Kotwal",
  contact: "8800950012",
  mapLink: "https://maps.app.goo.gl/BWLk5FHGZoXno96s5",
  budget: "₹12 Lakh+"
},

{
  id: 127,
  images: [defaultVenue],
  name: "Royale Garden",
  location: "Ghaziabad",
  address: "Shastri Nagar, Ghaziabad",
  capacity: "",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  ownCateringAllowed: true,
  rating: 3.7,
  manager: "Narendra",
  contact: "",
  mapLink: "https://maps.app.goo.gl/YBvJi2nZLiejWzu86",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 128,
  images: [defaultVenue],
  name: "Royal Orchid Banquet",
  location: "Ghaziabad",
  address: "Rajendra Nagar, Ghaziabad",
  capacity: "300",
  vegPrice: 1000,
  nonVegPrice: 1200,
  perPlate: 1000,
  foodType: "both",
  rating: 3.7,
  manager: "Vivek Gupta",
  contact: "9910972962",
  mapLink: "https://maps.app.goo.gl/guunXh1qBNYEJmSt6",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 129,
  images: [defaultVenue],
  name: "MI Garden",
  location: "Ghaziabad",
  address: "Vasundhara, Ghaziabad",
  capacity: "1000",
  vegPrice: 1500,
  nonVegPrice: 2000,
  perPlate: 1500,
  foodType: "both",
  rating: 3.9,
  manager: "Ginni Arora",
  contact: "9810067543",
  mapLink: "https://maps.app.goo.gl/zfCzs8Sxd1jpBNNr6",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 130,
  images: [defaultVenue],
  name: "The Terrace Lounge",
  location: "Ghaziabad",
  address: "Vaishali, Ghaziabad",
  capacity: "350-400",
  vegPrice: 1200,
  perPlate: 1200,
  foodType: "veg",
  rating: 4.5,
  manager: "Rohit",
  contact: "9810836806",
  mapLink: "https://maps.app.goo.gl/vgP3n5tezc3FmfHg6",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 131,
  images: [defaultVenue],
  name: "Golden River Banquet",
  location: "Ghaziabad",
  address: "Indirapuram, Ghaziabad",
  capacity: "300",
  vegPrice: 1000,
  perPlate: 1000,
  foodType: "veg",
  rating: 4.0,
  manager: "Ashish",
  contact: "9810785944",
  mapLink: "https://maps.app.goo.gl/kJLfkFw8iGmGeFLH6",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 132,
  images: [defaultVenue],
  name: "Meal Tree Restaurant",
  location: "Ghaziabad",
  address: "Raj Nagar Extension, Ghaziabad",
  capacity: "125-250",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 3.1,
  manager: "",
  contact: "9811761209",
  mapLink: "https://maps.app.goo.gl/ev1qn2tgaTPoPqiL8",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 133,
  images: [defaultVenue],
  name: "Ambrosia Palace",
  location: "Ghaziabad",
  address: "Vaishali, Ghaziabad",
  capacity: "100-700",
  vegPrice: 2200,
  perPlate: 2200,
  foodType: "veg",
  rating: 4.5,
  manager: "Rakesh Singh",
  contact: "9667790782",
  mapLink: "https://maps.app.goo.gl/vH5uaeYnvonUCV8s8",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 134,
  images: [defaultVenue],
  name: "Hotel Rousha Inn",
  location: "Ghaziabad",
  address: "Kaushambi, Ghaziabad",
  capacity: "80-140",
  vegPrice: 1300,
  nonVegPrice: 1800,
  perPlate: 1300,
  foodType: "both",
  rating: 3.9,
  manager: "Pradeep Singh",
  contact: "8800966112",
  mapLink: "https://maps.app.goo.gl/74H3sAn5Ki143H5AA",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 135,
  images: [defaultVenue],
  name: "The Roseman Hotel",
  location: "Ghaziabad",
  address: "Vaishali, Ghaziabad",
  capacity: "140+",
  vegPrice: 1100,
  perPlate: 1100,
  foodType: "veg",
  rating: 4.8,
  manager: "Raj",
  contact: "7042027242",
  mapLink: "https://maps.app.goo.gl/EwW5xxo5xRyXeU616",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 136,
  images: [defaultVenue],
  name: "The Crystal Farm",
  location: "Ghaziabad",
  address: "NH-24, Ghaziabad",
  capacity: "1000-1500",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 3.9,
  manager: "Manoj Sharma",
  contact: "8860078231",
  mapLink: "https://maps.app.goo.gl/PqhauXU64gcmqauw7",
  budget: "₹12 Lakh+"
},

{
  id: 137,
  images: [defaultVenue],
  name: "Volga Palace",
  location: "Ghaziabad",
  address: "Nehru Nagar, Ghaziabad",
  capacity: "1000",
  vegPrice: 1600,
  perPlate: 1600,
  foodType: "veg",
  rating: 4.0,
  manager: "Pushpak Chaudhary",
  contact: "9650618222",
  mapLink: "https://maps.app.goo.gl/dzV2sDfdzfCKDyK1A",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 138,
  images: [defaultVenue],
  name: "Vikrant SK Farm",
  location: "Ghaziabad",
  address: "NH-24, Ghaziabad",
  capacity: "1500",
  vegPrice: 1500,
  nonVegPrice: 1500,
  perPlate: 1500,
  foodType: "both",
  rating: 4.1,
  manager: "Ginni Arora",
  contact: "9810067543",
  mapLink: "https://maps.app.goo.gl/U7Esba1o5A9DGjun9",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 139,
  images: [defaultVenue],
  name: "Golden Heritage Banquet",
  location: "Ghaziabad",
  address: "Raj Bagh, Ghaziabad",
  capacity: "400",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.4,
  manager: "Rohit Chauhan",
  contact: "9990184100",
  mapLink: "https://maps.app.goo.gl/ntK7g4B1Bm4e3NeN7",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 140,
  images: [defaultVenue],
  name: "UK Radiance",
  location: "Ghaziabad",
  address: "Ghaziabad",
  capacity: "100",
  vegPrice: 1000,
  nonVegPrice: 1400,
  perPlate: 1000,
  foodType: "both",
  rating: 4.0,
  manager: "Varun",
  contact: "9810040850",
  mapLink: "https://maps.app.goo.gl/2XTvJeFiLC8LZkr97",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 141,
  images: [defaultVenue],
  name: "Ganpati Farmhouse",
  location: "Ghaziabad",
  address: "Shastri Nagar, Ghaziabad",
  capacity: "200-600",
  vegPrice: 1200,
  perPlate: 1200,
  foodType: "veg",
  rating: 3.9,
  manager: "",
  contact: "9718723939",
  mapLink: "https://maps.app.goo.gl/6PQqUAkrJVQy1dEy5",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 142,
  images: [defaultVenue],
  name: "Hotel Maiden Residency",
  location: "Ghaziabad",
  address: "Pandav Nagar, Ghaziabad",
  capacity: "500",
  vegPrice: 1250,
  perPlate: 1250,
  foodType: "veg",
  rating: 3.9,
  manager: "Sarvottam",
  contact: "8826109991",
  mapLink: "https://maps.app.goo.gl/Kx2TvRpBzYe3L4kU9",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 143,
  images: [defaultVenue],
  name: "Vintage Banquet",
  location: "Ghaziabad",
  address: "Vasundhara, Ghaziabad",
  capacity: "600",
  vegPrice: null,
  perPlate: null,
  foodType: "veg",
  rating: 4.3,
  manager: "Devesh",
  contact: "7711008868",
  mapLink: "https://maps.app.goo.gl/sDKVMVmp2FUtXp2E8",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 144,
  images: [defaultVenue],
  name: "Royal Orchid Lawn",
  location: "Ghaziabad",
  address: "Ghaziabad",
  capacity: "300",
  vegPrice: 1000,
  perPlate: 1000,
  foodType: "veg",
  rating: 3.7,
  manager: "Vivek Gupta",
  contact: "9910972962",
  mapLink: "https://maps.app.goo.gl/guunXh1qBNYEJmSt6",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 145,
  images: [defaultVenue],
  name: "The Golden Rose Lawn",
  location: "Ghaziabad",
  address: "Greater Noida West",
  capacity: "1500",
  vegPrice: 1200,
  perPlate: 1200,
  foodType: "veg",
  rating: 5.0,
  manager: "Manish",
  contact: "",
  mapLink: "https://maps.app.goo.gl/hKc1oJVuhks8WhDo9",
  budget: "₹8 Lakh – ₹12 Lakh"
},


{
  id: 146,
  images: [defaultVenue],
  name: "Ravi Banquet Hall",
  location: "Gorakhpur",
  address: "Nausar, Gorakhpur",
  capacity: "50-300",
  vegPrice: 800,
  perPlate: 800,
  foodType: "veg",
  rating: 5.0,
  manager: "Tripurari",
  contact: "7651859907",
  mapLink: "https://maps.app.goo.gl/TUtBui6VThnsZC7A9",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 147,
  images: [defaultVenue],
  name: "Aaditri Inn",
  location: "Gorakhpur",
  address: "Taramandal, Gorakhpur",
  capacity: "100-120",
  vegPrice: 800,
  nonVegPrice: 1350,
  perPlate: 800,
  foodType: "both",
  rating: 4.8,
  manager: "Suraj Singh",
  contact: "9161917373",
  mapLink: "https://maps.app.goo.gl/sAxniY2mUuxzZjgv7",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 148,
  images: [defaultVenue],
  name: "Shivoy Hotel",
  location: "Gorakhpur",
  address: "Golghar, Gorakhpur",
  capacity: "500-600",
  vegPrice: 1200,
  nonVegPrice: 1550,
  perPlate: 1200,
  foodType: "both",
  rating: 3.9,
  manager: "Trilokinath",
  contact: "9936048415",
  mapLink: "https://maps.app.goo.gl/hP1kNXE1nUunvQgS7",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 149,
  images: [defaultVenue],
  name: "Golden Marriage Lawn",
  location: "Gorakhpur",
  address: "Kunraghat, Gorakhpur",
  capacity: "700",
  vegPrice: 800,
  nonVegPrice: 800,
  perPlate: 800,
  foodType: "both",
  rating: 3.9,
  manager: "Nirandar Singh",
  contact: "9336402847",
  mapLink: "https://maps.app.goo.gl/j74FNoJbJYnfF82J8",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 150,
  images: [defaultVenue],
  name: "Hotel JVS Palace",
  location: "Gorakhpur",
  address: "Mohaddipur, Gorakhpur",
  capacity: "150-200",
  vegPrice: 800,
  nonVegPrice: 1200,
  perPlate: 800,
  foodType: "both",
  rating: 4.7,
  manager: "",
  contact: "",
  mapLink: "https://maps.app.goo.gl/wMe84WtryeoVjjss8",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 151,
  images: [defaultVenue],
  name: "Hotel Grand Swayamvar",
  location: "Gorakhpur",
  address: "Golghar, Gorakhpur",
  capacity: "700",
  vegPrice: 1500,
  nonVegPrice: 1700,
  perPlate: 1500,
  foodType: "both",
  rating: 3.9,
  manager: "Manoranjan Agrawal",
  contact: "8400155252",
  mapLink: "https://maps.app.goo.gl/JDuqRW4fYb4Ajgoa6",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 152,
  images: [defaultVenue],
  name: "Ideal Marriage House",
  location: "Gorakhpur",
  address: "Gorakhpur",
  capacity: "700",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  ownCateringAllowed: true,
  rating: 3.7,
  manager: "Shahzad",
  contact: "9450435145",
  mapLink: "https://maps.app.goo.gl/NWUAGXbYqs2k53fw8",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 153,
  images: [defaultVenue],
  name: "Hazratganj Restaurant & Banquet",
  location: "Gorakhpur",
  address: "Park Rd, Gorakhpur",
  capacity: "400",
  vegPrice: 1049,
  nonVegPrice: 1249,
  perPlate: 1049,
  foodType: "both",
  rating: 4.5,
  manager: "Chandan Mishra",
  contact: "9076923121",
  mapLink: "https://maps.app.goo.gl/jGY9azxEvTaBCeL4A",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 154,
  images: [defaultVenue],
  name: "Vani Banquet",
  location: "Gorakhpur",
  address: "Buxipur Rd, Gorakhpur",
  capacity: "300",
  vegPrice: 1100,
  nonVegPrice: 1200,
  perPlate: 1100,
  foodType: "both",
  rating: 4.8,
  manager: "Vibhuti",
  contact: "9807790961",
  mapLink: "https://maps.app.goo.gl/UFBqQ2ZVHL7dUTZX7",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 155,
  images: [defaultVenue],
  name: "Mangalam Banquet",
  location: "Gorakhpur",
  address: "Medical College Rd, Gorakhpur",
  capacity: "700",
  vegPrice: 900,
  nonVegPrice: 1300,
  perPlate: 900,
  foodType: "both",
  rating: 4.4,
  manager: "Khushgra Verma",
  contact: "9205062099",
  mapLink: "https://maps.app.goo.gl/P9Fj2y6ZkVvVtNic6",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 156,
  images: [defaultVenue],
  name: "Shree Party House",
  location: "Gorakhpur",
  address: "Gorakhnath Rd, Gorakhpur",
  capacity: "250-300",
  vegPrice: 700,
  nonVegPrice: 800,
  perPlate: 700,
  foodType: "both",
  rating: 4.1,
  manager: "J.K Agarwal",
  contact: "9415282410",
  mapLink: "https://maps.app.goo.gl/RJEdQsebUBD4DEHt6",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 157,
  images: [defaultVenue],
  name: "Resort & Marriage Lawn",
  location: "Gorakhpur",
  address: "Bank Rd, Gorakhpur",
  capacity: "300-500",
  vegPrice: 800,
  nonVegPrice: 1200,
  perPlate: 800,
  foodType: "both",
  rating: 4.0,
  manager: "Gaurav",
  contact: "9696555051",
  mapLink: "https://maps.app.goo.gl/cgEaWG4tZG9s6xuAA",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 158,
  images: [defaultVenue],
  name: "Ramayana Banquet",
  location: "Gorakhpur",
  address: "Gorakhnath, Gorakhpur",
  capacity: "600-700",
  vegPrice: 1000,
  perPlate: 1000,
  foodType: "veg",
  rating: 4.3,
  manager: "Nand",
  contact: "9451186248",
  mapLink: "https://maps.app.goo.gl/F7KWPRVBNZVQggPB7",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 159,
  images: [defaultVenue],
  name: "Cassia Restaurant & Banquet",
  location: "Gorakhpur",
  address: "Gorakhpur",
  capacity: "100",
  vegPrice: 700,
  perPlate: 700,
  foodType: "both",
  rating: 4.4,
  manager: "",
  contact: "9453045557",
  mapLink: "https://maps.app.goo.gl/F5pkFads4zTwdrk39",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 160,
  images: [defaultVenue],
  name: "Bhawna Banquet Hall",
  location: "Gorakhpur",
  address: "NH 28, Gorakhpur",
  capacity: "2000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  ownCateringAllowed: true,
  rating: 4.7,
  manager: "Vivek",
  contact: "8475893792",
  mapLink: "https://maps.app.goo.gl/Kv51PmdmZCa3ueGG7",
  budget: "₹12 Lakh+"
},

{
  id: 161,
  images: [defaultVenue],
  name: "Ambey Palace",
  location: "Gorakhpur",
  address: "Indira Nagar, Gorakhpur",
  capacity: "1000-1500",
  vegPrice: 750,
  nonVegPrice: 1000,
  perPlate: 750,
  foodType: "both",
  rating: 3.9,
  manager: "Atul Singh",
  contact: "8318706470",
  mapLink: "https://maps.app.goo.gl/m1txHJN3tDABqMxR9",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 162,
  images: [defaultVenue],
  name: "Bageecha Lawn & Resort",
  location: "Gorakhpur",
  address: "Khajani Rd, Gorakhpur",
  capacity: "3000+",
  vegPrice: 1050,
  nonVegPrice: 1250,
  perPlate: 1050,
  foodType: "both",
  rating: 4.3,
  manager: "Hashir",
  contact: "9935099272",
  mapLink: "https://maps.app.goo.gl/ePYt3qXiBZPU6QW39",
  budget: "₹12 Lakh+"
},

{
  id: 163,
  images: [defaultVenue],
  name: "Pushpvatika Banquet Hall",
  location: "Gorakhpur",
  address: "Padri Bazar, Gorakhpur",
  capacity: "1000",
  vegPrice: 600,
  nonVegPrice: 900,
  perPlate: 600,
  foodType: "both",
  rating: 4.2,
  manager: "B.M Sharma",
  contact: "8707597121",
  mapLink: "https://maps.app.goo.gl/WpcekrrEkHQqMVzk8",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 164,
  images: [defaultVenue],
  name: "Sanskar Marriage Hall",
  location: "Gorakhpur",
  address: "Gorakhpur",
  capacity: "2000",
  vegPrice: 700,
  nonVegPrice: 900,
  perPlate: 700,
  foodType: "both",
  rating: 3.7,
  manager: "Santosh Kushwaha",
  contact: "9336015879",
  mapLink: "https://maps.app.goo.gl/GtetA1yZH7MMfJkY9",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 165,
  images: [defaultVenue],
  name: "The Garg Banquet",
  location: "Gorakhpur",
  address: "Diwan Bazar, Gorakhpur",
  capacity: "3000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.3,
  manager: "Mahesh",
  contact: "9415693172",
  mapLink: "https://maps.app.goo.gl/vQnpJYaAnN1kiXDk7",
  budget: "₹12 Lakh+"
},

{
  id: 166,
  images: [defaultVenue],
  name: "Red Chilly Banquet",
  location: "Gorakhpur",
  address: "Deoria Bypass Rd, Gorakhpur",
  capacity: "250",
  vegPrice: 750,
  nonVegPrice: 1150,
  perPlate: 750,
  foodType: "both",
  rating: 4.5,
  manager: "Arpit Dubey",
  contact: "9670100139",
  mapLink: "https://maps.app.goo.gl/4wSRVtzH1FjxSAEU9",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 167,
  images: [defaultVenue],
  name: "Red Chilly 2.0",
  location: "Gorakhpur",
  address: "Sahara Estate, Gorakhpur",
  capacity: "250",
  vegPrice: 750,
  nonVegPrice: 1150,
  perPlate: 750,
  foodType: "both",
  rating: 4.0,
  manager: "Arpit Dubey",
  contact: "9670100139",
  mapLink: "https://maps.app.goo.gl/yBzkwMVth9Uz3qwo8",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 168,
  images: [defaultVenue],
  name: "Subham Vatika",
  location: "Gorakhpur",
  address: "Gorakhnath, Gorakhpur",
  capacity: "500",
  vegPrice: 900,
  nonVegPrice: 1500,
  perPlate: 900,
  foodType: "both",
  rating: 3.5,
  manager: "Shubham",
  contact: "9889070514",
  mapLink: "https://maps.app.goo.gl/hLyJLbBQZ7CHv5w58",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 169,
  images: [defaultVenue],
  name: "Bright Events & Banquet",
  location: "Gorakhpur",
  address: "University Rd, Gorakhpur",
  capacity: "2000",
  vegPrice: 1600,
  nonVegPrice: 1800,
  perPlate: 1600,
  foodType: "both",
  rating: 4.8,
  manager: "Vikash Sharma",
  contact: "9807517311",
  mapLink: "https://maps.app.goo.gl/w5YNXfrZtcXkWrx7A",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 170,
  images: [defaultVenue],
  name: "Cinnamon Restaurant",
  location: "Gorakhpur",
  address: "Shastri Chowk, Gorakhpur",
  capacity: "100-150",
  vegPrice: 700,
  nonVegPrice: 850,
  perPlate: 700,
  foodType: "both",
  rating: 4.8,
  manager: "Luv Kush Singh",
  contact: "9838435777",
  mapLink: "https://maps.app.goo.gl/ULmhj5y2DYRNxyvVA",
  budget: "₹1 Lakh – ₹3 Lakh"
},


{
  id: 171,
  images: [defaultVenue],
  name: "Kalash Marriage Hall",
  location: "Ayodhya",
  address: "Tarabganj Rd, Ayodhya",
  capacity: "1000",
  vegPrice: 1500,
  perPlate: 1500,
  foodType: "veg",
  rating: 4.7,
  manager: "S.B Tiwari",
  contact: "9565138021",
  mapLink: "https://maps.app.goo.gl/8mtcWcnSXhTxHtr87",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 172,
  images: [defaultVenue],
  name: "Zayn Garden Marriage Hall",
  location: "Aligarh",
  address: "Aligarh Bypass Rd",
  capacity: "1000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 3.8,
  manager: "Shekhar",
  contact: "9313974522",
  mapLink: "https://maps.app.goo.gl/D1wB3vsB7SU9TFRC9",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 173,
  images: [defaultVenue],
  name: "Raghunath Farm",
  location: "Aligarh",
  address: "GT Rd, Aligarh",
  capacity: "2000",
  vegPrice: 2000,
  perPlate: 2000,
  foodType: "both",
  rating: 3.9,
  manager: "Sanjay",
  contact: "9837040672",
  mapLink: "https://maps.app.goo.gl/WZtzCeNkBWAUTP9WA",
  budget: "₹12 Lakh+"
},

{
  id: 174,
  images: [defaultVenue],
  name: "Avadh Vatika",
  location: "Aligarh",
  address: "Harduaganj, Aligarh",
  capacity: "2000-3000",
  vegPrice: 1000,
  perPlate: 1000,
  foodType: "veg",
  rating: 4.0,
  manager: "Siddharth Mittal",
  contact: "9634362369",
  mapLink: "https://maps.app.goo.gl/9QsQbmiQsxs7wHqH9",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 175,
  images: [defaultVenue],
  name: "Awadh Greens",
  location: "Greater Noida",
  address: "Sector Alpha 1",
  capacity: "1500",
  vegPrice: 1250,
  nonVegPrice: 1700,
  perPlate: 1250,
  foodType: "both",
  rating: 4.2,
  manager: "Harish Sachdeva",
  contact: "9818117177",
  mapLink: "https://maps.app.goo.gl/wqyEnm5hr4m7LTzH6",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 176,
  images: [defaultVenue],
  name: "The Date Banquets",
  location: "Delhi",
  address: "Jhilmil Industrial Area",
  capacity: "150-800",
  vegPrice: 1500,
  perPlate: 1500,
  foodType: "veg",
  rating: 4.2,
  manager: "Deepak",
  contact: "9992222890",
  mapLink: "https://maps.app.goo.gl/cnJV8Ettvjkoi21b7",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 177,
  images: [defaultVenue],
  name: "Royal Orchid Garden",
  location: "Ghaziabad",
  address: "Sahibabad",
  capacity: "300",
  vegPrice: 1000,
  perPlate: 1000,
  foodType: "veg",
  rating: 3.8,
  manager: "Vivek Gupta",
  contact: "9910972962",
  mapLink: "",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 178,
  images: [defaultVenue],
  name: "MI Garden Lawn",
  location: "Ghaziabad",
  address: "Vasundhara",
  capacity: "1000",
  vegPrice: 1500,
  nonVegPrice: 2000,
  perPlate: 1500,
  foodType: "both",
  rating: 3.9,
  manager: "Arora",
  contact: "9810067543",
  mapLink: "",
  budget: "₹8 Lakh – ₹12 Lakh"
},

{
  id: 179,
  images: [defaultVenue],
  name: "Golden Heritage Lawn",
  location: "Ghaziabad",
  address: "Raj Bagh",
  capacity: "400",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.4,
  manager: "Rohit Chauhan",
  contact: "9990184100",
  mapLink: "",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 180,
  images: [defaultVenue],
  name: "Hotel Kailash Mansarovar",
  location: "Bareilly",
  address: "Pilibhit Bypass Rd",
  capacity: "1000-1200",
  vegPrice: 950,
  perPlate: 950,
  foodType: "veg",
  rating: 4.1,
  manager: "Prashant Gangwar",
  contact: "8445038902",
  mapLink: "https://maps.app.goo.gl/6ZpDaqNJtsfXQpbRA",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 181,
  images: [defaultVenue],
  name: "Shaadi Mahal",
  location: "Bareilly",
  address: "Bareilly",
  capacity: "2000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.4,
  manager: "Adir Khan",
  contact: "7017708729",
  mapLink: "",
  budget: "₹12 Lakh+"
},

{
  id: 182,
  images: [defaultVenue],
  name: "Moti Lawn",
  location: "Bareilly",
  address: "Qila Flyover",
  capacity: "250-350",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.0,
  manager: "Devendra",
  contact: "9897066693",
  mapLink: "",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 183,
  images: [defaultVenue],
  name: "Masumi Farm House",
  location: "Bareilly",
  address: "Pilibhit Rd",
  capacity: "2000-4000",
  vegPrice: 2000,
  perPlate: 2000,
  foodType: "veg",
  rating: 4.5,
  manager: "Manoj Dixit",
  contact: "9837027241",
  mapLink: "",
  budget: "₹12 Lakh+"
},

{
  id: 184,
  images: [defaultVenue],
  name: "Lavanya Resorts",
  location: "Bareilly",
  address: "Dohra Rd",
  capacity: "1000",
  vegPrice: 1200,
  perPlate: 1200,
  foodType: "veg",
  rating: 4.2,
  manager: "S.P Sharma",
  contact: "8077496700",
  mapLink: "",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 185,
  images: [defaultVenue],
  name: "Rawal Farm House",
  location: "Mathura",
  address: "Masani Rd",
  capacity: "500-1000",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 3.8,
  manager: "Prince Rawal",
  contact: "9675540605",
  mapLink: "",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 186,
  images: [defaultVenue],
  name: "The Royal Club",
  location: "Mathura",
  address: "Vrindavan",
  capacity: "100-300",
  vegPrice: 1200,
  perPlate: 1200,
  foodType: "veg",
  rating: 4.3,
  manager: "Adhik",
  contact: "9557356557",
  mapLink: "",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 187,
  images: [defaultVenue],
  name: "Somnath Marriage Dham",
  location: "Mathura",
  address: "Virzapur",
  capacity: "800",
  vegPrice: 450,
  perPlate: 450,
  foodType: "veg",
  rating: 3.7,
  manager: "Daultaram",
  contact: "6395267390",
  mapLink: "",
  budget: "₹1 Lakh – ₹3 Lakh"
},

{
  id: 188,
  images: [defaultVenue],
  name: "Basera Hotel & Banquet",
  location: "Mathura",
  address: "NH2 Bypass",
  capacity: "300",
  vegPrice: 1200,
  perPlate: 1200,
  foodType: "veg",
  rating: 3.8,
  manager: "",
  contact: "9412278120",
  mapLink: "",
  budget: "₹3 Lakh – ₹5 Lakh"
},

{
  id: 189,
  images: [defaultVenue],
  name: "Nandan Retreat",
  location: "Mathura",
  address: "Omaxe Eternity",
  capacity: "60-750",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.3,
  manager: "Subhash",
  contact: "9997650328",
  mapLink: "",
  budget: "₹5 Lakh – ₹8 Lakh"
},

{
  id: 190,
  images: [defaultVenue],
  name: "Shri Goverdhan Garden",
  location: "Mathura",
  address: "Bharatpur Rd",
  capacity: "1000+",
  vegPrice: null,
  perPlate: null,
  foodType: "both",
  rating: 4.1,
  manager: "Mohit Bansal",
  contact: "9897022100",
  mapLink: "",
  budget: "₹8 Lakh – ₹12 Lakh"
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

  // 🔥 PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 51; // 51 venues total, so 1 page

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { compareList, addToCompare, removeFromCompare } = useCompare();

  // 🔥 FILTER STATE
  const [filters, setFilters] = useState({
    city: "",
    capacity: "",
    budget: "",
    perPlate: "",
    foodType: "",
    rating: "",
  });

  // ✅ FILTER CHANGE → PAGE RESET
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // 🔥 ACTIVE FILTER COUNT
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter((value) => value !== "").length;
  }, [filters]);

  // 🔥 FILTER LOGIC (ONLY ONCE)
  const filteredVenues = useMemo(() => {
    return allVenues.filter((venue) => {

      if (filters.city && venue.location !== filters.city) return false;
      if (filters.foodType && venue.foodType !== filters.foodType) return false;

      if (filters.capacity) {
        const venueCap = venue.capacity || "";
        if (!venueCap.includes(filters.capacity.split("-")[0])) return false;
      }

      if (filters.budget && venue.budget !== filters.budget) return false;

      if (filters.perPlate) {
        const price = venue.perPlate || venue.vegPrice || 0;

        if (filters.perPlate === "Under ₹800" && price >= 800) return false;
        if (filters.perPlate === "₹800 – ₹1200" && (price < 800 || price > 1200)) return false;
        if (filters.perPlate === "₹1200 – ₹1800" && (price < 1200 || price > 1800)) return false;
        if (filters.perPlate === "₹1800 – ₹2500" && (price < 1800 || price > 2500)) return false;
        if (filters.perPlate === "₹2500+" && price < 2500) return false;
      }

      if (filters.rating && venue.rating < Number(filters.rating)) return false;

      return true;
    });
  }, [filters]);

  // 🔥 PAGINATION LOGIC
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentVenues = filteredVenues.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔥 IMAGE SLIDER
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

  // 🔥 TOGGLE FAVORITE
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
          {currentVenues.map((venue) => {
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
{/* ✅ PAGINATION */}
<div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="px-4 py-2 bg-gray-200 rounded-lg"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-2 rounded-lg ${
        currentPage === index + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="px-4 py-2 bg-gray-200 rounded-lg"
  >
    Next
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
