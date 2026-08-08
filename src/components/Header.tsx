"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Globe, Bell, Settings, LogOut } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();

  const userName = session?.user?.name || "User";
  const userRole = session?.user?.role || "USER";
  const userImage = session?.user?.image;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-end gap-4">
      {/* Website Link */}
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        <Globe size={16} />
        Website
      </Link>

      {/* Notifications Button */}
      <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 relative transition">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* Settings Icon */}
      <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 transition">
        <Settings size={18} />
      </button>

      {/* User Badge with Dynamic Image Display */}
      <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-3.5 py-1.5 bg-white shadow-sm">
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            {userInitial}
          </div>
        )}

        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-900 leading-tight">
            {userName}
          </span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {userRole}
          </span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition cursor-pointer"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}