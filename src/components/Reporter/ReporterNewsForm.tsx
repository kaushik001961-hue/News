"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useRef } from "react";

import ImageUploader from "@/components/Reporter/ImageUploader";

interface Category {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
  stateId: string;
}

interface Taluka {
  id: string;
  name: string;
  districtId: string;
}

interface ReporterNewsFormProps {
  mode: "create" | "edit";
  initialData?: any;
}

export interface NewsFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  tags: string;
  featuredImage: string;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;

  state?: string;
  district?: string;
  taluka?: string;
}

export default function ReporterNewsForm({
  mode,
  initialData,
}: ReporterNewsFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const submitAction = useRef<"draft" | "review">("review");

  const [submitType, setSubmitType] = useState<
  "draft" | "review"
>("review");

  const [categories, setCategories] = useState<Category[]>([]);

  const [states, setStates] = useState<State[]>([]);
const [districts, setDistricts] = useState<District[]>([]);
const [talukas, setTalukas] = useState<Taluka[]>([]);



  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsFormData>({
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
      categoryId: initialData?.categoryId ?? "",
      tags: initialData?.tags?.join(", ") ?? "",
      featuredImage: initialData?.featuredImage ?? "",

      seoTitle: initialData?.seoTitle ?? "",
      seoDescription:
        initialData?.seoDescription ?? "",
      seoKeywords:
        initialData?.seoKeywords ?? "",

      state: initialData?.state ?? "",
      district: initialData?.district ?? "",
      taluka: initialData?.taluka ?? "",
    },
  });

  const selectedState = watch("state");
const selectedDistrict = watch("district");

  const title = watch("title");

  useEffect(() => {
   loadCategories();
loadStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      loadDistricts(selectedState);
    } else {
      setDistricts([]);
    }

  setValue("district", "");
  setValue("taluka", "");
}, [selectedState]);

useEffect(() => {
    if (selectedDistrict) {
      loadTalukas(selectedDistrict);
    } else {
      setTalukas([]);
    }

  setValue("taluka", "");
}, [selectedDistrict]);

    useEffect(() => {
    if (!initialData && title) {
      setValue(
        "slug",
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, "-")
      );
      
    }
  }, [title, initialData, setValue]);

  async function loadCategories() {
    try {
      const res = await fetch("/api/categories");

      const data = await res.json();

setCategories(Array.isArray(data) ? data : data.categories ?? []);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadStates() {
  const res = await fetch("/api/states");
  const data = await res.json();

setStates(Array.isArray(data) ? data : data.states ?? []);
}

async function loadDistricts(stateId: string) {
  if (!stateId) {
    setDistricts([]);
    return;
  }

  try {
    const res = await fetch(`/api/districts?stateId=${stateId}`);
    const data = await res.json();

  console.log("Selected State:", stateId);
  console.log("District API Response:", data);


    setDistricts(
      Array.isArray(data) ? data : data.districts ?? []
    );
  } catch (err) {
    console.error(err);
  }
}


async function loadTalukas(districtId: string) {
  if (!districtId) {
    setTalukas([]);
    return;
  }

  try {
    const res = await fetch(`/api/talukas?districtId=${districtId}`);
    const data = await res.json();

    setTalukas(
      Array.isArray(data) ? data : data.talukas ?? []
    );
  } catch (err) {
    console.error(err);
  }
}

  async function onSubmit(values: NewsFormData) {
  setLoading(true);

  try {
    const payload = {
      ...values,

      status:
        submitAction.current === "draft"
          ? "DRAFT"
          : "PENDING",

      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

   const endpoint =
  mode === "create"
    ? "/api/reporter/post/create"
    : `/api/reporter/post/${initialData.id}`;

    const method =
      mode === "create"
        ? "POST"
        : "PUT";

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Unable to save article."
      );
    }

    router.push("/reporter/news");

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      {/* ===========================
          BASIC INFORMATION
      ============================ */}

      <div>

        <h2 className="text-2xl font-bold">
          Basic Information
        </h2>

        <p className="mt-1 text-slate-500">
          Create your news article.
        </p>

      </div>

      {/* Title */}

      <div>

        <label className="mb-2 block font-semibold">
          Title
        </label>

        <input
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Enter article title"
        />

        {errors.title && (
          <p className="mt-2 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}

      </div>

      {/* Slug */}

      <div>

        <label className="mb-2 block font-semibold">
          Slug
        </label>

        <input
          {...register("slug")}
          className="w-full rounded-xl border bg-slate-50 px-4 py-3"
        />

      </div>

      {/* Excerpt */}

      <div>

        <label className="mb-2 block font-semibold">
          Summary
        </label>

        <textarea
          rows={4}
          {...register("excerpt", {
            required: "Summary is required",
          })}
          className="w-full rounded-xl border px-4 py-3"
        />

        {errors.excerpt && (
          <p className="mt-2 text-sm text-red-500">
            {errors.excerpt.message}
          </p>
        )}

      </div>

      {/* Category */}

      <div>

        <label className="mb-2 block font-semibold">
          Category
        </label>

        <select
          {...register("categoryId", {
            required: "Select category",
          })}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

      </div>

      {/* Tags */}

      <div>

        <label className="mb-2 block font-semibold">
          Tags
        </label>

        <input
          {...register("tags")}
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Politics, Gujarat, Election"
        />

      </div>

            {/* ==========================================
          FEATURED IMAGE
      =========================================== */}

      <div>

        <label className="mb-3 block text-lg font-semibold">
          Featured Image
        </label>

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
          <p className="mt-2 text-sm text-red-500">
            {errors.featuredImage.message}
          </p>
        )}

      </div>

      {/* ==========================================
          NEWS CONTENT
      =========================================== */}

      <div>

        <label className="mb-3 block text-lg font-semibold">
          News Content
        </label>

        <textarea
          rows={18}
          {...register("content", {
            required: "News content is required",
            minLength: {
              value: 100,
              message:
                "Article must contain at least 100 characters.",
            },
          })}
          placeholder="Write the complete news article..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

        {errors.content && (
          <p className="mt-2 text-sm text-red-500">
            {errors.content.message}
          </p>
        )}

      </div>

      {/* ==========================================
          LOCATION
      =========================================== */}

      <div>

        <h2 className="mb-5 text-2xl font-bold">
          News Location
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <label className="mb-2 block font-medium">
              State
            </label>

            <select
  {...register("state")}
  className="w-full rounded-xl border px-4 py-3"
>
  <option value="">Select State</option>

  {states.map((state) => (
    <option key={state.id} value={state.id}>
      {state.name}
    </option>
  ))}
</select>

          </div>


<div>

            <label className="mb-2 block font-medium">
             District
            </label>

           <select
  {...register("district")}
  className="w-full rounded-xl border px-4 py-3"
>
  <option value="">Select District</option>

  {districts.map((district) => (
    <option key={district.id} value={district.id}>
      {district.name}
    </option>
  ))}
</select>

          </div>
          <div>

            <label className="mb-2 block font-medium">
              Taluka
            </label>

         <select
  {...register("taluka")}
  className="w-full rounded-xl border px-4 py-3"
>
  <option value="">Select Taluka</option>

  {talukas.map((taluka) => (
    <option key={taluka.id} value={taluka.id}>
      {taluka.name}
    </option>
  ))}
</select>

          </div>

         

        </div>

      </div>

      {/* ==========================================
          SEO INFORMATION
      =========================================== */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

        <h2 className="text-2xl font-bold">
          SEO Information
        </h2>

        <p className="mt-2 text-slate-500">
          Optional information to improve search engine ranking.
        </p>

        <div className="mt-6 space-y-6">

          <div>

            <label className="mb-2 block font-medium">
              SEO Title
            </label>

            <input
              {...register("seoTitle")}
              placeholder="SEO Title"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              SEO Description
            </label>

            <textarea
              rows={4}
              {...register("seoDescription")}
              placeholder="SEO Description"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              SEO Keywords
            </label>

            <input
              {...register("seoKeywords")}
              placeholder="news, politics, india"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />

          </div>

        </div>

      </div>
            {/* ==========================================
          ARTICLE SETTINGS
      =========================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">

        <h2 className="text-2xl font-bold">
          Publication Settings
        </h2>

        <p className="mt-2 text-slate-500">
          Choose how you want to save this article.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <div className="rounded-xl border border-slate-200 p-5">

            <h3 className="font-semibold">
              Save as Draft
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Save your work without sending it to the editor.
              You can continue editing it later.
            </p>

          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

            <h3 className="font-semibold text-blue-700">
              Submit for Review
            </h3>

            <p className="mt-2 text-sm text-blue-700">
              Send the article to the editor for review and
              publication.
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          ARTICLE PREVIEW
      =========================================== */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

        <h2 className="text-2xl font-bold">
          Preview
        </h2>

        <div className="mt-6 space-y-4">

          <div>

            <span className="text-sm font-medium text-slate-500">
              Title
            </span>

            <p className="mt-1 text-xl font-bold">
              {watch("title") || "Article title"}
            </p>

          </div>

          <div>

            <span className="text-sm font-medium text-slate-500">
              Slug
            </span>

            <p className="mt-1 rounded-lg bg-white p-3 text-sm">
              {watch("slug") || "article-slug"}
            </p>

          </div>

          <div>

            <span className="text-sm font-medium text-slate-500">
              Summary
            </span>

            <p className="mt-1 whitespace-pre-wrap rounded-lg bg-white p-3">
              {watch("excerpt") ||
                "Article summary..."}
            </p>

          </div>

        </div>

      </div>
      {/* ==========================================
          ACTION BUTTONS
      =========================================== */}

     {/* Footer */}

<div className="border-t pt-8">

  <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">

    <button
      type="button"
      onClick={() => router.back()}
      disabled={loading}
      className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
    >
      Cancel
    </button>

    <button
      type="submit"
      disabled={loading}
      onClick={() => {
        submitAction.current = "draft";
      }}
      className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold hover:bg-slate-100"
    >
      {loading &&
      submitAction.current === "draft"
        ? "Saving..."
        : "Save Draft"}
    </button>

    <button
      type="submit"
      disabled={loading}
      onClick={() => {
        submitAction.current = "review";
      }}
      className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
    >
      {loading &&
      submitAction.current === "review"
        ? "Submitting..."
        : mode === "create"
        ? "Submit for Review"
        : "Update Article"}
    </button>

  </div>

</div>

</form>
);
}