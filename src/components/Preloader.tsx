"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Intro client courte. Exit clip-path sur le même fond noir que le Hero : continuité visuelle. */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const overlay = rootRef.current;
    if (!overlay) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = window.sessionStorage.getItem("odas-intro-seen") === "yes"; } catch { /* navigation privée */ }
    if (reduced || seen) {
      gsap.set(overlay, { display: "none" });
      return;
    }

    document.documentElement.classList.add("intro-active");
    const counter = { value: 0 };
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.documentElement.classList.remove("intro-active");
        gsap.set(overlay, { display: "none" });
        try { window.sessionStorage.setItem("odas-intro-seen", "yes"); } catch { /* navigation privée */ }
      },
    });
    timeline
      .fromTo(".preloader__logo", { yPercent: 34, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.72 }, 0)
      .fromTo(".preloader__side", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.23)
      .to(counter, {
        value: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => { if (percentRef.current) percentRef.current.textContent = Math.round(counter.value).toString().padStart(3, "0"); },
      }, 0.06)
      .fromTo(".preloader__track-fill", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.06)
      .to(".preloader__logo", { yPercent: -19, opacity: 0, duration: 0.45, ease: "power2.in" }, 1.36)
      .to(".preloader__side", { opacity: 0, duration: 0.3 }, 1.48)
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "power4.inOut" }, 1.56);

    return () => { timeline.kill(); document.documentElement.classList.remove("intro-active"); };
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className="preloader" role="status" aria-label="Chargement de l’expérience ODAS" aria-live="off">
      <div className="preloader__top"><span>STRATÉGIE · CRÉATIVITÉ · IMPACT</span><span>ABIDJAN, CI / 2026</span></div>
      <div className="preloader__center">
        <div className="preloader__logo"><Image src="/brand/odas-white.png" width={2048} height={975} priority alt="ODAS" /></div>
        <div className="preloader__side"><span className="preloader__block" /> <span>AVEC AUDACE.</span></div>
      </div>
      <div className="preloader__bottom">
        <span>CONNECTER LES MARQUES & LES HUMAINS</span>
        <div className="preloader__track"><div className="preloader__track-fill" /></div>
        <span className="preloader__counter"><span ref={percentRef}>000</span><small>%</small></span>
      </div>
    </div>
  );
}
