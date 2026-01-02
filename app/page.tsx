"use client";

import Image from "next/image";
import { CreditCard, PiggyBank, Home as LucideHome, User, Users, Shield, Briefcase, MessageSquare, ArrowRight, ArrowLeft, Star, HelpCircle, Smartphone, BarChart, Headphones, Clock, ShieldCheck, Send, GraduationCap, Banknote, Wallet, TrendingUp, Briefcase as LucideBriefcase, TrendingDown, DollarSign, ArrowUpRight, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
// import { useTranslation } from "@/lib/TranslationContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Scroll Observer Hook
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

// Enhanced Typewriter Effect Hook with multiple phrases
const useTypewriter = (phrases: string[], speed: number = 100, pauseTime: number = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases, speed, pauseTime]);

  return displayText;
};

// Floating Stats Component
const FloatingStats = () => {
  const stats = [
    { icon: DollarSign, value: "$2.5B+", label: "Assets Managed", delay: "0s" },
    { icon: Users, value: "50K+", label: "Happy Clients", delay: "0.2s" },
    { icon: TrendingUp, value: "99.9%", label: "Uptime", delay: "0.4s" },
    { icon: Shield, value: "24/7", label: "Security", delay: "0.6s" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-white/20"
          style={{
            animation: `floatIn 0.8s ease-out ${stat.delay} both`
          }}
        >
          <stat.icon className="w-8 h-8 text-blue-400 mb-2" />
          <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-white/80">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Animated Background Particles
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  // Testimonial carousel state
  const testimonials = [
    {
      text: "Mid Western Bank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
      author: "Sam T"
    },
    {
      text: "I recently started my own business, and Mid Western Bank has been essential in helping me set up my banking. Business accounts are feature-rich and tailored to meet their individual needs.",
      author: "John D"
    },
    {
      text: "I owe the convenience of Mid Western Bank's banking app to managing my finances. It has made it so much easier to keep track of my expenses and save for my goals.",
      author: "Emily G"
    }
  ];
  
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const handlePrevTestimonial = () => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNextTestimonial = () => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const [useCaseTab, setUseCaseTab] = useState<"individual" | "business">("individual");
  const [scrollY, setScrollY] = useState(0);
  
  // Multi-phrase typewriter effect (hardcoded English, Google Translate will handle translation)
  const typedText = useTypewriter([
    'Banking made simple for everyone.',
    'Your trusted partner in finance.',
    'Secure. Reliable. Global.'
  ], 100, 2000);
  
  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Apply scroll animations on mount
  useScrollAnimation();

  return (
    <>
      <style jsx global>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .shimmer-button {
          background: linear-gradient(90deg, #0000FF 0%, #4169E1 50%, #0000FF 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 0, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 0, 255, 0.8);
          }
        }
        
        .glow-effect {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative min-h-screen font-sans bg-white overflow-hidden">
        {/* Hero Section with enhanced effects */}
        <section 
          className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(/Hero.png)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          
          {/* Particle field */}
          <ParticleField />
          
          {/* Navbar overlay */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <Navbar active="home" />
          </div>
          
          {/* Hero content with stunning animations */}
          <div className="relative z-10 text-center text-white px-8 max-w-6xl pt-32">
            {/* Sparkle icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-16 h-16 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 blur-xl bg-blue-400/50 animate-pulse"></div>
              </div>
            </div>
            
            {/* Main headline with typewriter */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Welcome to YourBank
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent">
                Mid Western Bank
              </span>
            </h1>
            
            {/* Animated subtitle with typewriter effect */}
            <div className="h-16 mb-8">
              <p className="text-2xl md:text-4xl font-semibold text-blue-200">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            
            {/* CTA Button with enhanced effects */}
            <div className="flex justify-center mb-16">
              <button className="group relative px-12 py-5 rounded-full shimmer-button text-white font-bold text-xl shadow-2xl hover:scale-105 transition-all duration-300 glow-effect overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Get Started
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
            
            {/* Floating stats cards */}
            <FloatingStats />
            
            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="w-full max-w-7xl mx-auto px-8 py-20 relative">
          <div className="mb-10 text-left scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Our <span className="text-blue-600 italic">Products</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl">Discover a range of comprehensive and customizable banking products at Mid Western Bank, designed to suit your unique financial needs and aspirations.</p>
          </div>
          
          {/* Toggle Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-blue-500 transition">For Individuals</button>
            <button className="px-6 py-2 rounded-full bg-white text-blue-600 font-bold shadow hover:bg-blue-500 hover:text-white transition">For Businesses</button>
          </div>
          
          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Checking Accounts */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg relative scroll-animate stagger-item-1 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-100 rounded-full blur-xl z-0" />
              <span className="inline-block w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 z-10 border-2 border-blue-600">
                <CreditCard size={32} color="#0000FF" strokeWidth={2.5} />
              </span>
              <h3 className="text-xl font-bold text-black mb-2">Checking Accounts</h3>
              <p className="text-gray-700">Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.</p>
            </div>
            
            {/* Savings Accounts */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg relative scroll-animate stagger-item-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-100 rounded-full blur-xl z-0" />
              <span className="inline-block w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 z-10 border-2 border-blue-600">
                <PiggyBank size={32} color="#0000FF" strokeWidth={2.5} />
              </span>
              <h3 className="text-xl font-bold text-black mb-2">Savings Accounts</h3>
              <p className="text-gray-700">Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.</p>
            </div>
            
            {/* Loans and Mortgages */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg relative scroll-animate stagger-item-3 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-100 rounded-full blur-xl z-0" />
              <span className="inline-block w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 z-10 border-2 border-blue-600">
                <LucideHome size={32} color="#0000FF" strokeWidth={2.5} />
              </span>
              <h3 className="text-xl font-bold text-black mb-2">Loans and Mortgages</h3>
              <p className="text-gray-700">Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-7xl mx-auto px-8 pb-20">
          <div className="mb-10 text-center scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">Our <span className="text-blue-600">Features</span></h2>
            <p className="text-lg text-gray-700">Discover powerful features of Mid Western Bank, including seamless online banking, secure transactions, and personalized financial insights.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Online Banking */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center scroll-animate stagger-item-1 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <Smartphone size={32} color="#0000FF" />
              <h3 className="text-lg font-bold text-black">Online Banking</h3>
              <p className="text-gray-700 text-sm text-center">Access your accounts anytime, anywhere, with our secure online banking platform.</p>
            </div>
            
            {/* Financial Tools */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center scroll-animate stagger-item-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <BarChart size={32} color="#0000FF" />
              <h3 className="text-lg font-bold text-black">Financial Tools</h3>
              <p className="text-gray-700 text-sm text-center">Utilize our suite of financial tools to manage budgets, track spending, and plan for the future.</p>
            </div>
            
            {/* Customer Support */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center scroll-animate stagger-item-3 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <Headphones size={32} color="#0000FF" />
              <h3 className="text-lg font-bold text-black">Customer Support</h3>
              <p className="text-gray-700 text-sm text-center">Get help when you need it with our dedicated customer support team.</p>
            </div>
            
            {/* 24/7 Account Access */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center scroll-animate stagger-item-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <Clock size={32} color="#0000FF" />
              <h3 className="text-lg font-bold text-black">24/7 Account Access</h3>
              <p className="text-gray-700 text-sm text-center">Enjoy the convenience of accessing your accounts anytime, including transfers, bill pay, and more.</p>
            </div>
            
            {/* Mobile Banking App */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center scroll-animate stagger-item-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <Smartphone size={32} color="#0000FF" />
              <h3 className="text-lg font-bold text-black">Mobile Banking App</h3>
              <p className="text-gray-700 text-sm text-center">Stay connected on your finances from your phone with our secure mobile banking app.</p>
            </div>
            
            {/* Secure Transactions */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center scroll-animate stagger-item-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <ShieldCheck size={32} color="#0000FF" />
              <h3 className="text-lg font-bold text-black">Secure Transactions</h3>
              <p className="text-gray-700 text-sm text-center">Your transactions are protected by advanced security features and encryption.</p>
            </div>
            
            {/* Bill Pay and Transfers */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center scroll-animate stagger-item-7 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <Send size={32} color="#0000FF" />
              <h3 className="text-lg font-bold text-black">Bill Pay and Transfers</h3>
              <p className="text-gray-700 text-sm text-center">Easily pay bills and transfer funds with just a few clicks.</p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="w-full max-w-7xl mx-auto px-8 pb-20">
          <div className="mb-10 text-left scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Use <span className="text-blue-600">Cases</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl">At Mid Western Bank, we cater to the diverse needs of individuals and businesses alike, offering a wide range of financial solutions.</p>
          </div>
          
          {/* Toggle Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full font-bold shadow transition ${useCaseTab === 'individual' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
              onClick={() => setUseCaseTab('individual')}
            >
              For Individuals
            </button>
            <button
              className={`px-6 py-2 rounded-full font-bold shadow transition ${useCaseTab === 'business' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
              onClick={() => setUseCaseTab('business')}
            >
              For Businesses
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10">
            {/* Card Background */}
            <div className="relative flex-1 max-w-2xl scroll-animate">
              <div className="absolute inset-0 rounded-2xl bg-blue-100 blur-2xl z-0" />
              <div className="relative z-10 grid grid-cols-2 gap-6 p-8 bg-white border border-blue-100 rounded-2xl shadow-xl">
                {useCaseTab === 'individual' ? (
                  <>
                    <div className="flex flex-col items-center text-center">
                      <Wallet size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Managing Personal Finances</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <PiggyBank size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Saving for the Future</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <LucideHome size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Homeownership</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <GraduationCap size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Education Funding</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center text-center">
                      <Banknote size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Cash Flow Management</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <TrendingUp size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Drive Business Expansion</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <LucideBriefcase size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Streamline Payroll Processing</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <CreditCard size={32} color="#0000FF" />
                      <span className="text-black font-semibold mt-2">Payment Solutions</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Stats and Description */}
            <div className="flex-1 flex flex-col justify-center gap-8">
              {useCaseTab === 'individual' ? (
                <div>
                  <h3 className="text-black text-xl font-bold mb-2">For Individuals</h3>
                  <p className="text-gray-700 mb-6">For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers.</p>
                  <div className="flex gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-blue-600">78%</span>
                      <span className="text-gray-700 text-xs">Secure Retirement Planning</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-blue-600">63%</span>
                      <span className="text-gray-700 text-xs">Manageable Debt Consolidation</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-blue-600">91%</span>
                      <span className="text-gray-700 text-xs">Reducing financial burdens</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition">Learn More</button>
                </div>
              ) : (
                <div>
                  <h3 className="text-black text-xl font-bold mb-2">For Business</h3>
                  <p className="text-gray-700 mb-6">For businesses, we empower growth with working capital solutions that optimize cash flow, and our tailored financing options fuel business expansion. Whatever your financial aspirations, Mid Western Bank is committed to providing the right tools and support to achieve them.</p>
                  <div className="flex gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-blue-600">65%</span>
                      <span className="text-gray-700 text-xs">Cash Flow Management</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-blue-600">70%</span>
                      <span className="text-gray-700 text-xs">Drive Business Expansion</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-blue-600">45%</span>
                      <span className="text-gray-700 text-xs">Streamline Payroll Processing</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition">Learn More</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-7xl mx-auto px-8 pb-20">
          <div className="mb-10 text-center scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2"><span className="text-blue-600">Frequently</span> Asked Questions</h2>
            <p className="text-lg text-gray-700">Still have any questions? Contact our team at support@midwesternbank.com</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ 1 */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg scroll-animate stagger-item-1 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={20} color="#0000FF" />
                <h3 className="text-lg font-bold text-black">How do I open an account with Mid Western Bank?</h3>
              </div>
              <p className="text-gray-700 text-sm">Open an account with us. Simply visit our website and click on the 'Open Account' button. Fill out the required details and provide necessary documentation. For any assistance, our customer support team is available to help.</p>
            </div>
            
            {/* FAQ 2 */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg scroll-animate stagger-item-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={20} color="#0000FF" />
                <h3 className="text-lg font-bold text-black">What documents do I need to provide to apply for a loan?</h3>
              </div>
              <p className="text-gray-700 text-sm">The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification, proof of income, and other relevant documents. Our team will guide you through the specific requirements during the application process.</p>
            </div>
            
            {/* FAQ 3 */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg scroll-animate stagger-item-3 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={20} color="#0000FF" />
                <h3 className="text-lg font-bold text-black">How can I access my accounts online?</h3>
              </div>
              <p className="text-gray-700 text-sm">Access your accounts online by visiting our website and clicking on the 'Login' button. Enter your credentials to securely view your account information, make transactions, and manage your finances.</p>
            </div>
            
            {/* FAQ 4 */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg scroll-animate stagger-item-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={20} color="#0000FF" />
                <h3 className="text-lg font-bold text-black">Are my transactions and personal information secure?</h3>
              </div>
              <p className="text-gray-700 text-sm">At Mid Western Bank, the security of your transactions and personal information is our top priority. We employ advanced security measures and encryption to safeguard your data.</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition">Load All FAQs →</button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-7xl mx-auto px-8 pb-20">
          <div className="mb-10 text-center scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">Our <span className="text-blue-600">Testimonials</span></h2>
            <p className="text-lg text-gray-700">Discover how Mid Western Bank has transformed lives with innovative digital solutions and personalized customer service. See why our clients trust us for a secure and prosperous financial journey.</p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            {/* Slideshow/Carousel for testimonials */}
            <div className="w-full flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg scroll-animate flex flex-col items-center">
                  <div className="mb-4 flex items-center justify-center">
                    <Star size={32} color="#0000FF" fill="#0000FF" />
                  </div>
                  <p className="text-gray-700 text-base mb-4 text-center">{testimonials[testimonialIndex].text}</p>
                  <div className="text-blue-600 font-bold">{testimonials[testimonialIndex].author}</div>
                </div>
                
                {/* Carousel controls overlayed */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center w-full justify-between px-2 pointer-events-none">
                  <button onClick={handlePrevTestimonial} className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center pointer-events-auto hover:bg-blue-500 transition">
                    <ArrowLeft size={18} color="#fff" />
                  </button>
                  <button onClick={handleNextTestimonial} className="w-8 h-8 rounded-full bg-white border border-blue-600 flex items-center justify-center pointer-events-auto hover:bg-blue-50 transition">
                    <ArrowRight size={18} color="#0000FF" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Dots for navigation */}
            <div className="flex gap-2 mt-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition ${testimonialIndex === idx ? 'bg-blue-600' : 'bg-blue-200'}`}
                  onClick={() => setTestimonialIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl mx-auto px-8 pb-20">
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-xl p-10 flex flex-col items-center text-center overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 border-2 border-white rounded-full"
                  style={{
                    left: `${20 * i}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${8 + i * 2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-white/90 text-lg mb-6">Join thousands of satisfied customers who trust Mid Western Bank for their financial needs.</p>
              <button className="px-8 py-3 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition hover:scale-105 transform">
                Open Account Today
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}