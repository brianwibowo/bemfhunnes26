import { notFound } from "next/navigation";
import AdminArticleEditor from "../../../../../components/AdminArticleEditor";
import type { ArticleSection } from "../../../../../lib/types";
export default async function Page({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const p = await params;
  if (p.section !== "berita") notFound();
  return <AdminArticleEditor section={p.section as ArticleSection} id={p.id} />;
}
