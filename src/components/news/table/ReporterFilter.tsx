"use client";

interface Reporter {
  id: string;
  firstName: string;
  lastName: string;
}

interface ReporterFilterProps {
  reporters: Reporter[];
  value: string;
  onChange: (value: string) => void;
}

export default function ReporterFilter({
  reporters,
  value,
  onChange,
}: ReporterFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    >
      <option value="">All Reporters</option>

      {reporters.map((reporter) => (
        <option
          key={reporter.id}
          value={reporter.id}
        >
          {reporter.firstName} {reporter.lastName}
        </option>
      ))}
    </select>
  );
}