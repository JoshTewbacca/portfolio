import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div data-reveal>
          {kicker && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              {kicker}
            </p>
          )}
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">
            {title}
          </h2>
          <div aria-hidden="true" className="gradient-bar mb-10" />
        </div>
        {children}
      </div>
    </section>
  );
}
