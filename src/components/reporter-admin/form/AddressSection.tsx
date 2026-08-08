"use client";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function AddressSection({
  formData,
  updateField,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Address Information
      </h2>

      <div className="grid gap-6">

        {/* Full Address */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Full Address
          </label>

          <textarea
            rows={4}
            value={formData.address}
            onChange={(e) =>
              updateField("address", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Village */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Village / City
          </label>

          <input
            value={formData.village}
            onChange={(e) =>
              updateField("village", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* Taluka */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Taluka
          </label>

          <input
            value={formData.taluka}
            onChange={(e) =>
              updateField("taluka", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* District */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            District
          </label>

          <input
            value={formData.district}
            onChange={(e) =>
              updateField("district", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* State */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            State
          </label>

          <input
            value={formData.state}
            onChange={(e) =>
              updateField("state", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* PIN Code */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            PIN Code
          </label>

          <input
            value={formData.pincode}
            onChange={(e) =>
              updateField("pincode", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

      </div>

      {/* Optional GPS Section */}

      <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">

        <h3 className="text-lg font-semibold text-slate-800">
          GPS Location (Optional)
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          In the future, reporters can share their live location or
          office location using Google Maps integration.
        </p>

      </div>

    </div>
  );
}