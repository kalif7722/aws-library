import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EL10 AWS Learning",
  description: "Certification-focused AWS learning paths and visual EL10 service guides.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
