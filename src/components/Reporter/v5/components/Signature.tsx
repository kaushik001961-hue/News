interface Props {
  authority?: string;
}

export default function Signature({
  authority,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[14px] italic font-semibold text-slate-700">
        Kaushik Bhatt
      </div>

      <div className="mt-1 h-px w-16 bg-black" />

      <span className="mt-1 text-[7px] font-semibold">
        {authority || "Editor-in-Chief"}
      </span>
    </div>
  );
}