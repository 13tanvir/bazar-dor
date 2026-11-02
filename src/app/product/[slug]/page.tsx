"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, Store } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function toBanglaDigit(num: number | string): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num ? num.toString().replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]) : "০";
}

// লোকাল ডামি ডাটাবেজ ব্যাকআপ (Requirement 4)
const productsDatabase: Record<string, {
  name: string;
  category: string;
  unit: string;
  image: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  markets: { name: string; location: string; price: number }[];
}> = {
  "swarnamachi-rice": {
    name: "স্বর্ণমাছি চাল",
    category: "চাল",
    unit: "কেজি",
    image: "🌾",
    description: "দৈনন্দিন খাওয়ার জন্য আদর্শ উচ্চমানের স্বর্ণমাছি চাল। বাজার দর পর্যালোচনা সাপেক্ষে দাম নির্ধারিত।",
    minPrice: 62,
    maxPrice: 68,
    avgPrice: 65,
    markets: [
      { name: "কারওয়ান বাজার", location: "ঢাকা", price: 64 },
      { name: "কাপ্তান বাজার", location: "ঢাকা", price: 65 },
      { name: "মোহাম্মদপুর টাউন হল", location: "ঢাকা", price: 66 },
    ],
  },
  "minikit-rice": {
    name: "মিনিকেট চাল",
    category: "চাল",
    unit: "কেজি",
    image: "🌾",
    description: "ঝরঝরে ও ফ্রেশ পোলিশড মিনিকেট চাল।",
    minPrice: 68,
    maxPrice: 75,
    avgPrice: 72,
    markets: [
      { name: "কারওয়ান বাজার", location: "ঢাকা", price: 70 },
      { name: "মিরপুর ১ নম্বর বাজার", location: "ঢাকা", price: 73 },
    ],
  },
  "hilsha-fish": {
    name: "ইলিশ মাছ",
    category: "মাছ",
    unit: "কেজি",
    image: "🐟",
    description: "পদ্মা ও মেঘনার সতেজ মাঝারি আকৃতির ইলিশ মাছ।",
    minPrice: 1250,
    maxPrice: 1450,
    avgPrice: 1350,
    markets: [
      { name: "যাত্রাবাড়ী আড়ৎ", location: "ঢাকা", price: 1300 },
      { name: "কারওয়ান বাজার", location: "ঢাকা", price: 1380 },
    ],
  },
  "onion": {
    name: "দেশি পেঁয়াজ",
    category: "সবজি",
    unit: "কেজি",
    image: "🧅",
    description: "পাবনা ও ফরিদপুরের টাটকা দেশি পেঁয়াজ।",
    minPrice: 88,
    maxPrice: 100,
    avgPrice: 95,
    markets: [
      { name: "শ্যামবাজার", location: "ঢাকা", price: 90 },
      { name: "কারওয়ান বাজার", location: "ঢাকা", price: 95 },
    ],
  },
  "potato": {
    name: "আলু",
    category: "সবজি",
    unit: "কেজি",
    image: "🥔",
    description: "বগুড়ার ফ্রেশ ডায়মন্ড আলু।",
    minPrice: 46,
    maxPrice: 54,
    avgPrice: 50,
    markets: [
      { name: "কারওয়ান বাজার", location: "ঢাকা", price: 48 },
      { name: "মিরপুর বাজার", location: "ঢাকা", price: 52 },
    ],
  },
  "egg": {
    name: "ফার্মের ডিম",
    category: "ডিম",
    unit: "ডজন",
    image: "🥚",
    description: "লাল ফার্মের তাজা ডিম।",
    minPrice: 145,
    maxPrice: 155,
    avgPrice: 150,
    markets: [
      { name: "কাপ্তান বাজার", location: "ঢাকা", price: 148 },
      { name: "তেজগাঁও ডিমের আড়ৎ", location: "ঢাকা", price: 150 },
    ],
  },
};

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: session, isPending } = authClient.useSession();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${slug}`);
        const data = await res.json();
        const item = data.data || data;

        if (item && (item.name || item.title)) {
          setProduct({
            name: item.name || item.title,
            category: item.category || "সাধারণ",
            unit: item.unit || "কেজি",
            image: item.image || item.emoji || "📦",
            description: item.description || "বাজারের আপডেট অনুযায়ী সতেজ ও গুণগত মানসম্পন্ন নিত্যপ্রয়োজনীয় পণ্য।",
            minPrice: item.min_price || (item.price ? item.price - 5 : 50),
            maxPrice: item.max_price || (item.price ? item.price + 10 : 70),
            avgPrice: item.price || 60,
            markets: item.markets || [
              { name: "কারওয়ান বাজার", location: "ঢাকা", price: item.price || 60 },
              { name: "কাপ্তান বাজার", location: "ঢাকা", price: (item.price || 60) + 2 },
              { name: "মিরপুর ১ নম্বর বাজার", location: "ঢাকা", price: (item.price || 60) - 1 }
            ]
          });
        } else {
          setProduct(productsDatabase[slug] || productsDatabase["swarnamachi-rice"]);
        }
      } catch (err) {
        setProduct(productsDatabase[slug] || productsDatabase["swarnamachi-rice"]);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center font-extrabold text-slate-500 animate-pulse">
        পণ্যের বিস্তারিত তথ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition">
        <ArrowLeft className="w-4 h-4" />
        হোম পেজে ফিরে যান
      </Link>

      {/* Main Product Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-start gap-4">
          <span className="text-5xl p-4 bg-slate-50 rounded-2xl border border-slate-100">{product.image}</span>
          <div className="space-y-1">
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{product.name}</h1>
            <p className="text-xs font-semibold text-slate-400">একক: প্রতি {product.unit}</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
          {product.description}
        </p>

        {/* Min / Max / Avg Price Grid */}
        <div className="grid grid-cols-3 gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-500">সর্বনিম্ন দাম</p>
            <p className="text-lg sm:text-xl font-black text-emerald-700">{toBanglaDigit(product.minPrice)} টাকা</p>
          </div>
          <div className="text-center border-x border-emerald-200/60">
            <p className="text-xs font-bold text-slate-500">গড় দাম</p>
            <p className="text-lg sm:text-xl font-black text-slate-900">{toBanglaDigit(product.avgPrice)} টাকা</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-500">সর্বোচ্চ দাম</p>
            <p className="text-lg sm:text-xl font-black text-red-600">{toBanglaDigit(product.maxPrice)} টাকা</p>
          </div>
        </div>

        {/* Protected Market Prices View */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" /> বাজারভিত্তিক আজকের দাম
          </h3>

          {isPending ? (
            <p className="text-sm text-slate-500 animate-pulse">অথেন্টিকেশন যাচাই হচ্ছে...</p>
          ) : session ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-100/60 px-3 py-1.5 rounded-lg mb-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>আপনি লগইন অবস্থায় আছেন। বাজারভিত্তিক দাম দৃশ্যমান:</span>
              </div>
              <div className="divide-y divide-slate-200">
                {product.markets.map((m: any, i: number) => (
                  <div key={i} className="py-2.5 flex justify-between items-center text-sm">
                    <div>
                      <p className="font-extrabold text-slate-800">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.location}</p>
                    </div>
                    <span className="font-black text-emerald-800 text-base">{toBanglaDigit(m.price)} টাকা/{product.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 text-xs sm:text-sm font-bold">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <span>বাজারভিত্তিক বিস্তারিত দর দেখার জন্য সাইন-ইন করা আবশ্যক।</span>
              </div>
              <Link
                href="/signin"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition shrink-0"
              >
                সাইন ইন করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}