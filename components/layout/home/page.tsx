"use client";

import { HeaderBlock } from "editorjs-blocks-react-renderer";
import { useRouter } from "next/navigation";

export default function BlogDataPage({ blogs }: any) {
  const { push } = useRouter();

  const detailPage = (e: any) => {
    push(`/blog/${e.id}`);
  };

  return (
    <div>
      <h1>Blog Data</h1>
      {blogs?.data?.map((e: any, index: number) => {
        const dataHeader = {
          text: e?.content?.blocks[0]?.data?.text,
          level: 2,
        };
        if (e.is_published) {
          return (
            <div
              key={index}
              className="mb-5 w-full cursor-pointer rounded border border-black"
              onClick={() => detailPage(e)}
            >
              <h1 className="font-bold">{e.title}</h1>
              {e.content && (
                <div className="w-full">
                  <HeaderBlock
                    data={dataHeader}
                    className="whitespace-normal"
                  />
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
