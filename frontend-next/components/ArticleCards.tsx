import Link from "next/link";
import Image from "next/image";
import { mediaUrl } from "../lib/site";
import { labels, type Article } from "../lib/types";

function articleDate(article: Article) {
  const value = article.publishedAt || article.createdAt;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return {
    value,
    label: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(date),
  };
}

export function ArticleCards({ articles }: { articles: Article[] }) {
  return (
    <div className="portal-article-grid">
      {articles.map((article) => {
        const date = articleDate(article);
        const href = `/${article.section}/${article.slug}`;

        return (
          <article
            className="portal-article-card card-clickable"
            key={article.id}
            data-reveal
          >
            <div
              className={`portal-article-media${article.imageUrl ? "" : " portal-article-media-empty"}`}
            >
              {article.imageUrl ? (
                <Image
                  src={
                    mediaUrl(article.imageUrl) ||
                    "/images/logo-kabinet-laksana-adhikara.webp"
                  }
                  alt={article.title}
                  width={800}
                  height={560}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 900px) 45vw, 33vw"
                  unoptimized={process.env.NODE_ENV === "development"}
                />
              ) : (
                <div className="portal-article-placeholder" aria-hidden="true">
                  <span className="portal-article-placeholder-orbit" />
                  <img
                    src="/images/logo-kabinet-laksana-adhikara.webp"
                    alt=""
                    width={120}
                    height={150}
                    loading="lazy"
                  />
                  <span>LAKSANA ADHIKARA</span>
                </div>
              )}
              <span className="portal-article-category">
                {labels[article.section]}
              </span>
              <span className="portal-article-media-arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className="portal-article-copy">
              <div className="portal-article-meta">
                {date ? (
                  <time dateTime={date.value}>{date.label}</time>
                ) : (
                  <span>BEM FH UNNES</span>
                )}
                <span aria-hidden="true">·</span>
                <span>Kabar Laksana</span>
              </div>
              <h2>
                <Link
                  className="card-primary-link"
                  href={href}
                  data-pointer-label="Baca cerita"
                >
                  {article.title}
                </Link>
              </h2>
              <p>{article.description}</p>
              <span className="portal-text-link" aria-hidden="true">
                Baca selengkapnya <span aria-hidden="true">↗</span>
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
