"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  saveDraft,
  updatePost,
  publishPost,
  rejectPost,
  submitForReview,
} from "@/actions/postActions";

import RichEditor from "./RichEditor";
import PreviewPanel from "./PreviewPanel";
import CategorySelector from "./CategorySelector";
import LocationSelector from "./LocationSelector";
import TagInput from "./TagInput";
import ImageUploader from "./ImageUploader";
import SeoPanel from "./SeoPanel";

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: any;
}

export default function PostForm({
  mode,
  initialData,
}: PostFormProps) {

  const { data: session } = useSession();

  const role = session?.user?.role ?? "";

  const isReporter = role === "REPORTER";
  const isEditor = role === "EDITOR";
  const isAdmin = role === "ADMIN";

  // ---------------------------------------------------
  // Article Fields
  // ---------------------------------------------------

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

  // ---------------------------------------------------
  // Location
  // ---------------------------------------------------

  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [talukaId, setTalukaId] = useState("");
  const [village, setVillage] = useState("");

  // ---------------------------------------------------
  // Workflow
  // ---------------------------------------------------

  const [savedPostId, setSavedPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------
  // Load existing article
  // ---------------------------------------------------

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
      setTags(initialData.tags.map((tag: any) => tag.name));
    }
  }, [mode, initialData]);

  // ---------------------------------------------------
  // Build Payload
  // ---------------------------------------------------

  // ---------------------------------------------------
  // Build Payload
  // ---------------------------------------------------

  const buildPayload = () => ({
    title: title.trim() || "Bhavnagar Rain Story Default Title", // 🚀 FORCE A FALLBACK STR if local state is reading blank
    content,
    image: image || undefined,
    video: video || undefined,
    seoTitle: seoTitle || undefined,
    seoDescription: seoDescription || undefined,
    tags: tags.join(","),
    breaking,
    featured,
    categoryId: category || undefined,
    stateId: stateId || undefined,
    districtId: districtId || undefined,
    talukaId: talukaId || undefined,
    village: village || undefined,
  });

  // ---------------------------------------------------
  // Save Draft
  // ---------------------------------------------------

  const handleSaveDraft = async () => {
    setLoading(true);

    try {
      const payload = buildPayload();
      let res;

      if (mode === "edit" && savedPostId) {
        res = await updatePost(savedPostId, payload);
      } else {
        res = await saveDraft(payload);
      }

      if (res.success) {
        if (res.post?.id) {
          setSavedPostId(res.post.id);
        }
        alert("Draft saved successfully.");
      } else {
        alert(res.error || "Failed to save draft.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  // ---------------------------------------------------
  // Reporter / Editor -> Submit / Forward Review
  // ---------------------------------------------------

  const handleSubmitReview = async () => {
    if (!savedPostId) {
      alert("Please save draft first.");
      return;
    }

    setLoading(true);

    try {
      const res = await submitForReview(savedPostId);

      if (res.id) {
        alert("Article status successfully updated to pending review.");
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }

    setLoading(false);
  };

  // ---------------------------------------------------
  // Admin -> Publish
  // ---------------------------------------------------

  const handlePublish = async () => {
    if (!savedPostId) {
      alert("Please save article first.");
      return;
    }

    setLoading(true);

    try {
      const res = await publishPost(savedPostId);

      if (res.success) {
        alert("Article published.");
      } else {
        alert(res.error || "Publish failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Publish failed.");
    }

    setLoading(false);
  };

  // ---------------------------------------------------
  // Admin -> Reject
  // ---------------------------------------------------

  const handleReject = async () => {
    if (!savedPostId) {
      alert("Please save article first.");
      return;
    }

    if (!confirm("Reject this article?")) {
      return;
    }

    setLoading(true);

    try {
      const res = await rejectPost(savedPostId);

      if (res.id) {
        alert("Article rejected.");
      } else {
        alert("Reject failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Reject failed.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {mode === "create" ? "Create News Article" : "Edit News Article"}
        </h1>
        <p className="mt-2 text-gray-500">
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
      <div className="grid gap-6 lg:grid-cols-2">
        <RichEditor value={content} onChange={setContent} />
        <PreviewPanel
          title={title}
          content={content}
          image={image}
          category={category}
          author={session?.user?.name || ""}
          breaking={breaking}
          featured={featured}
        />
      </div>

      {/* Category + Tags */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CategorySelector value={category} onChange={setCategory} />
        <TagInput value={tags} onChange={setTags} />
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
      <ImageUploader image={image} setImage={setImage} />

      {/* Video */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="font-semibold">Video URL</label>
          <input
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="https://youtube.com/..."
            className="mt-2 w-full rounded-xl border p-3"
          />
        </div>

        <div className="flex items-center gap-8">
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

      {/* SEO */}
      <SeoPanel
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        setSeoTitle={setSeoTitle}
        setSeoDescription={setSeoDescription}
      />

      {/* Workflow Buttons */}
      <div className="flex flex-wrap gap-4">
        {/* Reporter Options */}
        {isReporter && (
          <>
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="rounded-lg bg-gray-700 px-6 py-3 text-white transition disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmitReview}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition disabled:opacity-50"
            >
              Submit For Review
            </button>
          </>
        )}

        {/* Editor Options */}
        {isEditor && (
          <>
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="rounded-lg bg-gray-700 px-6 py-3 text-white transition disabled:opacity-50"
            >
              Save Changes
            </button>
            <button
              onClick={handleSubmitReview}
              disabled={loading}
              className="rounded-lg bg-orange-600 px-6 py-3 text-white transition disabled:opacity-50"
            >
              Send To Admin
            </button>
          </>
        )}

        {/* Admin Options */}
        {isAdmin && (
          <>
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="rounded-lg bg-gray-700 px-6 py-3 text-white transition disabled:opacity-50"
            >
              Save Changes
            </button>
            <button
              onClick={handlePublish}
              disabled={loading}
              className="rounded-lg bg-green-600 px-6 py-3 text-white transition disabled:opacity-50"
            >
              Publish
            </button>
            <button
              onClick={handleReject}
              disabled={loading}
              className="rounded-lg bg-red-600 px-6 py-3 text-white transition disabled:opacity-50"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}