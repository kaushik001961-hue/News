"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Printer,
  FileDown,
  RotateCw,
  Ban,
  Mail,
  MoreHorizontal,
} from "lucide-react";

interface Reporter {
  id: string;
  reporterId: string;
  firstName: string;
  lastName: string;
  designation?: string | null;
  photo?: string | null;
}

interface PressCard {
  id: string;
  cardNumber: string;
  issueDate: Date;
  expiryDate: Date;
  active: boolean;

  reporter: Reporter;
}

interface Props {
  pressCards: PressCard[];
}

function StatusBadge({
  active,
  expiryDate,
}: {
  active: boolean;
  expiryDate: Date;
}) {
  const expired = new Date(expiryDate) < new Date();

  if (!active) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
        Revoked
      </span>
    );
  }

  if (expired) {
    return (
      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
        Expired
      </span>
    );
  }

  return (
    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
      Active
    </span>
  );
}

export default function PressCardTable({
  pressCards,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-slate-50 px-6 py-4">

        <h2 className="text-lg font-bold">
          Press Cards
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr className="text-left text-sm font-bold text-slate-700">

              <th className="px-6 py-4">
                Reporter
              </th>

              <th className="px-6 py-4">
                Card Number
              </th>

              <th className="px-6 py-4">
                Issue Date
              </th>

              <th className="px-6 py-4">
                Expiry
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

                        {pressCards.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >
                  No Press Cards Found
                </td>
              </tr>
            ) : (
              pressCards.map((card) => (
                <tr
                  key={card.id}
                  className="border-t transition hover:bg-slate-50"
                >
                  {/* Reporter */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <div className="relative h-14 w-14 overflow-hidden rounded-full border">

                       <Image
  src={
    card.reporter.photo
      ? card.reporter.photo.startsWith("/")
        ? card.reporter.photo
        : `/${card.reporter.photo}`
      : "/images/avatar-placeholder.png"
  }
  alt={card.reporter.firstName}
  fill
  className="object-cover"
/>

                      </div>

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          {card.reporter.firstName}{" "}
                          {card.reporter.lastName}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {card.reporter.designation ||
                            "Reporter"}
                        </p>

                        <p className="text-xs text-slate-400">
                          {card.reporter.reporterId}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Card Number */}

                  <td className="px-6 py-4">

                    <span className="font-mono text-sm font-bold">
                      {card.cardNumber}
                    </span>

                  </td>

                  {/* Issue */}

                  <td className="px-6 py-4">

                    {new Date(
                      card.issueDate
                    ).toLocaleDateString("en-GB")}

                  </td>

                  {/* Expiry */}

                  <td className="px-6 py-4">

                    {new Date(
                      card.expiryDate
                    ).toLocaleDateString("en-GB")}

                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">

                    <StatusBadge
                      active={card.active}
                      expiryDate={card.expiryDate}
                    />

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/admin/reporters/${card.reporter.id}/id-card`}
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>

                      <button
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        title="Print"
                      >
                        <Printer size={18} />
                      </button>

                      <button
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        title="Download PDF"
                      >
                        <FileDown size={18} />
                      </button>

                      <button
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        title="Renew"
                      >
                        <RotateCw size={18} />
                      </button>

                      <button
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        title="Revoke"
                      >
                        <Ban
                          size={18}
                          className="text-red-600"
                        />
                      </button>

                      <button
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        title="Email"
                      >
                        <Mail size={18} />
                      </button>

                      <button
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        title="More"
                      >
                        <MoreHorizontal
                          size={18}
                        />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

                      </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50 px-6 py-4 md:flex-row">

        <p className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold">
            {pressCards.length}
          </span>{" "}
          press card
          {pressCards.length !== 1 && "s"}
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-slate-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Previous
          </button>

          <button
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
            "
          >
            1
          </button>

          <button
            disabled
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-slate-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}