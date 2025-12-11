"use client";
import { Briefcase, HeartPulse, PiggyBank, Users, Award, ShieldCheck, CheckCircle, HelpCircle, Star } from "lucide-react";
import Image from "next/image";

export default function Careers() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      {/* Header/Navbar */}
      <header className="w-full flex justify-center pt-8 pb-2">
        <div className="flex items-center justify-between w-full max-w-5xl px-8 py-4 rounded-2xl bg-[#181818] border border-[#232323] shadow-lg">
          <div className="flex items-center gap-3">
            <span className="inline-block w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center">
              <Briefcase size={28} color="#181818" />
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">YourBank</span>
          </div>
          <nav className="hidden md:flex gap-8 text-white text-base font-medium">
            <a href="#" className="hover:text-[#B6FF48] transition">Home</a>
            <a href="#" className="hover:text-[#B6FF48] transition">Careers</a>
            <a href="#" className="hover:text-[#B6FF48] transition">About</a>
            <a href="#" className="hover:text-[#B6FF48] transition">Security</a>
          </nav>
          <div className="flex gap-3">
            <button className="hidden md:inline-block px-6 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#B6FF48] hover:text-black transition">Sign Up</button>
            <button className="px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Login</button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="w-full flex justify-center pt-10 pb-16">
        <div className="max-w-4xl w-full bg-[#181818] border border-[#232323] rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to <span className="text-[#B6FF48]">YourBank</span> Careers!
            </h1>
            <p className="text-[#ededed] mb-4">Join a team and embark on a rewarding journey in the fast-evolving banking industry. We are committed to fostering a culture of excellence, innovation, and customer-centricity. We offer exciting career prospects, market-leading compensation, and a supportive work environment. Discover the future of banking.</p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/career-hero.jpg" alt="Career Hero" width={320} height={180} className="rounded-xl object-cover" />
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Our <span className="text-[#B6FF48]">Values</span></h2>
        <p className="text-[#ededed] mb-8">Our values form the foundation of our organization and guide our decisions. We believe in integrity, collaboration, customer centricity, and innovation.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <ShieldCheck size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Integrity</h3>
            <p className="text-[#ededed] text-sm text-center">We act with honesty, transparency, and ethical conduct in all we do.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <Users size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Collaboration</h3>
            <p className="text-[#ededed] text-sm text-center">We foster a collaborative work environment where teamwork is valued.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <Award size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Customer Centricity</h3>
            <p className="text-[#ededed] text-sm text-center">We put our customers first and strive to exceed their expectations.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <Star size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Innovation</h3>
            <p className="text-[#ededed] text-sm text-center">We embrace change and seek creative solutions for tomorrow's challenges.</p>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Our <span className="text-[#B6FF48]">Benefits</span></h2>
        <p className="text-[#ededed] mb-8">We care for employees and provide benefits designed to support their well-being and professional growth.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <Briefcase size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Competitive Compensation</h3>
            <p className="text-[#ededed] text-sm text-center">We offer a competitive salary package and rewards for excellence.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <HeartPulse size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Health and Wellness</h3>
            <p className="text-[#ededed] text-sm text-center">We prioritize health and wellness with comprehensive plans and resources.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <PiggyBank size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Retirement Planning</h3>
            <p className="text-[#ededed] text-sm text-center">We support retirement planning to help employees prepare for the future.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col items-center">
            <CheckCircle size={32} color="#B6FF48" />
            <h3 className="text-lg font-bold mt-2 mb-1">Work-Life Balance</h3>
            <p className="text-[#ededed] text-sm text-center">We value work-life balance and offer flexible arrangements.</p>
          </div>
        </div>
      </section>
      {/* Job Openings Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Job <span className="text-[#B6FF48]">Openings</span></h2>
        <p className="text-[#ededed] mb-8">Explore exciting job openings and join our team where we value talent, innovation, and a passion for customer service.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Relationship Manager */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col">
            <h3 className="text-lg font-bold mb-2">Relationship Manager</h3>
            <p className="text-[#ededed] text-sm mb-2">Location: India | Department: Retail Banking</p>
            <h4 className="text-[#B6FF48] font-bold mb-1">About This Job</h4>
            <p className="text-[#ededed] text-sm mb-2">Build strong relationships with customers, understand their needs, and provide solutions. Drive sales and ensure delivery of exceptional customer service.</p>
            <h4 className="text-[#B6FF48] font-bold mb-1">Requirements & Qualifications</h4>
            <ul className="text-[#ededed] text-sm mb-4 list-disc list-inside">
              <li>Bachelor's degree in Business, Finance, or a related field</li>
              <li>2+ years of experience in relationship management or sales</li>
              <li>Proven track record of meeting and exceeding sales targets</li>
              <li>Excellent interpersonal and communication skills</li>
              <li>Strong knowledge of banking products and services</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Apply Now</button>
          </div>
          {/* Risk Analyst */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col">
            <h3 className="text-lg font-bold mb-2">Risk Analyst</h3>
            <p className="text-[#ededed] text-sm mb-2">Location: India | Department: Risk Management</p>
            <h4 className="text-[#B6FF48] font-bold mb-1">About This Job</h4>
            <p className="text-[#ededed] text-sm mb-2">Analyze risks, identify and evaluate risk factors, and develop strategies to mitigate risks. Prepare reports and support risk management processes.</p>
            <h4 className="text-[#B6FF48] font-bold mb-1">Requirements & Qualifications</h4>
            <ul className="text-[#ededed] text-sm mb-4 list-disc list-inside">
              <li>Bachelor's degree in Finance, Economics, or a related field</li>
              <li>2+ years of experience in risk management or a similar role</li>
              <li>Analytical mindset and problem-solving skills</li>
              <li>Strong organizational and attention-to-detail skills</li>
              <li>Excellent written and verbal communication skills</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Apply Now</button>
          </div>
          {/* IT Security Specialist */}
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow flex flex-col">
            <h3 className="text-lg font-bold mb-2">IT Security Specialist</h3>
            <p className="text-[#ededed] text-sm mb-2">Location: India | Department: Information Technology</p>
            <h4 className="text-[#B6FF48] font-bold mb-1">About This Job</h4>
            <p className="text-[#ededed] text-sm mb-2">Ensure the security of our bank's information systems. Evaluate, implement, and monitor security protocols and risk mitigation strategies.</p>
            <h4 className="text-[#B6FF48] font-bold mb-1">Requirements & Qualifications</h4>
            <ul className="text-[#ededed] text-sm mb-4 list-disc list-inside">
              <li>Bachelor's degree in Computer Science, Information Security, or a related field</li>
              <li>2+ years of experience in IT security or a similar role</li>
              <li>In-depth knowledge of network security best practices and technologies</li>
              <li>Familiarity with cyber frameworks such as PCI DSS and GDPR</li>
              <li>Professional IT certifications such as CISSP or CISM are preferred</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Apply Now</button>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2"><span className="text-[#B6FF48]">Frequently</span> Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">How do I open an account with YourBank?</h3>
            </div>
            <p className="text-[#ededed] text-sm">Open an account with us. Simply visit our website and click on the 'Open Account' button. Fill out the required details and provide necessary documentation. For any assistance, our customer support team is available to help.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">What documents do I need to provide to apply for a loan?</h3>
            </div>
            <p className="text-[#ededed] text-sm">The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification, proof of income, and other relevant documents. Our team will guide you through the specific requirements during the application process.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">How can I access my accounts online?</h3>
            </div>
            <p className="text-[#ededed] text-sm">Access your accounts online by visiting our website and clicking on the 'Login' button. Enter your credentials to securely view your account information, make transactions, and manage your finances.</p>
          </div>
          <div className="bg-[#181818] border border-[#232323] rounded-2xl p-6 shadow">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} color="#B6FF48" />
              <h3 className="text-lg font-bold text-white">Are my transactions and personal information secure?</h3>
            </div>
            <p className="text-[#ededed] text-sm">At YourBank, the security of your transactions and personal information is our top priority. We employ advanced security measures and encryption to safeguard your data.</p>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <button className="px-6 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#B6FF48] hover:text-black transition">Load All FAQs →</button>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto px-8 pb-20">
        <div className="bg-[#181818] border border-[#232323] rounded-2xl shadow-xl p-10 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Career with <span className="text-[#B6FF48]">YourBank</span> today!</h2>
          <p className="text-lg text-[#ededed] mb-6">Launch your career and discover your potential with our career page for strategic skills, internships, and opportunities at YourBank. We’re excited to see you grow and thrive in our workplace.</p>
          <button className="px-8 py-3 rounded-full bg-[#B6FF48] text-black font-bold text-lg shadow-lg hover:bg-[#d6ff8a] transition">Open Account</button>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full bg-[#181818] border-t border-[#232323] py-10 mt-0">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <span className="inline-block w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center">
              <Briefcase size={28} color="#181818" />
            </span>
            <span className="text-lg font-bold text-white tracking-tight">YourBank</span>
          </div>
          <nav className="flex gap-6 text-white text-sm font-medium mb-4 md:mb-0">
            <a href="#" className="hover:text-[#B6FF48] transition">Home</a>
            <a href="#" className="hover:text-[#B6FF48] transition">Careers</a>
            <a href="#" className="hover:text-[#B6FF48] transition">About</a>
            <a href="#" className="hover:text-[#B6FF48] transition">Security</a>
          </nav>
          <div className="text-[#ededed] text-xs text-center md:text-right">© 2025 YourBank. All rights reserved.</div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <a href="#" className="w-8 h-8 rounded-full bg-[#B6FF48] flex items-center justify-center"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#181818" /></svg></a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#B6FF48] flex items-center justify-center"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#181818" /></svg></a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#B6FF48] flex items-center justify-center"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#181818" /></svg></a>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-[#ededed] gap-2">
          <span>YourBank. All Rights Reserved.</span>
          <span>Privacy Policy | Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
