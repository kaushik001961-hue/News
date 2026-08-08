"use client";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function DocumentsSection({
  formData,
  updateField,
}: Props) {

  const FileField = ({
    title,
    field,
  }: {
    title: string;
    field: string;
  }) => (
    <div>

      <label className="mb-2 block font-medium">
        {title}
      </label>

      <input
        type="file"
        className="w-full rounded-xl border p-3"
        onChange={(e) => {
          const file = e.target.files?.[0];
          updateField(field, file);
        }}
      />

    </div>
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Documents
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <FileField title="Photo" field="photo" />

        <FileField title="Aadhaar Card" field="aadhaar" />

        <FileField title="PAN Card" field="pan" />

        <FileField title="Resume" field="resume" />

        <FileField title="Press Card" field="pressCard" />

      </div>

    </div>
  );
}