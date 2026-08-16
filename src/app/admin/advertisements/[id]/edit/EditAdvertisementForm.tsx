"use client";

import Link from "next/link";
import {
  FormEvent,
  useState,
} from "react";
import {
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";

const positions = [
  {
    value: "SIDEBAR_TOP_LEFT",
    label: "Sidebar Top Left",
  },
  {
    value: "SIDEBAR_TOP_RIGHT",
    label: "Sidebar Top Right",
  },
  {
  value: "POPUP",
  label: "Popup Advertisement",
},
];
const devices = [
  "ALL",
  "DESKTOP",
  "MOBILE",
  "TABLET",
  "BOT",
  "UNKNOWN",
];

interface AdvertisementData {
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

interface Props {
  advertisement: AdvertisementData;
}

function toDateTimeLocal(
  value: string | null
) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const hours = String(
    date.getHours()
  ).padStart(2, "0");

  const minutes = String(
    date.getMinutes()
  ).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EditAdvertisementForm({
  advertisement,
}: Props) {
  const router = useRouter();

  const [title, setTitle] =
    useState(advertisement.title);

  const [slug, setSlug] =
    useState(advertisement.slug);

  const [image, setImage] =
    useState(
      advertisement.image ?? ""
    );

  const [htmlCode, setHtmlCode] =
    useState(
      advertisement.htmlCode ?? ""
    );

  const [targetUrl, setTargetUrl] =
    useState(
      advertisement.targetUrl ?? ""
    );

  const [position, setPosition] =
    useState(
      advertisement.position
    );

  const [device, setDevice] =
    useState(
      advertisement.device
    );

  const [priority, setPriority] =
    useState(
      String(
        advertisement.priority
      )
    );

  const [active, setActive] =
    useState(
      advertisement.active
    );

  const [startDate, setStartDate] =
    useState(
      toDateTimeLocal(
        advertisement.startDate
      )
    );

  const [endDate, setEndDate] =
    useState(
      toDateTimeLocal(
        advertisement.endDate
      )
    );

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      if (!title.trim()) {
        throw new Error(
          "Advertisement title is required."
        );
      }

      if (!slug.trim()) {
        throw new Error(
          "Advertisement slug is required."
        );
      }

      if (
        !image.trim() &&
        !htmlCode.trim()
      ) {
        throw new Error(
          "Please provide an image URL or HTML advertisement."
        );
      }

      if (
        startDate &&
        endDate &&
        new Date(endDate) <
          new Date(startDate)
      ) {
        throw new Error(
          "End date cannot be earlier than start date."
        );
      }

      const response =
        await fetch(
          `/api/advertisements/${advertisement.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title:
                title.trim(),

              slug:
                slug.trim(),

              image:
                image.trim() || null,

              htmlCode:
                htmlCode.trim() ||
                null,

              targetUrl:
                targetUrl.trim() ||
                null,

              position,

              device,

              priority:
                Number(priority) || 1,

              active,

              startDate:
                startDate || null,

              endDate:
                endDate || null,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Failed to update advertisement."
        );
      }

      router.push(
        `/admin/advertisements/${advertisement.id}`
      );

      router.refresh();
    } catch (error) {
      console.error(
        "ADVERTISEMENT UPDATE ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update advertisement."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">

      <div>
        <Link
          href={`/admin/advertisements/${advertisement.id}`}
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />

          Back to Advertisement
        </Link>

        <h1 className="text-3xl font-bold text-slate-900">
          Edit Advertisement
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update advertisement settings.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* BASIC INFORMATION */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            Basic Information
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Advertisement Title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <input
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Image URL
              </label>

              <input
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Target URL
              </label>

              <input
                value={targetUrl}
                onChange={(e) =>
                  setTargetUrl(
                    e.target.value
                  )
                }
                placeholder="https://example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

          </div>
        </section>

        {/* PLACEMENT */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            Placement
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Position
              </label>

              <select
  value={position}
  onChange={(e) =>
    setPosition(e.target.value)
  }
  className="w-full rounded-xl border border-slate-300 px-4 py-3"
>
  {positions.map((item) => (
    <option
      key={item.value}
      value={item.value}
    >
      {item.label}
    </option>
  ))}
</select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Device
              </label>

              <select
                value={device}
                onChange={(e) =>
                  setDevice(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                {devices.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
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
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

          </div>
        </section>

        {/* HTML */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            HTML Advertisement
          </h2>

          <textarea
            value={htmlCode}
            onChange={(e) =>
              setHtmlCode(
                e.target.value
              )
            }
            rows={8}
            placeholder="<div>Your advertisement...</div>"
            className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm"
          />

        </section>

        {/* SCHEDULE */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            Schedule
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
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
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
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
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

          </div>

          <label className="mt-6 flex items-center gap-3">

            <input
              type="checkbox"
              checked={active}
              onChange={(e) =>
                setActive(
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />

            <span className="text-sm font-medium">
              Advertisement is active
            </span>

          </label>

        </section>

        {/* ERROR */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ACTIONS */}

        <div className="flex justify-end gap-3">

          <Link
            href={`/admin/advertisements/${advertisement.id}`}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Save size={18} />
            )}

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>
    </div>
  );
}