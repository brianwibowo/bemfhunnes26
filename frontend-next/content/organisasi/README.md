# Materi organisasi

Data publik organisasi berada di `lib/organization.ts`. Halaman pada
`app/profil/organisasi/[slug]/page.tsx` dibuat statis saat build dari data tersebut.
Komponen ringkasan, detail, dan logo berada di `components/organization/`.

- Ubah nama, pengantar, program kerja, agenda, dan relasi unit pada data statis.
- Simpan logo siap tayang di `public/images/organisasi/` dalam format WebP;
  sesuaikan lokasi serta dimensi pada properti `logo` milik unit.
- Logo yang belum tersedia memakai inisial nama unit sebagai label teks.
- Keterangan tambahan yang belum berasal dari dokumen diberi properti `note`.
  Saat uraian resmi diterima, perbarui paragraf dan hapus catatan sementara itu.
- Arsip sumber tetap disimpan di `sources/`, di luar direktori publik.
  `sources/logos/manifest.json` mencatat nama asli, checksum, dan hasil konversi.

Catatan kelengkapan serta perbedaan penamaan tersedia di
[`docs/organisasi-content-notes.md`](../../../docs/organisasi-content-notes.md).
Data ini tidak memakai API atau pengelolaan melalui admin. Perubahan isi
diterapkan dengan build dan deploy ulang frontend.
