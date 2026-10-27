"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "./AdminShell";
import Icon from "./Icon";
import { adminInsights } from "../lib/api";
import { articleSections, sectionDefinitions } from "../lib/sections";
import type { ArticleSection, ArticleStatus } from "../lib/types";

type SectionCount = {
  section: ArticleSection;
  status: ArticleStatus;
  count: number;
};

export default function AdminDashboard() {
  const [counts, setCounts] = useState<SectionCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    adminInsights()
      .then((result) => {
        if (active) setCounts(result.counts);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [retry]);

  function count(section: ArticleSection, status?: ArticleStatus) {
    if (loading || error) return "—";
    return counts
      .filter(
        (item) =>
          item.section === section && (!status || item.status === status),
      )
      .reduce((total, item) => total + item.count, 0);
  }

  return (
    <AdminShell>
      <section
        className="admin-content section-dashboard"
        aria-labelledby="management-dashboard-title"
      >
        <div className="eyebrow">Ruang pengelolaan</div>
        <h1 id="management-dashboard-title">Pilih halaman yang dikelola.</h1>
        <p className="muted">
          Kelola artikel Berita dan alur publikasinya dari satu tempat.
        </p>
        {loading && (
          <p className="section-admin-loading" role="status">
            <span className="admin-spinner" aria-hidden="true" />
            Memuat ringkasan halaman…
          </p>
        )}
        {error && (
          <div className="section-admin-state section-admin-error" role="alert">
            <h2>Ringkasan belum dapat dimuat.</h2>
            <p>
              Coba kembali atau langsung buka halaman pengelolaan yang
              dibutuhkan.
            </p>
            <button
              className="btn"
              type="button"
              onClick={() => setRetry((value) => value + 1)}
            >
              Coba lagi
            </button>
          </div>
        )}
        <div className="section-management-grid">
          {articleSections
            .filter((section) => section === "berita")
            .map((section) => {
              const definition = sectionDefinitions[section];
              return (
                <article
                  className={`admin-card section-management-card section-page--${section}`}
                  key={section}
                  aria-labelledby={`manage-${section}`}
                  aria-busy={loading}
                >
                  <div className="section-management-card-top">
                    <span className="section-identity-icon">
                      <Icon name={definition.icon} />
                    </span>
                    <span>HALAMAN {definition.label.toUpperCase()}</span>
                  </div>
                  <h2 id={`manage-${section}`}>{definition.label}</h2>
                  <p>{definition.managementDescription}</p>
                  <dl className="section-card-counts">
                    <div className="section-card-total">
                      <dt>Semua artikel</dt>
                      <dd>{count(section)}</dd>
                    </div>
                    <div className="section-card-pending">
                      <dt>Menunggu tinjauan</dt>
                      <dd>{count(section, "pending")}</dd>
                    </div>
                    <div>
                      <dt>Terbit</dt>
                      <dd>{count(section, "published")}</dd>
                    </div>
                    <div>
                      <dt>Nonaktif</dt>
                      <dd>{count(section, "inactive")}</dd>
                    </div>
                  </dl>
                  <Link
                    className="btn btn-primary section-card-manage"
                    href={`/admin/${section}`}
                  >
                    Kelola {definition.label}
                    <Icon name="arrow" />
                  </Link>
                  <Link
                    className="section-admin-public-link"
                    href={`/${section}`}
                  >
                    Lihat halaman publik
                    <Icon name="arrow-up" />
                  </Link>
                </article>
              );
            })}
        </div>
      </section>
    </AdminShell>
  );
}
