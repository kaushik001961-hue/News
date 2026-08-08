"use client";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export default function Step3Address({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Address Information
        </h2>

        <p className="mt-2 text-slate-600">
          Please enter your permanent residential address.
        </p>
      </div>

      {/* Address */}
      <div>
        <label className="mb-2 block font-medium">
          Full Address *
        </label>

        <textarea
          rows={4}
          value={formData.address}
          onChange={(e) =>
            updateField("address", e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          placeholder="House No., Street, Area..."
        />
      </div>

      {/* Village / Taluka */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Village / City *
          </label>

          <input
            type="text"
            value={formData.village}
            onChange={(e) =>
              updateField("village", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Taluka *
          </label>

          <input
            type="text"
            value={formData.taluka}
            onChange={(e) =>
              updateField("taluka", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

      </div>

      {/* District / State */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            District *
          </label>

          <input
            type="text"
            value={formData.district}
            onChange={(e) =>
              updateField("district", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            State *
          </label>

          <input
            type="text"
            value={formData.state}
            onChange={(e) =>
              updateField("state", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

      </div>

      {/* Country / PIN */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Country
          </label>

          <input
            type="text"
            value="India"
            readOnly
            className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            PIN Code *
          </label>

          <input
            type="text"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) =>
              updateField("pincode", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

      </div>

    </div>
  );
}