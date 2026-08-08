"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import BasicInfo from "./BasicInfo";
import CategorySection from "./CategorySection";
import FeaturedImage from "./FeaturedImage";
import ContentEditor from "./ContentEditor";
import LocationSection from "./LocationSection";
import SEOSection from "./SEOSection";
import PreviewCard from "./PreviewCard";
import PublishSection from "./PublishSection";

import {
  generateSlug,
  stringToTags,
} from "./helpers";

import {
  Category,
  NewsFormData,
  ReporterNewsFormProps,
  SubmitType,
} from "./types";

export default function ReporterNewsForm({
  mode,
  initialData,
}: ReporterNewsFormProps) {

  const router = useRouter();

  const submitAction =
    useRef<SubmitType>("review");

  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsFormData>({
    defaultValues: {

      title:
        initialData?.title ?? "",

      slug:
        initialData?.slug ?? "",

      excerpt:
        initialData?.excerpt ?? "",

      content:
        initialData?.content ?? "",

      categoryId:
        initialData?.categoryId ?? "",

      tags:
        initialData?.tags?.join(", ") ??
        "",

      featuredImage:
        initialData?.featuredImage ??
        "",

      seoTitle:
        initialData?.seoTitle ?? "",

      seoDescription:
        initialData?.seoDescription ??
        "",

      seoKeywords:
        initialData?.seoKeywords ??
        "",

      state:
        initialData?.state ?? "",

      district:
        initialData?.district ?? "",

      taluka:
        initialData?.taluka ?? "",

    },
  });

  const title = watch("title");

  useEffect(() => {

    loadCategories();

  }, []);

  useEffect(() => {

    if (!initialData && title) {

      setValue(
        "slug",
        generateSlug(title)
      );

    }

  }, [
    title,
    initialData,
    setValue,
  ]);

  async function loadCategories() {

    try {

      const res = await fetch(
        "/api/categories"
      );

      const data =
        await res.json();

      setCategories(
        data.categories ?? []
      );

    } catch (error) {

      console.error(error);

    }

  }
    async function onSubmit(
    values: NewsFormData
  ) {
    setLoading(true);

    try {
      const payload = {
        ...values,

        status:
          submitAction.current ===
          "draft"
            ? "DRAFT"
            : "PENDING",

        tags: stringToTags(
          values.tags
        ),
      };

      const endpoint =
        mode === "create"
          ? "/api/reporter/posts/create"
          : `/api/reporter/posts/${initialData.id}`;

      const method =
        mode === "create"
          ? "POST"
          : "PUT";

      const response =
        await fetch(endpoint, {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ??
            "Unable to save article."
        );
      }

      router.push(
        "/reporter/news"
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  }

  function handleSaveDraft() {

    submitAction.current =
      "draft";

    handleSubmit(onSubmit)();

  }

  function handleSubmitReview() {

    submitAction.current =
      "review";

    handleSubmit(onSubmit)();

  }

  function handleCancel() {

    router.back();

  }

  const selectedCategory =
    categories.find(
      (category) =>
        category.id ===
        watch("categoryId")
    );

  const categoryName =
    selectedCategory?.name ?? "";

  const articleTitle =
    watch("title");

  const articleContent =
    watch("content");

  const featuredImage =
    watch("featuredImage");

  const isReadyToSubmit =
    Boolean(
      articleTitle &&
        articleContent &&
        featuredImage
    );

      return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >

      {/* Page Header */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-3xl font-bold">

              {mode === "create"
                ? "Create News Article"
                : "Edit News Article"}

            </h1>

            <p className="mt-2 text-slate-500">

              Write, edit and submit professional news articles.

            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <div className="rounded-xl bg-slate-100 px-4 py-2">

              <p className="text-xs text-slate-500">
                Status
              </p>

              <p className="font-semibold text-blue-600">
                {submitAction.current === "draft"
                  ? "Draft"
                  : "Pending Review"}
              </p>

            </div>

            <div className="rounded-xl bg-slate-100 px-4 py-2">

              <p className="text-xs text-slate-500">
                Category
              </p>

              <p className="font-semibold">
                {categoryName || "--"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Main Layout */}

      <div className="grid gap-8 xl:grid-cols-3">

        {/* Left Column */}

        <div className="space-y-8 xl:col-span-2">

          <BasicInfo
            register={register}
            errors={errors}
          />

          <CategorySection
            categories={categories}
            register={register}
            errors={errors}
          />

          <FeaturedImage
            control={control}
            errors={errors}
          />

          <ContentEditor
            register={register}
            watch={watch}
            errors={errors}
          />

          <LocationSection
            register={register}
            errors={errors}
          />

          <SEOSection
            register={register}
            watch={watch}
            errors={errors}
          />

        </div>

        {/* Right Sidebar */}

        <div className="space-y-8">

          <PreviewCard
            watch={watch}
            categoryName={categoryName}
          />

          {/* Article Checklist */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b p-6">

              <h2 className="text-xl font-bold">
                Publishing Checklist
              </h2>

            </div>

            <div className="space-y-4 p-6">

              <ChecklistItem
                completed={!!watch("title")}
                label="Headline Added"
              />

              <ChecklistItem
                completed={!!watch("excerpt")}
                label="Summary Added"
              />

              <ChecklistItem
                completed={!!watch("featuredImage")}
                label="Featured Image"
              />

              <ChecklistItem
                completed={!!watch("categoryId")}
                label="Category Selected"
              />

              <ChecklistItem
                completed={!!watch("content")}
                label="Article Content"
              />

              <ChecklistItem
                completed={!!watch("seoTitle")}
                label="SEO Title"
              />

              <ChecklistItem
                completed={!!watch("seoDescription")}
                label="SEO Description"
              />

            </div>

          </div>

          {/* Ready Status */}

          <div
            className={`rounded-2xl border p-6 shadow-sm ${
              isReadyToSubmit
                ? "border-green-300 bg-green-50"
                : "border-amber-300 bg-amber-50"
            }`}
          >

            <h3 className="font-bold">

              {isReadyToSubmit
                ? "Ready to Submit"
                : "Incomplete Article"}

            </h3>

            <p className="mt-2 text-sm">

              {isReadyToSubmit
                ? "Your article is ready for editorial review."
                : "Please complete all required fields before submission."}

            </p>

          </div>

        </div>

      </div>

            {/* Publish Section */}

      <PublishSection
        loading={loading}
        mode={mode}
        onCancel={handleCancel}
        onSaveDraft={handleSaveDraft}
        onSubmitReview={handleSubmitReview}
      />

    </form>
  );
}

/* ==========================================
   Internal Checklist Component
========================================== */

interface ChecklistItemProps {
  completed: boolean;
  label: string;
}

function ChecklistItem({
  completed,
  label,
}: ChecklistItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">

      <span className="text-sm font-medium">
        {label}
      </span>

      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
          completed
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {completed ? "✓" : "✕"}
      </span>

    </div>
  );
}