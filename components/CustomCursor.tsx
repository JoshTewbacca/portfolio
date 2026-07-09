"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Subtle custom cursor. At rest: a 6px accent dot trailing the native cursor.
 * Over links/buttons: the dot recedes and a soft ring opens up around the
 * pointer. Fast movement stretches the shape slightly along its direction of
 * travel; clicking squeezes it. Native cursor stays visible. Fine pointers
 * only, disabled under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stretchRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const stretch = stretchRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !stretch || !dot || !ring) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(wrap, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
        gsap.set(ring, { scale: 0.4, opacity: 0 });

        const xTo = gsap.quickTo(wrap, "x", { duration: 0.3, ease: "power3.out" });
        const yTo = gsap.quickTo(wrap, "y", { duration: 0.3, ease: "power3.out" });
        const stretchX = gsap.quickTo(stretch, "scaleX", { duration: 0.25, ease: "power2.out" });
        const stretchY = gsap.quickTo(stretch, "scaleY", { duration: 0.25, ease: "power2.out" });

        let visible = false;
        let overInteractive = false;
        let lastX = 0;
        let lastY = 0;
        let lastT = 0;
        let settleTimer: ReturnType<typeof setTimeout> | undefined;

        const onMove = (e: MouseEvent) => {
          if (!visible) {
            visible = true;
            lastX = e.clientX;
            lastY = e.clientY;
            lastT = e.timeStamp;
            gsap.set(wrap, { x: e.clientX, y: e.clientY });
            gsap.to(wrap, { autoAlpha: 1, duration: 0.3 });
          }
          xTo(e.clientX);
          yTo(e.clientY);

          // Stretch along the direction of travel, proportional to speed
          const dt = Math.max(e.timeStamp - lastT, 1);
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          const speed = Math.hypot(dx, dy) / dt; // px per ms
          const amount = Math.min(speed * 0.12, 0.35);
          gsap.set(stretch, { rotation: (Math.atan2(dy, dx) * 180) / Math.PI });
          stretchX(1 + amount);
          stretchY(1 - amount * 0.6);
          lastX = e.clientX;
          lastY = e.clientY;
          lastT = e.timeStamp;
          clearTimeout(settleTimer);
          settleTimer = setTimeout(() => {
            stretchX(1);
            stretchY(1);
          }, 60);

          // Dot ⇄ ring swap over interactive elements
          const interactive = Boolean(
            (e.target as Element | null)?.closest?.("a, button, [role='button']"),
          );
          if (interactive !== overInteractive) {
            overInteractive = interactive;
            gsap.to(dot, {
              scale: interactive ? 0 : 1,
              opacity: interactive ? 0 : 0.55,
              duration: 0.25,
              ease: "power2.out",
            });
            gsap.to(ring, {
              scale: interactive ? 1 : 0.4,
              opacity: interactive ? 0.65 : 0,
              duration: 0.3,
              ease: "back.out(1.6)",
            });
          }
        };

        const onLeave = () => {
          visible = false;
          gsap.to(wrap, { autoAlpha: 0, duration: 0.25 });
        };
        const onDown = () => gsap.to(stretch, { scale: 0.8, duration: 0.15 });
        const onUp = () => gsap.to(stretch, { scale: 1, duration: 0.25, ease: "back.out(2)" });

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.documentElement.addEventListener("mouseleave", onLeave);
        return () => {
          clearTimeout(settleTimer);
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mousedown", onDown);
          window.removeEventListener("mouseup", onUp);
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
      <div ref={stretchRef} className="relative flex items-center justify-center">
        <div ref={dotRef} className="h-1.5 w-1.5 rounded-full bg-accent opacity-55" />
        <div
          ref={ringRef}
          className="absolute h-9 w-9 rounded-full border border-(--accent) opacity-0"
        />
      </div>
    </div>
  );
}
