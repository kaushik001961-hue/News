
"use client";

import { useState } from "react";

import RichEditor from "@/components/editor/RichEditor";
import PreviewPanel from "@/components/editor/PreviewPanel";
import CategorySelector from "@/components/editor/CategorySelector";
import TagInput from "@/components/editor/TagInput";
import LocationSelector from "@/components/editor/LocationSelector";
import ImageUploader from "@/components/editor/ImageUploader";
import SeoPanel from "@/components/editor/SeoPanel";
import AutoSave from "@/components/editor/AutoSave";
import PublishActions from "@/components/editor/PublishActions";


export default function EditorForm() {
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

  

  return (
    
    <div className="space-y-6">

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="News Title..."
        className="w-full rounded-xl border bg-white p-4 text-3xl font-bold shadow-sm"
      />

      <div className="grid gap-6 lg:grid-cols-2">

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

    </div>
    
  );
}

