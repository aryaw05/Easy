import { supabase } from "../utils";
import { v4 as uuidv4 } from "uuid";

export async function uploadImageFile(file: any) {
  const fileExt = file.name.split(".").pop();
  // const fileName = `avatar-${Date.now()}.${fileExt}`;
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `blog_image/${fileName}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      cacheControl: "3600",
    });

  if (!error) {
    const { data } = supabase.storage.from("images").getPublicUrl(filePath);
    // return urlData.publicUrl;
    return { success: 1, file: { url: data.publicUrl } };
  } else {
    return { error };
  }
}

export async function deleteImageFile(fileData: any) {
  const { data, error } = await supabase.storage
    .from("images")
    .remove(["blog_image/avatar1.png"]);

  return data;
}
