import Icon from "./Icon";
import Image from "next/image";

export default function CabinetArtwork({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className={`cabinet-art${compact ? " cabinet-art-compact" : ""}`}>
      <div className="art-ring art-ring-outer" aria-hidden="true" />
      <div className="art-ring art-ring-inner" aria-hidden="true" />
      <span className="art-spark art-spark-one" aria-hidden="true">
        ✦
      </span>
      <span className="art-spark art-spark-two" aria-hidden="true">
        ✦
      </span>
      <div className="art-medallion">
        <Image
          src="/images/logo-kabinet-laksana-adhikara.webp"
          width="212"
          height="310"
          alt="Logo Kabinet Laksana Adhikara"
          sizes="(max-width: 680px) 123px, (max-width: 1100px) 148px, 175px"
          priority={!compact}
          fetchPriority={compact ? undefined : "high"}
        />
      </div>
      <div className="art-caption">
        <span>KABINET</span>
        <strong>Laksana Adhikara</strong>
        <span>BEM FH UNNES 2026</span>
      </div>
      <span className="art-label">
        <Icon name="scale" /> Suara juang, satu langkah bersama.
      </span>
    </div>
  );
}
