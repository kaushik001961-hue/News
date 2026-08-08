"use client";

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="font-semibold">
        Tags
      </label>

      <input
        className="mt-2 w-full rounded-xl border p-3"
        placeholder="Politics, Election, India"
        value={value.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          )
        }
      />
    </div>
  );
}