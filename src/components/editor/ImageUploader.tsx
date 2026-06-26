"use client";

interface ImageUploaderProps {
  image: string;
  setImage: (value: string) => void;
}

export default function ImageUploader({
  image,
  setImage,
}: ImageUploaderProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">
        Featured Image
      </h2>

      <input
        type="text"
        placeholder="Paste image URL..."
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      {image && (
        <div className="mt-5">
          <img
            src={image}
            alt="Preview"
            className="h-60 w-full rounded-lg border object-cover"
          />
        </div>
      )}
    </div>
  );
}