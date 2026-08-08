"use client";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";

export default function UserMenu() {
  const { data: session } = useSession();

  // Get dynamic name and role (fallbacks provided for initial render)
  const userName = session?.user?.name || "Editor";
  const userRole = (session?.user as any)?.role || "EDITOR";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-3.5 py-1.5 bg-white shadow-sm">
      {/* Circle Icon Badge */}
      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-inner">
        {userInitial}
      </div>

      {/* Dynamic Name & Role */}
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold text-gray-900 leading-tight">
          {userName}
        </span>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          {userRole}
        </span>
      </div>
    </div>
  );
}