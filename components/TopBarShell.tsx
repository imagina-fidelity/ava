"use client";

import { usePathname, useRouter } from "next/navigation";
import { AppHeader, ProfileMenu } from "@fidelity-imagina/ui";

export interface TopBarViewer {
  name: string;
  photo: string | null;
  role: string | null;
  canEdit: boolean;
}

export function TopBarShell({ viewer, signOutUrl }: { viewer: TopBarViewer | null; signOutUrl: string }) {
  const router = useRouter();
  const path = usePathname();
  return (
    <AppHeader
      name="AVA"
      lockup={false}
      profile={
        viewer && (
          <ProfileMenu
            name={viewer.name}
            role={viewer.role ?? "Staff"}
            image={viewer.photo}
            onSignOut={() => window.location.assign(signOutUrl)}
            items={[
              { label: "Meet AVA", onClick: () => router.push("/intro"), current: path === "/intro" },
              { label: "AVA's brain", onClick: () => router.push("/brain"), current: path === "/brain" },
            ]}
          />
        )
      }
    >
      {viewer && !viewer.canEdit && <span className="topbar-badge">View only</span>}
    </AppHeader>
  );
}
