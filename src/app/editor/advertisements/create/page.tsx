"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import AdvertisementBannerUploader from "@/components/advertisements/AdvertisementBannerUploader";

const positions = [
  "SIDEBAR_TOP_LEFT",
  "SIDEBAR_TOP_RIGHT",
] as const;

const devices = [
  "ALL",
  "DESKTOP",
  "MOBILE",
  "TABLET",
] as const;

type AdPosition = (typeof positions)[number];
type AdDevice = (typeof devices)[number];

interface AdvertisementForm {
  title: string;
  slug: string;
  image: string;
  htmlCode: string;
  targetUrl: string;
  position: AdPosition;
  device: AdDevice;
  priority: string;
  active: boolean;
  startDate: string;
  endDate: string;
}

export default function CreateAdvertisementPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] =
    useState<AdvertisementForm>({
      title: "",
      slug: "",
      image: "",
      htmlCode: "",
      targetUrl: "",
      position: "SIDEBAR_TOP_LEFT",
      device: "ALL",
      priority: "1",
      active: true,
      startDate: "",
      endDate: "",
    });

  /* =====================================================
     UPDATE FIELD
  ===================================================== */

  function updateField<K extends keyof AdvertisementForm>(
    field: K,
    value: AdvertisementForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =====================================================
     GENERATE SLUG
  ===================================================== */

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /* =====================================================
     TITLE CHANGE
  ===================================================== */

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug:
        current.slug ||
        generateSlug(value),
    }));
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      /* ===============================================
         VALIDATION
      =============================================== */

      if (!form.title.trim()) {
        throw new Error(
          "Advertisement title is required."
        );
      }

      if (!form.slug.trim()) {
        throw new Error(
          "Advertisement slug is required."
        );
      }

      if (
        !form.image.trim() &&
        !form.htmlCode.trim()
      ) {
        throw new Error(
          "Please provide either an Advertisement Image URL or HTML Advertisement code."
        );
      }

      if (
        form.startDate &&
        form.endDate
      ) {
        const start =
          new Date(form.startDate);

        const end =
          new Date(form.endDate);

        if (end < start) {
          throw new Error(
            "End date cannot be earlier than start date."
          );
        }
      }

      /* ===============================================
         VALIDATE POSITION
      =============================================== */

      if (
        form.position !==
          "SIDEBAR_TOP_LEFT" &&
        form.position !==
          "SIDEBAR_TOP_RIGHT"
      ) {
        throw new Error(
          "Invalid advertisement position."
        );
      }

      /* ===============================================
         CREATE ADVERTISEMENT

         IMPORTANT:
         createdById is NOT sent from the client.

         The API must obtain the authenticated
         user's ID using auth().
      =============================================== */

      const response = await fetch(
        "/api/advertisements",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title:
              form.title.trim(),

            slug:
              form.slug.trim(),

            image:
              form.image.trim() ||
              null,

            htmlCode:
              form.htmlCode.trim() ||
              null,

            targetUrl:
              form.targetUrl.trim() ||
              null,

            position:
              form.position,

            device:
              form.device,

            priority:
              Number(form.priority) || 1,

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
          data?.error ||
            "Failed to create advertisement."
        );
      }

      /* ===============================================
         SUCCESS
      =============================================== */

      window.location.href =
        "/editor/advertisements";
    } catch (err) {
      console.error(
        "CREATE ADVERTISEMENT ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create advertisement."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="space-y-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="mb-2">
            <Link
              href="/editor/advertisements"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={16} />

              Back to Advertisements
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Create Advertisement
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new portal advertisement
            campaign.
          </p>

        </div>

      </div>

{/* =================================================
    FULL SIZE BANNER
================================================= */}

<AdvertisementBannerUploader
  value={form.image}
  onChange={(value) =>
    updateField("image", value)
  }
  position={form.position}
/>

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Basic Information
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* Title */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Advertisement Title
              </label>

              <input
                value={form.title}
                onChange={(event) =>
                  handleTitleChange(
                    event.target.value
                  )
                }
                required
                placeholder="Example: Summer Campaign"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Slug */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Slug
              </label>

              <input
                value={form.slug}
                onChange={(event) =>
                  updateField(
                    "slug",
                    generateSlug(
                      event.target.value
                    )
                  )
                }
                required
                placeholder="summer-campaign"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Image */}

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
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-slate-400">
                Use a public image URL, such as a Cloudinary URL.
              </p>

              {/* Image Preview */}

              {form.image.trim() && (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={form.image}
                    alt="Advertisement preview"
                    className="max-h-64 w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Target URL */}

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
                placeholder="https://example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

        </div>

        {/* =================================================
            PLACEMENT
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Placement
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Advertisements can currently appear only in
            the two sidebar top positions.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            {/* Position */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Position
              </label>

              <select
                value={form.position}
                onChange={(event) =>
                  updateField(
                    "position",
                    event.target
                      .value as AdPosition
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                {positions.map(
                  (position) => (
                    <option
                      key={position}
                      value={position}
                    >
                      {position ===
                      "SIDEBAR_TOP_LEFT"
                        ? "Sidebar Top Left"
                        : "Sidebar Top Right"}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Device */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Device
              </label>

              <select
                value={form.device}
                onChange={(event) =>
                  updateField(
                    "device",
                    event.target
                      .value as AdDevice
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                {devices.map(
                  (device) => (
                    <option
                      key={device}
                      value={device}
                    >
                      {device === "ALL"
                        ? "All Devices"
                        : device}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Priority */}

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
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>

        </div>

        {/* =================================================
            HTML ADVERTISEMENT
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            HTML Advertisement
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Optional. Use this for HTML-based
            advertisements.
          </p>

          <textarea
            value={form.htmlCode}
            onChange={(event) =>
              updateField(
                "htmlCode",
                event.target.value
              )
            }
            rows={8}
            placeholder="<div>Your advertisement...</div>"
            className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* =================================================
            SCHEDULE
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Schedule
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Leave the dates empty to make the
            advertisement available without a date range.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* Start */}

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

            {/* End */}

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

          {/* Active */}

          <label className="mt-6 flex cursor-pointer items-center gap-3">

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

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex justify-end gap-3">

          <Link
            href="/editor/advertisements"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {loading
              ? "Creating..."
              : "Create Advertisement"}
          </button>

        </div>

      </form>
    </div>
  );
}