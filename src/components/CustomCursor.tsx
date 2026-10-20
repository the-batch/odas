"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.setAttribute("aria-hidden", "true");

    const square = document.createElement("span");
    square.className = "custom-cursor__square";
    const label = document.createElement("span");
    label.className = "custom-cursor__label";
    label.textContent = "ODAS";
    cursor.append(square, label);
    document.body.append(cursor);
    document.body.dataset.customCursor = "true";

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickSetter(cursor, "x", "px");
    const moveY = gsap.quickSetter(cursor, "y", "px");
    let visible = false;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(cursor, { autoAlpha: 1, duration: 0.2, overwrite: true });
    };
    const hide = () => {
      if (!visible) return;
      visible = false;
      gsap.to(cursor, { autoAlpha: 0, duration: 0.2, overwrite: true });
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      moveX(event.clientX);
      moveY(event.clientY);
      const themedElement = document.elementsFromPoint(event.clientX, event.clientY)
        .map((element) => element.closest<HTMLElement>("[data-theme]"))
        .find((element): element is HTMLElement => element !== null);
      cursor.dataset.theme = themedElement?.dataset.theme === "light" ? "light" : "dark";
      show();
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
      delete document.body.dataset.customCursor;
      gsap.killTweensOf(cursor);
      cursor.remove();
    };
  }, []);

  return null;
}
