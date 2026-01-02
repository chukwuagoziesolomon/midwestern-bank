"use client";

import Image from "next/image";
import { ShieldCheck, KeyRound, Smartphone, Eye, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Security() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Header/Navbar */}
      <Navbar active="security" />
      {/* Hero Section */}
      <section className="w-full flex justify-center pt-10 pb-16">
        <div className="max-w-5xl w-full bg-white border border-blue-100 rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Security is Our <span className="text-blue-600">Top Priority</span>
            </h1>
            <p className="text-gray-700 mb-4">At YourBank, we understand the importance of securing your financial information. We actively invest in security innovations and advanced technologies to protect your personal and financial data. Rest assured that when you bank with us, your security is our utmost priority.</p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/security-hero.jpg" alt="Security Hero" width={320} height={180} className="rounded-xl object-cover" />
          </div>
        </div>
      </section>
      {/* How We Protect You Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">How We <span className="text-blue-600">Protect You</span></h2>
        <p className="text-gray-700 mb-8">At YourBank, we prioritize the security and confidentiality of your financial information. Our state-of-the-art encryption technology and stringent data protection measures ensure your assets and transactions are safeguarded at all times.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Secure Online Banking Platform */}
          <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow flex flex-col items-center">
            <ShieldCheck size={32} color="#0000FF" />
            <h3 className="text-lg font-bold mt-2 mb-1">Secure Online Banking Platform</h3>
            <p className="text-gray-700 text-sm text-center">Our online banking platform is built with multiple layers of security to safeguard your information. We utilize industry-standard encryption protocols to ensure that your data remains confidential and protected during transmission.</p>
          </div>
          {/* Multi-Factor Authentication */}
          <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow flex flex-col items-center">
            <KeyRound size={32} color="#0000FF" />
            <h3 className="text-lg font-bold mt-2 mb-1">Multi-Factor Authentication</h3>
            <p className="text-gray-700 text-sm text-center">To enhance the security of your online banking experience, we require multi-factor authentication. This additional layer of security requires you to provide multiple pieces of identification, such as a password and a one-time verification code, to access your account.</p>
          </div>
          {/* Fraud Monitoring */}
          <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow flex flex-col items-center">
            <Eye size={32} color="#0000FF" />
            <h3 className="text-lg font-bold mt-2 mb-1">Fraud Monitoring</h3>
            <p className="text-gray-700 text-sm text-center">We have sophisticated fraud detection systems in place to monitor your accounts for any suspicious activities. Our dedicated team works around the clock to detect and prevent unauthorized transactions, providing you with peace of mind.</p>
          </div>
          {/* Secure Mobile Banking */}
          <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow flex flex-col items-center">
            <Smartphone size={32} color="#0000FF" />
            <h3 className="text-lg font-bold mt-2 mb-1">Secure Mobile Banking</h3>
            <p className="text-gray-700 text-sm text-center">Our mobile banking app is designed with the same level of security as our online banking platform. You can confidently access your accounts, make transactions, and manage your finances on the go, knowing that your information is protected.</p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2"><span className="text-blue-600">Frequently</span> Asked Questions</h2>
        <p className="text-gray-700 mb-8">Still have any questions? Contact our team via support@yourbank.com</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ 1 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-black mb-2">How does YourBank protect my online banking information?</h3>
            <p className="text-gray-700 text-sm">We use advanced encryption, multi-factor authentication, and continuous monitoring to protect your online banking information. Our systems are regularly updated to defend against the latest security threats.</p>
          </div>
          {/* FAQ 2 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-black mb-2">What should I do if I suspect fraudulent activity on my account?</h3>
            <p className="text-gray-700 text-sm">If you notice any suspicious transactions or believe your account has been compromised, contact our support team immediately. We will investigate and take necessary actions to secure your account.</p>
          </div>
          {/* FAQ 3 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-black mb-2">How can I create a strong password for my account?</h3>
            <p className="text-gray-700 text-sm">Use a combination of uppercase and lowercase letters, numbers, and special characters. Avoid using easily guessed information like birthdays or names. Change your password regularly for added security.</p>
          </div>
          {/* FAQ 4 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow">
            <h3 className="text-base font-bold text-black mb-2">Does YourBank offer protection against phishing scams?</h3>
            <p className="text-gray-700 text-sm">Yes, we educate our customers about phishing and never ask for sensitive information via email or phone. If you receive suspicious communications, report them to us immediately.</p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition">Load All FAQs →</button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
