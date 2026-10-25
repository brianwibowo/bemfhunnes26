import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import CabinetArtwork from "../../components/CabinetArtwork";
import { GraphicAccent } from "../../components/GraphicAccent";
import Icon from "../../components/Icon";
import { organigram, profilePhotos } from "../../lib/photos";
import {
  cabinetIntroduction,
  cabinetMissions,
  cabinetPrinciples,
  cabinetValues,
  cabinetVision,
} from "../../lib/cabinet";

export const metadata: Metadata = {
  title: "Profil Kabinet | BEM FH UNNES 2026",
};
export default function Profile() {
  return (
    <SiteShell>
      <div className="cabinet-profile">
        <section className="profile-hero profile-hero--graphic portal-container">
          <div data-motion-enter="up">
            <span className="portal-kicker">
              BEM FH UNNES · Laksana Adhikara
            </span>
            <h1>
              Berpihak.
              <br />
              <em>Bergerak bersama.</em>
            </h1>
            <p className="portal-lead">{cabinetIntroduction}</p>
            <a
              href="#arah-gerak"
              className="portal-button button-maroon"
              data-pointer-label="Kenali kami"
            >
              Kenali arah gerak kami <Icon name="arrow" />
            </a>
          </div>
          <div className="profile-hero-emblem">
            <GraphicAccent kind="ribbon" className="profile-hero-ribbon" />
            <CabinetArtwork compact />
          </div>
        </section>
        <nav
          className="profile-subnav portal-container"
          aria-label="Jelajahi profil"
        >
          <a href="#arah-gerak">Visi &amp; misi</a>
          <a href="#budaya-kabinet">Nilai &amp; budaya</a>
          <a href="#nilai-kabinet">Makna nama</a>
          <a href="#struktur-organisasi">Struktur organisasi</a>
          <a href="#kajian">Ruang kajian</a>
        </nav>

        <section
          className="cabinet-introduction portal-section portal-container"
          aria-labelledby="cabinet-introduction-title"
        >
          <figure className="cabinet-photo-plate" data-reveal="image">
            <Image
              src={profilePhotos.studio.src}
              width={profilePhotos.studio.width}
              height={profilePhotos.studio.height}
              alt={profilePhotos.studio.alt}
              sizes="(max-width: 800px) 90vw, 52vw"
            />
            <figcaption>
              <span>LAKSANA ADHIKARA · 2026</span>
              <span>Dokumentasi kebersamaan pengurus.</span>
            </figcaption>
          </figure>
          <div className="cabinet-introduction-copy" data-reveal="right">
            <span className="portal-eyebrow">Dari, oleh, untuk mahasiswa</span>
            <h2
              id="cabinet-introduction-title"
              className="cabinet-section-title"
            >
              Bukan sekadar hadir.
              <br />
              <em>Ikut menggerakkan.</em>
            </h2>
            <p>
              Organisasi ini tumbuh dari kebutuhan untuk mewakili suara
              mahasiswa dan mempertemukannya dengan langkah bersama. Pembenahan
              tata kelola, harmoni antar-sivitas, serta keberpihakan pada
              persoalan nyata menjadi pijakan gerak kami.
            </p>
            <p>
              Kami memaknai pengabdian sebagai tanggung jawab untuk terus
              belajar, merawat jejaring, dan menjaga agar organisasi tetap
              relevan bagi mahasiswa maupun masyarakat.
            </p>
            <div className="cabinet-principle-line" aria-label="Landasan visi">
              {cabinetPrinciples.map((principle) => (
                <span key={principle.name}>{principle.name}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="arah-gerak"
          className="cabinet-direction portal-section"
          aria-labelledby="cabinet-direction-title"
        >
          <div className="portal-container">
            <div className="cabinet-section-heading" data-reveal="left">
              <div>
                <span className="portal-eyebrow">Visi &amp; misi</span>
                <h2
                  id="cabinet-direction-title"
                  className="cabinet-section-title"
                >
                  Langkah yang
                  <br />
                  <em>punya arah.</em>
                </h2>
              </div>
              <p>
                Satu visi sebagai kompas. Empat misi untuk menata cara kami
                bergerak bersama.
              </p>
            </div>
            <div className="cabinet-direction-grid">
              <blockquote className="cabinet-vision" data-reveal="left">
                <span className="cabinet-block-label">VISI KAMI</span>
                <p>{cabinetVision}</p>
                <footer>BEM FH UNNES 2026 · Laksana Adhikara</footer>
              </blockquote>
              <ol className="cabinet-missions" data-reveal-group>
                {cabinetMissions.map((mission, index) => (
                  <li
                    className="cabinet-mission"
                    key={mission.title}
                    data-reveal
                  >
                    <span className="cabinet-mission-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <h3>{mission.title}</h3>
                    <p>{mission.summary}</p>
                    <details>
                      <summary>
                        Baca rumusan misi <span aria-hidden="true">+</span>
                      </summary>
                      <p>{mission.statement}</p>
                    </details>
                  </li>
                ))}
              </ol>
            </div>
            <p className="cabinet-source-note">
              Visi dan misi dari Grand Design Organization BEM FH UNNES 2026.
            </p>
          </div>
        </section>

        <section
          id="budaya-kabinet"
          className="cabinet-culture portal-section portal-container"
          aria-labelledby="cabinet-culture-title"
        >
          <div className="cabinet-section-heading" data-reveal="left">
            <div>
              <span className="portal-eyebrow">
                Nilai &amp; budaya organisasi
              </span>
              <h2 id="cabinet-culture-title" className="cabinet-section-title">
                Cara bekerja.
                <br />
                <em>Cara saling menjaga.</em>
              </h2>
            </div>
            <p>
              Sepuluh pengingat yang menuntun sikap dan kerja kami sehari-hari.
              Buka setiap nilai untuk mengenalnya lebih dekat.
            </p>
          </div>
          <div className="cabinet-values-grid" data-reveal-group>
            {cabinetValues.map((value, index) => (
              <details
                className="cabinet-culture-value"
                key={value.name}
                data-reveal
              >
                <summary>
                  <span className="cabinet-value-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{value.name}</span>
                  <span className="cabinet-value-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{value.description}</p>
              </details>
            ))}
          </div>
          <div className="cabinet-harmony-panel">
            <div className="cabinet-harmony-copy" data-reveal="left">
              <span className="portal-eyebrow">Harmoni dalam keseharian</span>
              <h3>
                Saling menguatkan,
                <br />
                <em>tanpa menyeragamkan.</em>
              </h3>
              <p>
                Perbedaan karakter dan aspirasi adalah bagian dari ruang
                bersama. Harmoni tumbuh saat setiap orang dihargai, setiap upaya
                diakui, dan energi yang beragam bertemu pada tujuan yang sama.
              </p>
            </div>
            <figure className="cabinet-photo-plate" data-reveal="image">
              <Image
                src={profilePhotos.harmony.src}
                width={profilePhotos.harmony.width}
                height={profilePhotos.harmony.height}
                alt={profilePhotos.harmony.alt}
                sizes="(max-width: 800px) 90vw, 48vw"
              />
              <figcaption>
                <span>RUANG KEBERSAMAAN</span>
                <span>Dokumentasi kebersamaan di lapangan.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="nilai-kabinet"
          className="cabinet-philosophy portal-section portal-container"
          aria-labelledby="cabinet-philosophy-title"
        >
          <div className="portal-section-heading" data-reveal="left">
            <div>
              <span className="portal-eyebrow">Yang menyatukan kita</span>
              <h2 id="cabinet-philosophy-title">
                Bergerak dengan
                <br />
                <em>makna.</em>
              </h2>
            </div>
            <p>
              Dua diksi yang saling melengkapi. Menjadi pengingat bahwa niat
              baik perlu diwujudkan, dan setiap perbuatan perlu memiliki arah.
            </p>
          </div>
          <div className="value-grid" data-reveal-group>
            {[
              [
                "01",
                "Laksana",
                "Sifat yang terjaga, perbuatan yang nyata, dan tingkah laku yang meninggalkan jejak. Bagi kami, asa perlu diwujudkan melalui langkah yang bermakna.",
              ],
              [
                "02",
                "Adhikara",
                "Kewibawaan yang tumbuh dari kebijaksanaan. Bukan hanya keberanian bersuara, tetapi juga ketenangan dan keteguhan ketika menghadapi rintangan.",
              ],
              [
                "03",
                "Satu kesatuan",
                "Asa dan karsa yang bergerak menuju cita. Perbuatan yang dituntun kebijaksanaan, sekaligus doa yang terus kami langitkan dalam perjalanan bersama.",
              ],
            ].map(([num, title, copy]) => (
              <article className="value-card" key={num} data-reveal="pop">
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className="philosophy-source">
            Makna nama dari Grand Design Organization BEM FH UNNES 2026.
          </p>
          <blockquote className="cabinet-manifesto" data-reveal="pop">
            <span className="portal-eyebrow">
              Asa dan karsa, dalam satu nama.
            </span>
            <p>
              Perbuatan yang nyata.
              <br />
              <em>Kebijaksanaan yang menjaga.</em>
            </p>
            <footer>
              LAKSANA ADHIKARA <span aria-hidden="true">✦</span>
            </footer>
          </blockquote>
        </section>
        <section
          id="struktur-organisasi"
          className="structure-section portal-section"
        >
          <div className="portal-container structure-inner">
            <div data-reveal="left">
              <span className="portal-eyebrow">Orang-orang di balik gerak</span>
              <h2>
                Saling mengisi.
                <br />
                <em>Saling menguatkan.</em>
              </h2>
              <p>
                Kenali susunan kerja yang menghubungkan setiap bagian Kabinet
                Laksana Adhikara. Saling mengisi peran, menyatukan langkah.
              </p>
              <span className="portal-kicker">
                Struktur organisasi · {organigram.status}
              </span>
              <p className="structure-note">
                Organigram ini masih dalam proses penyempurnaan dan akan
                diperbarui mengikuti susunan terbaru.
              </p>
              <a
                href={organigram.src}
                target="_blank"
                rel="noreferrer"
                className="portal-button button-maroon"
              >
                Buka ukuran penuh <Icon name="arrow-up" />
              </a>
              <details className="structure-text">
                <summary>Lihat susunan dalam teks</summary>
                <ul>
                  <li>Presiden &amp; Wakil Presiden</li>
                  <li>Manajemen Internal Organisasi (MIO)</li>
                  <li>Kantor Media Informasi</li>
                  <li>
                    Sekretaris Kabinet: Biro Administrasi dan Biro Keuangan
                  </li>
                  <li>
                    Kementerian Koordinator Internal: Kementerian Dalam Negeri;
                    Kaderisasi &amp; Pengembangan Sumber Daya Mahasiswa; Seni,
                    Olahraga, &amp; Budaya
                  </li>
                  <li>
                    Kementerian Koordinator Sosial, Hukum, &amp; Politik:
                    Kementerian Kajian Aksi Propaganda; Advokasi Kesejahteraan
                    Mahasiswa; Sosial Masyarakat
                  </li>
                  <li>
                    Kementerian Koordinator Eksternal: Kementerian Hubungan Luar
                    dan Ekonomi Kreatif
                  </li>
                </ul>
              </details>
            </div>
            <a
              href={organigram.src}
              target="_blank"
              rel="noreferrer"
              className="organigram-frame"
              aria-label="Buka organigram BEM FH UNNES 2026 ukuran penuh, tab baru"
              data-reveal="image"
            >
              <Image
                src={organigram.src}
                width={organigram.width}
                height={organigram.height}
                alt={organigram.alt}
                sizes="(max-width: 900px) 90vw, 520px"
              />
              <span>
                Lihat lebih dekat <Icon name="arrow-up" />
              </span>
            </a>
          </div>
        </section>
        <section
          id="kajian"
          className="portal-section portal-container kajian-section"
          data-reveal
        >
          <div>
            <span className="portal-eyebrow">Ruang bertukar gagasan</span>
            <h2>
              Membaca isu.
              <br />
              <em>Merawat nalar.</em>
            </h2>
          </div>
          <div>
            <p>
              Kajian menjadi cara membaca persoalan secara kritis dan rasional.
              Isu hukum, lingkungan hidup, serta kesejahteraan mahasiswa menjadi
              bagian dari percakapan yang dirawat dalam grand design kami.
            </p>
            <p>
              Ikuti publikasi dan perspektif terbaru melalui rubrik berita BEM
              FH UNNES.
            </p>
            <Link href="/berita" className="portal-button button-maroon">
              Jelajahi publikasi <Icon name="arrow-up" />
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
