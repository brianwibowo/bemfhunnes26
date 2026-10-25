"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Optional visual cues for deliberately marked public links and interactions. */
export default function ContextPointer() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const pointer = pointerRef.current;
    const label = labelRef.current;
    if (!pointer || !label || pathname.startsWith("/admin")) return;

    const eligible = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let listening = false;
    let frame = 0;
    let nextX = 0;
    let nextY = 0;
    let nextLabel = "";

    function hide() {
      cancelAnimationFrame(frame);
      frame = 0;
      nextLabel = "";
      pointer?.removeAttribute("data-visible");
    }

    function paint() {
      frame = 0;
      if (!pointer || !label || !nextLabel || document.hidden) return;
      if (label.textContent !== nextLabel) label.textContent = nextLabel;
      pointer.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      pointer.setAttribute("data-visible", "true");
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.buttons !== 0) {
        hide();
        return;
      }

      const target = event.target;
      const cue =
        target instanceof Element
          ? target.closest<HTMLElement>("[data-pointer-label]")
          : null;
      const text = cue?.getAttribute("data-pointer-label")?.trim();
      if (
        !cue ||
        !text ||
        !cue.closest(".portal-site") ||
        cue.closest("[aria-disabled='true'], :disabled") ||
        (target instanceof Element &&
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        hide();
        return;
      }

      nextLabel = text.slice(0, 32);
      // Keep the cue beside the native pointer and inside the viewport edges.
      nextX = Math.max(
        12,
        Math.min(event.clientX + 24, window.innerWidth - 208),
      );
      nextY = Math.max(
        12,
        Math.min(event.clientY + 18, window.innerHeight - 52),
      );
      if (!frame) frame = requestAnimationFrame(paint);
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide();
    }

    function detach() {
      if (!listening) return;
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("pointerdown", hide);
      document.removeEventListener("keydown", hide);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", hide);
      listening = false;
    }

    function sync() {
      hide();
      detach();
      if (!eligible.matches || document.hidden) return;
      document.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerout", leave, { passive: true });
      document.addEventListener("pointerdown", hide, { passive: true });
      document.addEventListener("keydown", hide);
      window.addEventListener("scroll", hide, { passive: true });
      window.addEventListener("blur", hide);
      window.addEventListener("resize", hide, { passive: true });
      listening = true;
    }

    eligible.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      hide();
      detach();
      eligible.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="context-pointer" ref={pointerRef} aria-hidden="true">
      <svg className="context-pointer-arrow" viewBox="0 0 26 30" fill="none">
        <path d="M3 2.5 23 16.5 14.5 18.5 11 27 3 2.5Z" />
      </svg>
      <span className="context-pointer-label" ref={labelRef} />
    </div>
  );
}
