# BEM FH UNNES 2026

## Menjalankan aplikasi

Buka dua terminal.

Terminal backend:

```bash
cd backend
cp .env.example .env
npm install
npm start
```

Terminal frontend:

```bash
cd frontend
npm install
npm start
```

Buka `http://localhost:4200`. Frontend meneruskan `/api` dan `/uploads` ke API `http://localhost:3000` melalui `proxy.conf.json`.

Database SQLite dibuat otomatis di `backend/data/bemfh.sqlite`. Akun admin dibuat saat server pertama kali berjalan berdasarkan `.env`. Ganti password contoh sebelum digunakan bersama orang lain atau dideploy.

Panel admin tersedia di `http://localhost:4200/admin/login`. Akun admin dapat membuat artikel, menyimpan sebagai pending, publish, menonaktifkan artikel, mengunggah gambar, dan melihat preview. Server mengubah gambar menjadi WebP dengan lebar maksimum 1600px dan kualitas 78 untuk menjaga waktu muat.
