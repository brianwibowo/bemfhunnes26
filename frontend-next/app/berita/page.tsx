import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import PublicSection from "../../components/PublicSection";
export const metadata: Metadata = { title: "Berita | BEM FH UNNES 2026" };
export default function Page() {
  return (
    <SiteShell>
      <PublicSection key="berita" section="berita" />
    </SiteShell>
  );
}
