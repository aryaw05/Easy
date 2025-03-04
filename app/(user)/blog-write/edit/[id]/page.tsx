import { getBlogDataByPostsId } from "@/lib/supabase/home/blog-data/blog_data_service";
import EditBlogView from "./edit_component";

export default async function EditBlogPage({ params }: any) {
  const { id } = await params;
  const blogData = await getBlogDataByPostsId(id);

  return (
    <div>
      Halaman edit data
      <EditBlogView data={blogData?.data} />
    </div>
  );
}
