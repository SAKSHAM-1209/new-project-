import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Bookings",
    description: "Get discovered by thousands of couples looking for venues",
  },
  {
    icon: Users,
    title: "Qualified Leads",
    description: "Connect with serious customers ready to book",
  },
  {
    icon: Building2,
    title: "Premium Listing",
    description: "Showcase your venue with professional photos",
  },
];

const OwnerCTA = () => {
  return (
    <section className="section-padding bg-navy-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6">
              For Venue Owners
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Own a Banquet Hall?{" "}
              <span className="text-gold-gradient">
                Get More Bookings
              </span>
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              Join India's premier venue discovery platform and connect with thousands of couples looking for the perfect wedding venue. List your venue today and start receiving qualified enquiries.
            </p>

            <Link
              to="/contact"
              className="
    inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
    bg-[#E5B73B] text-black
    border border-[#E5B73B]
    transition-all duration-300 ease-out
    hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A]
    group
  "
            >
              List Your Banquet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex gap-5 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-foreground/70">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OwnerCTA;
