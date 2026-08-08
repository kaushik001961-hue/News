"use client";

import { useState } from "react";

interface AdvertisementFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: any;
}

export default function AdvertisementForm({
  action,
  defaultValues,
}: AdvertisementFormProps) {
  const [active, setActive] = useState(
    defaultValues?.active ?? true
  );

  return (
    <form action={action} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          required
          defaultValue={defaultValues?.slug}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Position
        </label>

        <select
          name="position"
          required
          defaultValue={defaultValues?.position}
          className="w-full rounded-md border p-2"
        >
          <option value="HOME_TOP">Home Top</option>
          <option value="HOME_MIDDLE">Home Middle</option>
          <option value="HOME_BOTTOM">Home Bottom</option>

          <option value="SIDEBAR_TOP">
            Sidebar Top
          </option>

          <option value="SIDEBAR_MIDDLE">
            Sidebar Middle
          </option>

          <option value="SIDEBAR_BOTTOM">
            Sidebar Bottom
          </option>

          <option value="ARTICLE_TOP">
            Article Top
          </option>

          <option value="ARTICLE_MIDDLE">
            Article Middle
          </option>

          <option value="ARTICLE_BOTTOM">
            Article Bottom
          </option>

          <option value="HEADER">Header</option>

          <option value="FOOTER">Footer</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Device
        </label>

        <select
          name="device"
          defaultValue={defaultValues?.device}
          className="w-full rounded-md border p-2"
        >
          <option value="ALL">All</option>
          <option value="DESKTOP">Desktop</option>
          <option value="MOBILE">Mobile</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Banner Image URL
        </label>

        <input
          type="text"
          name="image"
          defaultValue={defaultValues?.image}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Target URL
        </label>

        <input
          type="url"
          name="targetUrl"
          defaultValue={defaultValues?.targetUrl}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          HTML Code
        </label>

        <textarea
          name="htmlCode"
          rows={6}
          defaultValue={defaultValues?.htmlCode}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Priority
        </label>

        <input
          type="number"
          name="priority"
          defaultValue={defaultValues?.priority ?? 1}
          min={1}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(e.target.checked)
            }
          />

          Active Advertisement
        </label>

        <input
          type="hidden"
          name="active"
          value={String(active)}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        {defaultValues
          ? "Update Advertisement"
          : "Create Advertisement"}
      </button>
    </form>
  );
}