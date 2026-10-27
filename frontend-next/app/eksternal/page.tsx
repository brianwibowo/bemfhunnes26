import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../../components/SiteShell";

export const metadata: Metadata = { title: "Eksternal | BEM FH UNNES 2026" };
const features = [
  [
    "Media Partner",
    "Menjalin kerja sama publikasi dengan media partner untuk memperluas jangkauan informasi BEM FH UNNES.",
    [["Kantor Media Informasi Medpart", "https://wa.me/62882005557365"]],
  ],
  [
    "Info Loker & Magang",
    "Akses informasi lowongan kerja dan magang untuk mendukung pengembangan karier mahasiswa FH UNNES.",
    [
      [
        "Hubungan Luar FH UNNES",
        "https://www.instagram.com/hublufhunnes?psln=MWxqNm1kdzRja3poeA==",
      ],
    ],
  ],
  [
    "Info Kerja Sama Mitra Strategis",
    "Informasi peluang kolaborasi dengan mitra strategis untuk mendukung program kerja BEM FH UNNES.",
    [
      ["Arkandhika Fauzan Hidajat", "https://wa.me/6287878180506"],
      ["Zhafira Dwi Rahma", "https://wa.me/6285716267471"],
    ],
  ],
  [
    "Kerja Sama Organisasi Universitas dan NGO",
    "Membangun relasi dan kolaborasi bersama organisasi mahasiswa lintas universitas dan NGO.",
    [
      ["Arkandhika Fauzan Hidajat", "https://wa.me/6287878180506"],
      ["Fatih Al Akbar (Abay)", "https://wa.me/628979047432"],
    ],
  ],
  [
    "Kerja Sama Sponsorship",
    "Menjalin kemitraan sponsorship untuk mendukung kebutuhan dan pelaksanaan kegiatan BEM FH UNNES.",
    [
      ["Dimas Gitias Putra", "https://wa.me/6282249636893"],
      ["Fauziah Indriani", "https://wa.me/6281226867616"],
    ],
  ],
] as Array<[string, string, Array<[string, string]>]>;

export default function Eksternal() {
  return (
    <SiteShell>
      <div className="service-page external-page">
        <section className="service-page-hero" data-reveal="up">
          <div className="service-container">
            <p className="service-eyebrow">Ruang kolaborasi</p>
            <h1>Eksternal.</h1>
            <p className="service-lead">
              Membuka jejaring, merawat kemitraan, dan menghadirkan kerja
              bersama yang bermakna untuk BEM FH UNNES dan mahasiswa.
            </p>
            <div className="service-actions">
              <Link
                className="service-button service-button-primary"
                href="#fitur"
              >
                Lihat kanal kerja sama
              </Link>
              <Link
                className="service-button service-button-secondary"
                href="/beranda"
              >
                Kembali ke beranda
              </Link>
            </div>
          </div>
        </section>
        <section id="fitur" className="service-section" data-reveal="up">
          <div className="service-container">
            <div className="service-section-heading">
              <div>
                <p className="service-eyebrow">Pusat layanan eksternal</p>
                <h2>Temukan kanal kolaborasi.</h2>
              </div>
              <p>
                Pilih kebutuhan kerja sama, lalu hubungi kontak yang tersedia
                melalui tombol resmi di bawah.
              </p>
            </div>
            <div className="adkesma-grid" data-reveal-group>
              {features.map(([title, text, contacts], i) => (
                <article className="adkesma-card" key={title} data-reveal="pop">
                  <span className="service-card-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="external-contacts">
                    {contacts.map(([label, href]) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        key={href}
                      >
                        {label} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
