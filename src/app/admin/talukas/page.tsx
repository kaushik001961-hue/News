
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

interface Taluka {
  id: string;
  name: string;
  slug: string;
  district: {
    id: string;
    name: string;
  };
}

export default function TalukasPage() {

  const [talukas, setTalukas] = useState<Taluka[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadTalukas() {

    const res = await fetch("/api/admin/talukas");
    const data = await res.json();

    setTalukas(data);
    setLoading(false);

  }

  useEffect(() => {
    loadTalukas();
  }, []);

  async function deleteTaluka(id: string) {

    if (!confirm("Delete Taluka?")) return;

    await fetch(`/api/admin/talukas/${id}`, {
      method: "DELETE",
    });

    loadTalukas();

  }

  const filtered = talukas.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Talukas
          </h1>

          <p className="text-gray-500 mt-2">
            Manage talukas by district
          </p>

        </div>

        <Link
          href="/admin/talukas/create"
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Taluka
        </Link>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-5 mb-8">

        <div className="relative">

          <Search className="absolute left-4 top-4 text-gray-400" size={18} />

          <input
            className="border rounded-xl p-3 pl-10 w-full"
            placeholder="Search Taluka..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">#</th>
              <th className="text-left">Taluka</th>
              <th className="text-left">District</th>
              <th className="text-left">Slug</th>
              <th className="text-right pr-6">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">

                  <td className="p-4">{index + 1}</td>

                  <td className="font-semibold">{item.name}</td>

                  <td className="text-gray-500">{item.district?.name}</td>

                  <td className="text-gray-500">{item.slug}</td>

                  <td>
                    <div className="flex justify-end gap-4 pr-6">

                      <Link href={`/admin/talukas/edit/${item.id}`}>
                        <Pencil size={18} className="text-blue-600" />
                      </Link>

                      <button onClick={() => deleteTaluka(item.id)}>
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