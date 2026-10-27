import { neon } from "@neondatabase/serverless";
import { DEV_BYPASS, DEV_VIEWER_EMAIL } from "@/lib/devBypass";

// Mirrors ROLES in portal-imagina/lib/roleDefs.ts; the four roles are set on the portal's Users tab.
export const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  culture_contributor: "Culture Contributor",
  contributor: "Contributor",
  user: "User",
};

export interface Profile {
  name: string | null;
  photo: string | null;
  role: string | null;
}

/**
 * The person's name, admin-curated pre-cropped photo (a Vercel Blob URL) and ATLAS role from
 * Enterprise Map's people table. Without EM_DATABASE_URL, or on any failure, the header falls
 * back to the sign-in name and initials and hides the role.
 */
export async function getProfileForEmail(email: string): Promise<Profile> {
  if (DEV_BYPASS) return { name: "Dev User", photo: null, role: ROLE_LABELS.super_admin };
  const url = process.env.EM_DATABASE_URL;
  if (!url) return { name: null, photo: null, role: null };
  try {
    const [row] = await neon(url)`select first_name, last_name, photo_url, app_role from people where lower(email) = lower(${email}) limit 1`;
    const name = [row?.first_name, row?.last_name].filter(Boolean).join(" ") || null;
    const role = row?.app_role as string | undefined;
    return { name, photo: row?.photo_url ?? null, role: role ? (ROLE_LABELS[role] ?? role) : null };
  } catch {
    return { name: null, photo: null, role: null };
  }
}

export { DEV_VIEWER_EMAIL };
