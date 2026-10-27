import { portalSignOutUrl } from "@fidelity-imagina/auth";
import { PORTAL_URL } from "@/lib/portalAuth";
import { getViewer } from "@/lib/viewer";
import { TopBarShell } from "@/components/TopBarShell";

export async function TopBar() {
  return <TopBarShell viewer={await getViewer()} signOutUrl={portalSignOutUrl(PORTAL_URL)} />;
}
