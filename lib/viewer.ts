import { cache } from "react";
import { getPortalUser } from "@/lib/portalAuth";
import { getAvaViewer } from "@/lib/permissions";
import { getProfileForEmail } from "@/lib/profile";
import { DEV_BYPASS } from "@/lib/devBypass";

/** "ritthick.thiaga" or "ritthick thiaga" becomes "Ritthick Thiaga"; keeps hyphens and apostrophes ("Mary-Jane O'Neil"). */
function titleCase(name: string) {
  return name
    .replace(/[._]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/(^|[\s'-])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toUpperCase());
}

/** Who is signed in, for the header and the greeting. One lookup per request. */
export const getViewer = cache(async () => {
  const viewer = await getAvaViewer();
  if (!viewer) return null;
  const [profile, user] = await Promise.all([getProfileForEmail(viewer.email), DEV_BYPASS ? null : getPortalUser()]);
  const name = titleCase(profile.name ?? user?.name ?? viewer.email.split("@")[0]);
  return { name, firstName: name.split(" ")[0], photo: profile.photo, role: profile.role, canEdit: viewer.isManager };
});
