import {
  Bell,
  CheckCircle2,
  Clock3,
  Newspaper,
  UserCheck,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "News Published",
    message: "Your article 'Heavy Rain in Ahmedabad' has been published.",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-600 bg-green-100",
  },
  {
    id: 2,
    title: "News Under Review",
    message: "Your article is currently under editorial review.",
    time: "5 hours ago",
    icon: Clock3,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    id: 3,
    title: "New Assignment",
    message: "You have been assigned a new political news story.",
    time: "Yesterday",
    icon: Newspaper,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 4,
    title: "Profile Verified",
    message: "Your reporter profile has been verified successfully.",
    time: "2 days ago",
    icon: UserCheck,
    color: "text-purple-600 bg-purple-100",
  },
];

export default function ReporterNotificationsPage() {
  return (
    <main className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4 text-blue-700">

            <Bell size={30} />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Notifications
            </h1>

            <p className="mt-2 text-slate-500">
              Stay updated with your newsroom activities.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-4">

        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
            >
              <div className="flex items-start gap-5">

                <div
                  className={`rounded-xl p-3 ${notification.color}`}
                >
                  <Icon size={24} />
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h2 className="text-lg font-semibold">
                      {notification.title}
                    </h2>

                    <span className="text-sm text-slate-400">
                      {notification.time}
                    </span>

                  </div>

                  <p className="mt-2 text-slate-600">
                    {notification.message}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </main>
  );
}