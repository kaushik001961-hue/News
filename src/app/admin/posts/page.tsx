"use client";

import { useState } from "react";
import { saveDraft, publishPost } from "@/actions/postActions";
import RichEditor from "@/components/editor/RichEditor";
import PreviewPanel from "@/components/editor/PreviewPanel";
import CategorySelector from "@/components/editor/CategorySelector";
import LocationSelector from "@/components/editor/LocationSelector";
import TagInput from "@/components/editor/TagInput";
import ImageUploader from "@/components/editor/ImageUploader";
import SeoPanel from "@/components/editor/SeoPanel";
import PublishActions from "@/components/editor/PublishActions";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // location state
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [talukaId, setTalukaId] = useState("");
  const [village, setVillage] = useState("");

  // State to track saved post ID after creating a draft
  const [savedPostId, setSavedPostId] = useState<string | null>(null);

  // Wrapper function to process form data and execute saveDraft server action
  const handleSaveDraft = async () => {
    const payload = {
      title,
      content,
      image: image || undefined,
      video: video || undefined,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      tags: tags.length > 0 ? tags.join(",") : undefined, // Convert string[] to string list
      breaking,
      featured,
      categoryId: category || undefined,
      stateId: stateId || undefined,
      districtId: districtId || undefined,
      talukaId: talukaId || undefined,
      village: village || undefined,
      authorId: "temp-author-id", // Replace with your active user/session ID (e.g., session.user.id)
    };

    const response = await saveDraft(payload);
    if (response.success && response.post) {
      setSavedPostId(response.post.id);
      alert("Draft saved successfully!");
    } else {
      console.error(response.errors);
      alert("Failed to save draft.");
    }
  };

  // Wrapper function to pass the current post context ID to publishPost server action
  const handlePublish = async () => {
    if (!savedPostId) {
      alert("Please save this article as a draft first before publishing.");
      return;
    }

    const response = await publishPost(savedPostId);
    if (response.success) {
      alert("Article published successfully!");
    } else {
      alert("Failed to publish article.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Create News Article</h1>
        <p className="text-gray-500">
          Write and publish breaking news with live preview.
        </p>
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="News Title"
        className="w-full rounded-xl border p-4 text-2xl font-semibold"
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <RichEditor value={content} onChange={setContent} />

        <PreviewPanel
          title={title}
          content={content}
          image={image}
          category={category}
          author="AGS News"
          breaking={breaking}
          featured={featured}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <CategorySelector value={category} onChange={setCategory} />

        <TagInput value={tags} onChange={setTags} />
      </div>

      {/* 🔥 IMPORTANT FIX HERE */}
      <LocationSelector
        stateId={stateId}
        districtId={districtId}
        talukaId={talukaId}
        village={village}
        setStateId={setStateId}
        setDistrictId={setDistrictId}
        setTalukaId={setTalukaId}
        setVillage={setVillage}
      />

      <ImageUploader image={image} setImage={setImage} />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Video URL</label>

          <input
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="https://youtube.com/..."
            className="mt-2 w-full rounded-xl border p-3"
          />
        </div>

        <div className="flex gap-8 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={breaking}
              onChange={(e) => setBreaking(e.target.checked)}
            />
            Breaking News
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured News
          </label>
        </div>
      </div>

      <SeoPanel
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        setSeoTitle={setSeoTitle}
        setSeoDescription={setSeoDescription}
      />

      {/* Fixed: Pass zero-argument wrappers to resolve properties requirement */}
      <PublishActions 
        onSaveDraft={handleSaveDraft} 
        onPublish={handlePublish} 
      />
    </div>
  );
}