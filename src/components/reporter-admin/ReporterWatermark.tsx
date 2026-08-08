export default function ReporterWatermark() {
  return (
    <div
      className="
      pointer-events-none
      absolute
      inset-0
      flex
      items-center
      justify-center
      opacity-[0.04]
      select-none
      "
    >
      <div
        className="
        rotate-[-25deg]
        text-[95px]
        font-black
        tracking-[0.35em]
        text-white
        "
      >
        AGS NEWS
      </div>
    </div>
  );
}