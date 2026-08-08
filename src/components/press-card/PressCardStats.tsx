"use client";

import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock3,
} from "lucide-react";

interface Stats {
  total: number;
  active: number;
  expired: number;
  inactive: number;
  expiringSoon: number;
}

interface Props {
  stats: Stats;
}

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <div className={iconColor}>
            {icon}
          </div>
        </div>

      </div>

    </div>
  );
}

export default function PressCardStats({
  stats,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Total Cards"
        value={stats.total}
        icon={<CreditCard size={30} />}
        iconBg="bg-blue-100"
        iconColor="text-blue-700"
      />

      <StatCard
        title="Active"
        value={stats.active}
        icon={<CheckCircle2 size={30} />}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-700"
      />

      <StatCard
        title="Expiring Soon"
        value={stats.expiringSoon}
        icon={<Clock3 size={30} />}
        iconBg="bg-amber-100"
        iconColor="text-amber-700"
      />

      <StatCard
        title="Expired"
        value={stats.expired}
        icon={<AlertTriangle size={30} />}
        iconBg="bg-orange-100"
        iconColor="text-orange-700"
      />

      <StatCard
        title="Inactive"
        value={stats.inactive}
        icon={<XCircle size={30} />}
        iconBg="bg-red-100"
        iconColor="text-red-700"
      />

    </div>
  );
}