"use client";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export default function Step2Contact({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Contact Information
        </h2>

        <p className="mt-2 text-slate-600">
          Enter your contact details for communication.
        </p>
      </div>

      {/* Contact Details */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Mobile Number *
          </label>

          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
            placeholder="9876543210"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Alternate Mobile
          </label>

          <input
            type="tel"
            value={formData.alternatePhone}
            onChange={(e) =>
              updateField("alternatePhone", e.target.value)
            }
            placeholder="9876543210"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            WhatsApp Number
          </label>

          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) =>
              updateField("whatsapp", e.target.value)
            }
            placeholder="9876543210"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email Address *
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            placeholder="reporter@email.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Emergency Contact */}
      <div className="border-t pt-8">

        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          Emergency Contact
        </h3>

        <div className="grid gap-6 md:grid-cols-3">

          <div>
            <label className="mb-2 block font-medium">
              Contact Name
            </label>

            <input
              type="text"
              value={formData.emergencyName}
              onChange={(e) =>
                updateField("emergencyName", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Relationship
            </label>

            <select
              value={formData.emergencyRelation}
              onChange={(e) =>
                updateField("emergencyRelation", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            >
              <option value="">Select</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Brother</option>
              <option>Sister</option>
              <option>Spouse</option>
              <option>Friend</option>
              <option>Guardian</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Emergency Mobile
            </label>

            <input
              type="tel"
              value={formData.emergencyPhone}
              onChange={(e) =>
                updateField("emergencyPhone", e.target.value)
              }
              placeholder="9876543210"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

        </div>

      </div>

    </div>
  );
}