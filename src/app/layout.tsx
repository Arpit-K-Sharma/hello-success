import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const body = DM_Sans({ variable: "--font-body", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${site.name} | AI Automation & Connected Business Systems`,
  description: site.description,
  // Link previews (LinkedIn, messaging apps); the image is app/opengraph-image.tsx.
  openGraph: { title: site.name, description: site.description, siteName: site.name, locale: "en_AU", type: "website" },
  // Board preview only: keep it out of search engines until launch.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" data-scroll-behavior="smooth" className={`${body.variable} ${display.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
