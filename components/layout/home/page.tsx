"use client";

import { HeaderBlock } from "editorjs-blocks-react-renderer";
import { useRouter } from "next/navigation";

export default function BlogDataPage({ blogs }: any) {
  const { push } = useRouter();

  const detailPage = (e: any) => {
    push(`/blog/${e.id}`);
  };

  return (
    <div className="mt-5 space-y-8 px-4">
      {blogs?.data?.map((e: any, index: number) => {
        const dataHeader = {
          text: e?.content?.blocks[0]?.data?.text,
          level: 2,
        };

        let timestamp = e.create_at;
        const dateWIB = new Intl.DateTimeFormat("id-ID", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(timestamp));

        if (!e.is_published) return null;

        return (
          <div
            key={index}
            onClick={() => detailPage(e)}
            className="cursor-pointer"
          >
            <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">
              BY{" "}
              <span className="font-bold">
                {e.users.username || "Unknown Author"}{" "}
              </span>
            </div>

            <h1 className="mb-1 text-3xl font-bold leading-tight">{e.title}</h1>

            {e.content && (
              <div className="mb-2 text-sm text-muted-foreground">
                <HeaderBlock
                  data={dataHeader}
                  className="whitespace-normal text-sm"
                />
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="h-px w-full bg-black"></div>
              <div className="ml-2">{dateWIB || "-"}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
