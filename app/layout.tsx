import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const machina = localFont({ src: [{ path: "../public/fonts/NeueMachina-Regular.woff2", weight: "400" }, { path: "../public/fonts/NeueMachina-Ultrabold.woff2", weight: "800" }], variable: "--font-machina", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL("https://academy.twomindsengine.com"),
  title: "Two Minds Academy — Build it. Secure it.",
  description: "Learn development and cybersecurity with Two Minds. Practical learning paths for beginners, university students, graduates, and experienced builders.",
  alternates: { canonical: "/" },
  openGraph: { title: "Two Minds Academy — Build it. Secure it.", description: "Two disciplines. One stronger future. Find your path in development and cybersecurity.", type: "website", locale: "en_US", siteName: "Two Minds Academy" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className={machina.variable}><body>{children}</body></html>; }
