"use client";

import Image from "next/image";
import { ShieldCheck, KeyRound, Smartphone, Eye, Lock } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Security() {
  return (
    <div className="min-h-screen bg-[#181818] font-sans text-white">
      {/* Header/Navbar */}
      <Navbar active="security" />
      {/* Hero Section */}
      <section className="w-full flex justify-center pt-10 pb-16">
        <div className="max-w-5xl w-full bg-[#232323] border border-[#232323] rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Security is Our <span className="text-[#B6FF48]">Top Priority</span>
            </h1>
            <p className="text-[#ededed] mb-4">At YourBank, we understand the importance of securing your financial information. We actively invest in security innovations and advanced technologies to protect your personal and financial data. Rest assured that when you bank with us, your security is our utmost priority.</p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/security-hero.jpg" alt="Security Hero" width={320} height={180} className="rounded-xl object-cover" />
          </div>
        </div>
      </section>
      {/* How We Protect You Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">How We <span className="text-[#B6FF48]">Protect You</span></h2>
        <p className="text-[#ededed] mb-8">At YourBank, we prioritize the security and confidentiality of your financial information. Our state-of-the-art encryption technology and stringent data protection measures ensure your assets and transactions are safeguarded at all times.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Secure Online Banking Platform */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-8 shadow flex flex-col items-center">
            <ShieldCheck size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Secure Online Banking Platform</h3>
            <p className="text-[#ededed] text-sm text-center">Our online banking platform is built with multiple layers of security to safeguard your information. We utilize industry-standard encryption protocols to ensure that your data remains confidential and protected during transmission.</p>
          </div>
          {/* Multi-Factor Authentication */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-8 shadow flex flex-col items-center">
            <KeyRound size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Multi-Factor Authentication</h3>
            <p className="text-[#ededed] text-sm text-center">To enhance the security of your online banking experience, we require multi-factor authentication. This additional layer of security requires you to provide multiple pieces of identification, such as a password and a one-time verification code, to access your account.</p>
          </div>
          {/* Fraud Monitoring */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-8 shadow flex flex-col items-center">
            <Eye size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Fraud Monitoring</h3>
            <p className="text-[#ededed] text-sm text-center">We have sophisticated fraud detection systems in place to monitor your accounts for any suspicious activities. Our dedicated team works around the clock to detect and prevent unauthorized transactions, providing you with peace of mind.</p>
          </div>
          {/* Secure Mobile Banking */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-8 shadow flex flex-col items-center">
            <Smartphone size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Secure Mobile Banking</h3>
            <p className="text-[#ededed] text-sm text-center">Our mobile banking app is designed with the same level of security as our online banking platform. You can confidently access your accounts, make transactions, and manage your finances on the go, knowing that your information is protected.</p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2"><span className="text-[#B6FF48]">Frequently</span> Asked Questions</h2>
        <p className="text-[#ededed] mb-8">Still have any questions? Contact our team via support@yourbank.com</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ 1 */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-white mb-2">How do I open an account with YourBank?</h3>
            <p className="text-[#ededed] text-sm">Opening an account with YourBank is easy. Simply visit our website and click on the 'Open an Account' button. Fill out the required details, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.</p>
          </div>
          {/* FAQ 2 */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-white mb-2">What documents do I need to provide to apply for a loan?</h3>
            <p className="text-[#ededed] text-sm">The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver's license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process.</p>
          </div>
          {/* FAQ 3 */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-white mb-2">How can I access my accounts online?</h3>
            <p className="text-[#ededed] text-sm">Accessing your accounts online is simple and secure. Visit our website and click on the 'Login' button. Enter your username and password to access your accounts. If you haven't registered for online banking, click on the 'Sign Up' button. If you need assistance, our customer support team is available to guide you.</p>
          </div>
          {/* FAQ 4 */}
          <div className="bg-[#232323] border border-[#232323] rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-white mb-2">Are my transactions and personal information secure?</h3>
            <p className="text-[#ededed] text-sm">At YourBank, we prioritize the security of your transactions and personal information. We employ industry-leading encryption protocols and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place.</p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Load All FAQs →</button>
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
