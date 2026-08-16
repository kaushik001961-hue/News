"use client";

import { useState } from "react";
import {
  Save,
  Settings as SettingsIcon,
} from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [settings, setSettings] =
    useState({
      siteName: "News Portal",
      siteDescription:
        "Latest news and updates",
      contactEmail: "",
      contactPhone: "",
      timezone: "Asia/Kolkata",
      articlesPerPage: "20",
      maintenanceMode: false,
    });

  function updateSetting(
    key: string,
    value: string | boolean
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function saveSettings() {
    try {
      setSaving(true);
      setMessage("");

      const response =
        await fetch(
          "/api/admin/settings",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              settings
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to save settings."
        );
      }

      setMessage(
        "Settings saved successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <SettingsIcon size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-black">
              SETTINGS
            </h1>

            <p className="mt-1 text-blue-100">
              Manage portal configuration
              and general settings.
            </p>

          </div>

        </div>

      </section>

      {/* General */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-900">
          General Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Basic portal information.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Site Name
            </label>

            <input
              value={settings.siteName}
              onChange={(event) =>
                updateSetting(
                  "siteName",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact Email
            </label>

            <input
              type="email"
              value={
                settings.contactEmail
              }
              onChange={(event) =>
                updateSetting(
                  "contactEmail",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact Phone
            </label>

            <input
              value={
                settings.contactPhone
              }
              onChange={(event) =>
                updateSetting(
                  "contactPhone",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Timezone
            </label>

            <select
              value={settings.timezone}
              onChange={(event) =>
                updateSetting(
                  "timezone",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            >
              <option value="Asia/Kolkata">
                Asia/Kolkata
              </option>

              <option value="UTC">
                UTC
              </option>
            </select>
          </div>

        </div>

        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Site Description
          </label>

          <textarea
            rows={4}
            value={
              settings.siteDescription
            }
            onChange={(event) =>
              updateSetting(
                "siteDescription",
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </section>

      {/* News */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-900">
          News Settings
        </h2>

        <div className="mt-6 max-w-md">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            News Per Page
          </label>

          <input
            type="number"
            min="1"
            value={
              settings.articlesPerPage
            }
            onChange={(event) =>
              updateSetting(
                "articlesPerPage",
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

      </section>

      {/* Maintenance */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-900">
          System Settings
        </h2>

        <label className="mt-6 flex items-center gap-3">

          <input
            type="checkbox"
            checked={
              settings.maintenanceMode
            }
            onChange={(event) =>
              updateSetting(
                "maintenanceMode",
                event.target.checked
              )
            }
            className="h-4 w-4"
          />

          <span className="text-sm font-medium text-slate-700">
            Enable maintenance mode
          </span>

        </label>

      </section>

      {/* Message */}

      {message && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          {message}
        </div>
      )}

      {/* Save */}

      <div className="flex justify-end">

        <button
          type="button"
          onClick={saveSettings}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          <Save size={18} />

          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>

      </div>

    </div>
  );
}