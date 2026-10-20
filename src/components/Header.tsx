"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "L’AGENCE", href: "#agence" },
  { label: "EXPERTISES", href: "#expertises" },
  { label: "NOTRE REGARD", href: "#regard" },
  { label: "SECTEURS", href: "#secteurs" },
  { label: "CONTACT", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const syncTheme = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
      const matching = sections.find((section) => {
        const r = section.getBoundingClientRect();
        return r.top <= 90 && r.bottom > 90;
      });
      setLight(matching?.dataset.theme === "light");
    };
    syncTheme();
    window.addEventListener("scroll", syncTheme, { passive: true });
    window.addEventListener("resize", syncTheme);
    return () => { window.removeEventListener("scroll", syncTheme); window.removeEventListener("resize", syncTheme); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) firstLinkRef.current?.focus();
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key !== "Tab") return;
      const nav = document.getElementById("site-navigation");
      if (!nav) return;
      const tabbables = [...nav.querySelectorAll<HTMLAnchorElement>("a")];
      const last = tabbables[tabbables.length - 1];
      if (event.shiftKey && document.activeElement === tabbables[0]) { event.preventDefault(); toggleRef.current?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggleRef.current?.focus(); }
      else if (!event.shiftKey && document.activeElement === toggleRef.current) { event.preventDefault(); tabbables[0]?.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [open]);

  const onNavigate = () => { setOpen(false); };

  return (
    <>
      <header className={`header ${light && !open ? "header--light" : ""} ${open ? "header--open" : ""}`}>
        <a href="#accueil" className="header__brand" aria-label="ODAS, retour à l’accueil" onClick={onNavigate}>
          <Image src={light && !open ? "/brand/odas-black.png" : "/brand/odas-white.png"} alt="ODAS" width={2048} height={975} priority />
          <span className="header__brand-dot" />
        </a>
        <span className="header__descriptor">AGENCE DE STRATÉGIE DIGITALE <span>↗</span> ABIDJAN</span>
        <button ref={toggleRef} type="button" className="header__toggle" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen((current) => !current)}>
          <span>{open ? "FERMER" : "MENU"}</span>
          <span className={`header__bars ${open ? "header__bars--open" : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
      </header>
      <nav id="site-navigation" className={`header__nav ${open ? "header__nav--open" : ""}`} aria-label="Navigation principale" aria-hidden={!open}>
        <div className="header__nav-inner">
          <div className="header__nav-top"><span>INDEX / NAVIGATION</span><span>01—05</span></div>
          {links.map((link, index) => (
            <a key={link.href} ref={index === 0 ? firstLinkRef : undefined} tabIndex={open ? 0 : -1} onClick={onNavigate} href={link.href}>
              <span className="header__nav-index">0{index + 1}</span><span>{link.label}</span><span className="header__nav-arrow">↗</span>
            </a>
          ))}
          <div className="header__nav-bottom">/ɔ.das/ — AVEC AUDACE, TOUJOURS.</div>
        </div>
      </nav>
    </>
  );
}
