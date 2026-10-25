"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticles } from "../lib/api";
import type { Article } from "../lib/types";
import { ArticleCards } from "./ArticleCards";
import Icon from "./Icon";

export default function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let active = true;
    getArticles("berita")
      .then((result) => {
        if (active) {
          setArticles(result.data.slice(0, 3));
          setState("ready");
        }
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <section
      className="home-news portal-section portal-container"
      aria-labelledby="news-heading"
    >
      <div className="portal-section-heading" data-reveal>
        <div>
          <span className="portal-eyebrow">Dari ruang gerak kami</span>
          <h2 id="news-heading">
            Cerita <em>terbaru.</em>
          </h2>
        </div>
        <Link className="portal-text-link" href="/berita">
          Lihat semua berita <Icon name="arrow" />
        </Link>
      </div>
      {state === "loading" ? (
        <div className="portal-loading" role="status">
          Memuat kabar terbaru...
        </div>
      ) : articles.length ? (
        <ArticleCards articles={articles} />
      ) : (
        <div className="home-news-empty">
          <div className="empty-news-symbol" aria-hidden="true">
            <Icon name="book" />
          </div>
          <div>
            <h3>
              {state === "error"
                ? "Kabar terbaru belum dapat dimuat."
                : "Cerita berikutnya sedang disiapkan."}
            </h3>
            <p>
              {state === "error"
                ? "Kamu tetap bisa menjelajahi rubrik berita atau mengikuti media sosial kami."
                : "Ikuti program, perspektif, dan perjalanan BEM FH UNNES di sini."}
            </p>
          </div>
          <Link
            href="/berita"
            className="portal-circle-link"
            aria-label="Buka rubrik berita"
          >
            <Icon name="arrow-up" />
          </Link>
        </div>
      )}
    </section>
  );
}
