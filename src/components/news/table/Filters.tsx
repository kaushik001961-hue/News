"use client";

import { RotateCcw } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Reporter {
  id: string;
  firstName: string;
  lastName: string;
}

interface Props {
  category: string;
  reporter: string;

  featured: string;
  breaking: string;
  trending: string;

  categories: Category[];
  reporters: Reporter[];

  onCategoryChange: (value: string) => void;
  onReporterChange: (value: string) => void;

  onFeaturedChange: (value: string) => void;
  onBreakingChange: (value: string) => void;
  onTrendingChange: (value: string) => void;

  onReset: () => void;
}

export default function Filters({
  category,
  reporter,

  featured,
  breaking,
  trending,

  categories,
  reporters,

  onCategoryChange,
  onReporterChange,

  onFeaturedChange,
  onBreakingChange,
  onTrendingChange,

  onReset,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <h3 className="text-lg font-bold">
          Filters
        </h3>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
        >
          <RotateCcw size={16} />
          Reset
        </button>

      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        {/* Reporter */}

        <select
          value={reporter}
          onChange={(e) =>
            onReporterChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">
            All Reporters
          </option>

          {reporters.map((rep) => (
            <option
              key={rep.id}
              value={rep.id}
            >
              {rep.firstName} {rep.lastName}
            </option>
          ))}
        </select>

        {/* Featured */}

        <select
          value={featured}
          onChange={(e) =>
            onFeaturedChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">
            Featured
          </option>

          <option value="true">
            Featured
          </option>

          <option value="false">
            Not Featured
          </option>

        </select>

        {/* Breaking */}

        <select
          value={breaking}
          onChange={(e) =>
            onBreakingChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">
            Breaking
          </option>

          <option value="true">
            Breaking
          </option>

          <option value="false">
            Not Breaking
          </option>

        </select>

        {/* Trending */}

        <select
          value={trending}
          onChange={(e) =>
            onTrendingChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">
            Trending
          </option>

          <option value="true">
            Trending
          </option>

          <option value="false">
            Not Trending
          </option>

        </select>

      </div>

    </div>
  );
}