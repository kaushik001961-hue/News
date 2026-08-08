"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ReporterStats from "@/components/Reporter/ReporterStats";
import ReporterQuickActions from "@/components/Reporter/ReporterQuickActions";
import ReporterRecentNews, {
  ReporterNews,
} from "@/components/Reporter/ReporterRecentNews";
import ReporterActivity, {
  ReporterActivityItem,
} from "@/components/Reporter/ReporterActivity";

interface DashboardData {
  reporter: {
    id: string;
    reporterId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string | null;
    status: string;
  };

  stats: {
    totalNews: number;
    publishedNews: number;
    pendingNews: number;
    draftNews: number;
  };

  recentNews: ReporterNews[];

  activities: ReporterActivityItem[];
}

export default function ReporterDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState<DashboardData>({
    reporter: {
      id: "",
      reporterId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      photo: null,
      status: "",
    },

    stats: {
      totalNews: 0,
      publishedNews: 0,
      pendingNews: 0,
      draftNews: 0,
    },

    recentNews: [],

    activities: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await fetch("/api/reporter/dashboard");

      if (!res.ok) {
        throw new Error("Failed to load dashboard");
      }

      const json = await res.json();

      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadPhoto(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      const upload = await uploadRes.json();

      const saveRes = await fetch(
        "/api/reporter/profile-photo",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photo: upload.url,
          }),
        }
      );

      if (!saveRes.ok) {
        throw new Error("Unable to save photo");
      }

      setData((prev) => ({
        ...prev,
        reporter: {
          ...prev.reporter,
          photo: upload.url,
        },
      }));
    } catch (error) {
      console.error(error);
      alert("Unable to upload profile photo.");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-36 animate-pulse rounded-2xl bg-slate-200" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-8 text-white shadow-xl">

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          <div>

            <h1 className="text-4xl font-black">
              Welcome Back 👋
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Manage your articles, upload media,
              monitor publication status and stay
              connected with your newsroom.
            </p>

            <div className="mt-6 space-y-1">

              <h2 className="text-2xl font-bold">
                {data.reporter.firstName}{" "}
                {data.reporter.lastName}
              </h2>

              <p className="text-blue-100">
                Reporter ID :
                {" "}
                {data.reporter.reporterId}
              </p>

              <p className="text-blue-100">
                {data.reporter.email}
              </p>

            </div>

          </div>

          <div className="relative">

            <img
  src={
    data.reporter.photo
      ? data.reporter.photo
      : "https://ui-avatars.com/api/?name=Reporter"
  }
  alt="Reporter"
  className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-xl"
/>

            <label className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-blue-600 p-3 text-white shadow-lg transition hover:bg-blue-700">

              {uploading ? "..." : "📷"}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    uploadPhoto(e.target.files[0]);
                  }
                }}
              />

            </label>

          </div>

        </div>

      </section>

            {/* Statistics */}

      <ReporterStats
        totalNews={data.stats.totalNews}
        publishedNews={data.stats.publishedNews}
        pendingNews={data.stats.pendingNews}
        draftNews={data.stats.draftNews}
      />

      {/* Quick Actions */}

      <ReporterQuickActions />

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <ReporterRecentNews
            news={data.recentNews}
          />
        </div>

        <div>
          <ReporterActivity
            activities={data.activities}
          />
        </div>

      </div>

    </div>
  );
}