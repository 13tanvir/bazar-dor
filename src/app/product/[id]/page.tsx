"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const productsData: Record<
  string,
  { name: string; category: string; price: number; unit: string; description: string; lastUpdated: string }
> = {
  "1": { name: "নাজিরশাইল চাল (Nazirshail Rice)", category: "চাল", price: 75, unit: "কেজি", description: "উচ্চমানের সুগন্ধি ও সরু নাজিরশাইল চাল। দৈনন্দিন খাবারের জন্য অত্যন্ত উপযোগী।", lastUpdated: "আজ সকাল ৯:০০ টা" },
  "2": { name: "মসুর ডাল (Lentils)", category: "ডাল", price: 130, unit: "কেজি", description: "দেশি পরিষ্কার ও দ্রুত সিদ্ধ হওয়া মসুর ডাল।", lastUpdated: "আজ সকাল ৮:৩০ টা" },
  "3": { name: "সয়াবিন তেল (Soybean Oil)", category: "তেল", price: 165, unit: "লিটার", description: "১০০% বিশুদ্ধ ফর্টিফাইড সয়াবিন তেল।", lastUpdated: "গতকাল সন্ধ্যা ৬:০০ টা" },
  "4": { name: "দেশি পেঁয়াজ (Local Onion)", category: "সবজি", price: 90, unit: "কেজি", description: "পাবনা ও ফরিদপুরের ফ্রেশ দেশি পেঁয়াজ।", lastUpdated: "আজ সকাল ১০:১৫ টা" },
  "5": { name: "আলু (Potato)", category: "সবজি", price: 55, unit: "কেজি", description: "বগুড়ার ফ্রেশ ডায়মন্ড আলু।", lastUpdated: "আজ সকাল ৭:৪৫ টা" },
  "6": { name: "মিনিকেট চাল (Minikit Rice)", category: "চাল", price: 68, unit: "কেজি", description: "ঝরঝরে ও ফ্রেশ পোলিশড মিনিকেট চাল।", lastUpdated: "আজ সকাল ৯:৩০ টা" },
};

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = authClient.useSession();
  const product = productsData[id];

  if (!product) {
    return (
      <div className="text-center py-16 bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">পণ্যটি পাওয়া যায়নি!</h2>
        <Link href="/" className="bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition inline-block">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition">
        <ArrowLeft className="w-4 h-4" />
        সকল পণ্যের তালিকায় ফিরে যান
      </Link>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full">
            {product.category}
          </span>
          <span className="text-xs text-slate-400">আপডেট: {product.lastUpdated}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">{product.name}</h1>
        <p className="text-3xl font-black text-emerald-700 mb-6">
          ৳{product.price} <span className="text-sm font-normal text-slate-500">/ {product.unit}</span>
        </p>

        <div className="border-t border-slate-100 pt-4 mb-6">
          <h3 className="font-semibold text-slate-800 mb-2">পণ্যের বিবরণ:</h3>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
        </div>

        {/* Dynamic Auth Section */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          {isPending ? (
            <p className="text-sm text-slate-500 animate-pulse">অথেন্টিকেশন তথ্য যাচাই হচ্ছে...</p>
          ) : session ? (
            <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>আপনি লগইন অবস্থায় আছেন। এই পণ্যের প্রটেক্টেড তথ্য দেখার অনুমতি রয়েছে।</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-700 text-sm font-medium">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <span>বিস্তারিত প্রাইস হিস্ট্রি দেখার জন্য লগইন করা প্রয়োজন।</span>
              </div>
              <Link
                href="/sign-in"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-1.5 rounded-lg text-sm transition"
              >
                লগইন করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}