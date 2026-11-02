import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম ট্র্যাকিং ওয়েবসাইট",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geist.className} antialiased bg-slate-50 text-slate-800 min-h-screen flex flex-col`}
      >
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}