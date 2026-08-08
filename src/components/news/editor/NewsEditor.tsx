"use client";

import { useForm } from "react-hook-form";

import {
  CategoryOption,
  DistrictOption,
  NewsEditorValues,
  ReporterOption,
  StateOption,
  TalukaOption,
} from "@/types/news";

import BasicInformation from "./BasicInformation";
import CategorySection from "./CategorySection";
import LocationSection from "./LocationSection";
import ContentSection from "./ContentSection";
import MediaSection from "./MediaSection";
import SeoSection from "./SeoSection";
import PublishSection from "./PublishSection";
import PreviewSection from "./PreviewSection";

interface Props {
  role: "ADMIN" | "EDITOR" | "REPORTER";

  categories: CategoryOption[];

  reporters?: ReporterOption[];

  states: StateOption[];

  districts: DistrictOption[];

  talukas: TalukaOption[];

  loadingDistricts?: boolean;
  loadingTalukas?: boolean;

  initialValues?: Partial<NewsEditorValues>;

  onStateChange?: (stateId: string) => void;

  onDistrictChange?: (
    districtId: string
  ) => void;

  onUpload?: (
    file: File
  ) => Promise<string>;

  onSubmit: (
    values: NewsEditorValues
  ) => Promise<void>;
}

export default function NewsEditor({
  role,

  categories,

  reporters,

  states,
  districts,
  talukas,

  loadingDistricts,
  loadingTalukas,

  initialValues,

  onStateChange,
  onDistrictChange,

  onUpload,

  onSubmit,
}: Props) {
  const form =
    useForm<NewsEditorValues>({
      defaultValues: {
        title: "",
        slug: "",
        excerpt: "",
        content: "",

        categoryId: "",

        stateId: "",
        districtId: "",
        talukaId: "",
        village: "",

        featuredImage: "",
        gallery: [],
        video: "",

        featured: false,
        breaking: false,
        trending: false,
        hero: false,
        editorsPick: false,

        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        canonicalUrl: "",
        focusKeyword: "",

        status:
          role === "REPORTER"
            ? "PENDING"
            : "DRAFT",

        ...initialValues,
      },
    });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <BasicInformation form={form} />

      <CategorySection
        form={form}
        categories={categories}
      />

      <LocationSection
        form={form}
        states={states}
        districts={districts}
        talukas={talukas}
        loadingDistricts={
          loadingDistricts
        }
        loadingTalukas={
          loadingTalukas
        }
        onStateChange={onStateChange}
        onDistrictChange={
          onDistrictChange
        }
      />

      <ContentSection form={form} />

      <MediaSection
        form={form}
        onUpload={onUpload}
      />

      <SeoSection form={form} />

      <PublishSection
        form={form}
        role={role}
      />

      <PreviewSection form={form} />

      <div className="sticky bottom-0 z-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-bold">
              Ready to Save?
            </h3>

            <p className="text-sm text-slate-500">
              Review the preview before
              submitting.
            </p>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting
              ? "Saving..."
              : role === "REPORTER"
              ? "Submit for Review"
              : "Save News"}
          </button>

        </div>

      </div>

    </form>
  );
}