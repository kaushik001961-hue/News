"use client";

import ChangePasswordCard from "@/components/Reporter/settings/ChangePasswordCard";
import NotificationPreferencesCard from "@/components/Reporter/settings/NotificationPreferencesCard";
import {
  Settings,
  ShieldAlert,
  BellRing,
  KeyRound,
  Lock,
} from "lucide-react";

export default function ReporterSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          Account Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your reporter security, notifications, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChangePasswordCard />
        <NotificationPreferencesCard />
      </div>
    </div>
  );
}