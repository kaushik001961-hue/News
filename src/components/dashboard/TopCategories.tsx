const categories = [
  {
    name: "Politics",
    count: 42,
  },
  {
    name: "Sports",
    count: 31,
  },
  {
    name: "Business",
    count: 18,
  },
  {
    name: "Technology",
    count: 15,
  },
];

export default function TopCategories() {

  return (

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">

        Top Categories

      </h2>

      <div className="space-y-3">

        {categories.map((item) => (

          <div
            key={item.name}
            className="flex justify-between"
          >

            <span>

              {item.name}

            </span>

            <span>

              {item.count}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

}
