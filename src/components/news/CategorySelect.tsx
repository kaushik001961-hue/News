"use client";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  value: string;
  categories: Category[];
  onChange: (value: string) => void;
}

export default function CategorySelect({
  value,
  categories,
  onChange,
}: CategorySelectProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold">
          Category
        </h2>
      </div>

      <div className="p-5">
        <label className="mb-2 block text-sm font-medium">
          Select Category
        </label>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="">
            -- Select Category --
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}