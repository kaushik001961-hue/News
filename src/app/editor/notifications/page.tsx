import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bell, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export default async function EditorNotificationsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const notifications = [
    {
      id: "1",
      type: "COMMENT",
      title: "New comment on your article",
      message: "John Doe commented on 'Global Economic Shifts in 2026'.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "PUBLISH",
      title: "Article Approved",
      message: "Your draft 'Tech Innovations Overview' was published by Admin.",
      time: "2 hours ago",
      read: true,
    },
    {
      id: "3",
      type: "REVISION",
      title: "Revision Requested",
      message: "Admin requested changes on 'Local Elections Update'.",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Notifications
          </h1>
          <p className="text-sm text-gray-500">
            Updates on your articles, editorial feedback, and activity.
          </p>
        </div>
        <button className="text-sm text-blue-600 hover:underline font-medium">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 p-4 rounded-xl border transition ${
              item.read
                ? "bg-white border-gray-100"
                : "bg-blue-50/40 border-blue-100"
            }`}
          >
            <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
              {item.type === "COMMENT" && <MessageSquare size={18} className="text-blue-600" />}
              {item.type === "PUBLISH" && <CheckCircle2 size={18} className="text-green-600" />}
              {item.type === "REVISION" && <AlertCircle size={18} className="text-amber-600" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}