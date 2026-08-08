export default function GoldBorder() {
  return (
    <>
      <div className="absolute inset-[2px] rounded-xl border-[2px] border-yellow-500" />
      <div className="absolute inset-[6px] rounded-lg border border-yellow-300/70" />
    </>
  );
}