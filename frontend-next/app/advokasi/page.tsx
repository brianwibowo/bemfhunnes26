import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../../components/SiteShell";
import { advocacyFeatures } from "../../lib/advokasi";

export const metadata: Metadata = {
  title: "Advokasi | BEM FH UNNES 2026",
};

export default function Advokasi() {
  return (
    <SiteShell>
      <div className="service-page adkesma-page">
        <section className="service-page-hero" data-reveal="up">
          <div className="service-container">
            <p className="service-eyebrow">Ruang advokasi mahasiswa</p>
            <h1>
              <span>SIAP.</span>
              <br />
              Sistem Informasi Advokasi Pintar
            </h1>
            <p className="service-lead">
              Kanal penyatuan seluruh informasi Fakultas Hukum Universitas
              Negeri Semarang terkait akademik, sarana dan prasarana,
              penyuratan, kesejahteraan, dan kebutuhan mahasiswa lainnya.
            </p>
            <div className="service-actions">
              <Link
                className="service-button service-button-primary"
                href="#fitur"
              >
                Lihat semua fitur
              </Link>
              <a
                className="service-button service-button-secondary"
                href="https://www.instagram.com/adkesmabemfhunnes/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram Adkesma
              </a>
            </div>
          </div>
        </section>
        <section id="fitur" className="service-section" data-reveal="up">
          <div className="service-container">
            <div className="service-section-heading">
              <div>
                <p className="service-eyebrow">Pusat layanan Advokasi</p>
                <h2>Temukan pintu bantuanmu.</h2>
              </div>
              <p>
                Pilih fitur yang sesuai dengan kebutuhanmu. Setiap kartu akan
                mengarahkanmu ke kanal resmi pengelola.
              </p>
            </div>
            <div className="adkesma-grid" data-reveal-group>
              {advocacyFeatures.map((feature, i) => (
                <article
                  className="adkesma-card card-clickable"
                  id={feature.id}
                  key={feature.id}
                  data-reveal="pop"
                >
                  <span className="service-card-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <a
                    className="card-primary-link"
                    href={feature.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {feature.action} <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
