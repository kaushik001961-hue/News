
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AGS News",
  description: "Apple-style modern digital news portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        inter.variable
      )}
    >
      <body className="bg-gray-50 text-gray-900 antialiased">

        <Providers>

          {/* Floating Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="pt-24 min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-20 border-t bg-white">

            <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">

              <div>

                <h3 className="font-bold text-lg">
                  AGS NEWS
                </h3>

                <p className="text-sm text-gray-500">
                  Digital News Platform
                </p>

              </div>

              <div className="text-sm text-gray-500 text-center">

                © {new Date().getFullYear()} AGS News.
                All rights reserved.

              </div>

            </div>

          </footer>

          <Toaster
            richColors
            position="top-right"
          />

        </Providers>

      </body>
    </html>
  );
}
