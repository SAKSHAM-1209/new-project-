import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, Clock, Shield, MessageCircle } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ✅ SAVE CONTACT MESSAGE TO SUPABASE
  const saveMessageToDB = async () => {
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      },
    ]);

    if (error) {
      console.log("Insert Error:", error);
      alert("Message send failed: " + error.message);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (saving) return;
    setSaving(true);

    const success = await saveMessageToDB();

    if (!success) {
      setSaving(false);
      return;
    }

    alert("Thank you! Your message has been sent successfully.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 bg-gradient-to-b from-muted to-background px-4">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4">
              Contact Us
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
              Let's Create Your{" "}
              <span className="text-blue-600">Dream Event</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              Whether you're looking for the perfect venue or want to list your
              property, our team is here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 sm:py-8 border-y border-border bg-card px-4">
        <div className="container-premium">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-10 md:gap-16">
            {[
              { icon: Clock, text: "Response within 2 hours" },
              { icon: Shield, text: "100% Privacy Guaranteed" },
              { icon: MessageCircle, text: "Dedicated Support Team" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-xs sm:text-sm">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="section-padding px-4">
        <div className="container-premium">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-5"
            >
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground text-center lg:text-left">
                Get in Touch
              </h2>

              {/* Call */}
              <a
                href="tel:+918726126607"
                className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border 
                           hover:border-blue-300 hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">
                    Call Us
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    +91 8726126607
                  </p>
                  <span className="text-xs text-blue-600 mt-1 block">
                    Available Always
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917428617371"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border 
                           hover:border-green-400 hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">
                    WhatsApp
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Quick Response
                  </p>
                  <span className="text-xs text-green-600 mt-1 block">
                    Chat instantly with us
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@findmybanquet.com"
                className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border 
                           hover:border-blue-300 hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>

                <div className="overflow-hidden">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">
                    Email
                  </h3>
                  <p className="text-muted-foreground text-sm break-all">
                    info@findmybanquet.com
                  </p>
                  <span className="text-xs text-blue-600 mt-1 block">
                    We reply within 2 hours
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card border border-border">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Send us a Message
                </h2>

                <p className="text-muted-foreground text-sm sm:text-base mb-7">
                  Fill out the form and we’ll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <input
                      placeholder="Full Name"
                      required
                      className="input-premium"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />

                    <input
                      placeholder="Email"
                      type="email"
                      required
                      className="input-premium"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <input
                      placeholder="Phone"
                      className="input-premium"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />

                    <select
                      required
                      className="input-premium cursor-pointer"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option value="">Select Subject</option>
                      <option value="venue-inquiry">Venue Inquiry</option>
                      <option value="list-venue">List My Venue</option>
                      <option value="support">Support</option>
                    </select>
                  </div>

                  {/* Message */}
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    required
                    className="input-premium resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 
                               bg-blue-600 text-white border border-blue-600 
                               rounded-xl px-8 py-3 font-semibold
                               hover:bg-white hover:text-blue-600 transition
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {saving ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
