# Deploy Next.js ke Vercel dan Spring Boot ke VPS

## 1. DNS

Pertahankan domain frontend `bemfhunnes26.duckdns.org` untuk Vercel. Tambahkan record A untuk `api-bemfhunnes26.duckdns.org` ke IP VPS `139.190.100.249`.

Di Vercel, import repository ini dan pilih **Root Directory** `frontend-next`. Set:

```text
NEXT_PUBLIC_API_URL=https://api-bemfhunnes26.duckdns.org
```

Setelah deploy, masukkan URL Vercel final ke `CORS_ORIGINS` di VPS.

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

API akan tersedia di `https://api-bemfhunnes26.duckdns.org`. Endpoint pemeriksaan kesehatan: `/api/health`.

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
