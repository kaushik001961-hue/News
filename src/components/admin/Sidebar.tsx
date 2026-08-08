"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FolderTree,
  Users,
  Tv,
  ImageIcon,
  BarChart3,
  Settings,
  ClipboardCheck,
  FileText,
  UserCircle,
  BadgeCheck,
  BellRing,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  const isEditor = pathname.startsWith("/editor");
  const isReporter = pathname.startsWith("/reporter");

  const adminMenus = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Posts",
      href: "/admin/posts",
      icon: Newspaper,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
    },
    {
      title: "Reporters",
      href: "/admin/reporters",
      icon: Users,
    },
    {
      title: "Live TV",
      href: "/admin/live-tv",
      icon: Tv,
    },
    {
      title: "Media Library",
      href: "/admin/media",
      icon: ImageIcon,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const editorMenus = [
    {
      title: "Dashboard",
      href: "/editor",
      icon: LayoutDashboard,
    },
    {
      title: "My Posts",
      href: "/editor/post",
      icon: Newspaper,
    },
    {
      title: "Review Queue",
      href: "/editor/review",
      icon: ClipboardCheck,
    },
  ];

  const reporterMenus = [
    {
      title: "Dashboard",
      href: "/reporter",
      icon: LayoutDashboard,
    },
    {
      title: "My Stories",
      href: "/reporter/posts",
      icon: FileText,
    },
    {
      title: "Press Card",
      href: "/reporter/press-card",
      icon: BadgeCheck,
    },
    {
      title: "Profile",
      href: "/reporter/profile",
      icon: UserCircle,
    },
    {
      title: "Notifications",
      href: "/reporter/notifications",
      icon: BellRing,
    },
  ];

  const menus = isAdmin
    ? adminMenus
    : isEditor
    ? editorMenus
    : reporterMenus;

  const panelTitle = isAdmin
    ? "Admin Panel"
    : isEditor
    ? "Editor Panel"
    : "Reporter Panel";

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col bg-slate-900 text-white shadow-2xl">
      {/* Logo */}

      <div className="border-b border-slate-800 px-8 py-8">
        <h1 className="text-3xl font-black tracking-wide">
          AGS NEWS
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {panelTitle}
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AGS NEWS CMS
      </div>
    </aside>
  );
}