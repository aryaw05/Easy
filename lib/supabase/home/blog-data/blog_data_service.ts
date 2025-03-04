import { supabase } from "../../utils";

export async function getAllBlogData() {
  const { data, error } = await supabase.from("posts").select();
  if (data) {
    return { status: true, statusCode: 200, data };
  } else {
    return { status: false, statusCode: 400, error };
  }
}

export async function getBlogDataByPostsId(postsID: number) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id, title, content, create_at, is_updated ,
      users (username, email) 
    `,
    )
    .eq("id", postsID)
    .single();

  if (error) {
    return { status: false, statusCode: 400, error };
  }
  return { status: true, statusCode: 200, data };
}
