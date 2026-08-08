
"use client";

import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20">

      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-red-600 via-red-700 to-slate-900 shadow-2xl">

        {/* Background Blur */}

        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-8 py-20">

          <div className="flex justify-center mb-6">

            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">

              <Mail className="text-white" size={30} />

            </div>

          </div>

          <h2 className="text-white text-4xl lg:text-5xl font-bold">

            Stay Updated

          </h2>

          <p className="text-red-100 mt-6 text-lg max-w-2xl mx-auto">

            Get breaking news, exclusive stories, and daily headlines
            delivered directly to your inbox.

          </p>

          <form className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full md:w-[420px] px-6 py-4 rounded-full outline-none text-slate-700"
            />

            <button
              type="submit"
              className="bg-white text-red-600 font-bold px-8 py-4 rounded-full hover:scale-105 transition"
            >
              Subscribe
            </button>

          </form>

          <p className="mt-6 text-red-100 text-sm">

            No spam. Unsubscribe anytime.

          </p>

        </div>

      </div>

    </section>
  );
}
