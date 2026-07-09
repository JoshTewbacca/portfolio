import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const isSet = (url?: string): url is string =>
  Boolean(url && url.trim() !== "" && !url.startsWith("TODO"));

export default function SocialLinks({ size = "md" }: { size?: "md" | "lg" }) {
  const box =
    size === "lg"
      ? "h-14 w-14 [&_svg]:h-6 [&_svg]:w-6"
      : "h-12 w-12 [&_svg]:h-5 [&_svg]:w-5";

  const links = [
    {
      href: `mailto:${profile.email}`,
      label: `Email ${profile.name}`,
      icon: <MailIcon />,
      show: isSet(profile.email),
    },
    {
      href: profile.linkedin,
      label: `${profile.name} on LinkedIn`,
      icon: <LinkedInIcon />,
      show: isSet(profile.linkedin),
    },
    {
      href: profile.github ?? "",
      label: `${profile.name} on GitHub`,
      icon: <GitHubIcon />,
      show: isSet(profile.github),
    },
  ];

  return (
    <ul className="flex items-center gap-4">
      {links
        .filter((link) => link.show)
        .map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={`neuo-raised-sm neuo-interactive flex items-center justify-center text-muted transition-colors hover:text-accent ${box}`}
            >
              {link.icon}
            </a>
          </li>
        ))}
    </ul>
  );
}
