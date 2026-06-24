
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Search, Sun, Moon } from "lucide-react";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  const menus = [
    "India",
    "World",
    "Politics",
    "Business",
    "Sports",
    "Technology",
    "Entertainment",
  ];

  return (

    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/90 shadow-lg"
          : "bg-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto">

        <div className="mx-4 mt-4 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl">

          <div className="flex items-center justify-between h-20 px-8">

            {/* Logo */}

<Link href="/" className="flex items-center">

  <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg border border-gray-200 bg-white flex items-center justify-center">

    <Image
      src="/ags-logo.png"
      alt="AGS News"
      width={56}
      height={56}
      className="object-cover w-full h-full"
      priority
    />

  </div>

  <div className="ml-3">

    <h2 className="font-bold text-2xl text-slate-900">
      AGS NEWS
    </h2>

    <p className="text-gray-500 text-sm">
      Digital News Platform
    </p>

  </div>

</Link>


            {/* Desktop Menu */}

            <nav className="hidden lg:flex items-center gap-8">

              {menus.map((menu) => (

                <Link
                  key={menu}
                  href={`/category/${menu.toLowerCase()}`}
                  className="text-gray-700 hover:text-red-600 transition font-medium"
                >
                  {menu}
                </Link>

              ))}

            </nav>

            {/* Right Icons */}

            <div className="hidden lg:flex items-center gap-5">

              <button className="hover:text-red-600 transition">

                <Search size={20} />

              </button>

              <button className="hover:text-red-600 transition">

                <Sun size={20} />

              </button>

              <Link
                href="/login"
                className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-full"
              >
                Login
              </Link>

            </div>

            {/* Mobile */}

            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="lg:hidden"
            >

              <Menu size={28} />

            </button>

          </div>

        </div>

        {mobileOpen && (

          <div className="lg:hidden mt-4 mx-4 rounded-3xl bg-white shadow-xl p-6">

            <div className="flex flex-col gap-5">

              {menus.map((menu) => (

                <Link
                  key={menu}
                  href={`/category/${menu.toLowerCase()}`}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  {menu}
                </Link>

              ))}

              <Link
                href="/login"
                className="bg-red-600 text-center text-white rounded-full py-3"
              >
                Login
              </Link>

            </div>

          </div>

        )}

      </div>

    </header>

  );

}
