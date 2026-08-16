"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";

import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";

interface AdvertisementBannerUploaderProps {
  value: string;

  onChange: (
    value: string
  ) => void;

  position:
    | "SIDEBAR_TOP_LEFT"
    | "SIDEBAR_TOP_RIGHT"
    | "POPUP";
}

/* =========================================================
   CONSTANTS
========================================================= */

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

/* =========================================================
   COMPONENT
========================================================= */

export default function AdvertisementBannerUploader({
  value,
  onChange,
  position,
}: AdvertisementBannerUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [dragging, setDragging] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     POSITION CONFIGURATION
  ======================================================= */

  const isPopup =
    position === "POPUP";

  const positionLabel =
    position ===
    "SIDEBAR_TOP_LEFT"
      ? "Sidebar Top Left"
      : position ===
          "SIDEBAR_TOP_RIGHT"
        ? "Sidebar Top Right"
        : "Popup Advertisement";

  const recommendedSize =
    isPopup
      ? "800 × 600 px"
      : "300 × 1200 px";

  const bannerType =
    isPopup
      ? "Popup Advertisement"
      : "Full Vertical Sidebar";

  /* =======================================================
     UPLOAD
  ======================================================= */

  async function uploadFile(
    file: File
  ) {
    setError("");

    /* -------------------------------------------------------
       TYPE
    ------------------------------------------------------- */

    if (
      !ALLOWED_TYPES.includes(
        file.type
      )
    ) {
      setError(
        "Only JPG, PNG, WEBP and GIF images are allowed."
      );

      return;
    }

    /* -------------------------------------------------------
       SIZE
    ------------------------------------------------------- */

    if (
      file.size > MAX_FILE_SIZE
    ) {
      setError(
        "Maximum file size is 10 MB."
      );

      return;
    }

    /* -------------------------------------------------------
       UPLOAD
    ------------------------------------------------------- */

    setUploading(true);

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/advertisements/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Upload failed."
        );
      }

      if (!data?.url) {
        throw new Error(
          "Cloudinary did not return an image URL."
        );
      }

      onChange(data.url);
    } catch (uploadError) {
      console.error(
        "ADVERTISEMENT IMAGE UPLOAD:",
        uploadError
      );

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload image."
      );
    } finally {
      setUploading(false);
    }
  }

  /* =======================================================
     FILE SELECT
  ======================================================= */

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (file) {
      uploadFile(file);
    }

    event.target.value = "";
  }

  /* =======================================================
     DRAG ENTER
  ======================================================= */

  function handleDragEnter(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    setDragging(true);
  }

  /* =======================================================
     DRAG LEAVE
  ======================================================= */

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);
  }

  /* =======================================================
     DRAG OVER
  ======================================================= */

  function handleDragOver(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (!dragging) {
      setDragging(true);
    }
  }

  /* =======================================================
     DROP
  ======================================================= */

  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      uploadFile(file);
    }
  }

  /* =======================================================
     REMOVE
  ======================================================= */

  function handleRemove() {
    onChange("");
    setError("");
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-5">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {isPopup
            ? "Popup Advertisement Banner"
            : "Full-Size Vertical Banner"}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {isPopup
            ? "Upload a landscape advertisement that will appear as a centered popup when visitors open the site."
            : "Upload a tall advertisement designed for the full sidebar space."}
        </p>
      </div>

      {/* =================================================
          RECOMMENDED SIZE
      ================================================= */}

      <div
        className={
          isPopup
            ? "rounded-xl border border-purple-200 bg-purple-50 p-4"
            : "rounded-xl border border-blue-200 bg-blue-50 p-4"
        }
      >
        <div className="flex items-start gap-3">

          <ImagePlus
            size={20}
            className={
              isPopup
                ? "mt-0.5 shrink-0 text-purple-600"
                : "mt-0.5 shrink-0 text-blue-600"
            }
          />

          <div>
            <p
              className={
                isPopup
                  ? "text-sm font-semibold text-purple-900"
                  : "text-sm font-semibold text-blue-900"
              }
            >
              Recommended banner size
            </p>

            <p
              className={
                isPopup
                  ? "mt-1 text-xs leading-5 text-purple-700"
                  : "mt-1 text-xs leading-5 text-blue-700"
              }
            >
              <strong>
                {recommendedSize}
              </strong>
              {" "}
              for the{" "}
              {isPopup
                ? "responsive popup advertisement."
                : "full vertical desktop sidebar banner."}
            </p>

            {isPopup && (
              <p className="mt-1 text-xs text-purple-600">
                Aspect ratio:{" "}
                <strong>4 : 3</strong>
                {" · "}
                Desktop popup: approximately
                {" "}
                <strong>8 × 6 inches</strong>.
              </p>
            )}

            <p
              className={
                isPopup
                  ? "mt-1 text-xs text-purple-600"
                  : "mt-1 text-xs text-blue-600"
              }
            >
              Position:{" "}
              <strong>
                {positionLabel}
              </strong>
            </p>
          </div>

        </div>
      </div>

      {/* =================================================
          UPLOAD AREA
      ================================================= */}

      {!value && (
        <div
          onDragEnter={
            handleDragEnter
          }
          onDragLeave={
            handleDragLeave
          }
          onDragOver={
            handleDragOver
          }
          onDrop={handleDrop}
          onClick={() =>
            inputRef.current?.click()
          }
          className={`group cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/40"
          }`}
        >

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={
              handleFileChange
            }
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center">

              <Loader2
                size={42}
                className="animate-spin text-emerald-600"
              />

              <p className="mt-4 font-semibold text-slate-800">
                Uploading banner...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Please wait while the image
                is uploaded.
              </p>

            </div>
          ) : (
            <div className="flex flex-col items-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                <UploadCloud
                  size={32}
                  className="text-emerald-600"
                />
              </div>

              <p className="mt-4 text-base font-bold text-slate-900">
                {isPopup
                  ? "Upload Popup Banner"
                  : "Upload Vertical Banner"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Drag & drop your image here
              </p>

              <p className="mt-1 text-sm text-slate-500">
                or{" "}
                <span className="font-semibold text-emerald-600">
                  browse from your computer
                </span>
              </p>

              <p className="mt-4 text-xs text-slate-400">
                JPG, PNG, WEBP or GIF · Maximum 10 MB
              </p>

            </div>
          )}

        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =================================================
          PREVIEW
      ================================================= */}

      {value && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <div className="mb-4 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={18}
                className="text-emerald-600"
              />

              <span className="text-sm font-semibold text-slate-800">
                Banner uploaded successfully
              </span>

            </div>

            <button
              type="button"
              onClick={
                handleRemove
              }
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} />

              Remove
            </button>

          </div>

          <div
            className={
              isPopup
                ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]"
                : "grid gap-6 lg:grid-cols-[220px_1fr]"
            }
          >

            {/* -------------------------------------------
                PREVIEW
            ------------------------------------------- */}

            <div className="flex justify-center">

              <div
                className={
                  isPopup
                    ? "relative aspect-[4/3] w-full max-w-[620px] overflow-hidden rounded-xl border border-slate-300 bg-slate-900 shadow-xl"
                    : "relative h-[520px] w-[180px] overflow-hidden rounded-xl border border-slate-300 bg-slate-900 shadow-xl"
                }
              >

                <img
                  src={value}
                  alt="Advertisement banner preview"
                  className={
                    isPopup
                      ? "h-full w-full object-contain bg-white"
                      : "h-full w-full object-cover"
                  }
                />

                {/* Animated shine */}

                <div
                  className={
                    isPopup
                      ? "pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-white/20 blur-xl"
                      : "pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-white/20 blur-xl"
                  }
                />

                {/* Advertisement label */}

                <div className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                  Advertisement
                </div>

              </div>

            </div>

            {/* -------------------------------------------
                DETAILS
            ------------------------------------------- */}

            <div className="flex flex-col justify-center">

              <div className="rounded-xl border border-slate-200 bg-white p-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Banner Type
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {bannerType}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-slate-400">
                      Position
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {positionLabel}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Recommended
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {recommendedSize}
                    </p>
                  </div>

                </div>

                {isPopup && (
                  <div className="mt-4 rounded-lg bg-purple-50 px-3 py-3 text-xs leading-5 text-purple-700">
                    The popup will automatically scale to fit desktop,
                    tablet and mobile screens while maintaining the
                    4:3 aspect ratio.
                  </div>
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  inputRef.current?.click()
                }
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <UploadCloud size={17} />

                Replace Banner
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={
                  handleFileChange
                }
                className="hidden"
              />

            </div>

          </div>

        </div>
      )}

    </div>
  );
}