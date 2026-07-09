export type SkillGroup = { category: string; items: string[] };

// TODO: verify tools before launch
export const skills: SkillGroup[] = [
  {
    category: "Engineering",
    items: ["CFD", "Thermofluids", "Dynamics & Vibrations", "Heat Transfer", "CAD"],
  },
  {
    category: "Software",
    items: ["Python", "MATLAB", "JavaScript / TypeScript", "Next.js", "Git"],
  },
  {
    category: "Tools",
    items: ["Excel Modelling", "Claude Code", "Firebase / Vercel"],
  },
];
