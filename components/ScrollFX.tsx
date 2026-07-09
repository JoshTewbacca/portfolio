"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Single animation layer for the whole page.
 * Targets by data attribute so sections stay as server components:
 *   data-hero-item  — staggered hero entrance on load
 *   data-reveal     — fade/translate-up on scroll into view
 *   data-parallax   — subtle parallax (hero background only)
 *   data-magnetic   — magnetic pull toward cursor (primary CTA)
 * All motion is wrapped in gsap.matchMedia with a reduced-motion branch.
 */
export default function ScrollFX() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (!context.conditions?.motionOK) {
          // Reduced motion: everything stays fully visible, no animation.
          gsap.set("[data-hero-item], [data-reveal]", { clearProps: "all" });
          return;
        }

        // --- Hero entrance: name → title → tagline → CTAs ---
        gsap.from("[data-hero-item]", {
          y: 26,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "all",
        });

        // --- Light parallax on hero background decoration only ---
        gsap.to("[data-parallax]", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        // --- Scroll reveals: sections/cards fade + translate up, staggered ---
        gsap.set("[data-reveal]", { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              clearProps: "transform,opacity,visibility",
            }),
        });

        // --- Magnetic pull + scale for primary CTAs ---
        const cleanups: (() => void)[] = [];
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            xTo((e.clientX - rect.left - rect.width / 2) * 0.25);
            yTo((e.clientY - rect.top - rect.height / 2) * 0.25);
          };
          const onEnter = () => gsap.to(el, { scale: 1.04, duration: 0.3 });
          const onLeave = () => {
            xTo(0);
            yTo(0);
            gsap.to(el, { scale: 1, duration: 0.3 });
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      },
    );

    return () => mm.revert();
  });

  return null;
}
