"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
  ];

  return (
    <header className="sticky top-0 z-50 px-4 pt-2">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[24px] bg-white/90 backdrop-blur-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="h-16 px-4 py-2 flex items-center justify-between">
            
            {/* Logo Link with Nested Rounded Image Container */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center p-1.5 h-11 w-36">
                <Image
                  src="/ags-logo.png"
                  alt="AGS NEWS"
                  width={140}
                  height={44}
                  priority
                  className="object-contain"
                />
              </div>

              <div className="hidden md:block">
                <h2 className="font-bold text-base leading-tight">AGS NEWS</h2>
                <p className="text-[10px] text-gray-500">
                  Digital News Platform
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition text-sm ${
                    pathname === item.href
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {!session ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-1.5 text-sm rounded-full border border-gray-300 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/reporter-register"
                    className="px-5 py-1.5 text-sm rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                 <Link
  href={
    session.user.role === "ADMIN"
      ? "/admin"
      : session.user.role === "EDITOR"
      ? "/editor"
      : "/reporter"
  }
                    className="px-5 py-1.5 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-5 py-1.5 text-sm rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="lg:hidden mt-2 rounded-2xl bg-white shadow-xl border p-5 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}