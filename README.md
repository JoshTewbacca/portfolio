# Joshua — Personal Portfolio

A single-page portfolio built with **Next.js (App Router) + TypeScript**, **Tailwind CSS v4**, **GSAP + ScrollTrigger**, and **next-themes**. Neumorphism-led design with glass accents, dark/light theme, and a typed content layer.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
```

## Deploy (Vercel, zero config)

1. Push this folder to a GitHub repo.
2. In [vercel.com](https://vercel.com) → **Add New Project** → import the repo → **Deploy**. No settings needed.
3. Every push to `main` redeploys automatically.

(Or from the CLI: `npx vercel` in this folder.)

## How to update content

**All content lives in `/content/*.ts`.** Components never hardcode content — edit a data file and the site updates. Each file exports a typed array/object, so TypeScript will catch mistakes at build time.

| To change…                                | Edit                    |
| ----------------------------------------- | ----------------------- |
| Name, title, tagline, summary, location   | `content/profile.ts`    |
| Email, LinkedIn, GitHub links             | `content/profile.ts`    |
| Headshot                                  | replace `public/avatar.png` (initials fallback if missing) |
| Jobs / internships (bullets, tags, dates) | `content/experience.ts` |
| Projects (add, remove, feature, links)    | `content/projects.ts`   |
| Skills and skill groups                   | `content/skills.ts`     |
| Degrees / achievements                    | `content/education.ts`  |
| Theme colours, shadows, accent, radius    | `app/globals.css` (token blocks at the top) |
| Fonts                                     | `app/layout.tsx` (swap `Inter` / `Space_Grotesk` imports) |

Example prompt for Claude Code: *"Add a project to `content/projects.ts` called X with tags Y, featured."*

### Before launch — remaining TODOs

Search the `content/` folder for `TODO`:

- `profile.ts` — LinkedIn URL, GitHub URL (leave `""` to hide a link)
- `experience.ts` — Metix dates
- `education.ts` — degree start year
- `skills.ts` — verify the tools list

### Confidentiality note

Bitek Industries bullets in `content/experience.ts` are deliberately high-level and outcome-focused. Do **not** add process parameters, formulations, or patent specifics.

## Design system

- **Tokens** — CSS custom properties in `app/globals.css` (`:root` for light, `.dark` for dark), exposed to Tailwind via `@theme inline`.
- **Neumorphism** — `.neuo-raised`, `.neuo-raised-sm`, `.neuo-pressed`, `.neuo-pill`; interactive elements press in on click via `.neuo-interactive`. Everything shares one `--surface` colour.
- **Glass accents** — `.glass` (floating nav) and `.card-glassify` (project-card hover) only.
- **Motion** — one client component, `components/ScrollFX.tsx`, animates by data attribute (`data-hero-item`, `data-reveal`, `data-parallax`, `data-magnetic`). All motion sits inside `gsap.matchMedia()` with a `prefers-reduced-motion` branch that disables it.
