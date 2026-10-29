import Image from "next/image";
import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import OrganizationStructure from "../../components/organization/OrganizationStructure";
import { organigram } from "../../lib/photos";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Profil Kabinet | BEM FH UNNES 2026",
};

const logoPhilosophy = [
  [
    "Api",
    "Semangat & Pergerakan",
    "Mencerminkan jiwa Laksana: setiap langkah harus berwujud nyata, menyala, dan meninggalkan jejak.",
  ],
  [
    "Sayap",
    "Kebijaksanaan & Jangkauan",
    "Mencerminkan jiwa Adhikara: kebijakan lahir dari ketenangan dan keteguhan. Sayap juga menyimbolkan jangkauan BEM FH UNNES dari internal kampus hingga skala nasional.",
  ],
  [
    "Pena",
    "Intelektualitas & Pengabdian",
    "Fondasi dari seluruh gerak: intelektualitas, penulisan kajian, dan advokasi berbasis data.",
  ],
  [
    "Merah tua & Oranye",
    "Keteguhan dan energi",
    "Merah tua mencerminkan keteguhan dan keberanian moral. Oranye melambangkan energi, kreativitas, dan optimisme dalam setiap gerak advokasi.",
  ],
  [
    "Emas",
    "Nilai luhur dan kemuliaan",
    "Sayap emas menjadi simbol kepemimpinan yang tidak sekadar lantang, tetapi penuh kedalaman dan tanggung jawab.",
  ],
  [
    "Biru langit",
    "Ketenangan dan kepercayaan",
    "Biru pada pena melambangkan ketenangan, kejernihan pikiran, dan kepercayaan publik di tengah dinamika organisasi.",
  ],
];
const missions = [
  "Reformulasi tata kelola BEM FH UNNES guna menciptakan iklim organisasi yang terstruktur dan kredibel.",
  "Mendorong keberlanjutan harmoni dan sinergi antar elemen civitas FH UNNES agar tercapainya lingkungan kampus yang terintegrasi.",
  "Merawat dan memperluas relasi kemitraan strategis dalam cakupan regional dan nasional guna memperkuat jaringan BEM FH UNNES.",
  "Bergerak secara proaktif dalam mengawal dan mengadvokasikan isu strategis serta melakukan pengabdian guna mewujudkan kesejahteraan mahasiswa dan masyarakat.",
];

export default function Profile() {
  return (
    <SiteShell>
      <div className="profile-rebuild">
        <section
          className="profile-rebuild-hero"
          aria-labelledby="profile-title"
        >
          <div className="service-container">
            <p className="service-eyebrow">Profil Kabinet · 2026</p>
            <h1 id="profile-title">
              BEM FH UNNES 2026
              <br />
              <em>Kabinet Laksana Adhikara.</em>
            </h1>
            <p className="profile-hero-lead">
              Berdiri bukan sekadar struktur, bukan sekadar agenda. Melainkan
              sebuah gerakan katalis yang menyalakan perubahan dalam ekosistem
              kampus dan masyarakat.
            </p>
          </div>
        </section>
        <section
          className="profile-rebuild-section"
          aria-labelledby="logo-philosophy-title"
        >
          <div className="service-container">
            <div className="profile-section-heading">
              <div>
                <p className="service-eyebrow">Identitas gerak</p>
                <h2 id="logo-philosophy-title">Filosofi Logo</h2>
              </div>
              <p>
                Setiap unsur pada logo menjadi doa, arah, dan pengingat cara
                Kabinet Laksana Adhikara bergerak.
              </p>
            </div>
            <div className="profile-logo-layout">
              <div className="profile-logo-card">
                <Image
                  src="/images/logo-kabinet-laksana-adhikara.webp"
                  width={265}
                  height={388}
                  alt="Logo Kabinet Laksana Adhikara"
                />
              </div>
              <div className="profile-philosophy-grid">
                {logoPhilosophy.map(([title, subtitle, text], index) => (
                  <article key={title}>
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                    <strong>{subtitle}</strong>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="arah-gerak"
          className="profile-rebuild-section profile-rebuild-muted"
          aria-labelledby="vision-title"
        >
          <div className="service-container">
            <div className="profile-section-heading">
              <div>
                <p className="service-eyebrow">Arah gerak</p>
                <h2 id="vision-title">Visi &amp; Misi</h2>
              </div>
              <p>
                Satu visi sebagai kompas. Empat misi untuk menata cara kami
                bergerak bersama.
              </p>
            </div>
            <div className="profile-vision-card">
              <span>VISI</span>
              <p>
                Revitalisasi BEM FH UNNES sebagai katalisator positif dalam
                ekosistem kampus dan masyarakat dengan berlandaskan nilai
                adaptif, profesional, dan akuntabel.
              </p>
            </div>
            <div className="profile-missions">
              <div className="profile-mission-label">MISI</div>
              {missions.map((mission, index) => (
                <article key={mission}>
                  <span>0{index + 1}</span>
                  <p>{mission}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="struktur-organisasi"
          className="profile-rebuild-section"
          aria-labelledby="organigram-title"
        >
          <div className="service-container">
            <div className="profile-section-heading">
              <div>
                <p className="service-eyebrow">Orang-orang di balik gerak</p>
                <h2 id="organigram-title">Struktur Organisasi</h2>
              </div>
            </div>
            <figure className={`profile-organigram-frame ${styles.organigram}`}>
              <a
                className={styles.imageLink}
                href={organigram.src}
                target="_blank"
                rel="noreferrer"
                aria-label="Lihat bagan struktur organisasi ukuran penuh (tab baru)"
              >
                <Image
                  src={organigram.src}
                  width={organigram.width}
                  height={organigram.height}
                  alt={organigram.alt}
                  sizes="(max-width: 760px) calc(100vw - 72px), (max-width: 1280px) calc(100vw - 140px), 1136px"
                />
              </a>
              <figcaption className={styles.caption}>
                <a href={organigram.src} target="_blank" rel="noreferrer">
                  Lihat bagan ukuran penuh <span aria-hidden="true">↗</span>
                </a>
                <small>{organigram.status}</small>
              </figcaption>
            </figure>
            <p className={styles.structureIntroduction}>
              Kenali setiap unit dalam kabinet. Pilih badan, biro, atau
              kementerian untuk melihat profil, program kerja, dan agendanya.
            </p>
            <OrganizationStructure />
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
