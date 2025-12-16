
"use client";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("neumannmabel001@gmail.com");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex flex-col md:flex-row">
      {/* Sidebar for desktop, overlay for mobile */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
        <div className="relative z-50 w-64 h-full">
          <Sidebar active="settings" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      <div className="hidden md:block">
        <Sidebar active="settings" />
      </div>
      <div className="flex-1 flex flex-col items-center py-12">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-[#232323] border border-[#B6FF48] rounded-full p-2 shadow-lg focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B6FF48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-full max-w-2xl space-y-10">
          {/* Profile Info */}
          <div className="bg-[#232323]/80 rounded-2xl p-8 shadow-2xl border border-[#232323] mb-4">
            <h2 className="text-xl font-bold mb-6 text-[#B6FF48]">Profile</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#B6FF48] bg-[#181818]">
                  <img src={profilePic ?? '/mission.jpg'} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <label className="mt-3 flex items-center gap-3 text-sm">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setProfilePic(URL.createObjectURL(file));
                    }}
                    className="hidden"
                    id="profile-upload"
                  />
                  <button className="px-3 py-2 rounded-lg bg-[#B6FF48] text-[#181818] text-sm" onClick={() => document.getElementById('profile-upload')?.click()}>Upload</button>
                  <button className="px-3 py-2 rounded-lg bg-[#232323] border border-[#3a3a3a] text-sm text-[#fff]" onClick={() => setProfilePic(null)}>Reset</button>
                </label>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col gap-4">
                  <label className="text-[#ededed]">Name
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" />
                  </label>
                  <label className="text-[#ededed]">Email
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Update Password */}
          <div className="bg-[#232323]/80 rounded-2xl p-8 shadow-2xl border border-[#232323] mb-4">
            <h2 className="text-xl font-bold mb-2 text-[#B6FF48]">Update Password</h2>
            <p className="text-[#ededed] mb-6">Ensure your account is using a long, random password to stay secure.</p>
            <div className="flex flex-col gap-4">
              <label className="text-[#ededed]">Current Password
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" />
              </label>
              <label className="text-[#ededed]">New Password
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" />
              </label>
              <label className="text-[#ededed]">Confirm Password
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" />
              </label>
              <button className="w-32 mt-4 px-6 py-2 rounded-lg bg-[#B6FF48] text-[#181818] font-bold text-lg shadow-lg hover:bg-[#d6ff8a] transition self-end">Save</button>
            </div>
          </div>
          {/* Two Factor Authentication */}
          <div className="bg-[#232323]/80 rounded-2xl p-8 shadow-2xl border border-[#232323]">
            <h2 className="text-xl font-bold mb-2 text-[#B6FF48]">Two Factor Authentication</h2>
            <p className="text-[#ededed] mb-6">Add additional security to your account using two factor authentication.</p>
            <button className="w-48 px-6 py-2 rounded-lg bg-[#B6FF48] text-[#181818] font-bold text-lg shadow-lg hover:bg-[#d6ff8a] transition">Enable 2FA</button>
          </div>
        </div>
      </div>
    </div>
  );
}
