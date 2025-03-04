import { editBlogData } from "@/lib/supabase/dashboard/editor/editor_service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const req = await request.json();

  try {
    const res = await editBlogData(req);
    if (res.status) {
      return NextResponse.json(
        { status: res.status, message: res.message },
        { status: res.statusCode },
      );
    } else {
      return NextResponse.json(
        { status: res.status, error: res.message },
        { status: res.statusCode },
      );
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
