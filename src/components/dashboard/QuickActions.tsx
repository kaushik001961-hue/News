import Link from "next/link";

export default function QuickActions() {

  return (

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">

        Quick Actions

      </h2>

      <div className="grid grid-cols-2 gap-3">

        <Link
          href="/admin/posts/create"
          className="rounded-lg bg-blue-600 p-3 text-center text-white"
        >
          Add News
        </Link>

        <Link
          href="/admin/media"
          className="rounded-lg bg-green-600 p-3 text-center text-white"
        >
          Upload Media
        </Link>

        <Link
          href="/admin/categories"
          className="rounded-lg bg-purple-600 p-3 text-center text-white"
        >
          Categories
        </Link>

        <Link
          href="/admin/users"
          className="rounded-lg bg-orange-600 p-3 text-center text-white"
        >
          Users
        </Link>

      </div>

    </div>

  );

}
