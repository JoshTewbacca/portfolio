import type { ReactNode } from "react";

export default function Section({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id: string;
  index?: number;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative mb-12">
          {index !== undefined && (
            <span
              aria-hidden="true"
              data-drift
              className="section-index pointer-events-none absolute -top-8 right-0 select-none font-heading text-8xl font-bold leading-none sm:-top-12 sm:text-[9rem]"
            >
              {String(index).padStart(2, "0")}
            </span>
          )}
          {kicker && (
            <p
              data-reveal
              className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent"
            >
              {kicker}
            </p>
          )}
          <h2
            data-split-lines
            className="mb-4 text-4xl font-bold text-text sm:text-5xl"
          >
            {title}
          </h2>
          <div aria-hidden="true" data-reveal className="gradient-bar" />
        </div>
        {children}
      </div>
    </section>
  );
}
