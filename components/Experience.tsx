"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { experience } from "@/content/experience";
import Section from "./Section";
import { ChevronDownIcon } from "./icons";

export default function Experience() {
  // First (current) role open by default so the section is impressive at a glance
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const olRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Tracks the card the user just interacted with, so that when opening one
  // accordion item closes another (above or below it), the page doesn't
  // silently scroll out from under them as the collapsing card's height
  // animates away — the clicked card stays pinned in the viewport instead.
  const anchorRef = useRef<{ el: HTMLLIElement; top: number } | null>(null);

  useLayoutEffect(() => {
    const ol = olRef.current;
    const line = lineRef.current;
    if (!ol || !line) return;

    const updateLine = () => {
      const dots = dotRefs.current.filter((el): el is HTMLSpanElement => el !== null);
      const firstDot = dots[0];
      const lastDot = dots[dots.length - 1];
      if (!firstDot || !lastDot) return;
      const firstLi = firstDot.closest("li");
      const lastLi = lastDot.closest("li");
      if (!firstLi || !lastLi) return;
      const top = firstLi.offsetTop + firstDot.offsetTop + firstDot.offsetHeight / 2;
      const bottom = lastLi.offsetTop + lastDot.offsetTop + lastDot.offsetHeight / 2;
      line.style.top = `${top}px`;
      line.style.height = `${bottom - top}px`;
    };

    const compensateScroll = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const newTop = anchor.el.getBoundingClientRect().top;
      const delta = newTop - anchor.top;
      if (delta !== 0) {
        window.scrollBy(0, delta);
        anchor.top = anchor.el.getBoundingClientRect().top;
      }
    };

    const tick = () => {
      compensateScroll();
      updateLine();
    };

    tick();
    const observer = new ResizeObserver(tick);
    observer.observe(ol);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index: number, li: HTMLLIElement | null) => {
    if (li) {
      anchorRef.current = { el: li, top: li.getBoundingClientRect().top };
    }
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Section id="experience" title="Experience" kicker="Interactive CV">
      <ol ref={olRef} className="relative ml-3 space-y-8 pl-8 sm:ml-4">
        {/* Gradient timeline line — top/height are measured from the first/last dot centers */}
        <span
          ref={lineRef}
          aria-hidden="true"
          className="gradient-line-v absolute left-[-2px] w-0.5 rounded-full opacity-70 sm:left-[-6px]"
        />
        {experience.map((job, index) => {
          const open = openIndex === index;
          const panelId = `experience-panel-${index}`;
          return (
            <li key={`${job.company}-${job.role}`} data-reveal className="relative">
              {/* Timeline dot */}
              <span
                ref={(el) => {
                  dotRefs.current[index] = el;
                }}
                aria-hidden="true"
                className="neuo-raised-sm absolute -left-[45px] top-6 flex h-6 w-6 items-center justify-center rounded-full sm:-left-[49px]"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    open ? "bg-accent" : "bg-(--text-muted)"
                  }`}
                />
              </span>

              <div className="neuo-raised overflow-hidden">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={(e) => handleToggle(index, e.currentTarget.closest("li"))}
                  className="flex w-full items-center justify-between gap-4 rounded-neuo p-6 text-left sm:p-8"
                >
                  <span>
                    <span className="block text-xl font-bold text-text sm:text-2xl">
                      {job.role}
                    </span>
                    <span className="mt-1 block font-medium text-accent">
                      {job.company}
                      {job.location ? (
                        <span className="text-muted"> · {job.location}</span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {job.start} — {job.end}
                    </span>
                  </span>
                  <ChevronDownIcon
                    className={`shrink-0 text-muted transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div id={panelId} data-open={open} className="accordion-panel">
                  <div>
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                      <ul className="mb-6 space-y-3">
                        {job.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 leading-relaxed text-text">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      {job.image && (
                        <figure className="mb-6">
                          <div className="neuo-pressed-sm overflow-hidden rounded-2xl">
                            <Image
                              src={job.image}
                              alt={job.imageCaption ?? `${job.company} screenshot`}
                              width={1440}
                              height={912}
                              loading="lazy"
                              className="h-auto w-full object-cover"
                            />
                          </div>
                          {job.imageCaption && (
                            <figcaption className="mt-3 text-sm text-muted">
                              {job.imageCaption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                      <ul className="flex flex-wrap gap-3">
                        {job.tags.map((tag) => (
                          <li key={tag} className="neuo-pill px-4 py-1.5 text-sm font-medium text-muted">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
