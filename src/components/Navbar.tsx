"use client";

import Link from "next/link";
import { ShoppingBag, User, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <nav className="bg-emerald-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <ShoppingBag className="w-6 h-6" />
            <span>বাজার দর</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link href="/" className="hover:text-emerald-200 transition">
              হোম
            </Link>
            <Link href="/products" className="hover:text-emerald-200 transition">
              পণ্য তালিকা
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <span className="text-sm animate-pulse">লোডিং...</span>
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-1 bg-emerald-800 px-3 py-1.5 rounded-lg text-sm hover:bg-emerald-900 transition"
                >
                  <User className="w-4 h-4" />
                  <span>{session.user.name || "প্রোফাইল"}</span>
                </Link>
                <button
                  onClick={() => authClient.signOut()}
                  className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-in"
                  className="flex items-center gap-1 bg-white text-emerald-800 font-semibold px-4 py-1.5 rounded-lg text-sm hover:bg-emerald-50 transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>সাইন ইন</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}