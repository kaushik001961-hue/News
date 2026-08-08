"use client";

import { Trash2 } from "lucide-react";

interface Props {
  id: string;
}

export default function DeleteReporterButton({
  id,
}: Props) {

  async function handleDelete() {

    if (
      !confirm("Delete Reporter?")
    )
      return;

    await fetch(
      "/api/reporters/" + id,
      {
        method: "DELETE",
      }
    );

    location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-white"
    >
      <Trash2 size={18} />
    </button>
  );
}