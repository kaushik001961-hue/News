import {
  Upload,
  ImageIcon,
  Video,
} from "lucide-react";

export default function ReporterMediaPage() {
  return (
    <main className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">

          Media Library

        </h1>

        <p className="mt-2 text-slate-500">

          Upload images and videos for your news stories.

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <ImageIcon
            size={50}
            className="mx-auto text-blue-700"
          />

          <h2 className="mt-4 text-xl font-bold">

            Images

          </h2>

        </div>

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <Video
            size={50}
            className="mx-auto text-green-700"
          />

          <h2 className="mt-4 text-xl font-bold">

            Videos

          </h2>

        </div>

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <Upload
            size={50}
            className="mx-auto text-purple-700"
          />

          <h2 className="mt-4 text-xl font-bold">

            Upload

          </h2>

        </div>

      </div>

    </main>
  );
}