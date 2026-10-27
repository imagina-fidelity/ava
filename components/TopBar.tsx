import { cache } from "react";
import { portalSignOutUrl } from "@fidelity-imagina/auth";
import { PORTAL_URL, getPortalUser } from "@/lib/portalAuth";
import { getAvaViewer } from "@/lib/permissions";
import { getProfileForEmail } from "@/lib/profile";
import { DEV_BYPASS } from "@/lib/devBypass";
import { TopBarShell } from "@/components/TopBarShell";

/** "ritthick.thiaga" or "ritthick thiaga" becomes "Ritthick Thiaga"; keeps hyphens and apostrophes ("Mary-Jane O'Neil"). */
function titleCase(name: string) {
  return name
    .replace(/[._]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/(^|[\s'-])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toUpperCase());
}

const getTopBarViewer = cache(async () => {
  const viewer = await getAvaViewer();
  if (!viewer) return null;
  const [profile, user] = await Promise.all([getProfileForEmail(viewer.email), DEV_BYPASS ? null : getPortalUser()]);
  const name = profile.name ?? user?.name ?? viewer.email.split("@")[0];
  return { name: titleCase(name), photo: profile.photo, role: profile.role, canEdit: viewer.isManager };
});

export async function TopBar() {
  return <TopBarShell viewer={await getTopBarViewer()} signOutUrl={portalSignOutUrl(PORTAL_URL)} />;
}
