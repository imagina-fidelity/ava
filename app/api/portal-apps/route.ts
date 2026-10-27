import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PORTAL_SSO_COOKIE } from "@fidelity-imagina/auth";
import { PORTAL_URL } from "@/lib/portalAuth";

// Feeds the Cmd+K app dock: the apps this staff member can open, straight from
// the portal. The browser can't call the portal cross-origin, so this forwards
// the person's SSO cookie as a Bearer token server-side. Staff only: no portal
// SSO cookie, or one the portal rejects, means no apps and no dock.
export async function GET() {
  const token = (await cookies()).get(PORTAL_SSO_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(new URL("/api/sso/apps", PORTAL_URL), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ error: "Unavailable" }, { status: res.status === 401 ? 401 : 502 });
    const { apps } = (await res.json()) as { apps: unknown };
    return NextResponse.json({ apps }, { headers: { "Cache-Control": "private, max-age=60" } });
  } catch {
    return NextResponse.json({ error: "Unavailable" }, { status: 502 });
  }
}
