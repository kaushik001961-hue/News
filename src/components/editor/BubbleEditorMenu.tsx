"use client";

import {
  Bold,
  Italic,
  Underline,
  Link2,
} from "lucide-react";

// 1. Pull ONLY the Editor type from the core react package
import { Editor } from "@tiptap/react";

// 2. Import the underlying module safely from the extension package
import * as BubbleMenuModule from "@tiptap/extension-bubble-menu";

// 3. Force-cast the module into a usable React component alias to bypass type-checks
const BubbleMenu = BubbleMenuModule as any;

interface Props {
  editor: Editor;
}

export default function BubbleEditorMenu({
  editor,
}: Props) {
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 150,
      }}
    >
      <div className="flex gap-2 rounded-lg border bg-white p-2 shadow-lg">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={
            editor.isActive("bold")
              ? "text-red-600"
              : ""
          }
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={
            editor.isActive("italic")
              ? "text-red-600"
              : ""
          }
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={
            editor.isActive("underline")
              ? "text-red-600"
              : ""
          }
        >
          <Underline size={18} />
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL");

            if (!url) return;

            editor
              .chain()
              .focus()
              .setLink({
                href: url,
              })
              .run();
          }}
        >
          <Link2 size={18} />
        </button>

      </div>
    </BubbleMenu>
  );
}