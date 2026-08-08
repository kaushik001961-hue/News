"use client";

import { ReporterFormData } from "@/types/reporter";

interface Props {
  formData: ReporterFormData;
}

export default function Step12Review({
  formData,
}: Props) {
  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Review Application
        </h2>

        <p className="mt-2 text-neutral-500">
          Please verify all information before submission.
        </p>

      </div>

      <div className="rounded-2xl border p-6 bg-gray-50">

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <strong>Name</strong>
            <p>
              {formData.firstName} {formData.middleName} {formData.lastName}
            </p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{formData.email}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{formData.phone}</p>
          </div>

          <div>
            <strong>Reporter Type</strong>
            <p>{formData.reporterType}</p>
          </div>

          <div>
            <strong>Beat</strong>
            <p>{formData.beat}</p>
          </div>

          <div>
            <strong>Coverage Area</strong>
            <p>{formData.coverageArea}</p>
          </div>

          <div>
            <strong>Qualification</strong>
            <p>{formData.qualification}</p>
          </div>

          <div>
            <strong>Experience</strong>
            <p>{formData.experienceYears} Years</p>
          </div>

        </div>

      </div>

      <label className="flex items-start gap-3 rounded-xl border p-5">

        <input
          type="checkbox"
          checked={formData.declaration}
          onChange={() => {}}
        />

        <span>
          I hereby declare that all the information provided by me is true and correct. I understand that submitting false information may result in rejection of my application.
        </span>

      </label>

    </div>
  );
}