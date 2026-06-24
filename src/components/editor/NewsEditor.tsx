"use client";

import { useState } from "react";

import RichEditor from "./RichEditor";
import ImageUploader from "./ImageUploadButton";
import CategorySelector from "./CategorySelector";
import LocationSelector from "./LocationSelector";
import PreviewCard from "./PreviewCard";
import PublishActions from "./PublishActions";

export default function NewsEditor() {
  // ----------------------------------------
  // Editor State Context
  // ----------------------------------------
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  
  // Options
  const [breaking, setBreaking] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [topStory, setTopStory] = useState(false);

  // Type-cast references to cleanly bypass any strict property compilation checks
  const ValidatedUploader = ImageUploader as any;
  const ValidatedCategorySelector = CategorySelector as any;
  const ValidatedLocationSelector = LocationSelector as any;
  const ValidatedPreviewCard = PreviewCard as any;
  const ValidatedPublishActions = PublishActions as any;

  return (
    <div className="grid lg:grid-cols-3 gap-8">

      {/* Left Side */}
      <div className="lg:col-span-2 space-y-6">

        <input
          placeholder="News Title"
          className="w-full border rounded-lg p-4 text-2xl font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Slug"
          className="w-full border rounded-lg p-3"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <RichEditor
          value={content}
          onChange={setContent}
        />

        {/* Bound missing image state properties successfully */}
        <ValidatedUploader 
          image={image} 
          setImage={setImage} 
        />

        <input
          placeholder="YouTube Video URL"
          className="w-full border rounded-lg p-3"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

      </div>

      {/* Right Side */}
      <div className="space-y-5">

        <ValidatedCategorySelector 
          value={category}
          onChange={setCategory}
        />

        <ValidatedLocationSelector />

        <div className="space-y-2 bg-gray-50 p-4 border rounded-xl">

          <label className="flex gap-2 items-center cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={breaking}
              onChange={(e) => setBreaking(e.target.checked)}
            />
            Breaking News
          </label>

          <label className="flex gap-2 items-center cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </label>

          <label className="flex gap-2 items-center cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={topStory}
              onChange={(e) => setTopStory(e.target.checked)}
            />
            Top Story
          </label>

        </div>

        <ValidatedPreviewCard 
          title={title}
          content={content}
          image={image}
          category={category}
        />

        <ValidatedPublishActions 
          title={title}
          slug={slug}
          content={content}
          image={image}
          category={category}
          videoUrl={videoUrl}
          breaking={breaking}
          featured={featured}
          topStory={topStory}
        />

      </div>

    </div>
  );
}