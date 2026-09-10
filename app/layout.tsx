import type { Metadata } from "next";
import "./globals.css";
import "./components/ThemeToggle.css";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Visual Learning",
  description: "Cloud certification learning paths and visual EL10 service guides.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased"><ThemeToggle/>{children}</body>
    </html>
  );
}
