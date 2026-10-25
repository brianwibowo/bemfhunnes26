/** Original vector ornaments, kept separate from the site's interactive controls. */
export function GraphicAccent({
  kind,
  className = "",
}: {
  kind: "arch" | "ribbon" | "loop";
  className?: string;
}) {
  return (
    <svg
      viewBox={
        kind === "arch"
          ? "0 0 600 600"
          : kind === "ribbon"
            ? "0 0 500 560"
            : "0 0 360 360"
      }
      className={`graphic-accent ${className}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "arch" ? (
        <>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M300 12a288 288 0 1 1 0 576 288 288 0 0 1 0-576Zm0 102a186 186 0 1 0 0 372 186 186 0 0 0 0-372Z"
            clipRule="evenodd"
          />
          <path
            d="M48 300C48 161 161 48 300 48"
            stroke="var(--gold)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M535 391c-37 96-131 164-240 164"
            stroke="var(--cream)"
            strokeOpacity=".22"
            strokeWidth="2"
          />
        </>
      ) : kind === "ribbon" ? (
        <>
          <path
            fill="var(--gold)"
            d="M70 560V214C70 109 155 24 260 24S450 109 450 214V560H340V214C340 170 304 134 260 134S180 170 180 214V560Z"
          />
          <path
            fill="var(--maroon)"
            d="M96 560V240C96 135 181 50 286 50S476 135 476 240V560H366V240C366 196 330 160 286 160S206 196 206 240V560Z"
          />
          <path fill="var(--red-bright)" d="M366 352H476V462H366Z" />
        </>
      ) : (
        <path
          d="M-20 95C65-18 207 3 208 88c1 80-130 114-137 41C63 49 299 48 319 183c13 89-62 137-26 198"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function DoodleArrow({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span className={`doodle-arrow ${className}`} aria-hidden="true">
      {label && <span>{label}</span>}
      <svg viewBox="0 0 180 110" fill="none" focusable="false">
        <path
          d="M10 21c29-13 65-6 65 21 0 30-40 33-40 11 0-29 75-33 117 35"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="m129 80 25 11 1-27"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
