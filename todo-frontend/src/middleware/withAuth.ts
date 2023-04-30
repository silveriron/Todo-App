import { NextRequest, NextResponse } from "next/server";

export async function withAuth(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/auth/signin";
  try {
    const refresh_token = req.cookies.get("refresh_token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refresh_token }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      const data = await res.json();
      console.log(data);
      return NextResponse.next({
        headers: {
          "Set-Cookie": `user=${JSON.stringify(data)}; path=/;`,
        },
      });
    }

    return NextResponse.redirect(url);
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(url);
  }
}
