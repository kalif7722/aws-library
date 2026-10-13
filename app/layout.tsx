import type { Metadata } from "next";
import "./globals.css";
import "./components/ThemeToggle.css";
import "./components/ServiceLearningReadability.css";
import "./components/ServiceLearningGridAlignment.css";
import "./components/AthenaThemePolish.css";
import "./components/ServiceTypographyPolish.css";
import ThemeToggle from "./components/ThemeToggle";
import ArchitectureTooltip from "./components/ArchitectureTooltip";

export const metadata: Metadata = {
  metadataBase: new URL("https://aws-library.kalifs.workers.dev"),
  title: {
    default: "Visual Cloud Learning | AWS, Azure & Google Cloud",
    template: "%s | Visual Cloud Learning",
  },
  description:
    "Learn AWS, Microsoft Azure, and Google Cloud with visual service guides, certification study paths, architecture diagrams, and cross-cloud comparisons.",
  applicationName: "Visual Cloud Learning",
  keywords: [
    "AWS certification study guide",
    "Azure certification study guide",
    "Google Cloud certification",
    "cloud architecture diagrams",
    "visual cloud learning",
    "AWS Azure GCP comparison",
  ],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "Visual Cloud Learning",
    title: "Visual Cloud Learning | AWS, Azure & Google Cloud",
    description:
      "Explore visual cloud service guides, certification study paths, architecture diagrams, and cross-cloud comparisons.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Visual Cloud Learning | AWS, Azure & Google Cloud",
    description:
      "Visual service guides and certification study paths across AWS, Azure, and Google Cloud.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased"><ThemeToggle/>{children}<ArchitectureTooltip/></body>
    </html>
  );
}
