import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "../../../../components/SiteShell";
import OrganizationDetail from "../../../../components/organization/OrganizationDetail";
import {
  getOrganizationUnit,
  organizationUnits,
} from "../../../../lib/organization";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return organizationUnits.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = getOrganizationUnit(slug);

  if (!unit) notFound();

  return {
    title: `${unit.name} | BEM FH UNNES 2026`,
    description:
      unit.intro?.[0] ||
      `Profil ${unit.name} dalam struktur organisasi BEM FH UNNES 2026, Kabinet Laksana Adhikara.`,
  };
}

export default async function OrganizationPage({ params }: PageProps) {
  const { slug } = await params;
  const unit = getOrganizationUnit(slug);

  if (!unit) notFound();

  return (
    <SiteShell>
      <OrganizationDetail unit={unit} />
    </SiteShell>
  );
}
