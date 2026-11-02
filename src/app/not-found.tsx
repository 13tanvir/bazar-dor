import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <h1 className="text-6xl font-black text-emerald-800">৪০৪</h1>
      <h2 className="text-2xl font-bold text-slate-800">পেজটি পাওয়া যায়নি!</h2>
      <p className="text-slate-500 max-w-md">
        আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল লেখা হয়েছে।
      </p>
      <Link
        href="/"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}