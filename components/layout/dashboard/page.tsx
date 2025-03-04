"use client";
import { ParagraphBlock } from "editorjs-blocks-react-renderer";
import { useRouter } from "next/navigation";

export default function DashboardPageView({
  id,
  title,
  dataHeader,
}: {
  id: number;
  title: string;
  dataHeader: any;
}) {
  const { push } = useRouter();
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
        <button className="mx-4 bg-red-400 p-4" onClick={() => deleteData(id)}>
          Delete
        </button>
        <button className="bg-blue-400 p-4" onClick={() => editDataButton(id)}>
          Edit Blog
        </button>
        <ParagraphBlock data={dataHeader} className="whitespace-normal" />
      </div>
    </div>
  );
}
