interface Props {
  label: string;
  value?: string | number | null;
}

export default function InfoRow({
  label,
  value,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50">

      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="break-words text-base font-medium text-slate-900">
        {value || "-"}
      </p>

    </div>
  );
}