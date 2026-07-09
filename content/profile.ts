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
  title: "Mechanical Engineering Student at UCT",
  tagline: "Turning first-principles engineering into things that ship.",
  location: "Cape Town, South Africa",
  email: "joshtew007@gmail.com",
  linkedin: "", // TODO: full LinkedIn URL, e.g. "https://www.linkedin.com/in/..."
  github: "", // TODO: full GitHub URL, or leave "" to hide
  avatar: "/avatar.png", // headshot in /public — initials fallback shows if the file is missing
  summary:
    "Final-year Mechanical Engineering student at UCT (First Class, Dean's Merit List 2023–2025) with strengths in CFD, process development and engineering software. Experienced across both R&D (scaling chemical manufacturing routes for feed additives) and software, building production AI tools. Strong mathematical and problem-solving foundation, quick to pick up new domains, and driven to see technical projects through to completion.",
};
