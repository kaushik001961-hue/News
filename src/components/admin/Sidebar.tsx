"use client";

import Link from "next/link";

const menus = [
  ["Dashboard", "/admin"],
  ["Posts", "/admin/posts"],
  ["Categories", "/admin/categories"],
  ["Reporters", "/admin/reporters"],
  ["Breaking News", "/admin/breaking"],
  ["Live TV", "/admin/live-tv"],
  ["Media Library", "/admin/media"],
  ["Users", "/admin/users"],
  ["Analytics", "/admin/analytics"],
  ["Settings", "/admin/settings"],
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-black mb-10">
        AGS NEWS
      </h1>

      <nav className="space-y-2">

        {menus.map(([title, link]) => (
          <Link
            key={title}
            href={link}
            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
          >
            {title}
          </Link>
        ))}

      </nav>

    </aside>
  );
}