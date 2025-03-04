import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
export const EDITOR_JS_TOOLS = {
  header: {
    class: Header as unknown as { new (): any },
    config: {
      placeholder: "Enter a header",
    },
    inlineToolbar: ["link"],
  },

  quote: {
    class: Quote as unknown as { new (): any },
    inlineToolbar: true,
  },
  image: {
    class: ImageTool as unknown as { new (): any },
    config: {
      endpoints: {
        byFile: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/image_storage/upload`,
        // byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      },
    },
  },
};
