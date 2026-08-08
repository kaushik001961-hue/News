
"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  data: any;
  interval?: number;
  onSave: (data: any) => Promise<void> | void;
}

export default function AutoSave({
  data,
  interval = 10000,
  onSave,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSaving(true);

        await onSave(data);

        setLastSaved(new Date());
      } catch (err) {
        console.error(err);
      } finally {
        setSaving(false);
      }
    }, interval);

    return () => clearTimeout(timer);

  }, [data]);

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3">

      {saving ? (
        <>
          <Loader2
            size={18}
            className="animate-spin text-blue-600"
          />

          <span className="text-sm text-gray-600">
            Auto Saving...
          </span>
        </>
      ) : (
        <>
          <CheckCircle2
            size={18}
            className="text-green-600"
          />

          <span className="text-sm text-gray-600">
            {lastSaved
              ? `Last saved ${lastSaved.toLocaleTimeString()}`
              : "Not saved yet"}
          </span>
        </>
      )}

    </div>
  );
}