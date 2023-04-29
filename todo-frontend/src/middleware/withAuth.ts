import { NextRequest, NextResponse } from "next/server";

export async function withAuth(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/auth/signin";
  try {
    const refresh_token = req.cookies.get("refresh_token")?.value;

    const res = await fetch("http://0.0.0.0:3001/api/v1/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return NextResponse.next({
        headers: {
          user: JSON.stringify(data),
        },
      });
    }

    return NextResponse.redirect(url);
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(url);
  }
}
