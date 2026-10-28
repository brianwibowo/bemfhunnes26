import "./globals.css";
import "./photo-editorial.css";
import "./photo-motion.css";
import "./section-pages.css";
import "./graphic-accents.css";
import "./context-pointer.css";
import "./inner-graphics.css";
import "./cabinet-home.css";
import "./cabinet-content.css";
import "./service-home.css";
import "./angular-theme.css";
import "./angular-content.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

const legacyBody = localFont({
  src: "../public/fonts/dm-sans-variable.ttf",
  variable: "--font-legacy-body",
  weight: "400 700",
  display: "swap",
});
const legacyDisplay = localFont({
  src: "../public/fonts/space-grotesk-variable.ttf",
  variable: "--font-legacy-display",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BEM FH UNNES 2026",
  description: "Portal informasi BEM FH UNNES - Kabinet Laksana Adhikara",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={`${legacyBody.variable} ${legacyDisplay.variable}`}>
        {children}
      </body>
    </html>
  );
}
