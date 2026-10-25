"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type {
  FocusEvent,
  KeyboardEvent,
  PointerEvent,
  WheelEvent,
} from "react";
import Image from "next/image";
import { galleryPhotos } from "../lib/photos";
import { GraphicAccent, DoodleArrow } from "./GraphicAccent";

type CarouselPage = { left: number; first: number; last: number };
const AUTOPLAY_DELAY = 5000;

export default function PhotoCarousel() {
  const headingId = useId();
  const trackId = useId();
  const galleryRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const automaticScrollRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const pagesRef = useRef<CarouselPage[]>([]);
  const [pages, setPages] = useState<CarouselPage[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ first: 0, last: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [interactionVersion, setInteractionVersion] = useState(0);
  const [pointerDown, setPointerDown] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const canAutoplay =
    reducedMotion === false &&
    inView &&
    documentVisible &&
    !hoverPaused &&
    !focusPaused &&
    !pointerDown &&
    pages.length > 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let measureFrame = 0;
    let scrollFrame = 0;
    let viewportWidth = 0;
    let maximum = 0;
    let positions: number[] = [];
    let widths: number[] = [];
    const slides = Array.from(
      track.querySelectorAll<HTMLElement>(".photo-slide"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updatePosition() {
      if (!track || !positions.length) return;
      const position = Math.max(0, Math.min(track.scrollLeft, maximum));
      const right = position + viewportWidth;
      let closestPage = 0;
      let leadingSlide = 0;
      let firstVisible = -1;
      let lastVisible = 0;

      pagesRef.current.forEach((page, index) => {
        if (
          Math.abs(page.left - position) <
          Math.abs(pagesRef.current[closestPage].left - position)
        )
          closestPage = index;
      });
      positions.forEach((left, index) => {
        if (
          Math.abs(left - position) <
          Math.abs(positions[leadingSlide] - position)
        )
          leadingSlide = index;
        const intersection = Math.max(
          0,
          Math.min(left + widths[index], right) - Math.max(left, position),
        );
        const visibility = intersection / widths[index];
        if (intersection > 2) {
          if (firstVisible === -1) firstVisible = index;
          lastVisible = index;
        }
        slides[index].classList.toggle("is-in-view", visibility > 0.08);
        slides[index].classList.toggle(
          "is-peeking",
          visibility > 0.08 && visibility < 0.65,
        );
        const center =
          (left + widths[index] / 2 - position - viewportWidth / 2) /
          Math.max(1, viewportWidth / 2);
        const pan = reducedMotion.matches
          ? 0
          : Math.max(-1, Math.min(1, center)) * -5;
        slides[index].style.setProperty("--photo-pan", `${pan.toFixed(2)}px`);
      });
      slides.forEach((slide, index) =>
        slide.classList.toggle("is-active", index === leadingSlide),
      );
      progressRef.current?.style.setProperty(
        "--photo-scroll",
        String(maximum > 0 ? position / maximum : 1),
      );
      setActivePage(closestPage);
      setVisibleRange((previous) => {
        const first = Math.max(0, firstVisible);
        return previous.first === first && previous.last === lastVisible
          ? previous
          : { first, last: lastVisible };
      });
      setAtStart(position <= 2);
      setAtEnd(position >= maximum - 2);
    }

    function measure() {
      if (!track || !slides.length) return;
      // Offsets ignore any reveal/rotation on the gallery's ancestors.
      viewportWidth = track.clientWidth;
      maximum = Math.max(0, track.scrollWidth - viewportWidth);
      positions = slides.map((slide) => slide.offsetLeft);
      widths = slides.map((slide) => slide.offsetWidth);
      const gap =
        Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      const visible = Math.max(
        1,
        Math.floor((viewportWidth + gap + 1) / (widths[0] + gap)),
      );
      const targets = [0];
      for (let index = visible; index < slides.length; index += visible) {
        const target = Math.min(maximum, positions[index]);
        if (target - targets[targets.length - 1] > 2) targets.push(target);
        if (target >= maximum - 2) break;
      }
      if (maximum - targets[targets.length - 1] > 2) targets.push(maximum);
      const measuredPages = targets.map((left) => {
        const first = positions.findIndex(
          (position, index) => position + widths[index] > left + 2,
        );
        const last = positions.reduce(
          (lastIndex, position, index) =>
            position < left + viewportWidth - 2 ? index : lastIndex,
          Math.max(0, first),
        );
        return { left, first: Math.max(0, first), last };
      });
      pagesRef.current = measuredPages;
      setPages(measuredPages);
      track.setAttribute("data-enhanced", "true");
      updatePosition();
    }

    function scheduleMeasure() {
      cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(measure);
    }
    function onScroll() {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(updatePosition);
    }
    function onPreferenceChange() {
      // Stop an in-flight smooth scroll when the preference changes.
      track?.scrollTo({ left: track.scrollLeft, behavior: "instant" });
      updatePosition();
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;
    resizeObserver?.observe(track);
    if (slides[0]) resizeObserver?.observe(slides[0]);
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    reducedMotion.addEventListener("change", onPreferenceChange);
    measure();

    return () => {
      cancelAnimationFrame(measureFrame);
      cancelAnimationFrame(scrollFrame);
      resizeObserver?.disconnect();
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleMeasure);
      reducedMotion.removeEventListener("change", onPreferenceChange);
      track.removeAttribute("data-enhanced");
      slides.forEach((slide) => {
        slide.classList.remove("is-active", "is-in-view", "is-peeking");
        slide.style.removeProperty("--photo-pan");
      });
    };
  }, []);

  const stopAutomaticScroll = useCallback(() => {
    const track = trackRef.current;
    if (track && automaticScrollRef.current) {
      track.scrollTo({ left: track.scrollLeft, behavior: "instant" });
    }
    automaticScrollRef.current = false;
  }, []);

  const pauseManually = useCallback(() => {
    stopAutomaticScroll();
    const now = performance.now();
    // Reset the five-second clock without rerendering on every wheel event.
    if (now - lastInteractionRef.current < 250) return;
    lastInteractionRef.current = now;
    if (autoplayTimerRef.current !== null) {
      window.clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setInteractionVersion((version) => version + 1);
  }, [stopAutomaticScroll]);

  useEffect(() => {
    const release = () => setPointerDown(false);
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  const goToPage = useCallback((index: number, automatic = false) => {
    const track = trackRef.current;
    const page =
      pagesRef.current[
        Math.max(0, Math.min(index, pagesRef.current.length - 1))
      ];
    if (!track || !page) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    automaticScrollRef.current = automatic;
    track.scrollTo({
      left: page.left,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visibilityFrame = 0;

    function onPreferenceChange() {
      setReducedMotion(preference.matches);
      if (preference.matches) stopAutomaticScroll();
    }
    function onVisibilityChange() {
      setDocumentVisible(!document.hidden);
      if (document.hidden) stopAutomaticScroll();
    }
    function checkVisibility() {
      if (!track) return;
      const bounds = track.getBoundingClientRect();
      setInView(
        bounds.bottom > 0 &&
          bounds.top < window.innerHeight &&
          bounds.right > 0 &&
          bounds.left < window.innerWidth,
      );
    }
    function scheduleVisibility() {
      cancelAnimationFrame(visibilityFrame);
      visibilityFrame = requestAnimationFrame(checkVisibility);
    }

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              const visible = Boolean(
                entry?.isIntersecting && entry.intersectionRatio >= 0.12,
              );
              setInView(visible);
              if (!visible) stopAutomaticScroll();
            },
            { threshold: [0, 0.12] },
          )
        : null;
    observer?.observe(track);
    if (!observer) {
      checkVisibility();
      window.addEventListener("scroll", scheduleVisibility, { passive: true });
      window.addEventListener("resize", scheduleVisibility, { passive: true });
    }
    onPreferenceChange();
    onVisibilityChange();
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(visibilityFrame);
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleVisibility);
      window.removeEventListener("resize", scheduleVisibility);
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [stopAutomaticScroll]);

  useEffect(() => {
    if (!canAutoplay) {
      stopAutomaticScroll();
      return;
    }
    autoplayTimerRef.current = window.setInterval(() => {
      const track = trackRef.current;
      const targets = pagesRef.current;
      if (!track || targets.length < 2) return;
      let currentPage = 0;
      targets.forEach((page, index) => {
        if (
          Math.abs(page.left - track.scrollLeft) <
          Math.abs(targets[currentPage].left - track.scrollLeft)
        )
          currentPage = index;
      });
      goToPage((currentPage + 1) % targets.length, true);
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoplayTimerRef.current !== null)
        window.clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
      stopAutomaticScroll();
    };
  }, [
    canAutoplay,
    pages.length,
    interactionVersion,
    goToPage,
    stopAutomaticScroll,
  ]);

  function navigateManually(index: number) {
    pauseManually();
    goToPage(index);
  }

  function handlePointerHover(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      setHoverPaused(true);
  }

  function handlePointerInteraction() {
    setPointerDown(true);
    setFocusPaused(false);
    pauseManually();
  }

  function handleFocus(event: FocusEvent<HTMLElement>) {
    setFocusPaused(
      event.target instanceof Element && event.target.matches(":focus-visible"),
    );
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    const next = event.relatedTarget;
    setFocusPaused(
      next instanceof Element &&
        Boolean(galleryRef.current?.contains(next)) &&
        next.matches(":focus-visible"),
    );
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (
      Math.abs(event.deltaX) > 1 ||
      (event.shiftKey && Math.abs(event.deltaY) > 1)
    )
      pauseManually();
  }

  function handleKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (
      event.target !== event.currentTarget ||
      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    )
      return;
    event.preventDefault();
    if (event.key === "Home") navigateManually(0);
    else if (event.key === "End") navigateManually(pages.length - 1);
    else navigateManually(activePage + (event.key === "ArrowRight" ? 1 : -1));
  }

  if (!galleryPhotos.length) return null;

  return (
    <section
      ref={galleryRef}
      className="photo-gallery portal-section"
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      onPointerEnter={handlePointerHover}
      onPointerOver={handlePointerHover}
      onPointerLeave={() => setHoverPaused(false)}
      onPointerDownCapture={handlePointerInteraction}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      onKeyDownCapture={(event) => {
        if (
          ["Tab", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
        )
          setFocusPaused(true);
      }}
    >
      <GraphicAccent kind="ribbon" className="gallery-red-ribbon" />
      <div className="portal-container">
        <div className="photo-gallery-heading" data-reveal="left">
          <div>
            <span className="portal-eyebrow">
              <span aria-hidden="true" />
              JEJAK LAKSANA
            </span>
            <h2 id={headingId}>
              Cerita dalam <em>langkah.</em>
            </h2>
            <p>
              Potret pengabdian, studi banding, rapat, dan gerak bersama. Karena
              setiap pertemuan menyimpan cerita.
            </p>
            <DoodleArrow className="gallery-doodle" />
          </div>
          <div className="photo-carousel-controls" aria-label="Kontrol galeri">
            <button
              className="photo-arrow photo-arrow-prev"
              type="button"
              onClick={() => navigateManually(activePage - 1)}
              disabled={atStart}
              aria-controls={trackId}
              aria-label="Lihat foto sebelumnya"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 12H4m7-7-7 7 7 7" />
              </svg>
            </button>
            <button
              className="photo-arrow"
              type="button"
              onClick={() => navigateManually(activePage + 1)}
              disabled={atEnd}
              aria-controls={trackId}
              aria-label="Lihat foto berikutnya"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 12h16m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="photo-gallery-stage"
          data-reveal="image"
          data-reveal-delay="100"
        >
          <div
            className="photo-track"
            id={trackId}
            ref={trackRef}
            role="group"
            aria-label="Dokumentasi BEM FH UNNES. Geser atau gunakan tombol panah untuk melihat foto."
            tabIndex={0}
            onKeyDown={handleKeyboard}
            onWheel={handleWheel}
          >
            {galleryPhotos.map((photo, index) => (
              <figure
                className="photo-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} dari ${galleryPhotos.length}: ${photo.title}`}
                key={photo.id}
              >
                <div className="photo-slide-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 680px) 86vw, (max-width: 1000px) 48vw, (max-width: 1280px) 38vw, 470px"
                    loading="lazy"
                  />
                  <span className="photo-slide-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="photo-slide-corner" aria-hidden="true">
                    ✦
                  </span>
                </div>
                <figcaption>
                  <span className="photo-slide-category">{photo.category}</span>
                  <h3>{photo.title}</h3>
                  <span className="photo-slide-mark" aria-hidden="true">
                    ✦
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div
            className="photo-scroll-progress"
            ref={progressRef}
            aria-hidden="true"
          >
            <span />
          </div>
        </div>

        <div className="photo-gallery-bottom">
          <span className="photo-gallery-hint">
            <span aria-hidden="true">↔</span>{" "}
            {reducedMotion
              ? "Geser untuk melihat cerita lainnya"
              : "Bergeser otomatis · geser untuk menjelajahi"}
          </span>
          <div
            className="photo-pagination"
            role="group"
            aria-label="Pilih halaman galeri"
            aria-hidden={pages.length < 2 ? true : undefined}
          >
            {pages.length > 1 &&
              pages.map((page, index) => (
                <button
                  className={`photo-page-dot${index === activePage ? " is-active" : ""}`}
                  key={`${page.first}-${index}`}
                  type="button"
                  onClick={() => navigateManually(index)}
                  aria-controls={trackId}
                  aria-label={`Halaman ${index + 1}, foto ${page.first + 1} sampai ${page.last + 1}`}
                  aria-current={index === activePage ? "true" : undefined}
                />
              ))}
          </div>
          <span
            className="photo-gallery-status"
            role="status"
            aria-live={canAutoplay ? "off" : "polite"}
            aria-atomic="true"
          >
            <span className="photo-sr-only">Foto </span>
            {String(visibleRange.first + 1).padStart(2, "0")}–
            {String(visibleRange.last + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            <span className="photo-sr-only">dari </span>
            {String(galleryPhotos.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
