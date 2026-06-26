interface Props {
  total: number;
  published: number;
  draft: number;
  views: number;
}

export default function StatsCards({
  total,
  published,
  draft,
  views,
}: Props) {
  const cards = [
    {
      title: "Total Articles",
      value: total,
      color: "bg-blue-500",
    },
    {
      title: "Published",
      value: published,
      color: "bg-green-500",
    },
    {
      title: "Drafts",
      value: draft,
      color: "bg-yellow-500",
    },
    {
      title: "Total Views",
      value: views.toLocaleString(),
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <div
            className={`mb-4 h-2 w-16 rounded ${card.color}`}
          />

          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}