import { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function InfoCard({
  title,
  icon,
  children,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            {icon}
          </div>
        )}

        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

      </div>

      {/* Content */}

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}