import { profile } from "@/content/profile";
import SocialLinks from "./SocialLinks";

export default function Contact() {
  return (
    <footer id="contact" className="scroll-mt-28 px-5 pb-10 pt-16 sm:px-8 md:pt-24">
      <div className="mx-auto w-full max-w-5xl">
        <div data-reveal className="neuo-raised flex flex-col items-center gap-8 p-10 text-center sm:p-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Contact
          </p>
          <h2 className="text-gradient-accent max-w-xl pb-1 text-3xl font-bold leading-tight sm:text-4xl">
            Have a role or project in mind? Let&apos;s talk.
          </h2>
          <a
            href={`mailto:${profile.email}`}
            data-magnetic
            className="neuo-raised neuo-interactive inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-accent"
          >
            {profile.email}
          </a>
          <SocialLinks size="lg" />
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js — designed &amp; deployed from a single prompt.
        </p>
      </div>
    </footer>
  );
}
