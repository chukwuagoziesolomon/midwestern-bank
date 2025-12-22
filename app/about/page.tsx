"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Header/Navbar */}
      <Navbar active="about" />
      {/* Hero Section */}
      <section className="w-full flex justify-center pt-10 pb-16">
        <div className="max-w-5xl w-full bg-white border border-blue-100 rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="block text-sm text-gray-700 mb-2">Welcome to YourBank</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Where Banking Meets <span className="text-blue-600">Excellence!</span>
            </h1>
            <p className="text-gray-700 mb-4">At YourBank, we believe that banking should be more than just transactions. It should be an experience that empowers individuals and businesses to thrive and reach their financial goals. As a trusted financial institution, we are committed to delivering exceptional banking services that go beyond expectations. With a focus on innovation, personalized solutions, and unwavering integrity, we strive to provide the best banking experience for our valued customers. Join us on this exciting journey and discover a new level of banking excellence.</p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/about-hero.png" alt="Bank Team" width={320} height={180} className="rounded-xl object-cover" />
          </div>
        </div>
      </section>
      {/* Mission & Vision Section */}
      <section className="w-full max-w-5xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Mission & Vision</h2>
        <p className="text-gray-700 mb-8">We envision to be a leader in the industry, driven by innovation, integrity, and inclusivity, creating a brighter financial future for individuals and businesses while making a strong commitment to customer satisfaction and community development.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow flex flex-col items-center">
            <Image src="/mission.jpg" alt="Mission" width={180} height={120} className="rounded-xl object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2 text-blue-600">Mission</h3>
            <p className="text-gray-700 text-sm text-center">At YourBank, our mission is to empower our customers to achieve financial success. We are dedicated to delivering innovative banking solutions that cater to their unique needs. Through personalized services, smart digital tools, and long-term relationships, we aim to build strong, trusting relationships with our customers. Our mission is to be their trusted partner, helping them navigate their financial journey and realize their dreams.</p>
          </div>
          {/* Vision Card */}
          <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow flex flex-col items-center">
            <Image src="/vision.jpg" alt="Vision" width={180} height={120} className="rounded-xl object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2 text-blue-600">Vision</h3>
            <p className="text-gray-700 text-sm text-center">Our vision at YourBank is to redefine banking by creating a seamless and personalized experience for our customers. We envision a future where banking is accessible, transparent, and tailored to individual preferences. Through continuous innovation and collaboration, we strive to be at the forefront of the industry, setting new standards for customer-centric banking. Our vision is to be the preferred financial institution, known for our unwavering commitment to excellence, trust, and customer satisfaction.</p>
          </div>
        </div>
      </section>
      {/* Press Releases Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Press Releases</h2>
        <p className="text-gray-700 mb-8">Stay updated with the latest happenings and exciting developments at YourBank through our press releases.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow flex flex-col">
            <Image src="/press1.jpg" alt="Press 1" width={320} height={180} className="rounded-xl object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction</h3>
            <div className="flex gap-4 text-xs text-blue-600 mb-2">
              <span>Location: India</span>
              <span>Date: 03/13/2024</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program will include benefits, discounts, and personalized offers tailored to individual customer preferences. With this initiative, YourBank reaffirms its commitment to building exceptional value and building lasting relationships with our valued customers.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow flex flex-col">
            <Image src="/press2.jpg" alt="Press 2" width={320} height={180} className="rounded-xl object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">YourBank Expands Branch Network with Opening of New Location in Chennai</h3>
            <div className="flex gap-4 text-xs text-blue-600 mb-2">
              <span>Location: India</span>
              <span>Date: 12/11/2024</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">YourBank is excited to announce the inaugural opening of our newest branch in Chennai. This expansion is a testament to our continued commitment to serving our customers and providing them with world-class banking services. The new branch will feature state-of-the-art facilities, a team of dedicated professionals, and a personalized approach to banking, further strengthening our presence in the local community.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow flex flex-col">
            <Image src="/press3.jpg" alt="Press 3" width={320} height={180} className="rounded-xl object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">YourBank Partners with Local Nonprofit to Support Financial Education Initiatives</h3>
            <div className="flex gap-4 text-xs text-blue-600 mb-2">
              <span>Location: India</span>
              <span>Date: 24/12/2024</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainability principles into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.</p>
          </div>
          {/* Card 4 */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow flex flex-col">
            <Image src="/press4.jpg" alt="Press 4" width={320} height={180} className="rounded-xl object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility</h3>
            <div className="flex gap-4 text-xs text-blue-600 mb-2">
              <span>Location: India</span>
              <span>Date: 28/12/2024</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainability principles into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.</p>
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
