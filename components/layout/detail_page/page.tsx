"use-client";
import Blocks from "editorjs-blocks-react-renderer";

export default function DetailBlogPageLayout(blogData: any) {
  console.log(blogData.blogData);
  const timestamp = blogData.blogData.data.create_at;
  const dateWIB = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(new Date(timestamp));
  return (
    <div>
      <div>halaman detail Produk</div>
      {blogData.blogData.data.content && (
        <div>
          <h1 className="text-3xl font-bold">{blogData.blogData.data.title}</h1>
          <h1 className="font-bold">
            Create at : {dateWIB} {blogData.blogData.data.is_updated ? "Edited" : " "}
          </h1>
          <h1 className="font-bold">
            Creator : {blogData.blogData.data.users.username}
          </h1>
          <Blocks
            data={blogData.blogData.data.content}
            config={{
              code: {
                className: "language-js",
              },
              delimiter: {
                className: "border border-2 w-16 mx-auto",
              },
              embed: {
                className: "border-0",
              },
              header: {
                className: "font-bold",
              },
              image: {
                className: "w-full max-w-screen-md",
                actionsClassNames: {
                  stretched: "w-full h-80 object-cover",
                  withBorder: "border border-2",
                  withBackground: "p-2",
                },
              },
              list: {
                className: "list-inside",
              },
              paragraph: {
                className: "text-base text-opacity-75",
                actionsClassNames: {
                  alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                },
              },
              quote: {
                className: "py-3 px-5 italic font-serif",
              },
              table: {
                className: "table-auto",
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
