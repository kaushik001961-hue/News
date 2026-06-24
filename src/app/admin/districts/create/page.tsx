"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface State {
  id: string;
  name: string;
}

export default function CreateDistrictPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [stateId, setStateId] = useState("");

  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadStates() {

    const res = await fetch("/api/admin/states");
    const data = await res.json();

    setStates(data);

  }

  useEffect(() => {
    loadStates();
  }, []);

  function generateSlug(value: string) {

    const s = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    setSlug(s);

  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch("/api/admin/districts", {
        method: "POST",
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

        alert("Failed to create district");

      }

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  }

  return (

    <div className="max-w-2xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Create District
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

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
                generateSlug(e.target.value);
              }}
              placeholder="Ahmedabad"
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

          {/* State Dropdown */}
          <div>

            <label className="block mb-2 font-semibold">
              Select State
            </label>

            <select
              className="w-full border rounded-xl p-4"
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
            >

              <option value="">
                Select State
              </option>

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
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-red-600 text-white"
            >
              {loading ? "Saving..." : "Create District"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
