import Link from "next/link";
import SiteShell from "../components/SiteShell";
import Icon from "../components/Icon";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="portal-section article-status-page">
        <div className="portal-container portal-state">
          <span className="portal-state-symbol" aria-hidden="true">
            404
          </span>
          <span className="portal-eyebrow">Halaman tidak ditemukan</span>
          <h1>Yuk, kembali ke ruang kita.</h1>
          <p>
            Alamat ini belum tersedia. Temukan informasi, dukungan, dan cerita
            terbaru dari beranda BEM FH UNNES.
          </p>
          <Link className="portal-button button-maroon" href="/beranda">
            Kembali ke beranda <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
