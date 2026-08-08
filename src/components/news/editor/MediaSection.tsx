"use client";

import Image from "next/image";
import { Upload, Trash2, ImageIcon, Video } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ChangeEvent, useRef } from "react";

import { NewsEditorValues } from "@/types/news";

interface Props {
  form: UseFormReturn<NewsEditorValues>;

  onUpload?: (file: File) => Promise<string>;
}

export default function MediaSection({
  form,
  onUpload,
}: Props) {
  const {
    watch,
    setValue,
    register,
  } = form;

  const featuredImage = watch("featuredImage");
  const gallery = watch("gallery") ?? [];
  const video = watch("video");

  const featuredRef =
    useRef<HTMLInputElement>(null);

  const galleryRef =
    useRef<HTMLInputElement>(null);

  async function uploadFeatured(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (onUpload) {
      const url = await onUpload(file);

      setValue("featuredImage", url);

      return;
    }

    setValue(
      "featuredImage",
      URL.createObjectURL(file)
    );
  }

  async function uploadGallery(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      e.target.files ?? []
    );

    if (files.length === 0) return;

    const images: string[] = [];

    for (const file of files) {
      if (onUpload) {
        images.push(await onUpload(file));
      } else {
        images.push(
          URL.createObjectURL(file)
        );
      }
    }

    setValue("gallery", [
      ...gallery,
      ...images,
    ]);
  }

  function removeGallery(index: number) {
    const copy = [...gallery];

    copy.splice(index, 1);

    setValue("gallery", copy);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b p-6">

        <h2 className="text-xl font-bold">
          Media
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload featured image, gallery and
          video.
        </p>

      </div>

      <div className="space-y-8 p-6">

        {/* Featured Image */}

        <div>

          <div className="mb-3 flex items-center justify-between">

            <label className="font-semibold">
              Featured Image
            </label>

            <button
              type="button"
              onClick={() =>
                featuredRef.current?.click()
              }
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              <Upload size={18} />

              Upload
            </button>

          </div>

          <input
            ref={featuredRef}
            hidden
            type="file"
            accept="image/*"
            onChange={uploadFeatured}
          />

          {featuredImage ? (

            <div className="relative mt-4 overflow-hidden rounded-xl border">

              <Image
                src={featuredImage}
                alt="Featured"
                width={900}
                height={500}
                className="h-64 w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setValue(
                    "featuredImage",
                    ""
                  )
                }
                className="absolute right-4 top-4 rounded-full bg-red-600 p-2 text-white"
              >
                <Trash2 size={18} />
              </button>

            </div>

          ) : (

            <div className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed">

              <div className="text-center">

                <ImageIcon
                  size={42}
                  className="mx-auto mb-3 text-slate-400"
                />

                <p>No image selected</p>

              </div>

            </div>

          )}

        </div>

        {/* Gallery */}

        <div>

          <div className="mb-4 flex items-center justify-between">

            <label className="font-semibold">
              Gallery
            </label>

            <button
              type="button"
              onClick={() =>
                galleryRef.current?.click()
              }
              className="rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              Add Images
            </button>

          </div>

          <input
            hidden
            multiple
            ref={galleryRef}
            type="file"
            accept="image/*"
            onChange={uploadGallery}
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {gallery.map((image, index) => (

              <div
                key={index}
                className="relative overflow-hidden rounded-xl border"
              >

                <Image
                  src={image}
                  alt=""
                  width={400}
                  height={300}
                  className="h-36 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeGallery(index)
                  }
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Video */}

        <div>

          <label className="mb-2 block font-semibold">
            Video URL
          </label>

          <div className="flex items-center gap-3">

            <Video className="text-slate-500" />

            <input
              {...register("video")}
              placeholder="https://youtube.com/..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

          </div>

          {video && (

            <div className="mt-4 rounded-lg bg-slate-100 p-4 text-sm break-all">

              {video}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}