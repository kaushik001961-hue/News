"use client";

import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  File,
} from "lucide-react";

interface ReporterDocumentItem {
  id: string;
  type: string;
  file: string;
  verified: boolean;
}

interface Props {
  reporter: {
    photo: string | null;
    aadhaar: string | null;
    pan: string | null;
    resume: string | null;
    pressCard: string | null;

    ReporterDocument?: ReporterDocumentItem[];
  };
}

const documents = [
  {
    key: "photo",
    label: "Photograph",
    image: true,
  },
  {
    key: "aadhaar",
    label: "Aadhaar Card",
    image: false,
  },
  {
    key: "pan",
    label: "PAN Card",
    image: false,
  },
  {
    key: "resume",
    label: "Resume",
    image: false,
  },
  {
    key: "pressCard",
    label: "Previous Press Card",
    image: false,
  },
];

function getDocumentStatus(
  reporter: Props["reporter"],
  key: string
) {
  return reporter.ReporterDocument?.find(
    (d) =>
      d.type.toLowerCase() ===
      key.toLowerCase()
  );
}

export default function ReporterDocuments({
  reporter,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-xl font-semibold">

          Uploaded Documents

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Review all documents submitted
          during reporter registration.

        </p>

      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">

        {documents.map((doc) => {

          const file =
            reporter[
              doc.key as keyof typeof reporter
            ] as string | null;

          const uploaded =
            Boolean(file);

          const verification =
            getDocumentStatus(
              reporter,
              doc.key
            );

                      return (
            <div
              key={doc.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
            >
              {/* Header */}

              <div className="mb-4 flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-blue-100 p-3 text-blue-700">

                    {doc.image ? (
                      <ImageIcon size={22} />
                    ) : (
                      <File size={22} />
                    )}

                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {doc.label}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {uploaded
                        ? "Uploaded"
                        : "Not Uploaded"}
                    </p>

                  </div>

                </div>

                {uploaded && (
                  verification?.verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      <Clock3 size={14} />
                      Pending
                    </span>
                  )
                )}

              </div>

              {/* Preview */}

              {uploaded && doc.image ? (

                <div className="mb-4 overflow-hidden rounded-xl border">

                  <img
                    src={file!}
                    alt={doc.label}
                    className="h-48 w-full object-cover"
                  />

                </div>

              ) : uploaded ? (

                <div className="mb-4 flex h-48 items-center justify-center rounded-xl border bg-slate-50">

                  <FileText
                    size={70}
                    className="text-slate-300"
                  />

                </div>

              ) : (

                <div className="mb-4 flex h-48 items-center justify-center rounded-xl border border-dashed bg-slate-50">

                  <div className="text-center">

                    <FileText
                      size={44}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm text-slate-500">
                      No document uploaded
                    </p>

                  </div>

                </div>

              )}

              {/* Actions */}

              {uploaded ? (

                <div className="flex gap-2">

                  <a
                    href={file!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                  >
                    <Eye size={16} />
                    View
                  </a>

                  <a
                    href={file!}
                    download
                    className="flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 transition hover:bg-slate-100"
                  >
                    <Download size={16} />
                  </a>

                </div>

              ) : (

                <div className="rounded-xl bg-slate-100 py-3 text-center text-sm text-slate-500">

                  File not available

                </div>

              )}

            </div>
          );

        })}

      </div>

    </div>
  );

}