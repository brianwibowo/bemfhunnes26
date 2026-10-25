# Deploy Next.js ke Vercel dan Spring Boot ke VPS

## 1. DNS

Frontend production menggunakan `https://bemfhunnes26.vercel.app`. Tambahkan record A untuk `api-bemfhunnes26.duckdns.org` ke IP VPS `139.190.100.249`.

Di Vercel, import repository ini dan pilih **Root Directory** `frontend-next`. Set:

```text
NEXT_PUBLIC_API_URL=https://api-bemfhunnes26.duckdns.org
```

`CORS_ORIGINS` di VPS harus berisi `https://bemfhunnes26.vercel.app`. Jangan gunakan URL API HTTP atau alamat IP langsung dari browser karena akan melewati HTTPS dan berisiko diblokir sebagai mixed content.

## 2. VPS Spring Boot

```bash
git clone https://github.com/brianwibowo/bemfhunnes26.git
cd bemfhunnes26
cp backend-spring/.env.example backend-spring/.env
nano backend-spring/.env
```

Isi `JWT_SECRET`, `ADMIN_PASSWORD`, `SUPERADMIN_PASSWORD`, dan `CORS_ORIGINS` dengan nilai production. Jangan commit `.env`.

Jalankan API dan HTTPS reverse proxy:

```bash
docker compose -f docker-compose.vps.yml build
docker compose -f docker-compose.vps.yml up -d
docker compose -f docker-compose.vps.yml ps
docker compose -f docker-compose.vps.yml logs -f --tail=100 api caddy
```

API akan tersedia di `https://api-bemfhunnes26.duckdns.org`. Caddy menerbitkan dan memperbarui sertifikat HTTPS otomatis setelah DNS mengarah ke VPS. Endpoint pemeriksaan kesehatan: `/api/health`.

### Mengisi postingan contoh

Seeder artikel tersedia untuk mengisi **3 postingan di setiap rubrik**: Berita, Kemahasiswaan, dan Eksternal. Artikel berstatus published agar terlihat di halaman publik dan daftar admin. Deskripsi dan isi diberi label **Konten contoh**, tanpa mengarang jadwal atau informasi layanan yang belum dikonfirmasi. Gambar memakai aset `frontend-next/public/images/kabinet/`, jadi deploy frontend terbaru terlebih dahulu.

Seeder mati secara default. Untuk mengaktifkannya, tambahkan baris ini ke `backend-spring/.env` di VPS:

```dotenv
SEED_DEMO_CONTENT=true
```

Setelah menarik perubahan kode, jalankan:

```bash
docker compose -f docker-compose.vps.yml build api
docker compose -f docker-compose.vps.yml up -d api
docker compose -f docker-compose.vps.yml logs --tail=50 api
```

Seeder memakai akun admin/superadmin yang tersedia dan tidak menimpa artikel dengan slug contoh yang sudah ada. Penerapan seed dicatat di database, sehingga seed versi yang sama tidak diulang setelah selesai, termasuk setelah artikel diedit atau dihapus. Setelah data terisi, ubah kembali `SEED_DEMO_CONTENT=false` dan jalankan `docker compose -f docker-compose.vps.yml up -d api`. Mematikan flag tidak menghapus artikel yang sudah dibuat; kelola kontennya melalui admin.

Jika artikel contoh versi sebelumnya sudah ada, flag yang sama juga menjalankan pembaruan sampul `demo-article-covers-v2` satu kali. Sembilan artikel mendapat foto berbeda dari kumpulan foto beranda. Hanya artikel dengan teks, status, dan sampul yang masih sesuai seed lama yang diperbarui; revisi editor, penulis, serta tanggal artikel tetap utuh.

## 3. Backup

```bash
mkdir -p backups
docker run --rm -v bemfhunnes26_bemfh_data:/source -v "$PWD/backups":/backup alpine tar czf /backup/bemfh-data-$(date +%F).tgz -C /source .
docker run --rm -v bemfhunnes26_bemfh_uploads:/source -v "$PWD/backups":/backup alpine tar czf /backup/bemfh-uploads-$(date +%F).tgz -C /source .
```

## Update

```bash
git pull
docker compose -f docker-compose.vps.yml build
docker compose -f docker-compose.vps.yml up -d
```
