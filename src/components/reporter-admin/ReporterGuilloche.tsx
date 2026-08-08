export default function ReporterGuilloche() {
  return (
    <div
      className="
      absolute
      inset-0
      overflow-hidden
      opacity-10
      "
    >
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="
          absolute
          rounded-full
          border
          border-white
          "
          style={{
            width: `${180 + i * 18}px`,
            height: `${180 + i * 18}px`,
            left: `${-90 - i * 9}px`,
            top: `${-90 - i * 9}px`,
          }}
        />
      ))}
    </div>
  );
}