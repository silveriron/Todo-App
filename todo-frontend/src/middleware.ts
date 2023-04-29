import type { NextRequest } from "next/server";
import { withAuth } from "./middleware/withAuth";
import { withoutAuth } from "./middleware/withoutAuth";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    return withAuth(req);
  }

  if (req.nextUrl.pathname === "/todo") {
    return withAuth(req);
  }

  if (req.nextUrl.pathname === "/todo/edit") {
    return withAuth(req);
  }

  if (req.nextUrl.pathname === "/auth/signin") {
    return withoutAuth(req);
  }

  if (req.nextUrl.pathname === "/auth/signup") {
    return withoutAuth(req);
  }
}

export const config = {
  matcher: "/:path*",
};
