import { motion } from "framer-motion";
import { Search, GitCompare, Phone } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Venues",
    description:
      "Browse through 750+ verified venues. Filter by city, capacity, budget, and event type.",
  },
  {
    icon: GitCompare,
    title: "Compare & Shortlist",
    description:
      "View detailed photos, amenities, and pricing. Create your shortlist of favorite venues.",
  },
  {
    icon: Phone,
    title: "Contact Instantly",
    description:
      "Connect directly with venue managers via call or WhatsApp. Book your dream venue hassle-free.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-blue-700">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your perfect venue in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative bg-card rounded-3xl p-8 shadow-card hover:shadow-hover transition-all duration-500 text-center group border border-blue-100 hover:border-blue-400"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="font-bold text-white text-sm">
                  {index + 1}
                </span>
              </div>

              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <step.icon className="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
