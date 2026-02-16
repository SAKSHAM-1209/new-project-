import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Users,
  IndianRupee,
  ImagePlus,
  X,
  Sparkles,
  ShieldCheck,
  UploadCloud,
  UtensilsCrossed,
  Loader2,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";

type FoodType = "veg" | "non_veg" | "both";

const RegisterBanquetPage = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    capacity: "",
    vegPrice: "",
    nonVegPrice: "",
    contact: "",
    foodType: "both" as FoodType,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ IMAGE HANDLER
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 10) {
      alert("⚠ Maximum 10 images allowed!");
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Upload Images to Supabase Storage
  const uploadImagesToSupabase = async (userId: string) => {
    const uploadedUrls: string[] = [];

    for (const file of images) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      // ✅ IMPORTANT: upload inside user folder (matches RLS policy)
      const filePath = `${userId}/submissions/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("venue-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("venue-images")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ Check user logged in
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError) throw authError;

      const user = authData?.user;

      if (!user) {
        alert("⚠ Please login first to submit your banquet!");
        navigate("/auth");
        return;
      }

      // ✅ Validation
      if (!formData.name.trim()) {
        alert("⚠ Please enter banquet name.");
        return;
      }

      if (!formData.city.trim()) {
        alert("⚠ Please enter city.");
        return;
      }

      if (!formData.address.trim()) {
        alert("⚠ Please enter full address.");
        return;
      }

      if (!formData.capacity || Number(formData.capacity) <= 0) {
        alert("⚠ Please enter valid capacity.");
        return;
      }

      if (!formData.contact.trim()) {
        alert("⚠ Please enter manager contact number.");
        return;
      }

      // ✅ Price Validation
      const veg = formData.vegPrice ? Number(formData.vegPrice) : null;
      const nonVeg = formData.nonVegPrice ? Number(formData.nonVegPrice) : null;

      if (!veg && !nonVeg) {
        alert("⚠ Please enter at least Veg or Non-Veg price.");
        return;
      }

      const pricePerPlate =
        veg && nonVeg ? Math.min(veg, nonVeg) : veg || nonVeg || 0;

      // ✅ Fetch profile ID
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (profileError || !profileData) {
        console.error("Profile Error:", profileError);
        alert("❌ Profile not found. Please login again.");
        return;
      }

      // ✅ Upload Images
      let imageUrls: string[] = [];
      if (images.length > 0) {
        imageUrls = await uploadImagesToSupabase(user.id);
      }

      // ✅ Insert into venue_submissions (MATCHING YOUR SQL TABLE)
      const { error: insertError } = await supabase
        .from("venue_submissions")
        .insert([
          {
            submitter_id: profileData.id,
            name: formData.name.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            capacity: Number(formData.capacity),
            price_per_plate: pricePerPlate,
            manager_phone: formData.contact.trim(),
            food_type: formData.foodType,
            images: imageUrls,
            status: "pending",
          },
        ]);

      if (insertError) {
        console.error("Insert Error:", insertError);
        alert("❌ Insert failed: " + insertError.message);
        return;
      }

      // ✅ Success toast message
      localStorage.setItem(
        "toast_message",
        "🎉 Banquet submitted successfully! Our team will verify it soon."
      );

      // ✅ Reset Form
      setFormData({
        name: "",
        city: "",
        address: "",
        capacity: "",
        vegPrice: "",
        nonVegPrice: "",
        contact: "",
        foodType: "both",
      });

      setImages([]);

      navigate("/");
    } catch (err: any) {
      console.error("Submit Error:", err);
      alert("❌ Something went wrong: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B2E] text-white overflow-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-20 right-0 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-purple-500/20 blur-[120px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative text-center max-w-3xl mx-auto"
          >
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs sm:text-sm font-semibold shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              List your banquet on Find My Banquet
            </p>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
              Register Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Banquet
              </span>{" "}
              in Minutes
            </h1>

            <p className="mt-4 text-blue-100/70 text-sm sm:text-base md:text-lg leading-relaxed px-2">
              Showcase your venue with stunning photos, transparent pricing, and
              get customers instantly.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-xs sm:text-sm text-blue-100/80 font-medium">
                  Verified Listings
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <UploadCloud className="w-4 h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-blue-100/80 font-medium">
                  Upload Photos
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm text-blue-100/80 font-medium">
                  Premium Boost
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="pb-20 sm:pb-24 px-4">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 
                     shadow-[0_0_80px_rgba(59,130,246,0.20)] rounded-3xl 
                     p-5 sm:p-8 md:p-10 space-y-8 sm:space-y-10"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-blue-200">
                Banquet Information
              </h2>
              <p className="text-blue-100/60 text-xs sm:text-sm mt-2">
                Fill the details carefully to get maximum bookings.
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 text-blue-100/70 text-xs sm:text-sm text-center">
              ⭐ Better details = Higher Ranking
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-blue-200">
                Banquet Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60" />
                <input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Royal Palace Banquet"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                             placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-blue-200">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60" />
                <input
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Kanpur, Lucknow..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                             placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-blue-200">
              Full Address
            </label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={4}
              placeholder="Enter full banquet address with landmark..."
              className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                         placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition resize-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-blue-200">
                Capacity (Guests)
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60" />
                <input
                  name="capacity"
                  type="number"
                  required
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="300"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                             placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-blue-200">
                Manager Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60" />
                <input
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                             placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-blue-200 mb-4">
              Pricing & Food Type
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-blue-200">
                  Veg Price (Per Plate)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60" />
                  <input
                    name="vegPrice"
                    type="number"
                    value={formData.vegPrice}
                    onChange={handleChange}
                    placeholder="800"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                               placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-blue-200">
                  Non-Veg Price (Per Plate)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60" />
                  <input
                    name="nonVegPrice"
                    type="number"
                    value={formData.nonVegPrice}
                    onChange={handleChange}
                    placeholder="1100"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                               placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-blue-200">
                  Food Type
                </label>

                <div className="relative">
                  <UtensilsCrossed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60" />
                  <select
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition text-sm"
                  >
                    <option value="veg" className="text-black">
                      Veg
                    </option>
                    <option value="non_veg" className="text-black">
                      Non-Veg
                    </option>
                    <option value="both" className="text-black">
                      Both
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-blue-200 mb-4">
              Upload Venue Photos
            </h3>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500/40 
                              rounded-3xl p-8 sm:p-10 cursor-pointer bg-white/5 hover:bg-blue-500/10 
                              transition-all duration-300 text-center"
            >
              <ImagePlus className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 mb-3" />
              <p className="text-sm sm:text-base font-semibold text-blue-100">
                Click to upload banquet images
              </p>
              <p className="text-xs sm:text-sm text-blue-100/60 mt-1">
                Upload multiple photos for better visibility
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <AnimatePresence>
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8"
                >
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        className="h-40 sm:h-32 w-full object-cover"
                        alt="Uploaded banquet"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-base sm:text-lg 
                       shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:shadow-[0_0_70px_rgba(59,130,246,0.55)] transition-all
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </span>
            ) : (
              "🚀 Submit Banquet Listing"
            )}
          </motion.button>

          <p className="text-center text-blue-100/60 text-xs sm:text-sm">
            By submitting, you agree to our listing guidelines and verification
            process.
          </p>
        </motion.form>
      </section>

      <Footer />
    </div>
  );
};

export default RegisterBanquetPage;
