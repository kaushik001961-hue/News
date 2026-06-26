"use client";

import { useEffect, useState } from "react";
import {
  saveDraft,
  publishPost,
  updatePost,
} from "@/actions/postActions";

import RichEditor from "./RichEditor";
import PreviewPanel from "./PreviewPanel";
import CategorySelector from "./CategorySelector";
import LocationSelector from "./LocationSelector";
import TagInput from "./TagInput";
import ImageUploader from "./ImageUploader";
import SeoPanel from "./SeoPanel";
import PublishActions from "./PublishActions";

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: any;
}

export default function PostForm({
  mode,
  initialData,
}: PostFormProps) {
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

  const [stateId, setStateId] = useState("");

  const [districtId, setDistrictId] = useState("");

  const [talukaId, setTalukaId] = useState("");

  const [village, setVillage] = useState("");

  const [savedPostId, setSavedPostId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode !== "edit" || !initialData) return;

    setSavedPostId(initialData.id);

    setTitle(initialData.title ?? "");

    setContent(initialData.content ?? "");

    setCategory(initialData.categoryId ?? "");

    setImage(initialData.image ?? "");

    setVideo(initialData.video ?? "");

    setBreaking(initialData.breaking ?? false);

    setFeatured(initialData.featured ?? false);

    setSeoTitle(initialData.seoTitle ?? "");

    setSeoDescription(initialData.seoDescription ?? "");

    setStateId(initialData.stateId ?? "");

    setDistrictId(initialData.districtId ?? "");

    setTalukaId(initialData.talukaId ?? "");

    setVillage(initialData.village ?? "");

    if (initialData.tags) {
      setTags(
        initialData.tags.map((tag: any) => tag.name)
      );
    }
  }, [mode, initialData]);

  // ------------------------------------
  // Save Draft / Update
  // ------------------------------------

  const handleSaveDraft = async () => {
    setLoading(true);

    try {
      const payload = {
        title,
        content,
        image: image || undefined,
        video: video || undefined,

        seoTitle: seoTitle || undefined,
        seoDescription:
          seoDescription || undefined,

        tags: tags.join(","),

        breaking,
        featured,

        categoryId: category || undefined,

        stateId: stateId || undefined,
        districtId: districtId || undefined,
        talukaId: talukaId || undefined,
        village: village || undefined,

        // TODO:
        // Replace with logged in user id
        authorId: "temp-author-id",
      };

      if (mode === "edit" && savedPostId) {
        const res = await updatePost(
          savedPostId,
          payload
        );

        if (res.success) {
          alert("Post updated successfully.");
        } else {
          alert("Update failed.");
        }
      } else {
        const res = await saveDraft(payload);

        if (res.success && res.post) {
          setSavedPostId(res.post.id);

          alert("Draft saved.");
        } else {
          alert("Save failed.");
        }
      }
    } catch (err) {
      console.error(err);

      alert("Something went wrong.");
    }

    setLoading(false);
  };

  // ------------------------------------
  // Publish
  // ------------------------------------

  const handlePublish = async () => {
    if (!savedPostId) {
      alert(
        "Please save the article first."
      );

      return;
    }

    setLoading(true);

    try {
      const res = await publishPost(
        savedPostId
      );

      if (res.success) {
        alert("Article published.");
      } else {
        alert("Publish failed.");
      }
    } catch (err) {
      console.error(err);

      alert("Publish failed.");
    }

    setLoading(false);
  };

    return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          {mode === "create"
            ? "Create News Article"
            : "Edit News Article"}
        </h1>

        <p className="text-gray-500 mt-2">
          Write and publish breaking news with live preview.
        </p>
      </div>

      {/* Title */}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="News Title"
        className="w-full rounded-xl border p-4 text-2xl font-semibold"
      />

      {/* Editor + Preview */}

      <div className="grid lg:grid-cols-2 gap-6">

        <RichEditor
          value={content}
          onChange={setContent}
        />

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

      {/* Category + Tags */}

      <div className="grid lg:grid-cols-2 gap-6">

        <CategorySelector
          value={category}
          onChange={setCategory}
        />

        <TagInput
          value={tags}
          onChange={setTags}
        />

      </div>

      {/* Location */}

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

      {/* Image */}

      <ImageUploader
        image={image}
        setImage={setImage}
      />

      {/* Video */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold">
            Video URL
          </label>

          <input
            value={video}
            onChange={(e) =>
              setVideo(e.target.value)
            }
            placeholder="https://youtube.com/..."
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

        <div className="flex gap-8 items-center">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={breaking}
              onChange={(e) =>
                setBreaking(e.target.checked)
              }
            />

            Breaking News

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(e.target.checked)
              }
            />

            Featured News

          </label>

        </div>

      </div>

      {/* SEO */}

      <SeoPanel
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        setSeoTitle={setSeoTitle}
        setSeoDescription={setSeoDescription}
      />

      {/* Buttons */}

      <PublishActions
        loading={loading}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

    </div>
  );
}