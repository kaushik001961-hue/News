
import { prisma } from "@/lib/prisma";

export default async function CreatePostPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const states = await prisma.state.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Category */}

      <div>
        <label className="font-semibold">
          Category
        </label>

        <select className="w-full border rounded-lg p-3 mt-2">
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}

      <div className="mt-6">
        <label className="font-semibold">
          State
        </label>

        <select
          className="w-full border rounded-lg p-3 mt-2"
          name="stateId"
        >
          <option value="">
            Select State
          </option>

          {states.map((state) => (
            <option
              key={state.id}
              value={state.id}
            >
              {state.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
