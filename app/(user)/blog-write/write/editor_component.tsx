"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../(tools)/tool";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { DialogPreview } from "@/components/elements/dialogPrev/page";
import { Label } from "@radix-ui/react-label";
import Input from "@/components/elements/input/page";
import { Textarea } from "@/components/ui/textarea";

export default function EditorComponent() {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [title, setTitle] = useState({ title: "", slug: "" });
  const { data: session }: { data: any } = useSession();
  const editorRef = useRef<EditorJS | null>(null);
  const { push } = useRouter();
  const editorTools = useMemo(() => {
    return EDITOR_JS_TOOLS(setIsUploadingImage);
  }, [isUploadingImage]);
  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: editorTools,
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
        title: title.title,
        data: savedData,
        userData: userDataEmail,
        is_published: true,
        slug: title.slug,
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

  const handleSaveDraft = async () => {
    if (editorRef.current) {
      const savedData = await editorRef.current.saver.save();
      const blogData = {
        title,
        data: savedData,
        userData: userDataEmail,
        is_published: false,
      };

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
        <DialogPreview
          onClick={handlePublish}
          disabled={isUploadingImage}
          Description={
            "Just a heads-up: This only changes how your story looks in public spaces and emails. The content of your story stays exactly the same."
          }
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              disabled
              className="col-span-5"
              value={title.title}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Insert Slug
            </Label>
            <Textarea
              id="name"
              className="col-span-3"
              placeholder="Insert Slug"
              name="slug"
              onChange={(e) =>
                setTitle((prev) => ({ ...prev, slug: e.target.value }))
              }
            />
          </div>
        </DialogPreview>
        <Button
          className="py-7"
          variant="secondary"
          disabled={isUploadingImage}
          onClick={() => handleSaveDraft()}
        >
          Save Draft
        </Button>
      </nav>
      <div className="mt-3">
        <input
          type="text"
          className="mb-2 w-full appearance-none p-2 text-3xl focus:outline-none active:border-0"
          placeholder="Insert Title"
          name="title"
          onChange={(e) =>
            setTitle((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <div id="editorjs" className="min-h-[300px] p-4" />
      </div>
    </div>
  );
}
