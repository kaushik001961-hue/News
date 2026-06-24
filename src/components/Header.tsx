
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
    <header className="sticky top-4 z-50 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="rounded-[24px] bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200">

          <div className="h-18 px-6 py-3 flex items-center justify-between">

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <Image
                src="/ags-logo.png"
                alt="AGS NEWS"
                width={160}
                height={53}
                priority
              />

              <div className="hidden md:block">
                <h2 className="font-bold text-xl">
                  AGS NEWS
                </h2>

                <p className="text-xs text-gray-500">
                  Digital News Platform
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}

            <nav className="hidden lg:flex items-center gap-8">

              {navItems.map((item) => (

                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition
                  ${
                    pathname === item.href
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </Link>

              ))}

            </nav>

            {/* Desktop Buttons */}

            <div className="hidden lg:flex items-center gap-3">

              {!session && (

                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-full border"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2 rounded-full bg-red-600 text-white"
                  >
                    Register
                  </Link>
                </>

              )}

              {session && (

                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="px-5 py-2 rounded-full bg-red-600 text-white"
                >
                  Logout
                </button>

              )}

            </div>

            {/* Mobile Hamburger */}

            <button
              className="lg:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>

          </div>

        </div>

        {/* Mobile Menu */}

        {open && (

          <div className="lg:hidden mt-3 rounded-3xl bg-white shadow-xl border">

            <div className="flex flex-col p-6 gap-5">

              {navItems.map((item) => (

                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-medium"
                >
                  {item.name}
                </Link>

              ))}

              <hr />

              {!session && (

                <>
                  <Link
                    href="/login"
                    className="border rounded-full py-2 text-center"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-full bg-red-600 text-white py-2 text-center"
                  >
                    Register
                  </Link>
                </>

              )}

              {session && (

                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="rounded-full bg-red-600 text-white py-2"
                >
                  Logout
                </button>

              )}

            </div>

          </div>

        )}

      </div>

    </header>
  );
}
