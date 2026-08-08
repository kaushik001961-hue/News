"use client";

import { ReactNode } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import Toolbar from "./Toolbar";
import Filters from "./Filters";

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
  children: ReactNode;

  total: number;

  createUrl: string;

  categories: Category[];
  reporters: Reporter[];
}

export default function NewsTableClient({
  children,
  total,
  createUrl,
  categories,
  reporters,
}: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const search =
    searchParams.get("search") ?? "";

  const status =
    searchParams.get("status") ?? "ALL";

  const category =
    searchParams.get("category") ?? "";

  const reporter =
    searchParams.get("reporter") ?? "";

  const sort =
    searchParams.get("sort") ?? "latest";

  const date =
    searchParams.get("date") ?? "ALL";

  function updateParam(
    key: string,
    value: string
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (
      value === "" ||
      value === "ALL"
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    router.push(
      `${pathname}?${params.toString()}`
    );
  }

  function resetFilters() {
    router.push(pathname);
  }

  const ValidatedFilters = Filters as any;

  return (
    <div className="space-y-6">

      <Toolbar
        total={total}
        search={search}
        status={status as any}
        createUrl={createUrl}
        onSearchChange={(value) =>
          updateParam("search", value)
        }
        onStatusChange={(value) =>
          updateParam("status", value)
        }
      />

      <ValidatedFilters
        categories={categories}
        reporters={reporters}

        status={status}

        category={category}

        reporter={reporter}

        sort={sort}

        date={date}

        onStatusChange={(value: string) =>
          updateParam("status", value)
        }

        onCategoryChange={(value: string) =>
          updateParam("category", value)
        }

        onReporterChange={(value: string) =>
          updateParam("reporter", value)
        }

        onSortChange={(value: string) =>
          updateParam("sort", value)
        }

        onDateChange={(value: string) =>
          updateParam("date", value)
        }

        onReset={resetFilters}
      />

      {children}

    </div>
  );
}