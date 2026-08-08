"use client";

interface Props {
  from: string;
  to: string;

  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export default function DateFilter({
  from,
  to,
  onFromChange,
  onToChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      <input
        type="date"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-3"
      />

      <input
        type="date"
        value={to}
        onChange={(e) => onToChange(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>
  );
}