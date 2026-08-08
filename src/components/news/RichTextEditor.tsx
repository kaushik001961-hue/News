"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Link2,
} from "lucide-react";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      Image,

      Placeholder.configure({
        placeholder: "Start writing your news...",
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      {/* Toolbar */}

      <div className="flex flex-wrap gap-2 border-b p-3">

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Bold size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Italic size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <UnderlineIcon size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Heading1 size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Heading2 size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <List size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <ListOrdered size={18} />
        </button>

        <button
          onClick={() => {
            const url = window.prompt("Enter URL");

            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Link2 size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Undo size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Redo size={18} />
        </button>

      </div>

      {/* Editor */}

      <EditorContent
        editor={editor}
        className="min-h-[500px] p-6 prose prose-slate max-w-none focus:outline-none"
      />
    </div>
  );
}