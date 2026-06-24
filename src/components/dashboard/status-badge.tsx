interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {

  let styles = "";

  switch (status) {

    case "PUBLISHED":
      styles =
        "bg-green-100 text-green-700";
      break;

    case "DRAFT":
      styles =
        "bg-yellow-100 text-yellow-700";
      break;

    case "PENDING":
      styles =
        "bg-blue-100 text-blue-700";
      break;

    default:
      styles =
        "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        ${styles}
      `}
    >
      {status}
    </span>
  );
}