interface Props {
  label: string;
  value?: string | number | null;
}

export default function ReporterDetails({
  label,
  value,
}: Props) {
  return (
    <div className="flex justify-between border-b border-gray-200 py-0.5 text-[8px]">
      <span className="font-semibold">
        {label}
      </span>

      <span className="max-w-[60%] truncate text-right">
        {value || "-"}
      </span>
    </div>
  );
}