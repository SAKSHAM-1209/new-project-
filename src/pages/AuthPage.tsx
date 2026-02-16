import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { supabase } from "@/integrations/supabase/client";

const AuthPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,

    // OWNER EXTRA FIELDS
    venueName: "",
    venueCity: "",
    venueAddress: "",
    venueCapacity: "",
    venueContact: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------------- REDIRECT AFTER LOGIN ----------------
  const redirectUser = (role: string) => {
    if (role === "owner") {
      navigate("/list-venue");
    } else {
      navigate("/");
    }
  };

  // ---------------- GOOGLE LOGIN (ONLY UI) ----------------
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);

      alert(
        `Google Login Success: ${decoded.email}\n\n⚠️ Supabase session not created.\nUse Supabase OAuth for real Google login.`
      );
    } catch (error) {
      console.log("Google Login Error:", error);
      alert("Google Login Failed!");
    }
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // LOGIN VALIDATION
    if (isLogin) {
      if (!formData.email.includes("@"))
        newErrors.email = "Enter valid email address";

      if (!formData.password) newErrors.password = "Password is required";

      if (formData.password.length < 6)
        newErrors.password = "Minimum 6 characters";
    }

    // REGISTER VALIDATION
    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = "First name required";
      if (!formData.lastName) newErrors.lastName = "Last name required";
      if (!formData.username) newErrors.username = "Username is required";

      if (!formData.email.includes("@")) newErrors.email = "Enter valid email";

      if (formData.password.length < 6)
        newErrors.password = "Minimum 6 characters";

      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

      if (!formData.terms)
        newErrors.terms = "Accept Terms & Conditions";

      // OWNER VALIDATION
      if (userRole === "owner") {
        if (!formData.venueName) newErrors.venueName = "Venue name required";
        if (!formData.venueCity) newErrors.venueCity = "City required";
        if (!formData.venueAddress) newErrors.venueAddress = "Address required";
        if (!formData.venueCapacity)
          newErrors.venueCapacity = "Capacity required";
        if (!formData.venueContact)
          newErrors.venueContact = "Contact number required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async () => {
    setLoading(true);

    try {
      // 1️⃣ Signup Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      const userId = data.user?.id;

      if (!userId) {
        alert("Signup failed! User not created.");
        setLoading(false);
        return;
      }

      // 2️⃣ Insert into profiles
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          role: userRole,
        },
      ]);

      if (profileError) {
        console.log(profileError);
        alert("Profile save failed: " + profileError.message);
        setLoading(false);
        return;
      }

      // 3️⃣ Insert into owners if role owner
      if (userRole === "owner") {
        const { error: ownerError } = await supabase.from("owners").insert([
          {
            id: userId,
            venue_name: formData.venueName,
            venue_city: formData.venueCity,
            venue_address: formData.venueAddress,
            venue_capacity: Number(formData.venueCapacity),
            venue_contact: formData.venueContact,
          },
        ]);

        if (ownerError) {
          console.log(ownerError);
          alert("Owner save failed: " + ownerError.message);
          setLoading(false);
          return;
        }
      }

      alert("Registration Successful! Now you can Login.");
      setIsLogin(true);
    } catch (err: any) {
      console.log(err);
      alert("Something went wrong during registration!");
    }

    setLoading(false);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      const userId = data.user?.id;

      if (!userId) {
        alert("Login failed! User not found.");
        setLoading(false);
        return;
      }

      // Fetch role from profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        console.log(profileError);
        alert("Profile not found. Please register again.");
        setLoading(false);
        return;
      }

      alert("Login Successful!");

      const role = profile?.role || "user";
      redirectUser(role);
    } catch (err: any) {
      console.log(err);
      alert("Something went wrong during login!");
    }

    setLoading(false);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 px-4 sm:px-6">
        <div className="container-premium pt-28 sm:pt-32 pb-16 sm:pb-20 max-w-xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              {isLogin ? "Welcome Back" : "Create Your Account"}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              {isLogin
                ? "Login to manage your bookings and venues"
                : "Join Find My Banquet and discover perfect venues"}
            </p>
          </div>

          <div className="bg-card p-6 sm:p-10 rounded-3xl shadow-card border">
            {/* ROLE SWITCH */}
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                <button
                  type="button"
                  onClick={() => setUserRole("user")}
                  className={`p-6 rounded-3xl border transition-all ${
                    userRole === "user"
                      ? "bg-blue-600 text-white shadow-xl scale-[1.02]"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  🔍 Find Venues
                </button>

                <button
                  type="button"
                  onClick={() => setUserRole("owner")}
                  className={`p-6 rounded-3xl border transition-all ${
                    userRole === "owner"
                      ? "bg-blue-600 text-white shadow-xl scale-[1.02]"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  🏢 List My Venue
                </button>
              </div>
            )}

            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="flex justify-center sm:justify-start">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => alert("Google Login Failed!")}
                />
              </div>

              <button
                type="button"
                disabled
                className="social-btn flex items-center justify-center gap-2 text-blue-700 py-3 rounded-xl opacity-60 cursor-not-allowed"
              >
                <FaLinkedinIn size={18} /> LinkedIn (Soon)
              </button>
            </div>

            {/* DIVIDER */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground font-medium">
                  {isLogin ? "LOGIN WITH EMAIL" : "REGISTER WITH EMAIL"}
                </span>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                      className="input-premium"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      className="input-premium"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {!isLogin && (
                <div>
                  <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="input-premium"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
              )}

              <div>
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="input-premium"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  className="input-premium pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              {/* OWNER EXTRA FIELDS */}
              {!isLogin && userRole === "owner" && (
                <div className="space-y-4">
                  <input
                    name="venueName"
                    placeholder="Venue Name"
                    onChange={handleChange}
                    className="input-premium"
                  />
                  <input
                    name="venueCity"
                    placeholder="City"
                    onChange={handleChange}
                    className="input-premium"
                  />
                  <input
                    name="venueAddress"
                    placeholder="Venue Address"
                    onChange={handleChange}
                    className="input-premium"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="venueCapacity"
                      placeholder="Capacity"
                      onChange={handleChange}
                      className="input-premium"
                    />
                    <input
                      name="venueContact"
                      placeholder="Contact Number"
                      onChange={handleChange}
                      className="input-premium"
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className="input-premium"
                  />

                  <label className="flex items-center gap-2 text-sm flex-wrap">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                    />
                    I agree to Terms & Conditions
                    <CheckCircle size={16} className="text-blue-600" />
                  </label>
                </>
              )}

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg border border-blue-600 hover:bg-white hover:text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-semibold hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
