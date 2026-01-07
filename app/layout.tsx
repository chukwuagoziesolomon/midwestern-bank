import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TranslationProvider } from "@/lib/TranslationContext";
import { AuthProvider } from "@/lib/AuthContext";
import { LoadingProvider } from "@/lib/LoadingContext";
import GlobalLoader from "./components/GlobalLoader";
import LoadingInitializer from "./components/LoadingInitializer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Mid-Western Bank | Secure Digital Banking Solutions",
  description: "Experience secure, innovative digital banking with Mid-Western Bank. Open accounts, manage finances, and access 24/7 customer support.",
  keywords: ["banking", "digital banking", "checking accounts", "savings accounts", "financial services", "secure banking"],
  authors: [{ name: "Mid-Western Bank" }],
  creator: "Mid-Western Bank",
  metadataBase: new URL("https://midwesternbank.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://midwesternbank.com",
    siteName: "Mid-Western Bank",
    title: "Mid-Western Bank | Secure Digital Banking Solutions",
    description: "Experience secure, innovative digital banking with Mid-Western Bank. Open accounts, manage finances, and access 24/7 customer support.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Mid-Western Bank Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mid-Western Bank | Secure Digital Banking Solutions",
    description: "Experience secure, innovative digital banking with Mid-Western Bank",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://midwesternbank.com",
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
              <ErrorBoundary>
                {children}
                <GlobalLoader />
              </ErrorBoundary>
            </TranslationProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
