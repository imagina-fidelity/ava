import type { Metadata } from "next";
import "@fidelity-imagina/ui/styles.css";
import "./globals.css";
import { ToastProvider } from "@fidelity-imagina/ui";

export const metadata: Metadata = {
  title: { default: "AVA", template: "%s · AVA" },
  description: "imagina's AI colleague. She knows how imagina works, and she'll tell you when she doesn't.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
