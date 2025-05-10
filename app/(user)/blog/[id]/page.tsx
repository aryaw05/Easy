import DetailBlogPageLayout from "@/components/layout/detail_page/page";

export default async function DetailBlogPage({ params }: any) {
  const { id } = await params;

  const blogData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog_data?postsID=${id}`,
  ).then((res) => res.json());

  return (
   
    <DetailBlogPageLayout blogData={blogData} />
  );
}
