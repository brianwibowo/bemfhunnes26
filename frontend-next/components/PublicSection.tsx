"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCards } from "./ArticleCards";
import Icon from "./Icon";
import { getArticles } from "../lib/api";
import { isArticleSection, sectionDefinitions } from "../lib/sections";
import {
  type Article,
  type ArticlePage,
  type ArticleSection,
} from "../lib/types";

function pageNumbers(current: number, total: number) {
  const first = Math.max(1, Math.min(current - 2, total - 4));
  return Array.from(
    { length: Math.min(total, 5) },
    (_, index) => first + index,
  );
}

export default function PublicSection({
  section,
}: {
  section: ArticleSection;
}) {
  if (!isArticleSection(section)) notFound();
  return <SectionListing key={section} section={section} />;
}

function SectionListing({ section }: { section: ArticleSection }) {
  const [items, setItems] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<
    ArticlePage["pagination"] | null
  >(null);
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const copy = sectionDefinitions[section];

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    getArticles(section, page)
      .then((result) => {
        if (!active) return;
        if (result.data.some((article) => article.section !== section))
          throw new Error("Isi halaman tidak sesuai.");
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
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [section, page, retry]);

  function changePage(next: number) {
    setPage(next);
    document.getElementById("artikel")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <div className={`section-public-page section-page--${section}`}>
      <section
        className="portal-page-hero"
        aria-labelledby={`${section}-title`}
      >
        <svg
          className="section-hero-ribbon"
          viewBox="0 0 500 560"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="inner-graphic-gold"
            d="M70 560V214C70 109 155 24 260 24S450 109 450 214V560H340V214C340 170 304 134 260 134S180 170 180 214V560Z"
          />
          <path
            className="inner-graphic-maroon"
            d="M96 560V240C96 135 181 50 286 50S476 135 476 240V560H366V240C366 196 330 160 286 160S206 196 206 240V560Z"
          />
          <path
            className="inner-graphic-red"
            d="M366 352H476V462H366Z"
          />
        </svg>
        <div className="portal-container">
          <nav className="portal-breadcrumb" aria-label="Breadcrumb">
            <Link href="/beranda">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.label}</span>
          </nav>
          <div className="portal-eyebrow" data-motion-enter="up">
            <span aria-hidden="true" />
            {copy.eyebrow}
          </div>
          <h1
            data-motion-enter="up"
            className="portal-display section-route-title"
            id={`${section}-title`}
          >
            {copy.label}
            <span aria-hidden="true">.</span>
          </h1>
          <p className="section-route-tagline">{copy.tagline}</p>
          <p className="portal-page-description">{copy.description}</p>
          <div className="portal-page-hero-bottom">
            <span className="section-route-signature">
              <Icon name={copy.icon} /> {copy.label} · BEM FH UNNES 2026
            </span>
            <a
              href="#artikel"
              className="section-jump-link"
              data-pointer-label="Jelajahi"
            >
              Jelajahi {copy.label.toLowerCase()}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section
        className="portal-section portal-listing"
        id="artikel"
        aria-labelledby={`${section}-listing-title`}
      >
        <div className="portal-container">
          <div
            className="portal-listing-toolbar section-listing-heading"
            data-reveal="left"
          >
            <div className="section-listing-identity">
              <span className="section-identity-icon">
                <Icon name={copy.icon} />
              </span>
              <div>
                <h2 id={`${section}-listing-title`}>{copy.listingTitle}</h2>
                <p>{copy.listingDescription}</p>
              </div>
            </div>
            {!loading && !error && pagination && (
              <span className="portal-results-count" aria-live="polite">
                {pagination.total} artikel {copy.label.toLowerCase()}
              </span>
            )}
          </div>

          {loading ? (
            <div
              className="portal-article-grid"
              role="status"
              aria-label={`Memuat artikel ${copy.label}`}
            >
              {[1, 2, 3].map((item) => (
                <div
                  className="portal-article-skeleton"
                  aria-hidden="true"
                  key={item}
                >
                  <div className="portal-skeleton-image" />
                  <div className="portal-skeleton-line" />
                  <div className="portal-skeleton-line portal-skeleton-line-short" />
                </div>
              ))}
              <span className="portal-sr-only">Memuat artikel...</span>
            </div>
          ) : error ? (
            <div className="portal-state" role="alert">
              <span className="portal-state-symbol" aria-hidden="true">
                !
              </span>
              <span className="portal-eyebrow">KONEKSI TERGANGGU</span>
              <h2>Belum berhasil memuat {copy.label.toLowerCase()}.</h2>
              <p>
                Periksa koneksi internetmu, lalu coba lagi untuk melihat artikel
                terbaru.
              </p>
              <button
                className="portal-button portal-button-maroon"
                onClick={() => setRetry((value) => value + 1)}
              >
                Coba lagi <span aria-hidden="true">↻</span>
              </button>
            </div>
          ) : items.length ? (
            <>
              <ArticleCards articles={items} />
              {pagination && pagination.totalPages > 1 && (
                <nav className="portal-pagination" aria-label="Halaman artikel">
                  <button
                    className="portal-pagination-direction"
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    aria-label="Halaman sebelumnya"
                  >
                    ←
                  </button>
                  {pageNumbers(page, pagination.totalPages).map((number) => (
                    <button
                      className={`portal-pagination-number${number === page ? " is-active" : ""}`}
                      onClick={() => changePage(number)}
                      aria-current={number === page ? "page" : undefined}
                      aria-label={`Halaman ${number}`}
                      key={number}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    className="portal-pagination-direction"
                    onClick={() => changePage(page + 1)}
                    disabled={page >= pagination.totalPages}
                    aria-label="Halaman berikutnya"
                  >
                    →
                  </button>
                  <span className="portal-pagination-summary">
                    Halaman {page} dari {pagination.totalPages}
                  </span>
                </nav>
              )}
            </>
          ) : (
            <div className="portal-state">
              <span className="portal-state-symbol" aria-hidden="true">
                ✳
              </span>
              <span className="portal-eyebrow">SEGERA HADIR</span>
              <h2>{copy.label} akan segera hadir.</h2>
              <p>{copy.empty}</p>
              <Link className="portal-text-link" href="/beranda">
                Kembali ke beranda <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
