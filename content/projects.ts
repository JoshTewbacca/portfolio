export type Project = {
  title: string;
  description: string;
  tags: string[];
  links?: { label: string; url: string }[];
  image?: string; // /public path, optional
};

export const projects: Project[] = [
  {
    title: "Active Aerodynamics CFD (Final-Year Thesis)",
    description:
      "CFD study of active aero on the DrivAer reference model — investigating F1-derived aerodynamic principles applied to production vehicles.",
    tags: ["CFD", "Aerodynamics", "Research"],
  },
  {
    title: "3-DoF Flexible-Arm Trebuchet Simulation",
    description:
      "Python simulation of a flexible-arm trebuchet with full dynamic modelling and report.",
    tags: ["Python", "Dynamics", "Simulation"],
  },
  {
    title: "Double-Acting Reciprocating Piston Pump Design",
    description:
      "Piston pump design with Python parametric optimisation.",
    tags: ["Python", "Optimisation", "Mechanical Design"],
  },
];
