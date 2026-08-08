export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="text-gray-500">
        {title}
      </div>

      <div className="text-4xl font-black mt-2">
        {value}
      </div>

    </div>
  );
}