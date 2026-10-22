# BEM FH UNNES 2026

Portal BEM FH UNNES 2026 menggunakan dua aplikasi:

- `frontend-next/`: Next.js App Router untuk Vercel.
- `backend-spring/`: Spring Boot API dengan SQLite untuk VPS.

## Menjalankan lokal

```bash
cd backend-spring
cp .env.example .env
mvn spring-boot:run

cd ../frontend-next
cp .env.example .env.local
npm install
npm run dev
```

Buka `http://localhost:3000`. Atur `NEXT_PUBLIC_API_URL=http://localhost:8080` di `.env.local`.

## Deploy

Frontend dideploy ke `https://bemfhunnes26.vercel.app` dari folder `frontend-next`. Set `NEXT_PUBLIC_API_URL=https://api-bemfhunnes26.duckdns.org`.

Backend dideploy ke VPS menggunakan `docker-compose.vps.yml`. Panduan lengkap ada di [DEPLOY.md](./DEPLOY.md).
