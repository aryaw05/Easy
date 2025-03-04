import { addBlogData } from "@/lib/supabase/dashboard/editor/editor_service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const res = await addBlogData(req);

  return NextResponse.json(
    { status: res.status, message: res.message },
    {
      status: res.statusCode,
    },
  );
}
