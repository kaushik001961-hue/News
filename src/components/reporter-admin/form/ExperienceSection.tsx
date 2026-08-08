"use client";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function ExperienceSection({
  formData,
  updateField,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Journalism Experience
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          placeholder="Designation"
          value={formData.designation}
          onChange={(e)=>updateField("designation",e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Experience (Years)"
          value={formData.experience}
          onChange={(e)=>updateField("experience",e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          placeholder="Current Organization"
          value={formData.currentOrganization}
          onChange={(e)=>updateField("currentOrganization",e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          placeholder="Previous Organization"
          value={formData.previousOrganization}
          onChange={(e)=>updateField("previousOrganization",e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          placeholder="Reporting Beat"
          value={formData.beat}
          onChange={(e)=>updateField("beat",e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          placeholder="Coverage Area"
          value={formData.coverageArea}
          onChange={(e)=>updateField("coverageArea",e.target.value)}
          className="rounded-xl border p-3"
        />

      </div>

    </div>
  );
}