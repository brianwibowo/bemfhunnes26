/**
 * Sumber: frontend-next/GDO_Galuh_Ulfa.md, halaman 2–3 dan 13–15.
 * Visi dan pernyataan misi mempertahankan rumusan sumber dengan pembetulan OCR.
 * Judul ringkas, pengantar, prinsip, dan deskripsi nilai merupakan parafrasa untuk web.
 * Dua tajuk nilai pada halaman 14 tidak terbaca: nama "Pengabdian" dan "Kolaborasi"
 * memakai kata dalam paragrafnya, bukan klaim ejaan tajuk asli yang terverifikasi.
 * Tidak ada materi yang disimpulkan dari halaman 23–32 yang belum diekstrak.
 */

/** Rumusan visi, halaman 13; "berlandasken" dan "ekuntabel" dibetulkan dari OCR. */
export const cabinetVision =
  "Revitalisasi BEM FH UNNES sebagai katalisator positif dalam ekosistem kampus dan masyarakat dengan berlandaskan nilai adaptif, profesional, dan akuntabel.";

/** Empat misi, halaman 13. Nomor ketiga terbaca sebagai 8 pada hasil OCR. */
export const cabinetMissions = [
  {
    title: "Tata kelola yang kredibel",
    summary: "Menata organisasi agar lebih terstruktur dan dapat dipercaya.",
    statement:
      "Reformulasi tata kelola BEM FH UNNES guna menciptakan iklim organisasi yang terstruktur dan kredibel.",
  },
  {
    title: "Harmoni antar-sivitas",
    summary: "Merawat sinergi untuk lingkungan kampus yang terintegrasi.",
    statement:
      "Mendorong keberlanjutan harmoni dan sinergi antar elemen sivitas FH UNNES agar tercapainya lingkungan kampus yang terintegrasi.",
  },
  {
    title: "Kemitraan strategis",
    summary: "Merawat dan memperluas jejaring regional hingga nasional.",
    statement:
      "Merawat dan memperluas relasi kemitraan strategis dalam cakupan regional dan nasional guna memperkuat jaringan BEM FH UNNES.",
  },
  {
    title: "Pengawalan isu dan pengabdian",
    summary: "Bergerak proaktif bagi kesejahteraan mahasiswa dan masyarakat.",
    statement:
      "Bergerak secara proaktif dalam mengawal dan mengadvokasikan isu strategis serta melakukan pengabdian guna mewujudkan kesejahteraan mahasiswa dan masyarakat.",
  },
] as const;

/** Sepuluh nilai dan budaya organisasi, halaman 14–15; deskripsi dipadatkan. */
export const cabinetValues = [
  {
    name: "Profesional",
    description:
      "Bertanggung jawab atas sikap, keterampilan, dan kualitas kerja dengan berpedoman pada prosedur serta kode etik organisasi. Profesionalitas menumbuhkan integritas, akuntabilitas, dan lingkungan kerja yang humanis.",
  },
  {
    name: "Pengabdian",
    description:
      "Melayani mahasiswa dengan tulus dan konsisten. Tenaga, pikiran, serta waktu dicurahkan untuk menghadirkan manfaat dan memperjuangkan harapan bersama.",
  },
  {
    name: "Proaktif",
    description:
      "Sigap mengenali persoalan dan berinisiatif mengambil tindakan yang strategis serta terarah. Setiap langkah, inovasi, dan pengawalan aspirasi dilakukan secara inklusif dan dapat dipertanggungjawabkan.",
  },
  {
    name: "Kolaborasi",
    description:
      "Terbuka pada kerja bersama lintas sektor di tingkat internal, regional, dan nasional. Kemitraan dibangun untuk memberi manfaat timbal balik serta merawat keberagaman dan keharmonisan kampus.",
  },
  {
    name: "Adaptif",
    description:
      "Terus belajar dan berinovasi mengikuti perkembangan zaman. Relevansi dijaga melalui organisasi yang dinamis dan tanggap terhadap perubahan.",
  },
  {
    name: "Kritis",
    description:
      "Menganalisis informasi dan argumen secara objektif serta rasional. Sikap kritis menjadi bekal untuk membaca persoalan, mengoreksi kebijakan, dan mengawal kepentingan mahasiswa.",
  },
  {
    name: "Responsif",
    description:
      "Peka membaca situasi dan sigap memberi tanggapan yang sesuai. Persoalan tidak dibiarkan menumpuk tanpa tindakan, terutama ketika menyangkut stagnasi dan ketidakadilan.",
  },
  {
    name: "Apresiatif",
    description:
      "Mengakui kualitas, potensi, dan setiap upaya yang diberikan. Budaya saling menghargai menumbuhkan rasa memiliki serta lingkungan kerja yang saling menguatkan.",
  },
  {
    name: "Harmonisasi",
    description:
      "Menyelaraskan energi, aspirasi, dan karakter yang beragam agar bergerak menuju tujuan bersama. Kolaborasi antar-sivitas dirawat dalam ruang yang aman, solid, dan saling mendukung.",
  },
  {
    name: "Loyalitas",
    description:
      "Menjaga komitmen pada kepentingan, nilai, visi, dan misi organisasi. Dedikasi bersama membangun rasa saling percaya, kestabilan, serta hubungan yang erat dan bermakna.",
  },
] as const;

/** Tiga landasan visi untuk pengantar beranda, halaman 2 dan 13–14. */
export const cabinetPrinciples = [
  {
    name: "Adaptif",
    description:
      "Peka terhadap perubahan, terus belajar, dan menjaga relevansi gerak.",
  },
  {
    name: "Profesional",
    description:
      "Menata kerja dengan tanggung jawab, integritas, dan etika organisasi.",
  },
  {
    name: "Akuntabel",
    description:
      "Mempertanggungjawabkan langkah dan menjaga kepercayaan mahasiswa.",
  },
] as const;

/** Peran utama BEM, dipadatkan dari pengantar halaman 2. */
export const cabinetIntroduction =
  "BEM FH UNNES menjadi ruang representasi, penghubung, dan penggerak aspirasi mahasiswa. Berangkat dari semangat pengabdian Tri Dharma Perguruan Tinggi, kami merawat kesadaran kritis, solidaritas, dan budaya intelektual, membangun sinergi serta kemitraan, dan mengawal isu yang menyentuh mahasiswa maupun masyarakat.";
