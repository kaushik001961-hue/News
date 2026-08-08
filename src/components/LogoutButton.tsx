"use client";

import { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: ReactNode;
  className?: string;
}

export default function LogoutButton({ children, className }: LogoutButtonProps) {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  const defaultClassName =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg";

  return (
    <button
      onClick={handleLogout}
      className={className || defaultClassName}
    >
      {children ?? (
        <>
          <LogOut size={18} />
          <span>Logout</span>
        </>
      )}
    </button>
  );
}