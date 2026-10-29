/**
 * Sumber isi: content/organisasi/sources/kementerian-bem-fh-unnes-2026.docx.
 * Seluruh 16 unit dan 117 rincian dipertahankan; hanya spasi dan pemisahan
 * judul/paragraf dirapikan. Atas arahan pemilik situs, dua agenda yang belum
 * memiliki uraian dilengkapi keterangan umum bertanda sementara.
 * Nama SIAP mengikuti pembaruan pengelola pada 29 Oktober 2026.
 * Catatan perbedaan sumber: docs/organisasi-content-notes.md.
 */

export type OrganizationUnitKind =
  | "badan-independen"
  | "sekretaris-kabinet"
  | "biro"
  | "kemenkoan"
  | "kementerian";

export type OrganizationGroupId =
  | "badan-independen"
  | "sekretariat"
  | "internal"
  | "eksternal"
  | "soshumpol";

export type OrganizationSection = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly {
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly note?: string;
  }[];
};

export type OrganizationUnit = {
  readonly slug: string;
  readonly name: string;
  readonly shortName?: string;
  readonly kind: OrganizationUnitKind;
  readonly group?: OrganizationGroupId;
  readonly parentSlug?: string;
  readonly logo?: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };
  readonly intro?: readonly string[];
  readonly sections: readonly OrganizationSection[];
};

export type OrganizationGroup = {
  readonly id: OrganizationGroupId;
  readonly title: string;
  readonly coordinatorSlug: string | null;
  readonly memberSlugs: readonly string[];
};

export const organizationUnits: readonly OrganizationUnit[] = [
  {
    slug: "mio",
    name: "Manajemen Internal Organisasi",
    shortName: "MIO",
    kind: "badan-independen",
    group: "badan-independen",
    logo: {
      src: "/images/organisasi/mio.webp",
      width: 617,
      height: 640
    },
    sections: [
      {
        id: "program-kerja-dan-agenda",
        title: "Program Kerja dan Agenda",
        items: [
          {
            title: "Temu Perdana Fungsionaris BEM FH UNNES 2026",
            paragraphs: [
              "Temu perdana fungsionaris BEM FH UNNES adalah impresi pertama para fungsionaris terpilih nantinya kepada BEM FH UNNES serta tiap kementerian yang menaungi masing-masing individu yang terpilih."
            ]
          },
          {
            title: "Upgrading Internal BEM",
            paragraphs: [
              "Upgrading BEM FH UNNES adalah salah satu agenda awal periode, dengan memberikan kelas tentang organisasi yang bertujuan untuk meningkatkan pemahaman serta menanamkan nilai dan budaya organisasi kepada para fungsionaris untuk membentuk jiwa organisatoris di tiap individu."
            ]
          },
          {
            title: "Dies-Natalis BEM FH UNNES",
            paragraphs: [
              "Dies-Natalis merupakan upaya perayaan hari jadi BEM FH UNNES yang dibalut dengan acara seremonial."
            ]
          },
          {
            title: "AD/ART BEM FH UNNES",
            paragraphs: [
              "AD/ART BEM FH UNNES merupakan tonggak utama organisasi BEM FH UNNES untuk keberlangsungan satu periode ke depan dengan menegakkan serta merumuskan tata cara kelola organisasi yang sesuai guna menciptakan iklim organisasi yang sehat."
            ]
          },
          {
            title: "SOP BEM FH UNNES",
            paragraphs: [
              "Standar Operasional Prosedur (SOP) adalah pedoman sistematis yang ditujukan untuk menyelesaikan suatu masalah langkah demi langkah secara terstruktur dan efisien guna meminimalisir risiko kesalahan dalam berjalannya suatu organisasi."
            ]
          },
          {
            title: "Ngopag Bareng Kementerian",
            paragraphs: [
              "Ngopag bareng kementerian adalah salah satu agenda sosialisasi Manajemen Internal Organisasi guna memperkenalkan MIO secara keseluruhan, baik dari sistematis pengawasan, penegakan aturan-aturan yang mengikat BEM FH UNNES, dan lain-lain."
            ]
          },
          {
            title: "Rapat Koordinasi Ketuplak Progja BEM FH UNNES",
            paragraphs: [
              "Rapat Koordinasi Ketuplak BEM FH UNNES adalah agenda Manajemen Internal Organisasi untuk penyelarasan timeline masing-masing program kerja serta pencegahan konflik kepentingan antarketua pelaksana. Agenda ini juga memberikan pembekalan kepada tiap ketuplak tentang tata cara pembentukan program kerja sesuai dengan indikator penilaian yang dibentuk nantinya."
            ]
          },
          {
            title: "Makrab BEM FH UNNES",
            paragraphs: [
              "Malam Keakraban Badan Eksekutif Mahasiswa adalah kegiatan internal organisasi yang bertujuan membangun keakraban, solidaritas, dan kekompakan antar pengurus melalui interaksi kebersamaan, diskusi, serta aktivitas kelompok, sehingga tercipta hubungan yang harmonis, komunikasi yang baik, dan kesiapan bekerja sama dalam menjalankan program kerja selama satu periode kepengurusan."
            ]
          },
          {
            title: "Survei Kepuasan Progja",
            paragraphs: [
              "Survei kepuasan adalah salah satu penilaian kualitatif dengan sistematis yang ideal untuk menilai seberapa efektif suatu program itu berjalan sesuai dengan tujuan dari Kementerian, Kemenkoan, serta Presiden dan Wakil Presiden."
            ]
          },
          {
            title: "BEM of the Month",
            paragraphs: [
              "BEM of the Month adalah bentuk apresiasi terhadap tiap staf kementerian yang dirasa sudah all-out dalam mengerjakan tiap agenda, program kerja, maupun kontribusinya dalam internal BEM FH UNNES di masing-masing bulannya"
            ]
          },
          {
            title: "Sistem Penilaian Management by Objective (MBO) untuk Kementerian dan Individual",
            paragraphs: [
              "Sistem Management by Objective (MBO) merupakan indikator penilaian yang diadopsi dan disesuaikan dengan sistem kerja BEM FH UNNES untuk memberikan penilaian secara objektif kepada tiap kementerian dan staf BEM FH UNNES dengan tujuan meningkatkan performa tiap kementerian secara berkala."
            ]
          },
          {
            title: "Ruang Aduan",
            paragraphs: [
              "Ruang Aduan adalah penilaian kinerja BEM FH UNNES yang dinilai oleh internal BEM FH UNNES secara tentatif, serta penilaian oleh KM FH UNNES tiap enam bulan sekali. Tujuannya untuk mengembangkan BEM FH UNNES sebagai organisasi yang terus berproses dengan mengakomodasi apa yang diinginkan oleh fungsionaris BEM itu sendiri dan KM FH UNNES."
            ]
          },
          {
            title: "Pembentukan Format Grand Design Kementerian",
            paragraphs: [
              "Format Grand Design Kementerian adalah agenda dari Manajemen Internal Organisasi yang ditujukan untuk menjadi acuan penilaian oleh MIO yang disesuaikan oleh kementerian masing-masing guna pembentukan Objective & Key Results (OKR) tiap kementerian."
            ]
          },
          {
            title: "Buku Panduan MIO",
            paragraphs: [
              "Buku Panduan Manajemen Internal Organisasi adalah buku panduan yang ditujukan kepada internal MIO sebagai pedoman dalam pelaksanaan teknis dari MIO yang mencakup sistem penilaian, penyelesaian sengketa, serta kalkulasi indeks penilaian BEM FH UNNES secara menyeluruh."
            ]
          },
          {
            title: "Demisioner Fungsionaris BEM FH UNNES 2026",
            paragraphs: [
              "Demisioner adalah acara penghargaan dan perpisahan terhadap seluruh fungsionaris BEM FH UNNES karena telah menuntaskan tugasnya selama satu periode, mencakup jajaran staf, Menteri, Menko, KMI, Biro, MIO, serta Presiden dan Wakil Presiden"
            ]
          },
          {
            title: "Rapat 100, 200, dan Triwulan BEM FH UNNES",
            paragraphs: [
              "Rapat 100, 200, dan Triwulan BEM FH UNNES merupakan agenda evaluasi berkala untuk memantau perkembangan pelaksanaan program kerja, kinerja setiap kementerian, serta pencapaian target organisasi. Agenda ini bertujuan untuk mengidentifikasi kendala yang dihadapi, mengevaluasi efektivitas pelaksanaan program kerja, dan memastikan arah gerak BEM FH UNNES tetap selaras dengan tujuan yang telah ditetapkan"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "kmi",
    name: "Kantor Media Informasi",
    shortName: "KMI",
    kind: "badan-independen",
    group: "badan-independen",
    logo: {
      src: "/images/organisasi/kmi.webp",
      width: 602,
      height: 640
    },
    intro: [
      "Kantor Media Informasi (KMI) merupakan bagian dari BEM FH UNNES yang berperan sebagai pusat pengelolaan media, informasi, dan publikasi kabinet. KMI bertanggung jawab dalam menyampaikan informasi mengenai kegiatan, program kerja, agenda, serta berbagai hal yang berkaitan dengan BEM FH UNNES kepada Keluarga Mahasiswa Fakultas Hukum. Melalui pengelolaan media yang kreatif, informatif, dan komunikatif, KMI menjadi sarana penyebaran informasi sekaligus representasi visual dan komunikasi publik kabinet.",
      "KMI terdiri atas tiga deputi yang memiliki fokus kerja berbeda, tetapi saling berkaitan dalam mendukung kebutuhan media dan informasi kabinet."
    ],
    sections: [
      {
        id: "deputi",
        title: "Deputi",
        items: [
          {
            title: "Deputi Desain Grafis (Desgraf)",
            paragraphs: [
              "Deputi Desain Grafis merupakan bagian KMI yang bertanggung jawab dalam pengolahan informasi ke dalam bentuk visual yang menarik, komunikatif, dan sesuai dengan identitas kabinet. Deputi ini berfokus pada pembuatan desain publikasi, seperti poster, infografis, konten media sosial, serta berbagai kebutuhan desain grafis lainnya. Melalui pengolahan elemen visual, tipografi, warna, dan tata letak, Desgraf berperan dalam memperkuat identitas visual serta mempermudah penyampaian informasi kepada mahasiswa."
            ]
          },
          {
            title: "Deputi Multimedia (Mulmed)",
            paragraphs: [
              "Deputi Multimedia merupakan bagian KMI yang bertanggung jawab dalam pengelolaan dan produksi konten audiovisual untuk mendukung publikasi serta dokumentasi kegiatan BEM FH UNNES. Deputi ini berfokus pada pengambilan foto dan video, penyuntingan konten, serta pengembangan media audiovisual, seperti video publikasi, dokumentasi kegiatan, dan konten Reels. Mulmed berperan dalam menyampaikan informasi melalui media audiovisual yang menarik, dinamis, dan mudah dipahami."
            ]
          },
          {
            title: "Deputi Media Kreatif (Medkraf)",
            paragraphs: [
              "Deputi Media Kreatif merupakan bagian KMI yang berfokus pada pengembangan ide, konsep, dan strategi komunikasi kreatif dalam penyampaian informasi kabinet. Deputi ini bertanggung jawab dalam menciptakan konten yang interaktif, inovatif, dan relevan dengan kebutuhan mahasiswa, seperti media board, konten kreatif media sosial, serta berbagai bentuk publikasi yang mendorong keterlibatan audiens. Medkraf berperan dalam membangun komunikasi yang lebih dekat dengan mahasiswa melalui pendekatan kreatif dan mengikuti perkembangan media."
            ]
          }
        ]
      },
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "School of Medinfo",
            paragraphs: [
              "School of Medinfo merupakan program kerja yang berfokus pada peningkatan kompetensi fungsionaris di bidang media informasi dan kreativitas digital. Kegiatan ini memberikan pembekalan mengenai desain grafis, copywriting, serta pembuatan konten visual yang menarik, informatif, dan komunikatif. Program ini dilaksanakan pada bulan Oktober."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Design Request and Publication",
            paragraphs: [
              "Design Request and Publication merupakan agenda KMI yang menyediakan layanan permohonan desain dan publikasi bagi kementerian di lingkungan BEM FH UNNES. Agenda ini bertujuan untuk mendukung kebutuhan publikasi kegiatan dan penyebarluasan informasi setiap kementerian. Pelaksanaannya dilakukan secara berkelanjutan sesuai dengan permohonan yang masuk selama periode kepengurusan."
            ]
          },
          {
            title: "Launching Kabinet",
            paragraphs: [
              "Launching Kabinet merupakan agenda pengenalan resmi BEM FH UNNES kepada publik. Kegiatan ini mencakup penyampaian identitas visual kabinet, pengenalan fungsionaris, serta publikasi struktur organisasi dan informasi kabinet. Agenda ini dilaksanakan pada awal periode kepengurusan."
            ]
          },
          {
            title: "Kaleidoskop",
            paragraphs: [
              "Kaleidoskop merupakan agenda dokumentasi dan publikasi rangkuman perjalanan BEM FH UNNES selama satu periode kepengurusan. Konten ini memuat berbagai kegiatan, pencapaian, serta momen penting organisasi sebagai refleksi perjalanan kabinet. Agenda ini dilaksanakan sebanyak dua kali, yaitu Kaleidoskop Tengah Tahun pada pertengahan tahun serta Kaleidoskop Akhir Tahun pada akhir tahun dan awal tahun berikutnya."
            ]
          },
          {
            title: "Perayaan Hari Besar",
            paragraphs: [
              "Perayaan Hari Besar merupakan agenda KMI yang merancang dan memublikasikan konten ucapan untuk memperingati hari besar nasional maupun keagamaan melalui media sosial BEM FH UNNES. Agenda ini dilaksanakan secara berkelanjutan sesuai dengan kalender hari besar selama periode kepengurusan."
            ]
          },
          {
            title: "Social Media Development",
            paragraphs: [
              "Social Media Development merupakan agenda pengelolaan dan pengembangan seluruh platform media sosial BEM FH UNNES secara terstruktur dan berkelanjutan. Kegiatan ini meliputi perencanaan konten, penyusunan jadwal publikasi, pengelolaan media sosial, serta analisis insight untuk meningkatkan kualitas dan jangkauan informasi. Agenda ini dilaksanakan sepanjang periode kepengurusan."
            ]
          },
          {
            title: "Company Profile",
            paragraphs: [
              "Company Profile merupakan agenda pembuatan video profil resmi BEM FH UNNES yang memuat pengenalan fungsionaris, kementerian, serta tugas dan fungsi masing-masing bagian dalam kabinet. Video ini bertujuan untuk memberikan gambaran mengenai struktur dan pelaksanaan kepengurusan BEM FH UNNES. Agenda ini dilaksanakan pada bulan April–Mei."
            ]
          },
          {
            title: "Desain PDH, ID Card, dan PPT Kabinet",
            paragraphs: [
              "Desain PDH, ID Card, dan PPT Kabinet merupakan agenda KMI yang merancang kebutuhan identitas visual kabinet, meliputi desain Pakaian Dinas Harian (PDH), ID Card fungsionaris, serta PPT resmi kabinet. Agenda ini dilaksanakan pada awal periode kepengurusan."
            ]
          },
          {
            title: "Dokumentasi Archive",
            paragraphs: [
              "Dokumentasi Archive merupakan agenda pengumpulan, pengelolaan, dan pengarsipan dokumentasi foto maupun video dari berbagai kegiatan BEM FH UNNES. Arsip ini digunakan sebagai sumber dokumentasi organisasi serta mendukung kebutuhan pembuatan Company Profile dan Kaleidoskop. Agenda ini dilaksanakan secara berkelanjutan sesuai dengan pelaksanaan kegiatan BEM FH UNNES."
            ]
          },
          {
            title: "Media Partner",
            paragraphs: [
              "Media Partner merupakan agenda KMI yang menerima dan mengelola pengajuan kerja sama publikasi dari pihak internal Fakultas Hukum, internal UNNES, maupun pihak eksternal. Kerja sama dapat dilakukan melalui skema tukar follow atau pembayaran sesuai ketentuan yang berlaku. Agenda ini dilaksanakan secara berkelanjutan sesuai dengan permohonan kerja sama yang masuk selama periode kepengurusan."
            ]
          },
          {
            title: "Website Development",
            paragraphs: [
              "Website Development merupakan agenda pengembangan dan pengelolaan website resmi BEM FH UNNES sebagai pusat informasi digital kelembagaan. Kegiatan ini mencakup pengembangan website, pembaruan konten, serta pemeliharaan agar website dapat digunakan secara optimal. Pengembangan website dilaksanakan pada pertengahan periode, sedangkan pemeliharaan dilakukan secara rutin selama periode kepengurusan."
            ]
          },
          {
            title: "Organigram",
            paragraphs: [
              "Organigram merupakan agenda penyusunan dan publikasi struktur organisasi BEM FH UNNES yang memuat susunan fungsionaris, kementerian, serta hubungan koordinasi dalam kabinet. Organigram bertujuan untuk memberikan informasi mengenai struktur kepengurusan dan pembagian posisi dalam organisasi. Agenda ini dilaksanakan pada awal periode kepengurusan."
            ]
          },
          {
            title: "INTERUPSI (Informasi, Tanggapan, dan Diskusi)",
            paragraphs: [
              "INTERUPSI merupakan agenda KMI berupa konten Reels singkat yang berisi tanya jawab maupun informasi ringan mengenai isu-isu tertentu, dengan sasaran audiens internal maupun eksternal BEM FH UNNES. Agenda ini dilaksanakan secara berkelanjutan sepanjang periode kepengurusan."
            ]
          },
          {
            title: "Academi Medinfo",
            paragraphs: [
              "Academi Medinfo merupakan agenda berupa forum diskusi dan pengembangan antara KMI dengan PIC media dari setiap kementerian. Kegiatan ini bertujuan untuk menyelaraskan media branding, identitas visual, organigram, company profile, serta SOP. Academi Medinfo dilaksanakan dalam dua volume, yaitu Volume 1 yang membahas SOP Request Design & Publication dan Volume 2 yang membahas penyelarasan konsep Company Profile dari setiap media branding kementerian. Pelaksanaannya dilakukan secara bertahap selama periode kepengurusan."
            ]
          },
          {
            title: "Media Board",
            paragraphs: [
              "Media Board merupakan agenda penyampaian informasi melalui konten kreatif, persuasif, dan informatif yang relevan dengan kehidupan mahasiswa. Agenda ini bertujuan untuk meningkatkan wawasan serta memberikan informasi yang menarik dan mudah dipahami oleh mahasiswa. Media Board dilaksanakan secara berkelanjutan selama periode kepengurusan."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "sekretaris-kabinet",
    name: "Sekretaris Kabinet",
    kind: "sekretaris-kabinet",
    group: "sekretariat",
    sections: [
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Kalender Adhikara",
            paragraphs: [
              "Kalender Adhikara merupakan agenda Sekretaris Kabinet yang berfokus pada penyusunan, pengelolaan, dan penyelarasan kalender kegiatan BEM FH UNNES selama satu periode kepengurusan. Agenda ini bertujuan untuk memastikan seluruh program kerja dan kegiatan kabinet terjadwal secara terstruktur, meminimalkan benturan waktu antarkegiatan, serta memudahkan koordinasi antar kementerian. Kalender Adhikara disusun pada awal periode kepengurusan dan diperbarui secara berkala sesuai dengan perkembangan agenda kabinet."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "biro-administrasi",
    name: "Biro Administrasi",
    kind: "biro",
    group: "sekretariat",
    parentSlug: "sekretaris-kabinet",
    sections: [
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Pelatihan Sekretaris Kabinet",
            paragraphs: [
              "Pelatihan Sekretaris Kabinet merupakan agenda Biro Administrasi yang bertujuan untuk meningkatkan kemampuan sekretaris kementerian dalam menjalankan tugas administrasi organisasi. Kegiatan ini mencakup pembekalan mengenai kepenulisan administrasi, pengelolaan surat-menyurat, penyusunan dokumen, serta penerapan standar administrasi yang seragam di lingkungan BEM FH UNNES. Pelaksanaan agenda ini menyesuaikan dengan jadwal yang ditetapkan oleh Biro Administrasi."
            ]
          },
          {
            title: "Membentuk SOP Administrasi Kabinet",
            paragraphs: [
              "Membentuk SOP Administrasi Kabinet merupakan agenda Biro Administrasi dalam menyusun Standar Operasional Prosedur (SOP) sebagai pedoman pelaksanaan administrasi di lingkungan BEM FH UNNES. Agenda ini bertujuan untuk menciptakan sistem administrasi yang tertib, sistematis, dan seragam, sehingga seluruh kementerian dapat menjalankan proses administrasi sesuai dengan standar yang telah ditetapkan. Penyusunan dilakukan pada awal periode kepengurusan dan disesuaikan dengan kebutuhan administrasi kabinet."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "biro-keuangan",
    name: "Biro Keuangan",
    kind: "biro",
    group: "sekretariat",
    parentSlug: "sekretaris-kabinet",
    sections: [
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Pelatihan Bendahara Kabinet",
            paragraphs: [
              "Pelatihan Bendahara Kabinet merupakan agenda Biro Keuangan yang bertujuan untuk meningkatkan pemahaman dan kemampuan bendahara kementerian dalam mengelola keuangan organisasi. Kegiatan ini mencakup pembekalan mengenai pencatatan transaksi, pengelolaan anggaran, penyusunan laporan keuangan, serta penerapan tata kelola keuangan yang tertib dan transparan. Pelaksanaan agenda ini menyesuaikan dengan jadwal yang ditetapkan oleh Biro Keuangan."
            ]
          },
          {
            title: "Laporan Cashflow",
            paragraphs: [
              "Laporan Cashflow merupakan agenda Biro Keuangan dalam melakukan pencatatan dan pelaporan arus kas kabinet secara berkala. Agenda ini bertujuan untuk memantau pemasukan dan pengeluaran keuangan BEM FH UNNES agar pengelolaan dana berjalan secara terstruktur, transparan, dan dapat dipertanggungjawabkan. Pelaporan dilakukan secara berkala selama periode kepengurusan."
            ]
          },
          {
            title: "Membentuk SOP Keuangan Kabinet",
            paragraphs: [
              "Membentuk SOP Keuangan Kabinet merupakan agenda Biro Keuangan dalam menyusun Standar Operasional Prosedur (SOP) sebagai pedoman pengelolaan keuangan di lingkungan BEM FH UNNES. Agenda ini bertujuan untuk menciptakan sistem pengelolaan keuangan yang tertib, seragam, transparan, dan akuntabel. Penyusunan dilakukan pada awal periode kepengurusan serta disesuaikan dengan kebutuhan pengelolaan keuangan kabinet."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "menko-internal",
    name: "Kemenkoan Internal",
    kind: "kemenkoan",
    group: "internal",
    logo: {
      src: "/images/organisasi/menko-internal.webp",
      width: 640,
      height: 639
    },
    intro: [
      "Kemenkoan Internal bertugas menerjemahkan arah gerak yang dibawa oleh Presiden, menyelaraskan penyusunan dan pelaksanaan program kerja seluruh kementerian di bawah koordinasinya, melakukan check and balance serta monitoring berkala terhadap kinerja masing-masing kementerian, dan menyelaraskan roadmap agenda setiap kementerian. Kemenkoan Internal mengoordinasikan Kementerian Dalam Negeri, Kementerian Kaderisasi dan Pengembangan Sumber Daya Mahasiswa, serta Kementerian Seni, Olahraga, dan Budaya agar pelaksanaan program kerja berjalan secara terarah, efektif, dan tidak tumpang tindih."
    ],
    sections: []
  },
  {
    slug: "menko-eksternal",
    name: "Kemenkoan Eksternal",
    kind: "kemenkoan",
    group: "eksternal",
    logo: {
      src: "/images/organisasi/menko-eksternal.webp",
      width: 640,
      height: 591
    },
    intro: [
      "Kemenkoan Eksternal bertugas menerjemahkan arah gerak yang dibawa oleh Presiden, menyelaraskan penyusunan dan pelaksanaan program kerja seluruh kementerian di bawah koordinasinya, melakukan check and balance serta monitoring berkala terhadap kinerja masing-masing kementerian, dan menyelaraskan roadmap agenda setiap kementerian. Kemenkoan Eksternal mengoordinasikan Kementerian Hubungan Luar dan Kementerian Ekonomi Kreatif guna mendukung pengembangan hubungan eksternal, kerja sama strategis, serta pelaksanaan program kerja yang selaras dengan arah gerak kabinet."
    ],
    sections: []
  },
  {
    slug: "menko-soshumpol",
    name: "Kemenkoan SOSHUMPOL",
    shortName: "SOSHUMPOL",
    kind: "kemenkoan",
    group: "soshumpol",
    logo: {
      src: "/images/organisasi/menko-soshumpol.webp",
      width: 640,
      height: 635
    },
    intro: [
      "Kemenkoan Sosial, Hukum, dan Politik bertugas menerjemahkan arah gerak yang dibawa oleh Presiden, menyelaraskan penyusunan dan pelaksanaan program kerja seluruh kementerian di bawah koordinasinya, melakukan check and balance serta monitoring berkala terhadap kinerja masing-masing kementerian, dan menyelaraskan roadmap agenda setiap kementerian. Kemenkoan SOSHUMPOL mengoordinasikan Kementerian Advokasi dan Kesejahteraan Mahasiswa, Kementerian Kajian dan Propaganda, serta Kementerian Sosial Masyarakat agar pelaksanaan program kerja di bidang sosial, hukum, dan politik berjalan selaras dengan arah gerak kabinet."
    ],
    sections: []
  },
  {
    slug: "dagri",
    name: "Kementerian Dalam Negeri",
    kind: "kementerian",
    group: "internal",
    parentSlug: "menko-internal",
    logo: {
      src: "/images/organisasi/dagri.webp",
      width: 640,
      height: 640
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "Dewi Themis Awards",
            paragraphs: [
              "Dewi Themis Awards merupakan malam apresiasi yang diselenggarakan untuk memberikan penghargaan kepada mahasiswa, organisasi, dan komunitas di lingkungan Fakultas Hukum UNNES atas kontribusi positif serta prestasi yang telah diraih. Kegiatan ini menjadi bentuk penghargaan sekaligus motivasi bagi mahasiswa untuk terus berkarya, berinovasi, dan memberikan dampak positif bagi lingkungan kampus."
            ]
          },
          {
            title: "Hello Camaba Special Edition",
            paragraphs: [
              "Hello Camaba Special Edition merupakan kegiatan penyambutan dan pengenalan awal bagi mahasiswa baru Fakultas Hukum UNNES. Kegiatan ini bertujuan untuk memberikan informasi mengenai PKKMB, Unit Kegiatan Mahasiswa (UKM), serta Kelompok Belajar yang ada di lingkungan fakultas. Kegiatan dilaksanakan secara daring melalui Zoom pada awal periode penerimaan mahasiswa baru setelah rangkaian seleksi mandiri selesai."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Rapat Koordinasi (Rakoor)",
            paragraphs: [
              "Rapat Koordinasi merupakan agenda koordinasi dan penyelarasan program kerja antara BEM FH UNNES dengan DPM, UKM, serta Kelompok Belajar di lingkungan Fakultas Hukum UNNES. Dalam kegiatan ini, setiap organisasi menyampaikan rencana program kerja dan agenda, membahas kendala yang dihadapi, serta menyelaraskan pelaksanaan kegiatan agar tercipta sinergi dan hubungan yang baik antarorganisasi."
            ]
          },
          {
            title: "SEBARI (Sesambungan Bareng Kementerian Dalam Negeri)",
            paragraphs: [
              "SEBARI merupakan agenda yang bertujuan untuk mempererat hubungan dan meningkatkan sinergi antara BEM FH UNNES dengan organisasi internal fakultas, khususnya UKM dan Kelompok Belajar. Kegiatan ini menjadi ruang komunikasi dan kolaborasi untuk membangun hubungan yang berkelanjutan serta menindaklanjuti hasil koordinasi bersama. SEBARI dilaksanakan secara berkala setiap enam bulan."
            ]
          },
          {
            title: "Open House BEM",
            paragraphs: [
              "Open House BEM merupakan agenda pengenalan BEM FH UNNES kepada mahasiswa Fakultas Hukum UNNES. Kegiatan ini memberikan kesempatan kepada mahasiswa untuk mengenal lebih dekat struktur organisasi, kementerian, program kerja, dan agenda BEM FH UNNES. Melalui kegiatan ini, mahasiswa diharapkan dapat memahami peran BEM serta memperoleh informasi mengenai ruang partisipasi dan kontribusi dalam organisasi."
            ]
          },
          {
            title: "Lingkar Study",
            paragraphs: [
              "Lingkar Study merupakan agenda kolaborasi antara BEM FH UNNES dengan Kelompok Belajar untuk meningkatkan pemahaman mahasiswa terhadap materi perkuliahan. Kegiatan ini dilaksanakan dalam tiga sesi yang berfokus pada bidang hukum pidana melalui PSC, hukum perdata melalui PSLC, serta hukum tata negara melalui Matahati. Lingkar Study diselenggarakan menjelang UTS dan UAS sebagai wadah belajar bersama dan persiapan mahasiswa menghadapi ujian."
            ]
          },
          {
            title: "Kabar Prestasi",
            paragraphs: [
              "Kabar Prestasi merupakan agenda publikasi informasi mengenai pencapaian dan prestasi mahasiswa Fakultas Hukum UNNES, baik yang berasal dari UKM, Kelompok Belajar, maupun mahasiswa secara umum. Informasi prestasi dihimpun dan dipublikasikan melalui Instagram BEM FH UNNES sebagai bentuk apresiasi terhadap pencapaian mahasiswa sekaligus sarana untuk menginspirasi mahasiswa lainnya agar terus berprestasi."
            ]
          },
          {
            title: "Wisuda Alumni BEM FH UNNES",
            paragraphs: [
              "Wisuda Alumni BEM FH UNNES merupakan agenda apresiasi kepada fungsionaris BEM FH UNNES yang telah menyelesaikan masa studi dan melaksanakan wisuda. Apresiasi diberikan melalui publikasi Instagram Story pada akun BEM FH UNNES sebagai bentuk penghargaan atas kontribusi dan dedikasi selama menjalankan kepengurusan. Agenda ini dilaksanakan mengikuti jadwal wisuda."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "kpsdm",
    name: "Kementerian Kaderisasi dan Pengembangan Sumber Daya Mahasiswa",
    shortName: "KPSDM",
    kind: "kementerian",
    group: "internal",
    parentSlug: "menko-internal",
    logo: {
      src: "/images/organisasi/kpsdm.webp",
      width: 569,
      height: 640
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "Sekolah Rakyat Maroon (SRM)",
            paragraphs: [
              "Sekolah Rakyat Maroon merupakan program kaderisasi yang dirancang sebagai ruang pencerdasan awal bagi mahasiswa baru Fakultas Hukum UNNES. Program ini hadir sebagai upaya membangun kesadaran, kapasitas, dan karakter mahasiswa sejak awal memasuki dunia perkuliahan. SRM menjadi kelas kaderisasi tingkat pra-dasar yang membekali mahasiswa dengan pemahaman awal mengenai kehidupan mahasiswa dan organisasi."
            ]
          },
          {
            title: "Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD)",
            paragraphs: [
              "Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD) merupakan program pelatihan kaderisasi lanjutan yang dirancang untuk membekali mahasiswa Fakultas Hukum UNNES dengan pengetahuan dan keterampilan dasar dalam manajemen organisasi. Program ini menjadi bagian penting dalam kesinambungan kaderisasi untuk membentuk mahasiswa yang memiliki kemampuan kepemimpinan, manajemen organisasi, serta manajemen diri yang baik."
            ]
          },
          {
            title: "Magang BEM",
            paragraphs: [
              "Magang BEM merupakan program kaderisasi lanjutan yang dirancang sebagai sarana regenerasi dan pencetakan calon pengurus Badan Eksekutif Mahasiswa Fakultas Hukum UNNES. Program ini menjadi ruang pembelajaran praktis bagi mahasiswa, khususnya mahasiswa baru, untuk memahami secara langsung dinamika, budaya kerja, serta sistem organisasi BEM FH UNNES."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "ViesK (Visual Branding KPSDM)",
            paragraphs: [
              "ViesK atau Visual Branding KPSDM merupakan wadah media Kementerian KPSDM yang bertugas mengunggah dan menyebarluaskan segala bentuk produk, program kerja, serta agenda yang akan dilaksanakan selama satu periode kabinet BEM FH UNNES. Agenda ini menjadi sarana penyampaian informasi sekaligus penguatan identitas dan citra Kementerian KPSDM melalui media visual."
            ]
          },
          {
            title: "Infografis Self Development (ISD)",
            paragraphs: [
              "Infografis Self Development merupakan agenda pencerdasan yang dikemas dalam bentuk konten visual informatif untuk meningkatkan kesadaran mahasiswa Fakultas Hukum UNNES terhadap pentingnya pengembangan diri dalam proses kaderisasi. Melalui penyampaian informasi yang menarik dan mudah dipahami, agenda ini diharapkan dapat mendorong mahasiswa untuk terus mengembangkan potensi dan kapasitas dirinya."
            ]
          },
          {
            title: "Silabus Kaderisasi",
            paragraphs: [
              "Silabus Kaderisasi merupakan agenda penyusunan pedoman alur kaderisasi yang akan dilaksanakan di lingkungan BEM FH UNNES. Silabus ini dibuat untuk menjamin keberlangsungan dan kesinambungan proses kaderisasi secara terarah dan sistematis sesuai dengan kebutuhan KM FH. Penyusunannya menjadi dasar dalam mengoptimalkan proses kaderisasi dari tingkat pra-dasar hingga tingkat lanjutan."
            ]
          },
          {
            title: "Deep Talk With KPSDM (DWP)",
            paragraphs: [
              "Deep Talk With KPSDM merupakan wadah pengembangan yang dapat berbentuk video singkat atau Reels, podcast, studi banding, maupun diskusi terbuka. Agenda ini diciptakan sebagai jembatan untuk mendapatkan dan menyebarkan informasi terkait kaderisasi dan pengembangan diri yang relevan bagi mahasiswa Fakultas Hukum UNNES. Melalui berbagai bentuk kegiatan tersebut, DWP menjadi ruang berbagi pengetahuan, pengalaman, serta wawasan yang mendukung pengembangan kapasitas mahasiswa."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "soraya",
    name: "Kementerian Seni, Olahraga, dan Budaya",
    shortName: "SORAYA",
    kind: "kementerian",
    group: "internal",
    parentSlug: "menko-internal",
    logo: {
      src: "/images/organisasi/soraya.webp",
      width: 548,
      height: 548
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "Fhustle",
            paragraphs: [
              "Fhustle merupakan program kerja keolahragaan dan kesenian yang berfokus pada mahasiswa internal Fakultas Hukum UNNES. Program ini bertujuan untuk mengembangkan minat dan bakat mahasiswa di bidang seni dan olahraga melalui kompetisi keolahragaan dan kesenian. Rangkaian kegiatan meliputi pendaftaran, seleksi, pelaksanaan lomba, hingga malam puncak dan penyerahan hadiah sebagai bentuk apresiasi terhadap peserta yang berprestasi."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Dobrak (Dolan Bareng Komunitas)",
            paragraphs: [
              "Dobrak atau Dolan Bareng Komunitas merupakan agenda yang bertujuan untuk menyambangi komunitas-komunitas di lingkungan Fakultas Hukum UNNES. Kegiatan ini dilakukan untuk mengetahui kendala yang dihadapi komunitas serta membangun komunikasi dan hubungan yang lebih dekat antara Kementerian SORAYA dengan komunitas yang ada di fakultas."
            ]
          },
          {
            title: "Gemakarsa",
            paragraphs: [
              "Gemakarsa merupakan agenda yang bertujuan untuk menggerakkan partisipasi BEM FH UNNES dalam mengingatkan mahasiswa akan pentingnya kebudayaan nasional. Agenda ini dilaksanakan melalui publikasi media, seperti mading dan media sosial, sebagai sarana untuk meningkatkan kesadaran mahasiswa terhadap pelestarian budaya."
            ]
          },
          {
            title: "Pendelegasian UNNES Games",
            paragraphs: [
              "Pendelegasian UNNES Games merupakan agenda yang bertujuan untuk mendampingi dan memfasilitasi mahasiswa Fakultas Hukum UNNES yang menjadi delegasi dalam ajang UNNES Games. Kegiatan ini menjadi bentuk dukungan Kementerian SORAYA terhadap mahasiswa yang mengikuti kompetisi olahraga, mulai dari proses persiapan hingga pelaksanaan kegiatan. Melalui agenda ini, diharapkan delegasi dapat mengikuti perlombaan dengan baik serta menjunjung tinggi nilai sportivitas dan solidaritas."
            ]
          },
          {
            title: "Funkom",
            paragraphs: [
              "Funkom merupakan agenda yang diselenggarakan untuk melakukan kegiatan olahraga bersama komunitas dan KM FH UNNES. Kegiatan ini bertujuan untuk mempererat hubungan antarmahasiswa dan komunitas, meningkatkan kebersamaan, serta membangun solidaritas melalui aktivitas olahraga bersama."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "hublu",
    name: "Kementerian Hubungan Luar",
    kind: "kementerian",
    group: "eksternal",
    parentSlug: "menko-eksternal",
    logo: {
      src: "/images/organisasi/hublu.webp",
      width: 640,
      height: 612
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "Forum Komunikasi",
            paragraphs: [
              "Forum diskusi antar-BEM Fakultas Hukum se-Semarang Raya untuk membahas isu-isu terkini, memperkuat komunikasi kelembagaan, menyamakan persepsi, serta mendorong koordinasi dan sinergi gerakan antarorganisasi mahasiswa."
            ]
          },
          {
            title: "XOXO (Exploration to External Organization)",
            paragraphs: [
              "Program yang menjadi wadah diskusi dan kolaborasi dengan organisasi di luar kampus untuk membangun hubungan eksternal, bertukar informasi, serta menjalin kerja sama dalam pelaksanaan program kerja."
            ]
          },
          {
            title: "SLACTION",
            paragraphs: [
              "Program yang menggabungkan kunjungan perusahaan dan SUMMIT Nasional sebagai sarana memperluas wawasan kelembagaan dan profesional mahasiswa, sekaligus membangun relasi strategis dengan lembaga mahasiswa serta instansi pemerintah maupun nonpemerintah."
            ]
          },
          {
            title: "Visit Company",
            paragraphs: [
              "Kegiatan kunjungan ke instansi pemerintah, perusahaan, firma hukum, maupun NGO untuk mengenal dunia kerja secara langsung serta menjalin dan memperkuat hubungan kerja sama antara BEM FH UNNES dengan mitra terkait."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Bubblespotlight",
            paragraphs: [
              "Bubblespotlight menjadi bagian dari agenda Kementerian Hubungan Luar untuk mendukung pengembangan jejaring dan komunikasi eksternal BEM FH UNNES."
            ],
            note: "Keterangan sementara"
          },
          {
            title: "Summit Regional (UNNES Raya, Semarang Raya, Jateng–DIY)",
            paragraphs: [
              "Agenda kunjungan dan pertemuan dengan BEM fakultas maupun universitas di lingkup regional melalui kegiatan formal dan informal untuk mempererat hubungan kelembagaan, bertukar gagasan, serta membangun sinergi dan kerja sama yang berkelanjutan."
            ]
          },
          {
            title: "Summit Nasional",
            paragraphs: [
              "Agenda kunjungan dan pertukaran gagasan dengan organisasi mahasiswa di tingkat nasional untuk memperluas jaringan kelembagaan, membangun hubungan strategis antar-BEM, serta mendorong kolaborasi yang mendukung pengembangan organisasi."
            ]
          },
          {
            title: "Database Mitra",
            paragraphs: [
              "Pengumpulan dan pendataan instansi serta pemangku kepentingan yang bekerja sama dengan BEM FH UNNES secara sistematis untuk mempermudah pengelolaan relasi kelembagaan sekaligus menyediakan akses informasi magang dan lowongan kerja bagi mahasiswa."
            ]
          },
          {
            title: "IKA (Ikatan Alumni)",
            paragraphs: [
              "Agenda untuk menjaga silaturahmi dan membangun komunikasi berkelanjutan dengan alumni FH UNNES guna memperoleh wawasan, pengalaman, serta informasi mengenai peluang magang dan dunia kerja bagi mahasiswa."
            ]
          },
          {
            title: "IDK: MoU (Intip Dunia Kerja)",
            paragraphs: [
              "Agenda kunjungan ke instansi, perusahaan, firma hukum, maupun NGO yang disertai upaya membangun kerja sama melalui nota kesepahaman (MoU). Kegiatan ini bertujuan memperluas kemitraan strategis dan memperkuat kredibilitas BEM FH UNNES dalam hubungan eksternal."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ekraf",
    name: "Kementerian Ekonomi Kreatif",
    shortName: "EKRAF",
    kind: "kementerian",
    group: "eksternal",
    parentSlug: "menko-eksternal",
    logo: {
      src: "/images/organisasi/ekraf.webp",
      width: 596,
      height: 640
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "Open Tender Vendor",
            paragraphs: [
              "Open Tender Vendor merupakan program kerja yang bertujuan untuk menjamin transparansi, akuntabilitas, dan profesionalitas dalam proses pemilihan vendor resmi BEM FH UNNES. Kegiatan ini ditujukan bagi pihak internal BEM FH UNNES dengan mekanisme berupa pembukaan tender, wawancara vendor, serta pengumuman vendor terpilih. Melalui program ini, diharapkan BEM FH UNNES memiliki vendor resmi yang dapat mendukung kebutuhan kegiatan organisasi."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Proposal Advertise",
            paragraphs: [
              "Proposal Advertise merupakan agenda yang bertujuan untuk memperoleh dukungan pendanaan melalui kerja sama sponsorship yang profesional. Sasaran kegiatan ini adalah perusahaan, instansi, dan mitra eksternal. Pelaksanaannya meliputi penyusunan proposal sponsorship, pendistribusian proposal, serta tindak lanjut kerja sama untuk memperoleh dukungan dana maupun fasilitas bagi kegiatan mahasiswa FH UNNES."
            ]
          },
          {
            title: "Lawledge (Law Knowledge)",
            paragraphs: [
              "Lawledge merupakan agenda yang bertujuan untuk menyediakan buku guna memenuhi kebutuhan akademik mahasiswa serta mempermudah akses terhadap bahan bacaan. Agenda ini menyasar mahasiswa FH UNNES, khususnya mahasiswa semester awal, melalui kerja sama dengan penerbit dan sistem pemesanan buku secara pre-order. Lawledge diharapkan dapat menyediakan buku yang bermanfaat bagi mahasiswa, membantu menambah dana program kerja, serta meningkatkan minat baca mahasiswa."
            ]
          },
          {
            title: "Ocehan (Obrolan Creative Economy & Human Network)",
            paragraphs: [
              "Ocehan merupakan agenda yang bertujuan untuk menyebarkan edukasi kewirausahaan secara ringan, relevan, dan aplikatif kepada mahasiswa Fakultas Hukum UNNES serta mahasiswa umum. Kegiatan ini dilaksanakan melalui pembuatan konten podcast dan Instagram Reels berdurasi singkat yang membahas kewirausahaan, sponsorship, UMKM, dan pengelolaan usaha. Konten dapat menghadirkan narasumber seperti pelaku UMKM, mahasiswa yang berwirausaha, maupun mitra Ekraf. Agenda ini dilaksanakan secara konsisten dengan target satu konten setiap bulan."
            ]
          },
          {
            title: "Legal Boost",
            paragraphs: [
              "Legal Boost merupakan agenda yang bertujuan untuk membangun kerja sama berkelanjutan antara BEM FH UNNES dengan UMKM lokal sebagai mitra sponsorship. Kegiatan ini dilaksanakan melalui pendataan UMKM, penawaran kerja sama, serta promosi timbal balik melalui kegiatan dan media BEM FH UNNES. Sasaran kerja sama meliputi berbagai bidang usaha, seperti FnB, laundry, nail art, barbershop, dan fotokopi. Melalui agenda ini, diharapkan terjalin kerja sama aktif dengan UMKM lokal serta peningkatan pendapatan sponsorship."
            ]
          },
          {
            title: "Mercitia (Merch Justitia)",
            paragraphs: [
              "Mercitia merupakan agenda yang bertujuan untuk menghadirkan merchandise resmi FH UNNES sebagai sarana identitas sekaligus sumber pendapatan berkelanjutan bagi organisasi. Kegiatan ini menyasar mahasiswa dan civitas akademika FH UNNES melalui proses desain, pembukaan pre-order, produksi, dan penjualan merchandise. Pelaksanaannya dilakukan dalam beberapa batch sesuai dengan kebutuhan dan perencanaan."
            ]
          },
          {
            title: "Online Selling (Income Social Media)",
            paragraphs: [
              "Online Selling merupakan agenda yang bertujuan untuk mengoptimalkan media sosial sebagai sarana pemasaran dan penjualan produk guna memperoleh pendapatan bagi organisasi. Agenda ini dilakukan melalui promosi produk secara daring dengan memanfaatkan media sosial BEM FH UNNES sebagai media publikasi dan pemasaran."
            ]
          },
          {
            title: "Ekrafhest",
            paragraphs: [
              "Ekrafhest merupakan agenda yang menjadi supporting system bagi program kerja kementerian lain sekaligus sarana promosi dan pemasaran produk secara langsung. Kegiatan ini menyasar UMKM lokal dan UMKM mahasiswa melalui penyelenggaraan bazar yang terintegrasi dengan program kerja kementerian lain. Pelaksanaannya meliputi koordinasi awal, perencanaan teknis, pelaksanaan, dan evaluasi."
            ]
          },
          {
            title: "LexTix",
            paragraphs: [
              "LexTix merupakan agenda yang bertujuan untuk menjadi mitra penjualan tiket sekaligus sumber pendapatan bagi BEM FH UNNES. Agenda ini menyasar mahasiswa FH UNNES dan masyarakat umum melalui kerja sama dengan event organizer konser serta sistem penjualan tiket. Melalui agenda ini, diharapkan dapat diperoleh pendapatan dari penjualan tiket sekaligus membangun relasi dengan pihak penyelenggara acara."
            ]
          },
          {
            title: "Danusan",
            paragraphs: [
              "Danusan merupakan agenda dana usaha Kementerian Ekonomi Kreatif untuk mendukung kebutuhan pendanaan kegiatan BEM FH UNNES."
            ],
            note: "Keterangan sementara"
          },
          {
            title: "Law-Biz (Law Business Zone)",
            paragraphs: [
              "Law-Biz merupakan agenda yang bertujuan untuk memfasilitasi UMKM dan penyedia jasa mahasiswa FH UNNES melalui media jual-beli berbasis WhatsApp. Agenda ini menyasar mahasiswa FH UNNES dengan mekanisme pembentukan grup jual-beli, pendataan, serta pendekatan kepada UMKM mahasiswa. Law-Biz diharapkan dapat menghidupkan ekosistem kewirausahaan di lingkungan FH UNNES dan menjadi wadah pemasaran bagi usaha mahasiswa."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "adkesma",
    name: "Kementerian Advokasi dan Kesejahteraan Mahasiswa",
    shortName: "ADKESMA",
    kind: "kementerian",
    group: "soshumpol",
    parentSlug: "menko-soshumpol",
    logo: {
      src: "/images/organisasi/adkesma.webp",
      width: 639,
      height: 640
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "SIAP (Sistem Informasi Advokasi Pintar)",
            paragraphs: [
              "SIAP merupakan website yang digunakan sebagai sarana penyebaran informasi dan penghimpunan data terkait permasalahan kesejahteraan mahasiswa Fakultas Hukum UNNES. SIAP berfungsi sebagai pintu utama bagi mahasiswa untuk menyampaikan pengaduan serta memperoleh informasi mengenai berbagai permasalahan kemahasiswaan. Program ini bertujuan untuk meningkatkan kesejahteraan mahasiswa, meratakan akses informasi dan penyerapan aspirasi, serta meningkatkan efektivitas Kementerian Adkesma dalam menjembatani penyampaian informasi dan aspirasi mahasiswa."
            ]
          },
          {
            title: "Law In Concentration",
            paragraphs: [
              "Law In Concentration merupakan program kerja yang bertujuan untuk mengenalkan berbagai konsentrasi bidang hukum kepada mahasiswa Fakultas Hukum UNNES yang akan memasuki semester lima. Kegiatan ini dilaksanakan melalui kolaborasi dengan Kelompok Belajar serta bagian bidang hukum perdata, pidana, dan HTN-HAN di Fakultas Hukum UNNES, seperti PSC, PCLC, dan Matahati. Program ini diharapkan dapat membantu mahasiswa memahami pilihan konsentrasi serta mempersiapkan diri dalam menentukan bidang akademik yang sesuai dengan minatnya."
            ]
          },
          {
            title: "Beasiswa Maroon",
            paragraphs: [
              "Beasiswa Maroon merupakan program kerja yang bertujuan untuk mendukung mahasiswa Fakultas Hukum UNNES dalam meringankan beban biaya Uang Kuliah Tunggal (UKT). Program ini menjadi bentuk kepedulian terhadap keberlangsungan pendidikan mahasiswa yang mengalami kendala finansial. Sumber pendanaan beasiswa diperoleh melalui kerja sama dengan mahasiswa, masyarakat di lingkungan FH UNNES, alumni, serta berbagai sponsor. Beasiswa Maroon diharapkan dapat menjadi jembatan bagi mahasiswa untuk terus berprestasi tanpa terkendala masalah finansial."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Hello Camaba (SNBP, SNBT)",
            paragraphs: [
              "Hello Camaba merupakan agenda penyambutan dan pengenalan kampus bagi calon mahasiswa baru Fakultas Hukum UNNES. Agenda ini bertujuan untuk membantu calon mahasiswa memahami dunia perkuliahan dan mempersiapkan diri menjadi mahasiswa. Kegiatan mencakup pelayanan pertanyaan calon mahasiswa baru, penyelenggaraan sesi Zoom terkait SNBP dan SNBT, informasi registrasi, serta penggunaan aplikasi UNNES. Selain itu, dibentuk grup komunikasi khusus mahasiswa baru untuk mempermudah penyampaian informasi."
            ]
          },
          {
            title: "Audiensi",
            paragraphs: [
              "Audiensi merupakan agenda berupa forum dialog strategis yang dilaksanakan sebagai upaya menyampaikan aspirasi, memperjuangkan kepentingan, serta membangun komunikasi konstruktif bagi mahasiswa Fakultas Hukum UNNES. Audiensi tidak hanya dilakukan dengan pimpinan fakultas, tetapi juga dengan lembaga, instansi, maupun mitra eksternal yang relevan guna memperluas jejaring, membuka ruang kolaborasi, serta mendorong kebijakan dan solusi yang berdampak nyata bagi mahasiswa."
            ]
          },
          {
            title: "Advocare",
            paragraphs: [
              "Advocare merupakan agenda mitigasi dan pengawasan sarana prasarana sebagai langkah preventif sebelum mahasiswa terdampak permasalahan fasilitas. Agenda ini dilaksanakan melalui penyisiran fasilitas setiap minggu dengan jadwal petugas yang terstruktur serta pencatatan temuan dalam lembar inventaris yang memuat kondisi, evaluasi, dan rekomendasi. Hasil inventarisasi ditinjau secara berkala dan diaudiensikan kepada pimpinan fakultas sebagai dasar tindak lanjut perbaikan fasilitas."
            ]
          },
          {
            title: "Banding UKT",
            paragraphs: [
              "Banding UKT merupakan agenda Kementerian Adkesma BEM FH UNNES berupa penetapan ulang dan angsuran UKT untuk membantu mahasiswa yang mengalami permasalahan pembayaran Uang Kuliah Tunggal. Agenda ini dilaksanakan bersama pimpinan fakultas pada setiap awal periode akademik dan menjadi bentuk pendampingan Adkesma dalam memperjuangkan kesejahteraan mahasiswa di bidang keuangan."
            ]
          },
          {
            title: "Kurikulum Pilar Advokasi",
            paragraphs: [
              "Kurikulum Pilar Advokasi merupakan salah satu kurikulum dalam kegiatan Sekolah Rakyat Maroon yang menekankan pembentukan karakter advokatif. Melalui kelas ini, peserta SRM diajak memahami bahwa advokasi merupakan proses yang membutuhkan pengetahuan, keterampilan, dan sikap reflektif. Mahasiswa dibekali kemampuan menganalisis masalah, menyusun strategi, serta menyampaikan kritik dan saran secara santun, tegas, solutif, dan membangun."
            ]
          },
          {
            title: "Saluran WA",
            paragraphs: [
              "Saluran WA Adkesma merupakan media distribusi informasi terpusat bagi mahasiswa Fakultas Hukum UNNES. Saluran ini berfungsi untuk mempermudah penyebaran informasi terkait akademik, keuangan, fasilitas, kebijakan fakultas, serta isu kemahasiswaan agar tersampaikan secara cepat, jelas, dan merata. Kehadirannya diharapkan dapat memperkuat akses informasi serta mendukung transparansi antara mahasiswa dan fakultas."
            ]
          },
          {
            title: "Lini Beasiswa",
            paragraphs: [
              "Lini Beasiswa Adkesma merupakan agenda yang berfokus pada penyediaan dan penyebarluasan informasi terkait berbagai peluang beasiswa yang dapat diakses oleh mahasiswa Fakultas Hukum UNNES. Agenda ini bertujuan untuk memberikan informasi yang akurat, terkini, dan komprehensif mengenai jenis beasiswa, persyaratan administrasi, mekanisme pendaftaran, serta jadwal pelaksanaan. Informasi beasiswa disebarluaskan secara berkala setiap bulan."
            ]
          },
          {
            title: "Advokabar",
            paragraphs: [
              "Advokabar merupakan agenda yang berfungsi sebagai media penyebaran informasi bagi seluruh Keluarga Mahasiswa Fakultas Hukum UNNES. Advokabar memuat berbagai informasi penting, seperti surat edaran, beasiswa, serta isu dan persoalan yang berkaitan dengan mahasiswa. Pelaksanaannya berlangsung sepanjang periode kepengurusan dan bersifat kondisional melalui publikasi Instagram sebagai media utama. Apabila SIAP telah berjalan, informasi Advokabar juga akan dipublikasikan melalui website tersebut."
            ]
          },
          {
            title: "Klinik Adkesma",
            paragraphs: [
              "Klinik Adkesma merupakan wadah pengaduan, pendampingan, dan penyampaian aspirasi bagi mahasiswa Fakultas Hukum UNNES. Klinik ini hadir sebagai ruang aman, nyaman, dan terpercaya bagi mahasiswa untuk menyampaikan keluhan, aspirasi, maupun permasalahan yang dialami. Klinik Adkesma melayani pengaduan terkait persoalan akademik maupun personal, kesejahteraan dan hak mahasiswa, permasalahan keuangan, hingga pendampingan bagi mahasiswa yang mengalami kekerasan seksual. Dengan menjunjung prinsip kerahasiaan, empati, dan profesionalitas, Klinik Adkesma berkomitmen menjadi jembatan antara mahasiswa dan pihak fakultas demi terciptanya lingkungan kampus yang adil, aman, dan sejahtera."
            ]
          },
          {
            title: "Justifound",
            paragraphs: [
              "Justifound merupakan agenda Direktorat Jenderal Kesejahteraan Mahasiswa yang hadir sebagai ruang aman bagi mahasiswa Fakultas Hukum UNNES dalam melaporkan dan menemukan kembali barang yang hilang. Agenda ini bertujuan untuk meningkatkan keamanan dan kenyamanan lingkungan kampus melalui sistem pelaporan yang mudah diakses, responsif, dan terkoordinasi, sehingga setiap laporan kehilangan maupun temuan dapat ditindaklanjuti secara efektif dan bertanggung jawab."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "kaspro",
    name: "Kementerian KASPRO",
    shortName: "KASPRO",
    kind: "kementerian",
    group: "soshumpol",
    parentSlug: "menko-soshumpol",
    logo: {
      src: "/images/organisasi/kaspro.webp",
      width: 640,
      height: 640
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "September Hitam",
            paragraphs: [
              "Kegiatan untuk menjaga semangat menolak lupa terhadap tragedi kemanusiaan melalui diskusi, dokumentasi sejarah, dan aksi teatrikal edukatif."
            ]
          },
          {
            title: "Gerakan Eksplorasi Bersama Rakyat",
            paragraphs: [
              "Kegiatan kunjungan ke lokasi sengketa atau situs bersejarah untuk memahami sejarah gerakan sosial dan perjuangan mahasiswa serta mendokumentasikan realitas sosial melalui karya tulis."
            ]
          },
          {
            title: "International Women’s Day",
            paragraphs: [
              "Kampanye simbolik dan edukatif sebagai bentuk apresiasi terhadap perempuan serta pengingat pentingnya kesetaraan hak perempuan di lingkungan kampus."
            ]
          },
          {
            title: "16 HAKTP",
            paragraphs: [
              "Rangkaian kegiatan untuk meningkatkan pemahaman mahasiswa mengenai pencegahan kekerasan seksual melalui diskusi interaktif, instalasi kreatif, propaganda digital, dan penyediaan informasi kanal pengaduan."
            ]
          },
          {
            title: "Audiensi",
            paragraphs: [
              "Komunikasi formal dengan lembaga pemerintahan untuk menyampaikan aspirasi, kritik, dan rekomendasi kebijakan berdasarkan kajian hukum serta data lapangan, dengan mendorong adanya tindak lanjut yang nyata."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "Diskusi Pekanan (Depak)",
            paragraphs: [
              "Forum diskusi yang inklusif dan terbuka untuk membahas isu-isu aktual, mendorong dialog konstruktif, serta menghasilkan gagasan dan kajian bersama."
            ]
          },
          {
            title: "Bincang Politik (Bintik)",
            paragraphs: [
              "Podcast diskusi interaktif mengenai isu politik lokal hingga internasional dengan melibatkan akademisi atau praktisi sebagai narasumber dan mahasiswa sebagai moderator."
            ]
          },
          {
            title: "Ngaji Kastrat",
            paragraphs: [
              "Forum diskusi nonformal untuk membahas isu-isu terkini secara mendalam dalam suasana santai, sekaligus mendorong pemikiran kritis, pembelajaran kolektif, dan solidaritas."
            ]
          },
          {
            title: "Rekap Isu Sepekan (Risau)",
            paragraphs: [
              "Pemantauan dan perangkuman isu sosial, hukum, dan politik terkini secara singkat dan tajam, kemudian disajikan melalui media kreatif digital."
            ]
          },
          {
            title: "Pencerdasan Politik dan Hukum (Petitum)",
            paragraphs: [
              "Edukasi berbasis media daring untuk meningkatkan pemahaman publik, khususnya mahasiswa, mengenai demokrasi, penegakan hukum, dan kebijakan publik."
            ]
          },
          {
            title: "Siaran Komedi Mahasiswa (Sarkas)",
            paragraphs: [
              "Program edukatif dan hiburan yang menyampaikan isu hukum serta sosial politik melalui video kreatif bernuansa humor agar lebih ringan dan mudah dipahami mahasiswa."
            ]
          },
          {
            title: "Peringatan Hari Besar Nasional (PHBN)",
            paragraphs: [
              "Peringatan hari nasional sebagai bentuk penghormatan terhadap peristiwa dan identitas bangsa untuk meningkatkan kesadaran sejarah, memperkuat persatuan, dan menanamkan nilai kebangsaan."
            ]
          },
          {
            title: "Kajian",
            paragraphs: [
              "Analisis isu sebagai fondasi aksi dan advokasi melalui pengolahan data, literatur hukum, serta dinamika sosial untuk menghasilkan rekomendasi kebijakan yang solutif dalam bentuk tulisan akademik dan infografis."
            ]
          },
          {
            title: "Konsolidasi dan Aksi",
            paragraphs: [
              "Kegiatan pergerakan mahasiswa untuk menyatukan massa, menyusun strategi, serta menghasilkan pernyataan sikap dan tuntutan yang terorganisasi dalam mengawal isu kerakyatan dengan landasan kajian yang kuat."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "sosmas",
    name: "Kementerian Sosial Masyarakat",
    shortName: "SOSMAS",
    kind: "kementerian",
    group: "soshumpol",
    parentSlug: "menko-soshumpol",
    logo: {
      src: "/images/organisasi/sosmas.webp",
      width: 640,
      height: 627
    },
    sections: [
      {
        id: "program-kerja",
        title: "Program Kerja",
        items: [
          {
            title: "PEMIKAT Ramadhan",
            paragraphs: [
              "Kegiatan sosial selama bulan Ramadhan melalui penggalangan dana, pembagian takjil, Sahur On The Road (SOTR), dan kegiatan berbagi untuk menumbuhkan kepedulian serta solidaritas terhadap masyarakat yang membutuhkan."
            ]
          },
          {
            title: "PEMIKAT Sambang Panti",
            paragraphs: [
              "Kegiatan kunjungan ke panti asuhan yang diisi dengan penyaluran bantuan, berbagi cerita, penyampaian materi, dan aktivitas bersama anak-anak panti untuk memperkuat nilai kemanusiaan dan kebersamaan."
            ]
          },
          {
            title: "Donor Darah",
            paragraphs: [
              "Kegiatan sukarela untuk membantu memenuhi kebutuhan darah bagi masyarakat yang membutuhkan transfusi sekaligus meningkatkan kepedulian mahasiswa terhadap aksi kemanusiaan."
            ]
          },
          {
            title: "Sosmas Mengajar",
            paragraphs: [
              "Program pengabdian di bidang pendidikan melalui pendampingan dan pembelajaran bagi anak-anak yang memiliki keterbatasan akses pendidikan, dengan fokus pada kemampuan membaca, menulis, berhitung (CALISTUNG), serta pengembangan karakter."
            ]
          },
          {
            title: "Serviam of Law",
            paragraphs: [
              "Program desa binaan yang mengintegrasikan literasi hukum dan pemberdayaan ekonomi lokal melalui pengembangan UMKM, potensi wisata, serta peningkatan kualitas sumber daya manusia desa untuk mendorong kemandirian dan keberlanjutan masyarakat."
            ]
          },
          {
            title: "SIMPUL (Sinergi Mahasiswa Pengawali Isu Lingkungan)",
            paragraphs: [
              "Program pengawalan isu lingkungan hidup melalui kajian berbasis regulasi, observasi lapangan, dan publikasi edukatif untuk meningkatkan kesadaran lingkungan serta mendorong penyelesaian permasalahan ekologis."
            ]
          }
        ]
      },
      {
        id: "agenda",
        title: "Agenda",
        items: [
          {
            title: "PHBNI Lingkungan Hidup",
            paragraphs: [
              "Agenda publikasi melalui media sosial untuk memperingati Hari Besar Nasional dan Internasional yang berkaitan dengan lingkungan hidup sebagai sarana edukasi dan pengingat pentingnya menjaga serta melestarikan lingkungan."
            ]
          },
          {
            title: "Obrak × Gebrak (Observasi Daerah Terdampak × Gerakan Eksplorasi Bersama Rakyat)",
            paragraphs: [
              "Agenda kolaborasi berupa observasi langsung ke daerah yang mengalami permasalahan lingkungan untuk mengidentifikasi kondisi dan permasalahan yang dihadapi masyarakat. Hasil observasi dituangkan dalam dokumen kajian lingkungan yang memuat temuan lapangan dan rekomendasi solusi."
            ]
          },
          {
            title: "Ecolaw",
            paragraphs: [
              "Agenda kajian lingkungan hidup yang berfokus pada analisis isu-isu ekologis berdasarkan regulasi yang berlaku, mencakup lingkup internal UNNES, regional Jawa Tengah, hingga nasional, guna menghasilkan kajian berbasis data dan rekomendasi yang solutif bagi perlindungan lingkungan hidup."
            ]
          }
        ]
      }
    ]
  }
];

export const organizationGroups: readonly OrganizationGroup[] = [
  {
    id: "badan-independen",
    title: "Badan Independen",
    coordinatorSlug: null,
    memberSlugs: [
      "mio",
      "kmi"
    ]
  },
  {
    id: "sekretariat",
    title: "Sekretariat Kabinet",
    coordinatorSlug: "sekretaris-kabinet",
    memberSlugs: [
      "biro-administrasi",
      "biro-keuangan"
    ]
  },
  {
    id: "internal",
    title: "Kemenkoan Internal",
    coordinatorSlug: "menko-internal",
    memberSlugs: [
      "dagri",
      "kpsdm",
      "soraya"
    ]
  },
  {
    id: "eksternal",
    title: "Kemenkoan Eksternal",
    coordinatorSlug: "menko-eksternal",
    memberSlugs: [
      "hublu",
      "ekraf"
    ]
  },
  {
    id: "soshumpol",
    title: "Kemenkoan SOSHUMPOL",
    coordinatorSlug: "menko-soshumpol",
    memberSlugs: [
      "adkesma",
      "kaspro",
      "sosmas"
    ]
  }
];

const organizationUnitBySlug = new Map(
  organizationUnits.map((unit) => [unit.slug, unit]),
);

export function getOrganizationUnit(slug: string): OrganizationUnit | undefined {
  return organizationUnitBySlug.get(slug);
}

export function organizationHref(slug: string): string {
  return `/profil/organisasi/${slug}`;
}
