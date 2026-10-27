import { NextResponse } from "next/server";
import { createPortalMiddleware } from "@fidelity-imagina/auth";
import { PORTAL_URL } from "@/lib/portalAuth";
import { DEV_BYPASS } from "@/lib/devBypass";

// Signed-out visitors go to the portal and come straight back; people whose
// role has no "ava" grant are sent to the portal home. Not the kit's
// createAuthMiddleware: that no-ops in development, and this must exercise
// the real flow on localhost too.
const portalMiddleware = createPortalMiddleware({
  portalUrl: PORTAL_URL,
  appId: "ava",
  databaseUrl: process.env.EM_DATABASE_URL!,
});

// DEV_BYPASS_AUTH=1 (never in production, see lib/devBypass.ts) skips the portal for local review.
export default DEV_BYPASS ? () => NextResponse.next() : portalMiddleware;

export const config = {
  // Public static assets (images, fonts) must be excluded so pages can load them.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"],
};
