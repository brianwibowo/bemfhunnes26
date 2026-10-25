"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      await login(email.trim(), password);
      router.replace("/admin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login gagal. Silakan coba lagi.",
      );
      setSaving(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-identity" aria-label="BEM FH UNNES 2026">
        <Link
          className="admin-brand"
          href="/beranda"
          aria-label="BEM FH UNNES, kembali ke beranda"
        >
          <img src="/images/logo-bem.webp" alt="" width={48} height={48} />
          <span>
            <strong>BEM FH UNNES</strong>
            <small>KABINET LAKSANA ADHIKARA 2026</small>
          </span>
        </Link>
        <div className="login-identity-art" aria-hidden="true">
          <span className="login-orbit login-orbit-one" />
          <span className="login-orbit login-orbit-two" />
          <img
            src="/images/logo-kabinet-laksana-adhikara.webp"
            alt=""
            width={260}
            height={280}
          />
        </div>
        <div className="login-identity-copy">
          <span className="admin-kicker">Ruang pengelola</span>
          <h2>
            Setiap kabar,
            <br />
            punya peran.
          </h2>
          <p>
            Ruang untuk merawat informasi, membagikan cerita, dan menghubungkan
            keluarga FH UNNES.
          </p>
        </div>
        <span className="login-identity-year">
          BEM FH UNNES <span>2026</span>
        </span>
      </section>

      <section className="login-main" aria-labelledby="login-heading">
        <Link className="login-back" href="/beranda">
          <span aria-hidden="true">←</span> Kembali ke website
        </Link>
        <div className="login-form-wrap">
          <span className="admin-kicker">Halo, pengelola!</span>
          <h1 id="login-heading">
            Selamat datang
            <br />
            kembali.
          </h1>
          <p className="login-description">
            Masuk untuk mengelola artikel dan informasi BEM FH UNNES.
          </p>
          <form
            className="form login-form"
            onSubmit={submit}
            aria-busy={saving}
          >
            <label htmlFor="admin-email">
              Email
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="nama@bemfh.unnes.ac.id"
                disabled={saving}
                aria-describedby={error ? "login-error" : undefined}
              />
            </label>
            <label htmlFor="admin-password">Password</label>
            <div className="login-password">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Masukkan password"
                disabled={saving}
                aria-describedby={error ? "login-error" : undefined}
              />
              <button
                className="login-password-toggle"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-pressed={showPassword}
                aria-controls="admin-password"
                disabled={saving}
              >
                {showPassword ? "Sembunyikan" : "Lihat"}
              </button>
            </div>
            {error && (
              <p className="login-error" id="login-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="btn btn-primary login-submit"
              type="submit"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="admin-spinner" aria-hidden="true" />{" "}
                  Memeriksa akun…
                </>
              ) : (
                <>
                  Masuk ke dashboard <span aria-hidden="true">↗</span>
                </>
              )}
            </button>
          </form>
          <p className="login-help">
            Akses khusus pengelola. Hubungi administrator jika membutuhkan
            bantuan akun.
          </p>
        </div>
        <p className="login-bottom">
          BEM Fakultas Hukum Universitas Negeri Semarang
        </p>
      </section>
    </main>
  );
}
