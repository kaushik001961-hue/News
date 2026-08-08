"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  NewsEditorValues,
  StateOption,
  DistrictOption,
  TalukaOption,
} from "@/types/news";

interface Props {
  form: UseFormReturn<NewsEditorValues>;

  states: StateOption[];
  districts: DistrictOption[];
  talukas: TalukaOption[];

  loadingDistricts?: boolean;
  loadingTalukas?: boolean;

  onStateChange?: (stateId: string) => void;
  onDistrictChange?: (districtId: string) => void;
}

export default function LocationSection({
  form,
  states,
  districts,
  talukas,
  loadingDistricts = false,
  loadingTalukas = false,
  onStateChange,
  onDistrictChange,
}: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const stateId = watch("stateId");
  const districtId = watch("districtId");

  useEffect(() => {
    if (stateId && onStateChange) {
      onStateChange(stateId);

      setValue("districtId", "");
      setValue("talukaId", "");
    }
  }, [stateId]);

  useEffect(() => {
    if (districtId && onDistrictChange) {
      onDistrictChange(districtId);

      setValue("talukaId", "");
    }
  }, [districtId]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          News Location
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the location where this news belongs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* State */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            State
          </label>

          <select
            {...register("stateId")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">
              Select State
            </option>

            {states.map((state) => (
              <option
                key={state.id}
                value={state.id}
              >
                {state.name}
              </option>
            ))}
          </select>

          <p className="mt-1 text-xs text-red-500">
            {errors.stateId?.message}
          </p>
        </div>

        {/* District */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            District
          </label>

          <select
            {...register("districtId")}
            disabled={!stateId || loadingDistricts}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100"
          >
            <option value="">
              {loadingDistricts
                ? "Loading..."
                : "Select District"}
            </option>

            {districts.map((district) => (
              <option
                key={district.id}
                value={district.id}
              >
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* Taluka */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Taluka
          </label>

          <select
            {...register("talukaId")}
            disabled={!districtId || loadingTalukas}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100"
          >
            <option value="">
              {loadingTalukas
                ? "Loading..."
                : "Select Taluka"}
            </option>

            {talukas.map((taluka) => (
              <option
                key={taluka.id}
                value={taluka.id}
              >
                {taluka.name}
              </option>
            ))}
          </select>
        </div>

        {/* Village */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Village / Area
          </label>

          <input
            {...register("village")}
            placeholder="Enter village or locality"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
        <strong>Tip:</strong> Selecting the correct location helps readers
        discover regional news and improves location-based filtering.
      </div>

    </div>
  );
}