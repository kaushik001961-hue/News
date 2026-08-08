"use client";

import { useEffect, useState } from "react";
import { Bell, Loader2 } from "lucide-react";

interface Preferences {
  emailNotifications: boolean;
  breakingNewsAlerts: boolean;
  assignmentNotifications: boolean;
  newsApprovalAlerts: boolean;
  pressCardNotifications: boolean;
  systemNotifications: boolean;
}

export default function NotificationPreferencesCard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [preferences, setPreferences] =
    useState<Preferences>({
      emailNotifications: true,
      breakingNewsAlerts: true,
      assignmentNotifications: true,
      newsApprovalAlerts: true,
      pressCardNotifications: true,
      systemNotifications: true,
    });

  useEffect(() => {
    loadPreferences();
  }, []);

  async function loadPreferences() {
    try {
      const res = await fetch(
        "/api/reporter/notification-preferences"
      );

      if (!res.ok) return;

      const json = await res.json();

      setPreferences(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function savePreferences() {
    try {
      setSaving(true);

      const res = await fetch(
        "/api/reporter/notification-preferences",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferences),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        alert(json.error || "Unable to save.");
        return;
      }

      alert("Preferences updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  function toggle<K extends keyof Preferences>(key: K) {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  const options = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive important updates by email.",
    },
    {
      key: "breakingNewsAlerts",
      title: "Breaking News Alerts",
      description: "Get notified for urgent breaking news.",
    },
    {
      key: "assignmentNotifications",
      title: "Assignment Notifications",
      description: "Receive new assignment alerts.",
    },
    {
      key: "newsApprovalAlerts",
      title: "News Approval Notifications",
      description: "Know when your news is approved or rejected.",
    },
    {
      key: "pressCardNotifications",
      title: "Press Card Updates",
      description: "Receive press card related notifications.",
    },
    {
      key: "systemNotifications",
      title: "System Announcements",
      description: "General platform announcements.",
    },
  ] as const;

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-amber-500" />

          <div>
            <h3 className="font-semibold">
              Notification Preferences
            </h3>

            <p className="text-sm text-gray-500">
              Choose which notifications you'd like to receive.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-6 p-6">

          {options.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h4 className="font-medium">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle(item.key)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                  preferences[item.key]
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                    preferences[item.key]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}

          <div className="pt-2">
            <button
              onClick={savePreferences}
              disabled={saving}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}