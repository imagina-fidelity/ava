import { cache } from "react";
import { getPortalUser } from "@/lib/portalAuth";
import { emDb } from "@/lib/emDb";
import { DEV_BYPASS, DEV_VIEWER_EMAIL } from "@/lib/devBypass";

// Access is granted like any other portal app: a person's role tier applied
// to their permitted apps (effective_app_access), set from the portal's Users page.
//   "view" — can chat with AVA.
//   "edit" — also manage what AVA knows (categories, briefs, approvals).
// No grant means AVA doesn't exist as far as that person's concerned.
// There's deliberately no implicit Super Admin bypass: it would make the
// Users page lie about what a person can actually do.
export type AvaAccess = "view" | "edit";

// Read live on every request (not baked into the session JWT), so a change
// on the Users tab takes effect straight away without forcing a re-sign-in.
const getAvaAccess = cache(async (email: string): Promise<AvaAccess | null> => {
  const rows = await emDb()`
    select access_level from effective_app_access
    where email = lower(${email}) and app_id = 'ava'
  `;
  const level = rows[0]?.access_level;
  return level === "edit" || level === "view" ? level : null;
});

export interface AvaViewer {
  email: string;
  canAccess: boolean;
  isManager: boolean;
}

/** The signed-in person and what they may do in AVA, or null if signed out. */
export async function getAvaViewer(): Promise<AvaViewer | null> {
  if (DEV_BYPASS) return { email: DEV_VIEWER_EMAIL, canAccess: true, isManager: true };
  const user = await getPortalUser();
  if (!user) return null;
  const access = await getAvaAccess(user.email);
  return { email: user.email, canAccess: access !== null, isManager: access === "edit" };
}
