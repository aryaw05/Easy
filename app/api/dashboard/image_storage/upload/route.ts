import { uploadImageFile } from "@/lib/supabase/storage/image_storage_service";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const res = await uploadImageFile(file);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: "wkwkw goblog" }, { status: 500 });
  }
}
