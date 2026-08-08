"use client";

import { ReporterFormData } from "@/types/reporter";

interface Props {
  formData: ReporterFormData;
  updateField: <K extends keyof ReporterFormData>(
    key: K,
    value: ReporterFormData[K]
  ) => void;
}

export default function Step1Personal({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Personal Information
        </h2>

        <p className="mt-2 text-slate-600">
          Please provide your basic personal details.
        </p>
      </div>

      {/* Reporter Photo */}
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8">

        <label className="mb-4 block text-lg font-semibold">
          Reporter Photo <span className="text-red-500">*</span>
        </label>

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          required
          onChange={(e) =>
            updateField(
              "photoFile",
              e.target.files?.[0] ?? null
            )
          }
          className="block w-full rounded-lg border border-slate-300 p-3"
        />

        <p className="mt-2 text-sm text-slate-500">
          Upload a recent passport-size photograph (JPG/PNG, Maximum 2 MB)
        </p>

        {formData.photoFile && (
          <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            ✓ {formData.photoFile.name}
          </div>
        )}

      </div>

      {/* Name */}
      <div className="grid gap-6 md:grid-cols-3">

        <div>
          <label className="mb-2 block font-medium">
            First Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) =>
              updateField("firstName", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Middle Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            required
            value={formData.middleName}
            onChange={(e) =>
              updateField("middleName", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) =>
              updateField("lastName", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Parents */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Father's Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            required
            value={formData.fatherName}
            onChange={(e) =>
              updateField("fatherName", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Mother's Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            required
            value={formData.motherName}
            onChange={(e) =>
              updateField("motherName", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Gender + DOB */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Gender <span className="text-red-500">*</span>
          </label>

          <select
            required
            value={formData.gender}
            onChange={(e) =>
              updateField("gender", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            required
            value={formData.dob}
            onChange={(e) =>
              updateField("dob", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

      </div>

      {/* Blood Group + Marital Status */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Blood Group
          </label>

          <select
            value={formData.bloodGroup}
            onChange={(e) =>
              updateField("bloodGroup", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Marital Status <span className="text-red-500">*</span>
          </label>

          <select
            required
            value={formData.maritalStatus}
            onChange={(e) =>
              updateField("maritalStatus", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

      </div>

    </div>
  );
}