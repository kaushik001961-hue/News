"use client";

import type { ReactNode } from "react";
import {
  MapPinned,
  Building2,
  Map,
  FileText,
} from "lucide-react";


import type {
  ReporterFormData,
  BeatType,
} from "@/types/reporter";

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

      {/* -------------------------------------------------- */}
      {/* Header */}
      {/* -------------------------------------------------- */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Coverage Area
        </h2>

        <p className="mt-2 text-slate-500">
          Tell us where you can report news and which
          beat you specialize in.
        </p>
      </div>

      {/* -------------------------------------------------- */}
      {/* Coverage Information */}
      {/* -------------------------------------------------- */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* State */}
        <InputField
          icon={<Map size={18} />}
          label="State"
          value={formData.state}
          placeholder="Enter State"
          onChange={(value) =>
            updateField("state", value)
          }
        />

        {/* District */}
        <InputField
          icon={<Building2 size={18} />}
          label="District"
          value={formData.district}
          placeholder="Enter District"
          onChange={(value) =>
            updateField("district", value)
          }
        />

        {/* Taluka */}
        <InputField
          icon={<Building2 size={18} />}
          label="Taluka / City"
          value={formData.taluka ?? ""}
          placeholder="Enter Taluka / City"
          onChange={(value) =>
            updateField("taluka", value)
          }
        />

        {/* Primary Coverage Area */}
        <InputField
          icon={<MapPinned size={18} />}
          label="Primary Coverage Area"
          value={formData.coverageArea}
          placeholder="Example: Ahmedabad City"
          onChange={(value) =>
            updateField("coverageArea", value)
          }
        />

      </div>

      {/* -------------------------------------------------- */}
      {/* Beat */}
      {/* -------------------------------------------------- */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Reporting Beat
        </label>

        <select
          value={formData.beat}
          onChange={(e) => {
            const value = e.target.value as BeatType;

            updateField("beat", value);
          }}
          className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        >
          <option value="GENERAL">
            General News
          </option>

          <option value="POLITICS">
            Politics
          </option>

          <option value="CRIME">
            Crime
          </option>

          <option value="BUSINESS">
            Business
          </option>

          <option value="SPORTS">
            Sports
          </option>

          <option value="EDUCATION">
            Education
          </option>

          <option value="HEALTH">
            Health
          </option>

          <option value="TECHNOLOGY">
            Technology
          </option>

          <option value="ENTERTAINMENT">
            Entertainment
          </option>

          <option value="AGRICULTURE">
            Agriculture
          </option>

          <option value="COURT">
            Court
          </option>

          <option value="CIVIC">
            Civic
          </option>

          <option value="RELIGION">
            Religion
          </option>

          <option value="ENVIRONMENT">
            Environment
          </option>
        </select>
      </div>

      {/* -------------------------------------------------- */}
      {/* Additional Coverage */}
      {/* -------------------------------------------------- */}
    <div>
  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
    <FileText size={18} />
    Additional Coverage Details
  </label>

  <textarea
    rows={5}
    value={formData.coverageArea ?? ""}
    onChange={(e) =>
      updateField("coverageArea", e.target.value)
    }
    placeholder="Mention nearby districts, villages, talukas or special coverage capabilities..."
    className="w-full rounded-xl border border-slate-300 p-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
  />
</div>

    </div>
  );
}

/* =========================================================
   INPUT FIELD
   ========================================================= */

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
  icon: ReactNode;
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
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}