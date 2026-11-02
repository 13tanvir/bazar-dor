"use client";

import Link from "next/link";

const allProducts = [
  { id: "1", name: "নাজিরশাইল চাল (Nazirshail Rice)", category: "চাল", price: 75, unit: "কেজি" },
  { id: "2", name: "মসুর ডাল (Lentils)", category: "ডাল", price: 130, unit: "কেজি" },
  { id: "3", name: "সয়াবিন তেল (Soybean Oil)", category: "তেল", price: 165, unit: "লিটার" },
  { id: "4", name: "দেশি পেঁয়াজ (Local Onion)", category: "সবজি", price: 90, unit: "কেজি" },
  { id: "5", name: "আলু (Potato)", category: "সবজি", price: 55, unit: "কেজি" },
  { id: "6", name: "মিনিকেট চাল (Minikit Rice)", category: "চাল", price: 68, unit: "কেজি" },
];

export default function ProductsListPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-emerald-800">সকল পণ্যের তালিকা</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product) => (
          <div key={product.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full">{product.category}</span>
              <h3 className="font-bold text-lg mt-2 text-slate-800">{product.name}</h3>
              <p className="text-xl font-extrabold text-emerald-700 my-2">৳{product.price} / {product.unit}</p>
            </div>
            <Link 
              href={`/product/${product.id}`} 
              className="mt-4 bg-slate-900 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-center text-sm block transition"
            >
              বিস্তারিত দেখুন
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}