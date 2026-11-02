"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Tag } from "lucide-react";

// ডামি বাজার দর ডাটা
const initialProducts = [
  { id: "1", name: "নাজিরশাইল চাল (Nazirshail Rice)", category: "চাল", price: 75, unit: "কেজি", change: "up", changeAmount: 2 },
  { id: "2", name: "মসুর ডাল (Lentils)", category: "ডাল", price: 130, unit: "কেজি", change: "down", changeAmount: 5 },
  { id: "3", name: "সয়াবিন তেল (Soybean Oil)", category: "তেল", price: 165, unit: "লিটার", change: "none", changeAmount: 0 },
  { id: "4", name: "দেশি পেঁয়াজ (Local Onion)", category: "সবজি", price: 90, unit: "কেজি", change: "up", changeAmount: 10 },
  { id: "5", name: "আলু (Potato)", category: "সবজি", price: 55, unit: "কেজি", change: "down", changeAmount: 3 },
  { id: "6", name: "মিনিকেট চাল (Minikit Rice)", category: "চাল", price: 68, unit: "কেজি", change: "none", changeAmount: 0 },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"default" | "low-to-high" | "high-to-low">("default");

  const categories = ["all", "চাল", "ডাল", "তেল", "সবজি"];

  // Category Filtering Logic
  const filteredProducts = selectedCategory === "all"
    ? initialProducts
    : initialProducts.filter((p) => p.category === selectedCategory);

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-emerald-800 text-white rounded-2xl p-6 sm:p-10 shadow-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          আজকের বাজার দর (Bazar Dor)
        </h1>
        <p className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base">
          বাংলাদেশের নিত্যপ্রয়োজনীয় দ্রব্যের বর্তমান বাজার দর পর্যবেক্ষণ করুন এবং সঠিক দামে কেনাকাটা করুন।
        </p>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-emerald-700 hidden sm:block" />
          <span className="text-sm font-semibold text-slate-700 mr-1">ক্যাটাগরি:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category === "all" ? "সব পণ্য" : category}
            </button>
          ))}
        </div>

        {/* Price Sorting Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-emerald-700" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "default" | "low-to-high" | "high-to-low")}
            className="w-full sm:w-auto bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="default">ডিফল্ট ক্রমানুসারে</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
                {product.change === "up" && (
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    ↑ ৳{product.changeAmount} বৃদ্ধি
                  </span>
                )}
                {product.change === "down" && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    ↓ ৳{product.changeAmount} হ্রাস
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-slate-800 mb-1">{product.name}</h3>
              <p className="text-2xl font-black text-emerald-800 my-2">
                ৳{product.price} <span className="text-xs font-normal text-slate-500">/ {product.unit}</span>
              </p>
            </div>

            {/* Dynamic Link matching src/app/product/[id]/page.tsx */}
            <Link
              href={`/product/${product.id}`}
              className="mt-4 w-full bg-slate-900 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition text-center text-sm block"
            >
              বিস্তারিত দেখুন
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
