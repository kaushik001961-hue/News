
"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
export default function LiveTV() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-black text-white rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        <span className="font-semibold text-red-400">
          LIVE TV
        </span>
      </div>

      <h3 className="text-2xl font-bold mt-4">
        AGS News Live
      </h3>

      <p className="text-gray-400 mt-3">
        Watch breaking news coverage
      </p>

      <button className="mt-6 bg-red-600 px-6 py-3 rounded-full hover:bg-red-700">
        Watch Now
      </button>
    </div>
  );
}