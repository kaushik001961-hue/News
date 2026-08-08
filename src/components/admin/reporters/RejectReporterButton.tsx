"use client";

interface Props {
  id: string;
}

export default function RejectReporterButton({
  id,
}: Props) {

  async function rejectReporter() {

    const reason = prompt(
      "Reason for rejection"
    );

    if (!reason) return;

    await fetch(
      `/api/reporters/${id}/reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason,
        }),
      }
    );

    location.reload();

  }

  return (
    <button
      onClick={rejectReporter}
      className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
    >
      Reject
    </button>
  );
}