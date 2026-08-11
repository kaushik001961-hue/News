"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Code2,
  ExternalLink,
} from "lucide-react";

const POSITIONS = [
  { value: "HEADER", label: "Header" },
  { value: "HOME_TOP", label: "Home — Top" },
  { value: "HOME_MIDDLE", label: "Home — Middle" },
  { value: "HOME_BOTTOM", label: "Home — Bottom" },
  { value: "SIDEBAR_TOP", label: "Sidebar — Top" },
  { value: "SIDEBAR_MIDDLE", label: "Sidebar — Middle" },
  { value: "SIDEBAR_BOTTOM", label: "Sidebar — Bottom" },
  { value: "ARTICLE_TOP", label: "Article — Top" },
  { value: "ARTICLE_MIDDLE", label: "Article — Middle" },
  { value: "ARTICLE_BOTTOM", label: "Article — Bottom" },
  { value: "FOOTER", label: "Footer" },
] as const;

const DEVICES = [
  { value: "ALL", label: "All Devices" },
  { value: "DESKTOP", label: "Desktop" },
  { value: "MOBILE", label: "Mobile" },
  { value: "TABLET", label: "Tablet" },
] as const;

export default function CreateAdvertisementPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [position, setPosition] = useState("HOME_TOP");
  const [device, setDevice] = useState("ALL");
  const [priority, setPriority] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(true);

  const [adType, setAdType] = useState<"IMAGE" | "HTML">(
    "IMAGE"
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      const response = await fetch(
        "/api/advertisements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            slug: slug.trim(),
            image:
              adType === "IMAGE"
                ? image.trim() || null
                : null,
            htmlCode:
              adType === "HTML"
                ? htmlCode.trim() || null
                : null,
            targetUrl:
              targetUrl.trim() || null,
            position,
            device,
            priority: Number(priority) || 1,
            startDate: startDate || null,
            endDate: endDate || null,
            active,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Failed to create advertisement."
        );
      }

      router.push("/admin/advertisements");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin/advertisements"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to Advertisements
            </Link>

            <h1 className="text-3xl font-bold text-slate-900">
              Create Advertisement
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create and schedule a new advertisement
              for the AGS NEWS portal.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Basic Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the advertiser and campaign details.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Advertisement Title *
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    handleTitleChange(
                      e.target.value
                    )
                  }
                  required
                  placeholder="Example: ABC Business Promotion"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Slug *
                </label>

                <input
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      generateSlug(
                        e.target.value
                      )
                    )
                  }
                  required
                  placeholder="abc-business-promotion"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Target URL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Target URL
                </label>

                <div className="relative">
                  <ExternalLink
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="url"
                    value={targetUrl}
                    onChange={(e) =>
                      setTargetUrl(
                        e.target.value
                      )
                    }
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Advertisement Type */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Advertisement Creative
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose whether this advertisement uses
                an image or custom HTML.
              </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setAdType("IMAGE")
                }
                className={`rounded-xl border p-5 text-left transition ${
                  adType === "IMAGE"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <ImageIcon
                  size={24}
                  className="mb-3 text-emerald-600"
                />

                <div className="font-semibold text-slate-900">
                  Image Advertisement
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  Use a banner image URL.
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setAdType("HTML")
                }
                className={`rounded-xl border p-5 text-left transition ${
                  adType === "HTML"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Code2
                  size={24}
                  className="mb-3 text-emerald-600"
                />

                <div className="font-semibold text-slate-900">
                  HTML Advertisement
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  Use custom HTML advertisement code.
                </div>
              </button>
            </div>

            {adType === "IMAGE" ? (
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Banner Image URL *
                </label>

                <input
                  type="url"
                  value={image}
                  onChange={(e) =>
                    setImage(e.target.value)
                  }
                  required
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={image}
                      alt="Advertisement preview"
                      className="max-h-72 w-full object-contain"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  HTML Advertisement Code *
                </label>

                <textarea
                  value={htmlCode}
                  onChange={(e) =>
                    setHtmlCode(
                      e.target.value
                    )
                  }
                  required
                  rows={12}
                  placeholder="<div>Your advertisement...</div>"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            )}
          </section>

          {/* Placement */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Placement & Targeting
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose where and on which devices the
                advertisement should appear.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Position */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Position *
                </label>

                <select
                  value={position}
                  onChange={(e) =>
                    setPosition(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {POSITIONS.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Device */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Device *
                </label>

                <select
                  value={device}
                  onChange={(e) =>
                    setDevice(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {DEVICES.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Priority
                </label>

                <input
                  type="number"
                  min="1"
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          {/* Scheduling */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Schedule
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Optionally control when this advertisement
                is displayed.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Start Date
                </label>

                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  End Date
                </label>

                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          {/* Status */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-slate-900">
                  Advertisement Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enable this advertisement immediately
                  after creation.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActive(!active)
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  active
                    ? "bg-emerald-600"
                    : "bg-slate-300"
                }`}
                aria-label="Toggle advertisement status"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    active
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/advertisements"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {saving
                ? "Creating..."
                : "Create Advertisement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}