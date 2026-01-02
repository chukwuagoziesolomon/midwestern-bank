
"use client";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

export default function Settings() {
   const { user } = useAuth();
   const [userData, setUserData] = useState<any>(null);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [profilePic, setProfilePic] = useState<string | null>(null);
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [sidebarOpen, setSidebarOpen] = useState(false);

   useEffect(() => {
     if (user) {
       fetchUserData();
     }
   }, [user]);

   const fetchUserData = async () => {
     if (!user) return;
 
     try {
       const response = await apiClient.getSettings(user.id);
       if (response.data) {
         setUserData(response.data);
       }
     } catch (error) {
       console.error('Error fetching user data:', error);
     }
   };

   const handlePasswordChange = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!user) return;

     setError("");
     setSuccess("");

     if (newPassword !== confirmPassword) {
       setError("New passwords do not match");
       return;
     }

     try {
       const response = await apiClient.updatePassword({
         user_id: user.id,
         current_password: currentPassword,
         new_password: newPassword,
         confirm_password: confirmPassword,
       });

       if (response.error) {
         setError(response.error);
       } else {
         setSuccess("Password changed successfully!");
         setCurrentPassword("");
         setNewPassword("");
         setConfirmPassword("");
       }
     } catch (err) {
       setError("An unexpected error occurred");
     }
   };

   return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col md:flex-row">
      {/* Sidebar for desktop, overlay for mobile */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
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
          className="md:hidden fixed top-4 left-4 z-50 bg-white border border-blue-600 rounded-full p-2 shadow-lg focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-full max-w-2xl space-y-10">
          {/* Profile Info */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 mb-4">
            <h2 className="text-xl font-bold mb-6 text-blue-600">Profile</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-600 bg-blue-50">
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
                  <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm" onClick={() => document.getElementById('profile-upload')?.click()}>Upload</button>
                  <button className="px-3 py-2 rounded-lg bg-white border border-blue-600 text-sm text-blue-600" onClick={() => setProfilePic(null)}>Reset</button>
                </label>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col gap-4">
                  <label className="text-gray-700">Name
                    <input
                      type="text"
                      value={userData ? `${userData.first_name} ${userData.last_name}` : ''}
                      readOnly
                      className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-100 border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                    />
                  </label>
                  <label className="text-gray-700">Email
                    <input
                      type="email"
                      value={userData?.email || ''}
                      readOnly
                      className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-100 border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Update Password */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 mb-4">
            <h2 className="text-xl font-bold mb-2 text-blue-600">Update Password</h2>
            <p className="text-gray-700 mb-6">Ensure your account is using a long, random password to stay secure.</p>
            <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
              <label className="text-gray-700">Current Password
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                  required
                />
              </label>
              <label className="text-gray-700">New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                  required
                />
              </label>
              <label className="text-gray-700">Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                  required
                />
              </label>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <button
                type="submit"
                className="w-32 mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-500 transition self-end disabled:opacity-50"
              >
                Save
              </button>
            </form>
          </div>
          {/* Two Factor Authentication */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-blue-600">Two Factor Authentication</h2>
            <p className="text-gray-700 mb-6">Add additional security to your account using two factor authentication.</p>
            <button className="w-48 px-6 py-2 rounded-lg bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-500 transition">Enable 2FA</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
