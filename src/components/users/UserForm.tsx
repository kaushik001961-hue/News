"use client";

import { useState } from "react";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  image: string;
  password?: string;
  confirmPassword?: string;
  role: string;
  status: string;
}

interface Props {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  loading?: boolean;
}

export default function UserForm({
  initialData,
  onSubmit,
  loading = false,
}: Props) {
  const [form, setForm] = useState<UserFormData>({
    name: initialData?.name ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    image: initialData?.image ?? "",
    password: "",
    confirmPassword: "",
    role: initialData?.role ?? "REPORTER",
    status: initialData?.status ?? "ACTIVE",
  });

  const updateField = (
    key: keyof UserFormData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      form.password &&
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-8 shadow-sm"
    >
      <h2 className="text-2xl font-bold">
        User Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="font-medium">
            Full Name
          </label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            value={form.name}
            onChange={(e) =>
              updateField(
                "name",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="font-medium">
            Email
          </label>

          <input
            type="email"
            className="mt-2 w-full rounded-lg border p-3"
            value={form.email}
            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="font-medium">
            Phone
          </label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            value={form.phone}
            onChange={(e) =>
              updateField(
                "phone",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="font-medium">
            Avatar URL
          </label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            value={form.image}
            onChange={(e) =>
              updateField(
                "image",
                e.target.value
              )
            }
            placeholder="/uploads/avatar.jpg"
          />
        </div>

        <div>
          <label className="font-medium">
            Password
          </label>

          <input
            type="password"
            className="mt-2 w-full rounded-lg border p-3"
            value={form.password}
            onChange={(e) =>
              updateField(
                "password",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            className="mt-2 w-full rounded-lg border p-3"
            value={form.confirmPassword}
            onChange={(e) =>
              updateField(
                "confirmPassword",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="font-medium">
            Role
          </label>

          <select
            className="mt-2 w-full rounded-lg border p-3"
            value={form.role}
            onChange={(e) =>
              updateField(
                "role",
                e.target.value
              )
            }
          >
            <option value="ADMIN">
              Admin
            </option>

            <option value="EDITOR">
              Editor
            </option>

            <option value="REPORTER">
              Reporter
            </option>
          </select>
        </div>

        <div>
          <label className="font-medium">
            Status
          </label>

          <select
            className="mt-2 w-full rounded-lg border p-3"
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value
              )
            }
          >
            <option value="ACTIVE">
              Active
            </option>

            <option value="BLOCKED">
              Blocked
            </option>

            <option value="PENDING">
              Pending
            </option>
          </select>
        </div>

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save User"}
        </button>

      </div>

    </form>
  );
}
