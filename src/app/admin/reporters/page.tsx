"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, User } from "lucide-react";

interface Reporter {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  postsCount: number;
}

export default function ReportersPage() {

  const [reporters, setReporters] = useState<Reporter[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReporters() {

    const res = await fetch("/api/admin/reporters");
    const data = await res.json();

    setReporters(data);
    setLoading(false);

  }

  useEffect(() => {
    loadReporters();
  }, []);

  async function deleteReporter(id: string) {

    if (!confirm("Delete Reporter?")) return;

    await fetch(`/api/admin/reporters/${id}`, {
      method: "DELETE",
    });

    loadReporters();

  }

  return (

    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Reporters
          </h1>

          <p className="text-gray-500 mt-2">
            Manage newsroom reporters & editors
          </p>

        </div>

        <Link
          href="/admin/reporters/create"
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Reporter
        </Link>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Status</th>
              <th className="text-left">Posts</th>
              <th className="text-right pr-6">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              reporters.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">

                  <td className="p-4 flex items-center gap-2">
                    <User size={18} />
                    {r.name}
                  </td>

                  <td>{r.email}</td>

                  <td>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {r.role}
                    </span>
                  </td>

                  <td>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {r.status}
                    </span>
                  </td>

                  <td>{r.postsCount}</td>

                  <td>
                    <div className="flex justify-end gap-4 pr-6">

                      <Link href={`/admin/reporters/edit/${r.id}`}>
                        <Pencil size={18} className="text-blue-600" />
                      </Link>

                      <button onClick={() => deleteReporter(r.id)}>
                        <Trash2 size={18} className="text-red-600" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
