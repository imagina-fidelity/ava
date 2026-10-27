"use client";

import { AppHeader, ProfileMenu } from "@fidelity-imagina/ui";

export interface TopBarViewer {
  name: string;
  photo: string | null;
  role: string | null;
  canEdit: boolean;
}

export function TopBarShell({ viewer, signOutUrl }: { viewer: TopBarViewer | null; signOutUrl: string }) {
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
          />
        )
      }
    >
      {viewer && !viewer.canEdit && <span className="topbar-badge">View only</span>}
    </AppHeader>
  );
}
