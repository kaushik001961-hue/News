"use client";

import {
  Controller,
  Control,
  FieldErrors,
} from "react-hook-form";

import ImageUploader from "@/components/reporter/ImageUploader";
import { NewsFormData } from "./types";

interface Props {
  control: Control<NewsFormData>;
  errors: FieldErrors<NewsFormData>;
}

export default function FeaturedImage({
  control,
  errors,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Featured Image
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload the main image that will appear with the
          article.
        </p>
      </div>

      <Controller
        control={control}
        name="featuredImage"
        rules={{
          required: "Featured image is required",
        }}
        render={({ field }) => (
          <ImageUploader
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {errors.featuredImage && (
        <p className="mt-3 text-sm text-red-500">
          {errors.featuredImage.message}
        </p>
      )}

    </div>
  );
}