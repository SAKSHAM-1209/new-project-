import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock,
  IndianRupee,
  Headphones,
  ShieldCheck,
  Star,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Venues Only",
    description:
      "Every venue on our platform is personally verified. We visit, inspect, and ensure quality before listing.",
  },
  {
    icon: IndianRupee,
    title: "Best Price Guarantee",
    description:
      "Get the best deals directly from venue owners. No hidden charges, no middlemen fees.",
  },
  {
    icon: Clock,
    title: "Save Time & Effort",
    description:
      "Compare multiple venues side-by-side. Filter by location, capacity, budget, and amenities instantly.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Our venue experts are available 7 days a week to help you find and book your perfect venue.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Book with confidence. All venues are verified and we help mediate any booking concerns.",
  },
  {
    icon: Star,
    title: "Our Target",
    description:
      "Our goal is to become India’s most trusted banquet platform by delivering premium venues and unforgettable experiences.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-background">
      <div className="container-premium px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="inline-block text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
            Why Us
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-snug">
            Why Choose <span className="text-blue-600">Find My Banquet?</span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            We're committed to making your venue search effortless and your
            celebration unforgettable.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-card hover:shadow-hover transition-all duration-500 border border-transparent hover:border-blue-600/20 overflow-hidden flex flex-col justify-center h-full text-center sm:text-left"
            >
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 rounded-2xl bg-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom Line */}
              <div className="mt-6 w-full h-[2px] bg-blue-600/10 group-hover:bg-blue-600/30 transition-all duration-300 rounded-full" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;