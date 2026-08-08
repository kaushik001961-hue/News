"use client";

import {
  Camera,
  Laptop,
  Car,
  CreditCard,
} from "lucide-react";

import { ReporterFormData } from "@/types/reporter";

interface Props {
  formData: ReporterFormData;
  updateField: <K extends keyof ReporterFormData>(
    key: K,
    value: ReporterFormData[K]
  ) => void;
}

export default function Step9Equipment({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Equipment & Resources
        </h2>

        <p className="mt-2 text-slate-500">
          Tell us what equipment you have available for reporting.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <CheckCard
          icon={<Camera size={24} />}
          title="Professional Camera"
          description="DSLR / Mirrorless / Video Camera"
          checked={formData.hasCamera}
          onChange={(v) => updateField("hasCamera", v)}
        />

        <CheckCard
          icon={<Laptop size={24} />}
          title="Laptop"
          description="Laptop for writing/editing news"
          checked={formData.hasLaptop}
          onChange={(v) => updateField("hasLaptop", v)}
        />

        <CheckCard
          icon={<Car size={24} />}
          title="Own Vehicle"
          description="Bike / Car for field reporting"
          checked={formData.hasVehicle}
          onChange={(v) => updateField("hasVehicle", v)}
        />

        <CheckCard
          icon={<CreditCard size={24} />}
          title="Driving Licence"
          description="Valid Driving Licence"
          checked={formData.drivingLicense}
          onChange={(v) => updateField("drivingLicense", v)}
        />

      </div>

    </div>
  );
}

function CheckCard({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="cursor-pointer rounded-2xl border border-slate-300 p-5 hover:border-emerald-500 hover:shadow-md transition">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>

        </div>

        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded border-slate-300 text-emerald-600"
        />

      </div>

    </label>
  );
}