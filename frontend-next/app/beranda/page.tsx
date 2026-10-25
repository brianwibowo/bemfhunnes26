import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import SiteShell from "../../components/SiteShell";
import PhotoCarousel from "../../components/PhotoCarousel";
import { cabinetPhoto, homePhotos } from "../../lib/photos";
import LatestArticles from "../../components/LatestArticles";
import Icon, { type IconName } from "../../components/Icon";
import { GraphicAccent, DoodleArrow } from "../../components/GraphicAccent";
import {
  cabinetIntroduction,
  cabinetMissions,
  cabinetPrinciples,
} from "../../lib/cabinet";

export const metadata: Metadata = { title: "Beranda | BEM FH UNNES 2026" };
const spaces: {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: IconName;
}[] = [
  {
    title: "Berita",
    description:
      "Informasi dan kabar terbaru seputar kegiatan BEM FH UNNES Kabinet Laksana Adhikara.",
    action: "Lihat berita",
    href: "/berita",
    icon: "book",
  },
  {
    title: "Mahasiswa",
    description:
      "Informasi beasiswa, dukungan, dan kesempatan belajar untuk keluarga mahasiswa hukum.",
    action: "Ruang kemahasiswaan",
    href: "/kemahasiswaan",
    icon: "people",
  },
  {
    title: "Eksternal",
    description:
      "Jejaring, kemitraan, dan percakapan untuk menghadirkan kerja bersama yang bermakna.",
    action: "Ruang kolaborasi",
    href: "/eksternal",
    icon: "globe",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section
        className="home-hero home-hero--photographic"
        aria-labelledby="home-title"
      >
        <div className="hero-banner" aria-hidden="true">
          <span>LAKSANA ADHIKARA</span>
          <GraphicAccent kind="loop" className="hero-banner-loop" />
        </div>
        <div className="portal-container hero-content">
          <div className="hero-copy">
            <span className="portal-kicker" data-motion-enter="up">
              <i /> Halo, Kawan Hukum!
            </span>
            <h1
              id="home-title"
              data-motion-enter="up"
              style={{ "--enter-delay": "80ms" } as CSSProperties}
            >
              Dari aspirasi,
              <br />
              jadi <em>aksi.</em>
              <span className="heading-star" aria-hidden="true">
                ✦
              </span>
            </h1>
            <p
              data-motion-enter="up"
              style={{ "--enter-delay": "160ms" } as CSSProperties}
            >
              Selamat datang di rumah digital
              <br />
              <strong>BEM FH UNNES 2026.</strong>
            </p>
            <p
              className="hero-description"
              data-motion-enter="up"
              style={{ "--enter-delay": "220ms" } as CSSProperties}
            >
              Menyalurkan aspirasi, membuka ruang bertumbuh, dan menggerakkan
              pengabdian bagi mahasiswa serta masyarakat.
            </p>
            <ul className="hero-principles" aria-label="Landasan gerak kabinet">
              {cabinetPrinciples.map((principle) => (
                <li key={principle.name}>{principle.name}</li>
              ))}
            </ul>
            <div
              className="hero-actions"
              data-motion-enter="up"
              style={{ "--enter-delay": "280ms" } as CSSProperties}
            >
              <Link
                className="portal-button button-maroon"
                href="/profil"
                data-pointer-label="Kenali"
              >
                Kenali kabinet <Icon name="arrow-up" />
              </Link>
              <Link
                className="portal-button button-outline"
                href="/profil#struktur-organisasi"
                data-pointer-label="Temui"
              >
                Temui kabinet <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div
            className="hero-photo-composition"
            data-motion-enter="right"
            style={{ "--enter-delay": "180ms" } as CSSProperties}
          >
            <GraphicAccent kind="arch" className="hero-red-arch" />
            <figure className="cabinet-photo-card">
              <div className="cabinet-photo-top">
                <span>BEM FH UNNES</span>
                <span>2026 ↗</span>
              </div>
              <Image
                src={cabinetPhoto.src}
                width={cabinetPhoto.width}
                height={cabinetPhoto.height}
                alt={cabinetPhoto.alt}
                priority
                sizes="(max-width: 680px) 90vw, (max-width: 1000px) 46vw, 540px"
              />
              <figcaption>
                <strong>
                  Satu kabinet,
                  <br />
                  banyak cerita.
                </strong>
                <span>
                  LAKSANA
                  <br />
                  ADHIKARA ✦
                </span>
              </figcaption>
            </figure>
            <div className="hero-logo-seal">
              <Image
                src="/images/logo-kabinet-laksana-adhikara.webp"
                width={68}
                height={100}
                alt="Logo Kabinet Laksana Adhikara"
                sizes="68px"
              />
            </div>
            <span className="hero-photo-sticker">
              Asa. Karsa. Karya. <span aria-hidden="true">✦</span>
            </span>
            <DoodleArrow
              className="hero-photo-note"
              label="kenalan sama kami, yuk!"
            />
          </div>
        </div>
        <div className="hero-bottom portal-container">
          <span>
            Badan Eksekutif Mahasiswa
            <br />
            Fakultas Hukum Universitas Negeri Semarang
          </span>
          <a href="#ruang-kita" className="scroll-cue">
            Kenali ruang kita <span>↓</span>
          </a>
        </div>
      </section>
      <div className="identity-strip" aria-hidden="true">
        <div className="identity-strip-track">
          {[0, 1].map((copy) => (
            <div className="identity-strip-group" key={copy}>
              <span>SUARA JUANG</span>
              <i>✦</i>
              <span>SATU LANGKAH BERSAMA</span>
              <i>✦</i>
              <span>LAKSANA ADHIKARA</span>
              <i>✦</i>
              <span>BEM FH UNNES 2026</span>
              <i>✦</i>
            </div>
          ))}
        </div>
      </div>
      <PhotoCarousel />
      <section
        id="ruang-kita"
        className="portal-section portal-container home-spaces"
        aria-labelledby="spaces-title"
      >
        <span className="curve-edge curve-edge--spaces" aria-hidden="true">
          <GraphicAccent kind="ribbon" className="spaces-edge-ribbon" />
        </span>
        <div className="portal-section-heading" data-reveal="left">
          <div>
            <span className="portal-eyebrow">
              Dekat dengan yang kamu butuhkan
            </span>
            <h2 id="spaces-title">
              Ruang kita.
              <br />
              <em>Untuk kamu.</em>
            </h2>
          </div>
          <p>
            Informasi, dukungan, dan kesempatan.
            <br />
            Temukan pintu yang tepat untuk
            <br />
            langkahmu selanjutnya.
          </p>
        </div>
        <div className="spaces-grid" data-reveal-group>
          {spaces.map((space, index) => (
            <Link
              className={`space-card space-card-${index + 1}`}
              href={space.href}
              key={space.title}
              data-reveal="pop"
              data-pointer-label="Jelajahi"
            >
              <div className="space-card-top">
                <span>0{index + 1}</span>
                <Icon name="arrow-up" />
              </div>
              <div className="space-icon">
                <Icon name={space.icon} />
              </div>
              <h3>{space.title}</h3>
              <p>{space.description}</p>
              <span className="space-card-action">
                {space.action}
                <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
        <DoodleArrow className="spaces-doodle" label="pilih ruangmu" />
      </section>
      <section
        className="home-profile portal-section"
        aria-labelledby="profile-heading"
      >
        <span
          className="curve-edge curve-edge--home-profile"
          aria-hidden="true"
        >
          <GraphicAccent kind="ribbon" className="home-profile-edge-ribbon" />
        </span>
        <div className="portal-container home-profile-inner">
          <figure className="together-photo motion-picture" data-reveal="image">
            <Image
              src={homePhotos.story.src}
              width={homePhotos.story.width}
              height={homePhotos.story.height}
              alt={homePhotos.story.alt}
              sizes="(max-width: 680px) 90vw, 50vw"
            />
            <figcaption>
              <span>CERITA KITA</span>
              <strong>
                Bukan sekadar nama.
                <br />
                Ada kita di dalamnya.
              </strong>
            </figcaption>
            <span className="together-photo-star" aria-hidden="true">
              ✦
            </span>
          </figure>
          <div className="home-profile-copy" data-reveal="right">
            <DoodleArrow className="profile-doodle" />
            <span className="portal-eyebrow">
              Dari, oleh, dan untuk mahasiswa
            </span>
            <h2 id="profile-heading">
              Hadir untuk
              <br />
              <em>kamu.</em>
            </h2>
            <p>{cabinetIntroduction}</p>
            <p>
              Laksana Adhikara menyatukan asa dan karsa dalam perbuatan nyata.
              Kami membawa semangat adaptif, profesional, dan akuntabel untuk
              menjadi katalisator positif di kampus dan masyarakat.
            </p>
            <Link
              href="/profil"
              className="portal-button button-maroon"
              data-pointer-label="Kenali"
            >
              Tentang kabinet <Icon name="arrow-up" />
            </Link>
            <a
              href="https://www.youtube.com/@BEMFHUNNES26"
              className="profile-video-link"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <Icon name="play" />
              </span>
              Jelajahi kanal YouTube kami
              <Icon name="arrow-up" />
            </a>
          </div>
        </div>
      </section>
      <section
        className="home-directions portal-section portal-container"
        aria-labelledby="directions-heading"
      >
        <div className="portal-section-heading" data-reveal="left">
          <div>
            <span className="portal-eyebrow">Komitmen Laksana Adhikara</span>
            <h2 id="directions-heading">
              Empat arah.
              <br />
              <em>Satu langkah.</em>
            </h2>
          </div>
          <div className="home-directions-intro">
            <p>
              Tata kelola, harmoni, jejaring, dan keberpihakan. Inilah arah yang
              menuntun langkah kami.
            </p>
            <Link
              className="portal-text-link"
              href="/profil#arah-gerak"
              data-pointer-label="Kenali arah kami"
            >
              Kenali visi dan misi <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="home-direction-grid" data-reveal-group>
          {cabinetMissions.map((mission, index) => (
            <article
              className="home-direction"
              key={mission.title}
              data-reveal="up"
            >
              <span className="home-direction-number">0{index + 1}</span>
              <h3>{mission.title}</h3>
              <p>{mission.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <LatestArticles />
      <section
        className="home-collab portal-container"
        aria-labelledby="collab-heading"
        data-reveal="pop"
      >
        <GraphicAccent kind="loop" className="collab-loop" />
        <div className="collab-copy">
          <span className="portal-eyebrow">Lebih jauh, bersama.</span>
          <h2 id="collab-heading">
            Punya ide baik?
            <br />
            <em>Mari wujudkan.</em>
          </h2>
          <p>
            Kami terbuka untuk bertukar gagasan, membangun jejaring, dan
            menghadirkan kolaborasi yang bermakna.
          </p>
          <Link
            href="/eksternal"
            className="portal-button button-gold"
            data-pointer-label="Kolaborasi"
          >
            Ruang kolaborasi <Icon name="arrow-up" />
          </Link>
        </div>
        <div className="collab-photo motion-picture">
          <Image
            src={homePhotos.collaboration.src}
            width={homePhotos.collaboration.width}
            height={homePhotos.collaboration.height}
            alt={homePhotos.collaboration.alt}
            sizes="(max-width: 680px) 90vw, 45vw"
          />
          <span>
            TERHUBUNG.
            <br />
            BERTUMBUH.
          </span>
        </div>
      </section>
    </SiteShell>
  );
}
