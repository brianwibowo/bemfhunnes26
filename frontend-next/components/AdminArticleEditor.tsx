"use client";

import { FormEvent, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import AdminShell from "./AdminShell";
import { api } from "../lib/api";
import {
  articleStatusLabels,
  isArticleSection,
  sectionDefinitions,
} from "../lib/sections";
import type { Article, ArticleSection, ArticleStatus } from "../lib/types";

type LoadState = "loading" | "ready" | "error" | "mismatch";

export default function AdminArticleEditor({
  section,
  id,
}: {
  section: ArticleSection;
  id?: string;
}) {
  if (!isArticleSection(section)) notFound();
  return (
    <SectionEditor
      key={`${section}-${id || "new"}`}
      section={section}
      id={id}
    />
  );
}

function SectionEditor({
  section,
  id,
}: {
  section: ArticleSection;
  id?: string;
}) {
  const router = useRouter();
  const definition = sectionDefinitions[section];
  const [article, setArticle] = useState<Partial<Article>>({
    section,
    title: "",
    description: "",
    body: "",
    status: "pending",
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>(
    id ? "loading" : "ready",
  );
  const [actualSection, setActualSection] = useState<ArticleSection | null>(
    null,
  );
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoadState("loading");
    setError("");
    api<{ article: Article }>(`/api/admin/articles/${encodeURIComponent(id)}`)
      .then((result) => {
        if (!active) return;
        if (result.article.section !== section) {
          setActualSection(result.article.section);
          setLoadState("mismatch");
          return;
        }
        setArticle(result.article);
        setLoadState("ready");
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Artikel belum dapat dimuat.",
        );
        setLoadState("error");
      });
    return () => {
      active = false;
    };
  }, [id, section, retry]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || loadState !== "ready" || article.section !== section) return;
    setSaving(true);
    setError("");
    try {
      // Recheck the record before saving in case its section changed after this form loaded.
      if (id) {
        const current = await api<{ article: Article }>(
          `/api/admin/articles/${encodeURIComponent(id)}`,
        );
        if (current.article.section !== section) {
          setActualSection(current.article.section);
          setLoadState("mismatch");
          setSaving(false);
          return;
        }
      }
      const data = new FormData();
      data.append("section", section);
      data.append("title", article.title || "");
      data.append("description", article.description || "");
      data.append("body", article.body || "");
      data.append("status", article.status || "pending");
      if (file) data.append("image", file);
      await api(
        id
          ? `/api/admin/articles/${encodeURIComponent(id)}`
          : "/api/admin/articles",
        { method: id ? "PATCH" : "POST", body: data },
      );
      router.push(`/admin/${section}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Artikel gagal disimpan.");
      setSaving(false);
    }
  }

  return (
    <AdminShell>
      <section
        className={`admin-content section-editor section-page--${section}`}
        aria-labelledby="section-editor-title"
      >
        <div className="eyebrow">
          {definition.managementLabel} / {id ? "Edit artikel" : "Artikel baru"}
        </div>
        <h1 id="section-editor-title">
          {id ? "Perbarui artikel" : "Tulis artikel"}{" "}
          {definition.label.toLowerCase()}.
        </h1>
        <p className="muted">
          Kelola artikel untuk halaman {definition.label}.
        </p>
        {loadState === "loading" ? (
          <div className="section-admin-state" role="status">
            <span className="admin-spinner" aria-hidden="true" />
            <p>Memuat artikel {definition.label.toLowerCase()}…</p>
          </div>
        ) : loadState === "mismatch" ? (
          <div className="section-admin-state section-admin-error" role="alert">
            <h2>Artikel berada di halaman lain.</h2>
            <p>Buka pengelolaan yang sesuai untuk melanjutkan penyuntingan.</p>
            {actualSection && sectionDefinitions[actualSection] && (
              <Link
                className="btn btn-primary"
                href={`/admin/${actualSection}/${id}/edit`}
              >
                Buka {sectionDefinitions[actualSection].label}
              </Link>
            )}
            <Link
              className="section-admin-public-link"
              href={`/admin/${section}`}
            >
              Kembali ke {definition.label}
            </Link>
          </div>
        ) : loadState === "error" ? (
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
          <form className="form admin-card" onSubmit={save} aria-busy={saving}>
            <label>
              Judul
              <input
                name="title"
                value={article.title || ""}
                onChange={(event) =>
                  setArticle({ ...article, title: event.target.value })
                }
                minLength={5}
                maxLength={160}
                required
                disabled={saving}
              />
            </label>
            <label>
              Deskripsi singkat
              <textarea
                name="description"
                value={article.description || ""}
                onChange={(event) =>
                  setArticle({ ...article, description: event.target.value })
                }
                minLength={20}
                maxLength={320}
                rows={4}
                required
                disabled={saving}
              />
            </label>
            <label>
              Isi artikel
              <textarea
                name="body"
                value={article.body || ""}
                onChange={(event) =>
                  setArticle({ ...article, body: event.target.value })
                }
                minLength={30}
                rows={14}
                required
                disabled={saving}
              />
            </label>
            <label>
              Foto utama
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
                disabled={saving}
              />
            </label>
            <label>
              Status
              <select
                name="status"
                value={article.status || "pending"}
                onChange={(event) =>
                  setArticle({
                    ...article,
                    status: event.target.value as ArticleStatus,
                  })
                }
                disabled={saving}
              >
                {(
                  Object.entries(articleStatusLabels) as [
                    ArticleStatus,
                    string,
                  ][]
                ).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="section-editor-actions">
              <Link className="btn" href={`/admin/${section}`}>
                Batal
              </Link>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "Menyimpan…" : "Simpan artikel"}
              </button>
            </div>
          </form>
        )}
      </section>
    </AdminShell>
  );
}
