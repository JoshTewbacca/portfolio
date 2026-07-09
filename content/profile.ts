export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string; // full URL; leave "" to hide the link
  github?: string; // full URL; leave "" or remove to hide the link
  avatar?: string; // /public path, e.g. "/avatar.jpg"; remove to use initials fallback
  summary: string; // 2–3 sentence intro
};

export const profile: Profile = {
  name: "Joshua Tew",
  title: "Mechanical Engineering Graduand · R&D & Software",
  tagline: "Turning first-principles engineering into things that ship.",
  location: "Cape Town, South Africa",
  email: "joshtew007@gmail.com",
  linkedin: "", // TODO: full LinkedIn URL, e.g. "https://www.linkedin.com/in/..."
  github: "", // TODO: full GitHub URL, or leave "" to hide
  avatar: "/avatar.jpg", // drop a headshot at /public/avatar.jpg — initials show until it exists
  summary:
    "Final-year Mechanical Engineering student at UCT (First Class), currently on placement at Bitek Industries where I work across R&D, automation software, and technical documentation. I like problems that sit between hardware, code, and clear communication.",
};
