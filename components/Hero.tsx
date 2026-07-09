import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { profile } from "@/content/profile";

function avatarExists(avatar?: string): avatar is string {
  if (!avatar) return false;
  return fs.existsSync(path.join(process.cwd(), "public", avatar));
}

export default function Hero() {
  const hasAvatar = avatarExists(profile.avatar);
  const initials = profile.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8"
    >
      {/* Decorative neuo shapes — parallax target, hidden from AT */}
      <div
        data-parallax
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="neuo-pressed absolute -right-24 top-24 h-72 w-72 rounded-full opacity-70 sm:right-[8%]" />
        <div className="neuo-raised absolute -left-20 bottom-24 h-48 w-48 rounded-full opacity-60" />
        <div className="neuo-pressed absolute left-[12%] top-[18%] h-20 w-20 rounded-full opacity-50" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
        <div className="max-w-2xl text-center md:text-left">
          <p
            data-hero-item
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent"
          >
            {profile.location}
          </p>
          <h1
            data-hero-item
            className="text-gradient-accent mb-4 pb-2 text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            {profile.name}
          </h1>
          <p
            data-hero-item
            className="mb-3 text-xl font-medium text-text sm:text-2xl"
          >
            {profile.title}
          </p>
          <p data-hero-item className="mb-10 text-lg text-muted">
            {profile.tagline}
          </p>
          <div
            data-hero-item
            className="flex flex-wrap items-center justify-center gap-5 md:justify-start"
          >
            <a
              href="#projects"
              data-magnetic
              className="neuo-raised neuo-interactive inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-accent"
            >
              View Work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="neuo-raised neuo-interactive inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-text hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Avatar / initials in a neuo frame */}
        <div data-hero-item className="neuo-raised shrink-0 rounded-full p-3">
          {hasAvatar ? (
            <Image
              src={profile.avatar!}
              alt={`Portrait of ${profile.name}`}
              width={224}
              height={224}
              priority
              className="h-40 w-40 rounded-full object-cover sm:h-56 sm:w-56"
            />
          ) : (
            <div
              aria-hidden="true"
              className="neuo-pressed flex h-40 w-40 items-center justify-center rounded-full sm:h-56 sm:w-56"
            >
              <span className="font-heading text-5xl font-bold text-accent sm:text-6xl">
                {initials}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
