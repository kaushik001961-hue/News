"use client";

import { MapPinned, Building2, Map, FileText } from "lucide-react";
import { ReporterFormData } from "@/types/reporter";

interface Props {
  formData: ReporterFormData;
  updateField: <K extends keyof ReporterFormData>(
    key: K,
    value: ReporterFormData[K]
  ) => void;
}

export default function Step8Coverage({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Coverage Area
        </h2>

        <p className="mt-2 text-slate-500">
          Tell us where you can report news and which beat you specialize in.
        </p>
      </div>

      {/* Coverage Information */}
      <div className="grid gap-6 md:grid-cols-2">

        <InputField
          icon={<Map size={18} />}
          label="State"
          value={formData.state}
          placeholder="Enter State"
          onChange={(v) => updateField("state", v)}
        />

        <InputField
          icon={<Building2 size={18} />}
          label="District"
          value={formData.district}
          placeholder="Enter District"
          onChange={(v) => updateField("district", v)}
        />

        <InputField
          icon={<Building2 size={18} />}
          label="Taluka / City"
          value={formData.taluka ?? ""}
          placeholder="Enter Taluka / City"
          onChange={(v) => updateField("taluka", v)}
        />

        <InputField
          icon={<MapPinned size={18} />}
          label="Primary Coverage Area"
          value={formData.coverageArea}
          placeholder="Example: Ahmedabad City"
          onChange={(v) => updateField("coverageArea", v)}
        />

      </div>

      {/* Beat */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Reporting Beat
        </label>

        <select
          value={formData.beat}
          onChange={(e) => updateField("beat", e.target.value as any)}
          className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        >
          <option value="">Select Beat</option>
          <option value="Politics">Politics</option>
          <option value="Crime">Crime</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Technology">Technology</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Agriculture">Agriculture</option>
          <option value="General">General News</option>
        </select>
      </div>

      {/* Additional Coverage */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FileText size={18} />
          Additional Coverage Details
        </label>

        <textarea
          rows={5}
          value={formData.remarks ?? ""}
          onChange={(e) => updateField("remarks", e.target.value)}
          placeholder="Mention nearby districts, villages, talukas or special coverage capabilities..."
          className="w-full rounded-xl border border-slate-300 p-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

    </div>
  );
}

function InputField({
  label,
  value,
  placeholder,
  icon,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon}
        {label}
      </label>

      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}