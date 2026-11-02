"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Megaphone, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles,
  Minus
} from "lucide-react";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  change: "up" | "down" | "none";
  changeAmount: number;
  changePercent: number;
  image?: string;
  description?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"default" | "low-to-high" | "high-to-low">("default");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
        const data = await res.json();
        if (data.status || data.success) {
          setProducts(data.data || data.products || []);
        } else {
          // Fallback mock data matching API contract
          setProducts(getFallbackProducts());
        }
      } catch (err) {
        setProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const topRisers = products.filter((p) => p.change === "up").slice(0, 6);
  const topFallers = products.filter((p) => p.change === "down").slice(0, 6);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Ticker / Marquee Notice */}
      <div className="bg-amber-500 text-slate-900 rounded-xl px-4 py-2.5 flex items-center gap-3 overflow-hidden shadow-sm font-medium">
        <div className="flex items-center gap-1.5 bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider">
          <Megaphone className="w-3.5 h-3.5" />
          <span>লাইভ টিঙ্কার</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="inline-block animate-marquee text-sm font-semibold">
            📢 আজকের বাজার দর: পেঁয়াজ ও রসুনের দাম ঊর্ধ্বমুখী ▲ • মসুর ডাল ও আলুর দাম নিম্নমুখী ▼ • সঠিক দর জেনে কেনাকাটা করুন!
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-emerald-700/30">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> বাজার দর ট্র্যাকার
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            সঠিক বাজার দর জানুন, <br />
            <span className="text-emerald-400">স্মার্ট বাজেটে কেনাকাটা করুন!</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            বাংলাদেশের স্থানীয় নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের হালনাগাদ দরদাম ও ট্রেন্ড দেখুন এক ক্লিকে।
          </p>
          <a
            href="#সব-পণ্য"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg text-sm mt-2"
          >
            <ShoppingBag className="w-4 h-4" /> সব পণ্য দেখুন
          </a>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 font-semibold animate-pulse">
          বাজার দর লোড হচ্ছে...
        </div>
      ) : (
        <>
          {/* Section A — আজ দাম বেড়েছে ▲ */}
          {topRisers.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-red-100 pb-2">
                <TrendingUp className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-black text-slate-800">আজ দাম বেড়েছে ▲</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topRisers.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* Section B — আজ দাম কমেছে ▼ */}
          {topFallers.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                <TrendingDown className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-black text-slate-800">আজ দাম কমেছে ▼</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topFallers.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* Section C — সব পণ্য */}
          <section id="সব-পণ্য" className="scroll-mt-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider mr-1">ক্যাটাগরি:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-emerald-700 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat === "all" ? "🛍️ সব পণ্য" : cat}
                  </button>
                ))}
              </div>

              {/* Sorting Challenge C1 */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <ArrowUpDown className="w-4 h-4 text-emerald-700 shrink-0" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "default" | "low-to-high" | "high-to-low")}
                  className="w-full md:w-auto bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="default">সাজান: ডিফল্ট</option>
                  <option value="low-to-high">দাম: কম থেকে বেশি</option>
                  <option value="high-to-low">দাম: বেশি থেকে কম</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:border-emerald-200 transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100">
            {product.image || "📦"}
          </span>
          {product.change === "up" && (
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              ▲ {product.changePercent}%
            </span>
          )}
          {product.change === "down" && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              ▼ {product.changePercent}%
            </span>
          )}
          {product.change === "none" && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              — 0.0%
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
          {product.category}
        </span>
        <h3 className="font-bold text-lg text-slate-800 mt-2">{product.name}</h3>
        <p className="text-xs text-slate-500 mt-1">প্রতি {product.unit}</p>
        <div className="my-3 flex items-baseline gap-1">
          <span className="text-xs text-slate-400">আজকের দাম:</span>
          <span className="text-2xl font-black text-slate-900">৳{product.price}</span>
        </div>
      </div>
      <Link
        href={`/product/${product.slug || product.id}`}
        className="mt-2 w-full bg-slate-900 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition text-center text-sm block"
      >
        বিস্তারিত দেখুন
      </Link>
    </div>
  );
}

function getFallbackProducts(): Product[] {
  return [
    { id: "1", slug: "nazirshail-rice", name: "নাজিরশাইল চাল", category: "চাল", price: 75, unit: "কেজি", change: "up", changeAmount: 2, changePercent: 2.7, image: "🌾" },
    { id: "2", slug: "lentils", name: "মসুর ডাল", category: "ডাল", price: 130, unit: "কেজি", change: "down", changeAmount: 5, changePercent: 3.7, image: "🍲" },
    { id: "3", slug: "soybean-oil", name: "সয়াবিন তেল", category: "তেল", price: 165, unit: "লিটার", change: "none", changeAmount: 0, changePercent: 0, image: "🍾" },
    { id: "4", slug: "local-onion", name: "দেশি পেঁয়াজ", category: "সবজি", price: 90, unit: "কেজি", change: "up", changeAmount: 10, changePercent: 12.5, image: "🧅" },
    { id: "5", slug: "potato", name: "আলু", category: "সবজি", price: 55, unit: "কেজি", change: "down", changeAmount: 3, changePercent: 5.1, image: "🥔" },
    { id: "6", slug: "minikit-rice", name: "মিনিকেট চাল", category: "চাল", price: 68, unit: "কেজি", change: "none", changeAmount: 0, changePercent: 0, image: "🌾" },
  ];
}