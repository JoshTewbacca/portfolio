// Bitek descriptions are deliberately high-level and outcome-focused.
// Do NOT add process parameters, formulations, or patent specifics here.
export type Experience = {
  company: string;
  role: string;
  start: string; // "Jan 2025"
  end: string; // "Dec 2025" | "Present"
  location?: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Bitek Industries",
    role: "Engineering Intern (Placement)",
    start: "2025",
    end: "Present",
    location: "South Africa",
    bullets: [
      "R&D on trace-mineral feed additives — bench-scale synthesis, protocol development, and supplier sourcing.",
      "Built internal Python automation tools that replaced manual reporting workflows; demoed to senior leadership.",
      "Produced and peer-reviewed technical reports with rigorous citation and stoichiometry checking.",
      "Led a UI redesign of a desktop reporting utility using a formal brand-token design system.",
    ],
    tags: ["R&D", "Python", "Automation", "Technical Writing", "UI Design"],
  },
  {
    company: "Metix",
    role: "Software Intern",
    start: "20XX", // TODO: dates
    end: "20XX", // TODO: dates
    bullets: ["Built an AI-assisted document-generation tool for engineers."],
    tags: ["AI", "Tooling", "Software"],
  },
];
