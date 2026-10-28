import Image from "next/image";
import type { OrganizationUnit } from "../../lib/organization";
import styles from "./logo.module.css";

export default function OrganizationLogo({
  unit,
  className,
  priority = false,
  sizes = "64px",
}: {
  unit: OrganizationUnit;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <span className={[styles.logo, className].filter(Boolean).join(" ")}>
      {unit.logo ? (
        <Image
          src={unit.logo.src}
          width={unit.logo.width}
          height={unit.logo.height}
          alt=""
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {unit.name.split(/\s+/).map((word) => word[0]).join("").slice(0, 3)}
        </span>
      )}
    </span>
  );
}
