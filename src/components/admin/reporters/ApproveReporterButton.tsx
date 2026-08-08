"use client";

interface Props {
  id: string;
}

export default function ApproveReporterButton({
  id,
}: Props) {

  async function approve() {

    if (!confirm("Approve Reporter?")) return;

    const res = await fetch(
      `/api/reporters/${id}/approve`,
      {
        method: "PATCH",
      }
    );

    if (res.ok) {
      location.reload();
    }

  }

  return (
    <button
      onClick={approve}
      className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
    >
      Approve
    </button>
  );
}