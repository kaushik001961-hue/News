"use client";

import {
  FolderOpen,
  Image as ImageIcon,
  Video,
  HardDrive,
} from "lucide-react";

interface MediaStatsProps {
  totalFiles: number;
  totalImages: number;
  totalVideos: number;
  totalStorage?: number; // MB
}

export default function MediaStats({
  totalFiles,
  totalImages,
  totalVideos,
  totalStorage = 0,
}: MediaStatsProps) {
  const cards = [
    {
      title: "Total Files",
      value: totalFiles,
      icon: FolderOpen,
      color: "bg-blue-600",
    },
    {
      title: "Images",
      value: totalImages,
      icon: ImageIcon,
      color: "bg-green-600",
    },
    {
      title: "Videos",
      value: totalVideos,
      icon: Video,
      color: "bg-red-600",
    },
    {
      title: "Storage Used",
      value: `${totalStorage.toFixed(1)} MB`,
      icon: HardDrive,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl p-4 text-white ${card.color}`}
              >
                <Icon size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}