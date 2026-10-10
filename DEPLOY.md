# Deploy ke VPS Ubuntu dengan Docker

Target domain: `bemfhunnes26.duckdns.org`  
Target IP: `139.190.100.249`

## Informasi yang perlu disiapkan

- Alamat SSH, username deploy, port SSH, dan akses `sudo`. Kirim public key SSH, bukan password atau private key.
- Versi Ubuntu dan arsitektur VPS (`amd64` atau `arm64`).
- RAM, jumlah vCPU, dan kapasitas disk. Untuk aplikasi ini, 1 vCPU, 1 GB RAM, dan 10 GB disk cukup untuk mulai.
- Pastikan tidak ada service lain yang memakai port `80` dan `443`.
- Pastikan record DNS `A` `bemfhunnes26.duckdns.org` mengarah ke `139.190.100.249`.
- Kebijakan backup untuk volume database dan upload.

## Persiapan DNS

Di DuckDNS, arahkan domain ke `139.190.100.249`. HTTPS Caddy baru bisa terbit setelah DNS publik mengarah benar dan port 80/443 dapat diakses dari internet.

## Instal Docker di VPS

```bash
sudo apt update
sudo apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
newgrp docker
docker compose version
```

Jika UFW aktif:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Jalankan aplikasi

```bash
git clone https://github.com/brianwibowo/bemfhunnes26.git bemfhunnes26
cd bemfhunnes26
cp backend/.env.example backend/.env
nano backend/.env
```

Ganti `JWT_SECRET`, `ADMIN_PASSWORD`, dan `SUPERADMIN_PASSWORD` dengan nilai acak yang kuat. Jangan commit file `.env`.

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs -f --tail=100 caddy api
```

Setelah DNS dan sertifikat siap, akses:

- `https://bemfhunnes26.duckdns.org`
- `https://bemfhunnes26.duckdns.org/admin/login`

## Backup

Database dan upload disimpan di named volume Docker. Buat backup berkala:

```bash
mkdir -p backups
docker run --rm -v bemfhunnes26_bemfh_data:/source -v "$PWD/backups":/backup alpine tar czf /backup/bemfh-data-$(date +%F).tgz -C /source .
docker run --rm -v bemfhunnes26_bemfh_uploads:/source -v "$PWD/backups":/backup alpine tar czf /backup/bemfh-uploads-$(date +%F).tgz -C /source .
```

Update aplikasi:

```bash
git pull
docker compose build
docker compose up -d
```
