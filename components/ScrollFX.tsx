"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { PRELOADER_HERO_DELAY, preloaderWillRun } from "@/lib/preloader";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Single animation layer for the whole page.
 * Targets by data attribute so sections stay as server components:
 *   data-hero-item   — staggered hero entrance on load
 *   data-reveal      — fade/translate-up on scroll into view
 *   data-split-lines — masked line-by-line text reveal on scroll into view
 *   data-parallax    — subtle parallax (hero background only)
 *   data-drift       — slow scrubbed vertical drift (section ghost numbers)
 *   data-magnetic    — magnetic pull toward cursor (primary CTA)
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

        const cleanups: (() => void)[] = [];

        // --- Keep ScrollTrigger positions in sync with layout shifts ---
        // (accordions, images loading, etc. all change document height after
        // triggers are first calculated; without this, reveals below the
        // shift can end up permanently stuck at autoAlpha:0)
        let refreshTimeout: ReturnType<typeof setTimeout>;
        const resizeObserver = new ResizeObserver(() => {
          clearTimeout(refreshTimeout);
          refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
        });
        resizeObserver.observe(document.body);
        cleanups.push(() => {
          clearTimeout(refreshTimeout);
          resizeObserver.disconnect();
        });

        // --- Hero entrance: name → title → tagline → CTAs ---
        // Held back while the preloader overlay plays so the entrance is
        // what greets the user as the wipe reveals the page.
        gsap.from("[data-hero-item]", {
          y: 26,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: preloaderWillRun() ? PRELOADER_HERO_DELAY : 0,
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

        // --- Masked line reveals: text rises out of per-line clip masks ---
        // Split only after fonts load so line breaks are final; guard against
        // unmount (StrictMode double-invoke) with a cancelled flag.
        let splitCancelled = false;
        const splits: SplitText[] = [];
        const splitTweens: gsap.core.Tween[] = [];
        document.fonts.ready.then(() => {
          if (splitCancelled) return;
          document
            .querySelectorAll<HTMLElement>("[data-split-lines]")
            .forEach((el) => {
              const split = SplitText.create(el, {
                type: "lines",
                mask: "lines",
              });
              splits.push(split);
              splitTweens.push(
                gsap.from(split.lines, {
                  yPercent: 110,
                  duration: 0.9,
                  ease: "power4.out",
                  stagger: 0.08,
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                }),
              );
            });
          ScrollTrigger.refresh();
        });
        cleanups.push(() => {
          splitCancelled = true;
          // async-created tweens/triggers live outside the gsap context, so
          // they must be killed by hand before the splits are reverted
          splitTweens.forEach((tween) => {
            tween.scrollTrigger?.kill();
            tween.kill();
          });
          splits.forEach((split) => split.revert());
        });

        // --- Ghost section numbers drift slowly as their section scrolls ---
        document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
          gsap.to(el, {
            yPercent: 45,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });

        // --- Magnetic pull + scale for primary CTAs ---
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
