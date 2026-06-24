"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import EditorToolbar from "./EditorToolbar";
import MediaModal from "./media/MediaModal";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichEditor({
  value,
  onChange,
}: Props) {
  const [openMedia, setOpenMedia] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Underline,

      Typography,

      Highlight,

      Link.configure({
        openOnClick: false,
      }),

      Image.configure({
        inline: false,
      }),

      Youtube.configure({
        controls: true,
        nocookie: true,
      }),

      Placeholder.configure({
        placeholder:
          "Start writing your news article...",
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Table.configure({
        resizable: true,
      }),

      TableRow,
      TableCell,
      TableHeader,
    ],

    immediatelyRender: false,

    content: value,

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[550px] focus:outline-none p-8",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

      <EditorToolbar
        editor={editor}
        openMedia={() => setOpenMedia(true)}
      />

      {editor && (
        <BubbleMenu editor={editor}>
          <div className="rounded-lg bg-white shadow-lg border p-2 flex gap-2">

            <button
              onClick={() =>
                editor.chain().focus().toggleBold().run()
              }
            >
              <b>B</b>
            </button>

            <button
              onClick={() =>
                editor.chain().focus().toggleItalic().run()
              }
            >
              <i>I</i>
            </button>

            <button
              onClick={() =>
                editor.chain().focus().toggleUnderline().run()
              }
            >
              U
            </button>

          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />

      <MediaModal
        open={openMedia}
        onClose={() => setOpenMedia(false)}
        onInsert={(url) => {
          editor
            ?.chain()
            .focus()
            .setImage({
              src: url,
            })
            .run();
        }}
      />
    </div>
  );
}
