# Pierre Bou-Malham — Portfolio

Personal portfolio of Pierre Bou-Malham, Full-Stack Engineer.

Built with **React 18**, **Vite** and **Framer Motion**. Cinematic dark design
with glassmorphism, ambient light and spring-based animations.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → build/
npm run preview  # preview the production build
```

## Structure

- `src/data/content.js` — all CV content (experience, projects, skills…). Edit this file to update the site.
- `src/components/` — one folder per section (Hero, Experience, Projects, Skills, Education, Contact, Footer).
- `src/motion.js` — shared animation variants and easing.
- `src/styles/global.css` — design tokens and shared primitives.
- `public/Pierre_Bou-Malham_CV.pdf` — the downloadable CV.

## Deployment

Deployed on Vercel. The build outputs to `build/` (configured in
`vite.config.js`) so the original Create React App Vercel settings keep
working unchanged.

## Contact form

The contact form uses EmailJS (`src/components/Contact/Contact.jsx`).
Template fields sent: `name`, `email`, `subject`, `message`.
