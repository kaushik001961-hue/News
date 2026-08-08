"use client";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function PersonalSection({
  formData,
  updateField,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Personal Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            First Name
          </label>

          <input
            className="w-full rounded-xl border p-3"
            value={formData.firstName}
            onChange={(e) =>
              updateField("firstName", e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Middle Name
          </label>

          <input
            className="w-full rounded-xl border p-3"
            value={formData.middleName}
            onChange={(e) =>
              updateField("middleName", e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Last Name
          </label>

          <input
            className="w-full rounded-xl border p-3"
            value={formData.lastName}
            onChange={(e) =>
              updateField("lastName", e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Gender
          </label>

          <select
            className="w-full rounded-xl border p-3"
            value={formData.gender}
            onChange={(e) =>
              updateField("gender", e.target.value)
            }
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Date of Birth
          </label>

          <input
            type="date"
            className="w-full rounded-xl border p-3"
            value={formData.dob}
            onChange={(e) =>
              updateField("dob", e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Blood Group
          </label>

          <input
            className="w-full rounded-xl border p-3"
            value={formData.bloodGroup}
            onChange={(e) =>
              updateField("bloodGroup", e.target.value)
            }
          />
        </div>

      </div>

    </div>
  );
}