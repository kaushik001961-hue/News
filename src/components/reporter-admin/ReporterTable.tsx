"use client";

import ReporterMobileCard from "./ReporterMobileCard";
import ReporterTableRow from "./ReporterTableRow";

export interface Reporter {
  id: string;

  reporterId: string | null;

  applicationNo: string;

  firstName: string;

  middleName?: string | null;

  lastName: string;

  email: string;

  phone: string;

  district: string | null;

  state: string | null;

  beat: string | null;

  designation: string | null;

  experience: number | null;

  photo: string | null;

  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "SUSPENDED";
}

interface Props {
  reporters: Reporter[];

  onApprove(id: string): void;

  onReject(id: string): void;

  onSuspend(id: string): void;

  onDelete(id: string): void;
}

export default function ReporterTable({
  reporters,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
}: Props) {
  /* =====================================================
     EMPTY STATE
  ===================================================== */

  if (reporters.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
        <h3 className="text-xl font-semibold text-slate-700">
          No Reporters Found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing the filters or create a new reporter.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Reporter
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Experience
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {reporters.map(
                (reporter) => (
                  <ReporterTableRow
                    key={reporter.id}
                    reporter={reporter}
                    onApprove={() =>
                      onApprove(reporter.id)
                    }
                    onReject={() =>
                      onReject(reporter.id)
                    }
                    onSuspend={() =>
                      onSuspend(reporter.id)
                    }
                    onDelete={() =>
                      onDelete(reporter.id)
                    }
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="space-y-5 lg:hidden">
        {reporters.map(
          (reporter) => (
            <ReporterMobileCard
              key={reporter.id}
              reporter={reporter}
              onApprove={() =>
                onApprove(reporter.id)
              }
              onReject={() =>
                onReject(reporter.id)
              }
              onSuspend={() =>
                onSuspend(reporter.id)
              }
              onDelete={() =>
                onDelete(reporter.id)
              }
            />
          )
        )}
      </div>
    </>
  );
}