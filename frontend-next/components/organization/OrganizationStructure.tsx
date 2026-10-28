import Link from "next/link";
import {
  getOrganizationUnit,
  organizationGroups,
  organizationHref,
  type OrganizationUnit,
} from "../../lib/organization";
import Icon from "../Icon";
import OrganizationLogo from "./OrganizationLogo";
import styles from "./structure.module.css";

function UnitLink({
  unit,
  compact = false,
}: {
  unit: OrganizationUnit;
  compact?: boolean;
}) {
  return (
    <Link
      href={organizationHref(unit.slug)}
      className={`${styles.unitLink}${compact ? ` ${styles.compactLink}` : ""}`}
    >
      <OrganizationLogo unit={unit} className={styles.unitLogo} />
      <span className={styles.unitCopy}>
        <span className={styles.unitName}>{unit.name}</span>
        <span className={styles.linkHint}>Lihat profil <Icon name="arrow" /></span>
      </span>
    </Link>
  );
}

export default function OrganizationStructure() {
  const secretariat = organizationGroups.find((group) => group.id === "sekretariat");
  const coreUnits = organizationGroups
    .filter((group) => group.id === "badan-independen" || group.id === "sekretariat")
    .flatMap((group) => group.coordinatorSlug ? [group.coordinatorSlug] : group.memberSlugs)
    .map(getOrganizationUnit)
    .filter((unit): unit is OrganizationUnit => Boolean(unit));
  const coordinationGroups = organizationGroups.filter(
    (group) => group.id !== "badan-independen" && group.id !== "sekretariat",
  );

  return (
    <div className={styles.structure}>
      <div className={styles.leadership}>
        <span className={styles.eyebrow}>Pimpinan kabinet</span>
        <h3>Presiden &amp; Wakil Presiden</h3>
        <span className={styles.cabinet}>BEM FH UNNES 2026 · Kabinet Laksana Adhikara</span>
      </div>
      <div className={styles.connector} aria-hidden="true" />

      <div className={styles.coreGrid}>
        {coreUnits.map((unit) => (
          <article key={unit.slug} className={styles.coreCard}>
            <p className={styles.cardLabel}>
              {unit.kind === "badan-independen" ? "Badan independen" : "Sekretariat kabinet"}
            </p>
            <UnitLink unit={unit} />
            {unit.slug === secretariat?.coordinatorSlug && (
              <ul className={styles.bureauList} aria-label="Biro Sekretaris Kabinet">
                {secretariat.memberSlugs.map((slug) => {
                  const bureau = getOrganizationUnit(slug);
                  return bureau ? (
                    <li key={slug}>
                      <Link href={organizationHref(slug)}>
                        {bureau.name} <Icon name="arrow" />
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            )}
          </article>
        ))}
      </div>

      <div className={styles.coordination}>
        <div className={styles.coordinationHeading}>
          <h3>Koordinasi kementerian</h3>
          <p>Buka kelompok untuk memilih kementerian, atau lihat profil kemenkoan.</p>
        </div>
        <div className={styles.groupGrid}>
          {coordinationGroups.map((group) => {
            const coordinator = group.coordinatorSlug
              ? getOrganizationUnit(group.coordinatorSlug)
              : undefined;
            if (!coordinator) return null;

            return (
              <article key={group.id} className={styles.groupCard}>
                <p className={styles.cardLabel}>{group.title}</p>
                <UnitLink unit={coordinator} />
                <details className={styles.groupDetails}>
                  <summary>
                    <span>
                      <span className={styles.closedLabel}>Lihat</span>
                      <span className={styles.openLabel}>Tutup</span>
                      {" "}{group.memberSlugs.length} kementerian
                    </span>
                    <span className={styles.chevron} aria-hidden="true" />
                  </summary>
                  <ul className={styles.memberList}>
                    {group.memberSlugs.map((slug) => {
                      const member = getOrganizationUnit(slug);
                      return member ? (
                        <li key={slug}>
                          <UnitLink unit={member} compact />
                        </li>
                      ) : null;
                    })}
                  </ul>
                </details>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
