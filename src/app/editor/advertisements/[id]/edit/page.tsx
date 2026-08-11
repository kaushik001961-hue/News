"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import {
  ArrowLeft,
  Save,
} from "lucide-react";

const positions = [
  "HEADER",
  "HOME_TOP",
  "HOME_MIDDLE",
  "HOME_BOTTOM",
  "SIDEBAR_TOP",
  "SIDEBAR_MIDDLE",
  "SIDEBAR_BOTTOM",
  "ARTICLE_TOP",
  "ARTICLE_MIDDLE",
  "ARTICLE_BOTTOM",
  "FOOTER",
];

const devices = [
  "ALL",
  "DESKTOP",
  "MOBILE",
  "TABLET",
];

interface Advertisement {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  htmlCode: string | null;
  targetUrl: string | null;
  position: string;
  device: string;
  priority: number;
  active: boolean;
  startDate: string | null;
  endDate: string | null;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditAdvertisementPage({
  params,
}: PageProps) {
  const [id, setId] =
    useState<string>("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    htmlCode: "",
    targetUrl: "",
    position: "HOME_TOP",
    device: "ALL",
    priority: "1",
    active: true,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    params.then((value) => {
      setId(value.id);
      loadAdvertisement(value.id);
    });
  }, [params]);

  async function loadAdvertisement(
    advertisementId: string
  ) {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          `/api/admin/advertisements/${advertisementId}`,
          {
            cache: "no-store",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load advertisement."
        );
      }

      const data =
        await response.json();

      const ad: Advertisement =
        data.advertisement ??
        data;

      setForm({
        title: ad.title ?? "",
        slug: ad.slug ?? "",
        image: ad.image ?? "",
        htmlCode:
          ad.htmlCode ?? "",
        targetUrl:
          ad.targetUrl ?? "",
        position:
          ad.position ?? "HOME_TOP",
        device:
          ad.device ?? "ALL",
        priority:
          String(ad.priority ?? 1),
        active:
          ad.active ?? true,
        startDate:
          ad.startDate
            ? toDateTimeLocal(
                ad.startDate
              )
            : "",
        endDate:
          ad.endDate
            ? toDateTimeLocal(
                ad.endDate
              )
            : "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load advertisement."
      );
    } finally {
      setLoading(false);
    }
  }

  function toDateTimeLocal(
    value: string
  ) {
    const date =
      new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    const hours =
      String(
        date.getHours()
      ).padStart(2, "0");

    const minutes =
      String(
        date.getMinutes()
      ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function updateField(
    field: string,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/admin/advertisements",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id,

              title:
                form.title,

              slug:
                form.slug,

              image:
                form.image || null,

              htmlCode:
                form.htmlCode || null,

              targetUrl:
                form.targetUrl || null,

              position:
                form.position,

              device:
                form.device,

              priority:
                Number(
                  form.priority
                ) || 1,

              active:
                form.active,

              startDate:
                form.startDate ||
                null,

              endDate:
                form.endDate ||
                null,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to update advertisement."
        );
      }

      window.location.href =
        `/editor/advertisements/${id}`;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update advertisement."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />

          <p className="mt-4 text-sm text-slate-500">
            Loading advertisement...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <Link
          href={`/editor/advertisements/${id}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Advertisement
        </Link>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Edit Advertisement
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update advertisement campaign
          details.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Basic Information */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Basic Information
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Advertisement Title
              </label>

              <input
                value={form.title}
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value
                  )
                }
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Slug
              </label>

              <input
                value={form.slug}
                onChange={(event) =>
                  updateField(
                    "slug",
                    event.target.value
                  )
                }
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Image URL
              </label>

              <input
                value={form.image}
                onChange={(event) =>
                  updateField(
                    "image",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Target URL
              </label>

              <input
                value={form.targetUrl}
                onChange={(event) =>
                  updateField(
                    "targetUrl",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

        </div>

        {/* Placement */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Placement
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Position
              </label>

              <select
                value={form.position}
                onChange={(event) =>
                  updateField(
                    "position",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                {positions.map(
                  (position) => (
                    <option
                      key={position}
                      value={position}
                    >
                      {position
                        .replaceAll(
                          "_",
                          " "
                        )
                        .toLowerCase()
                        .replace(
                          /\b\w/g,
                          (char) =>
                            char.toUpperCase()
                        )}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Device
              </label>

              <select
                value={form.device}
                onChange={(event) =>
                  updateField(
                    "device",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                {devices.map(
                  (device) => (
                    <option
                      key={device}
                      value={device}
                    >
                      {device}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>

              <input
                type="number"
                min="1"
                value={form.priority}
                onChange={(event) =>
                  updateField(
                    "priority",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

          </div>

        </div>

        {/* HTML */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            HTML Advertisement
          </h2>

          <textarea
            value={form.htmlCode}
            onChange={(event) =>
              updateField(
                "htmlCode",
                event.target.value
              )
            }
            rows={8}
            className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm"
          />

        </div>

        {/* Schedule */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Schedule
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Start Date
              </label>

              <input
                type="datetime-local"
                value={form.startDate}
                onChange={(event) =>
                  updateField(
                    "startDate",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                End Date
              </label>

              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(event) =>
                  updateField(
                    "endDate",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

          </div>

          <label className="mt-6 flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) =>
                updateField(
                  "active",
                  event.target.checked
                )
              }
              className="h-4 w-4"
            />

            <span className="text-sm font-medium text-slate-700">
              Advertisement is active
            </span>

          </label>

        </div>

        {/* Error */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}

        <div className="flex justify-end gap-3">

          <Link
            href={`/editor/advertisements/${id}`}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}