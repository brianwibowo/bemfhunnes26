# Frontend BEM FH UNNES

Next.js App Router. Jalankan `npm ci`, lalu `npm run dev`. `npm run build` memeriksa build produksi; `npm run typecheck` memeriksa TypeScript. Konfigurasi Vercel dan backend mengikuti `../DEPLOY.md`.

## Foto dan organigram

Foto publik berada di `public/images/kabinet/`, seluruhnya WebP tanpa metadata EXIF. Nama file dan teks alternatif dikelola di `lib/photos.ts`.

- `kabinet-laksana-adhikara.webp`: foto kabinet lengkap, ditampilkan tanpa memotong foto.
- Beranda memakai sebelas foto berbeda: foto kabinet utama, delapan dokumentasi carousel, foto ekspresi bersama untuk cerita kabinet, dan foto sinergi kementerian untuk kolaborasi. Galeri mencakup pengabdian, studi banding, rapat eksternal, aksi mahasiswa, tim kajian, donor darah, ekonomi kreatif, dan tim KPSDM. Carousel bergeser otomatis setiap 5 detik dan dapat digeser dengan sentuhan, tombol, atau keyboard.
- Profil memakai dua foto tersendiri: foto studio untuk pengantar kabinet dan foto olahraga untuk cerita harmoni. Keduanya tidak muncul lagi di beranda atau sampul artikel.
- Sembilan sampul artikel contoh mengikuti konteks rubriknya. Sebagian dokumentasi galeri juga dipakai untuk sampul rubrik yang sesuai; tiga sampul berita yang tampil di beranda tetap berbeda dari foto section lainnya di halaman yang sama.
- `organigram.webp`: organigram sementara. Ganti file ini ketika revisi tersedia. Jika rasio/resolusi berubah, perbarui `width` dan `height` pada `organigram` di `lib/photos.ts`. Ubah juga `alt`, `status`, dan susunan teks di `app/profil/page.tsx` jika strukturnya berubah, lalu deploy ulang ke Vercel.

Pertahankan resolusi dan rasio sumber tanpa upscaling. Ukuran setiap foto dicatat di `lib/photos.ts`; mayoritas 1024 × 768, satu foto 899 × 768. Untuk tambahan foto, konversi ke WebP kualitas sekitar 80–85, beri nama deskriptif, dan isi teks alternatif. Hindari menyimpan duplikat foto dengan nama berbeda. Gunakan sumber organigram beresolusi lebih tinggi bila tersedia agar teks lebih tajam saat diperbesar.

Foto dioptimalkan lagi oleh `next/image` sesuai ukuran layar. Hanya foto utama kabinet yang diprioritaskan; foto lain dimuat secara lazy.

## Font dan animasi

Plus Jakarta Sans variable Latin dimuat lokal melalui `next/font/local` dari paket `@fontsource-variable/plus-jakarta-sans` (lisensi SIL OFL disertakan dalam paket). Build tidak mengambil font dari Google.

Animasi scroll menggunakan `IntersectionObserver` pada elemen `data-reveal`, dengan variasi masuk dari samping, mask foto, dan stagger untuk elemen sejajar. Entrance hero, respons hover, dan indikator progres melengkapi transisi. Pita identitas mengikuti scroll melalui CSS pada browser yang mendukung; fallback tetap statis. Konten tetap terlihat tanpa JavaScript. Preferensi `prefers-reduced-motion` menonaktifkan gerakan. Carousel memakai native scrolling dan CSS scroll snap, tanpa library animasi tambahan.

Galeri bergeser otomatis setiap lima detik tanpa tombol Putar. Geser manual dan tombol navigasi mengulang hitungan otomatis; gerakan berlanjut setelah interaksi selesai. Hover, fokus keyboard, dan sentuhan yang masih ditekan menahan gerakan sementara. Autoplay juga berhenti ketika galeri keluar layar, tab tersembunyi, atau perangkat meminta reduced motion.

Favicon memakai logo BEM FH resmi melalui `app/favicon.ico`, `app/icon.png`, dan `app/apple-icon.png`. Logo serta nama kabinet di profil berada dalam satu bidang krem agar tidak menyatu dengan aksen marun di belakangnya.

Dekorasi merah marun dan emas memakai SVG asli di `GraphicAccent.tsx`, `graphic-accents.css`, dan `inner-graphics.css`, termasuk bentuk lengkung besar, pita, serta panah melingkar. Aksen tambahan berada di pengantar profil beranda dan arah gerak profil. Lengkung bergerak ringan mengikuti arah scroll pada browser yang mendukung, dengan tampilan statis untuk reduced motion. `ContextPointer` menampilkan petunjuk pada tautan publik bertanda `data-pointer-label`, hanya untuk mouse desktop tanpa reduced motion. Pointer bawaan tetap terlihat; dekorasi tidak menangkap klik atau dibacakan pembaca layar.

## Halaman dan pengelolaan

Copywriting beranda dan profil mengacu pada `GDO_Galuh_Ulfa.md` sebagai referensi resmi yang diberikan pengelola, terutama halaman 2–3 dan 13–15. Rumusan visi dan empat misi disimpan di `lib/cabinet.ts` dengan pembetulan salah baca OCR; pengantar, judul ringkas, dan penjelasan nilai dipadatkan untuk web. Dua tajuk nilai yang hilang pada OCR memakai istilah deskriptif dari paragrafnya. Halaman 23–32 yang belum berhasil diekstrak tidak dijadikan sumber, dan tidak ada nama program atau capaian yang direka. Berkas referensi tetap di source, tidak disalin ke direktori publik.

Kemahasiswaan, Eksternal, dan Berita adalah tiga halaman terpisah, bukan tab dalam satu daftar. Identitas dan copy setiap halaman berada di `lib/sections.ts`. Masing-masing daftar publik dan panel admin mempunyai filter, pagination, serta state permintaan sendiri. Akun admin tetap sama dan dapat membuka ketiga panel. Editor menolak membuka atau menyimpan artikel lewat panel rubrik yang berbeda.

## Pembagian sampul artikel contoh

| Rubrik        | Foto sampul                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| Berita        | `pimpinan-kabinet.webp`, `kebersamaan-di-kampus.webp`, `saling-merangkul.webp`      |
| Kemahasiswaan | `kaderisasi-dan-kebersamaan.webp`, `ruang-kajian.webp`, `kebersamaan-kabinet.webp`  |
| Eksternal     | `pertemuan-studi-banding.webp`, `aksi-donor-darah.webp`, `sinergi-kementerian.webp` |

Seeder backend memakai pembagian ini untuk data baru. Untuk data contoh lama, aktifkan `SEED_DEMO_CONTENT=true` saat menjalankan backend terbaru: migrasi sampul hanya memperbarui artikel yang masih persis bawaan seed, tanpa menyentuh revisi editor. Lihat panduan VPS di `../DEPLOY.md`.
