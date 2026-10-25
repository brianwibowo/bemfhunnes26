import { API_URL } from "./api";

export const navigation = [
  { href: "/beranda", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/kemahasiswaan", label: "Kemahasiswaan" },
  { href: "/eksternal", label: "Eksternal" },
  { href: "/berita", label: "Berita" },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bemfhunnes/",
    short: "IG",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@bemfhunnes/", short: "TK" },
  { label: "WhatsApp", href: "https://wa.me/6288200557365", short: "WA" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@BEMFHUNNES26",
    short: "YT",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bem-fakultas-hukum-unnes",
    short: "IN",
  },
];

export function mediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("/uploads/")) return `${API_URL}${path}`;
  if (path.startsWith("/") || /^https?:\/\//i.test(path)) return path;
  return undefined;
}
