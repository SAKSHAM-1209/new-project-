import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Award,
  Heart,
  Target,
  Sparkles,
  Quote,
  Crown,
} from "lucide-react";

/* Founder Images */
import founderImg from "../assets/founder.jpg";
import coFounderImg from "../assets/co-founder.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-muted via-background to-background px-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-[300px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20">
              <Sparkles className="w-4 h-4" /> About Us
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 sm:mb-7 leading-tight">
              Your Trusted Partner for{" "}
              <span className="text-blue-600">Dream Celebrations</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0">
              Find My Banquet helps you discover premium wedding venues, banquet
              halls and event spaces across India — with verified details, real
              photos and transparent pricing.
            </p>

            {/* Quote Premium */}
            <div className="mt-8 sm:mt-10 bg-card/70 backdrop-blur-xl border border-border rounded-2xl p-5 sm:p-6 shadow-card max-w-2xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50" />
              <Quote className="w-6 h-6 text-blue-600 absolute -top-3 left-6 bg-background rounded-full p-1 shadow" />
              <p className="text-muted-foreground text-sm sm:text-base italic leading-relaxed relative z-10">
                “A venue is not just a place — it’s where memories are created,
                smiles are shared, and celebrations become forever.”
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS (UPDATED WITH TARGET STYLE) */}
      <section className="py-12 sm:py-14 bg-card border-y border-border px-4">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "750+", label: "Verified Venues", icon: Shield },
              { value: "20+", label: "Cities Covered", icon: Users },
              { value: "100%", label: "Trusted Listings", icon: Award },
              { value: "India #1", label: "Our Target", icon: Target },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center bg-background rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>

                <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>

                <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-14 sm:py-20 md:py-24 px-4">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
                Our Story
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 sm:mb-6 leading-tight">
                Built to Make Venue Discovery Simple & Premium
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  Planning a wedding or event can be stressful. We created{" "}
                  <span className="font-semibold text-foreground">
                    Find My Banquet
                  </span>{" "}
                  to make venue discovery easy, fast and trustworthy.
                </p>

                <p>
                  Every venue is verified with real photos, clear pricing and
                  genuine details so you can book confidently without any
                  surprises.
                </p>

                <p>
                  Our mission is to build India’s most trusted banquet platform
                  with premium venues, premium service, and premium experience.
                </p>
              </div>
            </motion.div>

            {/* FEATURES */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {[
                {
                  icon: Shield,
                  title: "Verified Venues",
                  desc: "Real listings with genuine details",
                },
                {
                  icon: Heart,
                  title: "Customer First",
                  desc: "Your celebration is our priority",
                },
                {
                  icon: Target,
                  title: "Best Deals",
                  desc: "Direct pricing from venue owners",
                },
                {
                  icon: Sparkles,
                  title: "Premium Experience",
                  desc: "Only top venues with premium service",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-blue-400/50 hover:shadow-card transition-all duration-300 text-center sm:text-left relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4 mx-auto sm:mx-0 relative z-10">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>

                  <h3 className="font-semibold text-foreground mb-1 relative z-10">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground relative z-10">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

 {/* FOUNDERS SECTION (UPDATED PREMIUM) */}
<section className="py-16 sm:py-24 bg-gradient-to-b from-muted via-background to-background px-4">
  <div className="container-premium">
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4 px-5 py-2 rounded-full bg-blue-600/10 border border-blue-600/20">
        <Sparkles className="w-4 h-4" />
        Our Leadership
      </span>

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
        Meet The <span className="text-blue-600">Founders</span>
      </h2>

      <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mt-4 leading-relaxed">
        The people behind Find My Banquet who are building India’s most trusted
        and premium banquet discovery platform.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Founder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card border border-border rounded-[2.5rem] p-8 shadow-card hover:shadow-hover transition-all duration-500 group relative overflow-hidden"
      >
        {/* Premium Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col sm:flex-row gap-7 items-center sm:items-start relative z-10">
          {/* Bigger Image */}
          <div className="relative">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-[6px] border-blue-600/25 shadow-xl bg-muted flex items-center justify-center">
              <img
                src={founderImg}
                alt="Founder"
                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Premium Ring */}
            <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/20" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">
              Aastik Sri Krishna Pandey
            </h3>

            <p className="text-blue-600 font-semibold text-sm sm:text-base mt-1">
              Founder & CEO
            </p>

            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
              Leading the vision of Find My Banquet with a mission to deliver
              verified venues, transparent pricing and a premium booking
              experience across India.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 bg-muted rounded-3xl p-6 border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-60" />
          <Quote className="w-6 h-6 text-blue-600 absolute -top-3 left-6 bg-card rounded-full p-1 shadow" />
          <p className="text-muted-foreground italic text-sm sm:text-base leading-relaxed relative z-10">
            “We built Find My Banquet to make venue discovery simple, trusted
            and premium for every celebration.”
          </p>
        </div>
      </motion.div>

      {/* Co-Founder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-card border border-border rounded-[2.5rem] p-8 shadow-card hover:shadow-hover transition-all duration-500 group relative overflow-hidden"
      >
        {/* Premium Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col sm:flex-row gap-7 items-center sm:items-start relative z-10">
          {/* Bigger Image */}
          <div className="relative">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-[6px] border-blue-600/25 shadow-xl bg-muted flex items-center justify-center">
              <img
                src={coFounderImg}
                alt="Co-Founder"
                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Premium Ring */}
            <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/20" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">
              Himanshu Gupta
            </h3>

            <p className="text-blue-600 font-semibold text-sm sm:text-base mt-1">
              
              Founder & Operations Head
            </p>

            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
              Managing operations and ensuring every user gets verified venue
              details, fast responses and a smooth booking journey.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 bg-muted rounded-3xl p-6 border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-60" />
          <Quote className="w-6 h-6 text-blue-600 absolute -top-3 left-6 bg-card rounded-full p-1 shadow" />
          <p className="text-muted-foreground italic text-sm sm:text-base leading-relaxed relative z-10">
            “Our goal is to make booking transparent, easy and premium — so your
            celebration starts stress-free.”
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* VALUES */}
      <section className="py-14 sm:py-20 md:py-24 px-4">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="inline-block text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
              Our Values
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Makes Us <span className="text-blue-600">Different</span>
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
              We focus on trust, quality and customer satisfaction to deliver
              the best venue discovery experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: "Trust & Transparency",
                description:
                  "Verified photos, accurate pricing and genuine details — no fake listings.",
              },
              {
                icon: Users,
                title: "Customer Support",
                description:
                  "Our team is always ready to guide you and help you book the perfect venue.",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description:
                  "Only top venues that match our standards are listed on Find My Banquet.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-card rounded-3xl p-7 sm:p-8 text-center shadow-card border border-border hover:border-blue-300 hover:shadow-hover transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
