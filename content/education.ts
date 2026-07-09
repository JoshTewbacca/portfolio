export type Education = {
  institution: string;
  qualification: string;
  period: string;
  achievements: string[];
};

export const education: Education[] = [
  {
    institution: "University of Cape Town",
    qualification: "BSc (Eng) Mechanical Engineering",
    period: "2023 – 2026",
    achievements: ["First Class", "Dean's Merit List (2023–2025)"],
  },
];
