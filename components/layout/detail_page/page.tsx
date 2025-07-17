"use client";
import Blocks from "editorjs-blocks-react-renderer";

export default function DetailBlogPageLayout(blogData: any) {
  const timestamp = blogData.blogData.data.create_at;
  const dateWIB = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(timestamp));

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-6">
      {blogData.blogData.data.content && (
        <article>
          <header className="mb-4">
            <h1 className="mx-auto mb-2 max-w-2xl break-words text-6xl font-extrabold leading-tight tracking-tight">
              {blogData.blogData.data.title}
            </h1>
            <div className="mb-1 text-sm font-medium text-gray-600">
              Create at: {dateWIB}{" "}
              {blogData.blogData.data.is_updated ? "(Edited)" : ""}
            </div>
            <div className="text-sm font-medium text-gray-600">
              Creator: {blogData.blogData.data.users.username}
            </div>
          </header>

          <Blocks
            data={blogData.blogData.data.content}
            config={{
              code: {
                className: "language-js",
              },
              delimiter: {
                className: "border border-2 w-16 mx-auto my-4",
              },
              embed: {
                className: "border-0",
              },
              header: {
                className: "font-bold text-lg my-3",
              },
              image: {
                className: "w-full max-w-full my-4",
                actionsClassNames: {
                  stretched: "w-full h-64 object-cover",
                  withBorder: "border border-2",
                  withBackground: "p-2",
                },
              },
              list: {
                className: "list-disc list-inside my-2",
              },
              paragraph: {
                className: "text-base text-gray-800 leading-relaxed mb-4",
                actionsClassNames: {
                  alignment: "text-{alignment}",
                },
              },
              quote: {
                className:
                  "py-3 px-5 italic font-serif border-l-4 border-gray-300 bg-gray-50 my-4",
              },
              table: {
                className: "table-auto border border-collapse my-4",
              },
            }}
          />
        </article>
      )}
    </div>
  );
}
