export default function CardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
relative
h-[360px]
w-[230px]
overflow-hidden
rounded-2xl
border-[3px]
border-red-700
bg-[radial-gradient(circle_at_top,#fff7f7_0%,#ffe4e4_45%,#ffd1d1_100%)]
shadow-xl
"
    >
      {children}
    </div>
  );
}