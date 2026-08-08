"use client";

import { Globe, Link, User } from "lucide-react";
import { ReporterFormData } from "@/types/reporter";

interface Props {
  formData: ReporterFormData;
  updateField: <K extends keyof ReporterFormData>(
    key: K,
    value: ReporterFormData[K]
  ) => void;
}

export default function Step7Reporter({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Social Media & Digital Presence
        </h2>

        <p className="mt-2 text-slate-500">
          Share your professional social media profiles (optional).
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Facebook Profile"
          icon={<User size={18} />}
          value={formData.facebook}
          placeholder="https://facebook.com/username"
          onChange={(v) => updateField("facebook", v)}
        />

        <Input
          label="Instagram Profile"
          icon={<User size={18} />}
          value={formData.instagram}
          placeholder="https://instagram.com/username"
          onChange={(v) => updateField("instagram", v)}
        />

        <Input
          label="X (Twitter)"
          icon={<Globe size={18} />}
          value={formData.twitter}
          placeholder="https://x.com/username"
          onChange={(v) => updateField("twitter", v)}
        />

        <Input
          label="LinkedIn"
          icon={<Link size={18} />}
          value={formData.linkedin}
          placeholder="https://linkedin.com/in/username"
          onChange={(v) => updateField("linkedin", v)}
        />

        <Input
          label="YouTube Channel"
          icon={<Globe size={18} />}
          value={formData.youtube}
          placeholder="https://youtube.com/@channel"
          onChange={(v) => updateField("youtube", v)}
        />

        <Input
          label="Website / Portfolio"
          icon={<Globe size={18} />}
          value={formData.website}
          placeholder="https://yourwebsite.com"
          onChange={(v) => updateField("website", v)}
        />

      </div>
    </div>
  );
}

function Input({
  label,
  icon,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
        {icon}
        {label}
      </label>

      <input
        type="url"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}