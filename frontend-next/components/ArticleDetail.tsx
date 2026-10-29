"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getArticle } from "../lib/api";
import { mediaUrl } from "../lib/site";
import { labels, type Article, type ArticleSection } from "../lib/types";

type DetailStatus = "loading" | "ready" | "error" | "not-found";

export default function ArticleDetail({
  slug,
  section,
}: {
  slug: string;
  section: string;
}) {
  const [article, setArticle] = useState<Article | null>(null);
  const [status, setStatus] = useState<DetailStatus>("loading");
  const [retry, setRetry] = useState(0);
  const validSection = Object.prototype.hasOwnProperty.call(labels, section);
  const backHref =
    section === "kemahasiswaan"
      ? "/advokasi"
      : validSection
        ? `/${section}`
        : "/berita";
  const backLabel = validSection ? labels[section as ArticleSection] : "Berita";

  useEffect(() => {
    let active = true;
    setArticle(null);

    if (!validSection) {
      setStatus("not-found");
      return;
    }

    setStatus("loading");
    getArticle(slug)
      .then((result) => {
        if (!active) return;
        if (!result.article || result.article.section !== section) {
          setStatus("not-found");
          return;
        }
        setArticle(result.article);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (!active) return;
        const responseStatus =
          typeof error === "object" && error !== null && "status" in error
            ? error.status
            : null;
        setStatus(responseStatus === 404 ? "not-found" : "error");
      });

    return () => {
      active = false;
    };
  }, [slug, section, validSection, retry]);

  if (status !== "ready" || !article) {
    return (
      <section className="portal-section article-status-page">
        <div className="portal-container">
          <Link className="portal-text-link" href={backHref}>
            ← Kembali ke {backLabel}
          </Link>
          {status === "loading" ? (
            <div
              className="article-loading"
              role="status"
              aria-label="Memuat artikel"
            >
              <div className="portal-skeleton-line" />
              <div className="portal-skeleton-line" />
              <div className="portal-skeleton-line portal-skeleton-line-short" />
              <div className="portal-skeleton-image" />
              <span className="portal-sr-only">Memuat artikel...</span>
            </div>
          ) : status === "not-found" ? (
            <div className="portal-state">
              <span className="portal-state-symbol" aria-hidden="true">
                404
              </span>
              <span className="portal-eyebrow">HALAMAN TIDAK DITEMUKAN</span>
              <h1>Sepertinya kita salah arah.</h1>
              <p>
                Artikel ini tidak tersedia atau sudah tidak dipublikasikan.
                Temukan kabar lainnya di rubrik {backLabel}.
              </p>
              <Link
                className="portal-button portal-button-maroon"
                href={backHref}
              >
                Lihat artikel lainnya <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ) : (
            <div className="portal-state" role="alert">
              <span className="portal-state-symbol" aria-hidden="true">
                !
              </span>
              <span className="portal-eyebrow">KONEKSI TERGANGGU</span>
              <h1>Ceritanya belum berhasil dimuat.</h1>
              <p>
                Periksa koneksi internetmu dan coba buka kembali artikel ini.
              </p>
              <button
                className="portal-button portal-button-maroon"
                onClick={() => setRetry((value) => value + 1)}
              >
                Coba lagi <span aria-hidden="true">↻</span>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  const publishedDate = new Date(article.publishedAt || article.createdAt);
  const dateLabel = Number.isNaN(publishedDate.getTime())
    ? null
    : new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      }).format(publishedDate);
  const readingMinutes = Math.max(
    1,
    Math.ceil(article.body.trim().split(/\s+/).length / 200),
  );
  const paragraphs = article.body
    .split(/\r?\n\s*\r?\n/)
    .filter((paragraph) => paragraph.trim());

  return (
    <>
      <article className="article-detail">
        <header className="article-detail-header portal-container">
          <nav className="portal-breadcrumb" aria-label="Breadcrumb">
            <Link href="/beranda">Beranda</Link>
            <span aria-hidden="true">/</span>
            <Link href={backHref}>{backLabel}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Artikel</span>
          </nav>
          <div className="portal-eyebrow">
            <span aria-hidden="true" />
            {labels[article.section]}
          </div>
          <h1 className="article-detail-title">{article.title}</h1>
          <p className="article-detail-description">{article.description}</p>
          <div className="article-detail-meta">
            <span className="article-author-mark" aria-hidden="true">
              <img src="/images/logo-bem.webp" alt="" width={36} height={36} />
            </span>
            <span className="article-author">
              <strong>BEM FH UNNES</strong>
              <span>Kabinet Laksana Adhikara</span>
            </span>
            {dateLabel && (
              <time dateTime={article.publishedAt || article.createdAt}>
                {dateLabel}
              </time>
            )}
            <span>{readingMinutes} menit baca</span>
          </div>
        </header>

        {article.imageUrl && (
          <figure className="article-detail-image portal-container">
            <Image
              src={
                mediaUrl(article.imageUrl) ||
                "/images/logo-kabinet-laksana-adhikara.webp"
              }
              alt={article.title}
              width={1200}
              height={750}
              decoding="async"
              sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 96px), 1180px"
              unoptimized={process.env.NODE_ENV === "development"}
            />
          </figure>
        )}

        <div className="article-reading-layout portal-container">
          <aside className="article-reading-aside">
            <span className="portal-eyebrow">KABAR LAKSANA</span>
            <p>
              Sebuah cerita dari
              <br />
              Kabinet Laksana Adhikara.
            </p>
            <Link className="portal-text-link" href={backHref}>
              ← Kembali ke {backLabel}
            </Link>
          </aside>
          <div className="article-detail-body">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className="article-body-end" aria-hidden="true">
              ✳
            </div>
          </div>
        </div>
      </article>

      <aside className="article-more portal-container">
        <div>
          <span className="portal-eyebrow">LANJUT JELAJAHI</span>
          <h2>
            Masih ada <em>cerita lainnya.</em>
          </h2>
        </div>
        <Link className="portal-button portal-button-maroon" href={backHref}>
          Lihat {backLabel.toLowerCase()} lainnya{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </aside>
    </>
  );
}
