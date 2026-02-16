const marqueeItems = [
  "VERIFIED BANQUET & EVENT VENUES",
  "WEDDINGS • RECEPTIONS • PARTIES",
  "PREMIUM EVENT SPACES ACROSS CITIES",
  "TRUSTED FOR UNFORGETTABLE EVENTS",
  "EASY ENQUIRIES • NO BROKERAGE",
];


const MarqueeSection = () => {
  return (
    <section className="py-12 bg-primary overflow-hidden">
      <div className="relative">
        <div className="animate-marquee flex whitespace-nowrap">
          {/* First set */}
          {marqueeItems.map((item, index) => (
            <span
              key={`first-${index}`}
              className="mx-12 text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary-foreground/20 hover:text-accent transition-colors duration-500"
            >
              {item}
              <span className="mx-12 text-accent">✦</span>
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {marqueeItems.map((item, index) => (
            <span
              key={`second-${index}`}
              className="mx-12 text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary-foreground/20 hover:text-accent transition-colors duration-500"
            >
              {item}
              <span className="mx-12 text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
