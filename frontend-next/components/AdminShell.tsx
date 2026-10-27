"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { API_URL, logout, getUser } from "../lib/api";
import { labels, type User } from "../lib/types";

function NavigationIcon({ kind }: { kind: string }) {
  const paths: Record<string, React.ReactNode> = {
    beranda: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    kemahasiswaan: (
      <>
        <path d="m2 8 10-5 10 5-10 5L2 8Z" />
        <path d="M6 10v7c4 3 8 3 12 0v-7M22 8v8" />
      </>
    ),
    eksternal: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" />
      </>
    ),
    berita: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h3M8 18h8" />
      </>
    ),
  };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind] || paths.beranda}
    </svg>
  );
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<"checking" | "ready" | "error">(
    "checking",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [validationKey, setValidationKey] = useState(0);
  const navigationRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    async function validateSession() {
      setSession("checking");
      const token = localStorage.getItem("bemfh_token");
      const cachedUser = getUser();
      if (!token) {
        logout();
        router.replace("/admin/login");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: controller.signal,
        });
        if (!active) return;
        if (response.status === 401 || response.status === 403) {
          logout();
          router.replace("/admin/login");
          return;
        }
        if (!response.ok) throw new Error("Sesi belum dapat diperiksa.");
        const data = (await response.json()) as {
          user?: Partial<User> & { sub?: number | string };
        };
        const identity = data.user;
        if (
          !identity ||
          typeof identity.email !== "string" ||
          !["admin", "superadmin"].includes(identity.role || "")
        ) {
          logout();
          router.replace("/admin/login");
          return;
        }
        const verifiedUser: User = {
          id: Number(identity.id ?? identity.sub ?? cachedUser?.id ?? 0),
          email: identity.email,
          role: identity.role as User["role"],
        };
        if (!active) return;
        localStorage.setItem("bemfh_user", JSON.stringify(verifiedUser));
        setUser(verifiedUser);
        setSession("ready");
      } catch {
        if (active && !controller.signal.aborted) setSession("error");
      }
    }
    void validateSession();
    return () => {
      active = false;
      controller.abort();
    };
  }, [router, validationKey]);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);
  useEffect(() => {
    if (!menuOpen) return;
    const mobile = window.matchMedia("(max-width: 800px)");
    if (!mobile.matches) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    navigationRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab") return;
      const controls = navigationRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    function closeOnResize() {
      if (!mobile.matches) setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyboard);
    mobile.addEventListener("change", closeOnResize);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyboard);
      mobile.removeEventListener("change", closeOnResize);
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  function exit() {
    setSession("checking");
    logout();
    router.replace("/admin/login");
  }

  const currentSection =
    Object.entries(labels).find(([key]) =>
      path?.startsWith(`/admin/${key}`),
    )?.[1] || "Beranda";

  if (session !== "ready") {
    return (
      <main className="admin-session-page">
        <section
          className="admin-session-card"
          aria-live="polite"
          aria-busy={session === "checking"}
        >
          <img
            src="/images/logo-bem.webp"
            alt="BEM FH UNNES"
            width={64}
            height={64}
          />
          {session === "checking" ? (
            <>
              <span className="admin-spinner" aria-hidden="true" />
              <h1>Memeriksa sesi…</h1>
              <p>Menyiapkan ruang pengelola Anda.</p>
            </>
          ) : (
            <>
              <h1>Belum dapat terhubung.</h1>
              <p>Periksa koneksi internet, lalu coba kembali.</p>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setValidationKey((value) => value + 1)}
              >
                Coba lagi
              </button>
              <Link href="/beranda">Kembali ke website</Link>
            </>
          )}
        </section>
      </main>
    );
  }

  return (
    <div className={`admin-shell${menuOpen ? " admin-menu-open" : ""}`}>
      <a className="admin-skip" href="#admin-main-content">
        Lewati ke konten
      </a>
      {menuOpen && (
        <button
          className="admin-menu-overlay"
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Tutup navigasi"
        />
      )}
      <aside className="admin-side" id="admin-navigation" ref={navigationRef}>
        <button
          className="admin-drawer-close"
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Tutup navigasi"
        >
          ×
        </button>
        <Link
          className="admin-brand"
          href="/admin"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/images/logo-bem.webp" alt="" width={44} height={44} />
          <span>
            <strong>BEM FH UNNES</strong>
            <small>LAKSANA ADHIKARA 2026</small>
          </span>
        </Link>
        <div className="admin-side-label">Ruang pengelola</div>
        <nav aria-label="Navigasi pengelola">
          <Link
            className={path === "/admin" ? "active" : ""}
            href="/admin"
            aria-current={path === "/admin" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <NavigationIcon kind="beranda" />
            <span>Beranda</span>
            <span className="admin-nav-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
          {Object.entries(labels)
            .filter(([key]) => key === "berita")
            .map(([key, label]) => {
              const selected = path?.startsWith(`/admin/${key}`);
              return (
                <Link
                  key={key}
                  className={selected ? "active" : ""}
                  href={`/admin/${key}`}
                  aria-current={selected ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <NavigationIcon kind={key} />
                  <span>{label}</span>
                  <span className="admin-nav-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              );
            })}
        </nav>
        <div className="admin-side-note">
          <img
            src="/images/logo-kabinet-laksana-adhikara.webp"
            alt=""
            width={72}
            height={72}
          />
          <p>
            Merawat cerita.
            <br />
            Menghubungkan keluarga.
          </p>
        </div>
        <div className="admin-side-bottom">
          <Link href="/beranda">
            Lihat website <span aria-hidden="true">↗</span>
          </Link>
          <button type="button" onClick={exit}>
            <span aria-hidden="true">↪</span> Keluar dari akun
          </button>
        </div>
      </aside>
      <main className="admin-main" id="admin-main-content" tabIndex={-1}>
        <header className="admin-top">
          <div className="admin-top-title">
            <button
              className="admin-menu-toggle"
              ref={toggleRef}
              type="button"
              aria-controls="admin-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path
                  d={
                    menuOpen
                      ? "m6 6 12 12M6 18 18 6"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
            <div>
              <span className="admin-kicker">Panel admin</span>
              <p>{currentSection}</p>
            </div>
          </div>
          <div className="admin-account">
            <span className="admin-avatar" aria-hidden="true">
              {user?.email.charAt(0).toUpperCase() || "A"}
            </span>
            <div>
              <strong>
                {user?.role === "superadmin" ? "Superadmin" : "Administrator"}
              </strong>
              <span>{user?.email}</span>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
