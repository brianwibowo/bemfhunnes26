import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import { photoCatalog } from "../../lib/photos";

export const metadata: Metadata = { title: "Beranda | BEM FH UNNES 2026" };
const services = [
  {
    title: "Advokasi",
    text: "Informasi dan layanan advokasi, pendampingan, serta dukungan kesejahteraan mahasiswa FH UNNES.",
    href: "/advokasi",
    action: "Buka Advokasi",
    photo: photoCatalog.study,
    photoPosition: "50% 55%",
    photoAlt: "Pengurus berkemeja hitam berfoto bersama sambil membentangkan bendera organisasi.",
  },
  {
    title: "Eksternal",
    text: "Informasi kerja sama, media partner, serta peluang magang dan jejaring BEM FH UNNES.",
    href: "/eksternal",
    action: "Buka Eksternal",
    photo: photoCatalog.visit,
    photoPosition: "50% 90%",
    photoAlt: "Peserta berjas almamater biru dan kuning berfoto bersama di depan gedung kampus.",
  },
  {
    title: "Berita",
    text: "Informasi dan berita terbaru seputar kegiatan BEM FH UNNES Kabinet Laksana Adhikara.",
    href: "/berita",
    action: "Lihat berita",
    photo: photoCatalog.learning,
    photoPosition: "50% 60%",
    photoAlt: "Mahasiswa berjas kuning berinteraksi dengan para siswa di ruang kelas.",
  },
];
export default function Home() {
  return (
    <SiteShell>
      <div className="service-home">
        <section className="service-hero" aria-labelledby="home-title" data-reveal="up">
          <div className="service-container service-hero-grid">
            <div>
              <p className="service-eyebrow">
                Badan Eksekutif Mahasiswa – Fakultas Hukum Universitas Negeri
                Semarang
              </p>
              <h1 id="home-title">Kabinet Laksana Adhikara</h1>
              <div className="service-actions">
                <Link
                  className="service-button service-button-primary"
                  href="/profil"
                >
                  Kenali Kabinet
                </Link>
                <Link
                  className="service-button service-button-secondary"
                  href="/profil#struktur-organisasi"
                >
                  Jelajahi Program
                </Link>
              </div>
            </div>
            <div className="service-hero-art">
              <span className="service-hero-art-label">
                LAKSANA ADHIKARA · 2026
              </span>
              <Image
                src="/images/logo-kabinet-laksana-adhikara.webp"
                width={210}
                height={310}
                alt="Logo Kabinet Laksana Adhikara"
                priority
              />
              <span>SUARA JUANG · SATU LANGKAH BERSAMA</span>
            </div>
          </div>
        </section>
        <section
          className="service-section service-company"
          aria-labelledby="company-title"
          data-reveal="up"
        >
          <div className="service-container service-company-card">
            <div>
              <h2 id="company-title">Company Profile</h2>
              <p>Company Profile – Jejak Laksana</p>
            </div>
            <div className="company-video-frame">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/BAB6RxqUVJo?si=UhUkWxCNohh4wqWa"
                title="Company Profile BEM FH UNNES"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
        <section
          id="layanan"
          className="service-section"
          aria-labelledby="services-title"
          data-reveal="up"
        >
          <div className="service-container">
            <div className="service-section-heading">
              <div>
                <h2 id="services-title">Akses yang kamu butuhkan.</h2>
              </div>
              <p>
                Informasi, gagasan, dan peluang untuk mendukung langkah
                mahasiswa.
              </p>
            </div>
            <div className="service-grid" data-reveal-group>
              {services.map((service) => (
                <Link
                  className="service-card"
                  href={service.href}
                  key={service.title}
                  data-reveal="pop"
                  data-pointer-label={`Buka ${service.title}`}
                  aria-labelledby={`home-service-${service.title.toLowerCase()}`}
                >
                  <div className="service-card-media">
                    <Image
                      src={service.photo.src}
                      fill
                      alt={service.photoAlt}
                      sizes="(max-width: 800px) calc(100vw - 32px), (max-width: 1280px) calc((100vw - 84px) / 3), 382px"
                      style={{ objectPosition: service.photoPosition }}
                    />
                  </div>
                  <div className="service-card-copy">
                    <h3 id={`home-service-${service.title.toLowerCase()}`}>
                      {service.title}
                    </h3>
                    <p>{service.text}</p>
                    <span className="service-card-action">
                      {service.action} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
