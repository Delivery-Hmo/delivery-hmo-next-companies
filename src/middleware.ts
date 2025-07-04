import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "./utils/constants";
import { verifyTokenExpired, parseFirebaseAuth, parseFirebaseTokenData, parseUser } from "./utils/serverFunctions";
import { updateSession } from "./lib/session";
import { post } from "./services/http/server";
import { RefreshTokenResponse } from "./interfaces/services/firebaseAuth";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;

  headers.set("x-current-path", pathname);

  const firebaseAuthCookie = request.cookies.get("firebaseAuth");
  const firebaseAuth = await parseFirebaseAuth(firebaseAuthCookie?.value);
  const tokenData = await parseFirebaseTokenData(firebaseAuth?.idToken);
  const isTokenExpired = await verifyTokenExpired(tokenData?.exp || 0);

  if (firebaseAuth && tokenData && isTokenExpired) {
    const body = new URLSearchParams();
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", firebaseAuth.refreshToken);

    const newFirebaseAuth = await post<RefreshTokenResponse>({
      baseUrl: "firebaseAuthApi",
      url: `token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    await updateSession(newFirebaseAuth, firebaseAuth);
  }

  if (!firebaseAuthCookie?.value && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url), { headers });
  }

  if (firebaseAuthCookie?.value && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/inicio", request.url), { headers });
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};