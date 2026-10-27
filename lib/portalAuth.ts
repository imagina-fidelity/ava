import { createGetPortalUser } from "@fidelity-imagina/auth";

// Staff sign in once, at the portal. This app trusts the portal's shared SSO
// cookie (verified against the portal's public JWKS) and keeps no session of its own.
export const PORTAL_URL = process.env.PORTAL_URL ?? "https://atlas.imagina.au";

export const getPortalUser = createGetPortalUser({ portalUrl: PORTAL_URL });
