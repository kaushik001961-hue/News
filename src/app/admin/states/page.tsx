"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

interface StateItem {
  id: string;
  name: string;
  slug: string;
}

export default function StatesPage() {

  const [states, setStates] = useState<StateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadStates() {

    const res = await fetch("/api/admin/states");

    const data = await res.json();

    setStates(data);

    setLoading(false);

  }

  useEffect(() => {

    loadStates();

  }, []);

  async function deleteState(id: string) {

    if (!confirm("Delete State?")) return;

    await fetch(`/api/admin/states/${id}`, {
      method: "DELETE",
    });

    loadStates();

  }

  const filtered = states.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            States
          </h1>

          <p className="text-gray-500 mt-2">
            Manage States
          </p>

        </div>

        <Link
          href="/admin/states/create"
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >

          <Plus size={18} />

          Add State

        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-8">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            className="border rounded-xl p-3 pl-10 w-full"
            placeholder="Search State..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                #
              </th>

              <th className="text-left">
                State
              </th>

              <th className="text-left">
                Slug
              </th>

              <th className="text-right pr-6">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading && (

              <tr>

                <td
                  colSpan={4}
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            )}

            {!loading &&
              filtered.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">

                    {index + 1}

                  </td>

                  <td className="font-semibold">

                    {item.name}

                  </td>

                  <td className="text-gray-500">

                    {item.slug}

                  </td>

                  <td>

                    <div className="flex justify-end gap-4 pr-6">

                      <Link
                        href={`/admin/states/edit/${item.id}`}
                      >

                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />

                      </Link>

                      <button
                        onClick={() =>
                          deleteState(item.id)
                        }
                      >

                        <Trash2
                          size={18}
                          className="text-red-600"
                        />

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
