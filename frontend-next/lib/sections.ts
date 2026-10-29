import type { ArticleSection, ArticleStatus } from "./types";

type SectionDefinition = {
  label: string;
  icon: "people" | "globe" | "book";
  eyebrow: string;
  tagline: string;
  description: string;
  listingTitle: string;
  listingDescription: string;
  empty: string;
  managementLabel: string;
  managementDescription: string;
};

export const articleSections: ArticleSection[] = [
  "kemahasiswaan",
  "eksternal",
  "berita",
];

export function isArticleSection(value: string): value is ArticleSection {
  return articleSections.includes(value as ArticleSection);
}

export const sectionDefinitions: Record<ArticleSection, SectionDefinition> = {
  kemahasiswaan: {
    label: "Advokasi",
    icon: "people",
    eyebrow: "RUANG UNTUK MAHASISWA",
    tagline: "Tumbuh bersama, melangkah lebih jauh.",
    description:
      "Informasi beasiswa, kesempatan belajar, dan dukungan untuk menemani perjalanan mahasiswa Fakultas Hukum UNNES.",
    listingTitle: "Informasi advokasi",
    listingDescription:
      "Peluang, dukungan, dan kabar yang dekat dengan kebutuhanmu.",
    empty:
      "Informasi, peluang, dan dukungan untuk mahasiswa akan kami bagikan di halaman ini.",
    managementLabel: "Pengelolaan Advokasi",
    managementDescription:
      "Kelola informasi beasiswa, kesempatan belajar, dan dukungan mahasiswa di halaman Advokasi.",
  },
  eksternal: {
    label: "Eksternal",
    icon: "globe",
    eyebrow: "TERHUBUNG & BERDAMPAK",
    tagline: "Buka ruang, jalin kolaborasi.",
    description:
      "Menemukan teman bergerak, memperluas jejaring, dan membangun kolaborasi yang memberi manfaat bersama BEM FH UNNES.",
    listingTitle: "Kabar jejaring dan kolaborasi",
    listingDescription:
      "Cerita pertemuan, kerja bersama, dan langkah yang memberi dampak.",
    empty:
      "Kabar jejaring, kemitraan, dan kolaborasi akan kami bagikan di halaman ini.",
    managementLabel: "Pengelolaan Eksternal",
    managementDescription:
      "Kelola publikasi jejaring, kemitraan, dan kolaborasi di halaman Eksternal.",
  },
  berita: {
    label: "Berita",
    icon: "book",
    eyebrow: "KABAR DARI KAMI",
    tagline: "Cerita, gagasan, dan gerak.",
    description:
      "Informasi dan berita terbaru seputar kegiatan BEM FH UNNES Kabinet Laksana Adhikara. Temukan cerita di balik setiap langkah kami.",
    listingTitle: "Berita terbaru",
    listingDescription:
      "Ikuti cerita dan publikasi dari setiap langkah BEM FH UNNES.",
    empty:
      "Cerita terbaru dari kegiatan dan gerak BEM FH UNNES akan kami bagikan di halaman ini.",
    managementLabel: "Pengelolaan Berita",
    managementDescription:
      "Kelola kabar kegiatan, cerita kabinet, dan publikasi di halaman Berita.",
  },
};

export const articleStatusLabels: Record<ArticleStatus, string> = {
  pending: "Menunggu tinjauan",
  published: "Terbit",
  inactive: "Nonaktif",
};
