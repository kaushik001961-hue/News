export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-72 bg-gray-200 rounded"></div>

      <div className="h-14 bg-gray-200 rounded"></div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-96 bg-gray-200 rounded"></div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}