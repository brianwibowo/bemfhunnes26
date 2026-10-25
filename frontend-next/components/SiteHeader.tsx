"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "../lib/site";
import Icon from "./Icon";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header ref={header} className={`portal-header${open ? " is-open" : ""}`}>
      <Link
        href="/beranda"
        className="portal-brand"
        aria-label="BEM FH UNNES 2026 - Beranda"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/images/logo-bem.webp"
          width="48"
          height="48"
          alt=""
          className="portal-brand-logo"
          sizes="48px"
          priority
        />
        <span className="portal-brand-type">
          <strong>
            Laksana
            <span>
              Adhikara<span className="brand-spark">✦</span>
            </span>
          </strong>
          <small>BEM FH UNNES 2026</small>
        </span>
      </Link>
      <button
        ref={toggle}
        className="portal-menu-toggle"
        type="button"
        aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
        aria-expanded={open}
        aria-controls="portal-navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="portal-navigation"
        className="portal-nav"
        aria-label="Navigasi utama"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              path === item.href ||
              (item.href !== "/beranda" && path.startsWith(`${item.href}/`))
                ? "is-active"
                : ""
            }
            aria-current={path === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <a
          className="portal-nav-contact"
          href="#hubungi-kami"
          onClick={() => setOpen(false)}
        >
          Hubungi kami <Icon name="arrow-up" />
        </a>
      </nav>
    </header>
  );
}
