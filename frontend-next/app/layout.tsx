import "./globals.css";
import "./photo-editorial.css";
import "./photo-motion.css";
import "./section-pages.css";
import "./graphic-accents.css";
import "./context-pointer.css";
import "./inner-graphics.css";
import "./cabinet-home.css";
import "./cabinet-content.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

const jakarta = localFont({
  src: "../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
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
      <body className={jakarta.variable}>{children}</body>
    </html>
  );
}
