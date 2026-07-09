export type SkillGroup = { category: string; items: string[] };

// TODO: verify tools before launch
export const skills: SkillGroup[] = [
  {
    category: "Engineering",
    items: [
      "CFD (Ansys Fluent)",
      "Thermofluids",
      "Dynamics & Vibrations",
      "Heat Transfer",
      "CAD (SolidWorks)",
      "Numerical Methods & Simulation",
    ],
  },
  {
    category: "Software",
    items: ["Python", "Java", "C#", "MATLAB", "JavaScript / TypeScript", "Next.js", "Git"],
  },
  {
    category: "Tools",
    items: ["Excel / VBA", "Technical Documentation", "Claude Code", "Firebase / Vercel"],
  },
];
