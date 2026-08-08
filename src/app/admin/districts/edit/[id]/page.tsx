
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface State {
  id: string;
  name: string;
}

export default function EditDistrictPage() {

  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [stateId, setStateId] = useState("");

  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  async function loadStates() {

    const res = await fetch("/api/admin/states");
    const data = await res.json();

    setStates(data);

  }

  async function loadDistrict() {

    const res = await fetch(`/api/admin/districts/${id}`);
    const data = await res.json();

    setName(data.name);
    setSlug(data.slug);
    setStateId(data.stateId);

    setLoading(false);

  }

  useEffect(() => {
    if (id) {
      loadStates();
      loadDistrict();
    }
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {

    e.preventDefault();

    setSaving(true);

    try {

      const res = await fetch(`/api/admin/districts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          stateId,
        }),
      });

      if (res.ok) {

        router.push("/admin/districts");
        router.refresh();

      } else {

        alert("Failed to update district");

      }

    } catch (error) {

      console.log(error);

    }

    setSaving(false);

  }

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (

    <div className="max-w-2xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Edit District
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Name */}
          <div>

            <label className="block mb-2 font-semibold">
              District Name
            </label>

            <input
              className="w-full border rounded-xl p-4"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(slugify(e.target.value));
              }}
            />

          </div>

          {/* Slug */}
          <div>

            <label className="block mb-2 font-semibold">
              Slug
            </label>

            <input
              className="w-full border rounded-xl p-4"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

          </div>

          {/* State */}
          <div>

            <label className="block mb-2 font-semibold">
              Select State
            </label>

            <select
              className="w-full border rounded-xl p-4"
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
            >

              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}

            </select>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl bg-gray-200"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-red-600 text-white"
            >
              {saving ? "Updating..." : "Update District"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
