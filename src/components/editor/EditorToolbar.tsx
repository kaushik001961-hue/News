
"use client";

import { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Highlighter,
  Undo2,
  Redo2,
  Link2,
  ImageIcon,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  PlayCircle,
} from "lucide-react";

interface Props {
  editor: Editor | null;
  openMedia: () => void;
}

export default function EditorToolbar({
  editor,
  openMedia,
}: Props) {
  if (!editor) return null;

  const Button = ({
    onClick,
    active,
    children,
  }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md p-2 transition
      ${
        active
          ? "bg-red-600 text-white"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="sticky top-0 z-20 flex flex-wrap gap-1 border-b bg-white p-3 overflow-x-auto">

      <Button
        onClick={() =>
          editor.chain().focus().undo().run()
        }
      >
        <Undo2 size={18} />
      </Button>

      <Button
        onClick={() =>
          editor.chain().focus().redo().run()
        }
      >
        <Redo2 size={18} />
      </Button>

      <div className="mx-2 border-r" />

      <Button
        active={editor.isActive("bold")}
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold size={18} />
      </Button>

      <Button
        active={editor.isActive("italic")}
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
      >
        <Italic size={18} />
      </Button>

      <Button
        active={editor.isActive("underline")}
        onClick={() =>
          editor.chain().focus().toggleUnderline().run()
        }
      >
        <Underline size={18} />
      </Button>

      <Button
        active={editor.isActive("strike")}
        onClick={() =>
          editor.chain().focus().toggleStrike().run()
        }
      >
        <Strikethrough size={18} />
      </Button>

      <div className="mx-2 border-r" />

      <Button
        active={editor.isActive("heading", { level: 1 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({
            level: 1,
          }).run()
        }
      >
        <Heading1 size={18} />
      </Button>

      <Button
        active={editor.isActive("heading", { level: 2 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({
            level: 2,
          }).run()
        }
      >
        <Heading2 size={18} />
      </Button>

      <Button
        active={editor.isActive("heading", { level: 3 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({
            level: 3,
          }).run()
        }
      >
        <Heading3 size={18} />
      </Button>

      <div className="mx-2 border-r" />

      <Button
        active={editor.isActive("bulletList")}
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <List size={18} />
      </Button>

      <Button
        active={editor.isActive("orderedList")}
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered size={18} />
      </Button>

      <Button
        active={editor.isActive("blockquote")}
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
      >
        <Quote size={18} />
      </Button>

      <Button
        active={editor.isActive("codeBlock")}
        onClick={() =>
          editor.chain().focus().toggleCodeBlock().run()
        }
      >
        <Code2 size={18} />
      </Button>

      <Button
        active={editor.isActive("highlight")}
        onClick={() =>
          editor.chain().focus().toggleHighlight().run()
        }
      >
        <Highlighter size={18} />
      </Button>

      <div className="mx-2 border-r" />

      <Button
        onClick={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeft size={18} />
      </Button>

      <Button
        onClick={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenter size={18} />
      </Button>

      <Button
        onClick={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRight size={18} />
      </Button>

      <div className="mx-2 border-r" />

      <Button
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
      </Button>

      <Button
        onClick={openMedia}
      >
        <ImageIcon size={18} />
      </Button>

      <Button
        onClick={() => {
          const url = prompt("YouTube URL");

          if (!url) return;

          editor
            .chain()
            .focus()
            .setYoutubeVideo({
              src: url,
            })
            .run();
        }}
      >
        <PlayCircle size={18} />
      </Button>

      <Button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
            .run()
        }
      >
        <Table size={18} />
      </Button>

    </div>
  );
}
