"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import {
  MoreVertical,
  Eye,
  Pencil,
  CheckCircle2,
  XCircle,
  Ban,
  Trash2,
  IdCard,
} from "lucide-react";

interface ReporterActionsProps {
  reporterId: string;

  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "SUSPENDED";

  onApprove: () => void;
  onReject: () => void;
  onSuspend: () => void;
  onDelete: () => void;
}

export default function ReporterActions({
  reporterId,
  status,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
}: ReporterActionsProps) {
  const [open, setOpen] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  /* =====================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {
    function handleClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, []);

  /* =====================================================
     CLOSE MENU WITH ESCAPE
  ===================================================== */

  useEffect(() => {
    if (!open) return;

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  const isPending =
    status === "PENDING";

  const isApproved =
    status === "APPROVED";

  const isSuspended =
    status === "SUSPENDED";

  return (
    <div
      ref={menuRef}
      className="relative inline-block text-left"
    >
      {/* =================================================
          MENU BUTTON
      ================================================= */}

      <button
        type="button"
        aria-label="Reporter actions"
        aria-expanded={open}
        onClick={() =>
          setOpen((value) => !value)
        }
        className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <MoreVertical size={18} />
      </button>

      {/* =================================================
          ACTION MENU
      ================================================= */}

      {open && (
        <div
          className="
            absolute
            right-0
            z-[100]
            mt-2
            w-60
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
          "
        >
          {/* =================================================
              VIEW PROFILE
          ================================================= */}

          <Link
            href={`/admin/reporters/${reporterId}`}
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Eye size={16} />
            View Profile
          </Link>

          {/* =================================================
              EDIT
          ================================================= */}

          <Link
            href={`/admin/reporters/${reporterId}/edit`}
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit Reporter
          </Link>

          {/* =================================================
              PRESS CARD
          ================================================= */}

          <Link
            href={`/admin/reporters/${reporterId}/id-card`}
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <IdCard size={16} />
            Press Card
          </Link>

          <div className="my-1 border-t border-slate-200" />

          {/* =================================================
              PENDING ACTIONS

              Approve and Reject are only valid for
              PENDING reporters according to the API.
          ================================================= */}

          {isPending && (
            <>
              {/* APPROVE */}

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onApprove();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
              >
                <CheckCircle2
                  size={16}
                />

                Approve Reporter
              </button>

              {/* REJECT */}

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onReject();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                <XCircle size={16} />

                Reject Reporter
              </button>
            </>
          )}

          {/* =================================================
              APPROVED → SUSPEND
          ================================================= */}

          {isApproved && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onSuspend();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-amber-700 transition hover:bg-amber-50"
            >
              <Ban size={16} />

              Suspend Reporter
            </button>
          )}

          {/* =================================================
              REJECTED / SUSPENDED

              Allow the existing callback to handle
              activation/recovery if your page implements it.
              
              We are NOT inventing a new callback here.
          ================================================= */}

          {isSuspended && (
            <div className="px-4 py-3 text-xs text-slate-500">
              Reporter is currently suspended.
            </div>
          )}

          {/* =================================================
              SEPARATOR
          ================================================= */}

          <div className="my-1 border-t border-slate-200" />

          {/* =================================================
              DELETE
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={16} />

            Delete Reporter
          </button>
        </div>
      )}
    </div>
  );
}