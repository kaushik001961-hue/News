"use client";

import {
  UploadCloud,
  FileText,
  ImageIcon,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

import { ReporterFormData } from "@/types/reporter";

interface Props {
  formData: ReporterFormData;
  updateField: <K extends keyof ReporterFormData>(
    field: K,
    value: ReporterFormData[K]
  ) => void;
}

const documents = [
  {
    title: "Passport Size Photo",
    field: "photoFile" as const,
    icon: ImageIcon,
    accept: "image/*",
    required: true,
  },
  {
    title: "Aadhaar Card",
    field: "aadhaarFile" as const,
    icon: CreditCard,
    accept: ".pdf,image/*",
    required: true,
  },
  {
    title: "PAN Card",
    field: "panFile" as const,
    icon: CreditCard,
    accept: ".pdf,image/*",
    required: true,
  },
  {
    title: "Resume / CV",
    field: "resumeFile" as const,
    icon: FileText,
    accept: ".pdf,.doc,.docx",
    required: true,
  },
  {
    title: "Police Verification",
    field: "policeVerification" as const,
    icon: BadgeCheck,
    accept: ".pdf,image/*",
    required: false,
  },
  {
    title: "Qualification Certificate",
    field: "qualificationCertificate" as const,
    icon: BadgeCheck,
    accept: ".pdf,image/*",
    required: false,
  },
];

export default function Step11Documents({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Documents & Verification
        </h2>

        <p className="mt-2 text-slate-600">
          Upload all required documents for verification.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {documents.map((doc) => {
          const Icon = doc.icon;

          return (
            <div
              key={doc.field}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-3">
                  <Icon
                    size={26}
                    className="text-emerald-700"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {doc.title}
                  </h3>

                  {doc.required && (
                    <p className="text-xs text-red-500">
                      Required
                    </p>
                  )}
                </div>
              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition hover:border-emerald-500 hover:bg-emerald-50">
                <UploadCloud
                  size={42}
                  className="mb-3 text-emerald-600"
                />

                <span className="font-medium">
                  Click to Upload
                </span>

                <span className="mt-1 text-sm text-slate-500">
                  JPG, PNG, PDF
                </span>

                <input
                  type="file"
                  accept={doc.accept}
                  hidden
                  onChange={(e) =>
                    updateField(
                      doc.field,
                      e.target.files?.[0] ?? null
                    )
                  }
                />
              </label>

              {formData[doc.field] && (
                <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                  ✅ {(formData[doc.field] as File).name}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">
          Document Guidelines
        </h3>

        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Upload clear and readable documents.</li>
          <li>• Maximum file size: 5 MB.</li>
          <li>• Accepted formats: JPG, PNG and PDF.</li>
          <li>• Aadhaar & PAN details must match the application.</li>
          <li>• Resume should include journalism experience.</li>
          <li>• Upload recent passport-size photograph.</li>
        </ul>
      </div>
    </div>
  );
}