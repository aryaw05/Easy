"use client";

import { useRouter } from "next/navigation";

export default function BlogDataPage({ blogs }: any) {
  const { push } = useRouter();
  console.log(blogs);

  const detailPage = (e: any) => {
    push(`/blog/detail/${e.id}`);
  };

  return (
    <div className="mt-5 space-y-8 px-4">
      {blogs?.data?.map((e: any, index: number) => {
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
            <div className="mb-2 text-sm text-muted-foreground">
              <h2>{e.slug}</h2>
            </div>
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
