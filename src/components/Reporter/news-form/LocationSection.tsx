"use client";

import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { NewsFormData } from "./types";

interface Props {
  register: UseFormRegister<NewsFormData>;
  errors: FieldErrors<NewsFormData>;
}

export default function LocationSection({
  register,
  errors,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b p-6">

        <h2 className="text-xl font-bold">
          News Location
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Specify where this news event took place.
        </p>

      </div>

      {/* Body */}

      <div className="grid gap-6 p-6 md:grid-cols-3">

        {/* State */}

        <div>

          <label className="mb-2 block font-semibold">
            State
          </label>

          <input
            {...register("state", {
              required: "State is required",
            })}
            placeholder="Enter State"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {errors.state && (
            <p className="mt-2 text-sm text-red-500">
              {errors.state.message}
            </p>
          )}

        </div>

        {/* District */}

        <div>

          <label className="mb-2 block font-semibold">
            District
          </label>

          <input
            {...register("district", {
              required: "District is required",
            })}
            placeholder="Enter District"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {errors.district && (
            <p className="mt-2 text-sm text-red-500">
              {errors.district.message}
            </p>
          )}

        </div>

        {/* Taluka */}

        <div>

          <label className="mb-2 block font-semibold">
            Taluka
          </label>

          <input
            {...register("taluka")}
            placeholder="Enter Taluka"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {/* Future Enhancement */}

      <div className="border-t bg-slate-50 px-6 py-4">

        <p className="text-xs text-slate-500">
          <strong>Future enhancement:</strong> This section is designed
          to support cascading State → District → Taluka dropdowns from
          your Prisma database without changing the component structure.
        </p>

      </div>

    </div>
  );
}