"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Subtle custom cursor: a small accent ring that trails the native cursor
 * with a slight lag and grows over interactive elements. Native cursor stays
 * visible. Only active on fine pointers with motion allowed — never on touch.
 */
export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(wrap, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
        const xTo = gsap.quickTo(wrap, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(wrap, "y", { duration: 0.35, ease: "power3.out" });
        let visible = false;

        const onMove = (e: MouseEvent) => {
          if (!visible) {
            visible = true;
            gsap.set(wrap, { x: e.clientX, y: e.clientY });
            gsap.to(wrap, { autoAlpha: 1, duration: 0.25 });
          }
          xTo(e.clientX);
          yTo(e.clientY);
          const interactive = (e.target as Element | null)?.closest?.(
            "a, button, [role='button']",
          );
          gsap.to(ring, {
            scale: interactive ? 1.7 : 1,
            opacity: interactive ? 0.9 : 0.45,
            duration: 0.25,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          visible = false;
          gsap.to(wrap, { autoAlpha: 0, duration: 0.25 });
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);
        return () => {
          window.removeEventListener("mousemove", onMove);
          document.documentElement.removeEventListener("mouseleave", onLeave);
        };
      },
    );

    return () => mm.revert();
  });

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] invisible"
    >
      <div
        ref={ringRef}
        className="h-8 w-8 rounded-full border-2 border-(--accent) opacity-45"
      />
    </div>
  );
}
