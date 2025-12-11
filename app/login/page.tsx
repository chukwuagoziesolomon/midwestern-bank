"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [tab, setTab] = useState<"individual" | "business">("individual");
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

  return (
    <div className="min-h-screen bg-[#181818] font-sans text-white">
      {/* Header/Navbar */}
      <header className="w-full flex justify-center pt-8 pb-2">
        <div className="flex items-center justify-between w-full max-w-5xl px-8 py-4 rounded-2xl bg-[#232323] border border-[#232323] shadow-lg">
          <div className="flex items-center gap-3">
            <span className="inline-block w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center">
              <Image src="/logo.svg" alt="YourBank Logo" width={28} height={28} />
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">YourBank</span>
          </div>
          <nav className="hidden md:flex gap-8 text-white text-base font-medium">
            <a href="/" className="hover:text-[#B6FF48] transition">Home</a>
            <a href="/careers" className="hover:text-[#B6FF48] transition">Careers</a>
            <a href="/about" className="hover:text-[#B6FF48] transition">About</a>
            <a href="/security" className="hover:text-[#B6FF48] transition">Security</a>
          </nav>
          <div className="flex gap-3">
            <Link href="/signup" className="hidden md:inline-block px-6 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#B6FF48] hover:text-black transition">Sign Up</Link>
            <Link href="/login" className="px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Login</Link>
          </div>
        </div>
      </header>
      {/* Login Form Section */}
      <section className="w-full flex justify-center pt-10 pb-16">
        <div className="max-w-xl w-full bg-[#232323] border border-[#232323] rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#B6FF48]">Login</h1>
          <p className="text-[#ededed] mb-4">Welcome back! Please log in to access your account.</p>
          <form className="w-full flex flex-col gap-4" onSubmit={e => { e.preventDefault(); router.push('/dashboard'); }}>
            <div className="flex gap-4">
              <input type="email" placeholder="Enter your Email" className="flex-1 px-4 py-3 rounded-full bg-[#181818] border border-[#232323] text-white placeholder-[#888] focus:outline-none" />
              <input type="password" placeholder="Enter your Password" className="flex-1 px-4 py-3 rounded-full bg-[#181818] border border-[#232323] text-white placeholder-[#888] focus:outline-none" />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs text-[#ededed] underline hover:text-[#B6FF48]">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full px-6 py-3 rounded-full bg-[#B6FF48] text-black font-bold text-lg shadow-lg hover:bg-[#d6ff8a] transition">Login</button>
            <Link href="/signup" className="w-full px-6 py-3 rounded-full bg-[#232323] text-white font-bold text-lg shadow-lg hover:bg-[#B6FF48] hover:text-black transition flex items-center justify-center">Sign Up</Link>
          </form>
          <div className="w-full flex flex-col items-center gap-2 mt-4">
            <span className="text-[#ededed] text-sm">Or Continue with</span>
            <div className="flex gap-6 mt-2">
              <button className="w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center"><span className="text-black font-bold text-lg">G</span></button>
              <button className="w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center"><span className="text-black font-bold text-lg">f</span></button>
              <button className="w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center"><span className="text-black font-bold text-lg"></span></button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Our <span className="text-[#B6FF48]">Testimonials</span></h2>
        <p className="text-[#ededed] mb-8">Discover how YourBank has transformed lives with innovative digital solutions and personalized customer service. See why our clients return for a secure and pleasant financial journey.</p>
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab("individual")} className={`px-6 py-2 rounded-full font-semibold transition ${tab === "individual" ? "bg-[#B6FF48] text-black" : "bg-[#232323] text-white"}`}>For Individuals</button>
          <button onClick={() => setTab("business")} className={`px-6 py-2 rounded-full font-semibold transition ${tab === "business" ? "bg-[#B6FF48] text-black" : "bg-[#232323] text-white"}`}>For Businesses</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials[tab].map((t, i) => (
            <div key={i} className="bg-[#232323] border border-[#232323] rounded-2xl p-8 shadow flex flex-col items-center text-center">
              <Quote size={32} color="#B6FF48" className="mb-4" />
              <p className="text-[#ededed] text-base mb-4">{t.text}</p>
              <span className="text-[#B6FF48] font-bold">{t.name}</span>
            </div>
          ))}
          {/* Arrow for carousel navigation (placeholder) */}
          <div className="hidden md:flex items-center justify-center">
            <button className="w-12 h-12 rounded-full bg-[#B6FF48] flex items-center justify-center"><ArrowRight size={24} color="#232323" /></button>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full bg-[#232323] border-t border-[#232323] py-10 mt-0">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <span className="inline-block w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center">
              <Image src="/logo.svg" alt="YourBank Logo" width={28} height={28} />
            </span>
            <span className="text-lg font-bold text-white tracking-tight">YourBank</span>
          </div>
          <nav className="flex gap-6 text-white text-sm font-medium mb-4 md:mb-0">
            <a href="/" className="hover:text-[#B6FF48] transition">Home</a>
            <a href="/careers" className="hover:text-[#B6FF48] transition">Careers</a>
            <a href="/about" className="hover:text-[#B6FF48] transition">About</a>
            <a href="/security" className="hover:text-[#B6FF48] transition">Security</a>
          </nav>
          <div className="text-[#ededed] text-xs text-center md:text-right">© 2025 YourBank. All rights reserved.</div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <a href="#" className="w-8 h-8 rounded-full bg-[#B6FF48] flex items-center justify-center"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#232323" /></svg></a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#B6FF48] flex items-center justify-center"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#232323" /></svg></a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#B6FF48] flex items-center justify-center"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#232323" /></svg></a>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-[#ededed] gap-2">
          <span>YourBank. All Rights Reserved.</span>
          <span>Privacy Policy | Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
