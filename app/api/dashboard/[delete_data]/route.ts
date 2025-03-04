import { deleteBlogDataByBlogId } from "@/lib/supabase/dashboard/draft_page/draft_page_service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blogId = searchParams.get("id");
  const numberBlogId = Number(blogId);

  const res = await deleteBlogDataByBlogId(numberBlogId);
  if (res) {
    return NextResponse.json(
      { status: res.status, message: res.message },
      { status: res.statusCode },
    );
  }
}
