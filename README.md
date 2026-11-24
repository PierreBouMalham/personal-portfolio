# Pierre Bou-Malham | Portfolio

Personal portfolio of Pierre Bou-Malham, Full-Stack Engineer.

Built with **React 18**, **Vite** and **Framer Motion**, with a Three.js galaxy
behind the hero. The production HTML is prerendered at build time, so crawlers
and link previews see the full content without running JavaScript.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # client build + SSR prerender → build/
npm run preview  # preview the production build
```

## Structure

- `src/data/content.js`: all CV content (employment, contract work, case studies, side projects, skills…). Edit this file to update the site. Wrap the opening action of each experience bullet in `**double asterisks**` to render it bold (same rule as the CV).
- `src/components/`: one folder per section (Hero, Experience, Projects, Skills, Education, Contact, Footer).
- `src/motion.js`: shared animation variants and easing.
- `src/styles/global.css`: design tokens and shared primitives.
- `src/entry-server.jsx` + `scripts/prerender.js`: build-time prerender into `build/index.html`.
- `public/Pierre_Bou-Malham_CV.pdf`: the downloadable CV.
- `public/og.png`: the 1200×630 link-preview image (regenerate it if the headline or portrait changes).

## Deployment

Deployed on Vercel. The build outputs to `build/` (configured in
`vite.config.js`) so the original Create React App Vercel settings keep
working unchanged.

## Contact form

The contact form uses EmailJS (`src/components/Contact/Contact.jsx`).
Template fields sent: `name`, `email`, `subject`, `message`. A hidden
`website` honeypot field drops bot submissions before they reach EmailJS.
