"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

import {
  LayoutDashboard,
  Newspaper,
  Users,
  FolderTree,
  Megaphone,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Globe,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface DashboardUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role?: string;
  user?: DashboardUser;
}

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  roles: string[];
}

/* =========================================================
   NAVIGATION
========================================================= */

const navigation: NavItem[] = [
  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard size={20} />,
    roles: ["ADMIN"],
  },

  // =====================================================
  // EDITOR DASHBOARD
  // =====================================================

  {
    label: "Dashboard",
    href: "/editor",
    icon: <LayoutDashboard size={20} />,
    roles: ["EDITOR"],
  },

  // =====================================================
  // NEWS
  // =====================================================

  {
    label: "News",
    href: "/admin/news",
    icon: <Newspaper size={20} />,
    roles: ["ADMIN"],
  },

  {
    label: "News",
    href: "/editor/news",
    icon: <Newspaper size={20} />,
    roles: ["EDITOR"],
  },

  // =====================================================
  // REPORTERS
  // =====================================================

  {
    label: "Reporters",
    href: "/admin/reporters",
    icon: <Users size={20} />,
    roles: ["ADMIN"],
  },

  {
    label: "Reporters",
    href: "/editor/reporters",
    icon: <Users size={20} />,
    roles: ["EDITOR"],
  },

  // =====================================================
  // CATEGORIES
  // =====================================================

  {
    label: "Categories",
    href: "/admin/categories",
    icon: <FolderTree size={20} />,
    roles: ["ADMIN"],
  },

  {
    label: "Categories",
    href: "/editor/categories",
    icon: <FolderTree size={20} />,
    roles: ["EDITOR"],
  },

  // =====================================================
  // ADVERTISEMENTS
  // =====================================================

  {
    label: "Advertisements",
    href: "/admin/advertisements",
    icon: <Megaphone size={20} />,
    roles: ["ADMIN"],
  },

  {
    label: "Advertisements",
    href: "/editor/advertisements",
    icon: <Megaphone size={20} />,
    roles: ["EDITOR"],
  },

  // =====================================================
  // ANALYTICS
  // =====================================================

  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 size={20} />,
    roles: ["ADMIN"],
  },

  {
    label: "Analytics",
    href: "/editor/analytics",
    icon: <BarChart3 size={20} />,
    roles: ["EDITOR"],
  },

  // =====================================================
  // SETTINGS
  // =====================================================

  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings size={20} />,
    roles: ["ADMIN"],
  },

  {
    label: "Settings",
    href: "/editor/settings",
    icon: <Settings size={20} />,
    roles: ["EDITOR"],
  },
];
/* =========================================================
   DASHBOARD LAYOUT
========================================================= */

export default function DashboardLayout({
  children,
  role,
  user,
}: DashboardLayoutProps) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* =======================================================
     CURRENT ROLE
  ======================================================= */

  const currentRole =
    role || user?.role || "ADMIN";

  /* =======================================================
     FILTER NAVIGATION BY ROLE
  ======================================================= */

  const items = navigation.filter((item) =>
    item.roles.includes(currentRole)
  );

  /* =======================================================
     ACTIVE MENU
  ======================================================= */

  function isActive(href: string) {
    /*
     * Admin dashboard
     */
    if (href === "/admin") {
      return pathname === "/admin";
    }

    /*
     * Editor dashboard
     */
    if (href === "/editor") {
      return pathname === "/editor";
    }

    /*
     * Other pages
     */
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  /* =======================================================
     USER DISPLAY
  ======================================================= */

  const displayName =
    user?.name?.trim() ||
    (currentRole === "EDITOR"
      ? "Editor"
      : "Admin");

  const displayEmail =
    user?.email?.trim() ||
    (currentRole === "EDITOR"
      ? "editor@news.com"
      : "admin@news.com");

  const panelTitle =
    currentRole === "EDITOR"
      ? "Editor Panel"
      : "Admin Panel";

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0)
      )
      .join("")
      .toUpperCase() || "A";

  /* =======================================================
     LOGOUT
  ======================================================= */

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-xl
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">

          <Link
            href={
              currentRole === "EDITOR"
                ? "/editor"
                : "/admin"
            }
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-black text-white shadow-lg">
              A
            </div>

            <div>

              <div className="text-lg font-black tracking-tight text-slate-900">
                AGS NEWS
              </div>

              <div className="text-xs font-medium text-slate-500">
                {panelTitle}
              </div>

            </div>

          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1">

            {items.map((item) => {

              const active =
                isActive(item.href);

              return (
                <Link
                  key={`${currentRole}-${item.href}`}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-semibold
                    transition-all
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `}
                >

                  {/* ICON BOX */}

                  <span
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-all
                      ${
                        active
                          ? "bg-white/20 text-white shadow-sm"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {/* LABEL */}

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {/* ACTIVE ARROW */}

                  {active && (
                    <ChevronRight
                      size={16}
                      className="text-white/80"
                    />
                  )}

                </Link>
              );
            })}

          </div>

          {/* =================================================
              WEBSITE
          ================================================= */}

          <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Website
          </p>

          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-slate-200">
              <Globe size={18} />
            </span>

            <span>
              View Website
            </span>

          </Link>

        </nav>

        {/* =================================================
            SIDEBAR LOGOUT
        ================================================= */}

        <div className="border-t border-slate-200 p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl border border-red-200 bg-white px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <LogOut size={18} />
            </span>

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* ===================================================
          MAIN AREA
      =================================================== */}

      <div className="lg:pl-72">

        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                setMobileOpen(true)
              }
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>

            <div>

              <p className="text-sm font-bold text-slate-900">
                {panelTitle}
              </p>

              <p className="text-xs text-slate-400">
                AGS NEWS
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            {/* USER NAME */}

            <div className="hidden text-right sm:block">

              <p className="text-sm font-bold text-slate-900">
                {displayName}
              </p>

              <p className="text-xs text-slate-500">
                {displayEmail}
              </p>

            </div>

            {/* AVATAR */}

            {user?.image ? (

              <img
                src={user.image}
                alt={displayName}
                className="h-10 w-10 rounded-full object-cover"
              />

            ) : (

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
                {initials}
              </div>

            )}

            {/* TOP RIGHT LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >

              <LogOut size={17} />

              <span className="hidden sm:inline">
                Logout
              </span>

            </button>

          </div>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}