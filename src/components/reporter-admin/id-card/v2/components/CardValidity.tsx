interface CardValidityProps {
  issueDate?: string | Date | null;
  expiryDate?: string | Date | null;
}

function formatDate(date?: string | Date | null) {
  if (!date) return "--";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CardValidity({
  issueDate,
  expiryDate,
}: CardValidityProps) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/20 p-3 backdrop-blur-sm">

      <div className="mb-2">
        <h4 className="text-[10px] font-bold uppercase tracking-[3px] text-cyan-300">
          Card Validity
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div>
          <p className="text-[9px] uppercase tracking-[2px] text-slate-400">
            Issued
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {formatDate(issueDate)}
          </p>
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-[2px] text-slate-400">
            Expires
          </p>

          <p className="mt-1 text-sm font-semibold text-emerald-300">
            {formatDate(expiryDate)}
          </p>
        </div>

      </div>

      <div className="mt-3 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <p className="mt-2 text-center text-[8px] uppercase tracking-[2px] text-slate-400">
        Valid only with official seal & signature
      </p>

    </div>
  );
}