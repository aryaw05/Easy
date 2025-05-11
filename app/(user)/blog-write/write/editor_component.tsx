"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../(tools)/tool";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

      editorRef.current = editor;
    }
  }, []);

  const userDataEmail = session?.user?.email;
  const handlePublish = async () => {
    if (editorRef.current) {
      const savedData = await editorRef.current.saver.save();
      const blogData = {
        title,
        data: savedData,
        userData: userDataEmail,
        is_published: true,
      };
      console.log(blogData);

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

  const handleSaveDraft = async () => {
    if (editorRef.current) {
      const savedData = await editorRef.current.saver.save();
      const blogData = {
        title,
        data: savedData,
        userData: userDataEmail,
        is_published: false,
      };
      console.log(blogData);

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
      <nav className="flex justify-end gap-4">
        <Button
          disabled={isUploadingImage}
          onClick={() => handlePublish()}
          className="py-7"
        >
          Publish
        </Button>
        <Button
          className="py-7"
          variant="secondary"
          disabled={isUploadingImage}
          onClick={() => handleSaveDraft()}
        >
          <a href="/dashboard">Save Draft</a>
        </Button>
      </nav>
      <div className="mt-3">
        <input
          type="text"
          className="mb-2 w-full appearance-none p-2 text-3xl focus:outline-none active:border-0"
          placeholder="Insert Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="editorjs" className="min-h-[300px] p-4" />
      </div>
    </div>
  );
}
