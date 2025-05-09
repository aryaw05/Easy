import {
  getAllBlogData,
  getBlogDataByPostsId,
} from "@/lib/supabase/home/blog-data/blog_data_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postsID = searchParams.get("postsID");

  if (postsID) {
    const detailBlog = await getBlogDataByPostsId(Number(postsID));
    if (detailBlog.status) {
      return NextResponse.json({
        status: detailBlog.status,
        data: detailBlog.data,
      });
    } else {
      return NextResponse.json({
        status: detailBlog.status,
        error: detailBlog.error,
      });
    }
  } else {
    try {
      const res = await getAllBlogData();
      if (res.status) {
        return NextResponse.json({
          status: res.status,
          data: res.data,
        });
      }
    } catch (error) {
      return NextResponse.json({
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
