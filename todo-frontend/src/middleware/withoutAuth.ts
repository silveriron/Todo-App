import { NextRequest, NextResponse } from "next/server";

export async function withoutAuth(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/todo";

  try {
    const refresh_token = req.cookies.get("refresh_token")?.value;

    const res = await fetch("https://todo-app.shop:8443/api/v1/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (e) {
    console.log(e);
    return NextResponse.next();
  }
}
