"use client";

interface Props {
  status?: string | null;
}

export default function StatusBadge({
  status,
}: Props) {
  const value = status ?? "PENDING";

  const color =
    value === "APPROVED"
      ? "bg-green-600 text-white"
      : value === "PENDING"
      ? "bg-yellow-400 text-black"
      : value === "BLOCKED"
      ? "bg-red-600 text-white"
      : "bg-slate-700 text-white";

  return (
    <span
      className={`rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-[0.18em] ${color}`}
    >
      {value}
    </span>
  );
}