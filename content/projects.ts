export type Project = {
  title: string;
  description: string;
  tags: string[];
  highlight?: boolean; // featured — spans wider in the grid
  links?: { label: string; url: string }[];
  image?: string; // /public path, optional
};

export const projects: Project[] = [
  {
    title: "Active Aerodynamics CFD (Final-Year Thesis)",
    description:
      "CFD study of active aero on the DrivAer reference model — investigating F1-derived aerodynamic principles applied to production vehicles.",
    tags: ["CFD", "Aerodynamics", "Research"],
    highlight: true,
  },
  {
    title: "3-DoF Flexible-Arm Trebuchet Simulation",
    description:
      "Python simulation of a flexible-arm trebuchet with full dynamic modelling and report.",
    tags: ["Python", "Dynamics", "Simulation"],
    highlight: true,
  },
  {
    title: "510 MW Solar PV Techno-Economic Analysis",
    description:
      "Excel-based techno-economic model for a utility-scale solar PV plant.",
    tags: ["Energy", "Modelling", "Excel"],
  },
  {
    title: "Our Little Corner",
    description:
      "A private couples web app (letters, memories, countdowns, playlists) built with Next.js on Vercel.",
    tags: ["Next.js", "Firebase", "Full-stack"],
  },
  // TODO: add/trim — piston-pump design, psychrometrics sim, tutoring tools, etc.
];
