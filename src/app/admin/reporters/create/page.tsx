"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateReporterPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("REPORTER");
  const [status, setStatus] = useState("ACTIVE");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await fetch("/api/admin/reporters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          role,
          status,
        }),
      });

      if (res.ok) {

        router.push("/admin/reporters");
        router.refresh();

      } else {

        alert("Failed to create reporter");

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
          Create Reporter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <input
            className="w-full border p-4 rounded-xl"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <input
            className="w-full border p-4 rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            className="w-full border p-4 rounded-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Phone */}
          <input
            className="w-full border p-4 rounded-xl"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Role */}
          <select
            className="w-full border p-4 rounded-xl"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="EDITOR">EDITOR</option>
            <option value="REPORTER">REPORTER</option>
          </select>

          {/* Status */}
          <select
            className="w-full border p-4 rounded-xl"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="BLOCKED">BLOCKED</option>
            <option value="PENDING">PENDING</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 rounded-xl"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-xl"
            >
              {loading ? "Saving..." : "Create Reporter"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
