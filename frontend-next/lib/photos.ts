export type CabinetPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  category: string;
};

const photo = (
  id: string,
  title: string,
  category: string,
  alt: string,
  width = 1024,
): CabinetPhoto => ({
  id,
  src: `/images/kabinet/${id}.webp`,
  width,
  height: 768,
  title,
  category,
  alt,
});

// Keep repeated photos out of the same page. Activity documentation may also
// serve as an article cover in its related rubric.
export const photoCatalog = {
  cabinet: photo(
    "kabinet-laksana-adhikara",
    "Satu kabinet, banyak cerita.",
    "Laksana Adhikara · 2026",
    "Foto bersama seluruh pengurus BEM FH UNNES Kabinet Laksana Adhikara di dalam aula.",
  ),
  studio: photo(
    "potret-studio-kabinet",
    "Satu ruang, satu semangat.",
    "Potret kabinet",
    "Sekelompok pengurus kabinet berpose bersama dengan latar studio putih.",
  ),
  learning: photo(
    "ruang-belajar",
    "Berbagi ilmu, menumbuhkan asa.",
    "Pengabdian",
    "Relawan berinteraksi dengan anak-anak dalam kegiatan belajar di ruang kelas.",
  ),
  action: photo(
    "suara-dan-aksi",
    "Hadir, bersuara, bergerak.",
    "Aksi mahasiswa",
    "Mahasiswa berfoto bersama dalam kegiatan aksi dengan spanduk Aksi Kamisan.",
  ),
  creative: photo(
    "ruang-kreatif",
    "Ide tumbuh, karya bertemu.",
    "Ekonomi kreatif",
    "Pengurus berfoto di depan stan kegiatan ekonomi kreatif.",
  ),
  sports: photo(
    "kebersamaan-di-lapangan",
    "Satu lapangan, banyak cerita.",
    "Olahraga",
    "Para peserta kegiatan olahraga berfoto bersama di lapangan pada malam hari.",
  ),
  expression: photo(
    "ekspresi-bersama",
    "Bebas berekspresi, dekat bersama.",
    "Kebersamaan",
    "Sekelompok pengurus bergaya ceria di antara tiang-tiang teras kampus.",
  ),
  partnership: photo(
    "jejaring-dan-kolaborasi",
    "Merawat relasi, menyatukan langkah.",
    "Rapat eksternal",
    "Peserta rapat eksternal berfoto bersama di ruang pertemuan terbuka.",
  ),
  leadership: photo(
    "pimpinan-kabinet",
    "Di balik langkah bersama.",
    "Pengurus kabinet",
    "Pengurus kabinet berfoto bersama di area pepohonan dengan bendera organisasi di belakang mereka.",
  ),
  campus: photo(
    "kebersamaan-di-kampus",
    "Bertemu, berbagi semangat.",
    "Kebersamaan",
    "Sekelompok mahasiswa berpakaian putih berfoto bersama di taman kampus.",
    899,
  ),
  embrace: photo(
    "saling-merangkul",
    "Dekat, saling menguatkan.",
    "Kebersamaan",
    "Pengurus BEM FH UNNES berfoto sambil saling merangkul di lapangan.",
  ),
  cadre: photo(
    "kaderisasi-dan-kebersamaan",
    "Belajar mengisi peran.",
    "Tim KPSDM",
    "Pengurus kementerian KPSDM berfoto bersama di luar ruangan pada malam hari.",
  ),
  study: photo(
    "ruang-kajian",
    "Gagasan yang mempertemukan.",
    "Tim kajian",
    "Pengurus kementerian kajian berfoto bersama sambil membentangkan bendera merah organisasi.",
  ),
  community: photo(
    "kebersamaan-kabinet",
    "Banyak warna, satu semangat.",
    "Kebersamaan",
    "Pengurus berkumpul dan berfoto bersama pada kegiatan malam hari.",
  ),
  visit: photo(
    "pertemuan-studi-banding",
    "Meluas jejaring, bertukar cerita.",
    "Studi banding",
    "Peserta studi banding dari dua organisasi berfoto bersama di depan gedung kampus.",
  ),
  donation: photo(
    "aksi-donor-darah",
    "Setetes kepedulian, banyak harapan.",
    "Kepedulian",
    "Pelaksanaan kegiatan donor darah dengan pendonor dan petugas di lokasi.",
  ),
  ministries: photo(
    "sinergi-kementerian",
    "Beragam peran, satu arah.",
    "Pengurus kementerian",
    "Pengurus kementerian berpose bersama di dalam ruangan sambil membuat berbagai gerakan tangan.",
  ),
} satisfies Record<string, CabinetPhoto>;

export const cabinetPhoto = photoCatalog.cabinet;
export const homePhotos = {
  story: photoCatalog.expression,
  collaboration: photoCatalog.ministries,
};
export const profilePhotos = {
  studio: photoCatalog.studio,
  harmony: photoCatalog.sports,
};
export const galleryPhotos: CabinetPhoto[] = [
  photoCatalog.learning,
  photoCatalog.visit,
  photoCatalog.partnership,
  photoCatalog.action,
  photoCatalog.study,
  photoCatalog.donation,
  photoCatalog.creative,
  photoCatalog.cadre,
];

// Replace this file when the revised organigram is ready; the layout stays the same.
export const organigram = {
  src: "/images/kabinet/organigram.webp",
  width: 678,
  height: 884,
  alt: "Organigram BEM FH UNNES 2026: Presiden dan Wakil Presiden, Manajemen Internal Organisasi, Kantor Media Informasi, Sekretaris Kabinet, serta kementerian koordinator internal, sosial hukum dan politik, dan eksternal.",
  status: "Dalam penyempurnaan",
};
