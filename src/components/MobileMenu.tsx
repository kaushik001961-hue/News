
"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function MobileMenu({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {

  const { data: session } = useSession();

  return (

    <div
      className={`fixed inset-0 z-[100] transition ${
        open
          ? "visible"
          : "invisible"
      }`}
    >

      <div
        className="absolute inset-0 bg-black/50"
        onClick={close}
      />

      <div
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="p-6">

          <button
            onClick={close}
            className="mb-8"
          >
            <X />
          </button>

          <div className="flex flex-col gap-6 text-lg">

            <Link href="/">Home</Link>

            <Link href="/category/politics">
              Politics
            </Link>

            <Link href="/category/business">
              Business
            </Link>

            <Link href="/category/sports">
              Sports
            </Link>

            <Link href="/category/technology">
              Technology
            </Link>

          </div>

          <div className="mt-10">

            {!session && (
              <div className="space-y-4">

                <Link href="/login">
                  Login
                </Link>

                <Link href="/register">
                  Register
                </Link>

              </div>
            )}

            {session && (

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Logout
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}
