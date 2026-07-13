"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/content/profile";
import { PRELOADER_SESSION_KEY, preloaderWillRun } from "@/lib/preloader";

gsap.registerPlugin(useGSAP);

/**
 * Name intro overlay: letters rise in, hold, sweep out, then the whole
 * overlay wipes upward to reveal the page. Runs once per browser session
 * (sessionStorage flag is set only on completion, so a mid-animation reload
 * replays it). Skipped under prefers-reduced-motion. Server-renders visible
 * so first paint on a first visit is the overlay, not a content flash.
 */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (!preloaderWillRun()) {
      setDone(true);
      return;
    }

    const letters = el.querySelectorAll("[data-letter]");
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
        } catch {
          // storage unavailable — preloader will just replay next load
        }
        document.documentElement.style.overflow = prevOverflow;
        setDone(true);
      },
    });

    tl.from(
      letters,
      {
        yPercent: 120,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.045,
      },
      0.15,
    )
      .to(
        letters,
        {
          yPercent: -120,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
          stagger: 0.02,
        },
        "+=0.35",
      )
      .to(el, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.25");

    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  });

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <p className="overflow-hidden font-display text-4xl font-extrabold tracking-tight text-text sm:text-6xl">
        {profile.name
          .toUpperCase()
          .split("")
          .map((ch, i) => (
            <span key={i} data-letter className="inline-block">
              {ch === " " ? " " : ch}
            </span>
          ))}
      </p>
    </div>
  );
}
