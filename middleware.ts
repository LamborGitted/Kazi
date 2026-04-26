import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "zh"] as const;
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE = "lantxx-locale";

function getLocaleFromRequest(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as typeof LOCALES[number])) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage.includes("zh")) {
    return "zh";
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const locale = getLocaleFromRequest(request);

  response.headers.set("x-locale", locale);
  response.headers.set("content-language", locale);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
