
"use client";

import { UserCircle } from "lucide-react";

export default function UserMenu() {

  return (

    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">

      <UserCircle
        size={22}
        className="text-gray-700"
      />

    </button>

  );

}
