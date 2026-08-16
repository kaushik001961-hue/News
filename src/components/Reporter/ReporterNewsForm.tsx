"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  useForm,
} from "react-hook-form";

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

  /*
   * Reporter:
   *   /api/reporter/post/create
   *
   * Admin:
   *   /api/posts/create
   */
  apiEndpoint?: string;

  /*
   * Where to go after successful save.
   */
  redirectTo?: string;
}

export interface NewsFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  categoryId: string;
  tags: string;

  featuredImage: string;

  /*
   * YouTube / YouTube Live URL
   */
  video: string;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;

  /*
   * These hold database IDs.
   */
  state?: string;
  district?: string;
  taluka?: string;
}

export default function ReporterNewsForm({
  mode,
  initialData,
  apiEndpoint,
  redirectTo,
}: ReporterNewsFormProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const submitAction = useRef<
    "draft" | "review"
  >("review");

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [states, setStates] =
    useState<State[]>([]);

  const [districts, setDistricts] =
    useState<District[]>([]);

  const [talukas, setTalukas] =
    useState<Taluka[]>([]);

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

      categoryId:
        initialData?.categoryId ?? "",

      tags:
        Array.isArray(initialData?.tags)
          ? initialData.tags.join(", ")
          : initialData?.tags ?? "",

      featuredImage:
        initialData?.featuredImage ??
        initialData?.image ??
        "",

      video:
        initialData?.video ??
        initialData?.videoUrl ??
        "",

      seoTitle:
        initialData?.seoTitle ?? "",

      seoDescription:
        initialData?.seoDescription ?? "",

      seoKeywords:
        initialData?.seoKeywords ?? "",

      state:
        initialData?.stateId ??
        initialData?.state ??
        "",

      district:
        initialData?.districtId ??
        initialData?.district ??
        "",

      taluka:
        initialData?.talukaId ??
        initialData?.taluka ??
        "",
    },
  });

  const selectedState =
    watch("state");

  const selectedDistrict =
    watch("district");

  const title =
    watch("title");

  const video =
    watch("video");

  /* =====================================================
     LOAD CATEGORIES + STATES
  ===================================================== */

  useEffect(() => {
    loadCategories();
    loadStates();
  }, []);

  /* =====================================================
     LOAD DISTRICTS
  ===================================================== */

  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setTalukas([]);
      return;
    }

    loadDistricts(selectedState);
  }, [selectedState]);

  /* =====================================================
     LOAD TALUKAS
  ===================================================== */

  useEffect(() => {
    if (!selectedDistrict) {
      setTalukas([]);
      return;
    }

    loadTalukas(selectedDistrict);
  }, [selectedDistrict]);

  /* =====================================================
     AUTO SLUG
  ===================================================== */

  useEffect(() => {
    if (
      mode === "create" &&
      title
    ) {
      setValue(
        "slug",
        title
          .toLowerCase()
          .trim()
          .replace(
            /[^a-z0-9 ]/g,
            ""
          )
          .replace(/\s+/g, "-")
      );
    }
  }, [
    title,
    mode,
    setValue,
  ]);

  /* =====================================================
     CATEGORIES
  ===================================================== */

  async function loadCategories() {
    try {
      const res =
        await fetch(
          "/api/categories"
        );

      if (!res.ok) {
        return;
      }

      const data =
        await res.json();

      setCategories(
        Array.isArray(data)
          ? data
          : data.categories ?? []
      );
    } catch (error) {
      console.error(
        "Failed to load categories:",
        error
      );
    }
  }

  /* =====================================================
     STATES
  ===================================================== */

  async function loadStates() {
    try {
      const res =
        await fetch(
          "/api/states"
        );

      if (!res.ok) {
        return;
      }

      const data =
        await res.json();

      setStates(
        Array.isArray(data)
          ? data
          : data.states ?? []
      );
    } catch (error) {
      console.error(
        "Failed to load states:",
        error
      );
    }
  }

  /* =====================================================
     DISTRICTS
  ===================================================== */

  async function loadDistricts(
    stateId: string
  ) {
    try {
      const res =
        await fetch(
          `/api/districts?stateId=${encodeURIComponent(
            stateId
          )}`
        );

      if (!res.ok) {
        setDistricts([]);
        return;
      }

      const data =
        await res.json();

      const result =
        Array.isArray(data)
          ? data
          : data.districts ?? [];

      setDistricts(result);

      /*
       * Don't clear existing value when editing
       * until we know the district list has loaded.
       */
      const currentDistrict =
        watch("district");

      if (
        currentDistrict &&
        !result.some(
          (item: District) =>
            item.id === currentDistrict
        )
      ) {
        setValue(
          "district",
          ""
        );

        setValue(
          "taluka",
          ""
        );
      }
    } catch (error) {
      console.error(
        "Failed to load districts:",
        error
      );

      setDistricts([]);
    }
  }

  /* =====================================================
     TALUKAS
  ===================================================== */

  async function loadTalukas(
    districtId: string
  ) {
    try {
      const res =
        await fetch(
          `/api/talukas?districtId=${encodeURIComponent(
            districtId
          )}`
        );

      if (!res.ok) {
        setTalukas([]);
        return;
      }

      const data =
        await res.json();

      const result =
        Array.isArray(data)
          ? data
          : data.talukas ?? [];

      setTalukas(result);

      const currentTaluka =
        watch("taluka");

      if (
        currentTaluka &&
        !result.some(
          (item: Taluka) =>
            item.id === currentTaluka
        )
      ) {
        setValue(
          "taluka",
          ""
        );
      }
    } catch (error) {
      console.error(
        "Failed to load talukas:",
        error
      );

      setTalukas([]);
    }
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  async function onSubmit(
    values: NewsFormData
  ) {
    setLoading(true);

    try {
      const tags =
        values.tags
          .split(",")
          .map(
            (tag) =>
              tag.trim()
          )
          .filter(Boolean);

      /*
       * IMPORTANT:
       *
       * ReporterNewsForm uses:
       *
       * featuredImage
       * state
       * district
       * taluka
       *
       * Database uses:
       *
       * image
       * stateId
       * districtId
       * talukaId
       */

      const payload = {
        title:
          values.title.trim(),

        slug:
          values.slug.trim(),

        excerpt:
          values.excerpt.trim(),

        content:
          values.content,

        categoryId:
          values.categoryId || null,

        tags,

        image:
          values.featuredImage ||
          null,

        /*
         * YouTube / YouTube Live
         */
        video:
          values.video?.trim() ||
          null,

        stateId:
          values.state || null,

        districtId:
          values.district || null,

        talukaId:
          values.taluka || null,

        seoTitle:
          values.seoTitle?.trim() ||
          null,

        seoDescription:
          values.seoDescription?.trim() ||
          null,

        seoKeywords:
          values.seoKeywords?.trim() ||
          null,

        status:
          submitAction.current ===
          "draft"
            ? "DRAFT"
            : "PENDING",
      };

      /*
       * Reporter keeps using the existing
       * Reporter API.
       *
       * Admin uses /api/posts/create.
       */

      const endpoint =
        apiEndpoint ??
        (mode === "create"
          ? "/api/reporter/post/create"
          : `/api/reporter/post/${initialData.id}`);

      const method =
        mode === "create"
          ? "POST"
          : "PUT";

      const res =
        await fetch(
          endpoint,
          {
            method,
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Unable to save News."
        );
      }

      alert(
        submitAction.current ===
          "draft"
          ? "News draft saved successfully."
          : "News submitted for review successfully."
      );

      router.push(
        redirectTo ??
          (mode === "create"
            ? "/reporter/news"
            : "/reporter/news")
      );

      router.refresh();
    } catch (error) {
      console.error(
        "NEWS SAVE ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to save News."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="
        mx-auto
        max-w-6xl
        space-y-8
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        md:p-8
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Create News
        </h1>

        <p className="mt-2 text-slate-500">
          Create and submit your News story.
        </p>
      </div>

      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Provide the headline and short summary.
          </p>
        </div>

        {/* TITLE */}

        <div>
          <label className="mb-2 block font-semibold">
            Title
          </label>

          <input
            {...register("title", {
              required:
                "Title is required",
            })}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
            placeholder="Enter News title"
            disabled={loading}
          />

          {errors.title && (
            <p className="mt-2 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* SLUG */}

        <div>
          <label className="mb-2 block font-semibold">
            Slug
          </label>

          <input
            {...register("slug")}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-slate-50
              px-4
              py-3
              outline-none
            "
            disabled={loading}
          />
        </div>

        {/* SUMMARY */}

        <div>
          <label className="mb-2 block font-semibold">
            Summary
          </label>

          <textarea
            rows={4}
            {...register("excerpt", {
              required:
                "Summary is required",
            })}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
            placeholder="Write a short News summary..."
            disabled={loading}
          />

          {errors.excerpt && (
            <p className="mt-2 text-sm text-red-500">
              {errors.excerpt.message}
            </p>
          )}
        </div>

        {/* CATEGORY */}

        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            {...register(
              "categoryId",
              {
                required:
                  "Select category",
              }
            )}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
            disabled={loading}
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.id
                  }
                >
                  {
                    category.name
                  }
                </option>
              )
            )}
          </select>

          {errors.categoryId && (
            <p className="mt-2 text-sm text-red-500">
              {
                errors.categoryId
                  .message
              }
            </p>
          )}
        </div>

        {/* TAGS */}

        <div>
          <label className="mb-2 block font-semibold">
            Tags
          </label>

          <input
            {...register("tags")}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
            "
            placeholder="Politics, Gujarat, Election"
            disabled={loading}
          />

          <p className="mt-2 text-xs text-slate-500">
            Separate multiple tags with commas.
          </p>
        </div>
      </section>

      {/* =================================================
          FEATURED IMAGE
      ================================================= */}

      <section>
        <label className="mb-3 block text-xl font-bold">
          Featured Image
        </label>

        <Controller
          control={control}
          name="featuredImage"
          rules={{
            required:
              "Featured image is required",
          }}
          render={({ field }) => (
            <ImageUploader
              value={
                field.value
              }
              onChange={
                field.onChange
              }
            />
          )}
        />

        {errors.featuredImage && (
          <p className="mt-2 text-sm text-red-500">
            {
              errors.featuredImage
                .message
            }
          </p>
        )}
      </section>

      {/* =================================================
          YOUTUBE
      ================================================= */}

      <section
        className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
        "
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">
            YouTube Video / Live
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Add a YouTube video or YouTube Live URL.
            It will appear automatically on the published
            News page.
          </p>
        </div>

        <label className="mb-2 block font-semibold">
          YouTube URL
        </label>

        <input
          {...register("video")}
          type="url"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-red-500
            focus:ring-2
            focus:ring-red-100
          "
          placeholder="https://www.youtube.com/watch?v=..."
          disabled={loading}
        />

        <div className="mt-3 space-y-1 text-xs text-slate-500">
          <p>
            Standard:
            {" "}
            https://www.youtube.com/watch?v=VIDEO_ID
          </p>

          <p>
            Live:
            {" "}
            https://www.youtube.com/live/VIDEO_ID
          </p>

          <p>
            Short:
            {" "}
            https://youtu.be/VIDEO_ID
          </p>
        </div>

        {video && (
          <div className="mt-4 rounded-xl bg-white p-4 text-sm">
            <span className="font-semibold">
              Video URL:
            </span>{" "}
            <span className="break-all text-slate-600">
              {video}
            </span>
          </div>
        )}
      </section>

      {/* =================================================
          NEWS CONTENT
      ================================================= */}

      <section>
        <label className="mb-3 block text-xl font-bold">
          News Content
        </label>

        <textarea
          rows={18}
          {...register("content", {
            required:
              "News content is required",
            minLength: {
              value: 100,
              message:
                "News must contain at least 100 characters.",
            },
          })}
          placeholder="Write the complete News..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
          disabled={loading}
        />

        {errors.content && (
          <p className="mt-2 text-sm text-red-500">
            {errors.content.message}
          </p>
        )}
      </section>

      {/* =================================================
          LOCATION
      ================================================= */}

      <section>
        <h2 className="mb-5 text-2xl font-bold">
          News Location
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* STATE */}

          <div>
            <label className="mb-2 block font-medium">
              State
            </label>

            <select
              {...register("state")}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
              "
              disabled={loading}
            >
              <option value="">
                Select State
              </option>

              {states.map(
                (state) => (
                  <option
                    key={state.id}
                    value={state.id}
                  >
                    {state.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* DISTRICT */}

          <div>
            <label className="mb-2 block font-medium">
              District
            </label>

            <select
              {...register(
                "district"
              )}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                disabled:bg-slate-100
              "
              disabled={
                loading ||
                !selectedState
              }
            >
              <option value="">
                Select District
              </option>

              {districts.map(
                (district) => (
                  <option
                    key={
                      district.id
                    }
                    value={
                      district.id
                    }
                  >
                    {
                      district.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* TALUKA */}

          <div>
            <label className="mb-2 block font-medium">
              Taluka
            </label>

            <select
              {...register(
                "taluka"
              )}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                disabled:bg-slate-100
              "
              disabled={
                loading ||
                !selectedDistrict
              }
            >
              <option value="">
                Select Taluka
              </option>

              {talukas.map(
                (taluka) => (
                  <option
                    key={
                      taluka.id
                    }
                    value={
                      taluka.id
                    }
                  >
                    {taluka.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </section>

      {/* =================================================
          SEO
      ================================================= */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-6
        "
      >
        <h2 className="text-2xl font-bold">
          SEO Information
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Optional information to improve search engine ranking.
        </p>

        <div className="mt-6 space-y-6">
          {/* SEO TITLE */}

          <div>
            <label className="mb-2 block font-medium">
              SEO Title
            </label>

            <input
              {...register(
                "seoTitle"
              )}
              placeholder="SEO Title"
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
              "
              disabled={loading}
            />
          </div>

          {/* SEO DESCRIPTION */}

          <div>
            <label className="mb-2 block font-medium">
              SEO Description
            </label>

            <textarea
              rows={4}
              {...register(
                "seoDescription"
              )}
              placeholder="SEO Description"
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
              "
              disabled={loading}
            />
          </div>

          {/* SEO KEYWORDS */}

          <div>
            <label className="mb-2 block font-medium">
              SEO Keywords
            </label>

            <input
              {...register(
                "seoKeywords"
              )}
              placeholder="news, politics, india"
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
              "
              disabled={loading}
            />
          </div>
        </div>
      </section>

      {/* =================================================
          PUBLICATION SETTINGS
      ================================================= */}

      

      {/* =================================================
          PREVIEW
      ================================================= */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-6
        "
      >
        <h2 className="text-2xl font-bold">
          Preview
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <span className="text-sm font-medium text-slate-500">
              Title
            </span>

            <p className="mt-1 text-xl font-bold">
              {watch("title") ||
                "News title"}
            </p>
          </div>

          <div>
            <span className="text-sm font-medium text-slate-500">
              Summary
            </span>

            <p className="mt-1 rounded-lg bg-white p-3">
              {watch("excerpt") ||
                "News summary..."}
            </p>
          </div>

          {watch("video") && (
            <div>
              <span className="text-sm font-medium text-slate-500">
                YouTube
              </span>

              <p className="mt-1 break-all rounded-lg bg-white p-3 text-sm">
                {watch("video")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="border-t pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          {/* CANCEL */}

          <button
            type="button"
            onClick={() =>
              router.back()
            }
            disabled={loading}
            className="
              rounded-xl
              border
              border-slate-300
              px-6
              py-3
              font-semibold
              hover:bg-slate-100
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          {/* DRAFT */}

          <button
            type="submit"
            disabled={loading}
            onClick={() => {
              submitAction.current =
                "draft";
            }}
            className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-6
              py-3
              font-semibold
              hover:bg-slate-100
              disabled:opacity-50
            "
          >
            {loading &&
            submitAction.current ===
              "draft"
              ? "Saving..."
              : "Save Draft"}
          </button>

          {/* REVIEW */}

          <button
            type="submit"
            disabled={loading}
            onClick={() => {
              submitAction.current =
                "review";
            }}
            className="
              rounded-xl
              bg-blue-600
              px-8
              py-3
              font-semibold
              text-white
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loading &&
            submitAction.current ===
              "review"
              ? "Submitting..."
              : mode === "create"
              ? "Submit for Review"
              : "Update News"}
          </button>
        </div>
      </div>
    </form>
  );
}