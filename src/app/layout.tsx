"use client";

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current route is part of the admin/dashboard portal
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
    >
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>
          
          {/* Only show the Floating public navbar if NOT on dashboard pages */}
          {!isDashboard && <Navbar />}

          {/* Remove padding-top when inside the dashboard so layout sits flush */}
          <main className={cn("min-h-screen", !isDashboard && "pt-24")}>
            {children}
          </main>

          {/* Hide public footer on dashboard panels */}
          {!isDashboard && (
            <footer className="mt-20 border-t bg-white">
              <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg">AGS NEWS</h3>
                  <p className="text-sm text-gray-500">Digital News Platform</p>
                </div>
                <div className="text-sm text-gray-500 text-center">
                  © {new Date().getFullYear()} AGS News. All rights reserved.
                </div>
              </div>
            </footer>
          )}

          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}