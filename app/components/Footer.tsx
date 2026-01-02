import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#181818] border-t border-[#232323] py-10 mt-0">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Image src="/logo.png" alt="Mid Western Bank Logo" width={48} height={48} />
          <span className="text-lg font-bold text-white tracking-tight">Mid Western Bank</span>
        </div>

        <nav className="flex gap-6 text-white text-sm font-medium mb-4 md:mb-0">
          <a href="#" className="hover:text-blue-400 transition">Home</a>
          <a href="#" className="hover:text-blue-400 transition">Careers</a>
          <a href="#" className="hover:text-blue-400 transition">About</a>
          <a href="#" className="hover:text-blue-400 transition">Security</a>
        </nav>

        <div className="text-gray-400 text-xs text-center md:text-right">© 2025 Mid Western Bank. All rights reserved.</div>
      </div>
     
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-[#ededed] gap-2">
        <span>Mid Western Bank. All Rights Reserved.</span>
        <span>Privacy Policy | Terms of Service</span>
      </div>
    </footer>
  );
}