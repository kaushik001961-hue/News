"use client";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function ContactSection({
  formData,
  updateField,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Contact Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Mobile Number
          </label>

          <input
            value={formData.phone}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Alternate */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Alternate Phone
          </label>

          <input
            value={formData.alternatePhone}
            onChange={(e) =>
              updateField("alternatePhone", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* WhatsApp */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            WhatsApp Number
          </label>

          <input
            value={formData.whatsapp}
            onChange={(e) =>
              updateField("whatsapp", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Emergency Contact */}

      <div className="mt-10">

        <h3 className="mb-5 text-xl font-semibold text-slate-800">
          Emergency Contact
        </h3>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Contact Person
            </label>

            <input
              value={formData.emergencyName}
              onChange={(e) =>
                updateField("emergencyName", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Relationship
            </label>

            <input
              value={formData.emergencyRelation}
              onChange={(e) =>
                updateField("emergencyRelation", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Emergency Phone
            </label>

            <input
              value={formData.emergencyPhone}
              onChange={(e) =>
                updateField("emergencyPhone", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 p-3"
            />

          </div>

        </div>

      </div>

    </div>
  );
}