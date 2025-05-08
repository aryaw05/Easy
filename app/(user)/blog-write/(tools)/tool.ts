import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import imageCompression from "browser-image-compression";

// export const EDITOR_JS_TOOLS = {
//   header: {
//     class: Header as unknown as { new (): any },
//     config: {
//       placeholder: "Enter a header",
//     },
//     inlineToolbar: ["link"],
//   },

//   quote: {
//     class: Quote as unknown as { new (): any },
//     inlineToolbar: true,
//   },
//   image: {
//     class: ImageTool as unknown as { new (): any },
//     config: {
//       endpoints: {
//         byFile: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/image_storage/upload`,
//         // byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
//       },
//     },
//   },
// };

export const EDITOR_JS_TOOLS = (
  setIsUploadingImage: (state: boolean) => void,
) => ({
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
      uploader: {
        async uploadByFile(file: File) {
          setIsUploadingImage(true); // ⬅️ Start flag
          const formData = new FormData();

          // options ukuran gambar
          const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          try {
            const compressedFile = await imageCompression(file, options);
            formData.append("file", compressedFile);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/image_storage/upload`,
              {
                method: "POST",
                body: formData,
              },
            );
            const result = await res.json();

            if (result.success === 1) {
              return {
                success: 1,
                file: {
                  url: result.file.url,
                },
              };
            } else {
              console.log(res);
            }
          } finally {
            setIsUploadingImage(false);
          }
        },
      },
    },
  },
});
