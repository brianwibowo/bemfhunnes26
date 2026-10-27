import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Icon from "./Icon";
import { navigation, socialLinks } from "../lib/site";
import ScrollReveal from "./ScrollReveal";
import ContextPointer from "./ContextPointer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-site">
      <a className="skip-link" href="#main-content">
        Langsung ke konten
      </a>
      <SiteHeader />
      <main id="main-content">
        <ScrollReveal>{children}</ScrollReveal>
      </main>
      <footer id="hubungi-kami" className="portal-footer">
        <div className="portal-container">
          <div className="footer-topline">
            <span className="portal-eyebrow">
              Bertemu, bercerita, berkolaborasi.
            </span>
            <a
              href="https://wa.me/6288200557365"
              className="portal-button button-gold"
              target="_blank"
              rel="noreferrer"
              data-pointer-label="Sapa kami"
            >
              Sapa kami <Icon name="arrow-up" />
            </a>
          </div>
          <div className="footer-heading">
            <h2>
              Mari bergerak
              <br />
              <em>bersama.</em>
            </h2>
            <img
              src="/images/logo-kabinet-laksana-adhikara.webp"
              width="140"
              height="205"
              alt="Logo Kabinet Laksana Adhikara"
              loading="lazy"
            />
          </div>
          <div className="footer-info">
            <div className="footer-address">
              <strong>BEM FH UNNES 2026</strong>
              <p>
                Kabinet Laksana Adhikara
                <br />
                Fakultas Hukum
                <br />
                Universitas Negeri Semarang
              </p>
              <span>
                <Icon name="pin" /> Semarang, Jawa Tengah
              </span>
            </div>
            <div>
              <h3>Jelajahi</h3>
              <nav aria-label="Navigasi footer">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3>Tetap terhubung</h3>
              <nav aria-label="Media sosial">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                    <Icon name="arrow-up" />
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="footer-bottomline">
            <span>BEM FH UNNES 2026 – By Kantor Media Informasi</span>
            <Link href="/admin/login">
              Ruang pengelola <Icon name="arrow-up" />
            </Link>
          </div>
        </div>
      </footer>
      <ContextPointer />
    </div>
  );
}
