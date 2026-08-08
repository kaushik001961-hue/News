"use client";

import {
  Building2,
  Briefcase,
  Award,
  Languages,
  Clock,
} from "lucide-react";

import { ReporterFormData } from "@/types/reporter";

interface Props {
  formData: ReporterFormData;
  updateField: <K extends keyof ReporterFormData>(
    key: K,
    value: ReporterFormData[K]
  ) => void;
}

export default function Step6Documents({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Professional Information
        </h2>

        <p className="mt-2 text-slate-600">
          Tell us about your journalism experience and professional background.
        </p>
      </div>

      {/* Form */}

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          icon={<Building2 size={18} />}
          label="Previous Organization"
          value={formData.previousOrganization}
          onChange={(v) =>
            updateField("previousOrganization", v)
          }
        />

        <Input
          icon={<Briefcase size={18} />}
          label="Designation"
          value={formData.designation}
          onChange={(v) =>
            updateField("designation", v)
          }
        />

        <Input
          icon={<Award size={18} />}
          label="Years of Experience"
          type="number"
          value={String(formData.experienceYears)}
          onChange={(v) =>
            updateField(
              "experienceYears",
              Number(v)
            )
          }
        />

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Clock size={18} />
            Working Shift
          </label>

          <select
            value={formData.workingShift}
            onChange={(e) =>
              updateField(
                "workingShift",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">Select Shift</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="FREELANCER">Freelancer</option>
            <option value="NIGHT_SHIFT">Night Shift</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Languages size={18} />
            Preferred Language
          </label>

          <select
            value={formData.preferredLanguage}
            onChange={(e) =>
              updateField(
                "preferredLanguage",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            <option value="Gujarati">Gujarati</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Award size={18} />
            Journalism Degree
          </label>

          <select
            value={formData.journalismDegree ? "YES" : "NO"}
            onChange={(e) =>
              updateField(
                "journalismDegree",
                e.target.value === "YES"
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

      </div>

      {/* Achievements */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Award size={18} />
          Achievements
        </label>

        <textarea
          rows={5}
          value={formData.achievements}
          onChange={(e) =>
            updateField(
              "achievements",
              e.target.value
            )
          }
          placeholder="Mention awards, published stories, recognitions, achievements etc."
          className="w-full rounded-xl border border-slate-300 p-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon}
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}