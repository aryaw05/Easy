import { supabase } from "../../utils";

export async function getBlogDataByUserId(userId: number) {
  // query data user
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("user_id", userId);
  if (data) {
    return { status: true, statusCode: 200, data };
  } else {
    return { status: false, statusCode: 400, error };
  }
}

export async function deleteBlogDataByBlogId(blogID: number) {
  // Ambil konten post dari database
  const { data, error } = await supabase
    .from("posts")
    .select("content->blocks")
    .eq("id", blogID);
  if (error) {
    return { status: false, statusCode: 400, error };
  }

  let imageUrl = extractImageUrls(data);
  const filename = imageUrl?.split("/").pop();

  // Hapus Gambar Dari Storage
  const { data: imageData, error: errorImageData } = await supabase.storage
    .from("images")
    .remove([`blog_image/${filename}`]);

  if (errorImageData) return { status: false, statusCode: 400, errorImageData };

  // delete post
  const response = await supabase.from("posts").delete().eq("id", blogID);
  if (response) {
    return {
      status: true,
      statusCode: 200,
      message: "data deleted successfully",
    };
  }
}
function extractImageUrls(data: any) {
  let imageUrl;
  data.forEach((e) => {
    e?.blocks?.forEach((element) => {
      if (element.type === "image") {
        imageUrl = element.data.file.url;
      }
    });
  });
  return imageUrl;
}
