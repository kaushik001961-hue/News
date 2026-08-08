"use client";

import { useEffect, useMemo, useState } from "react";

import ReporterStats from "@/components/reporter-admin/ReporterStats";
import ReporterToolbar from "@/components/reporter-admin/ReporterToolbar";
import ReporterTable from "@/components/reporter-admin/ReporterTable";
import ReporterHeader from "@/components/reporter-admin/ReporterHeader";

interface Reporter {
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

export default function ReporterPage() {
  const [reporters, setReporters] =
    useState<Reporter[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [stateFilter, setStateFilter] =
    useState("");

  const [district, setDistrict] =
    useState("");

  const [beat, setBeat] =
    useState("");

  async function loadReporters() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/reporters",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

setReporters(data.reporters ?? []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadReporters();
  }, []);

  async function updateReporter(
    id: string,
    action:
      | "APPROVE"
      | "REJECT"
      | "SUSPEND"
  ) {

    const res = await fetch(
      "/api/admin/reporters",
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
          action,
        }),
      }
    );

    if (!res.ok) {

      alert(
        "Unable to update reporter."
      );

      return;
    }

    loadReporters();
  }

  async function deleteReporter(
    id: string
  ) {

    if (
      !confirm(
        "Delete this reporter?"
      )
    ) {
      return;
    }

    const res = await fetch(
      `/api/admin/reporters?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {

      alert(
        "Unable to delete."
      );

      return;
    }

    loadReporters();
  }

  const filtered = useMemo(() => {

    return reporters.filter((r) => {

      const fullName =
        `${r.firstName} ${r.lastName}`
          .toLowerCase();

      return (

        fullName.includes(
          search.toLowerCase()
        )

        &&

        (status === "" ||
          r.status === status)

        &&

        (stateFilter === "" ||

          r.state
            ?.toLowerCase()
            .includes(
              stateFilter.toLowerCase()
            ))

        &&

        (district === "" ||

          r.district
            ?.toLowerCase()
            .includes(
              district.toLowerCase()
            ))

        &&

        (beat === "" ||

          r.beat
            ?.toLowerCase()
            .includes(
              beat.toLowerCase()
            ))

      );

    });

  }, [
    reporters,
    search,
    status,
    stateFilter,
    district,
    beat,
  ]);
    const stats = {
    total: reporters.length,
    pending: reporters.filter(
      (r) => r.status === "PENDING"
    ).length,

    approved: reporters.filter(
      (r) => r.status === "APPROVED"
    ).length,

    rejected: reporters.filter(
      (r) => r.status === "REJECTED"
    ).length,

    suspended: reporters.filter(
      (r) => r.status === "SUSPENDED"
    ).length,
  };

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
          <p className="mt-4 text-slate-500">
            Loading reporters...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <ReporterStats
        total={stats.total}
        pending={stats.pending}
        approved={stats.approved}
        rejected={stats.rejected}
        suspended={stats.suspended}
      />

      <ReporterToolbar
        search={search}
        onSearchChange={setSearch}

        status={status}
        onStatusChange={setStatus}

        state={stateFilter}
        onStateChange={setStateFilter}

        district={district}
        onDistrictChange={setDistrict}

        beat={beat}
        onBeatChange={setBeat}
      />

      <ReporterTable
        reporters={filtered}

        onApprove={(id) =>
          updateReporter(id, "APPROVE")
        }

        onReject={(id) =>
          updateReporter(id, "REJECT")
        }

        onSuspend={(id) =>
          updateReporter(id, "SUSPEND")
        }

        onDelete={deleteReporter}
      />

    </div>
  );
}