"use client";

import {
  Landmark,
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

export default function Step10Bank({
  formData,
  updateField,
}: Props) {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Bank Details
        </h2>

        <p className="mt-2 text-slate-500">
          Please enter your bank details carefully. All fields are mandatory.
        </p>
      </div>

      {/* Bank Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
          <Landmark className="text-emerald-600" />
          Bank Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <Input
            label="Account Holder Name"
            icon={<CreditCard size={18} />}
            value={formData.accountHolderName}
            onChange={(v) => updateField("accountHolderName", v)}
            required
          />

          <Input
            label="Bank Name"
            icon={<Landmark size={18} />}
            value={formData.bankName}
            onChange={(v) => updateField("bankName", v)}
            required
          />

          <Input
            label="Account Number"
            icon={<CreditCard size={18} />}
            value={formData.accountNumber}
            onChange={(v) => updateField("accountNumber", v)}
            required
          />

          <Input
            label="IFSC Code"
            icon={<Landmark size={18} />}
            value={formData.ifsc}
            onChange={(v) => updateField("ifsc", v)}
            required
          />

          <div className="md:col-span-2">
            <Input
              label="UPI ID"
              icon={<CreditCard size={18} />}
              value={formData.upiId}
              onChange={(v) => updateField("upiId", v)}
              placeholder="example@upi"
         
            />
          </div>

        </div>

      </div>

    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  icon,
  placeholder = "",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon}
        {label}
        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}