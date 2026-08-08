"use client";

interface Props {
  status: string;
  category: string;
  featured: string;
  breaking: string;

  setStatus: (value: string) => void;
  setCategory: (value: string) => void;
  setFeatured: (value: string) => void;
  setBreaking: (value: string) => void;

  onReset: () => void;
}

export default function FilterBar({
  status,
  category,
  featured,
  breaking,
  setStatus,
  setCategory,
  setFeatured,
  setBreaking,
  onReset,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-5">

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING">Pending</option>
        </select>

        {/* Category */}
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="rounded-lg border p-3"
        />

        {/* Featured */}
        <select
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">Featured</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>

        {/* Breaking */}
        <select
          value={breaking}
          onChange={(e) => setBreaking(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">Breaking</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>

        {/* Reset */}
        <button
          onClick={onReset}
          className="rounded-lg bg-gray-200 px-4 py-3 hover:bg-gray-300"
        >
          Reset Filters
        </button>

      </div>
    </div>
  );
}