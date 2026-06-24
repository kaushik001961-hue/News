
"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function LiveTV() {
  return (
    <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-black shadow-2xl">

      <div className="p-8">

        <div className="flex items-center gap-3">

          <motion.div
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="w-4 h-4 bg-white rounded-full"
          />

          <span className="text-white font-bold text-lg">
            LIVE TV
          </span>

        </div>

        <h2 className="text-white text-3xl font-bold mt-6">
          Watch AGS News Live
        </h2>

        <p className="text-red-100 mt-4 leading-7">
          Watch breaking news, live debates, exclusive interviews,
          and real-time updates from India and around the world.
        </p>

        <button className="mt-8 bg-white text-red-600 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition">

          <PlayCircle size={22} />

          Watch Live

        </button>

      </div>

    </section>
  );
}