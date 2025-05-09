"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../(tools)/tool";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EditorComponent() {
  // const [data, setData] = useState<OutputData | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [title, setTitle] = useState("");
  const { data: session }: { data: any } = useSession();
  const editorRef = useRef<EditorJS | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS(setIsUploadingImage),
        placeholder: "Let`s write an awesome story!",
      });
      console.log(editor.holder);

      editorRef.current = editor;
    }
  }, []);

  const userDataEmail = session?.user?.email;
  const handleSubmit = async () => {
    if (editorRef.current) {
      const savedData = await editorRef.current.saver.save();
      const blogData = {
        title,
        data: savedData,
        userData: userDataEmail,
      };
      // addBlogData(blogData);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/editor`,
        {
          method: "POST",
          body: JSON.stringify(blogData),
        },
      ).then((res) => res.json());

      if (res.status) {
        push("/dashboard");
      } else {
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div id="editorjs" className="min-h-[300px] p-4" />
      <button
        disabled={isUploadingImage}
        onClick={() => handleSubmit()}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        {isUploadingImage ? "Uploading..." : "Submit"}
      </button>
    </div>
  );
}
