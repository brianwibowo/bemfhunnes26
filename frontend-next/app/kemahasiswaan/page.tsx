import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Kemahasiswaan | BEM FH UNNES 2026",
};

const features = [
  [
    "Audiensi",
    "Forum dialog strategis untuk menyampaikan aspirasi, memperjuangkan kepentingan, dan membangun komunikasi konstruktif.",
    "https://wa.me/6288362552052",
    "Hubungi untuk audiensi",
  ],
  [
    "Advocare",
    "Mitigasi dan pengawasan sarana prasarana melalui penyisiran fasilitas, pencatatan temuan, dan tindak lanjut bersama fakultas.",
    "https://wa.me/62895621134547",
    "Hubungi Advocare",
  ],
  [
    "Banding UKT",
    "Pendampingan penetapan ulang dan angsuran UKT bersama pimpinan fakultas setiap semester.",
    "https://drive.google.com/drive/folders/1q0kbYfpAhFR6pjsnhl68uIEJFeBv0JRO?usp=sharing",
    "Lihat informasi Banding UKT",
  ],
  [
    "Saluran Adkesma",
    "Saluran WhatsApp terpusat untuk informasi akademik, keuangan, fasilitas, kebijakan, dan isu kemahasiswaan.",
    "https://whatsapp.com/channel/0029VbBuCS17dmeU31Ss3p1K",
    "Buka Saluran Adkesma",
  ],
  [
    "Lini Beasiswa",
    "Informasi akurat dan terkini tentang peluang beasiswa, persyaratan, mekanisme pendaftaran, dan jadwal pelaksanaan.",
    "https://wa.me/628994183019",
    "Tanya beasiswa",
  ],
  [
    "Klinik Adkesma",
    "Ruang aman untuk pengaduan, pendampingan, dan aspirasi dengan prinsip kerahasiaan, empati, dan profesionalitas.",
    "https://forms.gle/grUeQ8DD1fYo6ELg9",
    "Isi formulir Klinik Adkesma",
  ],
  [
    "JustiFound",
    "Ruang pelaporan dan penemuan kembali barang hilang di lingkungan Fakultas Hukum UNNES.",
    "https://forms.gle/nZZBnWcTMjHqyGyb7",
    "Laporkan barang",
  ],
  [
    "Beasiswa Maroon",
    "Dukungan untuk meringankan beban UKT melalui gotong royong mahasiswa, masyarakat, alumni, dan sponsor.",
    "https://drive.google.com/drive/folders/1q_fJqbP4MCdpECoK0yuuAHTueYzmihUd?usp=sharing",
    "Lihat informasi beasiswa",
  ],
];

export default function Kemahasiswaan() {
  return (
    <SiteShell>
      <div className="service-page adkesma-page">
        <section className="service-page-hero" data-reveal="up">
          <div className="service-container">
            <p className="service-eyebrow">Ruang untuk mahasiswa</p>
            <h1>
              <span>SIAP.</span>
              <br />
              Sistem Informasi Adkesma Pintar
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
                <p className="service-eyebrow">Pusat layanan Adkesma</p>
                <h2>Temukan pintu bantuanmu.</h2>
              </div>
              <p>
                Pilih fitur yang sesuai dengan kebutuhanmu. Setiap kartu akan
                mengarahkanmu ke kanal resmi pengelola.
              </p>
            </div>
            <div className="adkesma-grid" data-reveal-group>
              {features.map(([title, text, href, action], i) => (
                <article
                  className="adkesma-card card-clickable"
                  id={title === "Lini Beasiswa" ? "beasiswa" : undefined}
                  key={title}
                  data-reveal="pop"
                >
                  <span className="service-card-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a
                    className="card-primary-link"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {action} <span aria-hidden="true">→</span>
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
