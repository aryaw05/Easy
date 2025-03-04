"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EDITOR_JS_TOOLS } from "../../(tools)/tool";
import EditorJS from "@editorjs/editorjs";

export default function EditBlogView({ data }: any) {
  const [title, setTitle] = useState(data.title);
  const editorRef = useRef<EditorJS | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
        data: data.content,
      });

      editorRef.current = editor;
    }
  }, []);

  const handleSubmit = async () => {
    if (editorRef.current) {
      const savedData = await editorRef.current.saver.save();
      const blogData = {
        title,
        data: savedData,
        blogID: data.id,
        update_date: new Date(),
        updated: true,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/edit_data`,
        {
          method: "PATCH",
          body: JSON.stringify(blogData),
        },
      ).then((res) => res.json());

      if (res.status) {
        push("/dashboard");
      } else {
        // tambah state jika error ya wkwkw
        console.log(res.message);
      }
    }
  };
  return (
    <div>
      <input
        type="text"
        className="mb-2 w-full appearance-none p-2 text-3xl focus:outline-none active:border-0"
        placeholder="Insert Title"
        defaultValue={data.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div id="editorjs" className="min-h-[300px] p-4" />
      <button
        onClick={() => handleSubmit()}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </div>
  );
}
