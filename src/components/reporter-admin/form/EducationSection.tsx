"use client";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function EducationSection({
  formData,
  updateField,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Education
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Highest Qualification
          </label>

          <input
            value={formData.qualification}
            onChange={(e) =>
              updateField("qualification", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Journalism Degree
          </label>

          <select
            value={String(formData.journalismDegree)}
            onChange={(e) =>
              updateField(
                "journalismDegree",
                e.target.value === "true"
              )
            }
            className="w-full rounded-xl border p-3"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            College
          </label>

          <input
            value={formData.college}
            onChange={(e) =>
              updateField("college", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            University
          </label>

          <input
            value={formData.university}
            onChange={(e) =>
              updateField("university", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Passing Year
          </label>

          <input
            type="number"
            value={formData.passingYear}
            onChange={(e) =>
              updateField("passingYear", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Languages Known
          </label>

          <input
            value={formData.languages}
            onChange={(e) =>
              updateField("languages", e.target.value)
            }
            placeholder="Gujarati, Hindi, English"
            className="w-full rounded-xl border p-3"
          />
        </div>

      </div>

    </div>
  );
}