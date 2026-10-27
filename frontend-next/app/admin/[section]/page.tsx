import { notFound } from "next/navigation";
import AdminArticleList from "../../../components/AdminArticleList";
import type { ArticleSection } from "../../../lib/types";
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const p = await params;
  if (p.section !== "berita") notFound();
  return <AdminArticleList section={p.section as ArticleSection} />;
}
