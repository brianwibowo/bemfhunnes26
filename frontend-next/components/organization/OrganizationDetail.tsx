import Link from "next/link";
import {
  getOrganizationUnit,
  organizationGroups,
  organizationHref,
  type OrganizationUnit,
} from "../../lib/organization";
import Icon from "../Icon";
import OrganizationLogo from "./OrganizationLogo";
import styles from "./detail.module.css";

const kindLabels: Record<OrganizationUnit["kind"], string> = {
  "badan-independen": "Badan Independen",
  "sekretaris-kabinet": "Sekretaris Kabinet",
  biro: "Biro",
  kemenkoan: "Kementerian Koordinator",
  kementerian: "Kementerian",
};

function sectionHref(id: string) {
  return `#bagian-${id}`;
}

export default function OrganizationDetail({
  unit,
}: {
  unit: OrganizationUnit;
}) {
  const parent = unit.parentSlug
    ? getOrganizationUnit(unit.parentSlug)
    : undefined;
  const group = organizationGroups.find(
    (entry) =>
      entry.coordinatorSlug === unit.slug ||
      entry.memberSlugs.includes(unit.slug),
  );
  const relatedSlugs = group
    ? [group.coordinatorSlug, ...group.memberSlugs]
    : [];
  const related = relatedSlugs
    .filter(
      (slug): slug is string =>
        Boolean(slug) && slug !== unit.slug && slug !== parent?.slug,
    )
    .filter((slug, index, slugs) => slugs.indexOf(slug) === index)
    .map(getOrganizationUnit)
    .filter((entry): entry is OrganizationUnit => Boolean(entry));
  const showSectionNav = unit.sections.length > 1;

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="Jejak halaman">
          <Link href="/profil">Profil kabinet</Link>
          <span aria-hidden="true">/</span>
          <Link href="/profil#struktur-organisasi">Struktur organisasi</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{unit.shortName || unit.name}</span>
        </nav>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <p className={styles.kind}>{kindLabels[unit.kind]}</p>
            <h1 className={styles.title}>{unit.name}</h1>
            {parent && (
              <p className={styles.parent}>
                <span>Koordinasi</span>
                <Link href={organizationHref(parent.slug)}>
                  {parent.name}
                  <Icon name="arrow-up" />
                </Link>
              </p>
            )}
            {unit.intro && unit.intro.length > 0 && (
              <div className={styles.intro}>
                {unit.intro.map((paragraph, index) => (
                  <p key={`${unit.slug}-intro-${index}`}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
          <div className={styles.identity}>
            <OrganizationLogo
              unit={unit}
              className={styles.logo}
              sizes="(max-width: 700px) 96px, 160px"
              priority
            />
          </div>
        </div>
      </header>

      {unit.sections.length > 0 && (
        <div
          className={`${styles.contentLayout}${showSectionNav ? ` ${styles.withNavigation}` : ""}`}
        >
          {showSectionNav && (
            <aside className={styles.sidebar}>
              <nav className={styles.sectionNav} aria-label="Bagian halaman">
                <p className={styles.navLabel}>Dalam halaman ini</p>
                <ul>
                  {unit.sections.map((section) => (
                    <li key={section.id}>
                      <a href={sectionHref(section.id)}>
                        <span>{section.title}</span>
                        <span className={styles.navCount}>
                          {section.items.length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <div className={styles.sections}>
            {unit.sections.map((section) => (
              <section
                key={section.id}
                id={`bagian-${section.id}`}
                className={styles.section}
                aria-labelledby={`judul-${section.id}`}
              >
                <div className={styles.sectionHeading}>
                  <h2 id={`judul-${section.id}`} className={styles.sectionTitle}>
                    {section.title}
                  </h2>
                  <span className={styles.sectionCount}>
                    {String(section.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className={styles.items}>
                  {section.items.map((item, index) => (
                    <details
                      className={styles.item}
                      key={`${section.id}-${index}`}
                    >
                      <summary className={styles.itemSummary}>
                        <span className={styles.itemNumber} aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.expandIcon} aria-hidden="true" />
                      </summary>
                      <div className={styles.itemBody}>
                        {item.note && <p className={styles.itemNote}>{item.note}</p>}
                        {item.paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={`${section.id}-${index}-${paragraphIndex}`}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="unit-terkait-title">
          <div className={styles.relatedHeading}>
            <p className={styles.kind}>Struktur organisasi</p>
            <h2 id="unit-terkait-title" className={styles.sectionTitle}>
              Unit terkait
            </h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((entry) => (
              <Link
                href={organizationHref(entry.slug)}
                className={styles.relatedLink}
                key={entry.slug}
              >
                <OrganizationLogo unit={entry} className={styles.relatedLogo} />
                <span className={styles.relatedCopy}>
                  <span className={styles.relatedKind}>
                    {kindLabels[entry.kind]}
                  </span>
                  <span className={styles.relatedName}>{entry.name}</span>
                </span>
                <Icon name="arrow-up" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className={styles.backRow}>
        <Link href="/profil#struktur-organisasi" className={styles.backLink}>
          <Icon name="arrow" />
          Kembali ke struktur organisasi
        </Link>
      </div>
    </article>
  );
}
