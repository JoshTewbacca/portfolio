import { education } from "@/content/education";
import Section from "./Section";

export default function EducationSection() {
  return (
    <Section id="education" title="Education" kicker="Foundations">
      <div className="space-y-6">
        {education.map((entry) => (
          <div key={entry.institution} data-reveal className="neuo-raised p-8 sm:p-10">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold text-text sm:text-2xl">
                {entry.institution}
              </h3>
              <p className="text-sm text-muted">{entry.period}</p>
            </div>
            <p className="mb-5 font-medium text-accent">{entry.qualification}</p>
            <ul className="flex flex-wrap gap-3">
              {entry.achievements.map((achievement) => (
                <li key={achievement} className="neuo-pill px-4 py-1.5 text-sm font-medium text-text">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
