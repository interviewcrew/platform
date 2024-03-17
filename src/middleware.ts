import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: (request) => !request.url.includes("/dashboard"),

  afterAuth(auth, request, event) {
    if(auth.isPublicRoute) {
        return NextResponse.next();
    }

    if (!auth.userId) {
      return redirectToSignIn({ returnBackUrl: request.url });
    }

    if(
        !auth.orgId &&
        request.nextUrl.pathname !== "/dashboard/organizations" 
    ) {
        const organizationSelection = new URL("/dashboard/organizations", request.url);
        return NextResponse.redirect(organizationSelection);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
