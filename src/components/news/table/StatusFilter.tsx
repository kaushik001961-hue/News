"use client";

export type NewsStatus =
  | "ALL"
  | "DRAFT"
  | "PENDING"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";

interface Props {
  value: NewsStatus;
  onChange: (value: NewsStatus) => void;
}

export default function StatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value as NewsStatus
        )
      }
      className="rounded-xl border border-slate-300 px-4 py-3"
    >
      <option value="ALL">
        All Status
      </option>

      <option value="DRAFT">
        Draft
      </option>

      <option value="PENDING">
        Pending
      </option>

      <option value="PUBLISHED">
        Published
      </option>

      <option value="REJECTED">
        Rejected
      </option>

      <option value="ARCHIVED">
        Archived
      </option>

    </select>
  );
}