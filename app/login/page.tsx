"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quote } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

const Login = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [tab, setTab] = useState<"individual" | "business">("individual");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  const testimonials = {
    individual: [
      {
        name: "Sara T",
        text: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze."
      },
      {
        name: "Emily G",
        text: "I love the convenience of YourBank's banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind."
      }
    ],
    business: [
      {
        name: "John D",
        text: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable."
      }
    ]
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.login({ email, password });
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        login(response.data.user);
        router.push('/dashboard');
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Header/Navbar */}
      <Navbar active="login" />
      {/* Login Form Section */}
      <section className="w-full flex justify-center pt-10 pb-16">
        <div className="max-w-xl w-full bg-white border border-[#0000FF] rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#0000FF] italic">Login</h1>
          <p className="text-black mb-4">Welcome back! Please log in to access your account.</p>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-[#f5f5f5] border border-[#0000FF] text-black placeholder-[#888] focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-[#f5f5f5] border border-[#0000FF] text-black placeholder-[#888] focus:outline-none"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end">
              <a href="#" className="text-xs text-black underline hover:text-[#0000FF]">Forgot Password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-[#0000FF] text-white font-bold text-lg shadow-lg hover:bg-[#5a8cff] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link href="/signup" className="w-full px-6 py-3 rounded-full bg-white text-[#0000FF] font-bold text-lg shadow-lg hover:bg-[#5a8cff] hover:text-white transition flex items-center justify-center">Sign Up</Link>
          </form>

        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Our <span className="text-[#0000FF] italic">Testimonials</span></h2>
        <p className="text-black mb-8">Discover how YourBank has transformed lives with innovative digital solutions and personalized customer service. See why our clients return for a secure and pleasant financial journey.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials[tab].map((t, i) => (
            <div key={i} className="bg-white border border-[#0000FF] rounded-2xl p-8 shadow flex flex-col items-center text-center">
              <Quote size={32} color="#0000FF" className="mb-4" />
              <p className="text-black text-base mb-4">{t.text}</p>
              <span className="text-[#0000FF] font-bold italic">{t.name}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
