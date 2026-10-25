"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "./AdminShell";
import Icon from "./Icon";
import { api } from "../lib/api";
import {
  articleStatusLabels,
  isArticleSection,
  sectionDefinitions,
} from "../lib/sections";
import type {
  Article,
  ArticlePage,
  ArticleSection,
  ArticleStatus,
} from "../lib/types";

const statusFilters: (ArticleStatus | "all")[] = [
  "all",
  "pending",
  "published",
  "inactive",
];

export default function AdminArticleList({
  section,
}: {
  section: ArticleSection;
}) {
  if (!isArticleSection(section)) notFound();
  return <SectionManagement key={section} section={section} />;
}

function SectionManagement({ section }: { section: ArticleSection }) {
  const definition = sectionDefinitions[section];
  const [status, setStatus] = useState<ArticleStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<
    ArticlePage["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    const query = new URLSearchParams({
      section,
      page: String(page),
      pageSize: "12",
    });
    if (status !== "all") query.set("status", status);
    api<ArticlePage>(`/api/admin/articles?${query}`)
      .then((result) => {
        if (!active) return;
        if (result.data.some((article) => article.section !== section))
          throw new Error(
            "Daftar artikel tidak sesuai dengan halaman pengelolaan.",
          );
        if (
          result.pagination.totalPages > 0 &&
          page > result.pagination.totalPages
        ) {
          setPage(result.pagination.totalPages);
          return;
        }
        setItems(result.data);
        setPagination(result.pagination);
      })
      .catch((err) => {
        if (active)
          setError(
            err instanceof Error ? err.message : "Artikel belum dapat dimuat.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [section, status, page, retry]);

  function changeStatus(next: ArticleStatus | "all") {
    setStatus(next);
    setPage(1);
  }

  return (
    <AdminShell>
      <section
        className={`admin-content section-management-page section-page--${section}`}
        aria-labelledby="section-management-title"
      >
        <header className="section-management-header">
          <div>
            <div className="section-management-kicker">
              <span className="section-identity-icon">
                <Icon name={definition.icon} />
              </span>
              <span className="eyebrow">{definition.managementLabel}</span>
            </div>
            <h1 id="section-management-title">{definition.label}</h1>
            <p className="muted">{definition.managementDescription}</p>
          </div>
          <div className="section-management-actions">
            <Link className="btn btn-primary" href={`/admin/${section}/new`}>
              + Artikel {definition.label.toLowerCase()}
            </Link>
            <Link className="section-admin-public-link" href={`/${section}`}>
              Lihat halaman publik <Icon name="arrow-up" />
            </Link>
          </div>
        </header>

        <div className="section-management-toolbar">
          <div
            className="section-status-filters"
            role="group"
            aria-label={`Status artikel ${definition.label}`}
          >
            {statusFilters.map((value) => (
              <button
                key={value}
                className={`btn${status === value ? " is-selected" : ""}`}
                type="button"
                aria-pressed={status === value}
                onClick={() => changeStatus(value)}
              >
                {value === "all" ? "Semua status" : articleStatusLabels[value]}
              </button>
            ))}
          </div>
          <span className="section-admin-result-count" role="status">
            {loading
              ? "Memuat artikel…"
              : error
                ? ""
                : `${pagination?.total || 0} artikel ${definition.label.toLowerCase()}`}
          </span>
        </div>

        {error ? (
          <div className="section-admin-state section-admin-error" role="alert">
            <h2>Artikel belum dapat dimuat.</h2>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setRetry((value) => value + 1)}
            >
              Coba lagi
            </button>
          </div>
        ) : (
          <div className="table-wrap" aria-busy={loading}>
            <table className="table">
              <caption className="portal-sr-only">
                Daftar artikel {definition.label}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Artikel {definition.label}</th>
                  <th scope="col">Status</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3}>
                      <div className="section-admin-loading" role="status">
                        <span className="admin-spinner" aria-hidden="true" />
                        Memuat artikel {definition.label.toLowerCase()}…
                      </div>
                    </td>
                  </tr>
                ) : items.length ? (
                  items.map((article) => (
                    <tr key={article.id}>
                      <td>
                        <strong>{article.title}</strong>
                        <br />
                        <span className="muted">{article.description}</span>
                      </td>
                      <td>
                        <span className={`status ${article.status}`}>
                          {articleStatusLabels[article.status]}
                        </span>
                      </td>
                      <td>
                        <Link
                          className="section-edit-link"
                          href={`/admin/${section}/${article.id}/edit`}
                        >
                          Edit
                          <span className="portal-sr-only">
                            {" "}
                            {article.title}
                          </span>
                          <Icon name="arrow-up" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="section-admin-empty">
                        <strong>
                          Belum ada artikel {definition.label.toLowerCase()}
                          {status === "all"
                            ? "."
                            : ` dengan status ${articleStatusLabels[status].toLowerCase()}.`}
                        </strong>
                        <p>
                          {status === "all"
                            ? "Mulai dengan membuat artikel pertama untuk halaman ini."
                            : "Pilih status lain untuk melihat artikel pada halaman ini."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && pagination && pagination.totalPages > 1 && (
          <nav
            className="section-admin-pagination"
            aria-label={`Halaman pengelolaan ${definition.label}`}
          >
            <button
              className="btn"
              type="button"
              disabled={page === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              ← Sebelumnya
            </button>
            <span>
              Halaman {page} dari {pagination.totalPages}
            </span>
            <button
              className="btn"
              type="button"
              disabled={page >= pagination.totalPages}
              onClick={() =>
                setPage((value) => Math.min(pagination.totalPages, value + 1))
              }
            >
              Berikutnya →
            </button>
          </nav>
        )}
      </section>
    </AdminShell>
  );
}
