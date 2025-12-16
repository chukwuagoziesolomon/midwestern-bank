"use client";

import Image from "next/image";
import { CreditCard, PiggyBank, Home as LucideHome, User, Users, Shield, Briefcase, MessageSquare, ArrowRight, ArrowLeft, Star, HelpCircle, Smartphone, BarChart, Headphones, Clock, ShieldCheck, Send, GraduationCap, Banknote, Wallet, TrendingUp, Briefcase as LucideBriefcase } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

// import ParticleBackground from "./ParticleBackground";

export default function Home() {
  const [useCaseTab, setUseCaseTab] = useState<"individual" | "business">("individual");

  return (
    <div className="relative min-h-screen font-sans bg-[#0a0a0a] overflow-hidden">
      {/* Header/Navbar */}
      <Navbar active="home" />
      {/* Hero Section */}
      <section className="relative w-full flex flex-col md:flex-row items-start justify-between max-w-7xl mx-auto px-8 pt-10 pb-20 z-10">
        <div className="flex-1 flex flex-col gap-6 max-w-xl">
          <div className="mb-2">
            <span className="inline-block px-4 py-1 rounded-full bg-[#232323] text-xs text-white font-semibold mb-2">For LLC Required, No Credit Check.</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Welcome to <span className="text-[#B6FF48]">mid western bank</span><br />Empowering Your <span className="text-[#B6FF48]">Financial Journey</span>
          </h1>
          <p className="text-lg text-[#ededed] mb-6">
            A toolkit for ambition: we provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.
          </p>
          
                  <Link href="/login" className="px-8 py-3 rounded-full bg-[#B6FF48] text-black font-bold text-lg shadow-lg hover:bg-[#d6ff8a] transition w-fit">Open Account</Link>
        </div>
        {/* Placeholder for card UI */}
        <div className="flex-1 flex justify-end items-start mt-10 md:mt-0">
          <div className="relative bg-[#181818]/90 border border-[#232323] rounded-2xl shadow-2xl p-8 w-[370px] max-w-full flex flex-col" style={{boxShadow: '0 4px 32px 0 #B6FF48a0'}}>
            {/* Green Arrow SVGs - background */}
            <div className="absolute right-4 top-8 z-0 opacity-80 pointer-events-none">
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 80L80 10" stroke="#B6FF48" strokeWidth="4" strokeLinecap="round"/>
                <path d="M60 10H80V30" stroke="#B6FF48" strokeWidth="4" strokeLinecap="round"/>
                <path d="M30 40L70 0" stroke="#B6FF48" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {/* Monthly Income Pill */}
            <div className="absolute -top-6 left-4 z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B6FF48] text-[#181818] text-sm font-bold shadow-lg">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="#232323"/></svg>
                + $5000,00 Monthly Income
              </span>
            </div>
            {/* Card Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-3 h-3 rounded-full bg-[#B6FF48]" />
                <span className="text-white font-semibold text-lg">$8000.00</span>
              </div>
              {/* Transactions */}
              <div className="mb-4">
                <div className="text-xs text-[#ededed] mb-2">Your Transactions</div>
                <div className="flex flex-col gap-2">
                  {/* Transaction 1 - Active */}
                  <div className="flex items-center justify-between text-white text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B6FF48] text-[#181818] font-bold">J</span>
                      <span>Joel Kenley</span>
                    </div>
                    <span>-$68.00</span>
                  </div>
                  {/* Transaction 2 - Faded */}
                  <div className="flex items-center justify-between text-[#888] text-sm">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD600] text-[#181818] font-bold">M</span>
                      <span>Mark Smith</span>
                    </div>
                    <span>-$68.00</span>
                  </div>
                  {/* Transaction 3 - Faded */}
                  <div className="flex items-center justify-between text-[#444] text-sm">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B6FF48]/40 text-[#181818] font-bold">L</span>
                      <span>Lenen Roy</span>
                    </div>
                    <span>-$68.00</span>
                  </div>
                </div>
              </div>
              {/* Money Exchange */}
              <div className="mb-4">
                <div className="text-xs text-[#ededed] mb-2">Money Exchange</div>
                <div className="flex items-center gap-4 bg-[#232323] rounded-xl px-4 py-3 mb-2">
                  {/* INR */}
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-7 h-7 rounded-full overflow-hidden">
                      <img src="https://flagcdn.com/in.svg" alt="INR" className="w-full h-full object-cover" />
                    </span>
                    <span className="text-white text-sm">INR</span>
                  </div>
                  <span className="text-[#ededed] text-xs">Indian Rupees</span>
                  <span className="text-white font-bold ml-auto">5,0000</span>
                </div>
                <div className="flex items-center gap-4 bg-[#232323] rounded-xl px-4 py-3 mb-2">
                  {/* USD */}
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-7 h-7 rounded-full overflow-hidden">
                      <img src="https://flagcdn.com/us.svg" alt="USD" className="w-full h-full object-cover" />
                    </span>
                    <span className="text-white text-sm">USD</span>
                  </div>
                  <span className="text-[#ededed] text-xs">United States Dollar</span>
                  <span className="text-white font-bold ml-auto">12.00</span>
                </div>
              </div>
              {/* Exchange Button */}
              <button className="w-full mt-2 py-3 rounded-full bg-[#B6FF48] text-[#181818] font-bold text-base shadow-lg hover:bg-[#d6ff8a] transition">Exchange</button>
              {/* Supported Currency Pills */}
              <div className="flex justify-center gap-2 mt-6">
                {['€','£','₹','₦','₿'].map((cur, i) => (
                  <span key={i} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#232323] text-[#B6FF48] text-lg font-bold shadow">{cur}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Figma Style */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-20 relative">
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Our <span className="text-[#B6FF48]">Products</span>
          </h2>
          <p className="text-lg text-[#ededed] max-w-2xl">Discover a range of comprehensive and customizable banking products at YourBank, designed to suit your unique financial needs and aspirations.</p>
        </div>
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-2 rounded-full bg-[#B6FF48] text-[#181818] font-bold shadow hover:bg-[#d6ff8a] transition">For Individuals</button>
          <button className="px-6 py-2 rounded-full bg-[#232323] text-[#B6FF48] font-bold shadow hover:bg-[#B6FF48] hover:text-[#181818] transition">For Businesses</button>
        </div>
        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checking Accounts */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg relative">
            <span className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#B6FF48]/30 rounded-full blur-xl z-0" />
            <span className="inline-block w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center mb-4 z-10 border-2 border-[#B6FF48]">
              <CreditCard size={32} color="#B6FF48" strokeWidth={2.5} />
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Checking Accounts</h3>
            <p className="text-[#ededed]">Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.</p>
          </div>
          {/* Savings Accounts */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg relative">
            <span className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#B6FF48]/30 rounded-full blur-xl z-0" />
            <span className="inline-block w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center mb-4 z-10 border-2 border-[#B6FF48]">
              <PiggyBank size={32} color="#B6FF48" strokeWidth={2.5} />
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Savings Accounts</h3>
            <p className="text-[#ededed]">Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.</p>
          </div>
          {/* Loans and Mortgages */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg relative">
            <span className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#B6FF48]/30 rounded-full blur-xl z-0" />
            <span className="inline-block w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center mb-4 z-10 border-2 border-[#B6FF48]">
              <LucideHome size={32} color="#B6FF48" strokeWidth={2.5} />
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Loans and Mortgages</h3>
            <p className="text-[#ededed]">Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our <span className="text-[#B6FF48]">Features</span></h2>
          <p className="text-lg text-[#ededed]">Discover powerful features of Mid Western Bank, including seamless online banking, secure transactions, and personalized financial insights.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Online Banking */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center">
            <Smartphone size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold text-white">Online Banking</h3>
            <p className="text-[#ededed] text-sm">Access your accounts anytime, anywhere, with our secure online banking platform.</p>
          </div>
          {/* Financial Tools */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center">
            <BarChart size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold text-white">Financial Tools</h3>
            <p className="text-[#ededed] text-sm">Utilize our suite of financial tools to manage budgets, track spending, and plan for the future.</p>
          </div>
          {/* Customer Support */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center">
            <Headphones size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold text-white">Customer Support</h3>
            <p className="text-[#ededed] text-sm">Get help when you need it with our dedicated customer support team.</p>
          </div>
          {/* 24/7 Account Access */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center">
            <Clock size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold text-white">24/7 Account Access</h3>
            <p className="text-[#ededed] text-sm">Enjoy the convenience of accessing your accounts anytime, including transfers, bill pay, and more.</p>
          </div>
          {/* Mobile Banking App */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center">
            <Smartphone size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold text-white">Mobile Banking App</h3>
            <p className="text-[#ededed] text-sm">Stay connected on your finances from your phone with our secure mobile banking app.</p>
          </div>
          {/* Secure Transactions */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center">
            <ShieldCheck size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold text-white">Secure Transactions</h3>
            <p className="text-[#ededed] text-sm">Your transactions are protected by advanced security features and encryption.</p>
          </div>
          {/* Bill Pay and Transfers */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-3 items-center">
            <Send size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold text-white">Bill Pay and Transfers</h3>
            <p className="text-[#ededed] text-sm">Easily pay bills and transfer funds with just a few clicks.</p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2"><span className="text-[#B6FF48]">Frequently</span> Asked Questions</h2>
          <p className="text-lg text-[#ededed]">Still have any questions? Contact our team at support@midwesternbank.com</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ 1 */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">How do I open an account with Mid Western Bank?</h3>
            </div>
            <p className="text-[#ededed] text-sm">Open an account with us. Simply visit our website and click on the 'Open Account' button. Fill out the required details and provide necessary documentation. For any assistance, our customer support team is available to help.</p>
          </div>
          {/* FAQ 2 */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">What documents do I need to provide to apply for a loan?</h3>
            </div>
            <p className="text-[#ededed] text-sm">The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification, proof of income, and other relevant documents. Our team will guide you through the specific requirements during the application process.</p>
          </div>
          {/* FAQ 3 */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">How can I access my accounts online?</h3>
            </div>
            <p className="text-[#ededed] text-sm">Access your accounts online by visiting our website and clicking on the 'Login' button. Enter your credentials to securely view your account information, make transactions, and manage your finances.</p>
          </div>
          {/* FAQ 4 */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">Are my transactions and personal information secure?</h3>
            </div>
            <p className="text-[#ededed] text-sm">At Mid Western Bank, the security of your transactions and personal information is our top priority. We employ advanced security measures and encryption to safeguard your data.</p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#B6FF48] hover:text-black transition">Load All FAQs →</button>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our <span className="text-[#B6FF48]">Testimonials</span></h2>
          <p className="text-lg text-[#ededed]">Discover how Mid Western Bank has transformed lives with innovative digital solutions and personalized customer service. See why our clients trust us for a secure and prosperous financial journey.</p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-8 justify-center w-full">
            {/* Testimonial 1 */}
            <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg max-w-md flex-1">
              <div className="mb-4 flex items-center justify-center">
                <Star size={32} color="#B6FF48" />
              </div>
              <p className="text-[#ededed] text-base mb-4">Mid Western Bank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.</p>
              <div className="text-[#B6FF48] font-bold">Sam T</div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg max-w-md flex-1">
              <div className="mb-4 flex items-center justify-center">
                <Star size={32} color="#B6FF48" />
              </div>
              <p className="text-[#ededed] text-base mb-4">I recently started my own business, and Mid Western Bank has been essential in helping me set up my banking. Business accounts are feature-rich and tailored to meet their individual needs.</p>
              <div className="text-[#B6FF48] font-bold">John D</div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 shadow-lg max-w-md flex-1">
              <div className="mb-4 flex items-center justify-center">
                <Star size={32} color="#B6FF48" />
              </div>
              <p className="text-[#ededed] text-base mb-4">I owe the convenience of Mid Western Bank's banking app to managing my finances. It has made it so much easier to keep track of my expenses and save for my goals.</p>
              <div className="text-[#B6FF48] font-bold">Emily G</div>
            </div>
          </div>
          {/* Carousel controls */}
          <div className="flex gap-2 mt-4">
            <button className="w-8 h-8 rounded-full bg-[#B6FF48] flex items-center justify-center"><ArrowLeft size={18} color="#181818" /></button>
            <button className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center"><ArrowRight size={18} color="#B6FF48" /></button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto px-8 pb-20">
        <div className="bg-[#181818] border border-[#232323] rounded-2xl shadow-xl p-10 flex flex-col items-center text-center">
        </div>
      </section>
      {/* Products Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our <span className="text-[#B6FF48]">Products</span></h2>
          <p className="text-lg text-[#ededed]">Discover a range of comprehensive and customizable banking products at Mid Western Bank, designed to suit unique financial needs and aspirations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checking Accounts */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
            <div className="mb-4">
              <span className="inline-block w-12 h-12 rounded-full bg-[#B6FF48] flex items-center justify-center">
                {/* Placeholder icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#181818" /><path d="M8 12h8M12 8v8" stroke="#B6FF48" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Checking Accounts</h3>
            <p className="text-[#ededed]">Enjoy easy access to your funds with our range of checking accounts, online banking, debit cards, and free ATM access.</p>
          </div>
          {/* Savings Accounts */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
            <div className="mb-4">
              <span className="inline-block w-12 h-12 rounded-full bg-[#B6FF48] flex items-center justify-center">
                {/* Placeholder icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#181818" /><path d="M12 8v8M8 12h8" stroke="#B6FF48" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Savings Accounts</h3>
            <p className="text-[#ededed]">Build your savings with our interest rates, online tools, and flexible account options. See the impact of smart saving!</p>
          </div>
          {/* Loans and Mortgages */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
            <div className="mb-4">
              <span className="inline-block w-12 h-12 rounded-full bg-[#B6FF48] flex items-center justify-center">
                {/* Placeholder icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#181818" /><path d="M6 12h12" stroke="#B6FF48" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Loans and Mortgages</h3>
            <p className="text-[#ededed]">Access personal and business loans, flexible mortgage options, and expert guidance to help you reach your financial goals.</p>
          </div>
        </div>
      </section>
      {/* Use Cases Section - Figma Style with Toggle */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-20">
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Use <span className="text-[#B6FF48]">Cases</span>
          </h2>
          <p className="text-lg text-[#ededed] max-w-2xl">At YourBank, we cater to the diverse needs of individuals and businesses alike, offering a wide range of financial solutions.</p>
        </div>
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-bold shadow transition ${useCaseTab === 'individual' ? 'bg-[#B6FF48] text-[#181818]' : 'bg-[#232323] text-[#B6FF48]'}`}
            onClick={() => setUseCaseTab('individual')}
          >
            For Individuals
          </button>
          <button
            className={`px-6 py-2 rounded-full font-bold shadow transition ${useCaseTab === 'business' ? 'bg-[#B6FF48] text-[#181818]' : 'bg-[#232323] text-[#B6FF48]'}`}
            onClick={() => setUseCaseTab('business')}
          >
            For Businesses
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Gradient Card Background */}
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#B6FF48]/30 via-[#232323]/60 to-[#0a0a0a] blur-2xl z-0" />
            <div className="relative z-10 grid grid-cols-2 gap-6 p-8 bg-[#181818] border border-[#232323] rounded-2xl shadow-xl">
              {useCaseTab === 'individual' ? (
                <>
                  <div className="flex flex-col items-center text-center">
                    <Wallet size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Managing Personal Finances</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <PiggyBank size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Saving for the Future</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <LucideHome size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Homeownership</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <GraduationCap size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Education Funding</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center text-center">
                    <Banknote size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Cash Flow Management</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <TrendingUp size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Drive Business Expansion</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <LucideBriefcase size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Streamline Payroll Processing</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <CreditCard size={32} color="#B6FF48" />
                    <span className="text-white font-semibold mt-2">Payment Solutions</span>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Stats and Description */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {useCaseTab === 'individual' ? (
              <>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">For Individuals</h3>
                  <p className="text-[#ededed] mb-6">For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers.</p>
                  <div className="flex gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#B6FF48]">78%</span>
                      <span className="text-[#ededed] text-xs">Secure Retirement Planning</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#B6FF48]">63%</span>
                      <span className="text-[#ededed] text-xs">Manageable Debt Consolidation</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#B6FF48]">91%</span>
                      <span className="text-[#ededed] text-xs">Reducing financial burdens</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Learn More</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">For Business</h3>
                  <p className="text-[#ededed] mb-6">For businesses, we empower growth with working capital solutions that optimize cash flow, and our tailored financing options fuel business expansion. Whatever your financial aspirations, YourBank is committed to providing the right tools and support to achieve them.</p>
                  <div className="flex gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#B6FF48]">65%</span>
                      <span className="text-[#ededed] text-xs">Cash Flow Management</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#B6FF48]">70%</span>
                      <span className="text-[#ededed] text-xs">Drive Business Expansion</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#B6FF48]">45%</span>
                      <span className="text-[#ededed] text-xs">Streamline Payroll Processing</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Learn More</button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full bg-[#181818] border-t border-[#232323] py-10 mt-0">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            {/* Placeholder logo */}
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="16" fill="#B6FF48"/>
              <path d="M32 16L48 32L32 48L16 32L32 16Z" fill="#181818"/>
              <path d="M32 24L40 32L32 40L24 32L32 24Z" fill="#B6FF48"/>
            </svg>
            <span className="text-lg font-bold text-white tracking-tight">Mid Western Bank</span>
          </div>
          <nav className="flex gap-6 text-white text-sm font-medium mb-4 md:mb-0">
            <a href="#" className="hover:text-[#B6FF48] transition">Home</a>
            <a href="#" className="hover:text-[#B6FF48] transition">Careers</a>
            <a href="#" className="hover:text-[#B6FF48] transition">About</a>
            <a href="#" className="hover:text-[#B6FF48] transition">Security</a>
          </nav>
          <div className="text-[#ededed] text-xs text-center md:text-right">© 2025 Mid Western Bank. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
