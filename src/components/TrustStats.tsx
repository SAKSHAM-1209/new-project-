import { motion } from "framer-motion";
import { Building2, MapPin, Heart } from "lucide-react";

const stats = [
  {
    icon: Building2,
    number: "750+",
    label: "Verified Venues",
    description: "Handpicked premium banquet halls",
  },
  {
    icon: MapPin,
    number: "15+",
    label: "Cities",
    description: "Across India's major cities",
  },
  {
  icon: Heart,
  number: "Our Target",
  label: "10K+ Happy Guests",
  description:
    "We aim to deliver luxury celebrations and unforgettable experiences for every event",
},
];

const TrustStats = () => {
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
            Trusted for{" "}
            <span className="text-blue-600">Unforgettable Events</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover premium venues for weddings, parties, corporate events and
            every celebration that matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-3xl p-8 text-center shadow-card hover:shadow-hover transition-all duration-500 group"
            >
              {/* ROYAL BLUE ICON BOX */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </h3>

              <p className="font-semibold text-foreground mb-2">
                {stat.label}
              </p>

              <p className="text-muted-foreground text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;