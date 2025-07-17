"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ParagraphBlock } from "editorjs-blocks-react-renderer";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function DashboardPageView({
  id,
  title,
  dataHeader,
  create_at,
}: {
  id: number;
  title: string;
  dataHeader: any;
  create_at: any;
}) {
  const { push } = useRouter();
  const paragraphBlock = useMemo(
    () => <ParagraphBlock data={dataHeader} className="whitespace-normal" />,
    [dataHeader],
  );

  const deleteData = async (e: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/delete_data?id=${e}`,
      {
        method: "DELETE",
      },
    );
  };
  const editDataButton = (e: number) => {
    push(`/blog-write/edit/${e}`);
  };

  return (
    <div className="mb-5" key={id}>
      <h1 className="font-bold">{title}</h1>
      <div className="truncate">
        {paragraphBlock}
        {/* <button className="mx-4 bg-red-400 p-4" onClick={() => deleteData(id)}>
          Delete
        </button>
        <button className="bg-blue-400 p-4" onClick={() => editDataButton(id)}>
          Edit Blog
        </button> */}
      </div>
    </div>
  );
}
