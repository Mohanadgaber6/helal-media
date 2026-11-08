import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root / to /en
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  const seg = pathname.split("/").filter(Boolean)[0];
  const locale = seg === "ar" ? "ar" : "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-helal-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|media|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

