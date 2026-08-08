"use client";

import Link from "next/link";
import { Download, Plus, Users } from "lucide-react";

export default function ReporterHeader() {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}

      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
          <Users size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reporters
          </h1>

          <p className="mt-2 text-slate-500">
            Manage reporter registrations, approvals, ID cards and
            account status.
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium transition hover:bg-slate-100">
          <Download size={18} />
          Export Excel
        </button>

        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium transition hover:bg-slate-100">
          <Download size={18} />
          Export PDF
        </button>

        <Link
          href="/admin/reporters/create"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          Add Reporter
        </Link>
      </div>
    </div>
  );
}