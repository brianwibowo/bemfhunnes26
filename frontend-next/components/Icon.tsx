import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "arrow-up"
  | "book"
  | "spark"
  | "globe"
  | "people"
  | "scale"
  | "play"
  | "pin"
  | "mail"
  | "check";
export default function Icon({
  name = "arrow",
  className,
  style,
}: {
  name?: IconName;
  className?: string;
  style?: CSSProperties;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    "arrow-up": (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    book: (
      <>
        <path d="M12 6c-3-3-7-3-10-1v14c3-2 7-2 10 1 3-3 7-3 10-1V5c-3-2-7-2-10 1ZM12 6v14" />
      </>
    ),
    spark: (
      <path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z" />
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 6.5h14M5 17.5h14" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6M19 14a6 6 0 0 1 3 5v2" />
      </>
    ),
    scale: (
      <>
        <path d="M12 3v18M7 21h10M3 7h18M5 7l-4 7h8L5 7ZM19 7l-4 7h8l-4-7Z" />
      </>
    ),
    play: <path d="m9 5 11 7-11 7V5Z" />,
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m2 6 10 7L22 6" />
      </>
    ),
    check: <path d="m4 12 5 5L20 6" />,
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
