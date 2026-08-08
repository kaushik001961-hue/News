"use client";

interface NewsFiltersProps {
  status: string;
  category: string;
  reporter: string;
  featured: string;
  breaking: string;

  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReporterChange: (value: string) => void;
  onFeaturedChange: (value: string) => void;
  onBreakingChange: (value: string) => void;

  onReset: () => void;

  categories?: string[];
  reporters?: string[];
}

export default function NewsFilters({
  status,
  category,
  reporter,
  featured,
  breaking,

  onStatusChange,
  onCategoryChange,
  onReporterChange,
  onFeaturedChange,
  onBreakingChange,

  onReset,

  categories = [],
  reporters = [],
}: NewsFiltersProps) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">

        {/* Status */}

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING">Pending</option>
          <option value="PUBLISHED">Published</option>
        </select>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Reporter */}

        <select
          value={reporter}
          onChange={(e) => onReporterChange(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="">All Reporters</option>

          {reporters.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Featured */}

        <select
          value={featured}
          onChange={(e) => onFeaturedChange(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="">Featured</option>
          <option value="true">Featured Only</option>
          <option value="false">Not Featured</option>
        </select>

        {/* Breaking */}

        <select
          value={breaking}
          onChange={(e) => onBreakingChange(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="">Breaking</option>
          <option value="true">Breaking Only</option>
          <option value="false">Normal News</option>
        </select>

        {/* Reset */}

        <button
          onClick={onReset}
          className="rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}