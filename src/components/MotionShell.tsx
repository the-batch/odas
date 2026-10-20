"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { CustomCursor } from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function LenisScrollBridge({ reducedMotion }: { reducedMotion: boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || reducedMotion) return;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    const syncScrollLock = () => {
      const locked = document.body.classList.contains("menu-open")
        || document.documentElement.classList.contains("intro-active");
      if (locked) lenis.stop();
      else lenis.start();
    };
    const lockObserver = new MutationObserver(syncScrollLock);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    lockObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    syncScrollLock();
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lockObserver.disconnect();
    };
  }, [lenis, reducedMotion]);

  return null;
}

export function MotionShell({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGSAP(() => {
    if (!root.current) return;
    if (reducedMotion) return;

    const progress = root.current.querySelector<HTMLElement>(".progress__bar");
    if (progress) {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => { progress.style.transform = `scaleX(${self.progress})`; },
      });
    }

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      // On ne cache pas le DOM avant l'initialisation JS : meilleur rendu sans JS.
      gsap.from(el, { y: 48, autoAlpha: 0, duration: 0.95, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    gsap.utils.toArray<HTMLElement>("[data-line-reveal]").forEach((el) => {
      gsap.from(el, { yPercent: 108, duration: 1, ease: "power4.out", clearProps: "all", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    gsap.utils.toArray<HTMLElement>("[data-row]").forEach((el) => {
      gsap.from(el, { y: 28, autoAlpha: 0, duration: 0.85, ease: "power2.out", clearProps: "all", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    const mm = gsap.matchMedia();
    const panels = gsap.utils.toArray<HTMLElement>("main > section, footer", root.current);
    panels.forEach((panel, index) => {
      gsap.set(panel, { position: "relative", zIndex: index + 1 });
    });

    mm.add("(min-width: 741px)", () => {
      panels.forEach((panel) => {
        gsap.fromTo(panel, {
          y: 64,
          scale: 0.975,
          boxShadow: "0 34px 90px rgba(0, 0, 0, 0.18)",
          borderRadius: 14,
          transformOrigin: "center top",
        }, {
          y: 0,
          scale: 1,
          boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "top 18%",
            scrub: 0.8,
          },
        });
      });
    });

    mm.add("(max-width: 740px)", () => {
      panels.forEach((panel) => {
        gsap.fromTo(panel, { y: 28 }, {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "top 55%",
            scrub: 0.6,
          },
        });
      });
    });

    const objectiveCards = gsap.utils.toArray<HTMLElement>(".impact__item", root.current);
    objectiveCards.slice(1).forEach((card, index) => {
      const previousCard = objectiveCards[index];
      gsap.fromTo(previousCard, { filter: "blur(0px)" }, {
        filter: "blur(2px)",
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 35%",
          end: () => window.innerWidth <= 740 ? "top 88px" : "top 108px",
          scrub: 0.5,
        },
      });
    });

    mm.add("(min-width: 900px)", () => {
      gsap.to(".hero__background img", { yPercent: 8, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".film__video img", { scale: 1.11, ease: "none", scrollTrigger: { trigger: ".film", start: "top bottom", end: "bottom top", scrub: 1.1 } });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, { yPercent: -14, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.9 } });
      });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: !reducedMotion,
        anchors: reducedMotion ? false : { offset: -80 },
        lerp: 0.085,
        wheelMultiplier: 0.9,
      }}
    >
      <LenisScrollBridge reducedMotion={reducedMotion} />
      <div ref={root} className="motion-shell"><CustomCursor />{children}</div>
    </ReactLenis>
  );
}
