import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withauth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/login",
  "/register",
  "/dashboard",
  "/blog-write",
]);
