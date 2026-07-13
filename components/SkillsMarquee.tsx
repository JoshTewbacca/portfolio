import { skills } from "@/content/skills";

const items = skills.flatMap((group) => group.items);

/**
 * Infinite toolkit ticker. Two identical lists inside a w-max track; the
 * track scrolls -50% and loops seamlessly. Pure CSS animation (see
 * .marquee-track in globals.css), static under prefers-reduced-motion.
 */
export default function SkillsMarquee() {
  const half = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-5 whitespace-nowrap pr-5 text-sm font-semibold uppercase tracking-widest text-muted sm:gap-7 sm:pr-7 sm:text-base"
        >
          <span aria-hidden="true" className="text-accent">
            ✦
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-label="Toolkit"
      className="neuo-pressed overflow-hidden rounded-none py-4 sm:py-5"
    >
      <div className="marquee-track flex w-max">
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}
