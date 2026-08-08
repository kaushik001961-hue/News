
"use client";

interface Option {
  id: string;
  name: string;
}

interface Props {
  categories: Option[];
  states: Option[];

  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  state: string;
  setState: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
}

export default function PostFilters({
  categories,
  states,

  search,
  setSearch,

  category,
  setCategory,

  state,
  setState,

  status,
  setStatus,
}: Props) {
  return (
    <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">

      <div className="grid gap-4 md:grid-cols-5">

        {/* Search */}

        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border p-3"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* State */}

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">
            All States
          </option>

          {states.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">
            All Status
          </option>

          <option value="DRAFT">
            Draft
          </option>

          <option value="PUBLISHED">
            Published
          </option>

          <option value="ARCHIVED">
            Archived
          </option>
        </select>

        {/* Reset */}

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("");
            setState("");
            setStatus("");
          }}
          className="rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-700"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}
