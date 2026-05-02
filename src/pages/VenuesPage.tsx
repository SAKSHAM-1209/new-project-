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



import { getVenueImages, fallbackVenueImage } from "@/lib/venueImages";

const defaultVenue = fallbackVenueImage;

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
  reviews?: number | null;
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
    images: getVenueImages(1),
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
    images: getVenueImages(2),
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
    images: getVenueImages(3),
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
    images: getVenueImages(4),
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
    images: getVenueImages(5),
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
    images: getVenueImages(6),
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
    images: getVenueImages(7),
    name: "SR Banquet Hall",
    location: "Kanpur",
    address: "Brahmdev chauraha, Keshavpuram, Maswanpur, Kanpur, Uttar Pradesh 208019",
    capacity: "350",
    vegPrice: null,
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
    images: getVenueImages(8),
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
    images: getVenueImages(9),
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
    images: getVenueImages(10),
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
    images: getVenueImages(11),
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
    images: getVenueImages(12),
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
    images: getVenueImages(13),
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
    images: getVenueImages(14),
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
    images: getVenueImages(15),
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
    images: getVenueImages(16),
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
    images: getVenueImages(17),
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
    images: getVenueImages(18),
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
    images: getVenueImages(19),
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
    images: getVenueImages(20),
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
    images: getVenueImages(21),
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
    images: getVenueImages(22),
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
    images: getVenueImages(23),
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
    images: getVenueImages(24),
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
    images: getVenueImages(25),
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
    images: getVenueImages(26),
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
    images: getVenueImages(27),
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
    images: getVenueImages(28),
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
    images: getVenueImages(29),
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
    images: getVenueImages(30),
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
    images: getVenueImages(31),
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
    images: getVenueImages(32),
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
    images: getVenueImages(33),
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
    images: getVenueImages(34),
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
    images: getVenueImages(35),
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
    images: getVenueImages(36),
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
    images: getVenueImages(37),
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
    images: getVenueImages(38),
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
  images: getVenueImages(39),
  name: "The Shivlinn's (Corporate Guest House)",
  location: "Kanpur",
  address: "127/337, Patrachar Rd, opposite Kishori Vatika Gate, near PPM Hospital, W-1, Juhi Kalan, Saket Nagar, Kanpur, Uttar Pradesh 208014",
  capacity: "100-200",

  vegPrice: 1100,        // 🔥 sync with perPlate
  perPlate: 1100,

  foodType: "veg",
  manager: "Anushka",
  contact: "+91 8726126607",

  rating: 4.5,
  reviews: 109,

  mapLink: "https://www.google.com/maps/search/?api=1&query=The+Shivlinns+Corporate+Guest+House+Kanpur",

  budget: "₹3 Lakh – ₹5 Lakh"
},
  {
    id: 40,
    images: getVenueImages(40),
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
    images: getVenueImages(41),
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
    images: getVenueImages(42),
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
    images: getVenueImages(43),
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
    images: getVenueImages(44), // photos baad me add kar lena
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
    contact: "+91 8726126607",
    mapLink: "https://share.google/PCqVaNIJgmeeoVQpi",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 45,
    images: getVenueImages(45), // photos baad me add kar lena
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/17Cs68mzuUitJTCc6",
    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 46,
    images: getVenueImages(46),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/ymbaJs6GKayTkMJ66",

    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 47,
    images: getVenueImages(47),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/U95JhWMEW3i7XVia7",

    budget: "₹8 Lakh – ₹12 Lakh"
  },
  {
    id: 48,
    images: getVenueImages(48),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/vrpnsaNRj96Rg1jK8",

    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 49,
    images: getVenueImages(49),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/0PDBCLtEnAfsqXzRY",

    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 50,
    images: getVenueImages(50),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/0PDBCLtEnAfsqXzRY",

    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 51,
    images: getVenueImages(51),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/8RIf0RdWEPAQEKAFb",

    budget: "₹8 Lakh – ₹12 Lakh"
  },
  {
    id: 52,
    images: getVenueImages(52),
    name: "Muskan Palace (Unnao)",
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/6Gdh7c6ipnioFO7Bc",

    budget: "₹12 Lakh+"
  },
  {
    id: 53,
    images: getVenueImages(53),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/hy7rF8HP4wZeifURg",

    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 54,
    images: getVenueImages(54),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/0PDBCLtEnAfsqXzRY",

    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 55,
    images: getVenueImages(55),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/ek8KdkDgIKM3qFCTx",

    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 56,
    images: getVenueImages(56),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/thozsV3WtYcau0VrQ",

    budget: "₹12 Lakh+"
  },
  {
    id: 57,
    images: getVenueImages(57),
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
    id: 58,
    images: getVenueImages(58),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/gKcmaA4jJrXfqHEN8",

    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 59,
    images: getVenueImages(59),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/rS65quCRdcNvuLpC6",

    budget: "₹3 Lakh – ₹5 Lakh"
  },
  //LUCKNOW VENUES

  {
    id: 60,
    images: getVenueImages(60),
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
    contact: "+91 8726126607",

    mapLink: "https://share.google/pm94O0ZcLE0dkvY63",

    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 61,
    images: getVenueImages(61),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ujtSafSSYhtmbiiB6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 62,
    images: getVenueImages(62),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/EDMkEvR6DC64VBon6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 63,
    images: getVenueImages(63),
    name: "Brijwasi Lawn",
    location: "Lucknow",
    address: "Sector B, LDA Colony, Lucknow, Uttar Pradesh 226012",
    capacity: "100-400",
    foodType: "veg",
    vegPrice: 600,
    perPlate: 600,
    rating: 4.7,
    manager: "Ajay Kumar Piplani",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ntsmeXY3K39bxg587",
    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 64,
    images: getVenueImages(64),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/LurQpr9WKmxiWUTQ7",
    budget: "Under ₹1 Lakh"
  },
  {
    id: 65,
    images: getVenueImages(65),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/dcRHQZoN8dwrHXLSA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 66,
    images: getVenueImages(66),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/4AqFrvKqtMECpoTb6",

    budget: "₹8 Lakh – ₹12 Lakh"
  },
  {
    id: 67,
    images: getVenueImages(67),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/UNgVyaZaLUbZkvzU7",
    budget: "₹12 Lakh+"
  },
  {
    id: 68,
    images: getVenueImages(68),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/gVKfQizDfu4MWs7Y6",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 69,
    images: getVenueImages(69),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/twGKeMe9zwwuMvkC7",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 70,
    images: getVenueImages(70),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/H8sx4YwFRPFQCjJV7",
    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 71,
    images: getVenueImages(71),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/HCDWUgtViuzRNQzy6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 72,
    images: getVenueImages(72),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/cm3o9my7cLEwq1rV7",
    budget: "₹12 Lakh+"
  },
  {
    id: 73,
    images: getVenueImages(73),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/hasJs5bdJgSfpvia9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },
  {
    id: 74,
    images: getVenueImages(74),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/hYV5Kyg86W8brBAYA",
    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 75,
    images: getVenueImages(75),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/1tzygeaU55DrGXSb7",
    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 76,
    images: getVenueImages(76),
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
    contact: "+91 8726126607",

    mapLink: "https://maps.app.goo.gl/ESSTp7xrDtqm5oET8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },
  {
    id: 77,
    images: getVenueImages(77),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/4Zc4xG4TAnzbKQSZ7",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  // AGRA VENUES
  {
    id: 78,
    images: getVenueImages(78),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/kAQp1L84nhkYW6up8",
    budget: "₹1 Lakh – ₹3 Lakh"
  },
  {
    id: 79,
    images: getVenueImages(79),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/pA9HyLeWWNZTxGvJ6",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 80,
    images: getVenueImages(80),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/A3hqyEM62EZifgqh8",
    budget: "₹12 Lakh+"
  },
  {
    id: 81,
    images: getVenueImages(81),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/9yN2vAy2mLDPiu4h6",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 82,
    images: getVenueImages(82),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/j2PhFJiFTM4uDpr58",
    budget: "₹12 Lakh+"
  },

  {
    id: 83,
    images: getVenueImages(83),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/3ZgybQK8VJ3e1eCF7",
    budget: "₹12 Lakh+"
  },

  {
    id: 84,
    images: getVenueImages(84),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ZdE3bAY6VSCcDsVs6",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 85,
    images: getVenueImages(85),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/k6w6gZAHtkopXSxT8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 86,
    images: getVenueImages(86),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/r37sFXpUprHccV5H9",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 87,
    images: getVenueImages(87),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/oY9p46nqDayz4ZU6A",
    budget: "₹12 Lakh+"
  },

  {
    id: 88,
    images: getVenueImages(88),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/qCtyYKcpxYmmHRBe6",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 89,
    images: getVenueImages(89),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/39RvFetRwSfBMexM8",
    budget: "₹12 Lakh+"
  },

  {
    id: 90,
    images: getVenueImages(90),
    name: "Hotel Ayodhya Heritage",
    location: "Ayodhya",
    address: "Tedhi Bazar Rd, Ayodhya, Uttar Pradesh",
    capacity: "200",
    vegPrice: null,
    perPlate: null,
    foodType: "veg",
    rating: 4.6,
    manager: "Ritik",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ABBRdXXQiFqLV5GG6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 91,
    images: getVenueImages(91),
    name: "The Aura Restaurant",
    location: "Ayodhya",
    address: "Ram Path Rd, Ayodhya",
    capacity: "100",
    vegPrice: 800,
    perPlate: 800,
    foodType: "veg",
    rating: 4.3,
    manager: "Ravi Rana",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/mHYGDaPJwncVST3t7",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 92,
    images: getVenueImages(92),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/p43iFaLVaEaTNzdV8",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 93,
    images: getVenueImages(93),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/i65D5GKhHDSnJvUY7",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 94,
    images: getVenueImages(94),
    name: "Gulmohar Palace",
    location: "Ayodhya",
    address: "Darshan Nagar, Ayodhya",
    capacity: "1000",
    vegPrice: 550,
    perPlate: 550,
    foodType: "veg",
    rating: 4.3,
    manager: "Sanjay Singh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/p6762yXWLacudXNV8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 95,
    images: getVenueImages(95),
    name: "Raghav Ji Sarkar",
    location: "Ayodhya",
    address: "Makha Pur, Ayodhya",
    capacity: "2000",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 3.9,
    manager: "Abhishek",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/HsqPAemEKryrChTb8",
    budget: "₹12 Lakh+"
  },

  {
    id: 96,
    images: getVenueImages(96),
    name: "Avadh Samrat Resort",
    location: "Ayodhya",
    address: "Ayodhya",
    capacity: "200-1000",
    vegPrice: 2000,
    perPlate: 2000,
    foodType: "veg",
    rating: 4.5,
    manager: "Sanjay Singh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/pfRweptDmjLeoQHb8",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 97,
    images: getVenueImages(97),
    name: "Hotel Rising Banquet",
    location: "Ayodhya",
    address: "NH 27, Ayodhya",
    capacity: "2000-5000",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.8,
    manager: "Ramesh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/CpR5aBrc6881K5zw8",
    budget: "₹12 Lakh+"
  },

  {
    id: 98,
    images: getVenueImages(98),
    name: "Ambuj Restaurant & Banquet",
    location: "Ayodhya",
    address: "Near Cantt Station, Ayodhya",
    capacity: "100",
    vegPrice: 550,
    perPlate: 550,
    foodType: "veg",
    rating: 4.5,
    manager: "Sikandar",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/Eg1wHzDDA3VJHFRk9",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 99,
    images: getVenueImages(99),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/mSjCDHbwE7LrKhCq8",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 100,
    images: getVenueImages(100),
    name: "Sgt Plaza Banquet",
    location: "Varanasi",
    address: "Sarnath, Varanasi",
    capacity: "80-300",
    vegPrice: 1300,
    perPlate: 1300,
    foodType: "both",
    rating: 4.0,
    manager: "Vinay Srivastava",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/c5YWMqySWrAwL4uG8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 101,
    images: getVenueImages(101),
    name: "Rhythm Banquet Hall",
    location: "Varanasi",
    address: "JHV Mall, Varanasi",
    capacity: "150-200",
    vegPrice: 800,
    perPlate: 800,
    foodType: "veg",
    rating: 4.9,
    manager: "Akshay Mishra",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/Cu8zaLAEV2MQZBQZ9",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 102,
    images: getVenueImages(102),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ov8qWzjYpfczSpVXA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 103,
    images: getVenueImages(103),
    name: "Shiv Kashi Palace",
    location: "Varanasi",
    address: "Bada Lalpur, Varanasi",
    capacity: "200",
    vegPrice: 1000,
    perPlate: 1000,
    foodType: "veg",
    rating: 4.7,
    manager: "Adarsh Singh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/vq14iFMoTyL5ugCm7",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 104,
    images: getVenueImages(104),
    name: "City Garden Lawn",
    location: "Varanasi",
    address: "GT Road, Varanasi",
    capacity: "1000",
    vegPrice: 950,
    perPlate: 950,
    foodType: "veg",
    rating: 4.8,
    manager: "Ayaz Ansari",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/XRKAfxYyAzSUo3Xw6",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 105,
    images: getVenueImages(105),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/CrFESHAGg9K9rH2WA",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 106,
    images: getVenueImages(106),
    name: "Shivaalik Hotel & Lawn",
    location: "Varanasi",
    address: "Kandwa, Varanasi",
    capacity: "300-600",
    vegPrice: 1500,
    perPlate: 1500,
    foodType: "veg",
    rating: 4.3,
    manager: "Rakesh Singh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/339Pms1kf2GMCjNXA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 107,
    images: getVenueImages(107),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/cwfZvXcvBbf1sEnUA",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 108,
    images: getVenueImages(108),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/RR6FjWQxPyChGFBSA",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 109,
    images: getVenueImages(109),
    name: "Hotel Sahu Inn",
    location: "Varanasi",
    address: "Darshan Nagar Rd, Varanasi",
    capacity: "",
    vegPrice: 400,
    perPlate: 400,
    foodType: "veg",
    rating: 4.5,
    manager: "Gautam Sahu",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/FXMFWwjnSgU1qZF29",
    budget: "₹1 Lakh – ₹3 Lakh"
  },


  {
    id: 110,
    images: getVenueImages(110),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/2wZzu9ExdYxQdUYi7",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 111,
    images: getVenueImages(111),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/Eyktxj78Fo7Z72mSA",
    budget: "₹12 Lakh+"
  },

  {
    id: 112,
    images: getVenueImages(112),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/i5XBnX9hBW96ks8m8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 113,
    images: getVenueImages(113),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/m6Hn8rkDYQ3Et1PH6",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 114,
    images: getVenueImages(114),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/GMs6v2vAGTvg5M8B8",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 115,
    images: getVenueImages(115),
    name: "Divine Banquet",
    location: "Noida",
    address: "Sector 63, Noida",
    capacity: "120",
    vegPrice: 900,
    perPlate: 900,
    foodType: "veg",
    rating: 5.0,
    manager: "Rohit Rajput",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/yEPGvzNa6GpT19Ci7",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 116,
    images: getVenueImages(116),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/pnaRYiNddtKxhtBY8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 117,
    images: getVenueImages(117),
    name: "Wedding Crown",
    location: "Noida",
    address: "Sector 74, Noida",
    capacity: "50-1500",
    vegPrice: 1600,
    perPlate: 1600,
    foodType: "veg",
    rating: 4.4,
    manager: "Rajiv Gautam",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/JidLBEUXzethp3ci9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 118,
    images: getVenueImages(118),
    name: "Wedding Villa",
    location: "Noida",
    address: "Sector 51, Noida",
    capacity: "1000",
    vegPrice: 3000,
    perPlate: 3000,
    foodType: "veg",
    rating: 4.5,
    manager: "Ashwani Sharma",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/3Xai6x1gmbKneNo79",
    budget: "₹12 Lakh+"
  },

  {
    id: 119,
    images: getVenueImages(119),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/XWhmU1C92TkkvNZSA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 120,
    images: getVenueImages(120),
    name: "The Roman Palace Banquet",
    location: "Noida",
    address: "Sector 121, Noida",
    capacity: "600",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.7,
    manager: "Gopal Dikshit",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/m3jb1AxYSZXyxMie6",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 121,
    images: getVenueImages(121),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/9aRaDReykbDHQkiY9",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 122,
    images: getVenueImages(122),
    name: "Le Season Park",
    location: "Noida",
    address: "Greater Noida",
    capacity: "250",
    vegPrice: 4000,
    perPlate: 4000,
    foodType: "veg",
    rating: 4.5,
    manager: "Laksh Bhardwaj",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/iZfJGEddwjfJFkLz7",
    budget: "₹12 Lakh+"
  },

  {
    id: 123,
    images: getVenueImages(123),
    name: "RS Farmhouse Party Lawn",
    location: "Noida",
    address: "Noida Extension",
    capacity: "500",

    vegPrice: 1000,
    perPlate: 1000,

    foodType: "veg",
    rating: 4.2,

    manager: "N/A",
    contact: "+91 8726126607",

    mapLink: "https://www.google.com/maps/search/?api=1&query=RS+Farmhouse+Party+Lawn+Noida+Extension",

    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 124,
    images: getVenueImages(124),
    name: "The Golden Rose Banquet",
    location: "Noida",
    address: "Greater Noida West",
    capacity: "1500",
    vegPrice: 1200,
    perPlate: 1200,
    foodType: "veg",
    rating: 5.0,
    manager: "Manish",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/hKc1oJVuhks8WhDo9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },


  {
    id: 125,
    images: getVenueImages(125),
    name: "Rudrakshaa Banquet",
    location: "Ghaziabad",
    address: "Vaishali, Ghaziabad",
    capacity: "2000",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.3,
    manager: "H.S Kotwal",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/BWLk5FHGZoXno96s5",
    budget: "₹12 Lakh+"
  },

  {
    id: 126,
    images: getVenueImages(126),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/YBvJi2nZLiejWzu86",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 127,
    images: getVenueImages(127),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/guunXh1qBNYEJmSt6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 128,
    images: getVenueImages(128),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/zfCzs8Sxd1jpBNNr6",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 129,
    images: getVenueImages(129),
    name: "The Terrace Lounge",
    location: "Ghaziabad",
    address: "Vaishali, Ghaziabad",
    capacity: "350-400",
    vegPrice: 1200,
    perPlate: 1200,
    foodType: "veg",
    rating: 4.5,
    manager: "Rohit",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/vgP3n5tezc3FmfHg6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 130,
    images: getVenueImages(130),
    name: "Golden River Banquet",
    location: "Ghaziabad",
    address: "Indirapuram, Ghaziabad",
    capacity: "300",
    vegPrice: 1000,
    perPlate: 1000,
    foodType: "veg",
    rating: 4.0,
    manager: "Ashish",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/kJLfkFw8iGmGeFLH6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 131,
    images: getVenueImages(131),
    name: "Meal Tree Restaurant",
    location: "Ghaziabad",
    address: "Raj Nagar Extension, Ghaziabad",
    capacity: "125-250",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 3.1,
    manager: "",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ev1qn2tgaTPoPqiL8",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 132,
    images: getVenueImages(132),
    name: "Ambrosia Palace",
    location: "Ghaziabad",
    address: "Vaishali, Ghaziabad",
    capacity: "100-700",
    vegPrice: 2200,
    perPlate: 2200,
    foodType: "veg",
    rating: 4.5,
    manager: "Rakesh Singh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/vH5uaeYnvonUCV8s8",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 133,
    images: getVenueImages(133),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/74H3sAn5Ki143H5AA",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 134,
    images: getVenueImages(134),
    name: "The Roseman Hotel",
    location: "Ghaziabad",
    address: "Vaishali, Ghaziabad",
    capacity: "140+",
    vegPrice: 1100,
    perPlate: 1100,
    foodType: "veg",
    rating: 4.8,
    manager: "Raj",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/EwW5xxo5xRyXeU616",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 135,
    images: getVenueImages(135),
    name: "The Crystal Farm",
    location: "Ghaziabad",
    address: "NH-24, Ghaziabad",
    capacity: "1000-1500",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 3.9,
    manager: "Manoj Sharma",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/PqhauXU64gcmqauw7",
    budget: "₹12 Lakh+"
  },

  {
    id: 136,
    images: getVenueImages(136),
    name: "Volga Palace",
    location: "Ghaziabad",
    address: "Nehru Nagar, Ghaziabad",
    capacity: "1000",
    vegPrice: 1600,
    perPlate: 1600,
    foodType: "veg",
    rating: 4.0,
    manager: "Pushpak Chaudhary",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/dzV2sDfdzfCKDyK1A",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 137,
    images: getVenueImages(137),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/U7Esba1o5A9DGjun9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 138,
    images: getVenueImages(138),
    name: "Golden Heritage Banquet",
    location: "Ghaziabad",
    address: "Raj Bagh, Ghaziabad",
    capacity: "400",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.4,
    manager: "Rohit Chauhan",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ntK7g4B1Bm4e3NeN7",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 139,
    images: getVenueImages(139),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/2XTvJeFiLC8LZkr97",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 140,
    images: getVenueImages(140),
    name: "Ganpati Farmhouse",
    location: "Ghaziabad",
    address: "Shastri Nagar, Ghaziabad",
    capacity: "200-600",
    vegPrice: 1200,
    perPlate: 1200,
    foodType: "veg",
    rating: 3.9,
    manager: "",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/6PQqUAkrJVQy1dEy5",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 141,
    images: getVenueImages(141),
    name: "Hotel Maiden Residency",
    location: "Ghaziabad",
    address: "Pandav Nagar, Ghaziabad",
    capacity: "500",
    vegPrice: 1250,
    perPlate: 1250,
    foodType: "veg",
    rating: 3.9,
    manager: "Sarvottam",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/Kx2TvRpBzYe3L4kU9",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 142,
    images: getVenueImages(142),
    name: "Vintage Banquet",
    location: "Ghaziabad",
    address: "Vasundhara, Ghaziabad",
    capacity: "600",
    vegPrice: null,
    perPlate: null,
    foodType: "veg",
    rating: 4.3,
    manager: "Devesh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/sDKVMVmp2FUtXp2E8",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 143,
    images: getVenueImages(143),
    name: "Royal Orchid Lawn",
    location: "Ghaziabad",
    address: "Ghaziabad",
    capacity: "300",
    vegPrice: 1000,
    perPlate: 1000,
    foodType: "veg",
    rating: 3.7,
    manager: "Vivek Gupta",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/guunXh1qBNYEJmSt6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 144,
    images: getVenueImages(144),
    name: "The Golden Rose Lawn",
    location: "Ghaziabad",
    address: "Greater Noida West",
    capacity: "1500",
    vegPrice: 1200,
    perPlate: 1200,
    foodType: "veg",
    rating: 5.0,
    manager: "Manish",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/hKc1oJVuhks8WhDo9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },


  {
    id: 145,
    images: getVenueImages(145),
    name: "Ravi Banquet Hall",
    location: "Gorakhpur",
    address: "Nausar, Gorakhpur",
    capacity: "50-300",
    vegPrice: 800,
    perPlate: 800,
    foodType: "veg",
    rating: 5.0,
    manager: "Tripurari",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/TUtBui6VThnsZC7A9",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 146,
    images: getVenueImages(146),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/sAxniY2mUuxzZjgv7",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 147,
    images: getVenueImages(147),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/hP1kNXE1nUunvQgS7",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 148,
    images: getVenueImages(148),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/j74FNoJbJYnfF82J8",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 149,
    images: getVenueImages(149),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/wMe84WtryeoVjjss8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 150,
    images: getVenueImages(150),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/JDuqRW4fYb4Ajgoa6",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 151,
    images: getVenueImages(151),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/NWUAGXbYqs2k53fw8",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 152,
    images: getVenueImages(152),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/jGY9azxEvTaBCeL4A",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 153,
    images: getVenueImages(153),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/UFBqQ2ZVHL7dUTZX7",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 154,
    images: getVenueImages(154),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/P9Fj2y6ZkVvVtNic6",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 155,
    images: getVenueImages(155),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/RJEdQsebUBD4DEHt6",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 156,
    images: getVenueImages(156),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/cgEaWG4tZG9s6xuAA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 157,
    images: getVenueImages(157),
    name: "Ramayana Banquet",
    location: "Gorakhpur",
    address: "Gorakhnath, Gorakhpur",
    capacity: "600-700",
    vegPrice: 1000,
    perPlate: 1000,
    foodType: "veg",
    rating: 4.3,
    manager: "Nand",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/F7KWPRVBNZVQggPB7",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 158,
    images: getVenueImages(158),
    name: "Cassia Restaurant & Banquet",
    location: "Gorakhpur",
    address: "Gorakhpur",
    capacity: "100",
    vegPrice: 700,
    perPlate: 700,
    foodType: "both",
    rating: 4.4,
    manager: "",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/F5pkFads4zTwdrk39",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 159,
    images: getVenueImages(159),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/Kv51PmdmZCa3ueGG7",
    budget: "₹12 Lakh+"
  },

  {
    id: 160,
    images: getVenueImages(160),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/m1txHJN3tDABqMxR9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 161,
    images: getVenueImages(161),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ePYt3qXiBZPU6QW39",
    budget: "₹12 Lakh+"
  },

  {
    id: 162,
    images: getVenueImages(162),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/WpcekrrEkHQqMVzk8",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 163,
    images: getVenueImages(163),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/GtetA1yZH7MMfJkY9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 164,
    images: getVenueImages(164),
    name: "The Garg Banquet",
    location: "Gorakhpur",
    address: "Diwan Bazar, Gorakhpur",
    capacity: "3000",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.3,
    manager: "Mahesh",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/vQnpJYaAnN1kiXDk7",
    budget: "₹12 Lakh+"
  },

  {
    id: 165,
    images: getVenueImages(165),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/4wSRVtzH1FjxSAEU9",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 166,
    images: getVenueImages(166),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/yBzkwMVth9Uz3qwo8",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 167,
    images: getVenueImages(167),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/hLyJLbBQZ7CHv5w58",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 168,
    images: getVenueImages(168),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/w5YNXfrZtcXkWrx7A",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 169,
    images: getVenueImages(169),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/ULmhj5y2DYRNxyvVA",
    budget: "₹1 Lakh – ₹3 Lakh"
  },


  {
    id: 170,
    images: getVenueImages(170),
    name: "Kalash Marriage Hall",
    location: "Ayodhya",
    address: "Tarabganj Rd, Ayodhya",
    capacity: "1000",
    vegPrice: 1500,
    perPlate: 1500,
    foodType: "veg",
    rating: 4.7,
    manager: "S.B Tiwari",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/8mtcWcnSXhTxHtr87",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 171,
    images: getVenueImages(171),
    name: "Zayn Garden Marriage Hall",
    location: "Aligarh",
    address: "Aligarh Bypass Rd",
    capacity: "1000",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 3.8,
    manager: "Shekhar",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/D1wB3vsB7SU9TFRC9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 172,
    images: getVenueImages(172),
    name: "Raghunath Farm",
    location: "Aligarh",
    address: "GT Rd, Aligarh",
    capacity: "2000",
    vegPrice: 2000,
    perPlate: 2000,
    foodType: "both",
    rating: 3.9,
    manager: "Sanjay",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/WZtzCeNkBWAUTP9WA",
    budget: "₹12 Lakh+"
  },

  {
    id: 173,
    images: getVenueImages(173),
    name: "Avadh Vatika",
    location: "Aligarh",
    address: "Harduaganj, Aligarh",
    capacity: "2000-3000",
    vegPrice: 1000,
    perPlate: 1000,
    foodType: "veg",
    rating: 4.0,
    manager: "Siddharth Mittal",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/9QsQbmiQsxs7wHqH9",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 174,
    images: getVenueImages(174),
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
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/wqyEnm5hr4m7LTzH6",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 175,
    images: getVenueImages(175),
    name: "The Date Banquets",
    location: "Delhi",
    address: "Jhilmil Industrial Area",
    capacity: "150-800",
    vegPrice: 1500,
    perPlate: 1500,
    foodType: "veg",
    rating: 4.2,
    manager: "Deepak",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/cnJV8Ettvjkoi21b7",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 176,
    images: getVenueImages(176),
    name: "Royal Orchid Garden",
    location: "Ghaziabad",
    address: "Sahibabad",
    capacity: "300",
    vegPrice: 1000,
    perPlate: 1000,
    foodType: "veg",
    rating: 3.8,
    manager: "Vivek Gupta",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Royal+Orchid+Garden+Ghaziabad",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 177,
    images: getVenueImages(177),
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
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=MI+Garden+Lawn+Ghaziabad",
    budget: "₹8 Lakh – ₹12 Lakh"
  },

  {
    id: 178, // 🔥 FIXED duplicate ID
    images: getVenueImages(178),
    name: "Golden Heritage Lawn",
    location: "Ghaziabad",
    address: "Raj Bagh",
    capacity: "400",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.4,
    manager: "Rohit Chauhan",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Golden+Heritage+Lawn+Ghaziabad",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 179,
    images: getVenueImages(179),
    name: "Hotel Kailash Mansarovar",
    location: "Bareilly",
    address: "Pilibhit Bypass Rd",
    capacity: "1000-1200",
    vegPrice: 950,
    perPlate: 950,
    foodType: "veg",
    rating: 4.1,
    manager: "Prashant Gangwar",
    contact: "+91 8726126607",
    mapLink: "https://maps.app.goo.gl/6ZpDaqNJtsfXQpbRA",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 180,
    images: getVenueImages(180),
    name: "Shaadi Mahal",
    location: "Bareilly",
    address: "Bareilly",
    capacity: "2000",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.4,
    manager: "Adir Khan",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Shaadi+Mahal+Bareilly",
    budget: "₹12 Lakh+"
  },

  {
    id: 181,
    images: getVenueImages(181),
    name: "Moti Lawn",
    location: "Bareilly",
    address: "Qila Flyover",
    capacity: "250-350",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.0,
    manager: "Devendra",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Moti+Lawn+Bareilly",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 182,
    images: getVenueImages(182),
    name: "Masumi Farm House",
    location: "Bareilly",
    address: "Pilibhit Rd",
    capacity: "2000-4000",
    vegPrice: 2000,
    perPlate: 2000,
    foodType: "veg",
    rating: 4.5,
    manager: "Manoj Dixit",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Masumi+Farm+House+Bareilly",
    budget: "₹12 Lakh+"
  },

  {
    id: 183,
    images: getVenueImages(183),
    name: "Lavanya Resorts",
    location: "Bareilly",
    address: "Dohra Rd",
    capacity: "1000",
    vegPrice: 1200,
    perPlate: 1200,
    foodType: "veg",
    rating: 4.2,
    manager: "S.P Sharma",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Lavanya+Resorts+Bareilly",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 184,
    images: getVenueImages(184),
    name: "Rawal Farm House",
    location: "Mathura",
    address: "Masani Rd",
    capacity: "500-1000",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 3.8,
    manager: "Prince Rawal",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Rawal+Farm+House+Mathura",
    budget: "₹5 Lakh – ₹8 Lakh"
  },

  {
    id: 185,
    images: getVenueImages(185),
    name: "The Royal Club",
    location: "Mathura",
    address: "Vrindavan",
    capacity: "100-300",
    vegPrice: 1200,
    perPlate: 1200,
    foodType: "veg",
    rating: 4.3,
    manager: "Adhik",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Royal+Club+Mathura",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 186,
    images: getVenueImages(186),
    name: "Somnath Marriage Dham",
    location: "Mathura",
    address: "Virzapur",
    capacity: "800",
    vegPrice: 450,
    perPlate: 450,
    foodType: "veg",
    rating: 3.7,
    manager: "Daultaram",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Somnath+Marriage+Dham+Mathura",
    budget: "₹1 Lakh – ₹3 Lakh"
  },

  {
    id: 187, // 🔥 FIXED duplicate ID
    images: getVenueImages(187),
    name: "Basera Hotel & Banquet",
    location: "Mathura",
    address: "NH2 Bypass",
    capacity: "300",
    vegPrice: 1200,
    perPlate: 1200,
    foodType: "veg",
    rating: 3.8,
    manager: "",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Basera+Hotel+Mathura",
    budget: "₹3 Lakh – ₹5 Lakh"
  },

  {
    id: 188,
    images: getVenueImages(188),
    name: "Nandan Retreat",
    location: "Mathura",
    address: "Omaxe Eternity",
    capacity: "60-750",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.3,
    manager: "Subhash",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Nandan+Retreat+Mathura",
    budget: "₹5 Lakh – ₹8 Lakh"
  },
  {
    id: 189,
    images: getVenueImages(189),
    name: "Shri Goverdhan Garden",
    location: "Mathura",
    address: "Bharatpur Rd",
    capacity: "1000+",
    vegPrice: null,
    perPlate: null,
    foodType: "both",
    rating: 4.1,
    manager: "Mohit Bansal",
    contact: "+91 8726126607",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Shri+Goverdhan+Garden",
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
  // 🔥 FINAL FILTER LOGIC (PRODUCTION READY)
  const filteredVenues = useMemo(() => {
    return allVenues.filter((venue) => {

      // ✅ CITY (case-insensitive + trim)
      if (
        filters.city &&
        venue.location?.toLowerCase().trim() !== filters.city.toLowerCase().trim()
      ) return false;

      // ✅ FOOD TYPE (both support)
      if (
        filters.foodType &&
        venue.foodType !== filters.foodType &&
        venue.foodType !== "both"
      ) return false;

      // ✅ CAPACITY (safe check)
      if (filters.capacity) {
        const venueCap = venue.capacity || "";
        const selectedCap = filters.capacity.split("-")[0];
        if (!venueCap.includes(selectedCap)) return false;
      }

      // ✅ BUDGET
      if (
        filters.budget &&
        venue.budget !== filters.budget
      ) return false;

      // ✅ PRICE FILTER (FULL FIX 🔥)
      if (filters.perPlate) {

        // 👉 best price pick
        const price =
          venue.perPlate ??
          venue.vegPrice ??
          venue.nonVegPrice ??
          null;

        // ❌ no price → skip
        if (price === null) return false;

        if (filters.perPlate === "Under ₹800" && price >= 800) return false;

        if (filters.perPlate === "₹800 – ₹1200" && (price < 800 || price > 1200)) return false;

        if (filters.perPlate === "₹1200 – ₹1800" && (price < 1200 || price > 1800)) return false;

        if (filters.perPlate === "₹1800 – ₹2500" && (price < 1800 || price > 2500)) return false;

        if (filters.perPlate === "₹2500+" && price < 2500) return false;
      }

      // ✅ RATING
      if (
        filters.rating &&
        venue.rating < Number(filters.rating)
      ) return false;

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
          const imageCount = Math.max(1, v.images?.length ?? 1);
          updated[v.id] = ((updated[v.id] || 0) + 1) % imageCount;
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
        image: venue.images?.[0] || fallbackVenueImage,
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
        image: venue.images?.[0] || fallbackVenueImage,

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
                    {(() => {
                      const imageIndex = currentImage[venue.id] ?? 0;
                      const imageSrc = venue.images?.[imageIndex] || fallbackVenueImage;
                      return (
                        <motion.img
                          key={imageIndex}
                          src={imageSrc}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0.5, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.5, scale: 0.98 }}
                          transition={{ duration: 0.6 }}
                        />
                      );
                    })()}
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
              className={`px-4 py-2 rounded-lg ${currentPage === index + 1
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
