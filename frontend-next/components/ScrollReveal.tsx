"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type RevealRecord = {
  state: string | null;
  delay: string;
  priority: string;
  timer: number | null;
};

/** A passive reading indicator; scroll position stays under the browser's control. */
export function ScrollProgress() {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const indicator = indicatorRef.current;
    const bar = barRef.current;
    if (!indicator || !bar) return;
    let frame = 0;
    let measureFrame = 0;
    let distance = 0;

    function update() {
      if (!indicator || !bar) return;
      const progress =
        distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      bar.style.transform = `scaleX(${progress})`;
      indicator.setAttribute("data-ready", "true");
    }

    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    function measure() {
      distance = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      update();
    }

    function scheduleMeasure() {
      cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(measure);
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;
    resizeObserver?.observe(document.documentElement);
    if (document.body) resizeObserver?.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleMeasure, {
      passive: true,
    });
    measure();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(measureFrame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleMeasure);
      window.visualViewport?.removeEventListener("resize", scheduleMeasure);
    };
  }, [pathname]);

  return (
    <span
      className="motion-scroll-progress"
      ref={indicatorRef}
      aria-hidden="true"
    >
      <span ref={barRef} />
    </span>
  );
}

export default function ScrollReveal({
  children,
  className = "",
  showProgress = true,
}: {
  children: ReactNode;
  className?: string;
  showProgress?: boolean;
}) {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary || typeof IntersectionObserver === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const originalMotion = boundary.getAttribute("data-motion");
    const targets = new Map<HTMLElement, RevealRecord>();

    function settle(element: HTMLElement) {
      const record = targets.get(element);
      if (record?.timer) window.clearTimeout(record.timer);
      if (record) record.timer = null;
      element.setAttribute("data-reveal-state", "settled");
      intersectionObserver.unobserve(element);
    }

    function reveal(element: HTMLElement, immediate = false) {
      const record = targets.get(element);
      if (!record || element.getAttribute("data-reveal-state") === "settled")
        return;
      if (immediate || reducedMotion.matches) {
        settle(element);
        return;
      }
      element.setAttribute("data-reveal-state", "visible");
      intersectionObserver.unobserve(element);
      // Also release the mask if CSS animations are disabled by a browser extension.
      if (record.timer) window.clearTimeout(record.timer);
      record.timer = window.setTimeout(() => settle(element), 2300);
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0 },
    );

    function register(element: HTMLElement) {
      if (targets.has(element)) return;
      const delay = element.style.getPropertyValue("--reveal-delay");
      targets.set(element, {
        state: element.getAttribute("data-reveal-state"),
        delay,
        priority: element.style.getPropertyPriority("--reveal-delay"),
        timer: null,
      });
      const explicitDelay = element.getAttribute("data-reveal-delay");
      if (explicitDelay !== null && Number.isFinite(Number(explicitDelay))) {
        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(600, Math.max(0, Number(explicitDelay)))}ms`,
        );
      } else if (
        !delay &&
        !window
          .getComputedStyle(element)
          .getPropertyValue("--reveal-delay")
          .trim()
      ) {
        const group = element.parentElement?.closest<HTMLElement>(
          "[data-reveal-group]",
        );
        const siblings = group
          ? Array.from(
              group.querySelectorAll<HTMLElement>("[data-reveal]"),
            ).filter(
              (sibling) =>
                sibling.parentElement?.closest("[data-reveal-group]") === group,
            )
          : Array.from(element.parentElement?.children || []).filter(
              (sibling) => sibling.hasAttribute("data-reveal"),
            );
        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(Math.max(siblings.indexOf(element), 0), 6) * 85}ms`,
        );
      }

      // Never remove content already painted in the viewport during hydration.
      const bounds = element.getBoundingClientRect();
      if (reducedMotion.matches || bounds.top < window.innerHeight - 48) {
        settle(element);
      } else {
        element.setAttribute("data-reveal-state", "pending");
        intersectionObserver.observe(element);
      }
    }

    function scan(element: Element) {
      if (element instanceof HTMLElement && element.hasAttribute("data-reveal"))
        register(element);
      element.querySelectorAll<HTMLElement>("[data-reveal]").forEach(register);
    }

    function restore(element: HTMLElement, record: RevealRecord) {
      if (record.timer) window.clearTimeout(record.timer);
      if (record.state === null) element.removeAttribute("data-reveal-state");
      else element.setAttribute("data-reveal-state", record.state);
      if (record.delay)
        element.style.setProperty(
          "--reveal-delay",
          record.delay,
          record.priority,
        );
      else element.style.removeProperty("--reveal-delay");
    }

    function onPreferenceChange() {
      if (!boundary) return;
      boundary.setAttribute(
        "data-motion",
        reducedMotion.matches ? "reduced" : "ready",
      );
      if (reducedMotion.matches)
        targets.forEach((_, element) => reveal(element, true));
    }

    function onAnimationEnd(event: AnimationEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.animationName.startsWith("motion-reveal-") &&
        targets.has(event.target)
      )
        settle(event.target);
    }

    function onFocus(event: FocusEvent) {
      let element =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-reveal]")
          : null;
      while (element && boundary?.contains(element)) {
        if (targets.has(element)) reveal(element, true);
        element =
          element.parentElement?.closest<HTMLElement>("[data-reveal]") || null;
      }
    }

    scan(boundary);
    boundary.setAttribute(
      "data-motion",
      reducedMotion.matches ? "reduced" : "ready",
    );
    const mutationObserver =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (
                mutation.type === "attributes" &&
                mutation.target instanceof HTMLElement &&
                mutation.target.hasAttribute("data-reveal")
              )
                register(mutation.target);
              mutation.addedNodes.forEach((node) => {
                if (node instanceof Element) scan(node);
              });
            }
            targets.forEach((record, element) => {
              if (
                !boundary.contains(element) ||
                !element.hasAttribute("data-reveal")
              ) {
                intersectionObserver.unobserve(element);
                restore(element, record);
                targets.delete(element);
              }
            });
          })
        : null;
    mutationObserver?.observe(boundary, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-reveal"],
    });
    boundary.addEventListener("focusin", onFocus);
    boundary.addEventListener("animationend", onAnimationEnd);
    reducedMotion.addEventListener("change", onPreferenceChange);

    return () => {
      intersectionObserver.disconnect();
      mutationObserver?.disconnect();
      boundary.removeEventListener("focusin", onFocus);
      boundary.removeEventListener("animationend", onAnimationEnd);
      reducedMotion.removeEventListener("change", onPreferenceChange);
      targets.forEach((record, element) => restore(element, record));
      if (originalMotion === null) boundary.removeAttribute("data-motion");
      else boundary.setAttribute("data-motion", originalMotion);
    };
  }, [pathname]);

  return (
    <div
      ref={boundaryRef}
      className={`motion-boundary${className ? ` ${className}` : ""}`}
    >
      {showProgress && <ScrollProgress />}
      {children}
    </div>
  );
}
