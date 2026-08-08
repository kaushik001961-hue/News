"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/ags-logo.png"
                alt="AGS News"
                width={60}
                height={60}
                className="rounded-full bg-white p-1"
              />

              <div>
                <h2 className="font-bold text-2xl">
                  AGS NEWS
                </h2>

                <p className="text-gray-400 text-sm">
                  Digital News Platform
                </p>
              </div>
            </div>

            <p className="text-gray-400 mt-6">
              Delivering trusted journalism across politics,
              business, sports and technology.
            </p>
          </div>

          <div>

            <h3 className="font-bold mb-5">
              Categories
            </h3>

            <div className="space-y-2">

              <Link href="/category/politics">Politics</Link><br />
              <Link href="/category/business">Business</Link><br />
              <Link href="/category/sports">Sports</Link><br />
              <Link href="/category/technology">Technology</Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-5">
              Quick Links
            </h3>

            <div className="space-y-2">

              <Link href="/">Home</Link><br />
              <Link href="/latest">Latest</Link><br />
              <Link href="/contact">Contact</Link><br />
              <Link href="/privacy">Privacy Policy</Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-3">

              <div className="bg-slate-800 rounded-full p-3 hover:bg-red-600 cursor-pointer">
                <FaFacebookF />
              </div>

              <div className="bg-slate-800 rounded-full p-3 hover:bg-red-600 cursor-pointer">
                <FaInstagram />
              </div>

              <div className="bg-slate-800 rounded-full p-3 hover:bg-red-600 cursor-pointer">
                <FaXTwitter />
              </div>

              <div className="bg-slate-800 rounded-full p-3 hover:bg-red-600 cursor-pointer">
                <FaYoutube />
              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-500">

          © {new Date().getFullYear()} AGS News. All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}