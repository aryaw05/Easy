import { supabase } from "../../utils";

export async function addBlogData(data: any) {
  // query data user
  const { data: queryUserData, error } = await supabase
    .from("users")
    .select()
    .eq("email", data.userData);
  const user = queryUserData?.[0].id;

  const { error: errorBlogData } = await supabase.from("posts").insert({
    user_id: user,
    title: data.title,
    content: data.data,
  });
  if (!errorBlogData) {
    return {
      status: true,
      statusCode: 200,
      message: "data successfully added",
    };
  } else {
    return {
      status: false,
      statusCode: 400,
      message: errorBlogData,
    };
  }
}

export async function editBlogData({
  title,
  data,
  blogID,
  update_date,
  updated,
}: {
  title: string;
  data: any;
  blogID: any;
  update_date: any;
  updated: boolean;
}) {
  const { error } = await supabase
    .from("posts")
    .update({
      title: title,
      content: data,
      updated_at: update_date,
      is_updated: updated,
    })
    .eq("id", blogID);

  if (!error) {
    return {
      status: true,
      statusCode: 200,
      message: "data successfully updated",
    };
  } else {
    return {
      status: false,
      statusCode: 400,
      message: error,
    };
  }
}
