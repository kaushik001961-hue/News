import { ReactNode } from "react";

interface PrintSafeAreaProps {
  children: ReactNode;
  className?: string;
}

/**
 * Safe printable area for CR80 ID Cards (85.60 × 53.98 mm)
 *
 * Keeps all important content away from the card edges.
 */
export default function PrintSafeArea({
  children,
  className = "",
}: PrintSafeAreaProps) {
  return (
    <div
      className={`
        relative
        h-full
        w-full
        p-4
        ${className}
      `}
    >
      {/* Safe Area Guide (Development Only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="pointer-events-none absolute inset-4 rounded-xl border border-dashed border-cyan-400/40" />
      )}

      <div className="relative z-10 flex h-full flex-col">
        {children}
      </div>
    </div>
  );
}