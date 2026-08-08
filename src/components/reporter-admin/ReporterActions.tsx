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
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

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

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl p-2 transition hover:bg-slate-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

          <Link
            href={`/admin/reporters/${reporterId}`}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50"
          >
            <Eye size={16} />
            View Profile
          </Link>

          <Link
            href={`/admin/reporters/${reporterId}/edit`}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit Reporter
          </Link>

          <Link
            href={`/admin/reporters/${reporterId}/id-card`}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50"
          >
            <IdCard size={16} />
            Press Card
          </Link>

          <div className="my-1 border-t" />

          {status !== "APPROVED" && (
            <button
              onClick={() => {
                setOpen(false);
                onApprove();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-emerald-700 hover:bg-emerald-50"
            >
              <CheckCircle2 size={16} />
              Approve
            </button>
          )}

          {status !== "REJECTED" && (
            <button
              onClick={() => {
                setOpen(false);
                onReject();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-700 hover:bg-red-50"
            >
              <XCircle size={16} />
              Reject
            </button>
          )}

          {status !== "SUSPENDED" && (
            <button
              onClick={() => {
                setOpen(false);
                onSuspend();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-amber-700 hover:bg-amber-50"
            >
              <Ban size={16} />
              Suspend
            </button>
          )}

          <div className="my-1 border-t" />

          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete Reporter
          </button>
        </div>
      )}
    </div>
  );
}