import { skills } from "@/content/skills";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" index={4} title="Skills" kicker="Toolkit">
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group) => (
          <div key={group.category} data-reveal className="neuo-raised p-7">
            <h3 className="mb-5 text-lg font-bold text-text">{group.category}</h3>
            <ul className="flex flex-wrap gap-3">
              {group.items.map((item) => (
                <li key={item} className="neuo-pill px-4 py-1.5 text-sm font-medium text-text">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
