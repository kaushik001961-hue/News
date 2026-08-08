interface Props {
  status: string;
}

export default function ReporterStatusBadge({
  status,
}: Props) {

  const colors = {
    PENDING:
      "bg-yellow-100 text-yellow-700",

    APPROVED:
      "bg-green-100 text-green-700",

    REJECTED:
      "bg-red-100 text-red-700",

    BLOCKED:
      "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        colors[status as keyof typeof colors]
      }`}
    >
      {status}
    </span>
  );
}