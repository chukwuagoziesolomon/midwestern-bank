
"use client";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("neumannmabel001@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex">
      <Sidebar active="settings" />
      <div className="flex-1 flex flex-col items-center py-12">
        <div className="w-full max-w-2xl space-y-10">
          {/* Profile Info */}
          <div className="bg-[#232323]/80 rounded-2xl p-8 shadow-2xl border border-[#232323] mb-4">
            <h2 className="text-xl font-bold mb-6 text-[#B6FF48]">Profile</h2>
            <div className="flex flex-col gap-4">
              <label className="text-[#ededed]">Name
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" />
              </label>
              <label className="text-[#ededed]">Email
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" />
              </label>
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
