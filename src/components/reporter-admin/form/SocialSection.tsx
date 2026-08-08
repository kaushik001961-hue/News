"use client";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function SocialSection({
  formData,
  updateField,
}: Props) {
  const fields = [
    { label: "Facebook", key: "facebook" },
    { label: "Instagram", key: "instagram" },
    { label: "Twitter / X", key: "twitter" },
    { label: "LinkedIn", key: "linkedin" },
    { label: "YouTube", key: "youtube" },
    { label: "Website", key: "website" },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Social Media
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {fields.map((field) => (
          <div key={field.key}>
            <label className="mb-2 block font-medium">
              {field.label}
            </label>

            <input
              value={formData[field.key]}
              onChange={(e) =>
                updateField(field.key, e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>
        ))}

      </div>

    </div>
  );
}