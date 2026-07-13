import { profile } from "@/content/profile";
import Section from "./Section";
import SocialLinks from "./SocialLinks";
import { MapPinIcon } from "./icons";

export default function About() {
  return (
    <Section id="about" index={1} title="About" kicker="Who I am">
      <div className="neuo-raised p-8 sm:p-10">
        <p
          data-split-lines
          className="mb-8 max-w-3xl text-lg leading-relaxed text-text"
        >
          {profile.summary}
        </p>
        <div
          data-reveal
          className="flex flex-wrap items-center justify-between gap-6"
        >
          <p className="flex items-center gap-2 text-muted">
            <MapPinIcon aria-hidden="true" />
            {profile.location}
          </p>
          <SocialLinks />
        </div>
      </div>
    </Section>
  );
}
