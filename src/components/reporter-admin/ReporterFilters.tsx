"use client";

import { Search, RotateCcw, Plus, Download, Printer } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ReporterFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read current filters from the active URL search parameters
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const state = searchParams.get("state") ?? "";
  const district = searchParams.get("district") ?? "";

  // Update a URL search parameter and push router navigation
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname); // Navigates back to base URL, clearing all filters
  };

  const handleExport = () => {
    // Implement your export CSV logic here if needed
    console.log("Exporting CSV...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Top Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Reporter Filters</h2>
          <p className="mt-1 text-sm text-slate-500">Search and filter reporters</p>
        </div>

        <Link
          href="/reporter/register"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Reporter
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-8 grid gap-5 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search reporter..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="rounded-xl border border-slate-300 p-3"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        {/* State */}
        <input
          value={state}
          onChange={(e) => handleFilterChange("state", e.target.value)}
          placeholder="State"
          className="rounded-xl border border-slate-300 p-3"
        />

        {/* District */}
        <input
          value={district}
          onChange={(e) => handleFilterChange("district", e.target.value)}
          placeholder="District"
          className="rounded-xl border border-slate-300 p-3"
        />
      </div>

      {/* Bottom Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          <Download size={18} />
          Export CSV
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-black"
        >
          <Printer size={18} />
          Print
        </button>
      </div>
    </div>
  );
}