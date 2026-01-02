import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TranslationProvider } from "@/lib/TranslationContext";
import { AuthProvider } from "@/lib/AuthContext";
import { LoadingProvider } from "@/lib/LoadingContext";
import GlobalLoader from "./components/GlobalLoader";
import LoadingInitializer from "./components/LoadingInitializer";
// GoogleTranslateLoader will be loaded in Navbar
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mid-Western Bank",
  description: "Your trusted financial partner",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <LoadingInitializer />
          <AuthProvider>
            <TranslationProvider>
              {children}
              <GlobalLoader />
            </TranslationProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
