import { AppDockProvider } from "@fidelity-imagina/ui";
import { TopBar } from "@/components/TopBar";

export default function StaffLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppDockProvider currentAppId="ava" appsUrl="/api/portal-apps">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="app-frame">
        <TopBar />
        <div className="app-content">{children}</div>
      </div>
    </AppDockProvider>
  );
}
