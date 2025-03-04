import { getBlogDataByUserId } from "@/lib/supabase/dashboard/draft_page/draft_page_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userID = request.nextUrl.searchParams.get("userID");

    if (!userID && isNaN(Number(userID))) {
      return NextResponse.json({ status: 400, statusText: "User ID Require" });
    }

    const numberUserId = Number(userID);
    const res = await getBlogDataByUserId(numberUserId);

    if (res.status) {
      return NextResponse.json({ status: res.status, data: res.data });
    } else {
      return NextResponse.json({ status: res.status, error: res.error });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
