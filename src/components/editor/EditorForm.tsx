"use client";

import { useState } from "react";

import SlugInput from "./SlugInput";
import CategorySelector from "./CategorySelector";
import LocationSelector from "./LocationSelector";
import TagsInput from "./TagInput";
import ImageUploader from "./ImageUploader";
import RichEditor from "./RichEditor";
import SeoPanel from "./SeoPanel";
import PreviewPanel from "./PreviewPanel";
import PublishActions from "./PublishActions";

interface Category {
  id: string;
  name: string;
}

interface StateType {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  states: StateType[];
}

export default function EditorForm({
  categories,
  states,
}: Props) {
  // ----------------------------------------
  // Main Post State
  // ----------------------------------------

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [talukaId, setTalukaId] = useState("");
  const [village, setVillage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [featured, setFeatured] = useState(false);

  return (
    <div className="grid grid-cols-12 gap-8">

      {/* =======================================
          LEFT COLUMN
      ======================================== */}

      <div className="col-span-12 lg:col-span-8 space-y-6">

        {/* Title */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">
            News Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter news title..."
            className="w-full rounded-xl border p-4 text-2xl"
          />
        </div>

        {/* Slug */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <SlugInput
            title={title}
            value={slug}
            onChange={setSlug}
          />
        </div>

        {/* Rich Editor */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <RichEditor
            value={content}
            onChange={setContent}
          />
        </div>

      </div>

      {/* =======================================
          RIGHT SIDEBAR
      ======================================== */}

      <div className="col-span-12 lg:col-span-4 space-y-6">

        {/* Publish */}
        <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">
          {(() => {
            const ValidatedPublishActions = PublishActions as any;
            return (
              <ValidatedPublishActions
                title={title}
                slug={slug}
                content={content}
                categoryId={categoryId}
                tags={tags}
                image={image}
                video={video}
                seoTitle={seoTitle}
                seoDescription={seoDescription}
                stateId={stateId}
                districtId={districtId}
                talukaId={talukaId}
                village={village}
                breaking={breaking}
                featured={featured}
              />
            );
          })()}
        </div>

        {/* Category */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          {(() => {
            const ValidatedCategorySelector = CategorySelector as any;
            return (
              <ValidatedCategorySelector
                categories={categories}
                value={categoryId}
                onChange={setCategoryId}
              />
            );
          })()}
        </div>

        {/* Tags */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <TagsInput
            value={tags}
            onChange={setTags}
          />
        </div>

        {/* Featured Image */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <ImageUploader
            image={image}
            setImage={setImage}
          />
        </div>

        {/* Video */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <label className="block font-semibold mb-2">
            YouTube Video URL
          </label>
          <input
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Location */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <LocationSelector
            states={states}
            stateId={stateId}
            districtId={districtId}
            talukaId={talukaId}
            village={village}
            setStateId={setStateId}
            setDistrictId={setDistrictId}
            setTalukaId={setTalukaId}
            setVillage={setVillage}
          />
        </div>

        {/* SEO */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <SeoPanel
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            setSeoTitle={setSeoTitle}
            setSeoDescription={setSeoDescription}
          />
        </div>

        {/* Options */}
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={breaking}
              onChange={(e) => setBreaking(e.target.checked)}
            />
            Breaking News
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured News
          </label>
        </div>

        {/* Preview */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <PreviewPanel
            title={title}
            content={content}
            image={image}
            category={
              categories.find((c) => c.id === categoryId)?.name ?? ""
            }
            author="AGS News"
            breaking={breaking}
            featured={featured}
          />
        </div>

      </div>

    </div>
  );
}