interface ReporterBadgeProps {
  designation?: string | null;
}

const badgeStyles: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  REPORTER: {
    label: "PRESS REPORTER",
    className:
      "bg-blue-600/20 border-blue-400 text-blue-100",
  },
  SENIOR_REPORTER: {
    label: "SENIOR REPORTER",
    className:
      "bg-indigo-600/20 border-indigo-400 text-indigo-100",
  },
  PHOTOJOURNALIST: {
    label: "PHOTO JOURNALIST",
    className:
      "bg-purple-600/20 border-purple-400 text-purple-100",
  },
  EDITOR: {
    label: "EDITOR",
    className:
      "bg-red-600/20 border-red-400 text-red-100",
  },
  BUREAU_CHIEF: {
    label: "BUREAU CHIEF",
    className:
      "bg-emerald-600/20 border-emerald-400 text-emerald-100",
  },
  DEFAULT: {
    label: "PRESS",
    className:
      "bg-cyan-600/20 border-cyan-400 text-cyan-100",
  },
};

export default function ReporterBadge({
  designation,
}: ReporterBadgeProps) {
  const key =
    designation
      ?.trim()
      .replace(/\s+/g, "_")
      .toUpperCase() || "DEFAULT";

  const badge = badgeStyles[key] || badgeStyles.DEFAULT;

  return (
    <div
      className={`inline-flex items-center rounded-full border px-4 py-1.5 ${badge.className}`}
    >
      <span className="text-[11px] font-bold uppercase tracking-[2px]">
        {badge.label}
      </span>
    </div>
  );
}