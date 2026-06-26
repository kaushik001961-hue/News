"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Bell, CloudSun } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
const pathname = usePathname();
const { data: session } = useSession();
const [open, setOpen] = useState(false);

const navItems = [
{ name: "Home", href: "/" },
{ name: "Politics", href: "/category/politics" },
{ name: "Business", href: "/category/business" },
{ name: "Sports", href: "/category/sports" },
{ name: "Technology", href: "/category/technology" },
{ name: "World", href: "/category/world" },
];

return ( <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">

  <div className="max-w-7xl mx-auto px-4">

    <div className="h-20 flex items-center justify-between gap-6">

      {/* Logo */}

      <Link href="/" className="flex items-center gap-3">
        <div className="relative h-12 w-36 rounded-xl overflow-hidden bg-[#0b1329]">
         <Image
  src="/ags-logo.png"
  alt="AGS NEWS"
  fill
  priority
  sizes="144px"
  className="object-contain p-1"
/>
        </div>

        <div className="hidden md:block">
          <h2 className="font-bold text-xl">
            AGS NEWS
          </h2>

          <p className="text-xs text-gray-500">
            Digital News Platform
          </p>
        </div>
      </Link>

      {/* Search */}

      <div className="hidden lg:flex flex-1 max-w-xl">

        <div className="relative w-full">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search news..."
            className="w-full h-12 rounded-full bg-slate-100 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>

      </div>

      {/* Navigation */}

      <nav className="hidden xl:flex items-center gap-6">

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              pathname === item.href
                ? "text-red-600 font-semibold"
                : "text-gray-700 hover:text-red-600 transition"
            }
          >
            {item.name}
          </Link>
        ))}

      </nav>

      {/* Right Side */}

      <div className="hidden lg:flex items-center gap-4">

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CloudSun size={18} />
          <span>32°C</span>
        </div>

        <button className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-600 rounded-full" />
        </button>

        {!session ? (
          <>
            <Link
              href="/login"
              className="px-4 py-2 border rounded-full"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-5 py-2 bg-red-600 text-white rounded-full"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-5 py-2 bg-red-600 text-white rounded-full"
          >
            Logout
          </button>
        )}

      </div>

      {/* Mobile Menu */}

      <button
        className="lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

    </div>

  </div>

  {/* Trending Categories Row */}

  <div className="hidden lg:block border-t bg-slate-50">

    <div className="max-w-7xl mx-auto px-4">

      <div className="h-12 flex items-center gap-6 text-sm">

        <span className="font-bold text-red-600">
          Trending:
        </span>

        <Link href="#">Elections</Link>
        <Link href="#">Stock Market</Link>
        <Link href="#">IPL</Link>
        <Link href="#">AI</Link>
        <Link href="#">Startups</Link>

      </div>

    </div>

  </div>

</header>

);
}
