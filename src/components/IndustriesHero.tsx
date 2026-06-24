"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IndustriesHero() {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-950">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10" />

      <div className="absolute w-96 h-96 bg-blue-500/20 blur-[140px] rounded-full -top-24 -left-24" />
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full bottom-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase tracking-[4px] text-blue-500 text-sm"
        >
          INDUSTRIES WE SERVE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-7xl font-bold mt-6"
        >
          IT Solutions Tailored
          <br />
          For Every Industry
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mt-8 text-slate-400 text-xl"
        >
          From banking and healthcare to manufacturing and e-commerce,
          Catalyst Solution delivers secure, scalable and reliable IT infrastructure.
        </motion.p>

        <div className="flex justify-center gap-5 mt-12">

          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl flex items-center gap-2 transition"
          >
            Talk To Experts
            <ArrowRight size={18} />
          </Link>

          <Link
            href="#industries"
            className="border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-xl hover:border-blue-500 transition"
          >
            Explore Industries
          </Link>

        </div>

      </div>

    </section>
  );
}