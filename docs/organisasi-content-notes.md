# Catatan isi organisasi BEM FH UNNES 2026

Data statis pada [`organization.ts`](../frontend-next/lib/organization.ts) memuat seluruh **16 unit** dan **117 butir isi** dalam [dokumen kementerian yang diberikan](../frontend-next/content/organisasi/sources/kementerian-bem-fh-unnes-2026.docx). Nama asli berkas tersebut adalah `Kementrian_BEM FH UNNES 26.docx`. [Prototipe bagan](../frontend-next/content/organisasi/sources/struktur-organisasi.reference.jsx) dipakai untuk hubungan antarunit; rincian kegiatan mengikuti dokumen.

## Kelengkapan per unit

Kolom pengantar menghitung paragraf pengantar atau tugas unit, bukan butir kegiatan. Tanda `0` berarti sumber tidak menyediakan isi untuk kategori tersebut. MIO memiliki satu daftar tanpa pemisahan kategori, sehingga seluruh 16 butirnya tetap berada pada bagian **Program Kerja dan Agenda**.

| Unit | Slug | Pengantar | Program kerja | Agenda | Deputi | Daftar gabungan MIO | Total butir |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Manajemen Internal Organisasi | `mio` | 0 | 0 | 0 | 0 | 16 | 16 |
| Kantor Media Informasi | `kmi` | 2 | 1 | 14 | 3 | 0 | 18 |
| Sekretaris Kabinet | `sekretaris-kabinet` | 0 | 0 | 1 | 0 | 0 | 1 |
| Biro Administrasi | `biro-administrasi` | 0 | 0 | 2 | 0 | 0 | 2 |
| Biro Keuangan | `biro-keuangan` | 0 | 0 | 3 | 0 | 0 | 3 |
| Kemenkoan Internal | `menko-internal` | 1 | 0 | 0 | 0 | 0 | 0 |
| Kemenkoan Eksternal | `menko-eksternal` | 1 | 0 | 0 | 0 | 0 | 0 |
| Kemenkoan SOSHUMPOL | `menko-soshumpol` | 1 | 0 | 0 | 0 | 0 | 0 |
| Kementerian Dalam Negeri | `dagri` | 0 | 2 | 6 | 0 | 0 | 8 |
| Kementerian Kaderisasi dan Pengembangan Sumber Daya Mahasiswa | `kpsdm` | 0 | 3 | 4 | 0 | 0 | 7 |
| Kementerian Seni, Olahraga, dan Budaya | `soraya` | 0 | 1 | 4 | 0 | 0 | 5 |
| Kementerian Hubungan Luar | `hublu` | 0 | 4 | 6 | 0 | 0 | 10 |
| Kementerian Ekonomi Kreatif | `ekraf` | 0 | 1 | 10 | 0 | 0 | 11 |
| Kementerian Advokasi dan Kesejahteraan Mahasiswa | `adkesma` | 0 | 3 | 10 | 0 | 0 | 13 |
| Kementerian KASPRO | `kaspro` | 0 | 5 | 9 | 0 | 0 | 14 |
| Kementerian Sosial Masyarakat | `sosmas` | 0 | 6 | 3 | 0 | 0 | 9 |
| **Total** | **16 unit** | **5** | **26** | **72** | **3** | **16** | **117** |

## Kelengkapan per kelompok

Koordinator termasuk dalam jumlah unit kelompoknya. MIO dan KMI sama-sama berlabel Badan Independen dalam dokumen; kelompok ini tidak memiliki unit koordinator tambahan. Kedua biro berada di bawah Sekretaris Kabinet sesuai bagan.

| Kelompok | Unit | Program kerja | Agenda | Deputi | Daftar gabungan MIO | Total butir |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Badan Independen | 2 | 1 | 14 | 3 | 16 | 34 |
| Sekretariat Kabinet | 3 | 0 | 6 | 0 | 0 | 6 |
| Kemenkoan Internal | 4 | 6 | 14 | 0 | 0 | 20 |
| Kemenkoan Eksternal | 3 | 5 | 16 | 0 | 0 | 21 |
| Kemenkoan SOSHUMPOL | 4 | 14 | 22 | 0 | 0 | 36 |
| **Total** | **16** | **26** | **72** | **3** | **16** | **117** |

## Perbedaan nama yang dipertahankan

| Bagian | Bukti sumber | Penanganan |
| --- | --- | --- |
| KASPRO dan KAP | Baris dokumen memakai **Kementerian KASPRO**. Uraian tugas Kemenkoan SOSHUMPOL menyebut **Kementerian Kajian dan Propaganda**. Bagan memakai **Kementerian Kajian Aksi Propaganda** dengan tujuan `/kemen-kap`. | Nama detail tetap **Kementerian KASPRO**, slug `kaspro`, sesuai baris dokumen dan nama logo. Kepanjangan KASPRO tidak ditebak. Uraian Kemenkoan tetap mempertahankan kalimat sumbernya. |
| SORAYA dan SOB | Dokumen menuliskan **Kementerian Seni, Olahraga, dan Budaya (SORAYA)**. Label bagan menuliskan nama bidang yang sama dengan `&`, tetapi tujuan tautannya `/kemen-sob`. | Nama lengkap dan singkatan **SORAYA** mengikuti dokumen; slug `soraya`. Tidak membuat unit SOB tambahan. |
| KPSDM | Dokumen menuliskan **Kaderisasi dan Pengembangan Sumber Daya Mahasiswa (KPSDM)**, sedangkan label bagan dipendekkan menjadi **Kaderisasi & PSDM**. | Nama lengkap dan singkatan mengikuti dokumen; slug `kpsdm`. |
| Kemenkoan | Baris dokumen memakai **Kemenkoan Internal**, **Kemenkoan Eksternal**, dan **Kemenkoan SOSHUMPOL**. Bagan memakai sebutan **Kementerian Koordinator**. | Nama unit mengikuti baris dokumen. Penjelasan lengkap tugas setiap kemenkoan tetap tersedia dalam pengantar. |
| SIAP | Program Adkesma dalam dokumen memakai **Sistem Informasi dan Aspirasi Pengaduan**. Halaman layanan `/kemahasiswaan` memakai **Sistem Informasi Adkesma Pintar**. | Detail organisasi mempertahankan kepanjangan pada dokumen. Halaman layanan yang sudah ada tidak diubah oleh perubahan data organisasi ini. Perbedaan memerlukan konfirmasi pemilik materi bila kelak ingin diseragamkan. |
| PSLC dan PCLC | Agenda **Lingkar Study** milik Dalam Negeri menyebut **PSLC**. Program **Law In Concentration** milik Adkesma menyebut **PCLC**. | Kedua ejaan dipertahankan pada konteks masing-masing. Tidak menentukan koreksi tanpa bukti tambahan. |

## Isi yang belum tersedia

- **Presiden dan Wakil Presiden** ada sebagai satu kotak pimpinan pada bagan, tetapi tidak memiliki baris profil atau uraian dalam dokumen. Karena itu, keduanya tidak dimasukkan sebagai halaman detail kosong. Tampilan pimpinan pada ringkasan organisasi tetap dapat menggunakan label tanpa tautan.
- **Bubblespotlight**, agenda Hubungan Luar, hanya disertai pemberitahuan bahwa deskripsi khususnya tidak ditemukan pada dokumen rujukan. Atas arahan pemilik situs untuk memberi keterangan terkait pada bagian kosong, halaman memakai uraian umum: “Bubblespotlight menjadi bagian dari agenda Kementerian Hubungan Luar untuk mendukung pengembangan jejaring dan komunikasi eksternal BEM FH UNNES.” Uraian ini merupakan tambahan editorial, bukan kutipan dokumen, dan ditandai **Keterangan sementara**.
- **Danusan**, agenda Ekonomi Kreatif, juga disertai pemberitahuan bahwa tujuan, mekanisme, dan sasarannya belum dijelaskan. Atas arahan yang sama, halaman memakai uraian umum: “Danusan merupakan agenda dana usaha Kementerian Ekonomi Kreatif untuk mendukung kebutuhan pendanaan kegiatan BEM FH UNNES.” Uraian ini merupakan tambahan editorial dan ditandai **Keterangan sementara**. Jadwal, sasaran khusus, serta mekanisme kedua agenda tidak ditambahkan.
- Tidak ada logo khusus **Sekretaris Kabinet**, **Biro Administrasi**, atau **Biro Keuangan** pada folder logo yang diberikan. Ketiganya tidak diberi logo unit lain. Tiga belas logo lainnya mengikuti [manifest sumber logo](../frontend-next/content/organisasi/sources/logos/manifest.json).
- Dokumen ini tidak menyediakan nama pengurus, foto, atau kontak unit. Data tersebut tidak ditambahkan.

## Batas perapian dan pemeriksaan

Urutan unit, urutan kegiatan, pembagian program kerja dan agenda, serta tiga deputi KMI mengikuti dokumen. Beberapa judul dan uraian tersambung tanpa spasi di dalam paragraf sumber, misalnya `School of MedinfoSchool of Medinfo merupakan...`; judul dipisahkan dari paragraf penjelas tanpa mengubah isinya. Spasi berlebih dan penomoran daftar dirapikan. Tajuk ganda `Agenda` pada Biro Keuangan disatukan menjadi satu bagian. Pilihan kata, angka, waktu kegiatan, nama program, dan singkatan sumber dipertahankan, termasuk ejaan seperti **Ngopag**, **Progja**, **Academi Medinfo**, dan **Lingkar Study**.

Pemeriksaan kelengkapan membandingkan semua paragraf nonkosong pada 16 baris dokumen dengan isi yang diekstrak, setelah mengabaikan tajuk berulang dan penomoran. Semua paragraf substantif terpetakan. Ada **115 uraian kegiatan/deputi** yang dipertahankan dan **2 pemberitahuan ketiadaan uraian** yang diganti dengan keterangan umum editorial atas arahan pemilik situs, sehingga tetap berjumlah **117 butir**, ditambah **5 paragraf pengantar**. Seluruh slug unit dan ID bagian unik pada lingkupnya; seluruh relasi kelompok dan induk menunjuk unit yang tersedia.
