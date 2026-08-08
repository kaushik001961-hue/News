"use client";

import { User } from "lucide-react";

interface Reporter {
  id: string;
  reporterId: string;
  firstName: string;
  lastName: string;
  designation?: string | null;
}

interface ReporterSelectProps {
  value: string;
  reporters: Reporter[];
  onChange: (value: string) => void;
}

export default function ReporterSelect({
  value,
  reporters,
  onChange,
}: ReporterSelectProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold">
          Reporter
        </h2>
      </div>

      {/* Body */}

      <div className="space-y-4 p-5">

        <label className="block text-sm font-medium">
          Assign Reporter
        </label>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="">
            -- Select Reporter --
          </option>

          {reporters.map((reporter) => (
            <option
              key={reporter.id}
              value={reporter.id}
            >
              {reporter.firstName} {reporter.lastName} ({reporter.reporterId})
            </option>
          ))}
        </select>

        {value && (
          <div className="rounded-xl bg-slate-50 p-4">
            {reporters
              .filter((r) => r.id === value)
              .map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <User className="text-blue-600" size={22} />
                  </div>

                  <div>
                    <p className="font-semibold">
                      {r.firstName} {r.lastName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {r.reporterId}
                    </p>

                    {r.designation && (
                      <p className="text-xs text-slate-400">
                        {r.designation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}